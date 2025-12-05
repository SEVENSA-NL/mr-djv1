/**
 * Competitor Tracking Service
 * Monitors 25 key variables for each competitor daily
 */

const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../lib/db');
const { logger } = require('../lib/logger');

const TRACKED_VARIABLES = [
  // Pricing & Offerings (5)
  'pricing_min',
  'pricing_max',
  'package_count',
  'special_offers',
  'discount_active',

  // SEO & Visibility (5)
  'page_title',
  'meta_description',
  'h1_content',
  'keyword_density',
  'page_load_time',

  // Social Proof (5)
  'rating_score',
  'rating_count',
  'review_freshness',
  'testimonial_count',
  'video_testimonials',

  // Content & Features (5)
  'service_count',
  'blog_post_count',
  'faq_count',
  'image_count',
  'video_count',

  // Technical & UX (5)
  'ssl_active',
  'mobile_responsive',
  'contact_form_present',
  'chat_widget_present',
  'booking_system_type'
];

class CompetitorTrackingService {
  constructor() {
    this.userAgent = 'Mozilla/5.0 (compatible; MrDJ-CI-Bot/1.0; +https://mr-dj.nl/bot)';
  }

  /**
   * Track all active competitors
   */
  async trackAllCompetitors() {
    logger.info('[CompetitorTracking] Starting daily competitor tracking');

    try {
      const competitors = await this.getActiveCompetitors();
      logger.info(`[CompetitorTracking] Found ${competitors.length} competitors to track`);

      const results = [];

      for (const competitor of competitors) {
        try {
          const trackingData = await this.trackCompetitor(competitor);
          const changes = await this.saveTrackingData(competitor.id, trackingData);

          results.push({
            competitorId: competitor.id,
            name: competitor.name,
            success: true,
            variablesTracked: TRACKED_VARIABLES.length,
            changesDetected: changes.length,
            changes
          });
        } catch (error) {
          logger.error(`[CompetitorTracking] Failed to track ${competitor.name}:`, error.message);
          results.push({
            competitorId: competitor.id,
            name: competitor.name,
            success: false,
            error: error.message
          });
        }
      }

      return {
        timestamp: new Date(),
        totalCompetitors: competitors.length,
        successfulTracks: results.filter(r => r.success).length,
        totalChanges: results.reduce((sum, r) => sum + (r.changesDetected || 0), 0),
        results
      };
    } catch (error) {
      logger.error('[CompetitorTracking] Failed to track competitors:', error);
      throw error;
    }
  }

  /**
   * Get active competitors from database
   */
  async getActiveCompetitors() {
    const result = await db.runQuery(
      `SELECT id, name, website_url, business_type, geographic_focus
       FROM competitors
       WHERE status = 'active' AND website_url IS NOT NULL
       ORDER BY threat_level DESC, name ASC`
    );

    return result.rows;
  }

