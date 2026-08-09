const express = require('express');
const rentGuyService = require('../services/rentGuyService');
const sevensaService = require('../services/sevensaService');
const instagramService = require('../services/instagramService');
const whatsappService = require('../services/whatsappService');
const config = require('../config');
const { logger } = require('../lib/logger');
const { assertValidSignature, SignatureVerificationError } = require('../lib/signature');

const router = express.Router();
const WEBHOOK_SIGNATURE_HEADER = 'x-mrdj-signature';

function verifyWebhookRequest(req, secrets) {
  const payload = Buffer.isBuffer(req.rawBody)
    ? req.rawBody
    : Buffer.from(JSON.stringify(req.body || {}), 'utf8');
  return assertValidSignature({
    header: req.get(WEBHOOK_SIGNATURE_HEADER),
    payload,
    secrets
  });
}

function rejectInvalidSignature(res, error) {
  res.status(error.statusCode || 401).json({
    error: 'Invalid webhook signature',
    code: error.code
  });
}

const CRM_EXPORT_COLUMNS = [
  'lead_id',
  'queue_status',
  'queued_at',
  'attempts',
  'last_error',
  'firstname',
  'lastname',
  'email',
  'phone',
  'company',
  'message',
  'event_date',
  'event_type',
  'budget',
  'page_uri',
  'page_name',
  'source'
];

function toCsvValue(value) {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value);
  if (/["\n,]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

function buildCsv(columns, rows) {
  const header = columns.join(',');
  const body = rows.map((row) => columns.map((column) => toCsvValue(row[column])).join(','));
  return [header].concat(body).join('\n');
}

router.get('/rentguy/status', async (_req, res, next) => {
  try {
    const status = await rentGuyService.getStatus();
    res.json(status);
  } catch (error) {
    next(error);
  }
});

router.get('/sevensa/status', async (_req, res, next) => {
  try {
    const status = await sevensaService.getStatus();
    res.json(status);
  } catch (error) {
    next(error);
  }
});

router.post('/rentguy/webhook', (req, res, next) => {
  try {
    const secrets = config.integrations?.rentGuy?.webhookSecrets || [];
    const verification = verifyWebhookRequest(req, secrets);
    logger.info(
      {
        source: 'rentguy-webhook',
        matchedSecretIndex: secrets.indexOf(verification.secret),
        eventType: req.body?.type || req.body?.event || 'unknown'
      },
      'Received authenticated RentGuy webhook'
    );
    res.status(204).end();
  } catch (error) {
    if (error instanceof SignatureVerificationError) {
      logger.warn({ err: error, source: 'rentguy-webhook' }, 'Rejected RentGuy webhook');
      rejectInvalidSignature(res, error);
      return;
    }
    next(error);
  }
});

router.post('/personalization/webhook', (req, res, next) => {
  try {
    const secrets = config.personalization?.incomingWebhookSecrets || [];
    const verification = verifyWebhookRequest(req, secrets);
    logger.info(
      {
        source: 'personalization-webhook',
        matchedSecretIndex: secrets.indexOf(verification.secret),
        eventType: req.body?.type || req.body?.event || 'unknown'
      },
      'Received authenticated personalization webhook'
    );
    res.status(204).end();
  } catch (error) {
    if (error instanceof SignatureVerificationError) {
      logger.warn({ err: error, source: 'personalization-webhook' }, 'Rejected personalization webhook');
      rejectInvalidSignature(res, error);
      return;
    }
    next(error);
  }
});

router.get('/instagram/reels', async (req, res, next) => {
  try {
    const limit = req.query?.limit;
    const after = typeof req.query?.after === 'string' ? req.query.after : undefined;
    const result = await instagramService.getReels({ limit, after });
    res.json(result);
  } catch (error) {
    if (error instanceof instagramService.InstagramServiceError) {
      res.status(error.statusCode || 500).json({ error: error.message, code: error.code });
      return;
    }

    next(error);
  }
});

router.get('/crm/export', async (_req, res, next) => {
  try {
    const rows = await sevensaService.getCrmExportRows();
    const csv = buildCsv(CRM_EXPORT_COLUMNS, rows);
    res.set('Content-Type', 'text/csv; charset=utf-8');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    res.set('Content-Disposition', `attachment; filename="crm-export-${timestamp}.csv"`);
    res.send(csv);
  } catch (error) {
    next(error);
  }
});

function ensureWhatsappConfigured(res) {
  if (!config.integrations?.whatsapp?.enabled) {
    res.status(503).json({ error: 'WhatsApp integration is not configured', code: 'whatsapp_not_configured' });
    return false;
  }

  return true;
}

function verifyWhatsappSignature(req, res, next) {
  const secrets = config.integrations?.whatsapp?.integrationSecrets || [];
  if (!secrets.length) {
    res.status(503).json({ error: 'WhatsApp integration secrets are not configured', code: 'whatsapp_missing_secret' });
    return;
  }

  try {
    const header = req.get('x-integration-signature');
    const payload = req.rawBody?.length ? req.rawBody : Buffer.from(JSON.stringify(req.body ?? {}));
    assertValidSignature({ header, payload, secrets });
    next();
  } catch (error) {
    if (error instanceof SignatureVerificationError) {
      res.status(error.statusCode || 401).json({ error: error.message, code: error.code });
      return;
    }

    next(error);
  }
}

router.post('/whatsapp/booking-confirmation', verifyWhatsappSignature, async (req, res, next) => {
  if (!ensureWhatsappConfigured(res)) {
    return;
  }

  try {
    const result = await whatsappService.sendBookingConfirmation(req.body || {});
    res.status(202).json({ success: true, result });
  } catch (error) {
    if (error instanceof whatsappService.WhatsappServiceError) {
      res.status(error.statusCode || 500).json({ error: error.message, code: error.code });
      return;
    }

    next(error);
  }
});

router.post('/whatsapp/custom-message', verifyWhatsappSignature, async (req, res, next) => {
  if (!ensureWhatsappConfigured(res)) {
    return;
  }

  try {
    const result = await whatsappService.sendTextMessage(req.body || {});
    res.status(202).json({ success: true, result });
  } catch (error) {
    if (error instanceof whatsappService.WhatsappServiceError) {
      res.status(error.statusCode || 500).json({ error: error.message, code: error.code });
      return;
    }

    next(error);
  }
});

module.exports = router;
