# Mr DJ Backend Gate - 2026-07-03

## Decision

The Mr DJ backend remains disabled for recovery. Public `mr-dj.sevensa.nl` stays frontend-only and `/api/*` stays intentionally unavailable until the full backend gate is green.

## Completed

- Created a reproducible backend lockfile: `backend/package-lock.json`.
- Installed dependencies locally with `npm ci --ignore-scripts`.
- Ran backend tests without deploying.
- Ran production dependency audit without deploying.

## Evidence

- `npm test -- --runInBand`: failed.
  - Main blocker: required integration configuration is not available as fresh recovery secrets.
  - Observed required variables include `RENTGUY_API_KEY` and `SEO_AUTOMATION_API_KEY`.
  - One additional Windows-local test expectation differs on path separator formatting for `config/.env.managed`.
- `npm audit --audit-level=high --omit=dev`: failed.
  - Remaining high risk is centered on the OpenTelemetry dependency chain.
  - The suggested audit fix is a breaking dependency upgrade and is not safe to force in the recovery batch.

## Guardrails

- No backend deployment was performed.
- No DNS, Traefik route, database, OpenBao, or production secret mutation was performed.
- Existing tracked env-style files are treated as legacy reference only and must not be used for production restore.

## Required Before Backend Exposure

1. Regenerate production backend secrets and store them in OpenBao.
2. Keep `backend/package-lock.json` committed and reproducible.
3. Fix the test environment so required integration settings are supplied by safe test fixtures, not legacy env files.
4. Resolve or risk-accept the OpenTelemetry high audit chain on a separate branch.
5. Run a disposable database migration.
6. Validate private `/api/health` and safe `/api/contact` smoke.
7. Only then patch public routing for `/api/*`.
