# RentGuy Integration Runbook

Deze runbook bundelt alle stappen om de RentGuy-integratie van Mister DJ te configureren, te valideren en in productie te brengen. Gebruik dit document als leidraad voor zowel developers als operations tijdens roll-outs, hotfixes en audits.

## 1. Architectuur-overzicht

| Component | Rol | Belangrijke verwijzingen |
| --- | --- | --- |
| Backend API (`backend/`) | Levert bookings-, availability- en contactendpoints, verwerkt payloads en synchroniseert richting RentGuy via `rentGuyService`. | [`backend/src/services/rentGuyService.js`](../backend/src/services/rentGuyService.js) |
| Config Dashboard | UI voor runtime configuratie (secrets, toggles) inclusief queue controls. | [`backend/src/routes/dashboard.js`](../backend/src/routes/dashboard.js) |
| Frontend SPA | Stuurt leads naar `/availability/check` en toont status/fouten afhankelijk van RentGuy queue-responses. | [`AvailabilityChecker.jsx`](../AvailabilityChecker.jsx) |
| Durable Queue | Houdt RentGuy-jobs vast totdat levering slaagt; exposeert metrics via `/metrics/queues`. | [`backend/src/services/rentGuyService.js`](../backend/src/services/rentGuyService.js) |

> ℹ️ Feature flags staan standaard aan, maar kunnen alsnog overschreven worden vanuit managed environments of de dashboard-UI (`rentguy-integration`).【F:config/feature-flags.json†L1-L14】

## 2. Vereiste configuratie

1. **Environment variabelen** (backend):
   - `RENTGUY_API_BASE_URL`
   - `RENTGUY_API_KEY`
   - Optioneel: `RENTGUY_WORKSPACE_ID`, `RENTGUY_TIMEOUT_MS`
   - Secrets zijn verplicht; het configuratiemodule blokkeert boot zonder geldige waarden.【F:backend/src/config.js†L24-L73】
2. **Automatiseringsservices**: Zorg dat Sevensa- en n8n-URL's eveneens geconfigureerd zijn om mixed payloads (lead + booking) te accepteren.【F:backend/src/config.js†L33-L87】
3. **Frontend API-bereik**: zet `VITE_API_BASE_URL` (of injecteer `window.MR_DJ_API_BASE_URL`) zodat de Availability Checker requests naar de backend stuurt i.p.v. direct naar RentGuy.【F:AvailabilityChecker.jsx†L11-L42】
4. **Feature flag**: bevestig dat `rentguy-integration` ingeschakeld is in de runtime-configuratie. Zonder flag worden calls op de queue uitgeschakeld.【F:config/feature-flags.json†L5-L12】

## 3. Installatie & local setup

```bash
# Backend dependencies + env
npm install --prefix backend
cp backend/.env.example backend/.env
cp backend/managed.env.example backend/managed.env
# voeg RentGuy secrets toe aan beide bestanden of beheer ze via dashboard secrets

# Frontend dependencies
yarn --cwd frontend install  # of npm install --prefix frontend

# Start RentGuy mock server voor lokale integratietests
npm run rentguy:mock --prefix backend

# Start backend + frontend
npm run dev --prefix backend
npm run dev --prefix frontend
```

Mock server details en failure-simulaties vind je in [`docs/RENTGUY-MOCK-SERVER.md`](RENTGUY-MOCK-SERVER.md). Gebruik deze bij CI en lokale flows.【F:docs/RENTGUY-MOCK-SERVER.md†L1-L64】

## 4. Configureren via dashboard

1. Ga naar `/dashboard` en log in.
2. Tab **Integraties → RentGuy integratie**: vul base URL, API key en optioneel workspace/timeout in. De statuskaart toont "API geconfigureerd" als validatie slaagt.【F:README.md†L46-L79】
3. Tab **Automation & CRM**: vul Sevensa submit URL en queue-instellingen zodat gecombineerde workflows dezelfde secrets gebruiken.【F:docs/rentguy-automation-playbook.md†L7-L27】
4. Gebruik **Queue flushen** (RentGuy kaart) om jobs te forceren na configuratie.【F:README.md†L69-L87】

## 5. Functionele testscenario's

