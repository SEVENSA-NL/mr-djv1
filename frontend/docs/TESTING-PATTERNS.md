# Testing Patterns & Examples

This document provides reusable testing patterns and examples for the Mister DJ frontend project.

## Table of Contents

- [Component Testing Patterns](#component-testing-patterns)
- [API Testing Patterns](#api-testing-patterns)
- [Form Testing Patterns](#form-testing-patterns)
- [Authentication Testing](#authentication-testing)
- [i18n Testing](#i18n-testing)
- [E2E Testing Patterns](#e2e-testing-patterns)
- [Performance Testing](#performance-testing)
- [Accessibility Testing](#accessibility-testing)

## Component Testing Patterns

### Basic Component Test

```tsx
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithI18n } from "@/lib/test-utils";
import MyComponent from "@/components/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    renderWithI18n(<MyComponent />);
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });
});
```

### Component with Props

```tsx
describe("Button", () => {
  it("renders with different variants", () => {
    const { rerender } = renderWithI18n(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("primary");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("secondary");
  });
});
```

### Component with State

```tsx
describe("Counter", () => {
  it("increments count on button click", async () => {
    const user = userEvent.setup();
    renderWithI18n(<Counter initialCount={0} />);

    const incrementButton = screen.getByRole("button", { name: /increment/i });
    expect(screen.getByText("0")).toBeInTheDocument();

    await user.click(incrementButton);
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
```

### Testing Conditional Rendering

```tsx
describe("ConditionalComponent", () => {
  it("shows content when condition is true", () => {
    renderWithI18n(<ConditionalComponent show={true} />);
    expect(screen.getByText(/visible content/i)).toBeInTheDocument();
  });

  it("hides content when condition is false", () => {
    renderWithI18n(<ConditionalComponent show={false} />);
    expect(screen.queryByText(/visible content/i)).not.toBeInTheDocument();
  });
});
```

### Testing Event Handlers

```tsx
describe("EventHandler", () => {
  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    renderWithI18n(<Button onClick={handleClick}>Click</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("passes correct arguments to handler", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    renderWithI18n(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "test");

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "test"
        })
      })
    );
  });
});
```

## API Testing Patterns

### Mocking Fetch

```tsx
import { mockApiResponse, mockApiError } from "@/lib/test-utils";
import { vi } from "vitest";

describe("API Integration", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockData = { id: 1, name: "Test" };
    global.fetch = vi.fn().mockResolvedValue(
      await mockApiResponse(mockData)
    );

    // Test API call
    const response = await fetch("/api/data");
    const data = await response.json();

    expect(data).toEqual(mockData);
  });

  it("handles API errors", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      await mockApiError(500, "Server Error")
    );

    const response = await fetch("/api/data");
    expect(response.status).toBe(500);
  });
});
```

### Testing Component with API Calls

```tsx
describe("DataFetcher", () => {
  it("loads and displays data", async () => {
    const mockData = [{ id: 1, title: "Item 1" }];
    global.fetch = vi.fn().mockResolvedValue(
      await mockApiResponse(mockData)
    );

    renderWithI18n(<DataFetcher />);

    const item = await screen.findByText("Item 1");
    expect(item).toBeInTheDocument();
  });

  it("shows error message on failure", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      await mockApiError(404, "Not Found")
    );

    renderWithI18n(<DataFetcher />);

    const error = await screen.findByText(/error|not found/i);
    expect(error).toBeInTheDocument();
  });
});
```

## Form Testing Patterns

### Testing Form Input

```tsx
describe("LoginForm", () => {
  it("captures form input", async () => {
    const user = userEvent.setup();
    renderWithI18n(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "user@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("user@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("submits form with data", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    renderWithI18n(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "user@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password123"
    });
  });
});
```

### Testing Form Validation

```tsx
describe("RegistrationForm", () => {
  it("shows validation errors", async () => {
    const user = userEvent.setup();
    renderWithI18n(<RegistrationForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    renderWithI18n(<RegistrationForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "invalid-email");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it("validates password strength", async () => {
    const user = userEvent.setup();
    renderWithI18n(<RegistrationForm />);

    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, "weak");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/password must be at least/i)).toBeInTheDocument();
  });
});
```

## Authentication Testing

### Testing Authenticated Component

```tsx
import { createMockUser } from "@/lib/test-utils";

describe("UserProfile", () => {
  it("displays user information when authenticated", () => {
    const mockUser = createMockUser({
      name: "John Doe",
      email: "john@example.com"
    });

    // Mock user context/provider
    vi.mock("@/context/AuthContext", () => ({
      useAuth: vi.fn(() => ({ user: mockUser, isAuthenticated: true }))
    }));

    renderWithI18n(<UserProfile />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });
});
```

### Testing Protected Routes

```tsx
describe("ProtectedRoute", () => {
  it("shows component for authenticated user", () => {
    const mockUser = createMockUser();
    vi.mock("@/context/AuthContext", () => ({
      useAuth: vi.fn(() => ({ user: mockUser, isAuthenticated: true }))
    }));

    renderWithI18n(
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    );

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it("redirects to login for unauthenticated user", () => {
    vi.mock("@/context/AuthContext", () => ({
      useAuth: vi.fn(() => ({ user: null, isAuthenticated: false }))
    }));

    renderWithI18n(
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
```

## i18n Testing

### Testing Component with Translations

```tsx
describe("Multilingual Component", () => {
  it("renders in English", () => {
    renderWithI18n(<WelcomeMessage />, { initialLanguage: "en" });
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  it("renders in Dutch", () => {
    renderWithI18n(<WelcomeMessage />, { initialLanguage: "nl" });
    expect(screen.getByText(/welkom/i)).toBeInTheDocument();
  });
});
```

### Testing Language Switcher

```tsx
describe("LanguageSwitcher", () => {
  it("changes language on selection", async () => {
    const user = userEvent.setup();
    const { rerender } = renderWithI18n(<App />, { initialLanguage: "en" });

    const switcher = screen.getByTestId("language-switcher");
    await user.click(switcher);

    const dutchOption = screen.getByText("Nederlands");
    await user.click(dutchOption);

    // Re-render with new language
    rerender(<App />);

    // Verify Dutch content is displayed
    expect(screen.getByText(/verwacht nederlandse tekst/i)).toBeInTheDocument();
  });
});
```

## E2E Testing Patterns

### Basic Page Navigation

```ts
import { test, expect } from "@playwright/test";

test("navigate through pages", async ({ page }) => {
  await page.goto("/");

  // Click navigation link
  await page.click('a:has-text("Services")');

  // Verify new page
  await expect(page).toHaveURL(/\/services/);
  await expect(page.locator("h1")).toContainText("Services");
});
```

### Form Submission Flow

```ts
test("complete booking form", async ({ page }) => {
  await page.goto("/booking");

  // Fill form
  await page.fill('input[name="name"]', "John Doe");
  await page.fill('input[name="email"]', "john@example.com");
  await page.selectOption('select[name="service"]', "wedding");

  // Submit
  await page.click('button:has-text("Submit")');

  // Verify success
  await expect(page).toHaveURL(/\/booking\/confirmation/);
  await expect(page.locator("h1")).toContainText("Booking Confirmed");
});
```

### Mobile Responsiveness

```ts
test("mobile view", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");

  // Mobile menu should be visible
  const mobileMenu = page.locator("[data-testid='mobile-menu']");
  await expect(mobileMenu).toBeVisible();

  // Desktop menu should be hidden
  const desktopMenu = page.locator("[data-testid='desktop-menu']");
  await expect(desktopMenu).not.toBeVisible();
});
```

### API Mocking in E2E

```ts
test("handle API errors", async ({ page }) => {
  // Mock error response
  await page.route("**/api/bookings/**", (route) => {
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Server error" })
    });
  });

  await page.goto("/booking");

  // Fill and submit form
  await page.fill('input[name="name"]', "John");
  await page.click('button:has-text("Submit")');

  // Verify error message
  await expect(page.locator("[role='alert']")).toContainText("Server error");
});
```

## Performance Testing

### Component Render Performance

```tsx
describe("Performance", () => {
  it("renders large list efficiently", async () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));

    const startTime = performance.now();
    renderWithI18n(<ItemList items={items} />);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(500); // Less than 500ms
  });
});
```

## Accessibility Testing

### Testing Keyboard Navigation

```tsx
describe("Keyboard Navigation", () => {
  it("navigates with keyboard", async () => {
    const user = userEvent.setup();
    renderWithI18n(<Navigation />);

    const firstLink = screen.getByText("Home");
    firstLink.focus();

    await user.keyboard("{Tab}");
    const secondLink = screen.getByText("About");
    expect(secondLink).toHaveFocus();
  });
});
```

### Testing ARIA Labels

```tsx
describe("Accessibility", () => {
  it("has proper ARIA labels", () => {
    renderWithI18n(<Modal isOpen={true} onClose={() => {}} />);

    const closeButton = screen.getByLabelText(/close/i);
    expect(closeButton).toBeInTheDocument();

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });
});
```

### Testing Screen Reader Announcements

```tsx
describe("Screen Reader", () => {
  it("announces live region updates", async () => {
    const user = userEvent.setup();
    renderWithI18n(<LiveSearch />);

    const searchInput = screen.getByRole("searchbox");
    await user.type(searchInput, "test");

    const liveRegion = screen.getByLiveRegionPolite();
    expect(liveRegion).toHaveTextContent(/results found/i);
  });
});
```

## Tips & Tricks

1. **Use `screen` instead of `container`**: More accessible and resilient to refactoring
2. **Use `findBy` for async**: Better than `waitFor` + `getBy`
3. **Use `userEvent` instead of `fireEvent`**: More realistic user interactions
4. **Group related tests**: Use nested `describe()` for organization
5. **Keep tests focused**: One assertion per test when possible
6. **Use factories**: Create reusable mock objects with helper functions
7. **Test user flows**: Focus on what users do, not implementation details

## Common Mistakes

1. Using `setTimeout` instead of async utilities
2. Querying for elements that don't exist (use `queryBy` instead of `getBy`)
3. Not cleaning up mocks between tests
4. Testing implementation details instead of behavior
5. Forgetting to `await` async operations
6. Not using `user` event setup for interactions

## Resources

- [Testing Library Docs](https://testing-library.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
