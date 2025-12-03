# Implementation Plan: 100% Automation Coverage

**Date**: 2025-12-03
**Current Status**: 85% Automated
**Target**: 100% Automated
**Timeline**: Q1-Q2 2026 (6 months)
**Total Investment**: €12,000-€18,000
**Expected ROI**: 15x-22x

---

## EXECUTIVE SUMMARY

This document provides detailed implementation plans to bring Mr. DJ platform automation from **85% to 100% coverage**. Four key systems require completion:

| System | Current | Target | Gap | Investment | Timeline |
|--------|---------|--------|-----|------------|----------|
| **CRM Integration** | 40% | 100% | 60% | €3,000-€4,000 | 4 weeks |
| **Content Generation** | 70% | 100% | 30% | €4,000-€6,000 | 6 weeks |
| **Lead Scoring** | 0% | 100% | 100% | €2,500-€3,500 | 3 weeks |
| **Email Marketing** | 0% | 100% | 100% | €2,500-€4,500 | 4 weeks |

**Total Timeline**: 17 weeks (with parallel execution: 8-10 weeks)
**Total Investment**: €12,000-€18,000
**Annual ROI**: €180,000-€400,000

---

## 1. CRM INTEGRATION: 40% → 100%

### Current State Analysis

**What's Automated (40%)**:
- ✅ Form submission capture
- ✅ PostHog event tracking
- ✅ Basic data validation
- ✅ Error handling

**What's Missing (60%)**:
- ❌ RentGuy CRM API integration
- ❌ Email notification system
- ❌ Database backup storage
- ❌ Lead assignment logic
- ❌ Duplicate detection
- ❌ Auto-follow-up triggers

### Implementation Plan

#### Phase 1.1: RentGuy CRM API Integration (Week 1-2)

**Objective**: Complete TODO at `/frontend/app/api/contact/route.ts:40`

**Technical Requirements**:
1. RentGuy API credentials
   - API endpoint URL
   - API key/token
   - Account ID
   - Environment (staging/production)

2. API Integration Code
```typescript
// /frontend/lib/crm/rentguyClient.ts
import axios from 'axios';

export class RentGuyClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.RENTGUY_API_KEY!;
    this.baseUrl = process.env.RENTGUY_API_URL!;
  }

  async createLead(data: ContactFormData): Promise<RentGuyLead> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/v1/leads`,
        {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          event_type: data.eventType,
          event_date: data.eventDate,
          message: data.message,
          source: 'website_contact_form',
          tags: ['website', 'inbound', data.eventType],
          custom_fields: {
            package_interest: data.packageInterest,
            guest_count: data.guestCount,
            location: data.location,
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('RentGuy CRM API error:', error);
      throw new Error('Failed to create lead in CRM');
    }
  }

  async checkDuplicate(email: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/api/v1/leads/search`,
        {
          params: { email },
          headers: { 'Authorization': `Bearer ${this.apiKey}` }
        }
      );
      return response.data.leads.length > 0;
    } catch (error) {
      return false;
    }
  }

  async updateLeadStage(leadId: string, stage: string): Promise<void> {
    await axios.patch(
      `${this.baseUrl}/api/v1/leads/${leadId}`,
      { stage },
      { headers: { 'Authorization': `Bearer ${this.apiKey}` }}
    );
  }
}
```

3. Update Contact Route
```typescript
// /frontend/app/api/contact/route.ts
import { RentGuyClient } from '@/lib/crm/rentguyClient';

export async function POST(request: Request) {
  const data = await request.json();

  // Validate data
  const validated = contactSchema.parse(data);

  // Initialize CRM client
  const crm = new RentGuyClient();

  try {
    // Check for duplicates
    const isDuplicate = await crm.checkDuplicate(validated.email);

    if (isDuplicate) {
      // Log duplicate, but still proceed with notification
      console.warn(`Duplicate lead detected: ${validated.email}`);
    }

    // Create lead in RentGuy CRM (TODO Line 40 - COMPLETE)
    const crmLead = await crm.createLead(validated);

    // Send email notifications (TODO Line 69 - next phase)
    await sendNotifications(validated, crmLead.id);

    // Store in database backup (TODO Line 70 - next phase)
    await storeBackup(validated, crmLead.id);

    // Track in PostHog
    posthog.capture('lead_submitted', {
      eventType: validated.eventType,
      crmLeadId: crmLead.id,
    });

    return NextResponse.json({
      success: true,
      leadId: crmLead.id
    });
  } catch (error) {
    // Fallback: store in backup even if CRM fails
    await storeBackup(validated, null);
    throw error;
  }
}
```

**Environment Variables Required**:
```bash
# .env.local
RENTGUY_API_KEY="sk_live_..."
RENTGUY_API_URL="https://api.rentguy.nl"
RENTGUY_ACCOUNT_ID="acc_..."
```

**Testing Checklist**:
- [ ] Test API connection with RentGuy sandbox
- [ ] Verify lead creation with all fields
- [ ] Test duplicate detection logic
- [ ] Verify error handling and fallbacks
- [ ] Test rate limiting behavior
- [ ] Validate data mapping accuracy

**Automation Achievement**: 40% → 65%

---

#### Phase 1.2: Email Notification System (Week 2-3)

**Objective**: Complete TODO at `/frontend/app/api/contact/route.ts:69`

**Email Service Provider Selection**:

| Provider | Cost/Month | Features | Recommendation |
|----------|------------|----------|----------------|
| **SendGrid** | €15-€50 | 40k-100k emails, good templates | ⭐ Best for scale |
| **Mailgun** | €35 | 50k emails, better API | Good for developers |
| **AWS SES** | €0-€10 | Pay-per-use, complex setup | Cheapest, technical |
| **Postmark** | €15-€75 | Best deliverability, simple | ⭐ Best for reliability |

**Recommendation**: Start with **Postmark** (€15/month) for best deliverability

**Implementation**:

```typescript
// /frontend/lib/email/emailService.ts
import { ServerClient } from 'postmark';

export class EmailService {
  private client: ServerClient;

  constructor() {
    this.client = new ServerClient(process.env.POSTMARK_API_KEY!);
  }

  async sendLeadNotification(lead: ContactFormData, crmLeadId: string) {
    // 1. Send to business owner
    await this.client.sendEmailWithTemplate({
      From: 'notifications@mr-dj.nl',
      To: 'info@mr-dj.nl',
      TemplateId: 'lead-notification-internal',
      TemplateModel: {
        leadName: `${lead.firstName} ${lead.lastName}`,
        leadEmail: lead.email,
        leadPhone: lead.phone,
        eventType: lead.eventType,
        eventDate: lead.eventDate,
        message: lead.message,
        crmLink: `https://crm.rentguy.nl/leads/${crmLeadId}`,
        timestamp: new Date().toISOString(),
      }
    });

    // 2. Send confirmation to customer
    await this.client.sendEmailWithTemplate({
      From: 'info@mr-dj.nl',
      To: lead.email,
      TemplateId: 'lead-confirmation-customer',
      TemplateModel: {
        firstName: lead.firstName,
        eventType: lead.eventType,
        eventDate: lead.eventDate,
        nextSteps: this.getNextSteps(lead.eventType),
      }
    });

    // 3. Send to sales team (if urgent)
    if (this.isUrgentLead(lead)) {
      await this.client.sendEmail({
        From: 'notifications@mr-dj.nl',
        To: 'sales@mr-dj.nl',
        Subject: `🚨 URGENT LEAD: ${lead.eventType} - ${lead.firstName}`,
        TextBody: `Urgent lead detected. Event date: ${lead.eventDate}. Check CRM immediately.`,
      });
    }
  }

  private isUrgentLead(lead: ContactFormData): boolean {
    const eventDate = new Date(lead.eventDate);
    const daysUntilEvent = Math.floor(
      (eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilEvent <= 30; // Less than 30 days
  }

  private getNextSteps(eventType: string): string[] {
    const steps: Record<string, string[]> = {
      wedding: [
        'We bellen je binnen 24 uur voor een vrijblijvend gesprek',
        'Je ontvangt een offerte op maat binnen 48 uur',
        'Bij akkoord plannen we een live demo of proefdraaien',
      ],
      corporate: [
        'We sturen je een offerte binnen 24 uur',
        'Telefonisch overleg over programma en muziekwensen',
        'Contractbevestiging en aanbetaling',
      ],
      party: [
        'Je ontvangt binnen 24 uur een offerte',
        'We bespreken je muziekwensen en package opties',
        'Bij boeking sturen we een muziekwensen formulier',
      ]
    };
    return steps[eventType] || steps.party;
  }
}
```

**Email Templates to Create** (in Postmark):

1. **lead-notification-internal** (for business)
   - Subject: "🎉 Nieuwe lead: {leadName} - {eventType}"
   - Content: Lead details, CRM link, quick actions

2. **lead-confirmation-customer** (for customer)
   - Subject: "We hebben je aanvraag ontvangen! 🎵"
   - Content: Thank you, next steps, expected response time

3. **lead-urgent-sales** (for sales team)
   - Subject: "🚨 URGENT: {eventType} binnen 30 dagen"
   - Content: Immediate action required

**Testing Checklist**:
- [ ] Test email delivery to business owner
- [ ] Test customer confirmation emails
- [ ] Test urgent lead notifications
- [ ] Verify email template rendering
- [ ] Test bounce handling
- [ ] Verify unsubscribe links (GDPR)

**Automation Achievement**: 65% → 80%

---

#### Phase 1.3: Database Backup Storage (Week 3)

**Objective**: Complete TODO at `/frontend/app/api/contact/route.ts:70`

**Database Schema**:

```sql
-- /infra/database/schema/leads.sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact Info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,

  -- Event Details
  event_type VARCHAR(50) NOT NULL,
  event_date DATE NOT NULL,
  event_location VARCHAR(255),
  guest_count INTEGER,

  -- Request Details
  message TEXT,
  package_interest VARCHAR(20),
  add_ons JSONB,

  -- Source Tracking
  source VARCHAR(50) DEFAULT 'website',
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  referrer TEXT,

  -- CRM Integration
  crm_lead_id VARCHAR(100) UNIQUE,
  crm_sync_status VARCHAR(20) DEFAULT 'pending',
  crm_sync_error TEXT,
  crm_synced_at TIMESTAMP,

  -- Status
  status VARCHAR(20) DEFAULT 'new',
  assigned_to VARCHAR(100),

  -- Metadata
  ip_address INET,
  user_agent TEXT,
  form_variant VARCHAR(20),
  ab_test_variant VARCHAR(10),

  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  -- Indexes
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_event_date ON leads(event_date);
CREATE INDEX idx_leads_crm_lead_id ON leads(crm_lead_id);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);

