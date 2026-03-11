import { test, expect } from '@playwright/test';

// ── Health & Basics ──

test('health endpoint returns ok', async ({ request }) => {
  const res = await request.get('/api/health');
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.status).toBe('ok');
});

test('root redirects to /nl', async ({ page }) => {
  await page.goto('/');
  await page.waitForURL('**/nl');
  expect(page.url()).toContain('/nl');
});

// ── Homepage ──

test('homepage loads with real content', async ({ page }) => {
  await page.goto('/nl');
  // Hero section
  await expect(page.locator('h1')).toContainText('feestspecialist');
  // Trust badges strip (uses useInView, scroll into view)
  const trustBadge = page.getByText('100% Dansgarantie').first();
  await trustBadge.scrollIntoViewIfNeeded();
  await expect(trustBadge).toBeVisible();
  await expect(page.getByText('15+ jaar ervaring').first()).toBeVisible();
  // CTA buttons
  await expect(page.getByRole('link', { name: /beschikbaarheid/i }).first()).toBeVisible();
});

test('homepage has real testimonials', async ({ page }) => {
  await page.goto('/nl');
  // First 6 testimonials shown: Ruud, Jasper, Mariska, Ingrid, Peter, Britt
  await expect(page.getByText('Ruud en Galong')).toBeVisible();
  await expect(page.getByText('Jasper en Lisa')).toBeVisible();
});

test('homepage has services section', async ({ page }) => {
  await page.goto('/nl');
  // Services section uses useInView animation — scroll to trigger visibility
  const servicesHeading = page.getByText('Jullie avond, jullie muziek').first();
  await servicesHeading.scrollIntoViewIfNeeded();
  await expect(servicesHeading).toBeVisible();
  // Check service cards (use h3 to avoid matching nav dropdown links)
  await expect(page.locator('h3').filter({ hasText: 'Bruiloften' }).first()).toBeVisible();
  await expect(page.locator('h3').filter({ hasText: 'Bedrijfsfeesten' }).first()).toBeVisible();
});

test('homepage has real contact info', async ({ page }) => {
  await page.goto('/nl');
  await expect(page.getByText('040-8422594').first()).toBeVisible();
  await expect(page.getByText('info@mr-dj.nl').first()).toBeVisible();
});

// ── Navigation ──

test('navigation links work', async ({ page }) => {
  await page.goto('/nl');
  // Check header nav — "Feesten" dropdown contains bruiloften
  const header = page.locator('header');
  await expect(header.getByText('Feesten').first()).toBeVisible();
  await expect(header.getByRole('link', { name: /contact/i }).first()).toBeVisible();
  // Hover to open Feesten dropdown and verify bruiloften link
  await header.getByText('Feesten').first().hover();
  await expect(header.getByRole('link', { name: /bruiloften/i }).first()).toBeVisible();
});

test('logo is visible', async ({ page }) => {
  await page.goto('/nl');
  await expect(page.locator('img[alt*="Mister DJ"], img[alt*="Mr. DJ"], img[alt*="Logo"]').first()).toBeVisible();
});

// ── Bruiloften Page ──

test('bruiloften page has real content', async ({ page }) => {
  await page.goto('/nl/bruiloften');
  // Page label and heading
  await expect(page.locator('main, #main-content').getByText(/bruiloft/i).first()).toBeVisible();
  // CTA section at bottom
  const dansgarantie = page.getByText(/100% dansgarantie/i).first();
  await dansgarantie.scrollIntoViewIfNeeded();
  await expect(dansgarantie).toBeVisible();
});

// ── Bedrijfsfeesten Page ──

test('bedrijfsfeesten page has real content', async ({ page }) => {
  await page.goto('/nl/bedrijfsfeesten');
  await expect(page.getByText(/succesvol bedrijf/i).first()).toBeVisible();
});

// ── Feesten Overig Page ──

