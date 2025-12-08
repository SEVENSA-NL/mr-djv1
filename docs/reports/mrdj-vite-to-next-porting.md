# Mister DJ – Vite → Next Feature Parity & Upgrade Report

Purpose: capture what is already live in Next.js, what existed in the Vite frontend, and what still needs to be mirrored to ensure full parity (or better) with the legacy implementation.

## Current Next.js State (live)
- Frontend: Next.js 15 standalone image (`ghcr.io/crisisk/mr-dj-frontend:nextjs-standalone`), locales /nl and /en, services (/diensten/*), pakketten, steden, availability/contact APIs.
- Design/UI: parallax hero media on services and cities; animated gradient hero on home; unified button/CTA states; lucide icon set; rhythm scale (8/12/16/24px) on FAQs/cards; local-proof badges and TOC/scroll-spy on city pages; video testimonials module with media engagement tracking; structured data present on services/pakketten; next/image optimization on.
- Analytics: trackEvent + media_engagement (play/pause/select/complete/filter) for video testimonials; PostHog/dataLayer hooks; GA4 server helper present but endpoints not wired for leads.
- Tests: `pnpm run test:full` (vitest + next build + Playwright smoke) and `pnpm run test:e2e-staging` green.
- Perf/A11y (staging Lighthouse): Performance 99, Accessibility 96, Best Practices 96, SEO 90.

## Key Vite Features/Content to Mirror
- Video Testimonials (richer UX): `components/video/VideoTestimonial.tsx` with thumbnails, star ratings, play/pause/complete/error tracking to PostHog; persona-filtered data in `data/testimonials.ts` (bruiloft/bedrijfsfeest/feest, MP4 assets).
- Comprehensive FAQ (categorized): `components/ComprehensiveFAQ.tsx` includes deep copy across pricing/booking/music/technical/general; category chips; strong NL persona tone.
- Structured Data Pack: `src/lib/seo/structuredData.ts` includes LocalBusiness, Organization, Service, wedding FAQ, corporate FAQ schemas, BASE_URL/logo wiring, sameAs/contactPoint/areaServed.
- CTA/Lead Tracking: `src/lib/ctaTracking.ts` (GA4/PostHog CTA events with variant/keyword resolution); QuickBookingForm origin-aware submissions.
- Lead Form UX: `components/booking/QuickBookingForm.tsx` with validation, error handling, analytics hooks; used on `src/pages/HomePage.tsx`.
- Social Proof/Logo Wall: Generated logo strip (`components/Generated/D4_4_20251016_060943.tsx`) plus stat tiles used in home templates.
- Persona Copy: EN locale strings in `src/locales/en/common.json` carry more persona-oriented subtitles; home hero supports “personalise the experience” framing.

## Gap Mapping (Next vs Vite)
- FAQs: Next has expanded FAQs but lacks the categorized, persona-rich set from Vite. → Import content and optional category filter, keeping our spacing rhythm.
- Social Proof: Next lacks a logo belt + stat bar. → Port logo wall/stat tiles to home + services.
- Lead Form + CTA tracking: Next relies on basic CTAs; no QuickBooking form with CTA tracking variants. → Port QuickBookingForm and ctaTracking into /beschikbaarheid or hero mid-page, wired to /api/availability/contact.
- Structured Data: Next has Service/Organization but should add LocalBusiness + FAQ schemas (wedding/corporate) and ensure Organization schema is injected sitewide with live logo URL.
- Video Testimonials: Next tracks media_engagement; Vite adds PostHog error/completion events and thumbnails. → Align events, consider thumbnail UI for better engagement.
- Persona Voice (EN): Next EN copy is lighter; Vite’s locales/common.json provides persona-oriented subtitles. → Reuse EN strings for services/cities/FAQs.

## Action Plan to Reach/Exceed Parity
1) Structured Data: import LocalBusiness/Organization/Service + wedding/corporate FAQ JSON-LD blocks from Vite, adapt to `https://mr-dj.sevensa.nl/logo.png`, and inject on home + services + pakketten. Verify metadataBase/canonicals on live domain.
2) FAQs: replace/enrich current FAQs with ComprehensiveFAQ content; add optional category chips; localize EN from Vite content.
3) Social Proof: add logo wall + stat tiles (logo strip component) to home and services; include metric callouts (NPS/response time/dance floor retention).
4) Lead Capture: port QuickBookingForm + ctaTracking; place on home hero mid-page and services; wire to Next /api/contact and /api/availability with PostHog/GA4 events (once backend contracts confirmed).
5) Video UX: enhance Next video testimonials with thumbnails/error handling/star ratings; mirror PostHog event names for continuity.
6) Persona Copy: adopt EN locale phrasing from Vite for corporate/party personas; add persona CTA microcopy on services and city pages.
7) Monitoring: ensure GA4/PostHog events for media_engagement/CTA/lead forms are flowing after deploy; keep Playwright smoke suite and Lighthouse checks in CI.

## Testing/Deployment Notes
- Keep `pnpm run test:full` and `pnpm run test:e2e-staging` as gates.
- After each ported feature: run Lighthouse on staging (mobile) and check a11y/SEO deltas.
- Image/logo assets: live logo now at `/logo.png` (copied to public); ensure referenced in all JSON-LD.

## Ownership/Next Steps
- Suggested immediate PR: structured data pack + ComprehensiveFAQ + logo wall + persona EN copy.
- Follow-up: QuickBookingForm port + CTA tracking, video thumbnail UX, GA4 wiring for lead APIs once backend contract is confirmed.
