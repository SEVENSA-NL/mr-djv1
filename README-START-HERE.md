# Start here — Mister DJ (main branch)

Quick orientation after the Next.js migration. The active project is the Next.js 15 frontend under `/srv/apps/mr-djv1/frontend-nextjs`; legacy docs remain for reference only.

## What to run
- Use the Next.js app in `frontend-nextjs` (next-intl nl/en + NL brochure kit).
- Routes: locale-prefixed by default (`/nl`, `/en`); unprefixed NL brochure pages at `/`, `/bruiloften`, `/bedrijfsfeesten`, `/feesten-overig`, `/impressies`, `/mister-dj`, `/veelgestelde-vragen`, `/contact`.
- Quick start:
  ```bash
  cd frontend-nextjs
  pnpm install   # or npm install
  pnpm dev       # http://localhost:3000/nl
  ```

## Integration status
- Forms post to the stub API `/api/mr-dj/lead` via `src/forms/submitLead.ts`; no mail/CRM/RentGuy wiring yet. Layout stubs the RentGuy session fetch client-side.
- Analytics/consent IDs (GTM/GA4/Complianz) are not configured in this branch; keep scripts disabled until they are confirmed.
- City dataset is 16 cities with partial content; copy that claims 100+ cities is placeholder.

## Documentation pointers
- Project overview: `README.md` and `frontend-nextjs/README.md`.
- Quick start & scripts: `frontend-nextjs/QUICKSTART.md`.
- Content gaps: `frontend-nextjs/docs/mr-dj-content-TODOs.md`.
- Integration tasks: `AGENTS.md`.

## Legacy docs
- The GA4/GTM guides in this folder are the October 2025 set for the old stack; keep for reference only until revalidated on the Next.js site.
- Legacy Vite frontend and Express backend docs in the repo root remain archived and are not used by the active frontend.
