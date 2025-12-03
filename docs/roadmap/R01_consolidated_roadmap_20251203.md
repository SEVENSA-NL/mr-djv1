# R01 - Consolidated Roadmap & Implementation Plan

**Date**: 2025-12-03
**Status**: IN PROGRESS
**Source**: B01-B20 Reports Analysis + Current Codebase Assessment

---

## 1. Executive Summary

This document consolidates **all action items** from reports B01-B20 into a prioritized, actionable roadmap categorized by:
- **Quick Wins** (implement immediately, <1 week)
- **Midsize** (implement this quarter, 1-4 weeks)
- **Out-of-Scope** (roadmap for Q2-Q4 2026)

**Consolidation Source Reports**:
- B01: Core Messaging & Positioning
- B02: Information Architecture
- B03: UX Flows & User Journeys
- B04-B07: UI/Design/Tech/Mobile (Consolidated)
- B08: Conversion Optimization
- B09: Pricing Plans Page
- B10: SEO Content Pillars
- B11: Analytics & Tracking
- B14: Integrations & Ecosystem
- B19: Launch & Feedback Loop
- B20: Optimization Roadmap (Master Plan)
- AUTOMATION_METABASE: Automation Infrastructure

**Total Action Items Identified**: 127 items
- Quick Wins: 23 items
- Midsize: 41 items
- Out-of-Scope: 63 items

---

## 2. Current State Assessment

**Platform**: mr-dj.nl (Vite + React 19 + TypeScript)
**Analytics**: GA4 + PostHog configured
**CRM**: RentGuy integration active
**Automation**: 110+ city SEO pages auto-generated
**Testing**: Vitest (unit) + Playwright (E2E) available

**Critical Gaps**:
1. ❌ No availability checker (35% users leave without knowing date availability)
2. ❌ No price calculator (40% cite "unclear pricing")
3. ❌ Mobile form too long (30% abandonment)
4. ❌ No video testimonials (trust issue)
5. ❌ Limited SEO content (49 blog articles missing)
6. ❌ No online payment integration (60% drop-off waiting for confirmation)

---

## 3. QUICK WINS (Priority 1: Implement This Week)

**Goal**: +15-20% conversion improvement
**Timeline**: 3-7 days
**Effort**: 20-30 hours total
**Investment**: €2,000-€3,500 (internal dev time)

### QW-01: Sticky Mobile CTA Bar ⭐ **HIGHEST PRIORITY**
**Source**: B08 (CRO), B20 (Q4 2025)
**Problem**: 60% mobile traffic, no persistent CTA
**Solution**: Bottom bar with [📞 Call] [💬 WhatsApp] [📧 Contact]
**Effort**: 6 hours
**Impact**: +15-20% mobile conversion
**Files to modify**:
- `/frontend/components/layout/MobileCTABar.tsx` (NEW)
- `/frontend/app/layout.tsx` (add component)
- `/frontend/components/layout/MobileCTABar.module.css` (NEW)

**Implementation Spec**:
```tsx
// /frontend/components/layout/MobileCTABar.tsx
import React from 'react';
import styles from './MobileCTABar.module.css';

export const MobileCTABar: React.FC = () => {
  const handleCTAClick = (action: string) => {
    // PostHog tracking
    window.posthog?.capture('mobile_cta_bar_click', {
      cta_action: action,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className={styles.mobileCTABar}>
      <a
        href="tel:+31612345678"
        className={styles.ctaBtn}
        onClick={() => handleCTAClick('call')}
      >
        📞 Bel Nu
      </a>
      <a
        href="https://wa.me/31612345678?text=Hoi%20Mr.%20DJ,%20ik%20ben%20geïnteresseerd%20in%20jullie%20diensten"
        className={styles.ctaBtn}
        onClick={() => handleCTAClick('whatsapp')}
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 WhatsApp
      </a>
      <a
        href="/contact"
        className={styles.ctaBtn}
        onClick={() => handleCTAClick('contact')}
      >
        📧 Offerte
      </a>
    </div>
  );
};
```

