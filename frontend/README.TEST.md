# Testing Guide - Mister DJ Frontend

This document provides a comprehensive guide to the testing framework setup for the Mister DJ frontend application. The project uses **Vitest** for unit and component testing, and **Playwright** for end-to-end testing.

## Table of Contents

- [Quick Start](#quick-start)
- [Unit Testing with Vitest](#unit-testing-with-vitest)
- [Component Testing](#component-testing)
- [E2E Testing with Playwright](#e2e-testing-with-playwright)
- [Test Utilities](#test-utilities)
- [Coverage Reports](#coverage-reports)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run All Tests

```bash
# Run unit tests once
npm run test

# Run unit tests in watch mode (recommended during development)
npm run test:watch

# Run unit tests with UI
npm run test:ui

# Run E2E tests
npm run test:e2e

# Run all tests with coverage
npm run test:all

# Full CI pipeline (lint, type check, tests, coverage, E2E)
npm run test:ci
```

## Unit Testing with Vitest

### Configuration

The Vitest configuration is defined in `vitest.config.ts` with the following features:

- **Environment**: jsdom (browser-like environment)
- **Setup Files**: Global setup in `src/setupTests.ts`
- **Coverage**: V8 provider with HTML and LCOV reporters
- **Path Aliases**: `@/` maps to `src/`

### Running Unit Tests

```bash
# Run all unit tests once
npm run test

# Watch mode (re-runs on file changes)
npm run test:watch

# UI mode (visual interface)
npm run test:ui

# Debug mode
npm run test:debug

# Coverage report
npm run test:coverage
```

### Test File Structure

Unit tests should be placed alongside or near the code they test:

```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
├── lib/
│   ├── apiClient.ts
│   └── __tests__/
│       └── apiClient.test.ts
└── __tests__/
    └── utils/
        └── helpers.test.ts
```

## Component Testing

### Using Custom Render Function

The project includes a custom `renderWithI18n` function that automatically wraps components with i18n provider:

```tsx
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithI18n } from "@/lib/test-utils";
import MyComponent from "@/components/MyComponent";

describe("MyComponent", () => {
  it("should render with i18n support", () => {
    renderWithI18n(<MyComponent />, { initialLanguage: "nl" });
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });
});
```

### Example Unit Test

See `/src/__tests__/components/Button.test.tsx` for a complete example:

```tsx
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithI18n } from "@/lib/test-utils";
import Button from "@/components/Button";

describe("Button Component", () => {
  it("should render button with text", () => {
    renderWithI18n(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn();
    renderWithI18n(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    const user = userEvent.setup();

    await user.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Testing with i18n

All components can be tested with i18n support using `renderWithI18n`:

```tsx
describe("Multilingual Component", () => {
  it("renders in English", () => {
    renderWithI18n(<Component />, { initialLanguage: "en" });
    // Test assertions
  });

  it("renders in Dutch", () => {
    renderWithI18n(<Component />, { initialLanguage: "nl" });
    // Test assertions
  });
});
```

### Mocking API Calls

Use the provided mock utilities from `test-utils.tsx`:

```tsx
import {
  renderWithI18n,
  mockApiResponse,
  mockApiError,
} from "@/lib/test-utils";

describe("Component with API", () => {
  it("handles successful API response", async () => {
    const mockData = { id: 1, name: "Test" };
    const response = await mockApiResponse(mockData);

    // Test with response
  });

  it("handles API errors", async () => {
    const response = await mockApiError(500, "Server Error");

    // Test error handling
  });
});
```

### Testing Storage

Mock localStorage and sessionStorage for tests:

```tsx
import { createLocalStorageMock, createSessionStorageMock } from "@/lib/test-utils";

describe("Storage Operations", () => {
  it("works with localStorage", () => {
    const storage = createLocalStorageMock();
    storage.setItem("key", "value");
    expect(storage.getItem("key")).toBe("value");
  });
});
```

## E2E Testing with Playwright

### Configuration

Playwright is configured in `playwright.config.ts` with:

- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5 and iPhone 12 viewports
- **Server**: Auto-starts preview server
- **Reports**: HTML report with screenshots and videos on failure

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run in UI mode
npm run test:e2e:ui

# Debug mode (step through tests)
npm run test:e2e:debug

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific browser
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit
```

### E2E Test Structure

E2E tests are located in `/e2e/` directory:

```
e2e/
├── fixtures/
│   └── auth.ts
├── homepage.spec.ts
└── booking-flow.spec.ts
```

### Example E2E Test

See `/e2e/homepage.spec.ts` for a complete example:

```ts
import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the homepage", async ({ page }) => {
    await expect(page).toHaveTitle(/Mister DJ/i);
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });
});
```

### Using Authentication Fixtures

The project includes fixtures for authenticated/unauthenticated test contexts:

```ts
import { test, expect } from "@/e2e/fixtures/auth";

test("authenticated user can book", async ({ authenticatedContext }) => {
  const page = await authenticatedContext.newPage();
  await page.goto("/booking");

  // Test authenticated booking flow
});

test("unauthenticated user sees login", async ({ unauthenticatedContext }) => {
  const page = await unauthenticatedContext.newPage();
  await page.goto("/booking");

  // Test unauthenticated flow
});
```

### API Interception

Mock API responses in E2E tests:

```ts
test("handles API errors gracefully", async ({ page }) => {
  // Mock API failure
  await page.route("**/api/bookings/**", (route) => {
    route.abort("failed");
  });

  await page.goto("/booking");
  // Test error handling
});

test("displays booking data", async ({ page }) => {
  // Mock API success
  await page.route("**/api/bookings/**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ id: 1, date: "2025-12-25" }),
    });
  });

  await page.goto("/booking");
  // Test with mocked data
});
```

## Test Utilities

### Available Utilities in `src/lib/test-utils.tsx`

#### renderWithI18n()

Renders components with i18n provider and support for language switching.

```tsx
renderWithI18n(<Component />, { initialLanguage: "nl" });
```

#### mockApiResponse()

Creates mock API responses for testing.

```tsx
const response = await mockApiResponse({ data: "test" });
const response = await mockApiResponse(
  { data: "test" },
  { status: 201, headers: { "X-Custom": "value" } }
);
```

#### mockApiError()

Creates mock API error responses.

```tsx
const response = await mockApiError(404, "Not Found");
const response = await mockApiError(500, "Server Error");
```

#### Mock User/Session

Create mock data for testing:

```tsx
const user = createMockUser({ email: "test@example.com" });
const booking = createMockBookingSession({ serviceType: "wedding" });
```

#### Storage Mocks

```tsx
const localStorage = createLocalStorageMock();
const sessionStorage = createSessionStorageMock();
```

## Coverage Reports

### Generating Coverage

```bash
npm run test:coverage
```

### View Coverage Report

Coverage reports are generated in the `coverage/` directory:

```bash
# Open HTML report
open coverage/index.html
```

### Coverage Configuration

Configured in `vitest.config.ts`:

- **Reporters**: text, json, html, lcov
- **Excluded**: node_modules, tests, stories, dist
- **Thresholds**: Configure in `vitest.config.ts` if needed

## Best Practices

### 1. Test Organization

- One test file per component
- Group related tests using `describe()`
- Use descriptive test names

```tsx
describe("Button Component", () => {
  describe("rendering", () => {
    it("should render with text");
    it("should render disabled state");
  });

  describe("interactions", () => {
    it("should handle click events");
  });
});
```

### 2. Use Semantic Queries

Prefer semantic queries over test IDs:

```tsx
// Good
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText(/password/i);

// Acceptable (when semantic queries don't work)
screen.getByTestId("special-component");
```

### 3. Test User Behavior

Test how users interact with the component:

```tsx
it("should submit form on button click", async () => {
  const user = userEvent.setup();
  renderWithI18n(<LoginForm />);

  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await user.type(emailInput, "test@example.com");
  await user.click(submitButton);

  expect(handleSubmit).toHaveBeenCalled();
});
```

### 4. Mock External Dependencies

Always mock external services:

```tsx
vi.mock("@/lib/apiClient", () => ({
  getBookings: vi.fn(),
}));
```

### 5. Async Operations

Always await async operations:

```tsx
it("should load data", async () => {
  renderWithI18n(<Component />);

  const item = await screen.findByText(/loaded item/i);
  expect(item).toBeInTheDocument();
});
```

### 6. Cleanup

Cleanup is automatic with the `afterEach` in `setupTests.ts`, but verify test isolation.

### 7. E2E Test Structure

- One test file per page/feature
- Use `test.describe()` for grouping
- Use `test.beforeEach()` for common setup

```ts
test.describe("Booking Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/booking");
  });

  test("should complete booking flow", async ({ page }) => {
    // Test
  });
});
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: "20"

      - run: npm ci

      - run: npm run test:ci

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Pre-commit Hooks

Add testing to pre-commit hooks:

```bash
# .husky/pre-commit
npm run test
npm run typecheck
```

## Troubleshooting

### Tests Failing Locally

```bash
# Clear cache
rm -rf node_modules/.vite

# Reinstall dependencies
npm ci

# Run tests
npm run test
```

### Playwright Browser Issues

```bash
# Install browsers
npx playwright install

# Run with specific browser
npm run test:e2e:chromium
```

### Coverage Not Generated

```bash
# Ensure coverage package is installed
npm install --save-dev @vitest/coverage-v8

# Generate coverage
npm run test:coverage
```

### E2E Tests Timeout

Increase timeout in `playwright.config.ts`:

```ts
export default defineConfig({
  timeout: 60_000, // 60 seconds
  // ...
});
```

### Components Not Rendering in Tests

Ensure proper setup:

1. Import test utilities: `import { renderWithI18n } from "@/lib/test-utils"`
2. Verify i18n is initialized: `src/lib/i18n.ts`
3. Check setupTests.ts is loaded: `vitest.config.ts`

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contributing

When adding new features:

1. Write tests first (TDD approach recommended)
2. Ensure all tests pass: `npm run test`
3. Check coverage: `npm run test:coverage`
4. Add E2E tests for user flows
5. Update this documentation if needed

## Questions?

For questions or issues with testing, please refer to the main README.md or contact the development team.
