# 🚀 Next.js Migration Implementation Plan
## Mister DJ - Vite/React to Next.js App Router Migration

**Status**: Month 1 Complete ✅
**Created**: 2025-12-05
**Timeline**: 4 months (Phased approach)
**Total Effort**: 154 hours (~20 working days)

---

## 📊 Month 1: COMPLETED ✅

### Tasks Completed
- [x] Generated dynamic sitemap.xml with 17 URLs (4 core + 3 service + 10 city pages)
- [x] Integrated sitemap generation into Vite build process
- [x] Deployed updated frontend to production
- [x] Submitted sitemap to Google and Bing
- [x] Baseline metrics collection ready

### Results
- **Sitemap live**: https://mr-dj.sevensa.nl/sitemap.xml
- **URLs indexed**: 17 pages
- **Build time**: 2.85s
- **Bundle size**: 414KB (gzipped: 137KB)
- **PWA**: Enabled with 65 precached entries

---

## 📅 Month 2: Foundation & Core Components (Weeks 5-8)

### Week 5: Project Setup & Foundation (12h)
**Goal**: Set up Next.js project structure with essential configuration

#### Tasks:
1. **Initialize Next.js Project** (2h)
   ```bash
   cd /srv/apps/mr-djv1/frontend
   npx create-next-app@latest nextjs-migration --typescript --tailwind --app
   ```
   - Use App Router
   - Configure TypeScript
   - Set up Tailwind CSS

2. **Configure i18n Routing** (4h)
   - Install: `npm install next-intl`
   - Create `/app/[locale]` layout
   - Configure supported languages (nl, en)
   - Set up translation loading
   - Files to create:
     - `middleware.ts` - Locale detection
     - `app/[locale]/layout.tsx` - Root layout with i18n
     - `messages/nl.json`, `messages/en.json`

3. **Set up Analytics** (3h)
   - Install PostHog: `npm install posthog-js`
   - Configure Google Analytics 4
   - Create analytics provider component
   - Files:
     - `lib/analytics/posthog.ts`
     - `lib/analytics/ga4.ts`
     - `components/AnalyticsProvider.tsx`

4. **Environment Configuration** (1h)
   - Create `.env.local` with all required variables
   - Configure API endpoints
   - Set up backend integration URLs

5. **Testing Framework** (2h)
   - Install Vitest for unit tests
   - Configure Playwright for E2E
   - Create test utilities
   - Files:
     - `vitest.config.ts`
     - `playwright.config.ts`
     - `lib/test-utils.tsx`

**Deliverables**:
- ✅ Next.js app runs locally with i18n
- ✅ Analytics tracking functional
- ✅ Test framework ready

---

### Week 6: Core Components Migration (17h)
**Goal**: Migrate essential UI components to Next.js

#### Tasks:
1. **Shared Component Setup** (2h)
   - Copy `/frontend/components/` to Next.js project
   - Update imports for Next.js compatibility
   - Test components in Storybook

2. **Hero Section** (2h)
   - Migrate `/src/components/HeroSection.tsx`
   - Convert to Server Component where possible
   - Add image optimization with `next/image`
   - File: `app/[locale]/components/HeroSection.tsx`

3. **Testimonials Component** (2h)
   - Migrate `/src/components/Testimonials.tsx`
   - Add skeleton loading state
   - Optimize images
   - File: `components/Testimonials.tsx`

4. **PricingTables Component** (3h)
   - Migrate `/src/components/PricingTables.tsx`
   - Make pricing data server-fetched
   - Add comparison toggles
   - File: `components/pricing/PricingTables.tsx`

5. **BookingSummary Component** (2h)
   - Migrate `/src/components/BookingSummary.tsx`
   - Connect to booking state
   - File: `components/booking/BookingSummary.tsx`

6. **EventTypeSelector** (2h)
   - Migrate `/src/components/booking/EventTypeSelector.tsx`
   - Add server-side event type fetching
   - File: `components/booking/EventTypeSelector.tsx`

7. **LanguageSwitcher** (1h)
   - Migrate language switcher for next-intl
   - Use Next.js routing for locale changes
   - File: `components/LanguageSwitcher.tsx`

8. **Adapt Shared Components** (3h)
   - Update 10 shared components for Next.js
   - Fix import paths
   - Test in development

**Deliverables**:
- ✅ All core components working in Next.js
- ✅ Components tested with unit tests
- ✅ Storybook stories updated

---

### Week 7-8: Booking Flow (21h)
**Goal**: Migrate complex booking flow with multi-step forms

