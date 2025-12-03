# B11 - Analytics & Tracking Implementatie | Analytics & Tracking Implementation

**Datum / Date**: 2025-12-03
**Status**: ✅ COMPLEET / COMPLETE
**Tijd Besteed / Time Spent**: Uitgebreide analyse van bestaande implementatie

---

## NEDERLANDS (NL)

### 1. Executive Samenvatting

**Huidige Status**: Mr. DJ heeft een **moderne en comprehensive analytics stack** geïmplementeerd die voldoet aan GDPR/AVG vereisten en volledige conversie tracking mogelijk maakt.

**Kern Componenten**:
- ✅ **Google Analytics 4 (GA4)**: Volledige event tracking met 11+ custom events
- ✅ **Google Tag Manager (GTM)**: Container management voor tags
- ✅ **PostHog**: Product analytics en feature flag management
- ✅ **Marketing Pixels**: Meta (Facebook), LinkedIn, Google Ads
- ✅ **Consent Framework**: GDPR-compliant consent management
- ✅ **Real User Monitoring (RUM)**: Core Web Vitals tracking

**Impact**:
- 📊 Volledige visibility over customer journey
- 🎯 Data-driven optimalisatie mogelijk
- 📈 Marketing ROI traceerbaar
- ✅ GDPR/AVG compliant

---

### 2. Analytics Stack Overzicht

#### 2.1 Google Analytics 4 (GA4)

**Implementatie**: `frontend/public/assets/js/modules/analytics.js`

**Event Tracking** (11 geïmplementeerde events):

1. **page_view**
   - Automatisch getriggerd bij elke pagina navigatie
   - Parameters: `page_location`, `page_title`, `event_timestamp`
   - Gebruik: Traffic analyse, bounce rates, user flow

2. **availability_check_started**
   - Trigger: Gebruiker start beschikbaarheidscheck
   - Parameters: Custom detail object
   - Gebruik: Measure interest in booking

3. **availability_check_success**
   - Trigger: Beschikbaarheidscheck succesvol afgerond
   - Parameters: Custom detail object
   - Gebruik: Track conversion funnel

4. **lead_submitted**
   - Trigger: Contactformulier ingediend
   - Parameters: Form details
   - Gebruik: **Primary conversion event**

5. **package_view**
   - Trigger: Gebruiker bekijkt pakket details
   - Parameters: `package_name`, `package_price`
   - Gebruik: Product interesse tracking

6. **package_cta_click**
   - Trigger: CTA klik op pakket pagina
   - Parameters: `cta_location`, `package_name`
   - Gebruik: CTA effectiveness

7. **pricing_brochure_download**
   - Trigger: Download prijslijst/brochure
   - Parameters: Document type
   - Gebruik: Content engagement

8. **persona_focus**
   - Trigger: Gebruiker selecteert persona (Bruiloft/Corporate/Feest)
   - Parameters: `persona_type`
   - Gebruik: Audience segmentation

9. **testimonial_impression**
   - Trigger: Testimonial zichtbaar in viewport
   - Parameters: `testimonial_id`
   - Gebruik: Social proof effectiveness

10. **testimonial_cta_click**
    - Trigger: Klik op CTA bij testimonial
    - Parameters: `testimonial_id`, `cta_action`
    - Gebruik: Social proof conversion

11. **consent_update**
    - Trigger: Gebruiker wijzigt consent preferences
    - Parameters: `consent_type`, `granted`
    - Gebruik: GDPR compliance monitoring

**DataLayer Structuur**:
```javascript
window.dataLayer.push({
  event: 'event_name',
  event_timestamp: '2025-12-03T17:00:00.000Z',
  // Event-specific parameters
  package_name: 'Zilver',
  package_price: 1350,
  cta_location: 'hero-section'
});
```

#### 2.2 Marketing Integraties

**Runtime Configuratie**: `docs/analytics/marketing-runtime-config.md`

**Omgevingsvariabelen**:

| Variabele | Doel | Fallback |
|-----------|------|----------|
| `VITE_POSTHOG_API_KEY` | PostHog product analytics | Geen init als leeg |
| `VITE_POSTHOG_API_HOST` | PostHog endpoint override | `https://app.posthog.com` |
| `VITE_META_PIXEL_ID` | Facebook retargeting | `null` → geen pixel |
| `VITE_GOOGLE_TAG_ID` | GTM/GA4 container ID | `null` → geen tag |
| `VITE_LINKEDIN_PIXEL_ID` | LinkedIn Insight Tag | `null` → geen pixel |
| `VITE_GOOGLE_ADS_CONVERSION_ID` | Google Ads conversies | Geen init, console warning |

**Marketing Platforms**:

1. **PostHog**
   - **Doel**: Product analytics, feature flags, session recording
   - **Initialisatie**: Alleen met geldige API key
   - **Events**: Alle GA4 events worden ook naar PostHog gestuurd
   - **Use Case**: A/B testing, funnel analyse, user behavior

2. **Meta Pixel (Facebook)**
   - **Doel**: Facebook/Instagram retargeting
   - **Consent**: Alleen actief met marketing consent
   - **Events**: PageView, Lead, ViewContent
   - **Use Case**: Facebook Ads remarketing campaigns

3. **LinkedIn Insight Tag**
   - **Doel**: LinkedIn Ads retargeting
   - **Consent**: Alleen actief met marketing consent
   - **Events**: PageView, conversion events
   - **Use Case**: B2B corporate event retargeting

4. **Google Ads Conversion**
   - **Doel**: YouTube retargeting, Google Ads tracking
   - **Events**: Conversion tracking voor ad campaigns
   - **Use Case**: Google Ads ROI measurement

#### 2.3 GDPR/AVG Consent Framework

**Implementatie**: `docs/marketing-consent-tracking.md`

**Consent Categorieën**:
- **Necessary**: Altijd actief (analytics.js core)
- **Analytics**: GA4 tracking (opt-in)
- **Marketing**: Alle retargeting pixels (opt-in)

**Consent Lifecycle**:
```javascript
// 1. Gebruiker geeft marketing consent
→ Facebook Pixel script wordt geladen
→ LinkedIn Pixel script wordt geladen
→ Event: 'mr-dj:marketing-consent-change' (granted: true)

// 2. Gebruiker trekt consent in
→ fbq('consent', 'revoke') wordt aangeroepen
→ Script nodes worden verwijderd
→ Event: 'mr-dj:marketing-consent-change' (granted: false)
```

**Custom Event**:
```javascript
window.addEventListener('mr-dj:marketing-consent-change', (event) => {
  console.log('Marketing consent:', event.detail.granted);
  // Integraties kunnen hierop reageren
});
```