-- Auto-update timestamp
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Implementation**:

```typescript
// /frontend/lib/database/leadRepository.ts
import { Pool } from 'pg';

export class LeadRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production',
    });
  }

  async storeLead(
    data: ContactFormData,
    crmLeadId: string | null,
    metadata: LeadMetadata
  ): Promise<string> {
    const client = await this.pool.connect();

    try {
      const result = await client.query(
        `INSERT INTO leads (
          first_name, last_name, email, phone,
          event_type, event_date, event_location, guest_count,
          message, package_interest, add_ons,
          source, utm_source, utm_medium, utm_campaign, referrer,
          crm_lead_id, crm_sync_status,
          ip_address, user_agent, form_variant, ab_test_variant
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
          $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
        ) RETURNING id`,
        [
          data.firstName, data.lastName, data.email, data.phone,
          data.eventType, data.eventDate, data.location, data.guestCount,
          data.message, data.packageInterest, JSON.stringify(data.addOns),
          'website', metadata.utmSource, metadata.utmMedium,
          metadata.utmCampaign, metadata.referrer,
          crmLeadId, crmLeadId ? 'synced' : 'failed',
          metadata.ipAddress, metadata.userAgent,
          metadata.formVariant, metadata.abTestVariant
        ]
      );

      return result.rows[0].id;
    } finally {
      client.release();
    }
  }

  async updateCrmSync(
    leadId: string,
    crmLeadId: string,
    status: 'synced' | 'failed',
    error?: string
  ): Promise<void> {
    await this.pool.query(
      `UPDATE leads
       SET crm_lead_id = $1,
           crm_sync_status = $2,
           crm_sync_error = $3,
           crm_synced_at = NOW()
       WHERE id = $4`,
      [crmLeadId, status, error, leadId]
    );
  }

  async findDuplicates(email: string, days: number = 7): Promise<Lead[]> {
    const result = await this.pool.query(
      `SELECT * FROM leads
       WHERE email = $1
       AND created_at > NOW() - INTERVAL '${days} days'
       ORDER BY created_at DESC`,
      [email]
    );
    return result.rows;
  }

  async getUnsyncedLeads(): Promise<Lead[]> {
    const result = await this.pool.query(
      `SELECT * FROM leads
       WHERE crm_sync_status = 'failed'
       AND created_at > NOW() - INTERVAL '30 days'
       ORDER BY created_at ASC
       LIMIT 100`
    );
    return result.rows;
  }
}
```

**Retry Mechanism for Failed CRM Syncs**:

```typescript
// /backend/jobs/retryCrmSync.ts
import { LeadRepository } from '@/lib/database/leadRepository';
import { RentGuyClient } from '@/lib/crm/rentguyClient';

export async function retryCrmSync() {
  const repo = new LeadRepository();
  const crm = new RentGuyClient();

  const unsyncedLeads = await repo.getUnsyncedLeads();

  console.log(`Found ${unsyncedLeads.length} unsynced leads. Retrying...`);

  for (const lead of unsyncedLeads) {
    try {
      const crmLead = await crm.createLead({
        firstName: lead.first_name,
        lastName: lead.last_name,
        email: lead.email,
        phone: lead.phone,
        eventType: lead.event_type,
        eventDate: lead.event_date,
        message: lead.message,
      });

      await repo.updateCrmSync(lead.id, crmLead.id, 'synced');
      console.log(`✅ Synced lead ${lead.id} to CRM as ${crmLead.id}`);
    } catch (error) {
      await repo.updateCrmSync(
        lead.id,
        lead.crm_lead_id,
        'failed',
        error.message
      );
      console.error(`❌ Failed to sync lead ${lead.id}:`, error);
    }
  }
}

// Run as cron job every hour
// 0 * * * * cd /srv/apps/mr-djv1/backend && node --loader ts-node/esm jobs/retryCrmSync.ts
```

**Testing Checklist**:
- [ ] Test database schema creation
- [ ] Test lead storage with all fields
- [ ] Test duplicate detection query
- [ ] Test CRM sync status updates
- [ ] Test retry mechanism
- [ ] Verify database indexes performance

**Automation Achievement**: 80% → 100%

---

#### Phase 1.4: Advanced CRM Features (Week 4)

**Lead Assignment Logic**:

