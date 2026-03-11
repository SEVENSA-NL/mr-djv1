/**
 * DataLayer tracking utilities for Mr. DJ frontend.
 *
 * All functions are non-blocking and fail silently when
 * window.dataLayer does not exist (e.g. when analytics consent
 * has not been given or during SSR).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Push a custom event to the Google Tag Manager dataLayer.
 * Safe to call at any time -- silently no-ops when dataLayer is absent.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string>,
): void {
  try {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: eventName, ...params });
    }
  } catch {
    // fail silently
  }
}

/* ------------------------------------------------------------------ */
/*  Pre-defined event helpers                                          */
/* ------------------------------------------------------------------ */

export function trackFormSubmit(formName: string, eventType?: string): void {
  trackEvent("form_submit", {
    form_name: formName,
    ...(eventType ? { event_type: eventType } : {}),
  });
}

export function trackPhoneClick(): void {
  trackEvent("phone_click");
}

export function trackWhatsAppClick(): void {
  trackEvent("whatsapp_click");
}

export function trackEmailClick(): void {
  trackEvent("email_click");
}

export function trackHubspotClick(): void {
  trackEvent("hubspot_click");
}

export function trackPackageView(packageName: string): void {
  trackEvent("package_view", { package_name: packageName });
}

export function trackGalleryView(): void {
  trackEvent("gallery_view");
}

export function trackFaqClick(question: string): void {
  trackEvent("faq_click", { question });
}

export function trackExitIntent(action: string): void {
  trackEvent("exit_intent", { action });
}

export function trackSmartCTA(variant: string, isReturning: boolean): void {
  trackEvent("smart_cta_click", { variant, is_returning: String(isReturning) });
}

export function trackABTest(experiment: string, variant: string, action: string): void {
  trackEvent("ab_test", { experiment, variant, action });
}
