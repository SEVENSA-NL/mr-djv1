FROM node:20.19.0-alpine AS base

WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# Install runtime dependencies
RUN apk add --no-cache curl

# Build from the repository root so the runtime receives the exact content and
# feature-flag files that backend modules resolve outside /app.
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

RUN mkdir -p /app/app/templates /config /content /scripts /docs \
    && chown -R node:node /app /config /content /scripts /docs

COPY --chown=node:node backend/src ./src
COPY --chown=node:node backend/app/templates ./app/templates
COPY --chown=node:node config/feature-flags.json /config/feature-flags.json
COPY --chown=node:node content /content
COPY --chown=node:node scripts/generate-city-pages.mjs /scripts/generate-city-pages.mjs

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:${PORT}/health || exit 1

CMD ["node", "src/server.js"]