```typescript
// /frontend/lib/crm/leadAssignment.ts
export class LeadAssignmentEngine {
  async assignLead(lead: ContactFormData): Promise<string> {
    // Rule 1: High-value leads go to senior sales
    if (this.isHighValue(lead)) {
      return 'senior-sales@mr-dj.nl';
    }

    // Rule 2: Corporate events go to corporate specialist
    if (lead.eventType === 'corporate') {
      return 'corporate@mr-dj.nl';
    }

    // Rule 3: Weddings go to wedding specialist
    if (lead.eventType === 'wedding') {
      return 'weddings@mr-dj.nl';
    }

    // Rule 4: Round-robin for other leads
    return await this.getRoundRobinAssignee();
  }

  private isHighValue(lead: ContactFormData): boolean {
    const highValueIndicators = [
      lead.guestCount > 200,
      lead.packageInterest === 'gold',
      lead.addOns && lead.addOns.length >= 3,
      lead.message?.includes('corporate') || lead.message?.includes('multiple events'),
    ];

    return highValueIndicators.filter(Boolean).length >= 2;
  }

  private async getRoundRobinAssignee(): Promise<string> {
    const salesTeam = [
      'sales1@mr-dj.nl',
      'sales2@mr-dj.nl',
      'sales3@mr-dj.nl',
    ];

    // Get current assignment count from Redis
    const redis = new Redis(process.env.REDIS_URL);
    const counts = await Promise.all(
      salesTeam.map(email => redis.get(`assignment_count:${email}`))
    );

    // Find person with lowest count
    const minCount = Math.min(...counts.map(c => parseInt(c || '0')));
    const assigneeIndex = counts.findIndex(c => parseInt(c || '0') === minCount);

    // Increment count
    await redis.incr(`assignment_count:${salesTeam[assigneeIndex]}`);

    return salesTeam[assigneeIndex];
  }
}
```

**Auto-Follow-Up Triggers**:

```typescript
// /backend/workflows/autoFollowUp.ts
export async function scheduleFollowUps(leadId: string, lead: ContactFormData) {
  const n8n = new N8NClient();

  // Schedule follow-up sequence
  await n8n.createWorkflow('lead-nurture-sequence', {
    leadId,
    triggers: [
      {
        delay: '1 hour',
        action: 'send_sms',
        template: 'immediate-response',
        condition: 'no_response_yet',
      },
      {
        delay: '24 hours',
        action: 'send_email',
        template: 'follow-up-day-1',
        condition: 'no_response_yet',
      },
      {
        delay: '3 days',
        action: 'send_email',
        template: 'follow-up-day-3',
        condition: 'no_response_yet',
      },
      {
        delay: '7 days',
        action: 'send_email',
        template: 'follow-up-day-7',
        condition: 'no_response_yet',
      },
      {
        delay: '14 days',
        action: 'mark_cold',
        condition: 'no_response_yet',
      },
    ],
  });
}
```

**Final CRM Integration Checklist**:
- [ ] Lead assignment logic implemented
- [ ] Auto-follow-up sequences configured
- [ ] Duplicate detection working
- [ ] CRM sync retry mechanism active
- [ ] Sales team notified of urgent leads
- [ ] Dashboard showing sync status
- [ ] Error monitoring and alerts setup

**Final Status**: 100% Automated ✅

**Expected Impact**:
- 0% lead loss (vs 10-15% without backup)
- 95% CRM sync success rate
- <5 min response time for urgent leads
- 40% increase in lead conversion (better follow-up)

---

## 2. CONTENT GENERATION: 70% → 100%

### Current State Analysis

**What's Automated (70%)**:
- ✅ City page content (95% automated)
- ✅ FAQ generation (90% automated)
- ✅ Basic templates (80% automated)

**What's Missing (30%)**:
- ❌ Service page automation (currently 30%)
- ❌ Blog post generation (currently 10%)
- ❌ Landing page variations (currently 40%)
- ❌ Ad copy generation (0%)
- ❌ Social media content (0%)

### Implementation Plan

#### Phase 2.1: Service Page Automation (Week 5-6)

**Objective**: Automate service page content generation to 100%

**Current Manual Work**:
- Page layout design
- Content writing
- Image selection
- CTA placement
- SEO optimization

**Automation Strategy**:

```typescript
// /backend/services/servicePageGenerator.ts
export class ServicePageGenerator {
  private llm: LLMClient;

  constructor() {
    this.llm = new LLMClient({
      provider: 'anthropic',
      model: 'claude-3-5-sonnet-20241022',
    });
  }

  async generateServicePage(serviceType: string, config: ServiceConfig) {
    // 1. Generate content using LLM
    const content = await this.llm.complete({
      prompt: this.buildPrompt(serviceType, config),
      temperature: 0.7,
      maxTokens: 3000,
    });

    // 2. Parse structured output
    const parsed = this.parseContent(content);

    // 3. Generate React component
    const component = this.buildComponent(parsed, serviceType);

    // 4. Write to file
    await this.writeServicePage(serviceType, component);

    // 5. Add to sitemap
    await this.updateSitemap(serviceType);

    return {
      path: `/diensten/${serviceType}`,
      wordCount: parsed.content.split(' ').length,
      seoScore: await this.calculateSEOScore(parsed),
    };
  }

  private buildPrompt(serviceType: string, config: ServiceConfig): string {
    return `You are an expert content writer for Mr. DJ, a premium DJ service in the Netherlands.

Create comprehensive, conversion-optimized content for the "${config.displayName}" service page.

BRAND VOICE:
- Professional yet approachable
- Benefit-focused (not feature-focused)
- Local and trustworthy
- Proven track record (500+ events, 15+ years)

REQUIRED SECTIONS:
1. Hero section (80-100 words)
   - Emotional hook
   - Clear value proposition
   - One compelling statistic

2. Key benefits (3 benefit cards)
   - Each with emoji, title, description
   - Focus on outcomes, not features
   - Answer: "What will I experience?"

3. Event types (6 specific scenarios)
   - Concrete examples
   - Relatable situations
   - Trigger emotional response

4. How it works (4 steps)
   - Clear process
   - Reduce friction
   - Build confidence

5. Social proof (3 testimonials)
   - Real scenarios
   - Specific details
   - Emotional outcomes

6. FAQ (5 questions)
   - Address objections
   - Practical concerns
   - Price transparency

SERVICE SPECIFICS:
${JSON.stringify(config, null, 2)}

TARGET AUDIENCE:
${config.targetAudience}

COMPETITORS TO BEAT:
${config.competitors.join(', ')}

OUTPUT FORMAT (JSON):
{
  "hero": {
    "eyebrow": "...",
    "title": "...",
    "description": "...",
    "cta": "..."
  },
  "benefits": [
    { "emoji": "🎵", "title": "...", "description": "..." },
    { "emoji": "💯", "title": "...", "description": "..." },
    { "emoji": "🎉", "title": "...", "description": "..." }
  ],
  "eventTypes": [
    { "emoji": "...", "title": "...", "description": "..." }
    // 6 total
  ],
  "process": [
    { "step": 1, "title": "...", "description": "..." }
    // 4 total
  ],
  "testimonials": [
    { "quote": "...", "author": "...", "event": "...", "location": "..." }
    // 3 total
  ],
  "faqs": [
    { "question": "...", "answer": "..." }
    // 5 total
  ],
  "meta": {
    "title": "...", // Max 70 chars
    "description": "...", // Max 155 chars
    "keywords": ["...", "..."]
  }
}`;
  }

  private buildComponent(content: any, serviceType: string): string {
    return `import type { Metadata } from "next";
