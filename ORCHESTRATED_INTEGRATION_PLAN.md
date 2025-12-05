# Orchestrated Integration Plan - Path A
**Coordinator:** Claude Sonnet 4.5
**Execution Model:** 10-20 parallel agents
**Timeline:** 2-4 dagen (met coördinatie)

---

## 🎯 Discovery: Existing Boilerplate

### ✅ Components Al Gebouwd (3,304 lines)

| Component | Status | Lines | Location |
|-----------|--------|-------|----------|
| MobileCTABar | ✅ Complete | 114 | `/frontend/components/MobileCTABar.tsx` |
| AvailabilityChecker | ✅ Complete | 230 | `/frontend/components/booking/AvailabilityChecker.tsx` |
| AvailabilityChecker (alt) | ⚠️ Duplicate | 322 | `/AvailabilityChecker.jsx` (root) |
| PriceCalculator | ✅ Complete | ~200 | `/frontend/components/pricing/PriceCalculator.tsx` |
| VideoTestimonials | ✅ Complete | ~180 | `/frontend/components/VideoTestimonials.tsx` |
| WhatsAppButton | ✅ Complete | ~80 | `/frontend/components/WhatsAppButton.tsx` |
| ContactForm | ✅ Complete | ~150 | `/frontend/components/forms/ContactForm.tsx` |
| HowItWorks | ✅ Complete | ~120 | `/frontend/components/HowItWorks.tsx` |
| ComprehensiveFAQ | ✅ Complete | ~200 | `/frontend/components/ComprehensiveFAQ.tsx` |
| EventGallery | ✅ Complete | ~150 | `/frontend/components/EventGallery.tsx` |
| Breadcrumbs | ✅ Complete | ~80 | `/frontend/components/Breadcrumbs.tsx` |

**Total bestaande code:** 3,304+ lines
**Herbruikbaarheid:** ~70% van gedocumenteerde features al gebouwd!

---

## 📋 Integration Tasks (10 Agents)

### Agent 1: App Integration Lead
**Task:** Integreer MobileCTABar in App.tsx
**Input:**
- Lees: `/frontend/src/App.tsx`
- Lees: `/frontend/components/MobileCTABar.tsx`
- Check: Vite/React vs Next.js incompatibiliteit

**Output:**
1. Update App.tsx met import
2. Add component to layout
3. Test mobile viewport (<768px)
4. Verify PostHog tracking

**Estimated tokens:** 30k input + 10k output = 40k total
**Cost:** $0.24

---

### Agent 2: Availability Integration
**Task:** Integreer AvailabilityChecker component
**Input:**
- Lees beide versies (root + frontend/components)
- Kies beste implementatie
- Check API endpoint `/availability/check`

**Output:**
1. Delete duplicate (root version)
2. Import in App.tsx of dedicated route
3. Wire up API client
4. Test date selection + submission

**Estimated tokens:** 50k input + 15k output = 65k total
**Cost:** $0.38

---

### Agent 3: Pricing Integration
**Task:** Integreer PriceCalculator
**Input:**
- Lees: `/frontend/components/pricing/PriceCalculator.tsx`
- Check: Package data source

**Output:**
1. Import in /pakketten route
2. Wire up pricing data
3. Test calculations
4. Verify CTAs

**Estimated tokens:** 35k input + 12k output = 47k total
**Cost:** $0.29

---

### Agent 4: Video Testimonials
**Task:** Integreer VideoTestimonials
**Input:**
- Lees: `/frontend/components/VideoTestimonials.tsx`
- Check: Video asset paths (`/assets/videos/`)

**Output:**
1. Import in service pages
2. Verify video files exist
3. Test playback + tracking
4. Add fallback for missing videos

**Estimated tokens:** 40k input + 12k output = 52k total
**Cost:** $0.30

---

### Agent 5: WhatsApp & CTA Consolidation
**Task:** Unify WhatsApp button usage
**Input:**
- Check all WhatsAppButton instances
- Standardize props interface

**Output:**
1. Create consistent WhatsAppButton API
2. Replace all hardcoded WhatsApp links
3. Add tracking to all instances

**Estimated tokens:** 25k input + 8k output = 33k total
**Cost:** $0.20

---

### Agent 6: Contact Form Optimization
**Task:** Apply QW-02 optimizations
**Input:**
- Lees: Current form implementation
- Apply: 9 fields → 5 fields reduction
- Add: Mobile optimizations (52px height, 16px font)

**Output:**
1. Simplify form fields
2. Update validation schema
3. Mobile-optimized styles
4. Test submission

**Estimated tokens:** 30k input + 10k output = 40k total
**Cost:** $0.24

---

### Agent 7: Package Comparison Enhancement
**Task:** Add "MEEST GEKOZEN" badge
**Input:**
- Lees: Package display components
- Apply: QW-04 specifications

**Output:**
1. Add badge to Silver package
2. Visual emphasis (scale, border)
3. Update copy
4. A/B test setup

**Estimated tokens:** 20k input + 8k output = 28k total
**Cost:** $0.17

---

### Agent 8: Route Creation
**Task:** Create missing routes
**Input:**
- List required routes from docs
- Check existing routing structure

**Output:**
1. `/beschikbaarheid` - AvailabilityChecker page
2. `/prijzen` - PriceCalculator page
3. `/over-ons` - About page
4. Update navigation

