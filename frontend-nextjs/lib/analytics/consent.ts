'use client';

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
  version: 1;
};

export const CONSENT_STORAGE_KEY = 'mrdj_consent_v1';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<ConsentState>;
    if (
      value.version !== 1 ||
      typeof value.analytics !== 'boolean' ||
      typeof value.marketing !== 'boolean' ||
      typeof value.decidedAt !== 'string'
    ) {
      return null;
    }
    return value as ConsentState;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

export function analyticsConsentHeader(): Record<string, string> {
  return { 'X-Analytics-Consent': hasAnalyticsConsent() ? 'granted' : 'denied' };
}

export function syncGoogleConsent(state: ConsentState): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('consent', 'update', {
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: state.marketing ? 'granted' : 'denied',
  });
  window.dispatchEvent(new CustomEvent('mrdj:consent', { detail: state }));
}

export function applyConsent(analytics: boolean, marketing: boolean): ConsentState {
  const state: ConsentState = {
    analytics,
    marketing,
    decidedAt: new Date().toISOString(),
    version: 1,
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  syncGoogleConsent(state);
  return state;
}