**Cypress Testing**:
- Automated tests in `tests/frontend/consent.cy.ts`
- Verifieert Facebook Pixel lifecycle
- Verifieert consent event propagation
- Waarborgt GDPR compliance

---

### 3. Real User Monitoring (RUM)

**Documentatie**: `docs/analytics/ga4-rum-dashboards.md`

#### 3.1 Custom Dimensions

**Gedefinieerd in GA4**:

| Naam | Parameter | Beschrijving |
|------|-----------|--------------|
| Page Group | `page_group` | Logische groepering (Home, Pricing, Contact) |
| Region | `region` | Geographic region (GeoIP of user selection) |

**GTM Variabelen**:
```javascript
// Page Group
window.mrdj.pageGroup || 'unknown'

// Region
window.mrdj.region || {{GeoIP Country}}
```

#### 3.2 Core Web Vitals Tracking

**Metrics**:
- **LCP** (Largest Contentful Paint): Target <2.5s
- **FID** (First Input Delay): Target <100ms
- **CLS** (Cumulative Layout Shift): Target <0.1

**Data Collection**:
- Automatisch via GA4 Enhanced Measurement
- Custom parameters: `page_group`, `region`, `device_category`
- BigQuery export voor long-term analyse

#### 3.3 Looker Studio Dashboard

**Charts**:
1. **Scorecard**: Gemiddelde LCP per page group
2. **Time series**: CLS over tijd per region
3. **Table**: Page group vs. Avg. TTFB (descending)
4. **Heatmap**: Device category vs. Page group (avg session duration)

**Filters**:
- Page Group dropdown
- Region selector
- Device Category filter

**Access**: `mr-dj-analytics@mr-dj.com` (edit access)

#### 3.4 Alerting

**Geconfigureerde Alerts**:
1. **LCP Alert**
   - Trigger: Avg. LCP > 2.5s voor any page group (24 uur)
   - Destination: `analytics-alerts@mr-dj.com` + Slack `#mr-dj-alerts`

2. **CLS Alert**
   - Trigger: Avg. CLS > 0.25 voor EU users
   - Destination: Email + Slack

**Alert Configuration**: GA4 → Reports → Insights & Recommendations

---

### 4. Dashboard & Reporting Backlog

**Documentatie**: `docs/ga4-dashboard-backlog.md`

#### 4.1 Bestaande Assets (✅ Beschikbaar)

**Audience Segments**:
- Converted Users
- Form Submitters
- Phone Clickers
- Pricing Package Interest
- High Intent Users

**Custom Explorations**:
- Conversions by Variant (A/B test resultaten)
- Package Performance Analysis
- Conversion Funnel Analysis
- Event Type Performance

**Standard Report Collection**:
- Acquisition reports
- Engagement reports
- Events & Conversions
- Pages & Screens
- Dedicated "Conversion Tracking" collection

#### 4.2 Prioritized Backlog

**Priority 0 (Kritisch - Nu Implementeren)**:

| Task | Beschrijving | Owner |
|------|--------------|-------|
| **Channel & Campaign Performance Dashboard** | GA4 Exploration of Looker Studio report met acquisition metrics + conversion breakdown per traffic source | Analytics |
| **Conversion Health Alert Automation** | Automated alerts voor conversion drops vs. 7-day average | Analytics |

**Priority 1 (Hoog - Komende Sprint)**:

| Task | Beschrijving | Dependencies |
|------|--------------|--------------|
| **Revenue & Package Mix Dashboard** | Join GA4 events met package_price voor revenue estimate, AOV, package mix trends | `package_price` parameter |
| **Lead Quality Pipeline Reporting** | Integreer CRM/booking data met GA4 voor lead progression tracking | CRM export/API |
| **Consent Compliance Monitor** | Dashboard voor consent banner interactions en data collection impact | Consent events in GTM |

**Priority 2 (Medium)**:

- Content Engagement Deep Dive (scroll depth, outbound clicks)
- Executive KPI Overview (high-level dashboard voor leadership)

**Priority 3 (Laag)**:

- Automated Reporting Distribution (weekly email/Slack summaries)
- Data Quality Watchlist (automated checks voor missing parameters)

---

### 5. Implementatie Status & Gaps

#### 5.1 ✅ Wat Werkt Goed

**Analytics Foundation**:
- ✅ GA4 volledig geconfigureerd met 11+ events
- ✅ GTM container actief en werkend
- ✅ PostHog geïntegreerd voor product analytics
- ✅ Marketing pixels (Meta, LinkedIn, Google Ads)
- ✅ GDPR-compliant consent management
- ✅ Core Web Vitals tracking via RUM
- ✅ Cypress tests voor consent framework

**Data Quality**:
- ✅ Event timestamps consistent (ISO format)
- ✅ Custom parameters goed gestructureerd
- ✅ DataLayer implementation correct

#### 5.2 ⚠️ Gaps & Aanbevelingen

**Missing Dashboards** (Prioriteit 0):
- ⚠️ **Marketing Source Dashboard**: Nog niet gebouwd
  - **Actie**: Bouw Looker Studio dashboard met acquisition + conversion data
  - **Timeline**: Deze sprint
  - **Owner**: Analytics team

- ⚠️ **Conversion Health Alerts**: Nog niet geautomatiseerd
  - **Actie**: Configureer GA4 Insights alerts voor conversion drops
  - **Timeline**: Deze sprint
  - **Owner**: Analytics team

**Missing Integrations** (Prioriteit 1):
- ⚠️ **CRM Integration**: GA4 niet gelinkt aan CRM/booking data
  - **Actie**: Set up data sharing met CRM system
  - **Timeline**: Volgende sprint
  - **Owner**: Analytics + Sales

- ⚠️ **Revenue Tracking**: `package_price` parameter moet consistent populated worden
  - **Actie**: Audit alle package_view events, zorg voor price data
  - **Timeline**: Deze sprint
  - **Owner**: Frontend dev

**Testing & Monitoring**:
- ⚠️ **Synthetic Monitoring**: Geen automated healthchecks voor tag loading
  - **Actie**: Implementeer Checkly monitors voor GTM/GA4/PostHog
  - **Timeline**: Volgende sprint
  - **Owner**: DevOps

- ⚠️ **BigQuery Export**: Optioneel maar aanbevolen voor long-term analyse
  - **Actie**: Enable BigQuery linking in GA4
  - **Timeline**: Over 2 sprints
  - **Owner**: Analytics + Data Engineering

---

### 6. GA4 Event Specificaties

**Detailed Event Schema** (voor ontwikkelaars):

#### Event: `lead_submitted` (Primary Conversion)
```javascript
window.dataLayer.push({
  event: 'lead_submitted',
  event_timestamp: new Date().toISOString(),
  form_type: 'contact', // of 'quote', 'availability'
  persona_type: 'bruiloft', // of 'corporate', 'feest'
  package_interest: 'zilver', // of 'brons', 'goud', 'unknown'
  event_date: '2025-06-15', // datum van event
  event_location: 'Eindhoven',
  lead_source: 'organic', // of 'paid', 'referral'
  page_group: 'contact'
});
```

