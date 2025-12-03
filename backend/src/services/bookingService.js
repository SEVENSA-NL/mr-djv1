const { randomUUID } = require('crypto');
const db = require('../lib/db');
const config = require('../config');
const rentGuyService = require('./rentGuyService');
const mailService = require('./mailService');
const packageService = require('./packageService');
const personalizationService = require('./personalizationService');

/**
 * @typedef {Object} BookingPayload
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} eventType
 * @property {string|Date|null} [eventDate]
 * @property {string|null} [packageId]
 * @property {string|null} [message]
 */

/**
 * @typedef {Object} RentGuySyncResult
 * @property {boolean} delivered
 * @property {boolean} queued
 * @property {number} [queueSize]
 * @property {string} [reason]
 */

/**
 * @typedef {Object} BookingRecord
 * @property {string} id
 * @property {string} status
 * @property {Date} createdAt
 * @property {boolean} persisted
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} eventType
 * @property {Date|null} eventDate
 * @property {string|null} packageId
 * @property {string|null} message
 */

/**
 * @typedef {Object} CreateBookingResult
 * @property {string} id
 * @property {string} status
 * @property {Date} createdAt
 * @property {boolean} persisted
 * @property {RentGuySyncResult} rentGuySync
 */

const inMemoryBookings = new Map();

const DEFAULT_TIMEZONE = 'Europe/Amsterdam';

function zonedDateTimeToUtc({ year, month, day, hour = 0, minute = 0, second = 0 }, timeZone) {
  const baseline = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const parts = formatter.formatToParts(baseline).filter((part) => part.type !== 'literal');
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const zonedUtc = Date.UTC(
    Number(partMap.year),
    Number(partMap.month) - 1,
    Number(partMap.day),
    Number(partMap.hour),
    Number(partMap.minute),
    Number(partMap.second)
  );
  const offset = zonedUtc - baseline.getTime();
  return new Date(baseline.getTime() - offset);
}

function parseZonedDate(value, timeZone = DEFAULT_TIMEZONE) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (typeof value === 'number') {
    return new Date(value);
  }

  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const isoTimezoneMatch = /([zZ]|[+\-]\d{2}:?\d{2})$/.test(trimmed);
  if (isoTimezoneMatch) {
    const direct = new Date(trimmed);
    return Number.isNaN(direct.getTime()) ? null : direct;
  }

  const partsMatch = trimmed.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?)?$/
  );
  if (!partsMatch) {
    const fallback = new Date(trimmed);
    return Number.isNaN(fallback.getTime()) ? null : fallback;
  }

  const [, year, month, day, hour = '00', minute = '00', second = '00'] = partsMatch;
  return zonedDateTimeToUtc(
    {
      year: Number(year),
      month: Number(month),
      day: Number(day),
      hour: Number(hour),
      minute: Number(minute),
      second: Number(second)
    },
    timeZone
  );
}

function normalizeEventDate(input, defaultTimeZone = DEFAULT_TIMEZONE) {
  if (!input) {
    return { start: null, end: null, timeZone: defaultTimeZone };
  }

  if (typeof input === 'string' || input instanceof Date || typeof input === 'number') {
    return {
      start: parseZonedDate(input, defaultTimeZone),
      end: null,
      timeZone: defaultTimeZone
    };
  }

  if (typeof input === 'object') {
    const timeZone = input.timezone || input.timeZone || defaultTimeZone;
    const startSource = input.start ?? input.date ?? input.from ?? null;
    const endSource = input.end ?? input.until ?? input.to ?? null;
    return {
      start: parseZonedDate(startSource, timeZone),
      end: parseZonedDate(endSource, timeZone),
      timeZone
    };
  }

  return { start: null, end: null, timeZone: defaultTimeZone };
}