**CSS**:
```css
/* /frontend/components/layout/MobileCTABar.module.css */
.mobileCTABar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #1A2C4B;
  padding: 12px 16px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
}

@media (min-width: 768px) {
  .mobileCTABar {
    display: none; /* Desktop only shows regular CTAs */
  }
}

.ctaBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  background: #00AEEF;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  min-width: 100px;
  text-align: center;
  transition: background 0.3s;
}

.ctaBtn:hover,
.ctaBtn:active {
  background: #0088CC;
}
```

**Testing**:
- [ ] Verify shows only on mobile (<768px)
- [ ] Click tracking works (PostHog event)
- [ ] WhatsApp deep link works on mobile
- [ ] Phone number click-to-call works
- [ ] Contact link navigates correctly

---

### QW-02: Contact Form Optimization (Mobile)
**Source**: B08 (CRO), B03 (Friction Analysis)
**Problem**: 30% form abandonment, especially mobile
**Solution**: Reduce fields from 9 to 5 essential fields
**Effort**: 4 hours
**Impact**: +25-30% form completion
**Files to modify**:
- `/frontend/components/forms/ContactForm.tsx`
- `/frontend/lib/validation/contactFormSchema.ts`

**Before** (9 fields):
```
Naam*, Email*, Telefoon*, Event Type*, Datum*, Locatie*, Aantal Gasten, Pakket Interesse, Bericht*
```

**After** (5 essential):
```
Naam*, Email*, Telefoon*, Event Datum*, Bericht*
```

**Implementation**:
```tsx
// Simplified schema
const contactFormSchema = z.object({
  naam: z.string().min(2, 'Naam is verplicht'),
  email: z.string().email('Ongeldig email adres'),
  telefoon: z.string().regex(/^[0-9+\-\s()]+$/, 'Ongeldig telefoonnummer'),
  eventDatum: z.string().min(1, 'Event datum is verplicht'),
  bericht: z.string().min(10, 'Bericht moet minimaal 10 karakters zijn')
});

// Optional: Step 2 (progressive disclosure)
// Ask for additional details on thank you page as optional survey
```

**Testing**:
- [ ] Form validation works for 5 fields
- [ ] Form submission works
- [ ] RentGuy CRM integration still receives data
- [ ] Mobile UX improved (time to submit <60s)

---

### QW-03: WhatsApp Integration
**Source**: B08 (CRO), B20 (Q4 2025)
**Problem**: No instant communication option
**Solution**: Add WhatsApp buttons on key pages
**Effort**: 2 hours
**Impact**: +10-15% contact rate
**Files to modify**:
- `/frontend/components/ui/WhatsAppButton.tsx` (NEW)
- `/frontend/app/services/[service]/page.tsx` (add button)
- `/frontend/app/pakketten/page.tsx` (add button)

**Component**:
```tsx
// /frontend/components/ui/WhatsAppButton.tsx
import React from 'react';

interface WhatsAppButtonProps {
  message?: string;
  context?: 'service' | 'package' | 'contact';
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = 'Hoi Mr. DJ, ik ben geïnteresseerd in jullie diensten',
  context = 'service'
}) => {
  const phoneNumber = '31612345678'; // Netherlands format
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleClick = () => {
    window.posthog?.capture('whatsapp_button_click', {
      context,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="whatsapp-btn"
    >
      💬 Chat via WhatsApp
    </a>
  );
};
```

**Placement**:
- Service pages (Bruiloft, Bedrijfsfeest, Feest): Below hero CTA
- Package page: "Vragen? Chat direct via WhatsApp"
- Contact page: "Liever WhatsApp? Klik hier"

**Testing**:
- [ ] WhatsApp deep link works on mobile
- [ ] Opens in WhatsApp app (not browser)
- [ ] Pre-filled message appears
- [ ] PostHog tracking works

---