#### Event: `package_cta_click`
```javascript
window.dataLayer.push({
  event: 'package_cta_click',
  event_timestamp: new Date().toISOString(),
  package_name: 'zilver',
  package_price: 1350,
  cta_location: 'hero-section', // of 'comparison-table', 'pricing-card'
  cta_text: 'Kies Zilver',
  page_group: 'pricing'
});
```

#### Event: `persona_focus`
```javascript
window.dataLayer.push({
  event: 'persona_focus',
  event_timestamp: new Date().toISOString(),
  persona_type: 'bruiloft', // of 'corporate', 'feest'
  focus_method: 'interactive-selector', // of 'navigation-click'
  previous_persona: 'unknown',
  page_group: 'home'
});
```

---

### 7. Looker Studio Dashboard Specificaties

#### Dashboard 1: Marketing Source Effectiveness (PRIORITEIT 0)

**Doel**: Attribute conversions en package interest per traffic channel

**Data Source**: GA4 Connector

**Charts**:
1. **Scorecard Row**:
   - Total Sessions
   - Total Conversions (lead_submitted)
   - Conversion Rate %
   - Avg. Package Interest Value (estimated revenue)

2. **Time Series**:
   - X-as: Datum (dag/week/maand filter)
   - Y-as: Conversions
   - Breakdown: Traffic Source (Organic, Paid, Direct, Referral)

3. **Table**: Source/Medium vs. Conversions
   - Columns: Source/Medium, Sessions, Conversions, Conv. Rate, Avg. Session Duration
   - Sort: Conversions DESC

4. **Bar Chart**: Campaign Performance
   - X-as: Campaign name
   - Y-as: Conversions
   - Filter: Alleen paid traffic

5. **Funnel Viz**:
   - Step 1: Session Start
   - Step 2: package_view
   - Step 3: package_cta_click
   - Step 4: lead_submitted

**Filters**:
- Date Range picker
- Traffic Source dropdown
- Campaign filter
- Device Category

**Refresh**: Elke 4 uur

**Access**: `mr-dj-analytics@mr-dj.com`

#### Dashboard 2: Conversion Health Monitor (PRIORITEIT 0)

**Doel**: Real-time monitoring van conversion drops

**Data Source**: GA4 Connector (real-time)

**Charts**:
1. **Scorecard Row** (vs. 7-day avg):
   - Today's Conversions (% change vs. avg)
   - Today's Conv. Rate (% change vs. avg)
   - Today's Package Views (% change vs. avg)

2. **Line Chart**: Conversions Last 30 Days
   - Daily conversions met 7-day moving average lijn
   - Alert threshold line bij -20% vs. avg

3. **Table**: Conversion Types Breakdown
   - Rows: contact, quote, availability
   - Columns: Today, Yesterday, 7-day avg, % Change

4. **Heatmap**: Hourly Conversion Pattern
   - X-as: Uur van dag (0-23)
   - Y-as: Dag van week
   - Color: Conversion count

**Alerts** (via GA4 Insights):
- Email naar `analytics-alerts@mr-dj.com`
- Slack webhook naar `#mr-dj-alerts`
- Trigger: >20% drop vs. 7-day average

---

### 8. Testing & Quality Assurance

#### 8.1 Bestaande Tests

**Cypress E2E Tests**: `tests/frontend/consent.cy.ts`

**Test Coverage**:
- ✅ Consent banner wordt getoond
- ✅ Marketing consent toggle werkt
- ✅ Facebook Pixel laadt alleen met consent
- ✅ Facebook Pixel script wordt verwijderd bij revoke
- ✅ `fbq('consent', 'revoke')` wordt aangeroepen
- ✅ Custom event `mr-dj:marketing-consent-change` wordt dispatched

**Test Command**:
```bash
npm run test:e2e -- consent.cy.ts
```

#### 8.2 QA Checklist voor Analytics

**GA4 Event Validation**:
- [ ] Open GA4 DebugView
- [ ] Navigeer door website
- [ ] Verifieer dat alle 11 events triggeren
- [ ] Check dat parameters correct populated zijn
- [ ] Verifieer timestamps in ISO format

**GTM Container Check**:
- [ ] Open GTM Preview mode
- [ ] Test alle major user flows
- [ ] Verifieer dat tags firen op correcte triggers
- [ ] Check voor duplicate fires

**PostHog Validation**:
- [ ] Open PostHog app
- [ ] Check live events stream
- [ ] Verifieer dat events aankomen
- [ ] Check session recordings werken

**Marketing Pixels Check**:
- [ ] Facebook Pixel Helper extension
- [ ] Verifieer pixel fires met consent
- [ ] Verifieer pixel niet fires zonder consent
- [ ] Check LinkedIn Insight Tag (LinkedIn helper)

**RUM Dashboard Check**:
- [ ] Open Looker Studio dashboard
- [ ] Verifieer data refreshes (max 4 uur oud)
- [ ] Check alle charts tonen data
- [ ] Test filters werken

#### 8.3 Synthetic Monitoring (TE IMPLEMENTEREN)

**Checkly Monitors** (aanbevolen):

1. **GTM Container Load**
   - URL: `https://mr-dj.nl`
   - Check: `window.dataLayer` exists
   - Check: GTM container ID present
   - Frequency: Elke 5 minuten
   - Alert: Email + Slack

2. **GA4 Config Event**
   - URL: `https://mr-dj.nl`
   - Check: DataLayer bevat `config` event met GA4 ID
   - Frequency: Elke 5 minuten
   - Alert: Email + Slack

3. **PostHog Init**
   - URL: `https://mr-dj.nl`
   - Check: `window.posthog` exists
   - Check: Slechts 1 init log in console
   - Frequency: Elke 10 minuten
   - Alert: Email + Slack

**Implementation**:
```javascript
// Checkly script example
const assert = require('chai').assert;

// Check GTM loaded
const gtmLoaded = await page.evaluate(() => {
  return typeof window.dataLayer !== 'undefined';
});
assert.isTrue(gtmLoaded, 'GTM container loaded');

// Check GA4 config
const ga4Config = await page.evaluate(() => {
  return window.dataLayer.some(item =>
    item.event === 'config' && item[0].includes('G-')
  );
});
assert.isTrue(ga4Config, 'GA4 config event present');
```

---

### 9. Data Governance & Privacy

#### 9.1 GDPR/AVG Compliance

**Implementatie Status**: ✅ Compliant