#### Tasks:
1. **QuickBookingForm** (4h)
   - Migrate `/src/components/booking/QuickBookingForm.tsx`
   - Use React Server Actions for submission
   - Add form validation with Zod
   - Files:
     - `components/booking/QuickBookingForm.tsx`
     - `app/actions/booking.ts` - Server Action

2. **Multi-Step Booking Pages** (6h)
   - Create 3 booking flow pages:
     - `/boeking/stap-1` - Event details
     - `/boeking/stap-2` - Package selection
     - `/boeking/stap-3` - Contact & confirmation
   - Implement step navigation
   - Add progress indicator
   - Files:
     - `app/[locale]/boeking/stap-1/page.tsx`
     - `app/[locale]/boeking/stap-2/page.tsx`
     - `app/[locale]/boeking/stap-3/page.tsx`

3. **Form Validation** (2h)
   - Define Zod schemas for each step
   - Add client-side validation
   - Server-side validation in actions
   - File: `lib/validation/booking-schemas.ts`

4. **Backend API Integration** (3h)
   - Connect to existing backend API
   - Create API client for bookings
   - Handle success/error states
   - Files:
     - `lib/api/booking-client.ts`
     - `app/api/bookings/route.ts`

5. **Booking Session Storage** (2h)
   - Implement session storage for multi-step form
   - Use cookies or localStorage
   - Persist incomplete bookings
   - File: `lib/booking-session.ts`

6. **State Management** (4h)
   - Set up booking state context
   - Handle form data between steps
   - Add loading/success states
   - Files:
     - `context/BookingContext.tsx`
     - `hooks/useBooking.ts`

**Deliverables**:
- ✅ Complete booking flow functional
- ✅ Form validation working
- ✅ Backend integration tested
- ✅ Unit + integration tests passing

---

## 📅 Month 3: Content & SEO (Weeks 9-12)

### Week 9: Service & City Pages (16h)

#### Tasks:
1. **Service Pages Enhancement** (6h)
   - Complete `/diensten/bruiloft-dj`
   - Complete `/diensten/bedrijfsfeest-dj`
   - Complete `/diensten/feest-dj`
   - Add rich content, images, testimonials
   - Files:
     - `app/[locale]/diensten/[service]/page.tsx`
     - `app/[locale]/diensten/[service]/layout.tsx`

2. **Service-Specific Content** (3h)
   - Add service descriptions
   - Integrate VideoTestimonials
   - Add case studies
   - File: `content/services/[service].json`

3. **City Dynamic Pages** (4h)
   - Complete `/regio/[city]/page.tsx`
   - Add generateStaticParams for 17 cities
   - Implement ISR (Incremental Static Regeneration)
   - Files:
     - `app/[locale]/regio/[city]/page.tsx`
     - `lib/cities.ts`

4. **City Content Generation** (3h)
   - Generate 17 city-specific pages
   - Use cities from `/content/local-seo/cities.json`
   - Add local testimonials
   - Optimize for local SEO

**Deliverables**:
- ✅ 3 service pages live with rich content
- ✅ 17 city pages generated and optimized
- ✅ All pages server-rendered

---

### Week 10: Content & Marketing Components (12h)

#### Tasks:
1. **Blog Components** (4h)
   - Migrate 3 blog components:
     - `AuthorInfo.tsx`
     - `RelatedArticlesList.tsx`
     - `ArticleSidebar.tsx`
   - Add MDX support for blog posts
   - Files:
     - `components/blog/*.tsx`
     - `next.config.js` - Add MDX plugin

2. **FAQ Section** (2h)
   - Create comprehensive FAQ component
   - Add structured data for FAQ
   - File: `components/ComprehensiveFAQ.tsx`

3. **How It Works Section** (2h)
   - Create step-by-step guide component
   - Add animations
   - File: `components/HowItWorks.tsx`

4. **Event Gallery** (2h)
   - Create image gallery component
   - Use `next/image` for optimization
   - Add lightbox functionality
   - File: `components/EventGallery.tsx`

5. **Mobile CTA Bar** (1h)
   - Create sticky mobile CTA
   - Add WhatsApp integration
   - File: `components/MobileCTABar.tsx`

6. **WhatsApp Integration** (1h)
   - Add WhatsApp floating button
   - Configure click-to-chat link
   - File: `components/WhatsAppButton.tsx`

**Deliverables**:
- ✅ All marketing components migrated
- ✅ Blog functionality ready
- ✅ Mobile experience optimized

---

### Week 11: API & Integration (14h)