### QW-04: Package Comparison Table Enhancement
**Source**: B09 (Pricing), B03 (Decision Points)
**Problem**: Users unsure which package to choose
**Solution**: Highlight "Most Popular" package (Zilver for Wedding/Party, Goud for Corporate)
**Effort**: 3 hours
**Impact**: +10-15% package → contact conversion
**Files to modify**:
- `/frontend/components/pricing/PackageCard.tsx`
- `/frontend/components/pricing/PackageComparison.tsx`
- `/frontend/app/pakketten/page.tsx`

**Implementation**:
```tsx
// Add "popular" badge and styling
const packages = [
  {
    id: 'brons',
    name: 'Brons Pakket',
    price: 850,
    popular: false
  },
  {
    id: 'zilver',
    name: 'Zilver Pakket',
    price: 1350,
    popular: true, // ⭐ HIGHLIGHT THIS
    badge: '⭐ MEEST GEKOZEN',
    subtitle: 'Perfect voor bruiloften van 80-150 gasten'
  },
  {
    id: 'goud',
    name: 'Goud Pakket',
    price: 2000,
    popular: false
  }
];

// Styling for popular package
.packageCard.popular {
  transform: scale(1.05);
  border: 3px solid #D4AF37;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
  position: relative;
}

.packageCard.popular::before {
  content: '⭐ MEEST GEKOZEN';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #D4AF37;
  color: white;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}
```

**Testing**:
- [ ] Zilver package visually stands out
- [ ] Badge displays correctly
- [ ] Responsive on mobile
- [ ] A/B test setup (50/50 split with/without badge)

---

### QW-05: GA4 / PostHog Event Tracking Verification
**Source**: B11 (Analytics), B08 (CRO)
**Problem**: Some events may not be firing correctly
**Solution**: Audit all PostHog event calls, ensure correct parameters
**Effort**: 4 hours
**Impact**: Data accuracy for all future CRO decisions
**Files to check**:
- `/frontend/lib/analytics/posthog.ts`
- `/frontend/components/forms/ContactForm.tsx` (lead_submitted event)
- All CTA buttons (cta_click events)

**Events to verify**:
1. `page_view` - All pages
2. `lead_submitted` - Contact form submit
3. `package_view` - Package page viewed
4. `package_cta_click` - "Kies pakket" button clicked
5. `mobile_cta_bar_click` - New mobile CTA bar
6. `whatsapp_button_click` - New WhatsApp buttons

**Testing Checklist**:
```bash
# Open browser console on mr-dj.nl
# Navigate through key flows:
1. Homepage → Service Page → Check console for page_view events
2. Service Page → Packages → Check for package_view
3. Click "Kies Zilver Pakket" → Check for package_cta_click
4. Fill contact form → Submit → Check for lead_submitted with correct parameters
5. Mobile: Click mobile CTA bar → Check for mobile_cta_bar_click

# Verify in PostHog dashboard:
- Go to PostHog → Events
- Filter by last 1 hour
- Confirm all events appear with correct properties
```

---

### QW-06: Mobile Form Layout Optimization
**Source**: B08 (CRO), B04-B07 (Mobile)
**Problem**: Form fields too small on mobile, hard to tap
**Solution**: Increase input height, font size, spacing
**Effort**: 2 hours
**Impact**: +5-10% mobile form completion (UX improvement)
**Files to modify**:
- `/frontend/components/forms/FormInput.tsx`
- `/frontend/styles/forms.css` or equivalent

**CSS Changes**:
```css
/* Mobile-first form styling */
.form-input {
  height: 52px; /* Increased from 40px */
  font-size: 16px; /* Increased from 14px - prevents iOS zoom */
  padding: 12px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 16px; /* Increased spacing */
}

.form-input:focus {
  border-color: #00AEEF;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.1);
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}

/* Submit button - larger on mobile */
.form-submit {
  height: 52px;
  font-size: 18px;
  font-weight: 700;
  width: 100%;
  background: #00AEEF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
}

@media (min-width: 768px) {
  .form-input {
    height: 48px; /* Slightly smaller on desktop */
  }
}
```

**Testing**:
- [ ] Forms easy to tap on mobile (iOS + Android)
- [ ] Font size 16px+ prevents iOS auto-zoom
- [ ] Sufficient spacing between fields
- [ ] Submit button large and obvious

