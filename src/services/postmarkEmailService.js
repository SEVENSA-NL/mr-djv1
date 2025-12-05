/**
 * Postmark Email Service
 * Transactional email service using Postmark API
 */

const axios = require('axios');
const { logger } = require('../lib/logger');

class PostmarkEmailService {
  constructor() {
    this.apiKey = process.env.MAIL_API_KEY;
    this.fromAddress = process.env.MAIL_FROM_ADDRESS || 'hello@mr-dj.nl';
    this.replyTo = process.env.MAIL_REPLY_TO || 'info@mr-dj.nl';
    this.baseURL = 'https://api.postmarkapp.com';

    if (!this.apiKey || this.apiKey === 'pm-prod-api-key') {
      logger.warn('[PostmarkEmail] No valid API key configured - emails will be logged only');
      this.enabled = false;
    } else {
      this.enabled = true;
      logger.info('[PostmarkEmail] Service initialized');
    }
  }

  /**
   * Send competitive intelligence report
   */
  async sendCompetitiveIntelligenceReport(reportData) {
    const htmlContent = this.generateReportHTML(reportData);
    const textContent = this.generateReportText(reportData);

    return await this.sendEmail({
      to: 'info@mr-dj.nl',
      subject: `🎯 Daily Competitive Intelligence Report - ${new Date().toLocaleDateString('nl-NL')}`,
      htmlBody: htmlContent,
      textBody: textContent,
      tag: 'competitive-intelligence'
    });
  }

