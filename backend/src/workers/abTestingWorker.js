const { logger } = require('../lib/logger');
const config = require('../config');

const DEFAULT_INTERVAL_MS = 3600000; // 1 hour
const MIN_CONVERSIONS_PER_VARIANT = 300;
const SIGNIFICANCE_THRESHOLD = 0.05; // p-value < 0.05

let intervalHandle = null;
let posthog = null;

/**
 * Initialize PostHog client for A/B test metrics
 */
function initializePostHog() {
  if (!config.posthog?.apiKey || !config.posthog?.host) {
    logger.warn('PostHog not configured - A/B testing worker will run in dry-run mode');
    return null;
  }

  try {
    const { PostHog } = require('posthog-node');
    return new PostHog(config.posthog.apiKey, { host: config.posthog.host });
  } catch (error) {
    logger.error({ err: error }, 'Failed to initialize PostHog client');
    return null;
  }
}

/**
 * Fetch metrics for a specific feature flag from PostHog
 */
async function fetchFeatureFlagMetrics(flagKey) {
  if (!posthog) {
    return null;
  }

  try {
    // Note: This is a placeholder - actual PostHog API calls would go here
    // PostHog's client library is primarily for event capture, not analytics queries
    // For production, you'd use PostHog's REST API or webhooks

    logger.debug({ flagKey }, 'Fetching feature flag metrics');

    // Placeholder data structure
    return {
      flagKey,
      variants: {
        control: { exposures: 0, conversions: 0, conversionRate: 0 },
        variant_a: { exposures: 0, conversions: 0, conversionRate: 0 },
        variant_b: { exposures: 0, conversions: 0, conversionRate: 0 }
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    logger.error({ err: error, flagKey }, 'Failed to fetch feature flag metrics');
    return null;
  }
}

/**
 * Calculate statistical significance using Chi-squared test
 * @param {Object} controlData - { exposures, conversions }
 * @param {Object} variantData - { exposures, conversions }
 * @returns {Object} - { significant: boolean, pValue: number }
 */
function calculateSignificance(controlData, variantData) {
  const { exposures: n1, conversions: x1 } = controlData;
  const { exposures: n2, conversions: x2 } = variantData;

  if (n1 < MIN_CONVERSIONS_PER_VARIANT || n2 < MIN_CONVERSIONS_PER_VARIANT) {
    return { significant: false, pValue: 1, reason: 'insufficient_sample_size' };
  }

  const p1 = x1 / n1;
  const p2 = x2 / n2;
  const pooledP = (x1 + x2) / (n1 + n2);

  if (pooledP === 0 || pooledP === 1) {
    return { significant: false, pValue: 1, reason: 'invalid_pooled_proportion' };
  }

  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / n1 + 1 / n2));

  if (se === 0) {
    return { significant: false, pValue: 1, reason: 'zero_standard_error' };
  }

  const zScore = (p2 - p1) / se;

  // Approximate p-value from z-score (two-tailed test)
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));

  return {
    significant: pValue < SIGNIFICANCE_THRESHOLD,
    pValue,
    zScore,
    controlRate: p1,
    variantRate: p2,
    lift: p2 - p1
  };
}

/**
 * Cumulative distribution function for standard normal distribution
 */
function normalCDF(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const probability =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - probability : probability;
}

/**
 * Analyze A/B test results for a single feature flag
 */
async function analyzeFeatureFlag(flagKey) {
  const metrics = await fetchFeatureFlagMetrics(flagKey);

  if (!metrics) {
    return { flagKey, status: 'no_data' };
  }

  const { variants } = metrics;
  const variantKeys = Object.keys(variants);

  if (variantKeys.length < 2) {
    return { flagKey, status: 'insufficient_variants' };
  }

  // Assume first variant is control
  const controlKey = variantKeys[0];
  const control = variants[controlKey];

  const results = {
    flagKey,
    control: controlKey,
    timestamp: metrics.timestamp,
    comparisons: []
  };

  // Compare each variant to control
  for (let i = 1; i < variantKeys.length; i++) {
    const variantKey = variantKeys[i];
    const variant = variants[variantKey];

    const analysis = calculateSignificance(
      { exposures: control.exposures, conversions: control.conversions },
      { exposures: variant.exposures, conversions: variant.conversions }
    );

    results.comparisons.push({
      variant: variantKey,
      ...analysis,
      recommendation: getRecommendation(analysis)
    });
  }

  return results;
}

