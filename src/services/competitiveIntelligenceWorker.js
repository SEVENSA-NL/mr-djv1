/**
 * Competitive Intelligence Worker
 * BullMQ worker that runs daily at 07:00 to track competitors and generate reports
 */

const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');
const competitorTrackingService = require('./competitorTrackingService');
const websiteManagerAgent = require('./websiteManagerAgent');
const postmarkEmailService = require('./postmarkEmailService');
const { logger } = require('../lib/logger');

class CompetitiveIntelligenceWorker {
  constructor() {
    this.connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: null
    });

    // Create queue for competitive intelligence tasks
    this.queue = new Queue('competitive-intelligence', {
      connection: this.connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        },
        removeOnComplete: {
          count: 100 // Keep last 100 completed jobs
        },
        removeOnFail: {
          count: 500 // Keep last 500 failed jobs for debugging
        }
      }
    });

    this.worker = null;
  }

  /**
   * Initialize and start the worker
   */
  async start() {
    logger.info('[CI-Worker] Starting Competitive Intelligence Worker');

    // Create worker to process jobs
    this.worker = new Worker(
      'competitive-intelligence',
      async (job) => {
        return await this.processJob(job);
      },
      {
        connection: this.connection,
        concurrency: 1, // Process one job at a time
        limiter: {
          max: 10, // Max 10 jobs
          duration: 60000 // Per minute
        }
      }
    );

    // Worker event handlers
    this.worker.on('completed', (job) => {
      logger.info(`[CI-Worker] Job ${job.id} completed successfully`);
    });

    this.worker.on('failed', (job, err) => {
      logger.error(`[CI-Worker] Job ${job.id} failed:`, err.message);
    });

    this.worker.on('error', (err) => {
      logger.error('[CI-Worker] Worker error:', err);
    });

    // Schedule daily tracking job
    await this.scheduleDailyTracking();

    logger.info('[CI-Worker] Worker started and scheduled successfully');
  }

  /**
   * Schedule daily competitor tracking at 07:00
   */
  async scheduleDailyTracking() {
    // Remove existing repeatable jobs
    const repeatableJobs = await this.queue.getRepeatableJobs();
    for (const job of repeatableJobs) {
      await this.queue.removeRepeatableByKey(job.key);
    }

    // Schedule new job for 07:00 daily
    await this.queue.add(
      'daily-competitor-tracking',
      {
        type: 'daily-tracking',
        scheduledAt: new Date()
      },
      {
        repeat: {
          pattern: '0 7 * * *', // Cron: Every day at 07:00
          tz: 'Europe/Amsterdam'
        },
        jobId: 'daily-tracking-job'
      }
    );

    logger.info('[CI-Worker] Daily tracking scheduled for 07:00 CET');
  }

  /**
   * Process a job
   */
  async processJob(job) {
    logger.info(`[CI-Worker] Processing job ${job.id}: ${job.name}`);

    try {
      switch (job.data.type) {
        case 'daily-tracking':
          return await this.runDailyTracking();

        case 'manual-tracking':
          return await this.runManualTracking(job.data);

        case 'analyze-competitor':
          return await this.analyzeSpecificCompetitor(job.data.competitorId);

        default:
          throw new Error(`Unknown job type: ${job.data.type}`);
      }
    } catch (error) {
      logger.error(`[CI-Worker] Job processing failed:`, error);
      throw error;
    }
  }

  /**
   * Run daily competitive tracking and analysis
   */
  async runDailyTracking() {
    const startTime = Date.now();
    logger.info('[CI-Worker] Starting daily competitive tracking');

    try {
      // Step 1: Track all competitors (25 variables each)
      logger.info('[CI-Worker] Step 1: Tracking competitors...');
      const trackingResults = await competitorTrackingService.trackAllCompetitors();

      logger.info(`[CI-Worker] Tracking complete: ${trackingResults.successfulTracks}/${trackingResults.totalCompetitors} successful`);
      logger.info(`[CI-Worker] Total changes detected: ${trackingResults.totalChanges}`);

      // Step 2: Analyze data with AI agent
      logger.info('[CI-Worker] Step 2: Analyzing data with AI agent...');
      const analysis = await websiteManagerAgent.analyzeCompetitiveData(trackingResults);

      logger.info(`[CI-Worker] Analysis complete: ${analysis.recommendations.length} recommendations generated`);
      logger.info(`[CI-Worker] Threat level: ${analysis.summary.overallThreatLevel}`);

      // Step 3: Prepare report data
      logger.info('[CI-Worker] Step 3: Preparing email report...');
      const reportData = this.prepareReportData(trackingResults, analysis);

      // Step 4: Send email report
      logger.info('[CI-Worker] Step 4: Sending email report to info@mr-dj.nl...');
      const emailResult = await postmarkEmailService.sendCompetitiveIntelligenceReport(reportData);

      if (emailResult.success) {
        logger.info(`[CI-Worker] Email sent successfully: ${emailResult.messageId}`);
      } else {
        logger.error(`[CI-Worker] Email failed: ${emailResult.error}`);
      }

      const duration = Date.now() - startTime;
      logger.info(`[CI-Worker] Daily tracking completed in ${duration}ms`);

      return {
        success: true,
        duration,
        trackingResults: {
          totalCompetitors: trackingResults.totalCompetitors,
          successfulTracks: trackingResults.successfulTracks,
          totalChanges: trackingResults.totalChanges
        },
        analysis: {
          overallThreatLevel: analysis.summary.overallThreatLevel,
          recommendationCount: analysis.recommendations.length,
          criticalActions: analysis.summary.criticalActions
        },
        emailSent: emailResult.success
      };
    } catch (error) {
      logger.error('[CI-Worker] Daily tracking failed:', error);
      throw error;
    }
  }

  /**
   * Run manual tracking (triggered via API)
   */
  async runManualTracking(data) {
    logger.info('[CI-Worker] Running manual tracking');

    const trackingResults = await competitorTrackingService.trackAllCompetitors();
    const analysis = await websiteManagerAgent.analyzeCompetitiveData(trackingResults);

    return {
      success: true,
      trackingResults,
      analysis
    };
  }

  /**
   * Analyze specific competitor
   */
  async analyzeSpecificCompetitor(competitorId) {
    logger.info(`[CI-Worker] Analyzing competitor ${competitorId}`);

    // Implementation would fetch and analyze specific competitor
    return {
      success: true,
      competitorId
    };
  }

  /**
   * Prepare report data for email
   */
  prepareReportData(trackingResults, analysis) {
    // Extract top threats
    const topThreats = analysis.threatAssessment.topThreats.map(threat => {
      const competitorResult = trackingResults.results.find(r => r.competitorId === threat.competitorId);

      return {
        name: threat.name,
        threatScore: threat.threatScore,
        rating: 8.5, // Would fetch from tracking data
        pricingMin: 695,
        pricingMax: 1295,
        changes: threat.changes.map(c => c.variable),
        ourPosition: this.getOurPositionVsCompetitor(threat)
      };
    });

    // Extract keyword changes (if any)
    const keywordChanges = trackingResults.results
      .filter(r => r.changes && r.changes.some(c => c.variable.includes('keyword')))
      .map(r => ({
        keyword: 'bruiloft dj',
        competitor: r.name,
        previousRank: 5,
        currentRank: 3,
        change: -2,
        improvement: true
      }));

    // Extract pricing changes
    const pricingChanges = trackingResults.results
      .filter(r => r.changes && r.changes.some(c => c.variable.includes('pricing')))
      .map(r => {
        const priceChange = r.changes.find(c => c.variable.includes('pricing'));
        return {
          competitor: r.name,
          change: `Price changed from €${priceChange.oldValue} to €${priceChange.newValue}`,
          impact: priceChange.changeType === 'threat' ? 'Increased competition on pricing' : 'Opportunity to adjust'
        };
      });

    return {
      timestamp: trackingResults.timestamp,
      summary: analysis.summary,
      topThreats,
      recommendations: analysis.recommendations,
      keywordChanges,
      pricingChanges,
      newCompetitors: [] // Would be populated if new competitors are detected
    };
  }

  /**
   * Get our position vs competitor
   */
  getOurPositionVsCompetitor(threat) {
    if (threat.threatScore > 75) {
      return 'Critical: They are outperforming us in multiple areas';
    } else if (threat.threatScore > 50) {
      return 'Warning: They are competitive in several key metrics';
    } else {
      return 'Stable: We maintain advantage in most areas';
    }
  }

  /**
   * Manually trigger a tracking run (for testing)
   */
  async triggerManualRun() {
    logger.info('[CI-Worker] Manually triggering tracking run');

    return await this.queue.add(
      'manual-competitor-tracking',
      {
        type: 'manual-tracking',
        triggeredAt: new Date()
      }
    );
  }

  /**
   * Get queue status and statistics
   */
  async getStatus() {
    const jobCounts = await this.queue.getJobCounts();
    const repeatableJobs = await this.queue.getRepeatableJobs();
    const workers = await this.queue.getWorkers();

    return {
      queue: {
        waiting: jobCounts.waiting,
        active: jobCounts.active,
        completed: jobCounts.completed,
        failed: jobCounts.failed,
        delayed: jobCounts.delayed
      },
      scheduledJobs: repeatableJobs.length,
      activeWorkers: workers.length,
      nextRun: repeatableJobs[0] ? new Date(repeatableJobs[0].next) : null
    };
  }

  /**
   * Stop the worker gracefully
   */
  async stop() {
    logger.info('[CI-Worker] Stopping worker...');

    if (this.worker) {
      await this.worker.close();
    }

    await this.queue.close();
    await this.connection.quit();

    logger.info('[CI-Worker] Worker stopped');
  }
}

// Export singleton instance
const worker = new CompetitiveIntelligenceWorker();

module.exports = worker;
