# City Pages Implementation Summary (Dec 2025)

Current snapshot (main branch):
- Dynamic locale city routing is live for 16 NL cities via `app/[locale]/[city]/page.tsx` with the overview at `/[locale]/steden`.
- Content is partial: `lib/cityContent.ts` only has detailed entries for Eindhoven, Tilburg, Breda, and Den Bosch; other cities fall back to Eindhoven. UI copy still claims "100+ cities / 500+ events" and needs alignment.
- Structured data is limited to a BreadcrumbList; LocalBusiness/FAQ schemas are not implemented yet.
- Tests: Playwright smoke covers `/[locale]` routes (including `/nl/eindhoven`) but has no schema/form assertions for city pages.

Next actions:
- Expand `lib/cities.ts` and `lib/cityContent.ts` and update the overview/hero stats to match reality.
- Add LocalBusiness + FAQ schema and test coverage for all cities.
- Wire city CTAs (availability, WhatsApp, contact) into real lead handling and analytics once backend wiring is ready.

See `README-CITY-PAGES.md` for details and the full TODO list.