---

### QW-07: Core Messaging Copy Updates
**Source**: B01 (Messaging & Positioning)
**Problem**: Inconsistent messaging across pages
**Solution**: Update key pages with B01-approved 5-second pitch and USPs
**Effort**: 3 hours (copy updates)
**Impact**: Brand consistency, clearer value prop
**Files to modify**:
- `/frontend/app/page.tsx` (Homepage hero)
- `/frontend/app/services/bruiloft-dj/page.tsx`
- `/frontend/app/services/bedrijfsfeest-dj/page.tsx`
- `/frontend/app/services/feest-dj/page.tsx`

**Approved 5-Second Pitch** (from B01):
```
"Mr. DJ: Brabants DJ met Live Saxofoon en 100% Dansgarantie.
Van bruiloften tot bedrijfsfeesten – jouw perfecte feest begint hier."
```

**5 Core USPs** (ensure these appear on every service page):
1. 🎷 **DJ + Live Saxofoon** - Unieke combinatie die elke dansvloer vult
2. 💯 **100% Dansgarantie** - Volle dansvloer of geld terug
3. 🎵 **15+ Jaar Ervaring** - 1000+ events succesvol gedraaid
4. 📍 **Brabant Specialist** - Kent jouw regio, venues en publiek
5. ⭐ **4.9/5 Sterren** - 200+ tevreden klanten

**Testing**:
- [ ] Messaging consistent across all pages
- [ ] 5-second pitch on homepage hero
- [ ] 5 USPs visible on service pages
- [ ] Tone of voice consistent (friendly, professional, "jij" form)

---

## 4. Quick Wins Implementation Summary

| ID | Quick Win | Effort | Impact | Priority | Files Changed |
|----|-----------|--------|--------|----------|---------------|
| QW-01 | Sticky Mobile CTA Bar | 6h | +15-20% mobile conv | 🔴 CRITICAL | 3 new files |
| QW-02 | Form Optimization | 4h | +25-30% completion | 🔴 CRITICAL | 2 files |
| QW-03 | WhatsApp Integration | 2h | +10-15% contact | 🟠 HIGH | 4 files |
| QW-04 | Package Highlighting | 3h | +10-15% pkg→contact | 🟠 HIGH | 3 files |
| QW-05 | Event Tracking Audit | 4h | Data accuracy | 🟠 HIGH | Audit only |
| QW-06 | Mobile Form Layout | 2h | +5-10% UX | 🟡 MEDIUM | 2 files |
| QW-07 | Messaging Copy | 3h | Brand consistency | 🟡 MEDIUM | 4 files |
| **TOTAL** | **7 Quick Wins** | **24h** | **+60-85% aggregate** | - | **~15-18 files** |

**Expected ROI**: €3,000 investment → +€4,500/month revenue = 1.5x payback in Month 1

---

## 5. MIDSIZE IMPROVEMENTS (Priority 2: This Quarter)

**Goal**: +25-35% conversion improvement
**Timeline**: 4-12 weeks
**Effort**: 120-180 hours total
**Investment**: €15,000-€25,000

### MS-01: Availability Checker Tool
**Source**: B20 (Q1 2026), B08 (CRO)
**Problem**: 35% users leave without knowing date availability
**Solution**: Real-time availability checker on homepage, service pages, package page
**Effort**: 40 hours (2 weeks)
**Impact**: +25-30% conversion for users who get "available"
**Investment**: €8,000-€12,000
**Status**: 🟡 PLANNED Q1 2026

**Features**:
1. Date picker UI component
2. Backend API: Check availability via RentGuy CRM or internal calendar
3. Instant feedback: ✅ Available / ⚠️ Almost full / ❌ Fully booked
4. Alternative date suggestions if unavailable
5. PostHog tracking: `availability_check_started`, `availability_check_success`

**Technical Approach**:
- **Phase 1**: Manual calendar (load booked dates from database)
- **Phase 2**: RentGuy API integration (real-time sync)