**Consent Management**:
- ✅ Cookie banner geïmplementeerd
- ✅ Granular consent (Necessary/Analytics/Marketing)
- ✅ Consent stored in localStorage
- ✅ Consent revoke functionality werkt
- ✅ Marketing scripts alleen laden met consent

**Data Retention**:
- GA4: 14 maanden (standaard)
- PostHog: 1 jaar (configureerbaar)
- BigQuery: Indien ingeschakeld, custom retention

**Aanbeveling**: Documenteer data retention policy in privacy policy

#### 9.2 PII (Personally Identifiable Information)

**Huidige Praktijk**: ✅ Geen PII in analytics events

**Verboden Data**:
- ❌ Email adressen
- ❌ Telefoonnummers
- ❌ Volledige namen
- ❌ Postcodes

**Toegestane Data**:
- ✅ Stad/regio (Nederland/Eindhoven)
- ✅ Event type (bruiloft/corporate/feest)
- ✅ Package interesse (brons/zilver/goud)
- ✅ Anonymized IDs

**Audit Script** (aanbevolen):
```javascript
// Check DataLayer events voor PII
const hasPII = (str) => {
  const emailRegex = /@/;
  const phoneRegex = /\d{10,}/;
  return emailRegex.test(str) || phoneRegex.test(str);
};

window.dataLayer.forEach((item, index) => {
  const json = JSON.stringify(item);
  if (hasPII(json)) {
    console.error(`PII detected in dataLayer[${index}]:`, item);
  }
});
```

#### 9.3 Data Access & Security

**Access Control**:
- GA4: Beperkte toegang via Google Groups
- PostHog: Role-based access control
- Looker Studio: View/Edit permissions per dashboard

**Aanbevolen Rollen**:
- **Admin**: Full access (1-2 personen)
- **Analyst**: Read + Explore access (analytics team)
- **Viewer**: Dashboard-only access (management)

---

### 10. KPI's & Success Metrics

#### 10.1 Tracking Health KPI's

**Data Quality Metrics**:
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Event Success Rate | >99% | ✅ Te meten | TBD |
| Missing Parameters | <1% | ✅ Te meten | TBD |
| Consent Opt-in Rate | >60% | ✅ Te meten | TBD |
| Tag Load Time | <500ms | ✅ Te meten | TBD |

**Implementatie KPI's**:
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| P0 Dashboards Live | 2/2 | 0/2 | ⚠️ To Do |
| Automated Alerts | >3 | 2 | ⚠️ Need more |
| Synthetic Monitors | >3 | 0 | ⚠️ To Do |
| CRM Integration | ✅ | ❌ | ⚠️ To Do |

#### 10.2 Business Impact KPI's

**Conversie Metrics** (uit GA4):
| Metric | Baseline | 3-Month Target | Status |
|--------|----------|----------------|--------|
| Conversion Rate | TBD | +15% | 📊 Track |
| Lead Quality | TBD | +20% | 📊 Track |
| Package Mix (Zilver) | TBD | >50% | 📊 Track |
| Avg. Package Value | TBD | €1,400+ | 📊 Track |

**Marketing Efficiency**:
| Metric | Baseline | 3-Month Target | Status |
|--------|----------|----------------|--------|
| Cost per Lead | TBD | -20% | 📊 Track |
| ROAS (Return on Ad Spend) | TBD | 5:1+ | 📊 Track |
| Organic Traffic | TBD | +40% | 📊 Track |
| Paid Traffic Conv. Rate | TBD | >3% | 📊 Track |

---

### 11. Implementatie Roadmap

#### Sprint 1 (Deze Sprint) - Prioriteit 0

**Week 1-2**:
1. ✅ Audit huidige analytics implementation (DONE)
2. 🔄 Bouw Marketing Source Dashboard in Looker Studio
3. 🔄 Configureer Conversion Health Alerts in GA4 Insights
4. 🔄 Test en valideer alle 11 GA4 events in productie
5. 🔄 Documenteer dashboard URLs en access

**Deliverables**:
- [ ] Marketing Source Dashboard live
- [ ] Conversion Health Alerts actief
- [ ] QA checklist doorlopen en gedocumenteerd
- [ ] Dashboard access gedocumenteerd

#### Sprint 2 (Volgende Sprint) - Prioriteit 1

**Week 3-4**:
1. Bouw Revenue & Package Mix Dashboard
2. Start CRM integration discovery (data sharing)
3. Implementeer Consent Compliance Monitor
4. Zet Checkly synthetic monitors op

**Deliverables**:
- [ ] Revenue dashboard live
- [ ] CRM integration plan gedocumenteerd
- [ ] Consent monitor live
- [ ] 3+ synthetic monitors actief

#### Sprint 3-4 (Over 1-2 maanden) - Prioriteit 2

**Week 5-8**:
1. Voltooien CRM integration
2. Content Engagement Deep Dive dashboard
3. Executive KPI Overview dashboard
4. Enable BigQuery export (optioneel)

**Deliverables**:
- [ ] CRM data in GA4 dashboards
- [ ] Content engagement insights beschikbaar
- [ ] Executive dashboard live
- [ ] BigQuery export (indien gewenst)

#### Ongoing - Prioriteit 3

**Continu**:
1. Weekly dashboard reviews
2. Monthly data quality audits
3. Quarterly KPI reporting
4. Ad-hoc exploratory analysis

---

### 12. Acceptatie Criteria

**Analytics Foundation** (✅ Behaald):
- [x] GA4 property geconfigureerd en events firen
- [x] GTM container actief
- [x] 11+ custom events geïmplementeerd
- [x] DataLayer correct gestructureerd
- [x] Event timestamps consistent (ISO format)

**Marketing Integratie** (✅ Behaald):
- [x] PostHog geïntegreerd
- [x] Meta Pixel geïmplementeerd
- [x] LinkedIn Pixel geïmplementeerd
- [x] Google Ads conversion tracking
- [x] Consent framework werkend

**Compliance** (✅ Behaald):
- [x] GDPR-compliant consent management
- [x] Geen PII in analytics events
- [x] Cypress tests voor consent lifecycle

**Dashboards & Alerts** (⚠️ In Progress):
- [ ] Marketing Source Dashboard live (SPRINT 1)
- [ ] Conversion Health Alerts actief (SPRINT 1)
- [ ] Revenue Dashboard live (SPRINT 2)
- [ ] CRM integration complete (SPRINT 3)

**Monitoring** (⚠️ Te Doen):
- [ ] Synthetic monitors voor GTM/GA4 (SPRINT 2)
- [ ] Data quality watchlist (SPRINT 3)
- [ ] Automated reporting distribution (SPRINT 4)

---

### 13. Veelgestelde Vragen (FAQ)

**Q: Waarom zowel GA4 als PostHog?**
A: GA4 voor marketing attribution en standard web analytics. PostHog voor product analytics, feature flags, session recordings en A/B testing. Ze complementeren elkaar.

