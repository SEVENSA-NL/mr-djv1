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
   * Send contact form confirmation to customer
   */
  async sendContactConfirmation(data) {
    const { to, customerName, eventType, eventDate, message } = data;

    const htmlContent = this.generateContactConfirmationHTML({
      customerName,
      eventType,
      eventDate,
      message
    });

    const textContent = this.generateContactConfirmationText({
      customerName,
      eventType,
      eventDate
    });

    return await this.sendEmail({
      to,
      subject: 'Bedankt voor je aanvraag bij Mr-DJ!',
      htmlBody: htmlContent,
      textBody: textContent,
      tag: 'contact-confirmation'
    });
  }

  /**
   * Send internal contact notification
   */
  async sendInternalContactNotification(data) {
    const htmlContent = this.generateInternalNotificationHTML(data);
    const textContent = this.generateInternalNotificationText(data);

    return await this.sendEmail({
      to: 'info@mr-dj.nl',
      subject: `🔔 Nieuwe Aanvraag: ${data.name} - ${data.eventType || 'Algemeen'}`,
      htmlBody: htmlContent,
      textBody: textContent,
      tag: 'contact-internal'
    });
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

  /**
   * Generate contact confirmation HTML
   */
  generateContactConfirmationHTML(data) {
    const { customerName, eventType, eventDate, message } = data;
    const eventDateFormatted = eventDate ? new Date(eventDate).toLocaleDateString('nl-NL', { dateStyle: 'long' }) : 'Nog te bepalen';

    return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F5F5F5; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; }
    .email-header { background: linear-gradient(135deg, #1A2C4B 0%, #00AEEF 100%); padding: 40px 30px; text-align: center; }
    .header-title { color: #FFFFFF; font-size: 32px; font-weight: 700; margin: 0 0 10px 0; }
    .header-subtitle { color: #D4AF37; font-size: 18px; font-weight: 600; margin: 0; }
    .success-banner { background-color: #D4AF37; color: #FFFFFF; padding: 20px 30px; text-align: center; font-size: 16px; font-weight: 600; }
    .email-content { padding: 40px 30px; }
    .greeting { font-size: 18px; color: #1A2C4B; font-weight: 600; margin-bottom: 20px; }
    .paragraph { font-size: 15px; color: #1A2C4B; line-height: 1.7; margin-bottom: 20px; }
    .details-box { background-color: #F9F9F9; border-left: 4px solid #00AEEF; padding: 25px; margin: 30px 0; border-radius: 4px; }
    .detail-row { margin: 15px 0; }
    .detail-label { font-weight: 600; color: #1A2C4B; display: inline-block; min-width: 120px; }
    .detail-value { color: #4A4A4A; }
    .cta-button { display: inline-block; background-color: #00AEEF; color: #FFFFFF; text-decoration: none; padding: 15px 35px; border-radius: 4px; font-weight: 600; margin-top: 30px; }
    .footer { background-color: #1A2C4B; color: #FFFFFF; padding: 30px; text-align: center; font-size: 13px; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1 class="header-title">Mr-DJ</h1>
      <p class="header-subtitle">Premium DJ Entertainment</p>
    </div>

    <div class="success-banner">
      ✓ Je aanvraag is succesvol ontvangen!
    </div>

    <div class="email-content">
      <p class="greeting">Beste ${customerName},</p>

      <p class="paragraph">
        Hartelijk dank voor je interesse in Mr-DJ! We hebben je aanvraag in goede orde ontvangen
        en zijn enthousiast om jouw ${eventType || 'evenement'} onvergetelijk te maken.
      </p>

      <div class="details-box">
        <h3 style="margin-top: 0; color: #1A2C4B;">Jouw Aanvraag Details</h3>
        ${eventType ? `<div class="detail-row"><span class="detail-label">Evenement type:</span><span class="detail-value">${eventType}</span></div>` : ''}
        ${eventDate ? `<div class="detail-row"><span class="detail-label">Datum:</span><span class="detail-value">${eventDateFormatted}</span></div>` : ''}
        ${message ? `<div class="detail-row"><span class="detail-label">Jouw bericht:</span><span class="detail-value">${message}</span></div>` : ''}
      </div>

      <p class="paragraph">
        <strong>Wat gebeurt er nu?</strong><br>
        • Binnen 24 uur nemen we contact met je op<br>
        • We bespreken je wensen en mogelijkheden<br>
        • Je ontvangt een persoonlijke offerte op maat<br>
        • Bij akkoord plannen we een kennismakingsgesprek
      </p>

      <p class="paragraph">
        Heb je in de tussentijd nog vragen? Neem gerust contact met ons op via
        <a href="tel:+31612345678" style="color: #00AEEF;">06 1234 5678</a> of
        <a href="mailto:info@mr-dj.nl" style="color: #00AEEF;">info@mr-dj.nl</a>.
      </p>

      <div style="text-align: center;">
        <a href="https://mr-dj.nl" class="cta-button">Bekijk Onze Pakketten</a>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Mr-DJ | Premium DJ Entertainment</p>
      <p style="margin: 0; color: #D4AF37;">Maak van jouw evenement een onvergetelijk feest</p>
      <p style="margin: 20px 0 0 0; font-size: 12px; color: #999;">
        <a href="https://mr-dj.nl" style="color: #00AEEF; text-decoration: none;">www.mr-dj.nl</a> |
        <a href="mailto:info@mr-dj.nl" style="color: #00AEEF; text-decoration: none;">info@mr-dj.nl</a> |
        <a href="tel:+31612345678" style="color: #00AEEF; text-decoration: none;">06 1234 5678</a>
      </p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Generate contact confirmation text
   */
  generateContactConfirmationText(data) {
    const { customerName, eventType, eventDate } = data;
    const eventDateFormatted = eventDate ? new Date(eventDate).toLocaleDateString('nl-NL', { dateStyle: 'long' }) : 'Nog te bepalen';

    return `
Mr-DJ - Je aanvraag is ontvangen!

Beste ${customerName},

Hartelijk dank voor je interesse in Mr-DJ! We hebben je aanvraag in goede orde ontvangen.

JOUW AANVRAAG
─────────────
${eventType ? `Evenement type: ${eventType}` : ''}
${eventDate ? `Datum: ${eventDateFormatted}` : ''}

WAT GEBEURT ER NU?
• Binnen 24 uur nemen we contact met je op
• We bespreken je wensen en mogelijkheden
• Je ontvangt een persoonlijke offerte op maat
• Bij akkoord plannen we een kennismakingsgesprek

Heb je in de tussentijd nog vragen?
Telefoon: 06 1234 5678
Email: info@mr-dj.nl

Met vriendelijke groet,
Team Mr-DJ

www.mr-dj.nl | Premium DJ Entertainment
    `.trim();
  }

  /**
   * Generate internal notification HTML
   */
  generateInternalNotificationHTML(data) {
    const { contactId, name, email, phone, message, eventType, eventDate, packageId } = data;
    const eventDateFormatted = eventDate ? new Date(eventDate).toLocaleDateString('nl-NL', { dateStyle: 'full' }) : 'Niet opgegeven';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1A2C4B; color: white; padding: 20px; text-align: center; }
    .content { background: white; padding: 30px; border: 1px solid #ddd; }
    .detail { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 3px solid #00AEEF; }
    .label { font-weight: bold; color: #1A2C4B; }
    .value { color: #4A4A4A; margin-top: 5px; }
    .urgent { background: #fff3cd; border-left-color: #ffc107; padding: 15px; margin: 20px 0; }
    .button { display: inline-block; background: #00AEEF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">🔔 Nieuwe Contact Aanvraag</h1>
    <p style="margin: 10px 0 0 0; color: #D4AF37;">Mr-DJ Website</p>
  </div>

  <div class="content">
    <div class="urgent">
      <strong>⚡ Actie Vereist:</strong> Nieuwe lead binnen 24 uur opvolgen!
    </div>

    <h3>Contact Informatie</h3>
    <div class="detail">
      <div class="label">Naam:</div>
      <div class="value">${name}</div>
    </div>
    <div class="detail">
      <div class="label">Email:</div>
      <div class="value"><a href="mailto:${email}">${email}</a></div>
    </div>
    ${phone ? `<div class="detail"><div class="label">Telefoon:</div><div class="value"><a href="tel:${phone}">${phone}</a></div></div>` : ''}

    <h3>Evenement Details</h3>
    ${eventType ? `<div class="detail"><div class="label">Type Evenement:</div><div class="value">${eventType}</div></div>` : ''}
    <div class="detail">
      <div class="label">Datum:</div>
      <div class="value">${eventDateFormatted}</div>
    </div>
    ${packageId ? `<div class="detail"><div class="label">Pakket ID:</div><div class="value">${packageId}</div></div>` : ''}

    ${message ? `<h3>Bericht</h3><div class="detail"><div class="value">${message}</div></div>` : ''}

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://analytics.mr-dj.nl" class="button">📊 Bekijk in Dashboard</a>
      <a href="mailto:${email}?subject=Re: Je aanvraag bij Mr-DJ" class="button" style="background: #D4AF37;">📧 Direct Beantwoorden</a>
    </div>

    <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
      Contact ID: ${contactId}<br>
      Ontvangen: ${new Date().toLocaleString('nl-NL')}
    </p>
  </div>
</body>
</html>
    `;
  }

  /**
   * Generate internal notification text
   */
  generateInternalNotificationText(data) {
    const { contactId, name, email, phone, message, eventType, eventDate } = data;
    const eventDateFormatted = eventDate ? new Date(eventDate).toLocaleDateString('nl-NL', { dateStyle: 'full' }) : 'Niet opgegeven';

    return `
NIEUWE CONTACT AANVRAAG - MR-DJ
════════════════════════════════

⚡ ACTIE VEREIST: Nieuwe lead binnen 24 uur opvolgen!

CONTACT INFORMATIE
──────────────────
Naam: ${name}
Email: ${email}
${phone ? `Telefoon: ${phone}` : ''}

EVENEMENT DETAILS
─────────────────
${eventType ? `Type: ${eventType}` : ''}
Datum: ${eventDateFormatted}

${message ? `BERICHT\n───────\n${message}\n` : ''}

Contact ID: ${contactId}
Ontvangen: ${new Date().toLocaleString('nl-NL')}

──────────────────────────────────────
Dashboard: https://analytics.mr-dj.nl
Direct beantwoorden: mailto:${email}
    `.trim();
  }
}

module.exports = new PostmarkEmailService();