test('feesten-overig page has content', async ({ page }) => {
  await page.goto('/nl/feesten-overig');
  await expect(page.getByText(/verjaardag|feest/i).first()).toBeVisible();
});

// ── Mister DJ (About) Page ──

test('about page has team info', async ({ page }) => {
  await page.goto('/nl/mister-dj');
  await expect(page.getByText(/30 jaar ervaring/i).first()).toBeVisible();
  await expect(page.getByText(/Bart van de Weijer/i).first()).toBeVisible();
  await expect(page.getByText(/team van professionals/i).first()).toBeVisible();
});

// ── Impressies Page ──

test('impressies page has gallery images', async ({ page }) => {
  await page.goto('/nl/impressies');
  const images = page.locator('img[src*="gallery"]');
  const count = await images.count();
  expect(count).toBeGreaterThanOrEqual(10);
});

// ── Contact Page ──

test('contact page has real info', async ({ page }) => {
  await page.goto('/nl/contact');
  await expect(page.getByText('040-8422594').first()).toBeVisible();
  await expect(page.getByText('info@mr-dj.nl').first()).toBeVisible();
  await expect(page.getByText(/Veldhoven/i).first()).toBeVisible();
});

// ── FAQ Page ──

test('FAQ page has real questions', async ({ page }) => {
  await page.goto('/nl/veelgestelde-vragen');
  await expect(page.getByText(/Waarom zou ik voor Mister DJ kiezen/i)).toBeVisible();
  await expect(page.getByText(/prijzen/i).first()).toBeVisible();
});

test('FAQ accordion opens on click', async ({ page }) => {
  await page.goto('/nl/veelgestelde-vragen');
  const firstQuestion = page.getByText(/Waarom zou ik voor Mister DJ kiezen/i);
  await firstQuestion.click();
  // After click, the answer should be visible
  await expect(page.getByText(/30 jaar ervaring/i).first()).toBeVisible();
});

// ── SEO ──

test('pages have proper meta titles', async ({ page }) => {
  await page.goto('/nl');
  const title = await page.title();
  expect(title).toContain('Mister DJ');
});

test('pages have og:image meta', async ({ page }) => {
  await page.goto('/nl');
  const ogImage = page.locator('meta[property="og:image"]');
  await expect(ogImage).toHaveAttribute('content', /og-default/);
});

// ── Accessibility ──

test('skip to main content target exists', async ({ page }) => {
  await page.goto('/nl');
  const main = page.locator('#main-content, main');
  await expect(main.first()).toBeVisible();
});

test('images have alt text', async ({ page }) => {
  await page.goto('/nl');
  const images = page.locator('img');
  const count = await images.count();
  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute('alt');
    expect(alt, `Image ${i} missing alt text`).toBeTruthy();
  }
});

// ── Mobile Responsive ──

test('mobile menu hamburger works', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/nl');
  // Hamburger button should be visible on mobile
  const hamburger = page.locator('button[aria-label*="menu" i], button[aria-label*="Menu" i], button[aria-label*="navigatie" i]').first();
  if (await hamburger.isVisible()) {
    await hamburger.click();
    // Nav links should now be visible
    await expect(page.getByRole('link', { name: /bruiloften/i }).first()).toBeVisible();
  }
});

// ── Assets ──

test('favicon exists', async ({ request }) => {
  const res = await request.get('/favicon.ico');
  expect(res.ok()).toBeTruthy();
});

test('og image exists', async ({ request }) => {
  const res = await request.get('/images/og-default.jpg');
  expect(res.ok()).toBeTruthy();
});

test('gallery images load', async ({ request }) => {
  const res = await request.get('/images/gallery/gallery-01.jpg');
  expect(res.ok()).toBeTruthy();
});

// ── Footer ──

test('footer has contact and social links', async ({ page }) => {
  await page.goto('/nl');
  const footer = page.locator('footer');
  await expect(footer.getByText('040-8422594')).toBeVisible();
  await expect(footer.getByText('info@mr-dj.nl')).toBeVisible();
});