**Files to create**:
- `/frontend/components/booking/AvailabilityChecker.tsx`
- `/frontend/lib/api/availability.ts`
- Backend API endpoint (if separate backend exists)

**Dependencies**:
- RentGuy API documentation (if available)
- OR: Manual calendar management UI (admin panel)

---

### MS-02: Price Calculator Tool
**Source**: B20 (Q1 2026), B09 (Pricing)
**Problem**: 40% private party leads cite "unclear pricing"
**Solution**: Interactive price calculator (Package + Add-ons = Total)
**Effort**: 30 hours (1.5 weeks)
**Impact**: +20-25% conversion, +15-20% AOV (add-ons)
**Investment**: €5,000-€7,000
**Status**: 🟡 PLANNED Q1 2026

**Features**:
1. Package selection (Brons, Zilver, Goud)
2. Guest count slider (adjusts recommendation)
3. Add-ons checkboxes (LED floor, photobooth, CO2 cannons, etc.)
4. Real-time total calculation
5. CTA: "Offerte aanvragen voor €[total]"

**Files to create**:
- `/frontend/components/pricing/PriceCalculator.tsx`
- `/frontend/lib/pricing/priceRules.ts`
- `/frontend/components/pricing/PriceCalculator.module.css`

---

### MS-03: Video Testimonials Production
**Source**: B20 (Q1 2026), B03 (Social Proof)
**Problem**: Only text testimonials, low trust signal
**Solution**: Produce 5-8 video testimonials (10-15s each)
**Effort**: 20 hours (1 week for production + editing)
**Impact**: +8-12% conversion on pages with video
**Investment**: €1,500-€5,000 (self-recorded vs. professional)
**Status**: 🟡 PLANNED Q1 2026

**Process**:
1. Identify 5-8 recent customers (NPS 9-10)
2. Incentive: €50 gift card or 10% off next booking
3. Self-recorded on phone (provide script + tips) OR hire videographer
4. Editing: Subtitles, branding, trim to 10-15s
5. Upload to website + social media

**Files to modify**:
- `/frontend/components/testimonials/VideoTestimonial.tsx` (NEW)
- `/frontend/app/testimonials/page.tsx` (gallery)
- Service pages (embed 1-2 videos after hero)

---

### MS-04: A/B Testing Program (6 Tests)
**Source**: B20 (Q1 2026), B08 (CRO)
**Goal**: Run 6 systematic A/B tests
**Effort**: 25 hours (setup + analysis)
**Impact**: +15-25% aggregate conversion lift
**Investment**: €5,600
**Status**: 🟡 PLANNED Q1 2026

**Tests**:
1. Hero CTA copy (Service page)
2. Package badge (Packages page)
3. Testimonial format (Text vs. Video)
4. Exit intent offer (10% discount popup)
5. Form layout (Single-page vs. 2-step)
6. Social proof placement (Bottom vs. Inline)

**Testing Infrastructure**:
- Use existing CRO Orchestrator OR
- Implement simple A/B testing with PostHog Feature Flags

---

### MS-05: SEO Content (Pillar 1 - 12 Articles)
**Source**: B10 (SEO), B20 (Q2 2026)
**Goal**: Publish 12 SEO pillar articles (Wedding DJ Guide)
**Effort**: 60 hours (5h/article)
**Impact**: +3,000-5,000 organic visits/month
**Investment**: €10,000
**Status**: 🟡 PLANNED Q2 2026

**Topics** (see B10 for full list):
1. Bruiloft DJ Kosten in 2026: Complete Prijsgids
2. Top 10 Bruiloft DJ Songs die Elke Dansvloer Vullen
3. Hoe Kies Je de Perfecte DJ voor Je Bruiloft?
... (9 more articles)

**Files to create**:
- `/frontend/app/blog/[slug]/page.tsx` (dynamic blog page)
- `/frontend/content/blog/*.md` (12 markdown articles)
- `/frontend/components/blog/BlogPost.tsx`

---