**Estimated tokens:** 25k input + 10k output = 35k total
**Cost:** $0.22

---

### Agent 9: Asset Verification
**Task:** Verify 40 AI images + videos
**Input:**
- Check: `/assets/marketing-images/`
- Check: `/assets/videos/`
- Verify: WebP format, compression

**Output:**
1. List missing assets
2. Verify symlinks work
3. Test image loading
4. Create fallbacks

**Estimated tokens:** 15k input + 5k output = 20k total
**Cost:** $0.12

---

### Agent 10: Analytics Integration
**Task:** Complete PostHog event tracking
**Input:**
- Audit all component tracking
- Check event naming consistency

**Output:**
1. Standardize event names
2. Add missing tracking
3. Test in PostHog dashboard
4. Document events

**Estimated tokens:** 30k input + 10k output = 40k total
**Cost:** $0.24

---

## 🧪 Testing Phase (5 Agents)

### Agent 11-12: Component Testing
**Task:** Write tests for integrated components
**Estimated tokens:** 40k each = 80k total
**Cost:** $0.48

### Agent 13-14: Integration Testing
**Task:** E2E tests for user flows
**Estimated tokens:** 50k each = 100k total
**Cost:** $0.60

### Agent 15: Mobile Testing
**Task:** Responsive + mobile-specific features
**Estimated tokens:** 30k total
**Cost:** $0.18

---

## 🐛 Bug Fix Phase (3 Agents)

### Agent 16-18: Bug Hunters
**Task:** Fix integration issues, build errors
**Estimated tokens:** 60k each = 180k total
**Cost:** $1.08

---

## 🚀 Deployment Phase (2 Agents)

### Agent 19: Build & Docker
**Task:** Create production build + Docker image
**Estimated tokens:** 40k total
**Cost:** $0.24

### Agent 20: Kubernetes Deployment
**Task:** Update manifests, deploy, verify
**Estimated tokens:** 35k total
**Cost:** $0.21

---

## 💰 Cost Estimate

### Token Usage Summary
| Phase | Agents | Total Tokens | Cost |
|-------|--------|--------------|------|
| **Integration** | 10 | 400,000 | $2.40 |
| **Testing** | 5 | 210,000 | $1.26 |
| **Bug Fixes** | 3 | 180,000 | $1.08 |
| **Deployment** | 2 | 75,000 | $0.45 |
| **Coordinator Overhead** | 1 | 100,000 | $0.60 |
| **Retries/Iterations** | - | 200,000 | $1.20 |
| **TOTAL** | 20 + orchestrator | **1,165,000** | **$6.99** |

### Pricing Model (Claude Sonnet 4.5)
- Input: $3 per 1M tokens
- Output: $15 per 1M tokens
- Avg ratio: 70% input, 30% output
- Effective rate: $6 per 1M tokens

**Totaal:** **~$7-10 aan API kosten**

---

## ⏱️ Timeline Estimate

### Day 1: Integration (8-10 uur)
- Morning: Agents 1-5 parallel
- Afternoon: Agents 6-10 parallel
- Evening: Coordinator review & merge

### Day 2: Testing (6-8 uur)
- Morning: Agents 11-15 parallel
- Afternoon: Bug reports collected
- Evening: Bug fix agents 16-18

### Day 3: Polish & Deploy (4-6 uur)
- Morning: Final bug fixes
- Afternoon: Build & deploy (agents 19-20)
- Evening: Production verification

**Total:** 18-24 working hours over 3 dagen

---

## 🎯 Success Metrics

1. ✅ All 10 documented features visible on website
2. ✅ Zero build errors
3. ✅ All tests green
4. ✅ Mobile responsive
5. ✅ PostHog tracking verified
6. ✅ Zero 404s
7. ✅ Lighthouse score >90

---

## 🚨 Risk Mitigation

### High Risk Items
1. **Vite vs Next.js conflicts** - Some components use `"use client"`
   - **Mitigation:** Convert or remove directives

2. **API endpoint mismatch** - Components expect endpoints that may not exist
   - **Mitigation:** Verify backend routes first

3. **Asset path issues** - Symlinks may break in Docker
   - **Mitigation:** Copy assets instead of symlink

4. **PostHog key propagation** - Already fixed today
   - **Status:** ✅ Resolved

### Medium Risk Items
1. **Mobile viewport testing** - Need real device testing
2. **Video playback** - Browser compatibility
3. **Date picker UX** - Cross-browser issues

---

## 📊 ROI Calculation (Post-Integration)

### If Documentation Claims True
- Investment: €24,500 (agents + development)
- Expected lift: €468k-€694k/year
- ROI: 19.1x - 28.3x

### Realistic Adjusted
- Actual investment: €50 (API costs) + time
- Expected lift: Test with real traffic
- Conversion improvement: +15-30% realistic

**First month KPIs to track:**
- Bounce rate: Target <45%
- Form completion: Target +20%
- Mobile conversion: Target +15%
- WhatsApp clicks: Track baseline → growth

---

## 🎬 Execution Command

```bash
# Start orchestrated integration
claude-code orchestrate \
  --plan ORCHESTRATED_INTEGRATION_PLAN.md \
  --agents 20 \
  --coordinator sonnet-4.5 \
  --parallel-limit 5 \
  --budget-limit $15
```

**Ready to execute?** Type "start integration" to begin.
