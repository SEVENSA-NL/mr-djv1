'use client';

import { hasAnalyticsConsent } from './consent';

type EventPayload = Record<string, unknown>;

declare global {
  interface Window {
    posthog?: { capture: (event: string, payload?: EventPayload) => void };
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: string, payload: EventPayload = {}): void {
  if (!hasAnalyticsConsent() || !/^[a-z][a-z0-9_]{0,39}$/.test(event)) return;

  const aliases: Record<string, string> = { eventType: 'event_type' };
  const allowed = new Set([
    'action', 'city', 'contact_method', 'depth', 'duration', 'event_id', 'event_source',
    'event_type', 'form_id', 'ga4_event', 'guest_count_bucket', 'id', 'lead_intent',
    'locale', 'location', 'media_id', 'media_type', 'page', 'placement', 'route',
    'route_family', 'source', 'target', 'tier',
  ]);
  const safePayload: EventPayload = {};
  for (const [rawKey, value] of Object.entries(payload)) {
    const key = aliases[rawKey] || rawKey;
    if (!allowed.has(key) || !['string', 'number', 'boolean'].includes(typeof value)) continue;
    if (typeof value === 'string' && value.length > 80) continue;
    safePayload[key] = value;
  }

  const enriched = {
    ...safePayload,
    brand_alias: 'mr_dj',
    event_id:
      typeof safePayload.event_id === 'string'
        ? safePayload.event_id
        : globalThis.crypto?.randomUUID?.() || `evt_${Date.now()}`,
    event_source: 'browser',
    consent_state: 'granted',
    timestamp: new Date().toISOString(),
  };

  try {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture(event, enriched);
    }
  } catch {
    console.warn('posthog capture failed');
  }

  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...enriched });
    }
  } catch {
    console.warn('dataLayer push failed');
  }
}