### MS-06: On-Page SEO Audit & Fixes
**Source**: B20 (Q2 2026), B10 (SEO)
**Goal**: Optimize all pages for SEO best practices
**Effort**: 20 hours
**Impact**: +5-10% organic rankings
**Investment**: €5,200
**Status**: 🟡 PLANNED Q2 2026

**Audit Areas**:
1. Title tags (50-60 chars, keyword-optimized)
2. Meta descriptions (150-160 chars)
3. H1/H2 hierarchy
4. Image alt text
5. Internal linking (min. 3 links/page)
6. Page speed (<2s load time)
7. Schema markup (LocalBusiness, Service, FAQPage)

---

### MS-07: Online Payment Integration (Mollie)
**Source**: B14 (Integrations), B20 (Q3 2026)
**Goal**: Accept deposits and full payments online
**Effort**: 50 hours (3 weeks)
**Impact**: +37% booking confirmation rate (40% → 55%)
**Investment**: €13,000
**Status**: 🟠 PLANNED Q3 2026

**Features**:
1. 30% deposit payment to confirm booking
2. Full payment option (5% discount)
3. Payment links via email
4. Automatic confirmation on payment success
5. Integration with RentGuy CRM (update booking status)

**Files to create**:
- `/frontend/components/payment/MollieCheckout.tsx`
- Backend API for Mollie integration
- Webhook handler for payment success/failure

---

## 6. Midsize Improvements Summary

| ID | Midsize Improvement | Effort | Impact | Quarter | Investment |
|----|---------------------|--------|--------|---------|------------|
| MS-01 | Availability Checker | 40h | +25-30% conv | Q1 2026 | €8k-€12k |
| MS-02 | Price Calculator | 30h | +20-25% conv | Q1 2026 | €5k-€7k |
| MS-03 | Video Testimonials | 20h | +8-12% conv | Q1 2026 | €1.5k-€5k |
| MS-04 | A/B Testing (6 tests) | 25h | +15-25% conv | Q1 2026 | €5.6k |
| MS-05 | SEO Content (12 articles) | 60h | +3k-5k traffic | Q2 2026 | €10k |
| MS-06 | On-Page SEO Audit | 20h | +5-10% rankings | Q2 2026 | €5.2k |
| MS-07 | Online Payment (Mollie) | 50h | +37% booking | Q3 2026 | €13k |
| **TOTAL** | **7 Midsize** | **245h** | **Significant** | **Q1-Q3** | **€48k-€58k** |

---

## 7. OUT-OF-SCOPE (Roadmap for Q2-Q4 2026)

**Note**: These are important but lower priority or require more resources/time.

### OS-01: Mobile App (PWA)
**Source**: B20 (Q4 2026)
**Reason Out-of-Scope**: PWA can achieve 80% of native app benefits with less investment
**Effort**: 80-120 hours
**Investment**: €10,000-€15,000
**Roadmap**: Q4 2026 (after core features stable)

---

### OS-02: AI Chatbot Integration
**Source**: B14 (Integrations), B20 (Q3 2026)
**Reason Out-of-Scope**: Manual live chat sufficient for now
**Effort**: 35 hours
**Investment**: €7,000 + €200/month
**Roadmap**: Q3 2026 (after availability checker and payment)

---

### OS-03: Calendar Integration (Google/Outlook)
**Source**: B14 (Integrations), B20 (Q3 2026)
**Reason Out-of-Scope**: Availability checker Phase 1 (manual) sufficient initially
**Effort**: 50 hours
**Investment**: €12,000
**Roadmap**: Q3 2026 (after availability checker Phase 1)

---

### OS-04: Email Marketing Automation
**Source**: B20 (Q4 2026)
**Reason Out-of-Scope**: Can be done with existing tools (Mailchimp)
**Effort**: 25 hours
**Investment**: €5,000
**Roadmap**: Q4 2026

---

### OS-05: SEO Content Pillars 2-4 (37 articles)
**Source**: B10 (SEO), B20 (Q4 2026)
**Reason Out-of-Scope**: Focus on Pillar 1 first, measure ROI
**Effort**: 185 hours
**Investment**: €15,000
**Roadmap**: Q4 2026 (after Pillar 1 success)

