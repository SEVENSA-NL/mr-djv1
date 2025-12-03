FROM node:20.19.0-alpine AS base

WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# Install runtime dependencies
RUN apk add --no-cache curl

# Install npm dependencies with a clean lockfile install
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:${PORT}/health || exit 1

CMD ["node", "src/server.js"]
