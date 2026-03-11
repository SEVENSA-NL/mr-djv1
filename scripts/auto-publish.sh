#!/bin/bash
# Auto-publish script for Mister DJ blog posts.
# Runs weekly via cron. Rebuilds the Next.js app so that posts
# whose publishedAt date has passed become visible.
#
# The script picks a random delay (0-600 minutes, i.e. 0-10 hours)
# within the 09:00-19:00 window to make publication times look organic.

set -euo pipefail

LOG="/var/log/mr-dj-auto-publish.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"
}

# Random delay within 0-600 minutes (cron fires at 09:00, delay up to 10h = 19:00)
DELAY_MINUTES=$((RANDOM % 601))
log "Scheduled rebuild in ${DELAY_MINUTES} minutes"
sleep "${DELAY_MINUTES}m"

log "Starting build..."

cd /srv/apps/mr-dj-frontend

# Build
if docker build -t localhost:5000/mr-dj-frontend:latest . >> "$LOG" 2>&1; then
  log "Build succeeded"
else
  log "ERROR: Build failed"
  exit 1
fi

# Push
if docker push localhost:5000/mr-dj-frontend:latest >> "$LOG" 2>&1; then
  log "Push succeeded"
else
  log "ERROR: Push failed"
  exit 1
fi

# Deploy
if kubectl rollout restart deployment/mr-dj-frontend >> "$LOG" 2>&1; then
  log "Rollout restart triggered"
else
  log "ERROR: Rollout restart failed"
  exit 1
fi

log "Auto-publish complete"