#### Tasks:
1. **Complete API Routes** (3h)
   - Add missing API routes:
     - `/api/packages` - Get pricing packages
     - `/api/testimonials` - Fetch testimonials
   - Files:
     - `app/api/packages/route.ts`
     - `app/api/testimonials/route.ts`

2. **Server Actions** (4h)
   - Create server actions for forms:
     - Contact form submission
     - Booking creation
     - Newsletter subscription
   - Files:
     - `app/actions/contact.ts`
     - `app/actions/booking.ts`
     - `app/actions/newsletter.ts`

3. **Contact Form Backend** (2h)
   - Implement contact form logic
   - Connect to email service (Postmark)
   - Add validation and rate limiting
   - File: `lib/email/contact-handler.ts`

4. **Availability Checking** (3h)
   - Implement date availability check
   - Connect to backend calendar API
   - Add caching for performance
   - Files:
     - `lib/availability/check.ts`
     - `app/api/availability/check/route.ts`

5. **Error Handling** (2h)
   - Add global error boundary
   - Create error pages (404, 500)
   - Add logging for server errors
   - Files:
     - `app/error.tsx`
     - `app/not-found.tsx`
     - `lib/error-logger.ts`

**Deliverables**:
- ✅ All API routes functional
- ✅ Server actions tested
- ✅ Error handling robust

---

### Week 12: SEO & Performance (14h)

#### Tasks:
1. **Dynamic Metadata** (4h)
   - Add metadata for all pages
   - Implement generateMetadata function
   - Add Open Graph tags
   - Twitter Card tags
   - Files:
     - `app/[locale]/layout.tsx` - Base metadata
     - Each `page.tsx` - Page-specific metadata

2. **Structured Data (JSON-LD)** (2h)
   - Add Organization schema
   - Add LocalBusiness schema
   - Add Event schema for services
   - Add FAQ schema
   - File: `lib/seo/structured-data.ts`

3. **Image Optimization** (3h)
   - Convert all `<img>` to `next/image`
   - Add blur placeholders
   - Optimize image formats (WebP)
   - Configure image domains

4. **Incremental Static Regeneration** (2h)
   - Configure ISR for city pages
   - Add revalidation intervals
   - Test regeneration
   - Files: Update all `page.tsx` with `revalidate` export

5. **robots.txt Configuration** (1h)
   - Update robots.txt rules
   - Add sitemap reference
   - Block non-essential crawlers
   - File: `app/robots.ts`

6. **Caching Headers** (2h)
   - Configure Next.js caching
   - Add CDN cache headers
   - Optimize static asset caching
   - File: `next.config.js`

**Deliverables**:
- ✅ All pages have proper metadata
- ✅ Structured data implemented
- ✅ Core Web Vitals optimized
- ✅ SEO score 90+

---

## 📅 Month 4: Testing, Analytics & Deployment (Weeks 13-16)

### Week 13-14: Testing & QA (25h)

#### Tasks:
1. **Unit Tests** (8h)
   - Write tests for 20+ components
   - Test all form validations
   - Test server actions
   - Target: 80% code coverage
   - Files: `**/__tests__/*.test.tsx`

2. **Integration Tests** (4h)
   - Test booking flow end-to-end
   - Test form submissions
   - Test API route responses
   - Files: `__tests__/integration/*.test.ts`

3. **E2E Tests with Playwright** (6h)
   - Test critical user journeys:
     - Homepage → Service page → Booking → Submission
     - City page → Contact form
     - Language switching
   - Files: `e2e/*.spec.ts`

4. **Accessibility Audit** (3h)
   - Run Lighthouse accessibility tests
   - Fix WCAG 2.1 AA violations
   - Test keyboard navigation
   - Test screen reader compatibility

5. **Cross-Browser Testing** (2h)
   - Test on Chrome, Firefox, Safari, Edge
   - Fix browser-specific issues
   - Test on mobile browsers

6. **Mobile Responsiveness** (2h)
   - Test on various screen sizes
   - Fix layout issues
   - Optimize touch targets

**Deliverables**:
- ✅ 80%+ code coverage
- ✅ All E2E tests passing
- ✅ Accessibility score 95+
- ✅ Mobile-optimized

---

### Week 15: Analytics & Tracking (10h)

#### Tasks:
1. **UserBehaviorTracker Migration** (2h)
   - Migrate existing tracker
   - Add Next.js-specific events
   - File: `components/analytics/UserBehaviorTracker.tsx`

2. **Conversion Tracking** (2h)
   - Track form submissions
   - Track booking completions
   - Track phone/email clicks
   - File: `lib/analytics/conversions.ts`