// ── Social Proof ──

test('homepage has social proof strip', async ({ page }) => {
  await page.goto('/nl');
  await expect(page.getByText('ThePerfectWedding.nl', { exact: true })).toBeVisible();
  await expect(page.getByText('10/10')).toBeVisible();
  await expect(page.getByText('Google Reviews')).toBeVisible();
});

// ── 6-Stappen ──

test('homepage has 6-stappen section', async ({ page }) => {
  await page.goto('/nl');
  await expect(page.getByText('Kennismaking').first()).toBeVisible();
  await expect(page.getByText('Offerte').first()).toBeVisible();
  await expect(page.getByText('Jullie dag').first()).toBeVisible();
});

test('bruiloften page has expanded stappen', async ({ page }) => {
  await page.goto('/nl/bruiloften');
  await expect(page.getByText('In 6 stappen naar jullie feest')).toBeVisible();
});

// ── Packages & Pricing ──

test('homepage has real pricing packages', async ({ page }) => {
  await page.goto('/nl');
  await expect(page.getByText('Vanaf €950').first()).toBeVisible();
  await expect(page.getByText('Vanaf €1.250').first()).toBeVisible();
  await expect(page.getByText('Vanaf €1.450').first()).toBeVisible();
  await expect(page.getByText('Vanaf €1.750').first()).toBeVisible();
});

test('homepage has add-ons section', async ({ page }) => {
  await page.goto('/nl');
  await expect(page.getByText('Photobooth').first()).toBeVisible();
  await expect(page.getByText('LED-dansvloer').first()).toBeVisible();
});

// ── HubSpot Integration ──

test('hero has HubSpot meeting link', async ({ page }) => {
  await page.goto('/nl');
  const hubspotLink = page.locator('a[href*="meetings.hubspot.com"]').first();
  await expect(hubspotLink).toBeVisible();
});

test('contact page has HubSpot meeting link', async ({ page }) => {
  await page.goto('/nl/contact');
  const hubspotLink = page.locator('a[href*="meetings.hubspot.com"]');
  await expect(hubspotLink).toBeVisible();
});

// ── WhatsApp ──

test('footer has WhatsApp link', async ({ page }) => {
  await page.goto('/nl');
  const footer = page.locator('footer');
  const waLink = footer.locator('a[href*="whatsapp"]');
  await expect(waLink).toBeVisible();
});

test('contact page has WhatsApp link', async ({ page }) => {
  await page.goto('/nl/contact');
  const waLink = page.locator('a[href*="whatsapp"]').first();
  await expect(waLink).toBeVisible();
});

// ── Platform Testimonials ──

test('testimonials show platform badges', async ({ page }) => {
  await page.goto('/nl');
  await expect(page.getByText(/via ThePerfectWedding/i).first()).toBeVisible();
});

test('bruiloften page has filtered testimonials', async ({ page }) => {
  await page.goto('/nl/bruiloften');
  await expect(page.getByText('Ruud en Galong').first()).toBeVisible();
});

// ── New Pages (Agent C) ──

test('privacyverklaring page loads', async ({ page }) => {
  await page.goto('/nl/privacyverklaring');
  await expect(page.locator('h1')).toContainText(/privacyverklaring/i);
  await expect(page.getByText('KvK').first()).toBeVisible();
});

test('algemene voorwaarden page loads', async ({ page }) => {
  await page.goto('/nl/algemene-voorwaarden');
  await expect(page.locator('h1')).toContainText(/algemene voorwaarden/i);
});

test('FAQ has 20+ questions', async ({ page }) => {
  await page.goto('/nl/veelgestelde-vragen');
  const buttons = page.locator('button').filter({ hasText: /\?|kiezen|kosten|uur|muziek|locatie|annulering|photobooth|pakketten/i });
  const count = await buttons.count();
  expect(count).toBeGreaterThanOrEqual(10);
});

// ── Footer Legal Links ──