**Q: Hoe weten we of events correct firen?**
A: Gebruik GA4 DebugView in real-time, Cypress E2E tests pre-deployment, en synthetic monitors (Checkly) in productie.

**Q: Wat gebeurt er als gebruiker geen consent geeft?**
A: Alleen necessary analytics (basis GA4) blijft actief. Alle marketing pixels (Meta, LinkedIn, Google Ads) worden niet geladen.

**Q: Hoe lang duurt het om dashboards te zien?**
A: GA4 data is binnen 24-48 uur beschikbaar in standard reports. Real-time data is direct zichtbaar in DebugView. Looker Studio refreshes elke 4 uur.

**Q: Kunnen we historische data analyseren?**
A: Ja, GA4 bewaart 14 maanden. Voor langere retention, enable BigQuery export (onbeperkt, met costs).

**Q: Hoe integreren we CRM data?**
A: Via Measurement Protocol API (server-side events) of Data Import functie in GA4. Vereist client_id matching tussen systemen.

---

## ENGLISH (EN)

### 1. Executive Summary

**Current Status**: Mr. DJ has implemented a **modern and comprehensive analytics stack** that complies with GDPR requirements and enables full conversion tracking.

**Core Components**:
- ✅ **Google Analytics 4 (GA4)**: Complete event tracking with 11+ custom events
- ✅ **Google Tag Manager (GTM)**: Container management for tags
- ✅ **PostHog**: Product analytics and feature flag management
- ✅ **Marketing Pixels**: Meta (Facebook), LinkedIn, Google Ads
- ✅ **Consent Framework**: GDPR-compliant consent management
- ✅ **Real User Monitoring (RUM)**: Core Web Vitals tracking

**Impact**:
- 📊 Complete visibility over customer journey
- 🎯 Data-driven optimization possible
- 📈 Marketing ROI trackable
- ✅ GDPR compliant

---

### 2. Analytics Stack Overview

#### 2.1 Google Analytics 4 (GA4)

**Implementation**: `frontend/public/assets/js/modules/analytics.js`

**Event Tracking** (11 implemented events):

1. **page_view**
   - Automatically triggered on every page navigation
   - Parameters: `page_location`, `page_title`, `event_timestamp`
   - Use: Traffic analysis, bounce rates, user flow

2. **availability_check_started**
   - Trigger: User starts availability check
   - Parameters: Custom detail object
   - Use: Measure interest in booking

3. **availability_check_success**
   - Trigger: Availability check completed successfully
   - Parameters: Custom detail object
   - Use: Track conversion funnel

4. **lead_submitted**
   - Trigger: Contact form submitted
   - Parameters: Form details
   - Use: **Primary conversion event**

5. **package_view**
   - Trigger: User views package details
   - Parameters: `package_name`, `package_price`
   - Use: Product interest tracking

6. **package_cta_click**
   - Trigger: CTA click on package page
   - Parameters: `cta_location`, `package_name`
   - Use: CTA effectiveness

7. **pricing_brochure_download**
   - Trigger: Download pricing brochure
   - Parameters: Document type
   - Use: Content engagement

8. **persona_focus**
   - Trigger: User selects persona (Wedding/Corporate/Party)
   - Parameters: `persona_type`
   - Use: Audience segmentation

9. **testimonial_impression**
   - Trigger: Testimonial visible in viewport
   - Parameters: `testimonial_id`
   - Use: Social proof effectiveness

10. **testimonial_cta_click**
    - Trigger: Click on CTA near testimonial
    - Parameters: `testimonial_id`, `cta_action`
    - Use: Social proof conversion

11. **consent_update**
    - Trigger: User changes consent preferences
    - Parameters: `consent_type`, `granted`
    - Use: GDPR compliance monitoring

**DataLayer Structure**:
```javascript
window.dataLayer.push({
  event: 'event_name',
  event_timestamp: '2025-12-03T17:00:00.000Z',
  // Event-specific parameters
  package_name: 'Zilver',
  package_price: 1350,
  cta_location: 'hero-section'
});
```

#### 2.2 Marketing Integrations

**Runtime Configuration**: `docs/analytics/marketing-runtime-config.md`

**Environment Variables**:

| Variable | Purpose | Fallback |
|----------|---------|----------|
| `VITE_POSTHOG_API_KEY` | PostHog product analytics | No init if empty |
| `VITE_POSTHOG_API_HOST` | PostHog endpoint override | `https://app.posthog.com` |
| `VITE_META_PIXEL_ID` | Facebook retargeting | `null` → no pixel |
| `VITE_GOOGLE_TAG_ID` | GTM/GA4 container ID | `null` → no tag |
| `VITE_LINKEDIN_PIXEL_ID` | LinkedIn Insight Tag | `null` → no pixel |
| `VITE_GOOGLE_ADS_CONVERSION_ID` | Google Ads conversions | No init, console warning |

**Marketing Platforms**:

1. **PostHog**
   - **Purpose**: Product analytics, feature flags, session recording
   - **Initialization**: Only with valid API key
   - **Events**: All GA4 events also sent to PostHog
   - **Use Case**: A/B testing, funnel analysis, user behavior

2. **Meta Pixel (Facebook)**
   - **Purpose**: Facebook/Instagram retargeting
   - **Consent**: Only active with marketing consent
   - **Events**: PageView, Lead, ViewContent
   - **Use Case**: Facebook Ads remarketing campaigns

3. **LinkedIn Insight Tag**
   - **Purpose**: LinkedIn Ads retargeting
   - **Consent**: Only active with marketing consent
   - **Events**: PageView, conversion events
   - **Use Case**: B2B corporate event retargeting

4. **Google Ads Conversion**
   - **Purpose**: YouTube retargeting, Google Ads tracking
   - **Events**: Conversion tracking for ad campaigns
   - **Use Case**: Google Ads ROI measurement

#### 2.3 GDPR Consent Framework

**Implementation**: `docs/marketing-consent-tracking.md`

**Consent Categories**:
- **Necessary**: Always active (analytics.js core)
- **Analytics**: GA4 tracking (opt-in)
- **Marketing**: All retargeting pixels (opt-in)

**Consent Lifecycle**:
```javascript
// 1. User grants marketing consent
→ Facebook Pixel script loads
→ LinkedIn Pixel script loads
→ Event: 'mr-dj:marketing-consent-change' (granted: true)

// 2. User revokes consent
→ fbq('consent', 'revoke') is called
→ Script nodes are removed
→ Event: 'mr-dj:marketing-consent-change' (granted: false)
```

**Custom Event**:
```javascript
window.addEventListener('mr-dj:marketing-consent-change', (event) => {
  console.log('Marketing consent:', event.detail.granted);
  // Integrations can react to this
});
```