async function createBooking(payload) {
  const timestamp = new Date();
  let result;

  const normalizedEventDate = normalizeEventDate(payload.eventDate);
  const eventDateForStorage = normalizedEventDate.start;

  if (db.isConfigured()) {
    try {
      const queryResult = await db.runQuery(
        `INSERT INTO bookings (name, email, phone, event_type, event_date, message, package_id, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', $8, $8)
         RETURNING id, status, created_at`,
        [
          payload.name,
          payload.email,
          payload.phone,
          payload.eventType,
          eventDateForStorage,
          payload.message,
          payload.packageId || null,
          timestamp
        ]
      );

      const row = queryResult.rows[0];
      result = {
        id: row.id,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.created_at,
        persisted: true,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        eventType: payload.eventType,
        eventDate: eventDateForStorage,
        eventEndDate: normalizedEventDate.end,
        eventTimeZone: normalizedEventDate.timeZone,
        packageId: payload.packageId || null,
        message: payload.message || null
      };
    } catch (error) {
      console.error('[bookingService] Database insert failed:', error.message);
    }
  }

  if (!result) {
    const id = randomUUID();
    const record = {
      id,
      status: 'pending',
      createdAt: timestamp,
      updatedAt: timestamp,
      persisted: false,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      eventType: payload.eventType,
      eventDate: eventDateForStorage,
      eventEndDate: normalizedEventDate.end,
      eventTimeZone: normalizedEventDate.timeZone,
      packageId: payload.packageId || null,
      message: payload.message || null
    };

    inMemoryBookings.set(id, record);
    result = record;
  }

  const rentGuySync = await rentGuyService.syncBooking(
    {
      id: result.id,
      status: result.status,
      createdAt: result.createdAt,
      persisted: result.persisted,
      name: result.name,
      email: result.email,
      phone: result.phone,
      eventType: result.eventType,
      eventDate: result.eventDate,
      eventEndDate: result.eventEndDate,
      eventTimeZone: result.eventTimeZone,
      packageId: result.packageId,
      message: result.message
    },
    {
      source: 'booking-flow'
    }
  );

  let mailDelivery = {
    delivered: false,
    queued: false,
    skipped: true,
    reason: 'missing-recipient'
  };
  let personalizationMeta = {
    variantId: null,
    matchType: 'default',
    keywords: [],
    city: null
  };

  try {
    const { tokens, personalization } = await buildBookingEmailContext(payload, result);
    personalizationMeta = personalization;

    if (result.email) {
      mailDelivery = await mailService.sendBookingConfirmation({
        to: result.email,
        tokens,
        meta: {
          bookingId: result.id,
          matchType: personalization.matchType,
          variantId: personalization.variantId,
          packageId: result.packageId || payload.packageId || null,
          eventType: result.eventType || payload.eventType || null
        }
      });
    }
  } catch (error) {
    console.error('[bookingService] Failed to send booking confirmation email:', error.message);
    mailDelivery = {
      delivered: false,
      queued: false,
      error: error.message
    };
  }

  return {
    id: result.id,
    status: result.status,
    createdAt: result.createdAt,
    persisted: result.persisted,
    eventDate: result.eventDate,
    eventEndDate: result.eventEndDate,
    eventTimeZone: result.eventTimeZone,
    rentGuySync
  };
}

/**
 * Fetches the most recent bookings, falling back to the in-memory store.
 *
 * @param {number} [limit=10]
 * @returns {Promise<{persisted: boolean, bookings: Array<BookingRecord>}>}
 */
async function getRecentBookings(limit = 10) {
  if (db.isConfigured()) {
    try {
      const result = await db.runQuery(
        `SELECT id, name, email, phone, event_type AS "eventType", event_date AS "eventDate", package_id AS "packageId", status, created_at AS "createdAt"
         FROM bookings
         ORDER BY created_at DESC
         LIMIT $1`,
        [limit]
      );

      if (result) {
        return {
          persisted: true,
          bookings: result.rows
        };
      }
    } catch (error) {
      console.error('[bookingService] Failed to fetch bookings from database:', error.message);
    }
  }

  const bookings = Array.from(inMemoryBookings.values())
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, limit)
    .map(({ id, status, createdAt, name, email, phone, eventType, eventDate, packageId }) => ({
      id,
      status,
      createdAt,
      name,
      email,
      phone,
      eventType,
      eventDate,
      packageId
    }));

  return {
    persisted: false,
    bookings
  };
}

/**
 * Clears the in-memory booking cache (used in tests).
 *
 * @returns {void}
 */
function resetInMemoryStore() {
  inMemoryBookings.clear();
}

/**
 * Provides diagnostics about the current booking persistence strategy.
 *
 * @returns {{
 *   databaseConnected: boolean,
 *   storageStrategy: 'postgres'|'in-memory',
 *   fallbackQueueSize: number,
 *   lastError: string|null
 * }}
 */
function getBookingServiceStatus() {
  const dbStatus = db.getStatus();

  return {
    databaseConnected: dbStatus.connected,
    storageStrategy: dbStatus.connected ? 'postgres' : 'in-memory',
    fallbackQueueSize: inMemoryBookings.size,
    lastError: dbStatus.lastError
  };
}

function ping() {
  const status = getBookingServiceStatus();
  return {
    ok: true,
    databaseConnected: status.databaseConnected,
    storageStrategy: status.storageStrategy,
    fallbackQueueSize: status.fallbackQueueSize
  };
}

function mapDbBooking(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    persisted: true,
    name: row.name,
    email: row.email,
    phone: row.phone,
    eventType: row.event_type,
    eventDate: row.event_date,
    eventEndDate: null,
    eventTimeZone: DEFAULT_TIMEZONE,
    packageId: row.package_id,
    message: row.message
  };
}

async function fetchBookingById(id) {
  if (!db.isConfigured()) {
    return null;
  }

  try {
    const result = await db.runQuery(
      `SELECT id, name, email, phone, event_type, event_date, package_id, message, status, created_at, updated_at
       FROM bookings
       WHERE id = $1
       LIMIT 1`,
      [id]
    );

    if (result?.rows?.length) {
      return mapDbBooking(result.rows[0]);
    }
  } catch (error) {
    console.error('[bookingService] Failed to fetch booking by id:', error.message);
  }

  return null;
}