  /**
   * Track a single competitor across all 25 variables
   */
  async trackCompetitor(competitor) {
    logger.info(`[CompetitorTracking] Tracking ${competitor.name} (${competitor.website_url})`);

    const data = {
      competitor_id: competitor.id,
      tracked_at: new Date(),
      url: competitor.website_url,
      variables: {}
    };

    try {
      // Fetch website content
      const response = await axios.get(competitor.website_url, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 10000,
        maxRedirects: 5
      });

      const $ = cheerio.load(response.data);
      const html = response.data;

      // Track Pricing & Offerings
      data.variables.pricing_min = this.extractPricingMin($, html);
      data.variables.pricing_max = this.extractPricingMax($, html);
      data.variables.package_count = this.extractPackageCount($, html);
      data.variables.special_offers = this.extractSpecialOffers($, html);
      data.variables.discount_active = this.extractDiscountActive($, html);

      // Track SEO & Visibility
      data.variables.page_title = $('title').text().trim().substring(0, 255);
      data.variables.meta_description = $('meta[name="description"]').attr('content')?.trim().substring(0, 500);
      data.variables.h1_content = $('h1').first().text().trim().substring(0, 255);
      data.variables.keyword_density = this.calculateKeywordDensity($, html);
      data.variables.page_load_time = response.headers['x-response-time'] || null;

      // Track Social Proof
      data.variables.rating_score = this.extractRating($, html);
      data.variables.rating_count = this.extractRatingCount($, html);
      data.variables.review_freshness = this.extractReviewFreshness($, html);
      data.variables.testimonial_count = $('[class*="testimonial"], [class*="review"]').length;
      data.variables.video_testimonials = $('video, iframe[src*="youtube"], iframe[src*="vimeo"]').filter((i, el) => {
        return $(el).closest('[class*="testimonial"], [class*="review"]').length > 0;
      }).length;

      // Track Content & Features
      data.variables.service_count = this.extractServiceCount($, html);
      data.variables.blog_post_count = $('article, [class*="blog"], [class*="post"]').length;
      data.variables.faq_count = $('[class*="faq"] details, [class*="faq"] [class*="question"]').length;
      data.variables.image_count = $('img').length;
      data.variables.video_count = $('video, iframe[src*="youtube"], iframe[src*="vimeo"]').length;

      // Track Technical & UX
      data.variables.ssl_active = competitor.website_url.startsWith('https://');
      data.variables.mobile_responsive = this.checkMobileResponsive($, html);
      data.variables.contact_form_present = $('form[class*="contact"], form[action*="contact"]').length > 0;
      data.variables.chat_widget_present = $('[class*="chat"], [id*="chat"], script[src*="chat"], script[src*="intercom"], script[src*="drift"]').length > 0;
      data.variables.booking_system_type = this.detectBookingSystem($, html);

      data.success = true;
    } catch (error) {
      logger.error(`[CompetitorTracking] Failed to scrape ${competitor.website_url}:`, error.message);
      data.success = false;
      data.error = error.message;

      // Still collect what we can from database
      const lastTracking = await this.getLastTrackingData(competitor.id);
      if (lastTracking) {
        data.variables = lastTracking.variables;
      }
    }

