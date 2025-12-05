import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

/**
 * Test utilities for rendering components with i18n support
 */

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialLanguage?: string;
}

/**
 * Custom render function that includes i18n provider
 * Usage: renderWithI18n(<Component />, { initialLanguage: 'nl' })
 */
function renderWithI18n(
  ui: ReactElement,
  { initialLanguage = "en", ...renderOptions }: CustomRenderOptions = {}
) {
  if (initialLanguage !== i18n.language) {
    i18n.changeLanguage(initialLanguage);
  }

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Mock API response helper for fetch-based API calls
 */
export const mockApiResponse = <T,>(data: T, options?: { status?: number; headers?: Record<string, string> }) => {
  return Promise.resolve(
    new Response(JSON.stringify(data), {
      status: options?.status ?? 200,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })
  );
};

/**
 * Mock API error helper
 */
export const mockApiError = (
  status = 500,
  message = "Internal Server Error"
) => {
  return Promise.resolve(
    new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  );
};

/**
 * Mock localStorage for tests
 */
export const createLocalStorageMock = () => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
};

/**
 * Mock sessionStorage for tests
 */
export const createSessionStorageMock = () => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
};

/**
 * Create a mock user for authenticated tests
 */
export const createMockUser = (overrides = {}) => {
  return {
    id: "user-123",
    email: "test@example.com",
    name: "Test User",
    language: "nl",
    ...overrides,
  };
};

/**
 * Mock booking session for tests
 */
export const createMockBookingSession = (overrides = {}) => {
  return {
    id: "booking-123",
    serviceType: "wedding",
    date: "2025-12-25",
    startTime: "18:00",
    endTime: "23:00",
    location: "Amsterdam",
    notes: "Test booking",
    ...overrides,
  };
};

// Re-export everything from @testing-library/react for convenience
export * from "@testing-library/react";

// Export custom render function as default
export { renderWithI18n };
