const fs = require('fs');
const os = require('os');
const path = require('path');
const { once } = require('events');
const { createRentGuyMockServer } = require('../../scripts/rentguy-mock-server');
const { buildRequiredEnv } = require('../testUtils/env');

const ORIGINAL_ENV = { ...process.env };
const ORIGINAL_FETCH = global.fetch;
const HOST = '127.0.0.1';
const API_KEY = 'rentguy-contract-test-key';
const WORKSPACE_ID = 'rentguy-contract-test-workspace';
const MANAGED_ENV_TEMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'mr-dj-rentguy-contract-test-'));
const MANAGED_ENV_STORE_PATH = path.join(MANAGED_ENV_TEMP_DIR, 'managed.env');

describe('RentGuy consumer/provider mock contract', () => {
  let server;
  let state;
  let rentGuyService;

  beforeAll(async () => {
    if (typeof ORIGINAL_FETCH !== 'function') {
      throw new Error('RentGuy contract test requires the native fetch implementation.');
    }

    const mock = createRentGuyMockServer({
      apiKey: API_KEY,
      workspaceId: WORKSPACE_ID,
      logger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn()
      }
    });
    state = mock.state;

    server = mock.app.listen(0, HOST);
    await once(server, 'listening');

    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('RentGuy mock server did not expose an ephemeral TCP address.');
    }

    expect(address.address).toBe(HOST);

    jest.resetModules();
    process.env = buildRequiredEnv({
      CONFIG_DASHBOARD_STORE_PATH: MANAGED_ENV_STORE_PATH,
      FLAG_RENTGUY_INTEGRATION: 'true',
      RENTGUY_API_BASE_URL: `http://${HOST}:${address.port}`,
      RENTGUY_API_KEY: API_KEY,
      RENTGUY_WORKSPACE_ID: WORKSPACE_ID
    });
    global.fetch = ORIGINAL_FETCH;

    rentGuyService = require('../services/rentGuyService');
    await rentGuyService.reset();
  });

  afterAll(async () => {
    const teardownErrors = [];

    try {
      await rentGuyService?.reset();
    } catch (error) {
      teardownErrors.push(error);
    }

    try {
      if (server) {
        const closed = new Promise((resolve, reject) => {
          server.close((error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve();
          });
        });
        server.closeAllConnections?.();
        await closed;
      }
    } catch (error) {
      teardownErrors.push(error);
    }

    process.env = { ...ORIGINAL_ENV };
    if (ORIGINAL_FETCH) {
      global.fetch = ORIGINAL_FETCH;
    } else {
      delete global.fetch;
    }
    jest.resetModules();

    try {
      fs.rmSync(MANAGED_ENV_TEMP_DIR, { recursive: true, force: true });
    } catch (error) {
      teardownErrors.push(error);
    }

    if (teardownErrors.length) {
      throw new AggregateError(teardownErrors, 'RentGuy contract test teardown failed');
    }
  });

  it('delivers bookings, leads and personalization events through the real mock contract', async () => {
    const booking = {
      id: 'contract-booking-1',
      status: 'pending',
      eventType: 'Bedrijfsfeest',
      eventDate: '2026-08-14T18:00:00.000Z',
      packageId: 'gold',
      name: 'Contract Booking',
      email: 'booking@example.test',
      phone: '+31600000001',
      message: 'Contract booking payload',
      persisted: true
    };
    const lead = {
      id: 'contract-lead-1',
      status: 'pending',
      eventType: 'Bruiloft',
      eventDate: '2026-09-12T17:30:00.000Z',
      packageId: null,
      name: 'Contract Lead',
      email: 'lead@example.test',
      phone: '+31600000002',
      message: 'Contract lead payload',
      persisted: false
    };
    const personalizationEvent = {
      variantId: 'city_eindhoven',
      eventType: 'impression',
      keyword: 'dj eindhoven',
      timestamp: '2026-07-24T00:00:00.000Z'
    };

    const bookingResult = await rentGuyService.syncBooking(booking);
    const leadResult = await rentGuyService.syncLead(lead);
    const personalizationResult = await rentGuyService.syncPersonalizationEvent(personalizationEvent);

    expect([bookingResult, leadResult, personalizationResult]).toEqual([
      { delivered: true, queued: false, queueSize: 0 },
      { delivered: true, queued: false, queueSize: 0 },
      { delivered: true, queued: false, queueSize: 0 }
    ]);

    expect(state.bookings).toHaveLength(1);
    expect(state.bookings[0]).toMatchObject({
      bookingId: booking.id,
      contact: {
        name: booking.name,
        email: booking.email,
        phone: booking.phone
      },
      source: 'mister-dj-website'
    });

    expect(state.leads).toHaveLength(1);
    expect(state.leads[0]).toMatchObject({
      leadId: lead.id,
      contact: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone
      },
      source: 'mister-dj-website'
    });

    expect(state.personalizationEvents).toHaveLength(1);
    expect(state.personalizationEvents[0]).toMatchObject(personalizationEvent);
    expect(state.lastDelivery).toMatchObject({
      resource: 'personalization-event',
      status: 202,
      payload: personalizationEvent
    });
  });
});
