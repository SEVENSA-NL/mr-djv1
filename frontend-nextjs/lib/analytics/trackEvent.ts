'use client';

type EventPayload = Record<string, unknown>;

declare global {
  interface Window {
    posthog?: { capture: (event: string, payload?: EventPayload) => void };
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: string, payload: EventPayload = {}): void {
  const enriched = {
    ...payload,
    timestamp: new Date().toISOString(),
  };

  try {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture(event, enriched);
    }
  } catch (error) {
    console.warn('posthog capture failed', error);
  }

  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...enriched });
    }
  } catch (error) {
    console.warn('dataLayer push failed', error);
  }
}
