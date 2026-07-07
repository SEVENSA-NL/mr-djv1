const express = require('express');
const rentGuyService = require('../services/rentGuyService');
const sevensaService = require('../services/sevensaService');
const observabilityService = require('../services/observabilityService');
const contactService = require('../services/contactService');

const router = express.Router();

function normalizeQueueStatus(status = {}) {
  const metrics = status.metrics || {};
  const counts = metrics.counts || {};

  return {
    configured: Boolean(status.configured),
    queueSize: Number(status.queueSize || 0),
    activeJobs: Number(status.activeJobs || counts.active || 0),
    retryAgeP95: Number(metrics.retryAgeP95 || status.retryAgeP95 || 0),
    counts,
    deadLetterCount: Number(status.deadLetterCount || 0)
  };
}

async function trackServiceCall(serviceName, fn) {
  const start = process.hrtime.bigint();
  try {
    return await fn();
  } finally {
    const durationNs = process.hrtime.bigint() - start;
    const latencyMs = Number(durationNs) / 1e6;
    observabilityService.recordRequestMetric(serviceName, latencyMs);
  }
}

router.get('/queues', async (_req, res, next) => {
  try {
    const [rentGuy, sevensa] = await Promise.all([
      trackServiceCall('rentguy', () => rentGuyService.getStatus()),
      trackServiceCall('sevensa', () => sevensaService.getStatus())
    ]);

    const payload = {
      queues: {
        rentguy: normalizeQueueStatus(rentGuy),
        sevensa: normalizeQueueStatus(sevensa)
      },
      requestMetrics: observabilityService.getRequestMetricsSummary(),
      generatedAt: new Date().toISOString()
    };

    res.json(payload);
  } catch (error) {
    next(error);
  }
});

router.get('/contact-backlog', (_req, res) => {
  const snapshot = contactService.getFallbackQueueSnapshot(100);
  res.json({
    generatedAt: new Date().toISOString(),
    queueSize: snapshot.queueSize,
    queue: snapshot.items || snapshot.entries || [],
    metrics: snapshot.metrics || contactService.getQueueMetrics()
  });
});

module.exports = router;
