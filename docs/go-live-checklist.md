# Mister DJ Website Go-Live Checklist

Deze checklist beschrijft **alle stappen** om de Mister DJ website productieklaar te maken en live te zetten. Doorloop de fases in volgorde en vink iedere stap af.

## 1. Voorbereiding
- [ ] Controleer dat je op de laatste `main` branch zit: `git pull origin main`
- [ ] Vul een productie `.env` bestand in gebaseerd op [`backend/.env.example`](../backend/.env.example) en plaats dit als `backend/.env` **alleen op de k3s backend-node**
- [ ] Controleer dat alle DNS-records naar de nieuwe infrastructuur wijzen (`staging.sevensa.nl` en `mr-dj.sevensa.nl` → k3s Traefik IP)
- [ ] Zorg dat je toegang hebt tot de k3s cluster (`kubectl` context juist) en de GHCR registry (`ghcr.io/crisisk`)

## 2. Lokale validatie (Next.js + backend)
- [ ] Installeer backend dependencies: `cd backend && npm ci`
- [ ] Draai de volledige backend test-suite: `npm test -- --runInBand`
- [ ] Valideer de Next.js frontend lokaal:
  - [ ] `cd frontend-nextjs && pnpm install --frozen-lockfile`
  - [ ] `pnpm test`
  - [ ] `pnpm build`
- [ ] Start optioneel een lokale dev-server voor een snelle UX-check: `pnpm dev` en bezoek `http://localhost:3000`

## 3. Database en backend op k3s
- [ ] Verifieer dat de `misterdj` namespace actief is: `kubectl get ns misterdj`
- [ ] Controleer dat Postgres en Redis draaien:
  - `kubectl -n misterdj get deploy misterdj-postgres misterdj-redis`
- [ ] Controleer dat de backend deployment gezond is:
  - `kubectl -n misterdj get deploy misterdj-backend`
  - `kubectl -n misterdj logs deploy/misterdj-backend --tail=50`
- [ ] Voer (indien nodig) migraties uit via de backend runbook / CI (niet meer via lokale docker-compose)

## 4. Configuratie dashboard (staging.sevensa.nl/dashboard)
- [ ] Zet de `CONFIG_DASHBOARD_*` variabelen in `.env` zodat het dashboard geactiveerd wordt
- [ ] Navigeer naar `https://staging.sevensa.nl/dashboard` en log in met de ingestelde Basic Auth inloggegevens
- [ ] Vul alle verplichte variabelen (database, Redis, service naam, rate limit etc.) in en sla op
- [ ] Open de tab **RentGuy integratie**, vul `RENTGUY_API_BASE_URL`, `RENTGUY_API_KEY`, `RENTGUY_WORKSPACE_ID` en controleer dat de statusindicator "API geconfigureerd" toont
- [ ] Controleer in de RentGuy statuskaart dat de queue-grootte `0` is en gebruik eventueel **Queue flushen** om wachtrij-items te verwerken
- [ ] Vul (indien gebruikt) `N8N_PERSONALIZATION_WEBHOOK_URL` in zodat CRO-events naar n8n worden doorgestuurd en herlaad het dashboard
- [ ] Open de tab **Feature flags** en bevestig dat `FLAG_PERSONALIZATION`, `FLAG_RENTGUY_INTEGRATION`, `FLAG_SEVENSA_INTEGRATION` en `FLAG_TELEMETRY` ingeschakeld zijn (deze toggles worden opgeslagen in `managed.env` en zijn ook via `FLAG_*` omgevingsvariabelen aan te passen)
- [ ] Open `/api/health` en verifieer dat `dependencies.integrations.personalization.automationWebhookConfigured` `true` is wanneer de webhook actief moet zijn
- [ ] Controleer dat de status-indicatoren groen kleuren en de `managed.env` op de server is bijgewerkt (`docker exec mr-dj-backend cat /app/managed.env`)
- [ ] Herlaad de health endpoint (`/api/health`) en verifieer dat de database status `connected: true` toont

## 5. Backend en frontend deployen (k3s + Next.js)
- [ ] Build en push de Next.js image naar GHCR (zie `docs/deployment-guide.md`):
  - `cd frontend-nextjs`
  - `pnpm build`
  - `docker build -t ghcr.io/crisisk/mr-dj-frontend:nextjs-standalone-<tag> .`
  - `docker push ghcr.io/crisisk/mr-dj-frontend:nextjs-standalone-<tag>`
- [ ] Zorg dat de GHCR pull secret aanwezig is in de `default` namespace: `kubectl -n default get secret ghcr-crisisk`
- [ ] Pas de manifests toe (of update): `kubectl apply -f infra/k8s/frontend-nextjs.yaml`
- [ ] Update de deployment naar de nieuwe tag:
  - `kubectl -n default set image deployment/mr-dj-frontend mr-dj-frontend=ghcr.io/crisisk/mr-dj-frontend:nextjs-standalone-<tag>`
  - `kubectl -n default rollout status deployment/mr-dj-frontend`
- [ ] Houd de [rollback & hotfix runbook](operations/deployment-rollback.md) bij de hand voor snelle herstelacties indien de uitrol faalt

## 6. Post-deployment validatie (staging + productie)
- [ ] Controleer de health-endpoints:
  - `curl -s https://staging.sevensa.nl/api/health | jq`
  - `curl -s https://mr-dj.sevensa.nl/api/health | jq`
- [ ] Voer een test-booking en contactformulier in en verifieer dat de responses `success: true` bevatten
- [ ] Controleer K8s logging:
  - `kubectl -n misterdj logs deploy/misterdj-backend --tail=100`
  - `kubectl -n default logs deploy/mr-dj-frontend --tail=100`
- [ ] Controleer dat de frontend pods gezond zijn:
  - `kubectl -n default get deploy,po | grep mr-dj-frontend`
- [ ] Bezoek de live site en valideer de belangrijkste pagina-secties (hero, pakketten, reviews, contactformulier) op:
  - `https://staging.sevensa.nl/nl`
  - `https://mr-dj.sevensa.nl/nl`

## 7. Monitoring & nazorg
- [ ] Schakel Traefik/Let’s Encrypt monitoring notificaties in
- [ ] Activeer (optioneel) Netlify Analytics en stel alerts in voor CDN-fouten
- [ ] Plan periodieke back-ups van de Postgres database (`pg_dump` + offsite opslag)

## 8. Laatste debug & UAT
- [ ] Draai de volledige test-suite met coverage rapportage: `cd backend && npm test -- --coverage --runInBand`
- [ ] Controleer dat de totale testcoverage minimaal 95% is (zie `backend/coverage/lcov-report/index.html` of de CLI-output)
- [ ] Documenteer eventuele openstaande bevindingen en bevestig dat alle blokkades verholpen zijn voor de launch

Wanneer iedere checkbox is afgevinkt is de site klaar voor productiegebruik. Bewaar deze checklist bij de release-notes zodat toekomstige deploys dezelfde kwaliteit behouden.