  /**
   * Send email via Postmark API
   */
  async sendEmail({ to, subject, htmlBody, textBody, tag }) {
    if (!this.enabled) {
      logger.info('[PostmarkEmail] Email not sent (disabled):', {
        to,
        subject,
        preview: textBody?.substring(0, 100)
      });
      return {
        success: false,
        error: 'Email service not configured',
        logged: true
      };
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/email`,
        {
          From: this.fromAddress,
          To: to,
          Subject: subject,
          HtmlBody: htmlBody,
          TextBody: textBody,
          ReplyTo: this.replyTo,
          Tag: tag,
          TrackOpens: true,
          TrackLinks: 'HtmlOnly'
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': this.apiKey
          },
          timeout: 10000
        }
      );

      logger.info('[PostmarkEmail] Email sent successfully:', {
        messageId: response.data.MessageID,
        to: response.data.To
      });

      return {
        success: true,
        messageId: response.data.MessageID,
        submittedAt: response.data.SubmittedAt
      };
    } catch (error) {
      logger.error('[PostmarkEmail] Failed to send email:', {
        error: error.message,
        response: error.response?.data
      });

      return {
        success: false,
        error: error.message,
        details: error.response?.data
      };
    }
  }

  /**
   * Generate HTML email content
   */
  generateReportHTML(reportData) {
    const {
      summary,
      topThreats,
      recommendations,
      keywordChanges,
      pricingChanges,
      newCompetitors,
      timestamp
    } = reportData;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
    .container { background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 15px; margin-top: 0; }
    h2 { color: #34495e; margin-top: 30px; border-left: 4px solid #3498db; padding-left: 15px; }
    .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .success { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .danger { background: #f8d7da; border-left: 4px solid #dc3545; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .competitor { background: #f8f9fa; border: 1px solid #dee2e6; padding: 20px; margin: 15px 0; border-radius: 6px; }
    .metric { display: inline-block; margin: 8px 12px 8px 0; padding: 6px 12px; background: #e9ecef; border-radius: 4px; font-size: 0.9em; }
    .recommendation { background: #e7f3ff; border-left: 4px solid #2196F3; padding: 20px; margin: 15px 0; border-radius: 6px; }
    .priority-high { background: #ffebee; border-left-color: #f44336; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #3498db; color: white; font-weight: 600; }
    tr:hover { background-color: #f5f5f5; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e9ecef; color: #666; font-size: 0.9em; text-align: center; }
    .btn { display: inline-block; padding: 12px 24px; background: #3498db; color: white; text-decoration: none; border-radius: 4px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 Daily Competitive Intelligence Report</h1>
    <p><strong>Generated:</strong> ${new Date(timestamp).toLocaleString('nl-NL', { dateStyle: 'full', timeStyle: 'short' })}</p>

    <div class="${summary.overallThreatLevel === 'high' || summary.overallThreatLevel === 'critical' ? 'danger' : summary.overallThreatLevel === 'medium' ? 'alert' : 'success'}">
      <h3>📊 Executive Summary</h3>
      <p><strong>Overall Threat Level:</strong> <span style="text-transform: uppercase; font-weight: bold;">${summary.overallThreatLevel}</span></p>
      <p><strong>Competitors Monitored:</strong> ${summary.totalCompetitors}</p>
      <p><strong>Changes Detected:</strong> ${summary.totalChanges}</p>
      <p><strong>Critical Actions Needed:</strong> ${summary.criticalActions}</p>
    </div>

    <h2>⚠️ Top Threats</h2>
    ${topThreats.slice(0, 5).map(threat => `
      <div class="competitor">
        <h3>${threat.name}</h3>
        <div>
          <span class="metric">Threat Score: ${threat.threatScore}/100</span>
          <span class="metric">Rating: ${threat.rating || 'N/A'}/10</span>
          ${threat.pricingMin ? `<span class="metric">Price: €${threat.pricingMin}-${threat.pricingMax}</span>` : ''}
        </div>
        ${threat.changes && threat.changes.length > 0 ? `<p><strong>Recent Changes:</strong> ${threat.changes.join(', ')}</p>` : ''}
        <p><strong>Our Position:</strong> ${threat.ourPosition}</p>
      </div>
    `).join('')}

    <h2>🎯 AI-Generated Recommendations</h2>
    ${recommendations.slice(0, 5).map((rec, idx) => `
      <div class="recommendation ${rec.priority === 'HIGH' ? 'priority-high' : ''}">
        <h3>${idx + 1}. ${rec.title}</h3>
        <p><strong>Priority:</strong> ${rec.priority} | <strong>Impact:</strong> ${rec.impact}</p>
        <p>${rec.description}</p>
        <p><strong>Action:</strong> ${rec.action}</p>
        ${rec.estimatedROI ? `<p><strong>Estimated ROI:</strong> ${rec.estimatedROI}</p>` : ''}
      </div>
    `).join('')}

    ${keywordChanges && keywordChanges.length > 0 ? `
      <h2>🔍 Keyword Ranking Changes</h2>
      <table>
        <tr>
          <th>Keyword</th>
          <th>Competitor</th>
          <th>Previous</th>
          <th>Current</th>
          <th>Change</th>
        </tr>
        ${keywordChanges.slice(0, 10).map(change => `
          <tr>
            <td>${change.keyword}</td>
            <td>${change.competitor}</td>
            <td>#${change.previousRank || 'N/A'}</td>
            <td>#${change.currentRank}</td>
            <td style="color: ${change.improvement ? 'red' : 'green'}; font-weight: bold;">
              ${change.improvement ? '⬆️' : '⬇️'} ${Math.abs(change.change)}
            </td>
          </tr>
        `).join('')}
      </table>
    ` : ''}

    ${pricingChanges && pricingChanges.length > 0 ? `
      <h2>💰 Pricing Changes</h2>
      ${pricingChanges.map(change => `
        <div class="alert">
          <strong>${change.competitor}:</strong> ${change.change}
          <br><strong>Impact:</strong> ${change.impact}
        </div>
      `).join('')}
    ` : ''}

    ${newCompetitors && newCompetitors.length > 0 ? `
      <div class="danger">
        <h2>🚨 New Competitors Detected</h2>
        ${newCompetitors.map(comp => `
          <p><strong>${comp.name}</strong> - ${comp.description}</p>
        `).join('')}
      </div>
    ` : ''}

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://analytics.mr-dj.nl" class="btn">📊 View Detailed Analytics</a>
    </div>

    <div class="footer">
      <p>This report was automatically generated by the Mr-DJ Competitive Intelligence System.</p>
      <p>Powered by AI Agent with Ollama (Llama2) analysis.</p>
      <p>© ${new Date().getFullYear()} Mr-DJ | <a href="https://www.mr-dj.nl">www.mr-dj.nl</a></p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Generate plain text email content
   */
  generateReportText(reportData) {
    const { summary, topThreats, recommendations } = reportData;

    return `
DAILY COMPETITIVE INTELLIGENCE REPORT
Generated: ${new Date(reportData.timestamp).toLocaleString('nl-NL')}

EXECUTIVE SUMMARY
─────────────────
Overall Threat Level: ${summary.overallThreatLevel.toUpperCase()}
Competitors Monitored: ${summary.totalCompetitors}
Changes Detected: ${summary.totalChanges}
Critical Actions Needed: ${summary.criticalActions}

TOP THREATS
───────────
${topThreats.slice(0, 5).map((t, i) => `
${i + 1}. ${t.name}
   Threat Score: ${t.threatScore}/100
   Rating: ${t.rating || 'N/A'}/10
   ${t.changes && t.changes.length > 0 ? `Recent Changes: ${t.changes.join(', ')}` : ''}
`).join('\n')}

AI RECOMMENDATIONS
──────────────────
${recommendations.slice(0, 5).map((r, i) => `
${i + 1}. ${r.title} [${r.priority}]
   ${r.description}
   Action: ${r.action}
   ${r.estimatedROI ? `ROI: ${r.estimatedROI}` : ''}
`).join('\n')}

View full report and analytics at: https://analytics.mr-dj.nl

────────────────────────────────────────────────────────
This report was automatically generated by the Mr-DJ
Competitive Intelligence System powered by AI.
    `.trim();
  }
}

module.exports = new PostmarkEmailService();