    return data;
  }

  /**
   * Save tracking data and detect changes
   */
  async saveTrackingData(competitorId, trackingData) {
    // Get previous tracking data
    const previous = await this.getLastTrackingData(competitorId);

    // Insert new tracking record
    await db.runQuery(
      `INSERT INTO competitor_tracking_history
       (competitor_id, tracked_at, variables, success, error_message)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        competitorId,
        trackingData.tracked_at,
        JSON.stringify(trackingData.variables),
        trackingData.success,
        trackingData.error || null
      ]
    );

    // Update current values in competitors table
    if (trackingData.success) {
      await db.runQuery(
        `UPDATE competitors
         SET last_analyzed_at = $1,
             pricing_min = COALESCE($2::integer, pricing_min),
             pricing_max = COALESCE($3::integer, pricing_max),
             rating_score = COALESCE($4::decimal, rating_score),
             rating_count = COALESCE($5::integer, rating_count)
         WHERE id = $6`,
        [
          trackingData.tracked_at,
          trackingData.variables.pricing_min,
          trackingData.variables.pricing_max,
          trackingData.variables.rating_score,
          trackingData.variables.rating_count,
          competitorId
        ]
      );
    }

    // Detect changes
    const changes = [];
    if (previous && trackingData.success) {
      for (const variable of TRACKED_VARIABLES) {
        const oldValue = previous.variables[variable];
        const newValue = trackingData.variables[variable];

        if (this.isSignificantChange(variable, oldValue, newValue)) {
          changes.push({
            variable,
            oldValue,
            newValue,
            changeType: this.getChangeType(variable, oldValue, newValue)
          });
        }
      }
    }

    return changes;
  }

  /**
   * Get last tracking data for a competitor
   */
  async getLastTrackingData(competitorId) {
    const result = await db.runQuery(
      `SELECT variables, tracked_at
       FROM competitor_tracking_history
       WHERE competitor_id = $1 AND success = true
       ORDER BY tracked_at DESC
       LIMIT 1`,
      [competitorId]
    );

    if (result.rows.length === 0) return null;

    return {
      variables: result.rows[0].variables,
      trackedAt: result.rows[0].tracked_at
    };
  }

  /**
   * Determine if a change is significant
   */
  isSignificantChange(variable, oldValue, newValue) {
    if (oldValue === newValue) return false;
    if (oldValue === null || oldValue === undefined) return false;
    if (newValue === null || newValue === undefined) return false;

    // For numeric values, check if change is > 10%
    if (typeof oldValue === 'number' && typeof newValue === 'number') {
      const percentChange = Math.abs((newValue - oldValue) / oldValue) * 100;
      return percentChange > 10;
    }

    // For booleans and strings, any change is significant
    return true;
  }

  /**
   * Get change type (positive/negative/neutral)
   */
  getChangeType(variable, oldValue, newValue) {
    // Lower prices = threat (negative for us)
    if (variable.includes('pricing')) {
      return newValue < oldValue ? 'threat' : 'opportunity';
    }

    // Higher ratings = threat
    if (variable.includes('rating')) {
      return newValue > oldValue ? 'threat' : 'opportunity';
    }

    // More content = threat
    if (variable.includes('count')) {
      return newValue > oldValue ? 'threat' : 'neutral';
    }

    return 'neutral';
  }

  // Extraction methods
  extractPricingMin($, html) {
    const priceMatches = html.match(/€?\s*(\d{3,5})/g);
    if (!priceMatches) return null;
    const prices = priceMatches.map(m => parseInt(m.replace(/[^\d]/g, ''))).filter(p => p >= 300 && p <= 5000);
    return prices.length > 0 ? Math.min(...prices) : null;
  }

  extractPricingMax($, html) {
    const priceMatches = html.match(/€?\s*(\d{3,5})/g);
    if (!priceMatches) return null;
    const prices = priceMatches.map(m => parseInt(m.replace(/[^\d]/g, ''))).filter(p => p >= 300 && p <= 5000);
    return prices.length > 0 ? Math.max(...prices) : null;
  }

  extractPackageCount($, html) {
    return $('[class*="package"], [class*="pakket"], [class*="pricing"]').filter((i, el) => {
      const text = $(el).text().toLowerCase();
      return text.includes('pakket') || text.includes('package') || text.includes('€');
    }).length;
  }

  extractSpecialOffers($, html) {
    const offerText = html.toLowerCase();
    return (offerText.match(/korting|actie|special|offer|discount/g) || []).length;
  }

  extractDiscountActive($, html) {
    const text = html.toLowerCase();
    return text.includes('korting') || text.includes('discount') || text.includes('%') && text.includes('actie');
  }

  calculateKeywordDensity($, html) {
    const bodyText = $('body').text().toLowerCase();
    const keywords = ['dj', 'bruiloft', 'feest', 'party', 'wedding'];
    let totalKeywords = 0;
    keywords.forEach(kw => {
      const matches = bodyText.match(new RegExp(kw, 'g'));
      totalKeywords += matches ? matches.length : 0;
    });
    const wordCount = bodyText.split(/\s+/).length;
    return ((totalKeywords / wordCount) * 100).toFixed(2);
  }

  extractRating($, html) {
    // Try various rating formats
    const ratingText = html.match(/(\d\.?\d?)\s*(?:\/\s*(?:5|10)|★|ster|star)/i);
    if (ratingText) {
      const rating = parseFloat(ratingText[1]);
      return rating <= 5 ? rating * 2 : rating; // Normalize to 10-point scale
    }
    return null;
  }

  extractRatingCount($, html) {
    const countText = html.match(/(\d+)\s*(?:review|beoordeling|rating)/i);
    return countText ? parseInt(countText[1]) : null;
  }

  extractReviewFreshness($, html) {
    // Look for recent dates in review sections
    const reviewSection = $('[class*="review"], [class*="testimonial"]').text();
    const currentYear = new Date().getFullYear();
    return reviewSection.includes(currentYear.toString()) ? 'fresh' : 'stale';
  }

  extractServiceCount($, html) {
    return $('[class*="service"], [class*="dienst"]').filter((i, el) => {
      return $(el).text().trim().length > 20; // Avoid counting empty divs
    }).length;
  }

  checkMobileResponsive($, html) {
    return $('meta[name="viewport"]').length > 0 ||
           html.includes('@media') ||
           $('[class*="mobile"], [class*="responsive"]').length > 0;
  }

  detectBookingSystem($, html) {
    if (html.includes('calendly')) return 'calendly';
    if (html.includes('bookeo')) return 'bookeo';
    if (html.includes('simplybook')) return 'simplybook';
    if ($('form[class*="book"], input[name*="book"]').length > 0) return 'custom';
    return 'none';
  }
}

module.exports = new CompetitorTrackingService();
