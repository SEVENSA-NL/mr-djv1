import { test, expect } from '@playwright/test';

test.setTimeout(90_000);

const routes = [
  '/nl',
  '/en',
  '/nl/diensten',
  '/nl/diensten/bruiloft-dj',
  '/nl/diensten/bedrijfsfeest-dj',
  '/nl/diensten/feest-dj',
  '/nl/pakketten',
  '/nl/steden',
  '/nl/eindhoven',
  '/en/diensten',
  '/en/diensten/bruiloft-dj',
  '/en/diensten/bedrijfsfeest-dj',
  '/en/diensten/feest-dj',
  '/en/pakketten',
  '/en/steden',
];

for (const route of routes) {
  test(`renders ${route}`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
  });
}

const structuredDataChecks: { route: string; expectedType: string }[] = [
  { route: '/en/diensten/bruiloft-dj', expectedType: 'Service' },
  { route: '/en/diensten/bedrijfsfeest-dj', expectedType: 'Service' },
  { route: '/en/diensten/feest-dj', expectedType: 'Service' },
  { route: '/en/pakketten', expectedType: 'Offer' },
];

for (const check of structuredDataChecks) {
  test(`structured data present on ${check.route}`, async ({ page }) => {
    await page.goto(check.route, { waitUntil: 'domcontentloaded' });
    const scripts = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
      nodes.map((n) => n.textContent || '')
    );

    expect(scripts.length).toBeGreaterThan(0);

    const hasExpectedType = scripts.some((raw) => {
      try {
        const json = JSON.parse(raw);
        const type = Array.isArray(json?.['@type']) ? json['@type'] : [json?.['@type']];
        return type.some((t) => typeof t === 'string' && t.toLowerCase().includes(check.expectedType.toLowerCase()));
      } catch {
        return raw.includes(check.expectedType);
      }
    });

    expect(hasExpectedType).toBeTruthy();
  });
}
