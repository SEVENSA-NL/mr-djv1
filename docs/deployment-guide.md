# 🚀 Mister DJ – k3s + Next.js Deployment Guide

This guide documents the **current, canonical deployment path** for the
`mr-dj.sevensa.nl` site using:

  - **Next.js 15 app router** in `frontend-nextjs/`
  - **k3s** as the Kubernetes distribution (Traefik ingress)
  - **GHCR** (`ghcr.io/crisisk/mr-dj-frontend`) as container registry

Legacy Vite/Netlify/docker‑compose flows are considered **obsolete** for
production and are no longer described here.

---

## 1. Architecture Overview

- **Frontend**
  - Code: `frontend-nextjs/`
  - Runtime: Next.js standalone build (`node server.js`)
  - Image: `ghcr.io/crisisk/mr-dj-frontend:nextjs-standalone-<tag>`
  - k3s namespace: `default`
  - K8s manifests: `infra/k8s/frontend-nextjs.yaml`

- **Backend**
  - Code: `backend/` (separate deployment, `misterdj` namespace)
  - Health endpoints: `/health` and `/api/health`
  - Used by Next.js API routes `/api/contact` and `/api/availability`

- **Ingress / TLS**
  - IngressClass: `traefik` (default in k3s)
  - Staging host: `staging.sevensa.nl`
  - Production host: `mr-dj.sevensa.nl`
  - Frontend service: `mr-dj-frontend` (port 80 → container port 3000)

---

## 2. Prerequisites

- You are on the k3s node (or have `kubectl` configured for the k3s cluster).
- You can run Docker builds and push to GHCR as `crisisk`.
- `GHCR_PAT` (token with `read:packages,write:packages`) is available in
  your shell environment.

Environment variables (example):

```bash
export REGISTRY_IMAGE="ghcr.io/crisisk/mr-dj-frontend"
export IMAGE_TAG="nextjs-standalone-20251209"
export FULL_IMAGE="${REGISTRY_IMAGE}:${IMAGE_TAG}"
```

---

## 3. Build & Push the Next.js Frontend Image

From the project root on the deployment host:

```bash
cd /srv/apps/mr-djv1/frontend-nextjs

# Install dependencies and build (idempotent)
pnpm install --frozen-lockfile
pnpm build

# Build the standalone Next.js image
docker build -t "${FULL_IMAGE}" .

# Login to GHCR (once per shell)
echo "${GHCR_PAT}" | docker login ghcr.io -u crisisk --password-stdin

# Push image to registry
docker push "${FULL_IMAGE}"
```

Result: `ghcr.io/crisisk/mr-dj-frontend:<tag>` is available for k3s.

---

## 4. Deploy / Update on k3s

### 4.1 First‑time apply (or when recreating resources)

Apply the canonical manifests:

```bash
cd /srv/apps/mr-djv1
kubectl apply -f infra/k8s/frontend-nextjs.yaml
```

This creates/updates:

- `Deployment/mr-dj-frontend` (namespace `default`)
- `Service/mr-dj-frontend`
- `Ingress/mr-dj-frontend` (Traefik, `staging.sevensa.nl` and `mr-dj.sevensa.nl`)

### 4.2 Rolling out a new image tag

Update the running deployment to the freshly built tag:

```bash
kubectl -n default set image deployment/mr-dj-frontend \
  mr-dj-frontend="${FULL_IMAGE}"

kubectl -n default rollout status deployment/mr-dj-frontend
```

If rollout fails, inspect:

```bash
kubectl -n default get pods -l app=mr-dj-frontend
kubectl -n default logs deploy/mr-dj-frontend --tail=100
```

---

## 5. Health Checks & Verification

### 5.1 Pod and service status

```bash
kubectl -n default get deploy,po,svc | grep mr-dj-frontend
```

Expected:

- Deployment ready replicas = 2
- Pods `Running`
- Service `mr-dj-frontend` listening on port 80

### 5.2 Ingress routing

```bash
kubectl -n default get ingress mr-dj-frontend
kubectl -n default get ingress mr-dj-prod
```

Externally (from the node or any client):

```bash
curl -k -I https://staging.sevensa.nl/
curl -k -I https://mr-dj.sevensa.nl/
```

Both should return `HTTP/2 200` (or `307` to `/nl`) with `x-powered-by: Next.js`.

### 5.3 Application health

Next.js exposes `/api/health` for readiness/liveness:

```bash
curl -k https://mr-dj.sevensa.nl/api/health
curl -k https://staging.sevensa.nl/api/health
```

Expected: JSON payload with status `ok` and basic metadata.

---

## 6. Local Smoke Tests (optional but recommended)

Before pushing a new image to production:

```bash
cd /srv/apps/mr-djv1/frontend-nextjs

# Run unit tests
pnpm test

# Run Next.js build (already done above)
pnpm build

# Run Playwright smoke against local dev or staging
pnpm test:e2e-smoke
# or, for staging:
pnpm test:e2e-staging
```

Key routes to validate:

- `/nl`, `/en`
- `/nl/diensten`, `/en/diensten`
- `/nl/diensten/*`, `/en/diensten/*`
- `/nl/pakketten`, `/en/pakketten`
- `/nl/steden`, `/en/steden`
- Representative city pages, e.g. `/nl/eindhoven`

---

## 7. Production Go‑Live Checklist (k3s)

Pre‑deployment:

- [x] Frontend image built and pushed (`${FULL_IMAGE}`)
- [x] `infra/k8s/frontend-nextjs.yaml` applied
- [x] Backends (`misterdj-backend`, Postgres, Redis) healthy
- [x] GHCR pull secret (`ghcr-crisisk`) present in `default` namespace

Post‑deployment:

- [ ] `kubectl -n default get deploy mr-dj-frontend` shows desired/available replicas match
- [ ] `curl -k https://mr-dj.sevensa.nl/` returns the new hero/pricing/city design
- [ ] `/api/health` returns `200` on staging and production
- [ ] Lighthouse mobile score ≥ 90 on `/nl` and `/nl/diensten/bruiloft-dj`
- [ ] GA4/PostHog events appear for `lead_contact`, `lead_availability`, `video_play`

---

## 8. k3s‑Aware Rollback (Frontend)

If a new image introduces regressions:

1. **Identify previous working tag** (e.g. from `kubectl` or git tags).
2. **Roll back image:**

   ```bash
   export PREV_TAG="nextjs-standalone-20251208"
   export PREV_IMAGE="${REGISTRY_IMAGE}:${PREV_TAG}"

   kubectl -n default set image deployment/mr-dj-frontend \
     mr-dj-frontend="${PREV_IMAGE}"

   kubectl -n default rollout status deployment/mr-dj-frontend
   ```

3. **Re‑run smoke tests** on production hostnames.

Backend/database rollback is handled via the backend runbook and migrations;
this document focuses on the **Next.js frontend**.

---

## 9. Expected URLs

- Production:
  - `https://mr-dj.sevensa.nl/` → 307 → `/nl`
  - `https://mr-dj.sevensa.nl/nl`
  - `https://mr-dj.sevensa.nl/en`
  - `https://mr-dj.sevensa.nl/nl/diensten/*`
  - `https://mr-dj.sevensa.nl/nl/pakketten`
  - `https://mr-dj.sevensa.nl/nl/steden`

- Staging:
  - `https://staging.sevensa.nl/` (same routes, staging data)

---

Generated: 2025-12-09  
Status: ✅ k3s + Next.js deployment path canonical