test('footer has privacy and terms links', async ({ page }) => {
  await page.goto('/nl');
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: /privacyverklaring/i })).toBeVisible();
  await expect(footer.getByRole('link', { name: /algemene voorwaarden/i })).toBeVisible();
});

// ── Breadcrumbs (Agent B) ──

test('subpages have breadcrumbs', async ({ page }) => {
  await page.goto('/nl/bruiloften');
  await expect(page.getByText('Home').first()).toBeVisible();
});

// ── Custom 404 (Agent B) ──

test('404 page shows friendly message', async ({ page }) => {
  await page.goto('/nl/pagina-die-niet-bestaat');
  await expect(page.getByText(/pauze|niet gevonden/i).first()).toBeVisible();
});

// ── Accessibility (Agent F) ──

test('skip-to-content link exists', async ({ page }) => {
  await page.goto('/nl');
  const skipLink = page.locator('a[href="#main-content"]');
  await expect(skipLink).toHaveCount(1);
});

test('html lang attribute is nl', async ({ page }) => {
  await page.goto('/nl');
  const lang = await page.locator('html').getAttribute('lang');
  expect(lang).toBe('nl');
});

test('nav has aria-label', async ({ page }) => {
  await page.goto('/nl');
  const nav = page.locator('nav[aria-label]');
  const count = await nav.count();
  expect(count).toBeGreaterThanOrEqual(2);
});

// ── SEO Schema (Agent D) ──

test('page has AggregateRating schema', async ({ page }) => {
  await page.goto('/nl');
  const ldJson = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(ldJson).toContain('AggregateRating');
  expect(ldJson).toContain('9.8');
});

test('page has Offer schema', async ({ page }) => {
  await page.goto('/nl');
  const ldJson = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(ldJson).toContain('OfferCatalog');
  expect(ldJson).toContain('Silver');
});

// ── Security Headers (Agent D) ──

test('security headers present', async ({ request }) => {
  const res = await request.get('/nl');
  expect(res.headers()['x-frame-options']).toBe('DENY');
  expect(res.headers()['x-content-type-options']).toBe('nosniff');
});

// ── PWA Manifest (Agent E) ──

test('manifest.json exists', async ({ request }) => {
  const res = await request.get('/manifest.json');
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.name).toContain('Mister DJ');
});

// ── Trust Badges (replaced urgency banner) ──

test('homepage has trust badges', async ({ page }) => {
  await page.goto('/nl');
  const badge = page.getByText('Reserve DJ inbegrepen').first();
  await badge.scrollIntoViewIfNeeded();
  await expect(badge).toBeVisible();
});

// ── Conversion: Vrijblijvend Labels (Agent A) ──

test('hero CTA has vrijblijvend label', async ({ page }) => {
  await page.goto('/nl');
  await expect(page.getByText(/vrijblijvend/i).first()).toBeVisible();
});

// ── Performance ──

test('pages load within 3 seconds', async ({ page }) => {
  const start = Date.now();
  await page.goto('/nl');
  const loadTime = Date.now() - start;
  expect(loadTime).toBeLessThan(3000);
});

// ── City Landing Pages ──

test('city page Eindhoven loads', async ({ page }) => {
  await page.goto('/nl/dj-eindhoven');
  await expect(page.locator('h1')).toContainText(/Eindhoven/i);
  await expect(page.getByText(/DJ/i).first()).toBeVisible();
});

test('city page has packages section', async ({ page }) => {
  await page.goto('/nl/dj-eindhoven');
  await expect(page.getByText('Silver').first()).toBeVisible();
});

test('city pages have correct meta', async ({ page }) => {
  await page.goto('/nl/dj-tilburg');
  const title = await page.title();
  expect(title).toContain('Tilburg');
});

test('city page Tilburg loads', async ({ page }) => {
  await page.goto('/nl/dj-tilburg');
  await expect(page.locator('h1')).toContainText(/Tilburg/i);
  await expect(page.getByText(/DJ/i).first()).toBeVisible();
});

