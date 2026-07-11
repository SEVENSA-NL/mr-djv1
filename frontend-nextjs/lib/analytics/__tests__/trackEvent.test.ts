import { beforeEach, describe, expect, it } from 'vitest';
import { applyConsent, analyticsConsentHeader, CONSENT_STORAGE_KEY } from '../consent';
import { trackEvent } from '../trackEvent';

describe('privacy-safe browser analytics', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.dataLayer = [];
    window.posthog = undefined;
    window.gtag = undefined;
  });

  it('does not emit before analytics consent', () => {
    trackEvent('generate_lead', { form_id: 'contact' });
    expect(window.dataLayer).toEqual([]);
    expect(analyticsConsentHeader()).toEqual({ 'X-Analytics-Consent': 'denied' });
  });

  it('persists explicit consent and emits only allowlisted values', () => {
    applyConsent(true, false);
    window.dataLayer = [];

    trackEvent('generate_lead', {
      event_id: '00000000-0000-4000-8000-000000000000',
      form_id: 'city_contact',
      eventType: 'bruiloft',
      locale: 'nl',
      name: 'Private Name',
      email: 'private@example.com',
      phone: '+31000000000',
      message: 'private free text',
      quote: 'private testimonial text',
      error: 'internal exception',
    });

    const event = window.dataLayer?.[0] as Record<string, unknown>;
    expect(event).toMatchObject({
      event: 'generate_lead',
      brand_alias: 'mr_dj',
      event_id: '00000000-0000-4000-8000-000000000000',
      event_source: 'browser',
      consent_state: 'granted',
      form_id: 'city_contact',
      event_type: 'bruiloft',
      locale: 'nl',
    });
    for (const forbidden of ['name', 'email', 'phone', 'message', 'quote', 'error']) {
      expect(event).not.toHaveProperty(forbidden);
    }
    expect(analyticsConsentHeader()).toEqual({ 'X-Analytics-Consent': 'granted' });
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).not.toBeNull();
  });

  it('rejects invalid event names', () => {
    applyConsent(true, true);
    window.dataLayer = [];
    trackEvent('invalid event name', { form_id: 'contact' });
    expect(window.dataLayer).toEqual([]);
  });
});