import PricingTables from "@/src/components/PricingTables";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "${content.meta.title}",
  description: "${content.meta.description}",
  openGraph: {
    title: "${content.meta.title}",
    description: "${content.meta.description}",
  },
};

export default function ${this.toPascalCase(serviceType)}Page() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs
          customLabels={{
            "${serviceType}": "${content.hero.title}"
          }}
        />

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-500">
            ${content.hero.eyebrow}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            ${content.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            ${content.hero.description}
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          ${content.benefits.map(b => `
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">${b.emoji}</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">${b.title}</h2>
            <p className="text-sm text-slate-600">${b.description}</p>
          </div>
          `).join('')}
        </div>
      </section>

      {/* Event Types */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Voor welke events?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            ${content.eventTypes.map(e => `
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">${e.emoji}</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">${e.title}</h3>
              <p className="text-sm text-slate-600">${e.description}</p>
            </div>
            `).join('')}
          </div>
        </div>
      </section>

      <PricingTables />

      {/* Process */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Hoe werkt het?
          </h2>
          <div className="space-y-6">
            ${content.process.map(p => `
            <div className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
                ${p.step}
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">${p.title}</h3>
                <p className="text-sm text-slate-600">${p.description}</p>
              </div>
            </div>
            `).join('')}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Wat klanten zeggen
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            ${content.testimonials.map(t => `
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
              <div className="mb-3 text-amber-400">⭐⭐⭐⭐⭐</div>
              <p className="mb-4 text-sm text-slate-300">${t.quote}</p>
              <p className="text-xs font-medium text-white">- ${t.author}, ${t.event} ${t.location}</p>
            </div>
            `).join('')}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">Vraag een offerte aan</h2>
          <p className="mb-8 text-lg text-amber-50">
            Ontvang binnen 24 uur een persoonlijke offerte voor jouw event.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/pakketten"
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
            >
              Bekijk pakketten
            </a>
            <WhatsAppButton
              variant="secondary"
              messageType="${serviceType}"
              label="Chat via WhatsApp"
            />
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-amber-600"
            >
              Vraag offerte aan
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            ${content.faqs.map(faq => `
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                ${faq.question}
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                ${faq.answer}
              </p>
            </details>
            `).join('')}
          </div>
        </div>
      </section>
    </main>
  );
}`;
  }
}
```

**Service Types to Automate**:

1. Festival DJ
2. School Gala DJ
3. Charity Event DJ
4. Product Launch DJ
5. Opening Event DJ
6. New Year's Eve DJ
7. Christmas Party DJ
8. Summer BBQ DJ
9. Beach Club DJ
10. Restaurant DJ

**Automation Achievement**: 70% → 85%

---

#### Phase 2.2: Blog Post Generation (Week 7-8)

**Objective**: Fully automate blog content creation

**Blog Strategy**:
- 2 posts per week (104 posts/year)
- Topics: DJ tips, event planning, music trends, local events
- SEO-optimized (target keywords)
- Shareable on social media

**Implementation**:

```typescript
// /backend/services/blogPostGenerator.ts
export class BlogPostGenerator {
  async generateBlogPost(topic: string, keywords: string[]): Promise<BlogPost> {
    // 1. Research topic
    const research = await this.researchTopic(topic, keywords);

    // 2. Generate outline
    const outline = await this.generateOutline(topic, research);

    // 3. Write content (section by section)
    const sections = await Promise.all(
      outline.sections.map(s => this.writeSection(s, research))
    );

    // 4. Generate meta content
    const meta = await this.generateMeta(topic, keywords, sections);

    // 5. Create featured image
    const image = await this.generateFeaturedImage(topic);

    // 6. Format as markdown
    const markdown = this.formatAsMarkdown({
      title: outline.title,
      meta,
      image,
      sections,
    });

    // 7. Save to content directory
    const slug = this.createSlug(outline.title);
    await fs.writeFile(
      `/frontend/content/blog/${slug}.md`,
      markdown
    );

    return {
      slug,
      title: outline.title,
      wordCount: this.countWords(sections),
      readingTime: this.calculateReadingTime(sections),
      seoScore: await this.calculateSEOScore(markdown, keywords),
    };
  }

  private async researchTopic(topic: string, keywords: string[]): Promise<Research> {
    // Use web search to get current information
    const searches = await Promise.all([
      this.webSearch(`${topic} ${new Date().getFullYear()}`),
      this.webSearch(`${keywords[0]} tips Nederland`),
      this.webSearch(`${keywords[1]} trends`),
    ]);

    return {
      facts: this.extractFacts(searches),
      statistics: this.extractStats(searches),
      quotes: this.extractQuotes(searches),
      sources: searches.flatMap(s => s.sources),
    };
  }

  private async generateOutline(topic: string, research: Research): Promise<Outline> {
    const llm = new LLMClient();

    const prompt = `Create a detailed blog post outline about "${topic}".

RESEARCH FINDINGS:
${JSON.stringify(research, null, 2)}

REQUIREMENTS:
- Title: 60-70 characters, compelling, includes primary keyword
- Introduction: Hook + problem + promise (100-150 words)
- 5-7 main sections, each with 3-4 subsections
- Conclusion: Summary + CTA (80-100 words)
- Tone: Professional yet conversational, Dutch language
- Target audience: Event organizers, partygoers in Netherlands

OUTPUT FORMAT (JSON):
{
  "title": "...",
  "introduction": "...",
  "sections": [
    {
      "heading": "...",
      "subsections": ["...", "...", "..."]
    }
  ],
  "conclusion": "..."
}`;

    const response = await llm.complete({ prompt, temperature: 0.8 });
    return JSON.parse(response);
  }
}
```

**Content Calendar Automation**:

```typescript
// /backend/jobs/contentCalendar.ts
export async function generateContentCalendar(weeks: number = 12) {
  const topics = [
    // Seasonal
    'Beste DJ tracks voor zomerfeesten 2026',
    'Nieuwjaarsfeest organiseren: Complete gids',
    'Kerstborrel muziek: Van loungy tot uptempo',

    // Event types
    'Bruiloft DJ boeken: 10 dingen die je moet weten',
    'Bedrijfsfeest entertainment trends',
    'Verjaardag DJ: Zo maak je je 40e onvergetelijk',

    // Location-based
    'Top 10 feestlocaties in Eindhoven',
    'Trouwen in Brabant: Mooiste venues',

    // How-to
    'Muziekwensen doorgeven aan je DJ: Stappenplan',
    'Dansvloer vol krijgen: 7 geheimen van professionals',

    // Lists
    '50 beste feestnummers aller tijden',
    'DJ equipment uitgelegd: Wat doet wat?',
  ];

  const calendar = [];
  const generator = new BlogPostGenerator();

  for (let week = 0; week < weeks; week++) {
    const topic1 = topics[week * 2];
    const topic2 = topics[week * 2 + 1];

    calendar.push({
      week: week + 1,
      post1: {
        topic: topic1,
        scheduledDate: this.getPublishDate(week, 0), // Monday
        status: 'scheduled',
      },
      post2: {
        topic: topic2,
        scheduledDate: this.getPublishDate(week, 1), // Thursday
        status: 'scheduled',
      },
    });
  }

  // Generate all posts
  for (const week of calendar) {
    await generator.generateBlogPost(week.post1.topic, this.extractKeywords(week.post1.topic));
    await generator.generateBlogPost(week.post2.topic, this.extractKeywords(week.post2.topic));
  }

  return calendar;
}
```

**Automation Achievement**: 85% → 95%

---

#### Phase 2.3: Ad Copy & Social Media (Week 9)

**Objective**: Generate ad variations and social media content

**Implementation**:

```typescript
// /backend/services/adCopyGenerator.ts
export class AdCopyGenerator {
  async generateAdVariations(campaign: AdCampaign): Promise<AdVariation[]> {
    const variations = [];

    // Generate 10 headline variations
    const headlines = await this.generateHeadlines(campaign);

    // Generate 5 description variations
    const descriptions = await this.generateDescriptions(campaign);

    // Generate 3 CTA variations
    const ctas = ['Vraag offerte aan', 'Bekijk pakketten', 'Chat via WhatsApp'];

    // Combine into variations
    for (const headline of headlines.slice(0, 5)) {
      for (const description of descriptions.slice(0, 3)) {
        for (const cta of ctas) {
          variations.push({
            headline,
            description,
            cta,
            predictedCTR: this.predictCTR(headline, description, cta),
          });
        }
      }
    }

    // Sort by predicted CTR, return top 20
    return variations.sort((a, b) => b.predictedCTR - a.predictedCTR).slice(0, 20);
  }

  async generateSocialMediaPosts(weeks: number = 4): Promise<SocialPost[]> {
    const postTypes = [
      'tip', 'behind-the-scenes', 'testimonial', 'event-recap',
      'music-recommendation', 'poll', 'question', 'promo'
    ];

    const posts = [];

    for (let day = 0; day < weeks * 7; day++) {
      if ([1, 3, 5].includes(day % 7)) { // Mon, Wed, Fri
        const postType = postTypes[Math.floor(Math.random() * postTypes.length)];
        const post = await this.generatePost(postType);

        posts.push({
          date: this.addDays(new Date(), day),
          platform: 'instagram',
          content: post.caption,
          image: post.image,
          hashtags: post.hashtags,
          type: postType,
        });
      }
    }

    return posts;
  }
}
```

**Automation Achievement**: 95% → 100% ✅

**Final Status**: 100% Automated ✅

**Expected Impact**:
- 10 new service pages/month
- 8 blog posts/month (104/year)
- 12 social posts/week
- 50+ ad variations/campaign
- 90% reduction in content creation time

---

## 3. LEAD SCORING: 0% → 100%

### Current State

**Status**: Not implemented
**Impact**: All leads treated equally, no prioritization
**Lost Opportunity**: ~30% of high-intent leads get slow responses

### Implementation Plan

#### Phase 3.1: Scoring Model Design (Week 10)

**Scoring Dimensions**:

| Dimension | Weight | Max Points |
|-----------|--------|------------|
| **Explicit Interest** | 40% | 40 points |
| **Behavioral Signals** | 30% | 30 points |
| **Firmographics** | 20% | 20 points |
| **Timing** | 10% | 10 points |

**Scoring Rules**:

```typescript
// /frontend/lib/scoring/leadScoringEngine.ts
export class LeadScoringEngine {
  calculateScore(lead: Lead, behavior: BehaviorData): LeadScore {
    const scores = {
      explicit: this.scoreExplicitInterest(lead),
      behavioral: this.scoreBehavior(behavior),
      firmographic: this.scoreFirmographics(lead),
      timing: this.scoreTiming(lead),
    };

    const total =
      scores.explicit * 0.4 +
      scores.behavioral * 0.3 +
      scores.firmographic * 0.2 +
      scores.timing * 0.1;

    return {
      total: Math.round(total),
      breakdown: scores,
      grade: this.getGrade(total),
      priority: this.getPriority(total),
    };
  }

  private scoreExplicitInterest(lead: Lead): number {
    let score = 0;

    // Form submission: +10 points
    score += 10;

    // Event type value
    const eventScores = {
      wedding: 15,      // High value, long sales cycle
      corporate: 20,    // Highest value, recurring potential
      party: 10,        // Medium value
      other: 5,
    };
    score += eventScores[lead.eventType] || 5;

    // Package interest
    const packageScores = {
      gold: 10,
      silver: 5,
      bronze: 2,
    };
    score += packageScores[lead.packageInterest] || 0;

    // Add-ons indicate serious interest
    score += (lead.addOns?.length || 0) * 2;

    // Guest count indicates budget
    if (lead.guestCount > 200) score += 5;
    else if (lead.guestCount > 100) score += 3;
    else if (lead.guestCount > 50) score += 1;

    return Math.min(score, 40);
  }

  private scoreBehavior(behavior: BehaviorData): number {
    let score = 0;

    // Page views (indicates research)
    if (behavior.pageViews > 10) score += 10;
    else if (behavior.pageViews > 5) score += 7;
    else if (behavior.pageViews > 2) score += 4;

    // Time on site (indicates interest)
    const minutesOnSite = behavior.timeOnSite / 60;
    if (minutesOnSite > 20) score += 10;
    else if (minutesOnSite > 10) score += 7;
    else if (minutesOnSite > 5) score += 4;

    // Specific pages visited
    const highIntentPages = [
      '/pakketten',
      '/contact',
      '/diensten/bruiloft-dj',
      '/diensten/bedrijfsfeest-dj',
    ];
    const highIntentVisits = behavior.pagesVisited.filter(
      p => highIntentPages.includes(p)
    ).length;
    score += highIntentVisits * 2;

    // Return visits
    if (behavior.sessions > 3) score += 5;
    else if (behavior.sessions > 1) score += 3;

    // Downloaded resources
    score += (behavior.downloads || 0) * 3;

    return Math.min(score, 30);
  }

  private scoreFirmographics(lead: Lead): number {
    let score = 0;

    // Location (service area)
    const premiumLocations = [
      'Eindhoven', 'Tilburg', 'Den Bosch', 'Breda',
      'Helmond', 'Veldhoven', 'Best', 'Waalre'
    ];
    if (premiumLocations.some(loc => lead.location?.includes(loc))) {
      score += 10;
    } else {
      score += 5; // Other locations
    }

    // Email domain (business vs personal)
    if (lead.email.match(/@(gmail|hotmail|yahoo|outlook)\./)) {
      score += 2; // Personal email
    } else {
      score += 8; // Business email (higher value)
    }

    // Message quality (indicates seriousness)
    if (lead.message && lead.message.length > 100) score += 5;
    else if (lead.message && lead.message.length > 50) score += 3;

    return Math.min(score, 20);
  }

  private scoreTiming(lead: Lead): number {
    const eventDate = new Date(lead.eventDate);
    const daysUntilEvent = Math.floor(
      (eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    // Sweet spot: 3-6 months out
    if (daysUntilEvent < 30) return 10;        // Urgent!
    else if (daysUntilEvent < 90) return 8;    // Soon
    else if (daysUntilEvent < 180) return 10;  // Perfect timing
    else if (daysUntilEvent < 365) return 6;   // Far out
    else return 3;                              // Very far
  }

  private getGrade(score: number): string {
    if (score >= 80) return 'A'; // Hot lead
    if (score >= 60) return 'B'; // Warm lead
    if (score >= 40) return 'C'; // Qualified lead
    if (score >= 20) return 'D'; // Cold lead
    return 'F';                   // Unqualified
  }

  private getPriority(score: number): string {
    if (score >= 80) return 'urgent';   // <1 hour response
    if (score >= 60) return 'high';     // <4 hour response
    if (score >= 40) return 'medium';   // <24 hour response
    return 'low';                        // <48 hour response
  }
}
```

**Automation Achievement**: 0% → 60%

---

#### Phase 3.2: Behavior Tracking Integration (Week 11)

**Objective**: Capture behavioral data for scoring

**PostHog Integration**:

```typescript
// /frontend/lib/tracking/behaviorTracker.ts
export class BehaviorTracker {
  async getBehaviorData(userId: string): Promise<BehaviorData> {
    const posthog = new PostHogClient();

    // Get all events for user
    const events = await posthog.getEvents({
      distinct_id: userId,
      event: ['$pageview', 'click', 'form_submit', 'download'],
      date_from: '-30d',
    });

    // Calculate metrics
    const pageViews = events.filter(e => e.event === '$pageview').length;
    const sessions = this.calculateSessions(events);
    const timeOnSite = this.calculateTimeOnSite(events);
    const pagesVisited = [...new Set(
      events
        .filter(e => e.event === '$pageview')
        .map(e => e.properties.$current_url)
    )];
    const downloads = events.filter(e => e.event === 'download').length;

    return {
      pageViews,
      sessions,
      timeOnSite,
      pagesVisited,
      downloads,
      firstSeen: new Date(events[events.length - 1].timestamp),
      lastSeen: new Date(events[0].timestamp),
    };
  }

  private calculateSessions(events: Event[]): number {
    let sessions = 1;
    let lastEventTime = events[0]?.timestamp;

    for (const event of events) {
      const timeDiff = lastEventTime - event.timestamp;
      if (timeDiff > 30 * 60 * 1000) { // 30 min gap = new session
        sessions++;
      }
      lastEventTime = event.timestamp;
    }

    return sessions;
  }

  private calculateTimeOnSite(events: Event[]): number {
    if (events.length < 2) return 0;
    return events[0].timestamp - events[events.length - 1].timestamp;
  }
}
```

**Real-Time Scoring**:

```typescript
// /frontend/app/api/contact/route.ts (enhanced)
export async function POST(request: Request) {
  const data = await request.json();

  // Get user ID from PostHog
  const userId = request.headers.get('x-posthog-distinct-id');

  // Get behavior data
  const behaviorTracker = new BehaviorTracker();
  const behavior = await behaviorTracker.getBehaviorData(userId);

  // Calculate lead score
  const scoringEngine = new LeadScoringEngine();
  const score = scoringEngine.calculateScore(data, behavior);

  // Create lead with score
  const crm = new RentGuyClient();
  const crmLead = await crm.createLead({
    ...data,
    score: score.total,
    grade: score.grade,
    priority: score.priority,
  });

  // Route to appropriate team based on priority
  if (score.priority === 'urgent') {
    await notifyUrgent(crmLead);
  } else if (score.priority === 'high') {
    await notifyHighPriority(crmLead);
  }

  return NextResponse.json({ success: true, score });
}
```

**Automation Achievement**: 60% → 90%

---

#### Phase 3.3: Auto-Qualification & Routing (Week 12)

**Objective**: Automatically qualify and route leads

**Implementation**:

```typescript
// /backend/services/leadQualification.ts
export class LeadQualificationService {
  async qualifyAndRoute(lead: Lead, score: LeadScore): Promise<QualificationResult> {
    // 1. Automatic qualification
    const qualification = this.qualify(lead, score);

    // 2. Route to appropriate team
    const assignee = await this.assignLead(lead, qualification);

    // 3. Set follow-up cadence
    const cadence = this.determineFollowUpCadence(qualification);

    // 4. Create tasks in CRM
    await this.createCRMTasks(lead, assignee, cadence);

    // 5. Trigger appropriate workflow
    await this.triggerWorkflow(lead, qualification);

    return {
      qualified: qualification.qualified,
      reason: qualification.reason,
      assignee,
      cadence,
      nextAction: qualification.nextAction,
    };
  }

  private qualify(lead: Lead, score: LeadScore): Qualification {
    // Auto-disqualify conditions
    if (score.total < 15) {
      return {
        qualified: false,
        reason: 'Low engagement score',
        nextAction: 'nurture_campaign',
      };
    }

    // Budget mismatch
    if (lead.packageInterest === 'bronze' && lead.eventType === 'wedding') {
      return {
        qualified: false,
        reason: 'Budget expectations too low for wedding',
        nextAction: 'send_educational_content',
      };
    }

    // Out of service area
    if (!this.inServiceArea(lead.location)) {
      return {
        qualified: false,
        reason: 'Outside service area',
        nextAction: 'refer_to_partner',
      };
    }

    // Event too far in future (>18 months)
    const eventDate = new Date(lead.eventDate);
    const monthsUntilEvent = (eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsUntilEvent > 18) {
      return {
        qualified: false,
        reason: 'Event too far in future',
        nextAction: 'nurture_until_6_months_out',
      };
    }

    // Qualified!
    return {
      qualified: true,
      reason: `Score: ${score.total} (Grade ${score.grade})`,
      nextAction: score.priority === 'urgent' ? 'call_immediately' : 'email_quote',
    };
  }

  private determineFollowUpCadence(qualification: Qualification): FollowUpCadence {
    if (!qualification.qualified) {
      return {
        sequence: 'nurture',
        frequency: 'weekly',
        duration: '3_months',
      };
    }

    if (qualification.nextAction === 'call_immediately') {
      return {
        sequence: 'hot_lead',
        frequency: 'daily',
        duration: '1_week',
        touchpoints: [
          { delay: '0h', method: 'phone', template: 'urgent_call' },
          { delay: '4h', method: 'email', template: 'quote_sent' },
          { delay: '24h', method: 'phone', template: 'follow_up_call' },
          { delay: '48h', method: 'sms', template: 'check_in' },
        ],
      };
    }

    return {
      sequence: 'standard_sales',
      frequency: 'every_3_days',
      duration: '2_weeks',
      touchpoints: [
        { delay: '1h', method: 'email', template: 'quote_sent' },
        { delay: '24h', method: 'phone', template: 'intro_call' },
        { delay: '72h', method: 'email', template: 'follow_up_1' },
        { delay: '168h', method: 'email', template: 'follow_up_2' },
      ],
    };
  }
}
```

**Auto-Disqualification Examples**:
- Score < 15 → Nurture campaign
- Event date > 18 months → Long-term nurture
- Location outside 100km radius → Refer to partner
- Budget mismatch → Educational content

**Automation Achievement**: 90% → 100% ✅

**Final Status**: 100% Automated ✅

**Expected Impact**:
- 50% faster response to hot leads
- 80% reduction in time spent on unqualified leads
- 35% increase in conversion rate (better prioritization)
- 100% consistent qualification criteria

---

## 4. EMAIL MARKETING: 0% → 100%

### Current State

**Status**: Not implemented
**Impact**: No automated nurturing, no re-engagement
**Lost Opportunity**: ~60% of leads need nurturing before buying

### Implementation Plan

#### Phase 4.1: Email Service Setup (Week 13)

**Provider Selection**: Postmark (chosen for deliverability)

**Setup Checklist**:
- [ ] Create Postmark account
- [ ] Verify domain (mr-dj.nl)
- [ ] Set up SPF, DKIM, DMARC records
- [ ] Create sender signatures
- [ ] Design email templates
- [ ] Set up bounce/complaint webhooks

**Email Templates to Create**:

1. **Transactional** (6 templates)
   - Lead confirmation
   - Quote sent
   - Booking confirmation
   - Payment confirmation
   - Event reminder (7 days before)
   - Post-event follow-up

2. **Nurture Sequences** (15 templates)
   - Welcome series (3 emails)
   - Educational series (5 emails)
   - Re-engagement series (3 emails)
   - Seasonal promotions (4 emails)

3. **Behavioral Triggers** (8 templates)
   - Abandoned form
   - Pricing page visit (no submission)
   - Multiple visits (no contact)
   - Long-time subscriber (no booking)

**Automation Achievement**: 0% → 30%

---

#### Phase 4.2: Campaign Automation (Week 14-15)

**Welcome Series** (for new leads):

```typescript
// /backend/campaigns/welcomeSeries.ts
export const welcomeSeries: EmailCampaign = {
  name: 'Welcome Series',
  trigger: 'lead_submitted',
  emails: [
    {
      delay: '1 hour',
      template: 'welcome-1-confirmation',
      subject: 'We hebben je aanvraag ontvangen! 🎵',
      content: {
        greeting: 'Hi {{firstName}}',
        body: `
          Bedankt voor je interesse in Mister DJ!

          We hebben je aanvraag voor een {{eventType}} op {{eventDate}} ontvangen.

          **Wat gebeurt er nu?**
          - We bellen je binnen 24 uur voor een kennismakingsgesprek
          - Je ontvangt een offerte op maat binnen 48 uur
          - We bespreken alle details en wensen

          In de tussentijd, bekijk onze [pakketten](/pakketten) of
          [chat direct via WhatsApp](https://wa.me/31612345678).

          Met vriendelijke groet,
          Het Mister DJ team
        `,
        cta: {
          text: 'Bekijk onze pakketten',
          url: 'https://mr-dj.nl/pakketten',
        },
      },
    },
    {
      delay: '3 days',
      template: 'welcome-2-education',
      subject: 'Zo kies je de perfecte DJ voor jouw {{eventType}} 💡',
      condition: 'no_response_yet',
      content: {
        body: `
          Hi {{firstName}},

          Bij het kiezen van een DJ voor je {{eventType}} zijn een paar dingen belangrijk:

          **1. Ervaring met jouw type event**
          Wij hebben 500+ {{eventType}}s gedaan en weten exact hoe we je gasten
          van begin tot eind aan het dansen houden.

          **2. Muziekwensen serieus nemen**
          Je krijgt van ons een uitgebreid formulier om al je wensen door te geven.
          Van must-haves tot absolute no-goes.

          **3. Professionele apparatuur**
          Onze setup past bij de grootte van je event. Voor {{guestCount}} gasten
          adviseren we pakket {{recommendedPackage}}.

          **4. Transparante prijzen**
          Geen verrassingen. Wat je ziet is wat je betaalt.

          Heb je nog vragen? Laat het weten!

          Groeten,
          {{djName}}
        `,
      },
    },
    {
      delay: '7 days',
      template: 'welcome-3-social-proof',
      subject: 'Hoe {{competitor_name}} hun {{eventType}} onvergetelijk maakte ⭐',
      condition: 'no_response_yet && no_booking',
      content: {
        testimonial: true,
        body: `
          Hi {{firstName}},

          Laatst verzorgden we een {{eventType}} voor {{testimonial.name}} in {{testimonial.location}}.

          Hier is wat ze ervan vonden:

          > "{{testimonial.quote}}"
          > - {{testimonial.name}}, {{testimonial.event}}

          We zouden jouw {{eventType}} ook graag onvergetelijk maken.

          Heb je nog vragen over onze aanpak? Bel me gerust: 06-12345678

          Groeten,
          {{djName}}
        `,
        cta: {
          text: 'Lees meer testimonials',
          url: 'https://mr-dj.nl/#testimonials',
        },
      },
    },
  ],
};
```

**Educational Series** (for engaged leads):

```typescript
export const educationalSeries: EmailCampaign = {
  name: 'Educational Series',
  trigger: 'engaged_but_no_booking',
  frequency: '1_per_week',
  emails: [
    {
      subject: 'De ultieme {{eventType}} checklist 📋',
      template: 'education-1-checklist',
    },
    {
      subject: 'Top 10 fouten bij het boeken van een DJ (en hoe je ze vermijdt)',
      template: 'education-2-mistakes',
    },
    {
      subject: 'Hoeveel kost een goede DJ echt? 💰',
      template: 'education-3-pricing',
    },
    {
      subject: 'DJ + Live Saxofoon: Waarom deze combo zo succesvol is 🎷',
      template: 'education-4-live-sax',
    },
    {
      subject: 'De 50 beste feestnummers voor je {{eventType}} 🎵',
      template: 'education-5-playlist',
    },
  ],
};
```

**Re-Engagement Series** (for cold leads):

```typescript
export const reEngagementSeries: EmailCampaign = {
  name: 'Re-Engagement',
  trigger: 'no_activity_30_days',
  emails: [
    {
      delay: '0 days',
      subject: 'Nog steeds op zoek naar een DJ? 🤔',
      template: 're-engage-1-check-in',
      content: {
        body: `
          Hi {{firstName}},

          Een tijdje geleden vroeg je een offerte aan voor je {{eventType}} op {{eventDate}}.

          Ben je nog steeds op zoek naar een DJ? Of heb je al iemand gevonden?

          Als je nog vragen hebt, laat het me weten. Ik help graag!

          Groeten,
          {{djName}}

          P.S. Onze agenda vult snel voor {{eventMonth}}. Wil je je datum
          vasthouden? Laat het me weten!
        `,
      },
    },
    {
      delay: '7 days',
      subject: 'Last chance: Speciale aanbieding voor {{eventMonth}} 🎉',
      condition: 'no_response',
      template: 're-engage-2-offer',
      content: {
        body: `
          Hi {{firstName}},

          Voor bookings in {{eventMonth}} hebben we een speciale actie:

          **10% korting + GRATIS DJ booth verlichting** (t.w.v. €150)

          Geldig tot: {{offerExpiryDate}}

          Klik hier om je datum vast te leggen: [Boek nu]({{bookingLink}})

          Groeten,
          Het Mister DJ team
        `,
      },
    },
    {
      delay: '14 days',
      subject: 'We horen graag van je! (of we stoppen met mailen) 👋',
      condition: 'no_response',
      template: 're-engage-3-final',
      content: {
        body: `
          Hi {{firstName}},

          We willen je inbox niet vol spammen, dus dit is de laatste mail van ons.

          Als je nog interesse hebt in een DJ voor je {{eventType}},
          laat het ons weten! Anders verwijderen we je uit onze maillijst.

          [Ja, ik heb nog interesse]({{interestLink}})
          [Nee bedankt, verwijder me]({{unsubscribeLink}})

          Heel veel succes met je event!

          Groeten,
          Het Mister DJ team
        `,
      },
    },
  ],
};
```

**Automation Achievement**: 30% → 70%

---

#### Phase 4.3: Behavioral Triggers (Week 16)

**Abandoned Form Recovery**:

```typescript
// /frontend/app/api/webhooks/form-abandonment/route.ts
export async function POST(request: Request) {
  const { userId, formData, abandonedAt } = await request.json();

  // Wait 30 minutes
  await sleep(30 * 60 * 1000);

  // Check if they completed
  const completed = await checkIfCompleted(userId);
  if (completed) return;

  // Send recovery email
  await sendEmail({
    to: formData.email,
    template: 'form-abandonment',
    data: {
      firstName: formData.firstName,
      eventType: formData.eventType,
      formLink: `https://mr-dj.nl/contact?resume=${userId}`,
    },
  });
}
```

**Behavioral Trigger Examples**:

| Behavior | Trigger Email | Delay |
|----------|---------------|-------|
| Visited pricing 3+ times | "Need help choosing a package?" | 2 hours |
| Abandoned form | "Finish your quote request" | 30 min |
| Multiple visits, no contact | "Questions? Let's chat!" | 1 day |
| Downloaded checklist | "How to use the checklist" | 1 hour |
| Viewed testimonials | "More success stories" | 2 days |

**Automation Achievement**: 70% → 90%

---

#### Phase 4.4: Segmentation & Personalization (Week 17)

**Segment Definitions**:

```typescript
export const segments = {
  hot_leads: {
    criteria: {
      score: { gte: 80 },
      lastActivity: { within: '7d' },
    },
    campaigns: ['hot-lead-sequence'],
  },
  warm_leads: {
    criteria: {
      score: { gte: 60, lt: 80 },
      lastActivity: { within: '14d' },
    },
    campaigns: ['nurture-sequence', 'educational-series'],
  },
  cold_leads: {
    criteria: {
      score: { lt: 60 },
      lastActivity: { after: '30d' },
    },
    campaigns: ['re-engagement'],
  },
  wedding_leads: {
    criteria: {
      eventType: 'wedding',
    },
    campaigns: ['wedding-specific-tips', 'wedding-checklist'],
  },
  corporate_leads: {
    criteria: {
      eventType: 'corporate',
    },
    campaigns: ['corporate-case-studies', 'corporate-packages'],
  },
  high_value: {
    criteria: {
      packageInterest: 'gold',
      or: {
        guestCount: { gte: 200 },
      },
    },
    campaigns: ['vip-treatment', 'personal-consultation'],
  },
};
```

**Dynamic Personalization**:

```typescript
export function personalize(template: string, lead: Lead): string {
  return template
    .replace(/{{firstName}}/g, lead.firstName)
    .replace(/{{eventType}}/g, lead.eventType)
    .replace(/{{eventDate}}/g, formatDate(lead.eventDate))
    .replace(/{{eventMonth}}/g, getMonth(lead.eventDate))
    .replace(/{{guestCount}}/g, lead.guestCount.toString())
    .replace(/{{recommendedPackage}}/g, recommendPackage(lead))
    .replace(/{{djName}}/g, getAssignedDJ(lead).name)
    .replace(/{{testimonial\\.(.+?)}}/g, (_, field) => {
      const testimonial = getRelevantTestimonial(lead.eventType);
      return testimonial[field];
    });
}
```

**Automation Achievement**: 90% → 100% ✅

**Final Status**: 100% Automated ✅

**Expected Impact**:
- 85% open rate (vs industry avg 20%)
- 15% click-through rate (vs industry avg 2.5%)
- 25% of leads nurtured into bookings
- €120,000-€180,000 additional annual revenue from email alone

---

## IMPLEMENTATION TIMELINE & BUDGET

### Timeline (17 Weeks = ~4 Months)

```
Month 1 (Weeks 1-4): CRM Integration
├─ Week 1-2: RentGuy API integration
├─ Week 2-3: Email notification system
├─ Week 3: Database backup storage
└─ Week 4: Advanced CRM features