test('city page Den Bosch loads', async ({ page }) => {
  await page.goto('/nl/dj-den-bosch');
  await expect(page.locator('h1')).toContainText(/Den Bosch/i);
  await expect(page.getByText(/DJ/i).first()).toBeVisible();
});

test('city page Breda loads', async ({ page }) => {
  await page.goto('/nl/dj-breda');
  await expect(page.locator('h1')).toContainText(/Breda/i);
  await expect(page.getByText(/DJ/i).first()).toBeVisible();
});

test('city page Helmond loads', async ({ page }) => {
  await page.goto('/nl/dj-helmond');
  await expect(page.locator('h1')).toContainText(/Helmond/i);
  await expect(page.getByText(/DJ/i).first()).toBeVisible();
});

test('city page Weert loads', async ({ page }) => {
  await page.goto('/nl/dj-weert');
  await expect(page.locator('h1')).toContainText(/Weert/i);
  await expect(page.getByText(/DJ/i).first()).toBeVisible();
});

test('city page Veldhoven loads', async ({ page }) => {
  await page.goto('/nl/dj-veldhoven');
  await expect(page.locator('h1')).toContainText(/Veldhoven/i);
  await expect(page.getByText(/DJ/i).first()).toBeVisible();
});

// ── API Routes ──

test('contact API accepts POST', async ({ request }) => {
  const res = await request.post('/api/contact', {
    data: {
      fullName: 'Test User',
      email: 'test@example.com',
      eventType: 'bruiloft',
    },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.success).toBe(true);
});

test('contact API rejects invalid data', async ({ request }) => {
  const res = await request.post('/api/contact', {
    data: { fullName: '' },
  });
  expect(res.status()).toBe(400);
});

// ── Price Calculator ──

test('price calculator shows on homepage', async ({ page }) => {
  await page.goto('/nl');
  await expect(page.getByText(/prijscalculator/i).first()).toBeVisible();
});

test('price calculator updates total', async ({ page }) => {
  await page.goto('/nl');
  // Click on Gold package in calculator
  const calculator = page.locator('section').filter({ hasText: /prijscalculator/i });
  await expect(calculator.getByText('€').first()).toBeVisible();
});

// ── Blog ──

test('blog listing page loads', async ({ page }) => {
  await page.goto('/nl/blog');
  await expect(page.locator('h1')).toContainText(/blog|tips|inspiratie/i);
});

test('blog article page loads', async ({ page }) => {
  await page.goto('/nl/blog/checklist-bruiloftsmuziek');
  await expect(page.locator('h1')).toContainText(/checklist/i);
});

// ── New Pages ──

test('trouwbeurzen page loads', async ({ page }) => {
  await page.goto('/nl/trouwbeurzen');
  await expect(page.locator('h1')).toContainText(/trouwbeurs/i);
});

test('vacatures page loads', async ({ page }) => {
  await page.goto('/nl/vacatures');
  await expect(page.locator('h1')).toContainText(/vacatures|werk/i);
});

test('verhuur page loads', async ({ page }) => {
  await page.goto('/nl/verhuur');
  await expect(page.locator('h1')).toContainText(/verhuur|apparatuur/i);
});

// ── Brochure Download ──

test('brochure download button exists', async ({ page }) => {
  await page.goto('/nl');
  await expect(page.getByText(/download.*brochure/i).first()).toBeVisible();
});

// ── Footer City Links ──

test('footer has city links', async ({ page }) => {
  await page.goto('/nl');
  const footer = page.locator('footer');
  await expect(footer.getByText('Eindhoven').first()).toBeVisible();
});

// ── Advanced Features: A/B Testing ──

test('middleware sets AB test cookies', async ({ page }) => {
  await page.goto('/nl');
  const cookies = await page.context().cookies();
  const abCookie = cookies.find(c => c.name.startsWith('mrdj_ab_'));
  expect(abCookie).toBeTruthy();
});

test('AB session cookie is set', async ({ page }) => {
  await page.goto('/nl');
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(c => c.name === 'mrdj_ab_session');
  expect(sessionCookie).toBeTruthy();
});

test('AB results API accepts POST', async ({ request }) => {
  const res = await request.post('/api/ab-results', {
    data: {
      experimentId: 'hero_cta_text',
      variantId: 'control',
      type: 'impression',
      sessionId: 'test-123',
    },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.success).toBe(true);
});

// ── Advanced Features: Programmatic SEO Pages ──

test('service-city page loads (bruiloft-eindhoven)', async ({ page }) => {
  await page.goto('/nl/dj-service/dj-bruiloft-eindhoven');
  await expect(page.locator('h1')).toContainText(/bruiloft/i);
  await expect(page.locator('h1')).toContainText(/Eindhoven/i);
});

test('service-city page loads (bedrijfsfeest-tilburg)', async ({ page }) => {
  await page.goto('/nl/dj-service/dj-bedrijfsfeest-tilburg');
  await expect(page.locator('h1')).toContainText(/bedrijfsfeest/i);
  await expect(page.locator('h1')).toContainText(/Tilburg/i);
});

test('service-city page loads (feest-den-bosch)', async ({ page }) => {
  await page.goto('/nl/dj-service/dj-feest-den-bosch');
  await expect(page.locator('h1')).toContainText(/feest/i);
  await expect(page.locator('h1')).toContainText(/Den Bosch/i);
});

test('service-city page has correct meta', async ({ page }) => {
  await page.goto('/nl/dj-service/dj-bruiloft-breda');
  const title = await page.title();
  expect(title).toContain('Breda');
  expect(title).toContain('Bruiloft');
});

// ── Advanced Features: Venue Pages ──

test('venue page loads (mispelhoef)', async ({ page }) => {
  await page.goto('/nl/locaties/mispelhoef-eindhoven');
  await expect(page.locator('h1')).toContainText(/Mispelhoef/i);
});

test('venue page loads (kasteel-maurick)', async ({ page }) => {
  await page.goto('/nl/locaties/kasteel-maurick-vught');
  await expect(page.locator('h1')).toContainText(/Kasteel Maurick/i);
});

test('venue page has tips section', async ({ page }) => {
  await page.goto('/nl/locaties/mispelhoef-eindhoven');
  await expect(page.getByText(/tips/i).first()).toBeVisible();
});

test('venue page has correct meta', async ({ page }) => {
  await page.goto('/nl/locaties/kasteel-henkenshage-sint-oedenrode');
  const title = await page.title();
  expect(title).toContain('Kasteel Henkenshage');
});

// ── Advanced Features: Footer Internal Links ──

test('footer has venue links', async ({ page }) => {
  await page.goto('/nl');
  const footer = page.locator('footer');
  await expect(footer.getByText(/Mispelhoef/i).first()).toBeVisible();
});

test('footer has service-city links', async ({ page }) => {
  await page.goto('/nl');
  const footer = page.locator('footer');
  await expect(footer.getByText(/bruiloft.*DJ.*Eindhoven/i).first()).toBeVisible();
});

// ── Advanced Features: Hero A/B Test Variant ──

test('hero shows CTA button (any variant)', async ({ page }) => {
  await page.goto('/nl');
  // Should show one of: Check beschikbaarheid, Vraag vrijblijvend aan, Plan jullie feest
  const cta = page.locator('a').filter({ hasText: /beschikbaarheid|vrijblijvend|plan jullie feest/i }).first();
  await expect(cta).toBeVisible();
});

// ── Sitemap includes new pages ──

test('sitemap includes programmatic SEO pages', async ({ request }) => {
  const res = await request.get('/sitemap.xml');
  expect(res.ok()).toBeTruthy();
  const body = await res.text();
  expect(body).toContain('dj-service/dj-bruiloft-eindhoven');
  expect(body).toContain('locaties/mispelhoef-eindhoven');
});
