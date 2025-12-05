import { test as base, BrowserContext } from "@playwright/test";

export type AuthContext = {
  authenticatedContext: BrowserContext;
  unauthenticatedContext: BrowserContext;
};

/**
 * Fixture for authenticated and unauthenticated test contexts
 * Usage: test('my test', async ({ authenticatedContext }) => { ... })
 */
export const test = base.extend<AuthContext>({
  authenticatedContext: async ({ browser }, use) => {
    const context = await browser.newContext();

    // Simulate authenticated user by setting storage/cookies
    await context.addInitScript(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "user-123",
          email: "test@example.com",
          name: "Test User",
        })
      );
    });

    await use(context);
    await context.close();
  },

  unauthenticatedContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    // Fresh context without auth data
    await use(context);
    await context.close();
  },
});

export { expect } from "@playwright/test";