| Scenario | Stappen | Verwachte uitkomst |
| --- | --- | --- |
| Availability lead naar RentGuy | Vul formulier op marketing-site → backend `/availability/check` verwerkt lead, queue activeert `rentGuyService.syncBooking`. | HTTP 202 bij queue-fallback, dashboard status toont wachtrij en job wordt afgeleverd bij mock server.【F:AvailabilityChecker.jsx†L43-L110】【F:backend/src/services/rentGuyService.js†L69-L154】 |
| Queue flush | Trigger fout via mock server (`X-RentGuy-Simulate: rate-limit`), check `/integrations/rentguy/status`, klik **Queue flushen** in dashboard. | Queue size daalt naar 0, `lastSyncSuccess` bijgewerkt in status endpoint.【F:docs/RENTGUY-MOCK-SERVER.md†L35-L58】【F:backend/src/routes/dashboard.js†L3080-L3143】 |
| Metrics endpoint | Call `GET /metrics/queues`. | JSON bevat `rentguy` object met backlog/metrics voor dashboards.【F:backend/src/docs/openapi.yaml†L182-L212】 |
| Booking webhook | Stuur gesigneerde webhook naar `/integrations/rentguy/webhook`. | Backend valideert signature en verwerkt payload (zie Jest-tests).【F:backend/src/__tests__/app.test.js†L378-L463】 |

## 6. Automatische testen

| Command | Doel |
| --- | --- |
| `npm run test --prefix backend` | Jest-suite (rentGuyService, dashboard endpoints).【F:backend/package.json†L7-L40】 |
| `npm run test:e2e -- --env RENTGUY_API_BASE_URL=http://localhost:3050` | Cypress smoke flow voert booking/availability scenario uit tegen mock server.【F:package.json†L6-L22】 |
| `npm run test:perf` | k6 performance check inclusief queue-metrics assertions.【F:package.json†L14-L22】 |
| `npm run perf:measure` | Lighthouse audit zodat marketing flow niet degradeert tijdens integratie.【F:package.json†L11-L16】 |

> 📌 Draai `npm run rentguy:mock --prefix backend` in een aparte terminal voordat je end-to-end of performance tests start, zodat alle netwerk-calls een voorspelbaar antwoord krijgen.【F:docs/RENTGUY-MOCK-SERVER.md†L25-L55】

## 7. Roll-out checklist

- [ ] Secrets ingevuld (dashboard toont groene status).【F:README.md†L46-L87】
- [ ] `/integrations/rentguy/status` geeft `configured: true` en queueSize = 0.【F:backend/src/docs/openapi.yaml†L182-L212】
- [ ] `npm run test --prefix backend` en `npm run test:e2e` slagen tegen mock server.【F:backend/package.json†L7-L40】【F:package.json†L6-L22】
- [ ] Incident simulaties (`rate-limit`, `server-error`) getest via mock server en queue recovery bevestigd.【F:docs/RENTGUY-MOCK-SERVER.md†L35-L58】
- [ ] Grafana/monitoring ingest ingesteld op `/metrics/queues` voor alerting.【F:backend/src/docs/openapi.yaml†L200-L212】

Door deze checklist te volgen is de RentGuy-integratie reproduceerbaar te deployen en blijft de business flow bewaakt van lead tot CRM-sync.

## 8. Fase A–C Roadmap: Marketing-site vs. RentGuy Onboarding

Voor Mister DJ is de marketing-site (`https://mr-dj.sevensa.nl`, Next.js) leidend. De RentGuy onboarding-portal (`https://mr-dj.rentguy.nl`) wordt in drie fases gekoppeld, zodat een kapotte onboarding-API nooit de marketing-ervaring breekt.

### Fase A – Marketing-site isoleren van gebroken RentGuy-calls

- Frontend-code (Next.js) bevat geen directe verwijzingen naar `mr-dj.rentguy.nl` of `/api/session` (gevalideerd via `rg "mr-dj.rentguy" frontend-nextjs`).
- GTM / consent:
  - Schakel in GTM alle tags uit die `mr-dj.rentguy.nl` of `frame_ant.js` aanspreken (zie `docs/marketing-consent-tracking.md`, sectie *Phase A*).
  - Zet eventuele CMP/Complianz services die scripts naar `mr-dj.rentguy.nl` injecteren op *uit* voor de marketing-site.