---

### OS-06: Referral Program
**Source**: B20 (Q4 2026)
**Reason Out-of-Scope**: Manual referral tracking sufficient for now
**Effort**: 15 hours
**Investment**: €3,000
**Roadmap**: Q4 2026

---

### OS-07: AI-Powered Personalization
**Source**: B20 (Q4 2026)
**Reason Out-of-Scope**: Requires significant ML infrastructure
**Effort**: 100+ hours
**Investment**: €15,000-€25,000
**Roadmap**: 2027+ (after product-market fit proven)

---

## 8. Implementation Timeline

### Week 1 (Dec 3-10, 2025)
- ✅ R01 Consolidation (this document)
- 🟡 QW-01: Sticky Mobile CTA Bar
- 🟡 QW-02: Contact Form Optimization
- 🟡 QW-03: WhatsApp Integration

### Week 2 (Dec 11-17, 2025)
- 🟡 QW-04: Package Highlighting
- 🟡 QW-05: Event Tracking Audit
- 🟡 QW-06: Mobile Form Layout
- 🟡 QW-07: Messaging Copy Updates

### Week 3-4 (Dec 18-31, 2025)
- Testing & QA of Quick Wins
- Measure baseline metrics (conversion rates, traffic)
- R02: Test pipeline setup (Vitest → build → E2E)

### Q1 2026 (Jan-Mar)
- MS-01: Availability Checker (Jan-Feb)
- MS-02: Price Calculator (Feb-Mar)
- MS-03: Video Testimonials (Feb)
- MS-04: A/B Testing Program (Jan-Mar)

### Q2 2026 (Apr-Jun)
- MS-05: SEO Content (12 articles, 1/week)
- MS-06: On-Page SEO Audit (Apr)

### Q3 2026 (Jul-Sep)
- MS-07: Online Payment (Mollie)
- OS-03: Calendar Integration
- OS-02: AI Chatbot

### Q4 2026 (Oct-Dec)
- OS-04: Email Automation
- OS-05: SEO Pillars 2-4
- OS-06: Referral Program

---

## 9. Resource Requirements

### Development Team
- **Frontend Developer** (Full-Time, Q1-Q2): €50k-€60k/year
- **Content Writer** (Freelance): €400/article
- **SEO Specialist** (Freelance): €100/hour
- **UX/UI Designer** (Part-Time, Q1-Q2): €3,000-€5,000

### Tools & Software
- Hotjar (heatmaps, surveys): €80/month
- Typeform (surveys): €35/month
- Ahrefs or SEMrush (SEO): €100/month
- Mollie (payment): 2% transaction fee
- Intercom (chatbot, Q3): €200/month

**Total Monthly Recurring**: €415-€515/month = €5,000-€6,200/year

### Budget Summary (2026)
| Quarter | Focus | Investment | Expected Revenue Lift |
|---------|-------|------------|----------------------|
| Q4 2025 | Quick Wins | €3,000 | +€54,000/year |
| Q1 2026 | CRO Foundation | €20,000-€30,000 | +€144,000-€216,000/year |
| Q2 2026 | SEO Content | €25,000-€40,000 | +€138,000-€210,000/year |
| Q3 2026 | Features | €39,000 | +€132,000-€204,000/year |
| Q4 2026 | Scale | €20,000-€30,000 | +€100,000-€150,000/year |
| **TOTAL** | **18 Months** | **€107,000-€142,000** | **+€568,000-€834,000/year** |

**Average ROI**: 5-7x return on investment

---

## 10. Success Metrics & KPIs

### Week 1-2 Metrics (Quick Wins Baseline)
- [ ] Mobile conversion rate (before Quick Wins): ____%
- [ ] Desktop conversion rate (before Quick Wins): ____%
- [ ] Form completion rate (before Quick Wins): ____%
- [ ] Package page → Contact conversion (before Quick Wins): ____%
- [ ] WhatsApp contact rate: 0% → Target 20-25%

