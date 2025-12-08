import { defineConfig } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'https://staging.sevensa.nl';

export default defineConfig({
  timeout: 60_000,
  use: {
    baseURL,
    headless: true,
    ignoreHTTPSErrors: true,
  },
  testDir: 'tests/e2e',
});
