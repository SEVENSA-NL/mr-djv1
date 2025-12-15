# Mister DJ frontend (Next.js 15)

Next.js App Router + `next-intl` (nl/en) with the Z03–Z06 brochure kit integrated. This is the active frontend; the Vite SPA and Express backend in the repo root are legacy.

## Scope & status
- Locale experience under `app/[locale]`: home, services (`/diensten/...`), packages, availability, city overview, and dynamic city pages for 16 NL cities.
- NL brochure experience under `app/(nl)` with unprefixed routes (`/`, `/bruiloften`, `/bedrijfsfeesten`, `/feesten-overig`, `/impressies`, `/mister-dj`, `/veelgestelde-vragen`, `/contact`). Middleware enforces locale prefixes everywhere else.
- Forms (Availability, IntroCall, WeddingIntake, FairOffer, OpeningDanceMix) share `src/forms/submitLead.ts` and post to `/api/mr-dj/lead` which currently only logs + returns 200. No mail/CRM/RentGuy wiring yet; `app/[locale]/layout.tsx` stubs the RentGuy session fetch client-side.
- City coverage: 16 seeded cities in `lib/cities.ts`; `lib/cityContent.ts` has a small set of entries (fallback to Eindhoven). UI copy still claims 100+ cities/500+ events and needs alignment with the dataset.

## Getting started
Requires Node 20 LTS (>=18 works for this app). pnpm is preferred because `pnpm-lock.yaml` is present.

```bash
pnpm install
pnpm dev       # http://localhost:3000/nl
```

## Scripts (run from this folder)
- `pnpm build`
- `pnpm start`
- `pnpm lint`
- `pnpm type-check`
- `pnpm test` (vitest)
- `pnpm test:e2e-smoke` (Playwright, targets `/[locale]` routes)
- `pnpm test:full` (test + build + smoke)

## Routes & key files
- Locale site: `app/[locale]/page.tsx`, `/diensten/{bruiloft-dj,bedrijfsfeest-dj,feest-dj}`, `/pakketten`, `/steden`, `/[city]`, `/beschikbaarheid`.
- Brochure site: `app/(nl)/page.tsx` plus `/bruiloften`, `/bedrijfsfeesten`, `/feesten-overig`, `/impressies`, `/mister-dj`, `/veelgestelde-vragen`, `/contact`.
- Middleware: `middleware.ts` enforces locale prefix except for the brochure slugs above.
- Forms: `src/components/forms/*`, `src/forms/submitLead.ts`, API stub `app/api/mr-dj/lead/route.ts`.
- City data: `lib/cities.ts`, `lib/cityContent.ts`, components under `components/city/*`.
- Layout: `app/[locale]/layout.tsx` sets fonts/metadata and stubs RentGuy fetch.

## Content & integration tasks
- Finalize brochure copy/images/testimonials (see `docs/mr-dj-content-TODOs.md`).
- Replace the `/api/mr-dj/lead` stub with real mailer/CRM/RentGuy wiring and surface success/error states in the UI.
- Align city counts/metadata with the actual dataset; extend `lib/cityContent.ts` so each city has unique content.
- Add/verify structured data (LocalBusiness/FAQ) for city pages and brochure routes; re-enable analytics/consent with real IDs.
- Extend Playwright/Vitest coverage to brochure pages and lead submission flows.

## Documentation
- `QUICKSTART.md`
- `README-CITY-PAGES.md` and `CITY-PAGES-IMPLEMENTATION-SUMMARY.md`
- `docs/mr-dj-content-TODOs.md`
- `AGENTS.md` for cross-project integration tasks