**Cypress Testing**:
- Automated tests in `tests/frontend/consent.cy.ts`
- Verifies Facebook Pixel lifecycle
- Verifies consent event propagation
- Ensures GDPR compliance

---

### 3. Real User Monitoring (RUM)

**Documentation**: `docs/analytics/ga4-rum-dashboards.md`

#### 3.1 Custom Dimensions

**Defined in GA4**:

| Name | Parameter | Description |
|------|-----------|-------------|
| Page Group | `page_group` | Logical grouping (Home, Pricing, Contact) |
| Region | `region` | Geographic region (GeoIP or user selection) |

**GTM Variables**:
```javascript
// Page Group
window.mrdj.pageGroup || 'unknown'

// Region
window.mrdj.region || {{GeoIP Country}}
```

#### 3.2 Core Web Vitals Tracking

**Metrics**:
- **LCP** (Largest Contentful Paint): Target <2.5s
- **FID** (First Input Delay): Target <100ms
- **CLS** (Cumulative Layout Shift): Target <0.1

**Data Collection**:
- Automatic via GA4 Enhanced Measurement
- Custom parameters: `page_group`, `region`, `device_category`
- BigQuery export for long-term analysis

#### 3.3 Looker Studio Dashboard

**Charts**:
1. **Scorecard**: Average LCP per page group
2. **Time series**: CLS over time per region
3. **Table**: Page group vs. Avg. TTFB (descending)
4. **Heatmap**: Device category vs. Page group (avg session duration)

**Filters**:
- Page Group dropdown
- Region selector
- Device Category filter

**Access**: `mr-dj-analytics@mr-dj.com` (edit access)

#### 3.4 Alerting

**Configured Alerts**:
1. **LCP Alert**
   - Trigger: Avg. LCP > 2.5s for any page group (24 hours)
   - Destination: `analytics-alerts@mr-dj.com` + Slack `#mr-dj-alerts`

2. **CLS Alert**
   - Trigger: Avg. CLS > 0.25 for EU users
   - Destination: Email + Slack

**Alert Configuration**: GA4 → Reports → Insights & Recommendations

---

### 4. Dashboard & Reporting Backlog

**Documentation**: `docs/ga4-dashboard-backlog.md`

#### 4.1 Existing Assets (✅ Available)

**Audience Segments**:
- Converted Users
- Form Submitters
- Phone Clickers
- Pricing Package Interest
- High Intent Users

**Custom Explorations**:
- Conversions by Variant (A/B test results)
- Package Performance Analysis
- Conversion Funnel Analysis
- Event Type Performance

**Standard Report Collection**:
- Acquisition reports
- Engagement reports
- Events & Conversions
- Pages & Screens
- Dedicated "Conversion Tracking" collection

#### 4.2 Prioritized Backlog

**Priority 0 (Critical - Implement Now)**:

| Task | Description | Owner |
|------|-------------|-------|
| **Channel & Campaign Performance Dashboard** | GA4 Exploration or Looker Studio report with acquisition metrics + conversion breakdown per traffic source | Analytics |
| **Conversion Health Alert Automation** | Automated alerts for conversion drops vs. 7-day average | Analytics |

**Priority 1 (High - Next Sprint)**:

| Task | Description | Dependencies |
|------|-------------|--------------|
| **Revenue & Package Mix Dashboard** | Join GA4 events with package_price for revenue estimate, AOV, package mix trends | `package_price` parameter |
| **Lead Quality Pipeline Reporting** | Integrate CRM/booking data with GA4 for lead progression tracking | CRM export/API |
| **Consent Compliance Monitor** | Dashboard for consent banner interactions and data collection impact | Consent events in GTM |

**Priority 2 (Medium)**:

- Content Engagement Deep Dive (scroll depth, outbound clicks)
- Executive KPI Overview (high-level dashboard for leadership)

**Priority 3 (Low)**:

- Automated Reporting Distribution (weekly email/Slack summaries)
- Data Quality Watchlist (automated checks for missing parameters)

---

### 5. Implementation Status & Gaps

#### 5.1 ✅ What Works Well

**Analytics Foundation**:
- ✅ GA4 fully configured with 11+ events
- ✅ GTM container active and working
- ✅ PostHog integrated for product analytics
- ✅ Marketing pixels (Meta, LinkedIn, Google Ads)
- ✅ GDPR-compliant consent management
- ✅ Core Web Vitals tracking via RUM
- ✅ Cypress tests for consent framework

**Data Quality**:
- ✅ Event timestamps consistent (ISO format)
- ✅ Custom parameters well-structured
- ✅ DataLayer implementation correct

#### 5.2 ⚠️ Gaps & Recommendations

**Missing Dashboards** (Priority 0):
- ⚠️ **Marketing Source Dashboard**: Not yet built
  - **Action**: Build Looker Studio dashboard with acquisition + conversion data
  - **Timeline**: This sprint
  - **Owner**: Analytics team

- ⚠️ **Conversion Health Alerts**: Not yet automated
  - **Action**: Configure GA4 Insights alerts for conversion drops
  - **Timeline**: This sprint
  - **Owner**: Analytics team

**Missing Integrations** (Priority 1):
- ⚠️ **CRM Integration**: GA4 not linked to CRM/booking data
  - **Action**: Set up data sharing with CRM system
  - **Timeline**: Next sprint
  - **Owner**: Analytics + Sales

- ⚠️ **Revenue Tracking**: `package_price` parameter must be consistently populated
  - **Action**: Audit all package_view events, ensure price data
  - **Timeline**: This sprint
  - **Owner**: Frontend dev

**Testing & Monitoring**:
- ⚠️ **Synthetic Monitoring**: No automated healthchecks for tag loading
  - **Action**: Implement Checkly monitors for GTM/GA4/PostHog
  - **Timeline**: Next sprint
  - **Owner**: DevOps

- ⚠️ **BigQuery Export**: Optional but recommended for long-term analysis
  - **Action**: Enable BigQuery linking in GA4
  - **Timeline**: In 2 sprints
  - **Owner**: Analytics + Data Engineering

---

### 6. GA4 Event Specifications

**Detailed Event Schema** (for developers):

#### Event: `lead_submitted` (Primary Conversion)
```javascript
window.dataLayer.push({
  event: 'lead_submitted',
  event_timestamp: new Date().toISOString(),
  form_type: 'contact', // or 'quote', 'availability'
  persona_type: 'bruiloft', // or 'corporate', 'feest'
  package_interest: 'zilver', // or 'brons', 'goud', 'unknown'
  event_date: '2025-06-15', // date of event
  event_location: 'Eindhoven',
  lead_source: 'organic', // or 'paid', 'referral'
  page_group: 'contact'
});
```