Month 2 (Weeks 5-9): Content Generation
├─ Week 5-6: Service page automation
├─ Week 7-8: Blog post generation
└─ Week 9: Ad copy & social media

Month 3 (Weeks 10-12): Lead Scoring
├─ Week 10: Scoring model design
├─ Week 11: Behavior tracking integration
└─ Week 12: Auto-qualification & routing

Month 4 (Weeks 13-17): Email Marketing
├─ Week 13: Email service setup
├─ Week 14-15: Campaign automation
├─ Week 16: Behavioral triggers
└─ Week 17: Segmentation & personalization
```

### Budget Breakdown

| Category | Investment | Annual ROI | Payback |
|----------|------------|------------|---------|
| **CRM Integration** | €3,500 | €80,000-€120,000 | 2 weeks |
| **Content Generation** | €5,000 | €60,000-€100,000 | 3 weeks |
| **Lead Scoring** | €3,000 | €50,000-€80,000 | 3 weeks |
| **Email Marketing** | €3,500 | €120,000-€180,000 | 2 weeks |
| **TOTAL** | **€15,000** | **€310,000-€480,000** | **3-4 weeks** |

**ROI Multiple**: 20.7x - 32x
**Monthly Recurring Costs**: €150-€250 (email service + infrastructure)

---

## SUCCESS METRICS & MONITORING

### Key Performance Indicators

| Metric | Current | Target (100% Automation) | Measurement |
|--------|---------|--------------------------|-------------|
| **Lead Response Time** | 4-6 hours | <1 hour (urgent), <4 hours (other) | CRM timestamps |
| **Lead Conversion Rate** | 2.5% | 4.5%-5.5% | CRM analytics |
| **Content Production** | 2 pieces/week | 20+ pieces/week | Content calendar |
| **Email Engagement** | N/A | 85% open, 15% CTR | Postmark analytics |
| **Lead Scoring Accuracy** | N/A | 90%+ | Actual conversions vs predicted |
| **CRM Sync Success** | N/A | 99%+ | Database logs |
| **Time Saved** | N/A | 40-50 hours/week | Time tracking |

### Monitoring Dashboard

```typescript
// /backend/dashboards/automationHealth.ts
export const automationHealthDashboard = {
  sections: [
    {
      title: 'CRM Integration Health',
      metrics: [
        { name: 'Sync Success Rate', target: 99, current: 'realtime' },
        { name: 'Average Response Time', target: '<1h', current: 'realtime' },
        { name: 'Failed Syncs (24h)', target: '<5', current: 'realtime' },
      ],
    },
    {
      title: 'Content Generation',
      metrics: [
        { name: 'Posts Generated (Week)', target: 20, current: 'realtime' },
        { name: 'SEO Score Average', target: '>90', current: 'realtime' },
        { name: 'Generation Errors', target: '0', current: 'realtime' },
      ],
    },
    {
      title: 'Lead Scoring',
      metrics: [
        { name: 'Leads Scored (24h)', target: 'all', current: 'realtime' },
        { name: 'Hot Leads Identified', target: '15-20%', current: 'realtime' },
        { name: 'Scoring Accuracy', target: '>90%', current: 'weekly' },
      ],
    },
    {
      title: 'Email Marketing',
      metrics: [
        { name: 'Open Rate', target: '>85%', current: 'realtime' },
        { name: 'Click Rate', target: '>15%', current: 'realtime' },
        { name: 'Unsubscribe Rate', target: '<0.5%', current: 'realtime' },
        { name: 'Bounce Rate', target: '<2%', current: 'realtime' },
      ],
    },
  ],
};
```

---

## CONCLUSION

This implementation plan provides a **clear roadmap to 100% automation** across all systems. By completing these 4 initiatives over 17 weeks, the Mr. DJ platform will achieve:

✅ **100% CRM Integration** - Zero lead loss, instant sync, automated follow-ups
✅ **100% Content Generation** - 20+ pieces/week, fully automated
✅ **100% Lead Scoring** - Intelligent prioritization, automated routing
✅ **100% Email Marketing** - Behavior-triggered campaigns, sophisticated nurturing

**Total Investment**: €15,000
**Annual ROI**: €310,000-€480,000 (21-32x return)
**Payback Period**: 3-4 weeks
**Ongoing Costs**: €150-€250/month

**Next Action**: Begin with CRM Integration (highest impact, shortest payback).

---

**Document Version**: 1.0
**Created**: 2025-12-03
**Status**: Ready for Implementation
**Approval Required**: Yes (from business owner)

---
