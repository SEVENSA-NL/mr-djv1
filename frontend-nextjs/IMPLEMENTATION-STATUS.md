# City Pages Implementation Status (Dec 2025)

## Completed
- Dynamic city routing via `app/[locale]/[city]/page.tsx` with `generateStaticParams` + metadata.
- City overview at `/[locale]/steden` with region/province grouping.
- Components: `CityPageClient`, `CitySectionNav`, `CityContact`, Breadcrumb JSON-LD, `ScrollDepthTracker`.
- Data scaffolding: `lib/cities.ts` seeded with 16 NL cities, `types/city.ts`, `lib/cityContent.ts` with base entries + fallback.

## In progress / TODO
- Expand the city dataset and unique content for each city; update UI/stat copy to match real counts.
- Add LocalBusiness + FAQ structured data and test coverage.
- Enrich FAQs/testimonials/venue lists so pages no longer fall back to Eindhoven.
- Connect CTAs/lead flows to real backend/mailer/analytics (currently stubbed via `/api/mr-dj/lead`).
- Extend Playwright/Vitest coverage to brochure pages and schema/assertion checks.

## Progress snapshot
- Routing: ✅
- Data: ⚠️ 16/100 cities, partial content
- SEO/schema: ⚠️ Breadcrumb only
- Tests: ⚠️ Smoke on `/[locale]` routes; no schema/form assertions
- Integration: ⚠️ `submitLead` stub only
