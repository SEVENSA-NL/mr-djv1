# City pages — current state

## What exists
- Dynamic route `app/[locale]/[city]/page.tsx` with `generateStaticParams` using `lib/cities.ts` (16 NL cities across five regions).
- Overview page `app/[locale]/steden/page.tsx` lists cities by region and province. The hero and stats currently claim "100+ cities / 500+ events" but the dataset is 16; update the copy when counts change.
- Components: `components/city/CityPageClient.tsx` (hero, highlights, venues, perks, FAQ, contact CTA + WhatsApp), `CitySectionNav.tsx`, `CityContact.tsx`, plus Breadcrumb JSON-LD and `ScrollDepthTracker` on each city page.
- Data: `lib/cityContent.ts` includes detailed content for `eindhoven`, `tilburg`, `breda`, `den-bosch`; all other cities fall back to the Eindhoven content.
- Structured data: BreadcrumbList is emitted; LocalBusiness/FAQ schema is not yet implemented.

## Gaps / next steps
- Expand `lib/cities.ts` and `lib/cityContent.ts` to the desired coverage and align UI/metadata counts with the actual dataset (update the `/[locale]/steden` hero stats too).
- Add LocalBusiness + FAQ schema per city and cover it with Playwright/Vitest checks.
- Add city-specific FAQs/testimonials/venue lists so pages no longer fall back to Eindhoven.
- Hook CTAs (`/[locale]/beschikbaarheid`, WhatsApp, contact) into real lead handling + analytics once the backend wiring is ready.
- Extend e2e coverage beyond the existing `/[locale]` smoke routes to include the brochure dataset as it grows.

## Quick checks
```bash
pnpm test:e2e-smoke   # verifies locale routes including /nl/eindhoven
pnpm build            # generates static params for the 16 seeded cities
```