#### Event: `package_cta_click`
```javascript
window.dataLayer.push({
  event: 'package_cta_click',
  event_timestamp: new Date().toISOString(),
  package_name: 'zilver',
  package_price: 1350,
  cta_location: 'hero-section', // or 'comparison-table', 'pricing-card'
  cta_text: 'Kies Zilver',
  page_group: 'pricing'
});
```

#### Event: `persona_focus`
```javascript
window.dataLayer.push({
  event: 'persona_focus',
  event_timestamp: new Date().toISOString(),
  persona_type: 'bruiloft', // or 'corporate', 'feest'
  focus_method: 'interactive-selector', // or 'navigation-click'
  previous_persona: 'unknown',
  page_group: 'home'
});
```

---

### 7. Looker Studio Dashboard Specifications

#### Dashboard 1: Marketing Source Effectiveness (PRIORITY 0)

**Goal**: Attribute conversions and package interest per traffic channel

**Data Source**: GA4 Connector

**Charts**:
1. **Scorecard Row**:
   - Total Sessions
   - Total Conversions (lead_submitted)
   - Conversion Rate %
   - Avg. Package Interest Value (estimated revenue)

2. **Time Series**:
   - X-axis: Date (day/week/month filter)
   - Y-axis: Conversions
   - Breakdown: Traffic Source (Organic, Paid, Direct, Referral)

3. **Table**: Source/Medium vs. Conversions
   - Columns: Source/Medium, Sessions, Conversions, Conv. Rate, Avg. Session Duration
   - Sort: Conversions DESC

4. **Bar Chart**: Campaign Performance
   - X-axis: Campaign name
   - Y-axis: Conversions
   - Filter: Paid traffic only

5. **Funnel Viz**:
   - Step 1: Session Start
   - Step 2: package_view
   - Step 3: package_cta_click
   - Step 4: lead_submitted

**Filters**:
- Date Range picker
- Traffic Source dropdown
- Campaign filter
- Device Category

**Refresh**: Every 4 hours

**Access**: `mr-dj-analytics@mr-dj.com`

#### Dashboard 2: Conversion Health Monitor (PRIORITY 0)

**Goal**: Real-time monitoring of conversion drops

**Data Source**: GA4 Connector (real-time)

**Charts**:
1. **Scorecard Row** (vs. 7-day avg):
   - Today's Conversions (% change vs. avg)
   - Today's Conv. Rate (% change vs. avg)
   - Today's Package Views (% change vs. avg)

2. **Line Chart**: Conversions Last 30 Days
   - Daily conversions with 7-day moving average line
   - Alert threshold line at -20% vs. avg

3. **Table**: Conversion Types Breakdown
   - Rows: contact, quote, availability
   - Columns: Today, Yesterday, 7-day avg, % Change

4. **Heatmap**: Hourly Conversion Pattern
   - X-axis: Hour of day (0-23)
   - Y-axis: Day of week
   - Color: Conversion count

**Alerts** (via GA4 Insights):
- Email to `analytics-alerts@mr-dj.com`
- Slack webhook to `#mr-dj-alerts`
- Trigger: >20% drop vs. 7-day average

---

### 8. Testing & Quality Assurance

#### 8.1 Existing Tests

**Cypress E2E Tests**: `tests/frontend/consent.cy.ts`

**Test Coverage**:
- ✅ Consent banner is shown
- ✅ Marketing consent toggle works
- ✅ Facebook Pixel loads only with consent
- ✅ Facebook Pixel script is removed on revoke
- ✅ `fbq('consent', 'revoke')` is called
- ✅ Custom event `mr-dj:marketing-consent-change` is dispatched

**Test Command**:
```bash
npm run test:e2e -- consent.cy.ts
```

#### 8.2 QA Checklist for Analytics

**GA4 Event Validation**:
- [ ] Open GA4 DebugView
- [ ] Navigate through website
- [ ] Verify all 11 events trigger
- [ ] Check parameters are correctly populated
- [ ] Verify timestamps in ISO format

**GTM Container Check**:
- [ ] Open GTM Preview mode
- [ ] Test all major user flows
- [ ] Verify tags fire on correct triggers
- [ ] Check for duplicate fires

**PostHog Validation**:
- [ ] Open PostHog app
- [ ] Check live events stream
- [ ] Verify events arrive
- [ ] Check session recordings work

**Marketing Pixels Check**:
- [ ] Facebook Pixel Helper extension
- [ ] Verify pixel fires with consent
- [ ] Verify pixel doesn't fire without consent
- [ ] Check LinkedIn Insight Tag (LinkedIn helper)

**RUM Dashboard Check**:
- [ ] Open Looker Studio dashboard
- [ ] Verify data refreshes (max 4 hours old)
- [ ] Check all charts show data
- [ ] Test filters work

#### 8.3 Synthetic Monitoring (TO IMPLEMENT)

**Checkly Monitors** (recommended):

1. **GTM Container Load**
   - URL: `https://mr-dj.nl`
   - Check: `window.dataLayer` exists
   - Check: GTM container ID present
   - Frequency: Every 5 minutes
   - Alert: Email + Slack

2. **GA4 Config Event**
   - URL: `https://mr-dj.nl`
   - Check: DataLayer contains `config` event with GA4 ID
   - Frequency: Every 5 minutes
   - Alert: Email + Slack

3. **PostHog Init**
   - URL: `https://mr-dj.nl`
   - Check: `window.posthog` exists
   - Check: Only 1 init log in console
   - Frequency: Every 10 minutes
   - Alert: Email + Slack

**Implementation**:
```javascript
// Checkly script example
const assert = require('chai').assert;

// Check GTM loaded
const gtmLoaded = await page.evaluate(() => {
  return typeof window.dataLayer !== 'undefined';
});
assert.isTrue(gtmLoaded, 'GTM container loaded');

// Check GA4 config
const ga4Config = await page.evaluate(() => {
  return window.dataLayer.some(item =>
    item.event === 'config' && item[0].includes('G-')
  );
});
assert.isTrue(ga4Config, 'GA4 config event present');
```

---

### 9. Data Governance & Privacy

#### 9.1 GDPR Compliance

**Implementation Status**: ✅ Compliant

**Consent Management**:
- ✅ Cookie banner implemented
- ✅ Granular consent (Necessary/Analytics/Marketing)
- ✅ Consent stored in localStorage
- ✅ Consent revoke functionality works
- ✅ Marketing scripts only load with consent

**Data Retention**:
- GA4: 14 months (default)
- PostHog: 1 year (configurable)
- BigQuery: If enabled, custom retention

**Recommendation**: Document data retention policy in privacy policy

#### 9.2 PII (Personally Identifiable Information)

**Current Practice**: ✅ No PII in analytics events