/**
 * Generate recommendation based on analysis
 */
function getRecommendation(analysis) {
  if (analysis.reason === 'insufficient_sample_size') {
    return 'CONTINUE - Need more data (minimum 300 conversions per variant)';
  }

  if (!analysis.significant) {
    return 'CONTINUE - No significant difference detected';
  }

  if (analysis.lift > 0) {
    return `WINNER - Variant performs ${(analysis.lift * 100).toFixed(1)}% better (p=${analysis.pValue.toFixed(4)})`;
  }

  return `LOSER - Control performs better (p=${analysis.pValue.toFixed(4)})`;
}

/**
 * A/B testing worker tick - runs periodically to analyze tests
 */
async function tick() {
  try {
    if (!posthog) {
      logger.debug('PostHog not configured - skipping A/B test analysis');
      return;
    }

    // Feature flags to monitor (from frontend config)
    const FLAGS_TO_MONITOR = [
      'hero_cta_variant',
      'package_badge_variant',
      'testimonial_format',
      'booking_cta_variant',
      'price_display_variant',
      'whatsapp_prominence'
    ];

    logger.info({ event: 'ab_testing.worker.tick', flags: FLAGS_TO_MONITOR.length }, 'Analyzing A/B tests');

    const results = [];
    for (const flagKey of FLAGS_TO_MONITOR) {
      const analysis = await analyzeFeatureFlag(flagKey);
      results.push(analysis);

      logger.info(
        {
          event: 'ab_testing.analysis_complete',
          flagKey,
          status: analysis.status,
          comparisons: analysis.comparisons?.length || 0
        },
        'A/B test analysis complete'
      );
    }

    // Log summary
    const winners = results.flatMap(r =>
      r.comparisons?.filter(c => c.recommendation.startsWith('WINNER')) || []
    );

    if (winners.length > 0) {
      logger.info(
        {
          event: 'ab_testing.winners_detected',
          count: winners.length,
          details: winners
        },
        'A/B test winners detected - review in PostHog dashboard'
      );
    }

  } catch (error) {
    logger.error({ event: 'ab_testing.worker-error', err: error }, 'A/B testing worker failed');
  }
}

/**
 * Start the A/B testing worker
 */
function startABTestingWorker({ intervalMs = DEFAULT_INTERVAL_MS } = {}) {
  if (intervalHandle) {
    logger.warn('A/B testing worker already running');
    return;
  }

  posthog = initializePostHog();

  intervalHandle = setInterval(tick, intervalMs);

  if (typeof intervalHandle.unref === 'function') {
    intervalHandle.unref();
  }

  logger.info(
    {
      event: 'ab_testing.worker-started',
      intervalMs,
      posthogConfigured: !!posthog
    },
    'A/B testing worker started'
  );

  // Run initial analysis after 30 seconds
  setTimeout(() => {
    tick().catch((error) => {
      logger.error({ event: 'ab_testing.worker-initial-error', err: error }, 'Initial A/B test analysis failed');
    });
  }, 30000);
}

/**
 * Stop the A/B testing worker
 */
function stopABTestingWorker() {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
    logger.info({ event: 'ab_testing.worker-stopped' }, 'A/B testing worker stopped');
  }

  if (posthog) {
    posthog.shutdown().catch((error) => {
      logger.error({ err: error }, 'Failed to shutdown PostHog client');
    });
    posthog = null;
  }
}

module.exports = {
  startABTestingWorker,
  stopABTestingWorker,
  analyzeFeatureFlag,
  calculateSignificance
};