3. **CTA Tracking** (2h)
   - Track all call-to-action clicks
   - Add custom event properties
   - File: `lib/analytics/cta-tracking.ts`

4. **Event Tracking** (2h)
   - Track page views
   - Track scroll depth
   - Track video plays
   - File: `lib/analytics/events.ts`

5. **PostHog Configuration** (2h)
   - Set up feature flags
   - Configure session recording
   - Add custom properties
   - File: `lib/analytics/posthog-config.ts`

**Deliverables**:
- ✅ All analytics events tracked
- ✅ Conversion funnel visible
- ✅ PostHog dashboards configured

---

### Week 16: Production Deployment (13h)

#### Tasks:
1. **Production Build Configuration** (2h)
   - Optimize build settings
   - Configure compression
   - Set up asset optimization
   - File: `next.config.js`

2. **Docker Configuration** (2h)
   - Create Next.js Dockerfile
   - Optimize for production
   - Multi-stage build
   - File: `Dockerfile.nextjs`

3. **Kubernetes Deployment** (3h)
   - Create deployment manifests
   - Configure services
   - Set up ingress
   - Files:
     - `k8s/deployment-nextjs.yaml`
     - `k8s/service-nextjs.yaml`
     - `k8s/ingress-nextjs.yaml`

4. **Monitoring Setup** (2h)
   - Configure error tracking (Sentry)
   - Set up performance monitoring
   - Add health check endpoint
   - Files:
     - `lib/monitoring/sentry.ts`
     - `app/api/health/route.ts`

5. **CI/CD Pipeline** (3h)
   - Create GitHub Actions workflow
   - Add automated tests
   - Add deployment steps
   - File: `.github/workflows/nextjs-deploy.yml`

6. **Production Smoke Tests** (1h)
   - Test all critical pages
   - Verify API endpoints
   - Check analytics tracking
   - Test forms

**Deliverables**:
- ✅ Next.js app deployed to production
- ✅ Monitoring active
- ✅ CI/CD pipeline working

---

## 🔄 A/B Testing & Gradual Rollout

### Strategy:
1. **Week 17-18**: Deploy Next.js to staging environment
2. **Week 19**: A/B test with 10% traffic to Next.js
3. **Week 20**: Monitor metrics (Core Web Vitals, conversions)
4. **Week 21**: Increase to 50% if metrics improve
5. **Week 22**: Full rollout to 100%

### Metrics to Monitor:
- **Lighthouse Score**: Target 90+ (from current ~75)
- **First Contentful Paint**: Target <1.5s (from current ~2.5s)
- **Largest Contentful Paint**: Target <2.5s (from current ~3.5s)
- **Time to Interactive**: Target <3s (from current ~5s)
- **Conversion Rate**: Target +15%
- **Bounce Rate**: Target -10%
- **SEO Traffic**: Target +40% in 3 months

---

## 🎯 Success Criteria

### Phase 1 (Month 1) - ✅ DONE
- [x] Sitemap with all pages generated
- [x] Frontend deployed with correct URLs
- [x] Baseline metrics collected

### Phase 2 (Month 2-3)
- [ ] All core components migrated
- [ ] Booking flow functional
- [ ] Service & city pages live
- [ ] SEO optimized

### Phase 3 (Month 4)
- [ ] Tests passing (80%+ coverage)
- [ ] Production deployment successful
- [ ] Metrics improved vs Vite baseline

---

## 📋 Daily Checklist Template

For each development day:
- [ ] Pull latest changes
- [ ] Run tests before starting
- [ ] Complete assigned task(s)
- [ ] Write/update tests
- [ ] Run full test suite
- [ ] Document changes
- [ ] Create PR for review
- [ ] Deploy to staging
- [ ] Verify in staging

---

## 🚨 Risk Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Breaking changes | High | Medium | Feature flags, parallel deployment |
| i18n routing issues | Medium | High | Thorough testing, fallback routes |
| Performance regression | High | Low | Monitor Core Web Vitals, rollback plan |
| Missing dependencies | Low | Low | Check package.json early |
| Booking flow bugs | High | Medium | Extensive E2E tests, staging validation |

---

## 📞 Next Actions

**Immediate** (Week 5 - Starting now):
1. Initialize Next.js project structure
2. Set up i18n with next-intl
3. Configure analytics (PostHog + GA4)

**Communication**:
- Weekly progress updates
- Blocker escalation within 24h
- Demo at end of each month

---

**Document Version**: 1.0
**Last Updated**: 2025-12-05
**Owner**: Development Team
**Approved By**: Product Manager

