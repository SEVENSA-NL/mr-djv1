# Mister DJ agent contract

The Next.js marketing site helps visitors choose DJ services and submit
contact/availability requests. Current code and tests define behavior;
dated launch checklists are historical evidence, not a task assignment.

## Code map

- `frontend-nextjs/app/` owns pages and server routes;
  `frontend-nextjs/app/api/contact/route.ts` and
  `frontend-nextjs/app/api/availability/route.ts` forward leads.
- `frontend-nextjs/lib/analytics/` owns consent-gated analytics;
  `frontend-nextjs/__tests__/lead-routes.test.ts` exercises backend delivery
  and sanitized failure responses. Other tests cover consent and form UI.
- `backend/` contains the Express integration source and RentGuy mock;
  `frontend/` contains the separate legacy Vite application. Inspect these
  only when the requested feature crosses their contracts.
- `docs/rentguy-integration-runbook.md` and
  `docs/marketing-consent-tracking.md` provide integration-specific guidance.

## Engineering ownership

Inherit [Sevensa OS policy](../sevensa-os/AGENTS.md) and its
[skill router](../sevensa-os/SKILLS.md). Apply the engineering-owner baseline
to the requested change; load only the relevant local guidance below.
For private remote work, use the canonical
[remote-access policy](../sevensa-os/docs/SEVENSA_PRIVATE_REMOTE_ACCESS.md):
`sevensa-admin` is normal management; `sevensa-vps-codex` is bounded Codex Remote.
Source verification does not prove deployment or authorize a live action.

## Critical boundaries

Lead endpoints fail closed without a configured backend, and acknowledge
delivery only after backend success. Keep API keys server-side and failure
logs free of request bodies/PII. Preserve analytics consent independently
from operational lead delivery. Use mock providers and synthetic requests
for tests; live backend, CRM, RentGuy or email writes need task authority.
Never provision or commit secrets merely because an old checklist requests it.

## Verify

Use the active frontend package: from `frontend-nextjs`, run
`npm test -- --run __tests__/lead-routes.test.ts --maxWorkers=1` for lead-route changes,
`npm test -- --run` for the frontend suite, and `npm run type-check` or
`npm run build` when the affected surface warrants it. Root `npm test` targets
the legacy frontend and does not validate Next.js behavior. UI changes also
need the relevant browser/form journey; test success is not live delivery proof.

The former instruction backlog is preserved in
[docs/archive/agents-backlog-2025.md](docs/archive/agents-backlog-2025.md).
Current actionable task/review state belongs to GitHub Issues/PRs/CI.
