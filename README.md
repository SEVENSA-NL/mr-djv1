# Mister DJ (main) — Next.js site status

This repository now centers on the Next.js 15 marketing frontend for Mister DJ. Legacy Vite + Express assets remain for reference but are not wired into the live flow.

## Current reality (Dec 2025)
- **Active frontend:** `frontend-nextjs` with `next-intl` (nl/en) and the Z03–Z06 brochure kit (Hero, Services, Packages, Testimonials, Gallery, Contact + form components). NL brochure routes (`/`, `/bruiloften`, `/bedrijfsfeesten`, `/feesten-overig`, `/impressies`, `/mister-dj`, `/veelgestelde-vragen`, `/contact`) are served from `app/(nl)/*` and still contain placeholder copy/images; see `frontend-nextjs/docs/mr-dj-content-TODOs.md`.
- **Forms:** Availability, IntroCall, WeddingIntake, FairOffer, OpeningDanceMix post via `src/forms/submitLead.ts` to the stub API at `app/api/mr-dj/lead/route.ts` (logs + 200). No mail/CRM/RentGuy integration yet; `app/[locale]/layout.tsx` guards `https://mr-dj.rentguy.nl/api/session` by stubbing fetch client-side.
- **Locale site:** `app/[locale]` home/services/packages/city flows remain. City data currently covers 16 NL cities (`lib/cities.ts`) with partial content (`lib/cityContent.ts`, fallback to Eindhoven). UI copy still claims “100+ steden/500+ events”; align the messaging with the dataset when finalizing.
- **Tests:** Playwright smoke tests target `/[locale]` routes only. No coverage yet for the new brochure pages or form submissions.
- **Legacy code:** `frontend/` (Vite SPA) and `backend/` (Express + Postgres/Redis queues) stay in the repo but are not used by the Next.js site and have no secrets provisioned in this branch.

## Run the active frontend
Requires Node 20 LTS (works on >=18 for the Next app; legacy `frontend/` expects 20). Prefer pnpm because `frontend-nextjs/pnpm-lock.yaml` is authoritative.

```bash
cd frontend-nextjs
pnpm install   # or npm install if pnpm is unavailable
pnpm dev       # http://localhost:3000/nl (locale redirect via middleware)
```

Production-style checks:

```bash
pnpm lint
pnpm type-check
pnpm test          # vitest
pnpm test:e2e-smoke
pnpm test:full     # test + build + smoke
pnpm build
pnpm start         # serves the built app
```

## Routing cheat sheet
- Locale flows: `/[locale]` (default `/nl`) + `/[locale]/diensten/...`, `/[locale]/pakketten`, `/[locale]/steden`, `/[locale]/[city]`, `/[locale]/beschikbaarheid`.
- City pages: 16 seeded cities in `lib/cities.ts`; content pulled from `lib/cityContent.ts` with fallback to Eindhoven.
- NL brochure routes without locale prefix: `/`, `/bruiloften`, `/bedrijfsfeesten`, `/feesten-overig`, `/impressies`, `/mister-dj`, `/veelgestelde-vragen`, `/contact` (driven by `app/(nl)/**`).
- API stub: `/api/mr-dj/lead` accepts `{ form, payload }` and returns 200; no persistence or mailer is connected.

## Content & integration TODOs
- Fill final NL brochure copy, assets, and testimonials per `frontend-nextjs/docs/mr-dj-content-TODOs.md`.
- Wire the Z03 form components to the real backend/mailer/CRM (and remove the RentGuy fetch guard) instead of the stub.
- Align city counts/metrics in UI and metadata with the actual dataset; expand `lib/cityContent.ts` beyond the current few entries.
- Re-enable analytics/consent once IDs are ready (GTM/GA4/Complianz placeholders remain).
- Extend tests to cover the brochure pages, form success/error states, and structured data.

## Documentation map
- **Active:** `frontend-nextjs/README.md`, `frontend-nextjs/QUICKSTART.md`, `frontend-nextjs/docs/mr-dj-content-TODOs.md`, `frontend-nextjs/README-CITY-PAGES.md`, `frontend-nextjs/CITY-PAGES-IMPLEMENTATION-SUMMARY.md`, `AGENTS.md`.
- **Legacy/archived:** GA4/GTM guides, Netlify/Traefik/deployment valuations, and the Vite/Express documentation sets in the repo root. Treat them as historical references until they are revalidated for the Next.js site.
