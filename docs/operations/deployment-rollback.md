# Deployment Rollback & Hotfix Runbook

This runbook documents how to capture reproducible release artifacts, determine whether to execute a rollback or a hotfix, and safely restore the previous production version of Mister DJ services.

## 1. Capture Release Artifacts Before Deploying (k3s + GHCR)

Always create a restorable snapshot of the release you are about to ship. This ensures you can promote the same artifact again or quickly roll back.

1. **Tag and push Docker images to GHCR**
   ```bash
   export REGISTRY_IMAGE_FE="ghcr.io/crisisk/mr-dj-frontend"
   export REGISTRY_IMAGE_BE="ghcr.io/crisisk/misterdj-backend"
   export RELEASE_TAG="nextjs-standalone-YYYYMMDDHHMM"

   # Frontend (from /srv/apps/mr-djv1/frontend-nextjs)
   docker build -t ${REGISTRY_IMAGE_FE}:${RELEASE_TAG} .
   docker push ${REGISTRY_IMAGE_FE}:${RELEASE_TAG}

   # Backend (from backend repo)
   docker build -t ${REGISTRY_IMAGE_BE}:${RELEASE_TAG} .
   docker push ${REGISTRY_IMAGE_BE}:${RELEASE_TAG}
   ```
   - Kies een semantische versie of tijdstempel-gebaseerde `${RELEASE_TAG}`.
   - Noteer de gebruikte tags in het deploymentlogboek.

2. **Archive relevante configuratie en documentatie**
   ```bash
   mkdir -p artifacts
   tar -czf artifacts/${RELEASE_TAG}-k3s-config.tar.gz \
       infra/k8s/frontend-nextjs.yaml \
       docs/deployment-guide.md \
       docs/operations/deployment-rollback.md
   sha256sum artifacts/${RELEASE_TAG}-k3s-config.tar.gz >> artifacts/SHA256SUMS.txt
   ```
   - Sla archives op in een `artifacts/` bucket of andere veilige offsite locatie.
   - Voeg eventuele migratiescripts of handmatige wijzigingslogs toe die voor deze release gelden.

3. **Snapshot database and stateful services**
   - Trigger managed backups or run `pg_dump` against the production database.
   - Confirm that snapshot verification jobs succeeded before proceeding.

## 2. Decide: Rollback or Hotfix?

Use the decision tree below to choose the correct recovery strategy.

### Quick Decision Tree

- **Is production down or customer-impacting within the last 30 minutes?**
  - **Yes:** Roll back immediately.
  - **No:** Continue.
- **Can the issue be mitigated by configuration or feature flag without code changes?**
  - **Yes:** Ship a configuration hotfix (no redeploy needed).
  - **No:** Continue.
- **Is there a low-risk patch that can be validated within 15 minutes?**
  - **Yes:** Prepare a hotfix build from `main` or a dedicated branch and redeploy.
  - **No:** Roll back to the previous known-good artifact.

### Prerequisites Before Rollback or Hotfix

1. **Backup validation**
   - Confirm the latest automated backup (database + storage) is marked `verified` in the backup dashboard.
   - If not, run an ad-hoc backup and verify restore on a staging environment.

2. **Traffic switch planning**
   - Notify stakeholders in the #ops Slack channel.
   - If using load balancers or CDN, prepare to drain traffic or toggle maintenance pages.
   - Ensure observability alerts are acknowledged to avoid duplicate paging.

3. **Communication steps**
   - Assign a single incident coordinator.
   - Update the status page with an incident banner.
   - Inform customer support and account managers about the expected impact and ETA.

### Choosing the Action

| Condition | Rollback | Hotfix |
| --- | --- | --- |
| Issue caused by deployment artifact (image/config) | ✅ | ⚪ |
| Issue requires code change | ⚪ | ✅ |
| Time-to-recover target < 15 min | ✅ | ⚪ |
| Regression present in prior release | ⚪ | ✅ |
| Regression isolated to new infrastructure change | ✅ | ⚪ |

## 3. Rollback Procedure (k3s)

1. **Schakel indien nodig naar maintenance modus**
   - Voor puur frontend-gerelateerde issues volstaat meestal een image rollback zonder expliciete maintenance pagina.
   - Bij kritieke backendproblemen: volg de backend-specifieke runbooks (onder `backend/docs/` indien aanwezig) om een maintenance modus te activeren.

2. **Zet de frontend terug naar een vorige image tag**

   ```bash
   export REGISTRY_IMAGE_FE="ghcr.io/crisisk/mr-dj-frontend"
   export PREVIOUS_TAG="nextjs-standalone-<known-good>"
   export PREVIOUS_IMAGE="${REGISTRY_IMAGE_FE}:${PREVIOUS_TAG}"

   kubectl -n default set image deployment/mr-dj-frontend \
     mr-dj-frontend="${PREVIOUS_IMAGE}"

   kubectl -n default rollout status deployment/mr-dj-frontend
   kubectl -n default get pods -l app=mr-dj-frontend
   ```

   - Gebruik de laatst bekende werkende tag uit het deploymentlogboek.

3. **(Optioneel) Backend rollback**

   Indien de regressie door een backend image wordt veroorzaakt:

   ```bash
   export REGISTRY_IMAGE_BE="ghcr.io/crisisk/misterdj-backend"
   export PREVIOUS_BE_TAG="<known-good>"
   export PREVIOUS_BE_IMAGE="${REGISTRY_IMAGE_BE}:${PREVIOUS_BE_TAG}"

   kubectl -n misterdj set image deployment/misterdj-backend \
     misterdj-backend="${PREVIOUS_BE_IMAGE}"

   kubectl -n misterdj rollout status deployment/misterdj-backend
   ```

   - MIGRATIE-rollback alleen uitvoeren als deze expliciet vereist is in de backend runbooks; standaard backwards-compatibel houden.

4. **Controleer routing en health na rollback**

   ```bash
   curl -k https://mr-dj.sevensa.nl/api/health
   curl -k https://staging.sevensa.nl/api/health
   kubectl -n default logs deploy/mr-dj-frontend --tail=100
   kubectl -n misterdj logs deploy/misterdj-backend --tail=100
   ```

## 4. Hotfix Procedure (if chosen)

1. Branch from the last known good commit or `main`.
2. Implement the minimal fix and add automated coverage.
3. Build images and tag with `${HOTFIX_TAG}`.
4. Validate on staging, then deploy via `./deploy.sh` using the hotfix artifacts.
5. Monitor metrics for at least one full request cycle (5–10 minutes).

## 5. Post-Rollback Verification

Run the following checks immediately after deployments are healthy:

```bash
kubectl -n default get deploy,po | grep mr-dj-frontend
kubectl -n misterdj get deploy,po | grep misterdj-backend

curl -f https://staging.sevensa.nl/api/health | jq
curl -f https://mr-dj.sevensa.nl/api/health | jq

cd /srv/apps/mr-djv1/frontend-nextjs
pnpm test:e2e-staging
```

- Bevestig dat health endpoints `200` en het verwachte JSON-payload retourneren.
- Voer handmatige smoke-tests uit voor booking- en contactflows op staging en productie.
- Review monitoring dashboards voor error-rate regressies.

## 6. Communication & Follow-Up

1. Post an incident resolution summary in #ops and update the status page.
2. Create a retro issue capturing:
   - Root cause analysis.
   - Detection gaps.
   - Action items to prevent recurrence.
3. Attach artifact hashes and migration decisions to the deployment record in the release log.

Keep this document updated whenever deployment tooling or infrastructure changes so operators always have a current recovery path.