**Forbidden Data**:
- ❌ Email addresses
- ❌ Phone numbers
- ❌ Full names
- ❌ Postal codes

**Allowed Data**:
- ✅ City/region (Netherlands/Eindhoven)
- ✅ Event type (wedding/corporate/party)
- ✅ Package interest (bronze/silver/gold)
- ✅ Anonymized IDs

**Audit Script** (recommended):
```javascript
// Check DataLayer events for PII
const hasPII = (str) => {
  const emailRegex = /@/;
  const phoneRegex = /\d{10,}/;
  return emailRegex.test(str) || phoneRegex.test(str);
};

window.dataLayer.forEach((item, index) => {
  const json = JSON.stringify(item);
  if (hasPII(json)) {
    console.error(`PII detected in dataLayer[${index}]:`, item);
  }
});
```

#### 9.3 Data Access & Security

**Access Control**:
- GA4: Limited access via Google Groups
- PostHog: Role-based access control
- Looker Studio: View/Edit permissions per dashboard

**Recommended Roles**:
- **Admin**: Full access (1-2 people)
- **Analyst**: Read + Explore access (analytics team)
- **Viewer**: Dashboard-only access (management)

---

### 10. KPIs & Success Metrics

#### 10.1 Tracking Health KPIs

**Data Quality Metrics**:
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Event Success Rate | >99% | ✅ To measure | TBD |
| Missing Parameters | <1% | ✅ To measure | TBD |
| Consent Opt-in Rate | >60% | ✅ To measure | TBD |
| Tag Load Time | <500ms | ✅ To measure | TBD |

**Implementation KPIs**:
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| P0 Dashboards Live | 2/2 | 0/2 | ⚠️ To Do |
| Automated Alerts | >3 | 2 | ⚠️ Need more |
| Synthetic Monitors | >3 | 0 | ⚠️ To Do |
| CRM Integration | ✅ | ❌ | ⚠️ To Do |

#### 10.2 Business Impact KPIs

**Conversion Metrics** (from GA4):
| Metric | Baseline | 3-Month Target | Status |
|--------|----------|----------------|--------|
| Conversion Rate | TBD | +15% | 📊 Track |
| Lead Quality | TBD | +20% | 📊 Track |
| Package Mix (Silver) | TBD | >50% | 📊 Track |
| Avg. Package Value | TBD | €1,400+ | 📊 Track |

**Marketing Efficiency**:
| Metric | Baseline | 3-Month Target | Status |
|--------|----------|----------------|--------|
| Cost per Lead | TBD | -20% | 📊 Track |
| ROAS (Return on Ad Spend) | TBD | 5:1+ | 📊 Track |
| Organic Traffic | TBD | +40% | 📊 Track |
| Paid Traffic Conv. Rate | TBD | >3% | 📊 Track |

---

### 11. Implementation Roadmap

#### Sprint 1 (This Sprint) - Priority 0

**Week 1-2**:
1. ✅ Audit current analytics implementation (DONE)
2. 🔄 Build Marketing Source Dashboard in Looker Studio
3. 🔄 Configure Conversion Health Alerts in GA4 Insights
4. 🔄 Test and validate all 11 GA4 events in production
5. 🔄 Document dashboard URLs and access

**Deliverables**:
- [ ] Marketing Source Dashboard live
- [ ] Conversion Health Alerts active
- [ ] QA checklist completed and documented
- [ ] Dashboard access documented

#### Sprint 2 (Next Sprint) - Priority 1

**Week 3-4**:
1. Build Revenue & Package Mix Dashboard
2. Start CRM integration discovery (data sharing)
3. Implement Consent Compliance Monitor
4. Set up Checkly synthetic monitors

**Deliverables**:
- [ ] Revenue dashboard live
- [ ] CRM integration plan documented
- [ ] Consent monitor live
- [ ] 3+ synthetic monitors active

#### Sprint 3-4 (In 1-2 months) - Priority 2

**Week 5-8**:
1. Complete CRM integration
2. Content Engagement Deep Dive dashboard
3. Executive KPI Overview dashboard
4. Enable BigQuery export (optional)

**Deliverables**:
- [ ] CRM data in GA4 dashboards
- [ ] Content engagement insights available
- [ ] Executive dashboard live
- [ ] BigQuery export (if desired)

#### Ongoing - Priority 3

**Continuous**:
1. Weekly dashboard reviews
2. Monthly data quality audits
3. Quarterly KPI reporting
4. Ad-hoc exploratory analysis

---

### 12. Acceptance Criteria

**Analytics Foundation** (✅ Achieved):
- [x] GA4 property configured and events firing
- [x] GTM container active
- [x] 11+ custom events implemented
- [x] DataLayer correctly structured
- [x] Event timestamps consistent (ISO format)

**Marketing Integration** (✅ Achieved):
- [x] PostHog integrated
- [x] Meta Pixel implemented
- [x] LinkedIn Pixel implemented
- [x] Google Ads conversion tracking
- [x] Consent framework working

**Compliance** (✅ Achieved):
- [x] GDPR-compliant consent management
- [x] No PII in analytics events
- [x] Cypress tests for consent lifecycle

**Dashboards & Alerts** (⚠️ In Progress):
- [ ] Marketing Source Dashboard live (SPRINT 1)
- [ ] Conversion Health Alerts active (SPRINT 1)
- [ ] Revenue Dashboard live (SPRINT 2)
- [ ] CRM integration complete (SPRINT 3)

**Monitoring** (⚠️ To Do):
- [ ] Synthetic monitors for GTM/GA4 (SPRINT 2)
- [ ] Data quality watchlist (SPRINT 3)
- [ ] Automated reporting distribution (SPRINT 4)

---

### 13. Frequently Asked Questions (FAQ)

**Q: Why both GA4 and PostHog?**
A: GA4 for marketing attribution and standard web analytics. PostHog for product analytics, feature flags, session recordings, and A/B testing. They complement each other.

**Q: How do we know if events fire correctly?**
A: Use GA4 DebugView in real-time, Cypress E2E tests pre-deployment, and synthetic monitors (Checkly) in production.

**Q: What happens if user doesn't give consent?**
A: Only necessary analytics (basic GA4) remains active. All marketing pixels (Meta, LinkedIn, Google Ads) are not loaded.

**Q: How long until we see dashboards?**
A: GA4 data is available within 24-48 hours in standard reports. Real-time data is immediately visible in DebugView. Looker Studio refreshes every 4 hours.

**Q: Can we analyze historical data?**
A: Yes, GA4 retains 14 months. For longer retention, enable BigQuery export (unlimited, with costs).

**Q: How do we integrate CRM data?**
A: Via Measurement Protocol API (server-side events) or Data Import function in GA4. Requires client_id matching between systems.

---

**Einde / End of B11 Bilingual Report**
