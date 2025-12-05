/**
 * Competitive Intelligence API Routes
 */

const express = require('express');
const router = express.Router();
const competitiveIntelligenceWorker = require('../services/competitiveIntelligenceWorker');
const competitorTrackingService = require('../services/competitorTrackingService');
const websiteManagerAgent = require('../services/websiteManagerAgent');

// Get worker status
router.get('/status', async (req, res) => {
  try {
    const status = await competitiveIntelligenceWorker.getStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Trigger manual tracking run
router.post('/track/manual', async (req, res) => {
  try {
    const job = await competitiveIntelligenceWorker.triggerManualRun();
    res.json({ message: 'Tracking job queued', jobId: job.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all competitors
router.get('/competitors', async (req, res) => {
  try {
    const competitors = await competitorTrackingService.getActiveCompetitors();
    res.json(competitors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