async function updateBooking(id, updates = {}) {
  if (!id) {
    return null;
  }

  const hasEventDateUpdate = Object.prototype.hasOwnProperty.call(updates, 'eventDate');
  const normalizedEventDate = hasEventDateUpdate ? normalizeEventDate(updates.eventDate) : null;
  const eventDateValue = normalizedEventDate ? normalizedEventDate.start : undefined;

  let record = null;
  const dbColumnMap = {
    name: 'name',
    email: 'email',
    phone: 'phone',
    eventType: 'event_type',
    message: 'message',
    packageId: 'package_id',
    status: 'status'
  };

  const dbUpdates = {};
  for (const [field, column] of Object.entries(dbColumnMap)) {
    if (Object.prototype.hasOwnProperty.call(updates, field) && typeof updates[field] !== 'undefined') {
      dbUpdates[column] = updates[field];
    }
  }

  if (hasEventDateUpdate) {
    dbUpdates.event_date = eventDateValue;
  }

  if (db.isConfigured() && Object.keys(dbUpdates).length) {
    const setClauses = [];
    const values = [];
    let index = 1;

    for (const [column, value] of Object.entries(dbUpdates)) {
      setClauses.push(`${column} = $${index}`);
      values.push(value);
      index += 1;
    }

    setClauses.push(`updated_at = NOW()`);
    values.push(id);

    try {
      const result = await db.runQuery(
        `UPDATE bookings
         SET ${setClauses.join(', ')}
         WHERE id = $${index}
         RETURNING id, name, email, phone, event_type, event_date, package_id, message, status, created_at, updated_at`,
        values
      );

      if (result?.rows?.length) {
        record = mapDbBooking(result.rows[0]);
      }
    } catch (error) {
      console.error('[bookingService] Failed to update booking:', error.message);
    }
  } else if (db.isConfigured()) {
    record = await fetchBookingById(id);
  }

  if (!record && inMemoryBookings.has(id)) {
    record = {
      ...inMemoryBookings.get(id)
    };
  }

  if (!record) {
    return null;
  }

  const updatedRecord = {
    ...record,
    name: Object.prototype.hasOwnProperty.call(updates, 'name') ? updates.name : record.name,
    email: Object.prototype.hasOwnProperty.call(updates, 'email') ? updates.email : record.email,
    phone: Object.prototype.hasOwnProperty.call(updates, 'phone') ? updates.phone : record.phone,
    eventType: Object.prototype.hasOwnProperty.call(updates, 'eventType') ? updates.eventType : record.eventType,
    packageId: Object.prototype.hasOwnProperty.call(updates, 'packageId') ? updates.packageId : record.packageId,
    message: Object.prototype.hasOwnProperty.call(updates, 'message') ? updates.message : record.message,
    status: Object.prototype.hasOwnProperty.call(updates, 'status') ? updates.status : record.status,
    eventDate:
      normalizedEventDate && normalizedEventDate.start ? normalizedEventDate.start : record.eventDate || null,
    eventEndDate:
      normalizedEventDate && normalizedEventDate.end !== null
        ? normalizedEventDate.end
        : record.eventEndDate || null,
    eventTimeZone:
      normalizedEventDate && normalizedEventDate.timeZone
        ? normalizedEventDate.timeZone
        : record.eventTimeZone || DEFAULT_TIMEZONE,
    updatedAt: new Date()
  };

  if (!updatedRecord.persisted) {
    inMemoryBookings.set(id, updatedRecord);
  }

  try {
    await rentGuyService.syncBooking(
      {
        id: updatedRecord.id,
        status: updatedRecord.status,
        createdAt: updatedRecord.createdAt,
        updatedAt: updatedRecord.updatedAt,
        persisted: updatedRecord.persisted,
        name: updatedRecord.name,
        email: updatedRecord.email,
        phone: updatedRecord.phone,
        eventType: updatedRecord.eventType,
        eventDate: updatedRecord.eventDate,
        eventEndDate: updatedRecord.eventEndDate,
        eventTimeZone: updatedRecord.eventTimeZone,
        packageId: updatedRecord.packageId,
        message: updatedRecord.message
      },
      { source: 'booking-update' }
    );
  } catch (error) {
    console.error('[bookingService] Failed to sync updated booking:', error.message);
  }

  return updatedRecord;
}

async function deleteBooking(id) {
  if (!id) {
    return false;
  }

  let removed = false;

  if (db.isConfigured()) {
    try {
      const result = await db.runQuery('DELETE FROM bookings WHERE id = $1 RETURNING id', [id]);
      removed = result?.rowCount > 0;
    } catch (error) {
      console.error('[bookingService] Failed to delete booking:', error.message);
    }
  }

  if (!removed && inMemoryBookings.has(id)) {
    inMemoryBookings.delete(id);
    removed = true;
  }

  return removed;
}

module.exports = {
  createBooking,
  getRecentBookings,
  updateBooking,
  deleteBooking,
  resetInMemoryStore,
  getBookingServiceStatus,
  ping
};
