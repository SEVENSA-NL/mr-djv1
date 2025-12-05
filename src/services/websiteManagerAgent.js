/**
 * Website Manager Agent
 * AI-powered agent that analyzes competitive intelligence and makes strategic recommendations
 * Uses local LLM (Ollama) for analysis
 */

const axios = require('axios');
const db = require('../lib/db');
const { logger } = require('../lib/logger');

class WebsiteManagerAgent {
  constructor() {
    this.ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'llama2';
  }

  /**
   * Analyze competitive tracking data and generate strategic recommendations
   */
  async analyzeCompetitiveData(trackingResults, historicalData = null) {
    logger.info('[WebsiteManagerAgent] Starting competitive analysis');

    try {
      // Prepare context for LLM
      const context = await this.prepareAnalysisContext(trackingResults, historicalData);

      // Generate analysis using local LLM
      const analysis = await this.generateLLMAnalysis(context);

      // Extract structured recommendations
      const recommendations = this.extractRecommendations(analysis, trackingResults);

      // Calculate threat scores
      const threatAssessment = this.assessThreats(trackingResults);

      // Generate executive summary
      const summary = this.generateExecutiveSummary(trackingResults, threatAssessment, recommendations);

      return {
        timestamp: new Date(),
        summary,
        threatAssessment,
        recommendations,
        rawAnalysis: analysis,
        context
      };
    } catch (error) {
      logger.error('[WebsiteManagerAgent] Analysis failed:', error);
      throw error;
    }
  }

  /**
   * Prepare context for LLM analysis
   */
  async prepareAnalysisContext(trackingResults, historicalData) {
    const successfulTracks = trackingResults.results.filter(r => r.success);

    // Get our current position
    const ourData = await this.getOurCurrentMetrics();

    // Identify significant changes
    const significantChanges = successfulTracks
      .filter(r => r.changesDetected > 0)
      .map(r => ({
        competitor: r.name,
        changes: r.changes
      }));

    // Aggregate competitor strengths
    const competitorStrengths = await this.getCompetitorStrengths();

    // Get keyword performance
    const keywordData = await this.getKeywordPerformance();

    return {
      ourPosition: ourData,
      totalCompetitorsTracked: trackingResults.totalCompetitors,
      successfulTracks: trackingResults.successfulTracks,
      totalChanges: trackingResults.totalChanges,
      significantChanges,
      competitorStrengths,
      keywordData,
      timestamp: trackingResults.timestamp
    };
  }

