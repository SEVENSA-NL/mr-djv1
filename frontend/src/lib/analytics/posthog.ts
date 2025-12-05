import posthog from "posthog-js";
import { isValidPosthogKey, runtimeConfig } from "../../config/runtimeConfig";

const isBrowser = typeof window !== "undefined";
let isInitialized = false;

/**
 * Initialize PostHog analytics client
 * Should be called once on app startup
 */
export function initializePostHog(): void {
  if (!isBrowser || isInitialized) {
    return;
  }

  const { apiKey, apiHost } = runtimeConfig.analytics.posthog;

  if (!isValidPosthogKey(apiKey)) {
    if (import.meta.env.MODE !== "production") {
      console.warn(
        "[PostHog] Initialization skipped: No valid API key found in runtime configuration."
      );
    }
    return;
  }

  try {
    posthog.init(apiKey, {
      api_host: apiHost ?? undefined,
      loaded: () => {
        if (import.meta.env.MODE !== "production") {
          console.debug("[PostHog] Initialized successfully");
        }
      },
      autocapture: false,
    });
    isInitialized = true;
  } catch (error) {
    if (import.meta.env.MODE !== "production") {
      console.error("[PostHog] Initialization failed:", error);
    }
  }
}

/**
 * Track a page view event
 */
export function trackPageView(pageName: string): void {
  if (!isBrowser || !isInitialized) {
    return;
  }

  try {
    posthog.capture("$pageview", {
      page_name: pageName,
      url: window.location.href,
    });
  } catch (error) {
    if (import.meta.env.MODE !== "production") {
      console.error("[PostHog] Page view tracking failed:", error);
    }
  }
}

/**
 * Track a button click event
 */
export function trackButtonClick(buttonId: string, buttonText?: string): void {
  if (!isBrowser || !isInitialized) {
    return;
  }

  try {
    posthog.capture("button_click", {
      button_id: buttonId,
      button_text: buttonText ? buttonText.trim().slice(0, 120) : undefined,
      url: window.location.href,
    });
  } catch (error) {
    if (import.meta.env.MODE !== "production") {
      console.error("[PostHog] Button click tracking failed:", error);
    }
  }
}

/**
 * Track a form submission event
 */
export function trackFormSubmission(formId: string, formAction?: string): void {
  if (!isBrowser || !isInitialized) {
    return;
  }

  try {
    posthog.capture("form_submit", {
      form_id: formId,
      form_action: formAction,
      url: window.location.href,
    });
  } catch (error) {
    if (import.meta.env.MODE !== "production") {
      console.error("[PostHog] Form submission tracking failed:", error);
    }
  }
}

/**
 * Identify a user in PostHog
 */
export function identifyUser(userId: string, properties?: Record<string, unknown>): void {
  if (!isBrowser || !isInitialized) {
    return;
  }

  try {
    posthog.identify(userId, properties);
  } catch (error) {
    if (import.meta.env.MODE !== "production") {
      console.error("[PostHog] User identification failed:", error);
    }
  }
}

/**
 * Reset user identification (e.g., on logout)
 */
export function resetUserIdentification(): void {
  if (!isBrowser || !isInitialized) {
    return;
  }

  try {
    posthog.reset();
  } catch (error) {
    if (import.meta.env.MODE !== "production") {
      console.error("[PostHog] User reset failed:", error);
    }
  }
}

/**
 * Set user properties without identifying
 */
export function setUserProperties(properties: Record<string, unknown>): void {
  if (!isBrowser || !isInitialized) {
    return;
  }

  try {
    posthog.setPersonProperties(properties);
  } catch (error) {
    if (import.meta.env.MODE !== "production") {
      console.error("[PostHog] Setting user properties failed:", error);
    }
  }
}

/**
 * Track a custom event
 */
export function trackCustomEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  if (!isBrowser || !isInitialized) {
    return;
  }

  try {
    posthog.capture(eventName, {
      ...properties,
      url: window.location.href,
    });
  } catch (error) {
    if (import.meta.env.MODE !== "production") {
      console.error(`[PostHog] Custom event tracking failed (${eventName}):`, error);
    }
  }
}

export default posthog;
