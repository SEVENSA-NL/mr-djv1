/**
 * Email Service
 * Handles email sending for competitive intelligence reports and notifications
 */

const nodemailer = require('nodemailer');
const logger = require('../lib/logger');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  initialize() {
    const config = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    };

    try {
      this.transporter = nodemailer.createTransporter(config);
      logger.info('[EmailService] Initialized successfully');
    } catch (error) {
      logger.error('[EmailService] Failed to initialize:', error);
    }
  }

  async sendCompetitiveIntelligenceReport(reportData) {
    if (!this.transporter) {
      logger.error('[EmailService] Transporter not initialized');
      return { success: false, error: 'Email service not configured' };
    }

    const htmlContent = this.generateReportHTML(reportData);

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@mr-dj.nl',
      to: 'info@mr-dj.nl',
      subject: `🎯 Daily Competitive Intelligence Report - ${new Date().toLocaleDateString('nl-NL')}`,
      html: htmlContent,
      text: this.generateReportText(reportData)
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info('[EmailService] Report sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      logger.error('[EmailService] Failed to send report:', error);
      return { success: false, error: error.message };
    }
  }

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
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
    h2 { color: #34495e; margin-top: 30px; border-left: 4px solid #3498db; padding-left: 10px; }
    .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
    .success { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; }
    .danger { background: #f8d7da; border-left: 4px solid #dc3545; padding: 15px; margin: 20px 0; }
    .competitor { background: #f8f9fa; border: 1px solid #dee2e6; padding: 15px; margin: 10px 0; border-radius: 5px; }
    .metric { display: inline-block; margin: 5px 10px 5px 0; padding: 5px 10px; background: #e9ecef; border-radius: 3px; }
    .recommendation { background: #e7f3ff; border-left: 4px solid #2196F3; padding: 15px; margin: 10px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #3498db; color: white; }
    tr:hover { background-color: #f5f5f5; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 0.9em; }
  </style>
</head>
<body>
  <h1>🎯 Daily Competitive Intelligence Report</h1>
  <p><strong>Generated:</strong> ${new Date(timestamp).toLocaleString('nl-NL')}</p>

  <div class="${summary.overallThreatLevel === 'high' ? 'danger' : summary.overallThreatLevel === 'medium' ? 'alert' : 'success'}">
    <h3>📊 Executive Summary</h3>
    <p><strong>Overall Threat Level:</strong> ${summary.overallThreatLevel.toUpperCase()}</p>
    <p><strong>Competitors Monitored:</strong> ${summary.totalCompetitors}</p>
    <p><strong>Changes Detected:</strong> ${summary.totalChanges}</p>
    <p><strong>Critical Actions Needed:</strong> ${summary.criticalActions}</p>
  </div>

  <h2>⚠️ Top Threats</h2>
  ${topThreats.map(threat => `
    <div class="competitor">
      <h3>${threat.name}</h3>
      <div class="metric">Threat Score: ${threat.threatScore}/100</div>
      <div class="metric">Rating: ${threat.rating}/10</div>
      <div class="metric">Price: €${threat.pricingMin}-${threat.pricingMax}</div>
      <p><strong>Recent Changes:</strong> ${threat.changes.join(', ')}</p>
      <p><strong>Our Position:</strong> ${threat.ourPosition}</p>
    </div>
  `).join('')}

  <h2>🎯 AI-Generated Recommendations</h2>
  ${recommendations.map((rec, idx) => `
    <div class="recommendation">
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
      ${keywordChanges.map(change => `
        <tr>
          <td>${change.keyword}</td>
          <td>${change.competitor}</td>
          <td>#${change.previousRank || 'N/A'}</td>
          <td>#${change.currentRank}</td>
          <td style="color: ${change.improvement ? 'red' : 'green'}">
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

  <div class="footer">
    <p>This report was automatically generated by the Mr-DJ Competitive Intelligence System.</p>
    <p>Powered by AI Agent with local LLM analysis.</p>
    <p>📊 View detailed analytics: <a href="https://analytics.mr-dj.nl">analytics.mr-dj.nl</a></p>
  </div>
</body>
</html>
    `;
  }

  generateReportText(reportData) {
    const { summary, topThreats, recommendations } = reportData;

    return `
DAILY COMPETITIVE INTELLIGENCE REPORT
Generated: ${new Date(reportData.timestamp).toLocaleString('nl-NL')}

EXECUTIVE SUMMARY
Overall Threat Level: ${summary.overallThreatLevel.toUpperCase()}
Competitors Monitored: ${summary.totalCompetitors}
Changes Detected: ${summary.totalChanges}
Critical Actions Needed: ${summary.criticalActions}

TOP THREATS
${topThreats.map((t, i) => `
${i + 1}. ${t.name}
   Threat Score: ${t.threatScore}/100
   Rating: ${t.rating}/10
   Recent Changes: ${t.changes.join(', ')}
`).join('\n')}

AI RECOMMENDATIONS
${recommendations.map((r, i) => `
${i + 1}. ${r.title} [${r.priority}]
   ${r.description}
   Action: ${r.action}
`).join('\n')}

View full report: https://analytics.mr-dj.nl
    `.trim();
  }
}

module.exports = new EmailService();