  /**
   * Generate analysis using local LLM
   */
  async generateLLMAnalysis(context) {
    const prompt = `You are an expert competitive intelligence analyst for Mr-DJ, a premium DJ service in the Netherlands. Analyze the following competitive intelligence data and provide strategic recommendations.

CURRENT SITUATION:
- We are tracking ${context.totalCompetitorsTracked} competitors
- ${context.totalChanges} changes detected in the last 24 hours
- ${context.significantChanges.length} competitors made significant changes

OUR CURRENT POSITION:
${JSON.stringify(context.ourPosition, null, 2)}

SIGNIFICANT COMPETITOR CHANGES:
${context.significantChanges.map(c => `
Competitor: ${c.competitor}
Changes: ${c.changes.map(ch => `${ch.variable}: ${ch.oldValue} → ${ch.newValue} (${ch.changeType})`).join('\n')}
`).join('\n')}

COMPETITOR STRENGTHS:
${JSON.stringify(context.competitorStrengths, null, 2)}

KEYWORD PERFORMANCE:
${JSON.stringify(context.keywordData, null, 2)}

Based on this data, provide:
1. Top 5 strategic recommendations with priority levels (HIGH/MEDIUM/LOW)
2. Immediate actions we should take (within 24-48 hours)
3. Threats to monitor closely
4. Opportunities to capitalize on
5. Estimated business impact for each recommendation

Format your response as structured JSON with the following schema:
{
  "recommendations": [
    {
      "title": "string",
      "priority": "HIGH|MEDIUM|LOW",
      "category": "pricing|content|seo|tech|ux",
      "description": "string",
      "action": "string",
      "timeline": "string",
      "estimatedImpact": "string",
      "estimatedROI": "string"
    }
  ],
  "immediateActions": ["string"],
  "threatsToMonitor": ["string"],
  "opportunities": ["string"]
}`;

    try {
      const response = await axios.post(`${this.ollamaUrl}/api/generate`, {
        model: this.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9
        }
      }, {
        timeout: 60000 // 60 second timeout
      });

      const generatedText = response.data.response;

      // Try to extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e) {
          logger.warn('[WebsiteManagerAgent] Failed to parse JSON from LLM, using fallback');
          return this.generateFallbackAnalysis(context);
        }
      }

      return this.generateFallbackAnalysis(context);
    } catch (error) {
      logger.error('[WebsiteManagerAgent] LLM request failed:', error.message);

      // Fallback to rule-based analysis if LLM is unavailable
      return this.generateFallbackAnalysis(context);
    }
  }

  /**
   * Generate fallback analysis using rule-based logic (when LLM is unavailable)
   */
  generateFallbackAnalysis(context) {
    const recommendations = [];
    const immediateActions = [];
    const threatsToMonitor = [];
    const opportunities = [];

    // Analyze pricing changes
    const pricingChanges = context.significantChanges.filter(c =>
      c.changes.some(ch => ch.variable.includes('pricing'))
    );

    if (pricingChanges.length > 0) {
      recommendations.push({
        title: 'Review Pricing Strategy',
        priority: 'HIGH',
        category: 'pricing',
        description: `${pricingChanges.length} competitors have changed their pricing. Review our pricing to ensure competitiveness.`,
        action: 'Conduct pricing analysis and adjust packages if necessary',
        timeline: '1-2 weeks',
        estimatedImpact: 'Medium-High conversion impact',
        estimatedROI: '15-25% increase in bookings'
      });

      immediateActions.push('Review competitor pricing changes and market positioning');
      threatsToMonitor.push('Competitors lowering prices to gain market share');
    }

    // Analyze content changes
    const contentChanges = context.significantChanges.filter(c =>
      c.changes.some(ch =>
        ch.variable.includes('count') ||
        ch.variable.includes('content') ||
        ch.variable.includes('faq')
      )
    );

    if (contentChanges.length > 0) {
      recommendations.push({
        title: 'Expand Content Strategy',
        priority: 'MEDIUM',
        category: 'content',
        description: `${contentChanges.length} competitors have improved their content. We should expand our FAQ, testimonials, and service descriptions.`,
        action: 'Add 5-10 new FAQ items, collect 3 new video testimonials, expand service descriptions',
        timeline: '2-4 weeks',
        estimatedImpact: 'Improved SEO and user engagement',
        estimatedROI: '10-15% increase in organic traffic'
      });

      opportunities.push('Content gap in competitor offerings - opportunity to dominate long-tail keywords');
    }

    // Analyze rating changes
    const ratingChanges = context.significantChanges.filter(c =>
      c.changes.some(ch => ch.variable.includes('rating'))
    );

    if (ratingChanges.length > 0) {
      recommendations.push({
        title: 'Boost Social Proof',
        priority: 'HIGH',
        category: 'ux',
        description: `${ratingChanges.length} competitors have improved their ratings. Focus on collecting more reviews and showcasing testimonials.`,
        action: 'Launch review collection campaign, add review widgets to homepage, showcase top testimonials',
        timeline: 'Ongoing',
        estimatedImpact: 'Increased trust and conversion rate',
        estimatedROI: '20-30% improvement in conversion'
      });

      immediateActions.push('Send review requests to recent clients');
      threatsToMonitor.push('Competitors gaining better reviews and ratings');
    }

    // Analyze SEO changes
    if (context.keywordData && context.keywordData.competitorImprovements > 0) {
      recommendations.push({
        title: 'Optimize SEO Strategy',
        priority: 'HIGH',
        category: 'seo',
        description: 'Competitors are improving their keyword rankings. Focus on high-value keywords and on-page SEO.',
        action: 'Optimize for top 10 priority keywords, improve meta descriptions, add schema markup',
        timeline: '1-3 weeks',
        estimatedImpact: 'Improved search visibility',
        estimatedROI: '25-40% increase in organic traffic'
      });

      opportunities.push('Gaps in competitor SEO strategy for local keywords');
    }

    // Technical improvements
    const techChanges = context.significantChanges.filter(c =>
      c.changes.some(ch =>
        ch.variable.includes('mobile') ||
        ch.variable.includes('ssl') ||
        ch.variable.includes('booking')
      )
    );

    if (techChanges.length > 0) {
      recommendations.push({
        title: 'Enhance Technical Capabilities',
        priority: 'MEDIUM',
        category: 'tech',
        description: `${techChanges.length} competitors have upgraded their technical infrastructure. Consider UX improvements.`,
        action: 'Improve mobile experience, add live chat, optimize booking flow',
        timeline: '3-6 weeks',
        estimatedImpact: 'Better user experience and lower bounce rate',
        estimatedROI: '15-20% improvement in conversion'
      });
    }

    return {
      recommendations,
      immediateActions,
      threatsToMonitor,
      opportunities
    };
  }

  /**
   * Extract structured recommendations from LLM analysis
   */
  extractRecommendations(analysis, trackingResults) {
    const recommendations = analysis.recommendations || [];

    // Enhance recommendations with tracking data
    return recommendations.map((rec, idx) => ({
      ...rec,
      id: idx + 1,
      impact: this.calculateImpactScore(rec, trackingResults),
      feasibility: this.calculateFeasibility(rec),
      urgency: this.calculateUrgency(rec, trackingResults)
    }));
  }

  /**
   * Assess threats from tracking data
   */
  assessThreats(trackingResults) {
    const threats = trackingResults.results
      .filter(r => r.success)
      .map(r => {
        const threatScore = this.calculateThreatScore(r);
        return {
          competitorId: r.competitorId,
          name: r.name,
          threatScore,
          threatLevel: threatScore > 75 ? 'critical' : threatScore > 50 ? 'high' : threatScore > 25 ? 'medium' : 'low',
          recentChanges: r.changesDetected,
          changes: r.changes || []
        };
      })
      .sort((a, b) => b.threatScore - a.threatScore);

    return {
      topThreats: threats.slice(0, 5),
      criticalThreats: threats.filter(t => t.threatLevel === 'critical').length,
      highThreats: threats.filter(t => t.threatLevel === 'high').length,
      averageThreatScore: threats.reduce((sum, t) => sum + t.threatScore, 0) / threats.length
    };
  }

  /**
   * Generate executive summary
   */
  generateExecutiveSummary(trackingResults, threatAssessment, recommendations) {
    const highPriorityActions = recommendations.filter(r => r.priority === 'HIGH').length;

    return {
      totalCompetitors: trackingResults.totalCompetitors,
      successfulTracks: trackingResults.successfulTracks,
      totalChanges: trackingResults.totalChanges,
      overallThreatLevel: threatAssessment.criticalThreats > 0 ? 'critical' :
        threatAssessment.highThreats > 3 ? 'high' :
          trackingResults.totalChanges > 10 ? 'medium' : 'low',
      criticalActions: highPriorityActions,
      topRecommendation: recommendations[0]
    };
  }

  // Helper methods
  calculateThreatScore(competitorData) {
    let score = 50; // Base score

    // More changes = higher threat
    score += competitorData.changesDetected * 5;

    // Pricing decreases are threats
    const pricingChanges = (competitorData.changes || []).filter(c =>
      c.variable.includes('pricing') && c.changeType === 'threat'
    );
    score += pricingChanges.length * 10;

    // Rating improvements are threats
    const ratingChanges = (competitorData.changes || []).filter(c =>
      c.variable.includes('rating') && c.changeType === 'threat'
    );
    score += ratingChanges.length * 8;

    return Math.min(100, Math.max(0, score));
  }

  calculateImpactScore(recommendation, trackingResults) {
    // High priority = high impact
    if (recommendation.priority === 'HIGH') return 'high';
    if (recommendation.priority === 'LOW') return 'low';
    return 'medium';
  }

  calculateFeasibility(recommendation) {
    // Categorize by timeline
    if (recommendation.timeline && recommendation.timeline.includes('week')) {
      const weeks = parseInt(recommendation.timeline);
      return weeks <= 2 ? 'high' : weeks <= 4 ? 'medium' : 'low';
    }
    return 'medium';
  }

  calculateUrgency(recommendation, trackingResults) {
    if (recommendation.priority === 'HIGH' && trackingResults.totalChanges > 5) return 'urgent';
    if (recommendation.priority === 'HIGH') return 'high';
    if (recommendation.priority === 'MEDIUM') return 'medium';
    return 'low';
  }

  async getOurCurrentMetrics() {
    // This would fetch from our own database
    return {
      pricingMin: 795,
      pricingMax: 1495,
      ratingScore: 9.8,
      ratingCount: 127,
      serviceCount: 8,
      faqCount: 17,
      testimonialCount: 10
    };
  }

  async getCompetitorStrengths() {
    // Get top competitor advantages from database
    const result = await db.runQuery(
      `SELECT c.name, cu.usp_category, COUNT(*) as usp_count,
              c.rating_score, c.rating_count
       FROM competitors c
       LEFT JOIN competitor_usps cu ON c.id = cu.competitor_id
       WHERE c.status = 'active'
       GROUP BY c.id, c.name, cu.usp_category, c.rating_score, c.rating_count
       ORDER BY c.rating_score DESC, usp_count DESC
       LIMIT 5`
    );

    return result.rows;
  }

  async getKeywordPerformance() {
    // Get keyword ranking data
    const result = await db.runQuery(
      `SELECT
         COUNT(*) FILTER (WHERE current_ranking IS NOT NULL) as keywords_ranking,
         COUNT(*) as total_keywords,
         AVG(priority_score) as avg_priority
       FROM keywords
       WHERE status = 'active'`
    );

    return result.rows[0] || { keywords_ranking: 0, total_keywords: 64, avg_priority: 75 };
  }
}

module.exports = new WebsiteManagerAgent();
