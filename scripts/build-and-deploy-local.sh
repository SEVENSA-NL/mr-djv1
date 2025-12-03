#!/bin/bash
#
# MisterDJ - Local Build and Deploy Script (Buildah + K3s)
# Builds images locally with buildah and loads them directly into K3s
# Based on PSRA deployment workflow
#
# Usage: ./scripts/build-and-deploy-local.sh
#

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Image names
BACKEND_IMAGE="misterdj-backend"
FRONTEND_IMAGE="misterdj-frontend"
BACKEND_TAG="fixed-${TIMESTAMP}"
FRONTEND_TAG="fixed-${TIMESTAMP}"

# Kubernetes
K8S_NAMESPACE="misterdj"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_section() {
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
}

log_section "MisterDJ Local Build and Deploy"
echo "Timestamp: $TIMESTAMP"
echo "Project: $PROJECT_ROOT"
echo ""

# Build Backend
log_section "Building Backend"
cd "$PROJECT_ROOT"
log_info "Building: ${BACKEND_IMAGE}:${BACKEND_TAG}"

buildah bud \
    -t "${BACKEND_IMAGE}:${BACKEND_TAG}" \
    -t "${BACKEND_IMAGE}:latest" \
    -f backend/Dockerfile \
    backend 2>&1 | tee "/tmp/backend-build-${TIMESTAMP}.log" | tail -50

log_success "Backend built"

# Build Frontend
log_section "Building Frontend"
cd "$PROJECT_ROOT"
log_info "Building: ${FRONTEND_IMAGE}:${FRONTEND_TAG}"

buildah bud \
    -t "${FRONTEND_IMAGE}:${FRONTEND_TAG}" \
    -t "${FRONTEND_IMAGE}:latest" \
    -f frontend/Dockerfile \
    frontend 2>&1 | tee "/tmp/frontend-build-${TIMESTAMP}.log" | tail -50

log_success "Frontend built"

# Export and Import into K3s
log_section "Loading Images into K3s"

log_info "Exporting backend image..."
buildah push "${BACKEND_IMAGE}:${BACKEND_TAG}" \
    oci-archive:"/tmp/backend-${TIMESTAMP}.tar"

log_info "Loading backend into K3s..."
k3s ctr images import "/tmp/backend-${TIMESTAMP}.tar"

log_info "Exporting frontend image..."
buildah push "${FRONTEND_IMAGE}:${FRONTEND_TAG}" \
    oci-archive:"/tmp/frontend-${TIMESTAMP}.tar"

log_info "Loading frontend into K3s..."
k3s ctr images import "/tmp/frontend-${TIMESTAMP}.tar"

log_success "Images loaded into K3s"

# Clean up tar files
rm -f "/tmp/backend-${TIMESTAMP}.tar" "/tmp/frontend-${TIMESTAMP}.tar"

# Update Deployments
log_section "Deploying to Kubernetes"

log_info "Updating backend deployment..."
kubectl set image deployment/misterdj-backend \
    -n ${K8S_NAMESPACE} \
    backend="docker.io/library/${BACKEND_IMAGE}:${BACKEND_TAG}" \
    --record=false

kubectl patch deployment misterdj-backend \
    -n ${K8S_NAMESPACE} \
    -p '{"spec":{"template":{"spec":{"containers":[{"name":"backend","imagePullPolicy":"Never"}]}}}}'

log_info "Waiting for backend rollout..."
kubectl rollout status deployment/misterdj-backend -n ${K8S_NAMESPACE} --timeout=300s

log_success "Backend deployed"

log_info "Updating frontend deployment..."
kubectl set image deployment/misterdj-frontend \
    -n ${K8S_NAMESPACE} \
    frontend="docker.io/library/${FRONTEND_IMAGE}:${FRONTEND_TAG}" \
    --record=false

kubectl patch deployment misterdj-frontend \
    -n ${K8S_NAMESPACE} \
    -p '{"spec":{"template":{"spec":{"containers":[{"name":"frontend","imagePullPolicy":"Never"}]}}}}'

log_info "Waiting for frontend rollout..."
kubectl rollout status deployment/misterdj-frontend -n ${K8S_NAMESPACE} --timeout=300s

log_success "Frontend deployed"

# Verify
log_section "Verifying Deployment"

log_info "Backend pods:"
kubectl get pods -n ${K8S_NAMESPACE} -l app=misterdj,tier=api

echo ""
log_info "Frontend pods:"
kubectl get pods -n ${K8S_NAMESPACE} -l app=misterdj,tier=frontend

echo ""
log_info "Testing health endpoint..."
sleep 5

BACKEND_POD=$(kubectl get pods -n ${K8S_NAMESPACE} -l app=misterdj,tier=api -o jsonpath='{.items[0].metadata.name}')
if [ -n "$BACKEND_POD" ]; then
    if kubectl exec -n ${K8S_NAMESPACE} "$BACKEND_POD" -- wget -q -O- http://localhost:3000/health 2>/dev/null | grep -q "ok"; then
        log_success "Backend health check passed"
    else
        log_error "Backend health check failed"
    fi
else
    log_error "No backend pod found"
fi

# Summary
log_section "Deployment Complete"

echo "Backend:  ${BACKEND_IMAGE}:${BACKEND_TAG}"
echo "Frontend: ${FRONTEND_IMAGE}:${FRONTEND_TAG}"
echo ""
echo "Build logs:"
echo "  - /tmp/backend-build-${TIMESTAMP}.log"
echo "  - /tmp/frontend-build-${TIMESTAMP}.log"
echo ""
echo "Next steps:"
echo "  - Monitor pods: kubectl get pods -n misterdj -w"
echo "  - Check logs: kubectl logs -n misterdj deployment/misterdj-backend"
echo "  - View events: kubectl get events -n misterdj --sort-by='.lastTimestamp'"
echo ""

log_success "All done!"