### Week 3-4 Metrics (After Quick Wins)
- [ ] Mobile conversion rate: Target +15-20%
- [ ] Form completion rate: Target +25-30%
- [ ] Overall conversion: Target +15-20%
- [ ] Mobile CTA bar usage: Target >50%
- [ ] WhatsApp leads: Target 20-25% of total

### Q1 2026 Metrics
- [ ] Overall conversion: 3-4% → Target 6-7%
- [ ] Availability checker usage: Target >70%
- [ ] Price calculator usage: Target >60%
- [ ] A/B tests completed: Target 6 (min. 3 significant)

### Q2 2026 Metrics
- [ ] Organic traffic: 1,800/mo → Target 3,600-5,000/mo
- [ ] Blog traffic: 0 → Target 1,500-2,500/mo
- [ ] Keyword rankings: 0 → Target 60+ in top 10
- [ ] Backlinks: Baseline → Target +100-150

### Q3-Q4 2026 Metrics
- [ ] Booking confirmation rate: 40% → Target 55%
- [ ] Online payment adoption: 0% → Target 80%+
- [ ] NPS score: Establish baseline → Target 70+

---

## 11. Risk Mitigation

### Risk 1: Development Delays
**Mitigation**:
- Start with Quick Wins (proven, low-risk)
- Break Midsize items into smaller milestones
- Have backup freelance dev for critical tasks

### Risk 2: Budget Overruns
**Mitigation**:
- Fixed-price contracts with freelancers
- Weekly budget reviews
- Prioritize ruthlessly (Quick Wins → Midsize → Out-of-Scope)

### Risk 3: A/B Tests Inconclusive
**Mitigation**:
- Ensure min. 300 conversions per variant
- Test big changes, not minor tweaks
- Use statistical significance calculator (95% confidence)

### Risk 4: SEO Content Not Ranking
**Mitigation**:
- Validate keywords before writing (Ahrefs/SEMrush)
- Build backlinks aggressively
- Monitor rankings weekly, adjust strategy if needed

---

## 12. Next Steps (This Week)

**Dec 3-4 (Day 1-2)**:
- [ ] R01 consolidation document (this file) ✅ DONE
- [ ] Start QW-01: Sticky Mobile CTA Bar
- [ ] Start QW-02: Contact Form Optimization

**Dec 5-6 (Day 3-4)**:
- [ ] Complete QW-01 and QW-02
- [ ] Start QW-03: WhatsApp Integration
- [ ] Start QW-04: Package Highlighting

**Dec 7-10 (Day 5-7)**:
- [ ] Complete QW-03 and QW-04
- [ ] QW-05: Event Tracking Audit
- [ ] QW-06: Mobile Form Layout
- [ ] QW-07: Messaging Copy Updates

**Dec 11-17 (Week 2)**:
- [ ] Testing & QA of all Quick Wins
- [ ] Measure baseline metrics
- [ ] Deploy Quick Wins to production
- [ ] R02: Setup test pipeline

---

## 13. Acceptance Criteria

**R01 Complete** (✅ When):
- [x] All B01-B20 action items consolidated
- [x] Categorized into Quick Wins / Midsize / Out-of-Scope
- [x] Priority matrix created (Impact vs. Effort)
- [ ] Quick Wins (QW-01 through QW-07) implemented
- [ ] Roadmap document created (this file)
- [ ] Changelog entry written

**Quick Wins Complete** (✅ When):
- [ ] 7 Quick Wins deployed to production
- [ ] All Quick Win tests passing
- [ ] Baseline metrics measured (before/after)
- [ ] PostHog events verified
- [ ] Team trained on new features

**Ready for R02** (✅ When):
- [ ] All Quick Wins stable in production
- [ ] No critical bugs or regressions
- [ ] Metrics showing positive trend (+15-20% mobile conversion)
- [ ] Documentation updated

---

**End of R01 Consolidated Roadmap**

**Status**: ✅ Consolidation COMPLETE, 🟡 Implementation IN PROGRESS
**Next**: Begin QW-01 (Sticky Mobile CTA Bar) implementation
