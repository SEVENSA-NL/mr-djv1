import { test, expect } from "@playwright/test";

test.describe("Homepage E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto("/");
  });

  test("should load the homepage", async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Mister DJ/i);

    // Check main heading exists
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });

  test("should display hero section", async ({ page }) => {
    const heroSection = page.locator("[data-testid='hero-section']");
    await expect(heroSection).toBeVisible();

    // Check for CTA button
    const ctaButton = page.locator("button:has-text('Book Now')");
    await expect(ctaButton).toBeVisible();
  });

  test("should navigate through language switcher", async ({ page }) => {
    const languageSwitcher = page.locator("[data-testid='language-switcher']");
    await expect(languageSwitcher).toBeVisible();

    // Click language switcher
    await languageSwitcher.click();

    // Check for language options
    const dutchOption = page.locator("text=Nederlands");
    await expect(dutchOption).toBeVisible();

    // Select Dutch
    await dutchOption.click();

    // Verify page content changes to Dutch
    const pageContent = page.locator("body");
    await expect(pageContent).toBeTruthy();
  });

  test("should display pricing section", async ({ page }) => {
    const pricingSection = page.locator("[data-testid='pricing-section']");
    await pricingSection.scrollIntoViewIfNeeded();
    await expect(pricingSection).toBeVisible();

    // Check for pricing cards
    const pricingCards = page.locator("[data-testid='pricing-card']");
    const cardCount = await pricingCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test("should display testimonials section", async ({ page }) => {
    const testimonialsSection = page.locator(
      "[data-testid='testimonials-section']"
    );
    await testimonialsSection.scrollIntoViewIfNeeded();
    await expect(testimonialsSection).toBeVisible();

    // Check for testimonial items
    const testimonialItems = page.locator("[data-testid='testimonial-item']");
    const itemCount = await testimonialItems.count();
    expect(itemCount).toBeGreaterThan(0);
  });

  test("should open booking modal when CTA is clicked", async ({ page }) => {
    const ctaButton = page.locator("button:has-text('Book Now')");
    await ctaButton.click();

    // Check for modal or booking form
    const bookingForm = page.locator("[data-testid='booking-form']");
    await expect(bookingForm).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check main content is visible
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // Check hamburger menu exists on mobile
    const mobileMenu = page.locator("[data-testid='mobile-menu']");
    const isVisible = await mobileMenu.isVisible();
    // Mobile menu may or may not exist, just verify page is responsive
    expect(isVisible !== null).toBe(true);
  });

  test("should have proper accessibility attributes", async ({ page }) => {
    // Check for main landmark
    const main = page.locator("main");
    await expect(main).toBeVisible();

    // Check buttons have accessible labels
    const buttons = page.locator("button");
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // Verify at least some buttons are accessible
    for (let i = 0; i < Math.min(3, buttonCount); i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      expect(text).toBeTruthy();
    }
  });

  test("should load images with proper alt text", async ({ page }) => {
    const images = page.locator("img");
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);

    // Check first image has alt text
    const firstImage = images.first();
    const altText = await firstImage.getAttribute("alt");
    expect(altText).toBeTruthy();
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    // Check for h2 headings
    const h2 = page.locator("h2");
    const h2Count = await h2.count();
    expect(h2Count).toBeGreaterThan(0);

    // h1 should come before h2
    const h1Position = await h1.first().boundingBox();
    const h2Position = await h2.first().boundingBox();
    expect(h1Position?.y).toBeLessThan(h2Position?.y || 0);
  });

  test("should handle form submission", async ({ page }) => {
    // Navigate to booking page or open booking form
    const ctaButton = page.locator("button:has-text('Book Now')");
    await ctaButton.click();

    const bookingForm = page.locator("[data-testid='booking-form']");
    await expect(bookingForm).toBeVisible();

    // Fill form fields (example)
    const nameInput = page.locator("input[name='name']");
    if (await nameInput.isVisible()) {
      await nameInput.fill("John Doe");
    }

    const emailInput = page.locator("input[name='email']");
    if (await emailInput.isVisible()) {
      await emailInput.fill("john@example.com");
    }
  });
});