- Verificatie (prod of staging):
  - In een incognito-venster: geen Netwerk- of Console-entries meer richting `mr-dj.rentguy.nl`.
  - Marketing-routes `/nl`, `/nl/diensten/*`, `/nl/pakketten`, `/nl/steden/*` blijven volledig functioneren zonder CORS-fouten.

Fase A is geslaagd zodra de marketing-site stabiel draait, zonder browsercalls naar RentGuy.

### Fase B – Onboarding-/RentGuy-API correct maken (backend-gericht, toekomstige sprint)

Doel: een robuuste onboarding-API die veilig via backend/proxy wordt aangesproken.

- API-contract voor upstream `GET /api/session` op `mr-dj.rentguy.nl`:
  - Response type: JSON (geen HTML) wanneer de onboarding-portal klaar is.
  - Aanbevolen schema: sessie-ID, expiry, onboarding-URL, optionele statusvelden.
  - CORS headers toevoegen indien direct vanuit de browser benaderd wordt, maar **niet vereist** wanneer uitsluitend via server-side proxy wordt gewerkt.
- Server-side proxy op Mister DJ (✅ geïmplementeerd in Next.js frontend):
  - Nieuwe route: `GET /api/onboarding-session` in `frontend-nextjs/app/api/onboarding-session/route.ts`.
  - Configuratie via omgevingsvariabelen:
    - `RENTGUY_ONBOARDING_SESSION_URL` – volledige URL naar de sessie-endpoint.
    - of `RENTGUY_ONBOARDING_BASE_URL` – basis-URL; proxy gebruikt dan `${base}/api/session`.
  - Gedrag van `/api/onboarding-session`:
    - Bij ontbrekende configuratie → `503` met `{ "status": "error", "reason": "not-configured" }`.
    - Bij upstream-fout → `502` of `504` met `reason` (`upstream-<status>`, `timeout`, `upstream-error`).
    - Bij geldige JSON-response met `sessionId`/`id` en `onboardingUrl`/`url` → `200` met:
      - `{ "status": "ok", "sessionId", "onboardingUrl", "expiresAt"?: string }` en eventuele extra velden doorgelaten.
  - Timeouts/retries:
    - Upstream-call heeft een timeout van 5 seconden (AbortController).
    - Fouten worden gelogd via `console.error` met beperkte preview van de upstream-response.
- Tests:
  - Unit-tests voor de proxy/SDK (happy path + timeouts/errors).
  - Integratietest tegen een mock of staging van `mr-dj.rentguy.nl`.
  - Monitoring op error-ratio en latency voor onboarding-calls.

De frontend zal in deze fase nog geen nieuwe onboarding-widgets tonen; we richten ons eerst op een stabiele backend-laag.

### Fase C – Functioneel & UX-QA na (her)koppeling

Zodra Fase B staat en de backend/proxy stabiel is:

- Frontend-integratie:
  - Bouw een discrete onboarding-module (of CTA) die uitsluitend met `/api/onboarding-session` praat.
  - Houd foutafhandeling vriendelijk: duidelijke statusmeldingen, geen blokkerende spinners.
  - Zorg dat de marketing-flow bruikbaar blijft zelfs als onboarding tijdelijk niet beschikbaar is (fallback CTA, e-mailcontact).
- Live QA op `https://mr-dj.sevensa.nl`:
  - Hoofdflows testen: home, diensten, pakketten, steden, contact/availability én onboarding CTA.
  - DevTools controleren:
    - Geen CORS-fouten.
    - Geen 4xx/5xx voor `_next/static/*`, `/assets/*`, `/api/*`.
  - UX-controle: consistent design met de marketing-site (typografie, spacing, knoppen, video testimonials).
- Rapportage:
  - Resultaten van deze fases vastleggen in `STAGING-VALIDATION-STATUS.md` en `DEPLOYMENT_LOG.md`.
  - Bekende beperkingen en next steps toevoegen aan `SALES_READY_REPORT.md`.

Deze roadmap borgt dat RentGuy/onboarding pas weer in de browser verschijnt nadat de API en proxy-laag productierijp zijn, terwijl de marketing-site nu al stabiel en klantgericht blijft.
