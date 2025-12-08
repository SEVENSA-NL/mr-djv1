import { defineConfig } from '@playwright/test';

const PORT = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  timeout: 60_000,
  use: {
    baseURL,
    headless: true,
  },
  webServer: {
    command:
      'bash -c "npm run build && rm -rf .next/standalone/public .next/standalone/.next/static && cp -r public .next/standalone/public && cp -r .next/static .next/standalone/.next/static && node .next/standalone/server.js"',
    url: baseURL,
    reuseExistingServer: true,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 120_000,
    env: {
      PORT: String(PORT),
      HOSTNAME: '0.0.0.0',
    },
  },
  testDir: 'tests/e2e',
});
