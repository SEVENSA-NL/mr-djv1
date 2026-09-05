import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { hasStatisticsConsent } from '@/lib/analytics/consent';
import { sendGa4Event } from '@/lib/analytics/ga4';
import { trackEvent } from '@/lib/analytics/trackEvent';

describe('statistics consent reader', () => {
  let getItem: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    getItem = vi.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('accepts only an explicit statistics grant and reflects a later revoke', () => {
    getItem.mockReturnValue('{"statistics":true}');
    expect(hasStatisticsConsent()).toBe(true);

    getItem.mockReturnValue('{"statistics":false}');
    expect(hasStatisticsConsent()).toBe(false);
  });

  it.each([null, '{', '{"statistics":"true"}', '{"marketing":true}'])(
    'fails closed for missing or malformed preferences: %j',
    (stored) => {
      getItem.mockReturnValue(stored);
      expect(hasStatisticsConsent()).toBe(false);
    }
  );

  it('fails closed when consent storage cannot be read', () => {
    getItem.mockImplementation(() => {
      throw new Error('storage unavailable');
    });

    expect(hasStatisticsConsent()).toBe(false);
  });
});

describe('client and server analytics gates', () => {
  let getItem: ReturnType<typeof vi.spyOn>;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getItem = vi.spyOn(Storage.prototype, 'getItem');
    window.dataLayer = [];
    fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('GA4_MEASUREMENT_ID', 'G-TEST');
    vi.stubEnv('GA4_API_SECRET', 'test-secret');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('does not push client events or create a GA4 request without an explicit grant', async () => {
    const capture = vi.fn();
    window.posthog = { capture };
    getItem.mockReturnValue('{"statistics":false}');

    trackEvent('lead_submit', { source: 'test' });
    await sendGa4Event('lead_contact', { lead_type: 'contact' });

    expect(window.dataLayer).toEqual([]);
    expect(capture).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('stops client analytics after consent is revoked', () => {
    const capture = vi.fn();
    window.posthog = { capture };
    getItem.mockReturnValue('{"statistics":true}');

    trackEvent('lead_submit', { source: 'test' });
    getItem.mockReturnValue('{"statistics":false}');
    trackEvent('lead_submit', { source: 'test' });

    expect(window.dataLayer).toHaveLength(1);
    expect(capture).toHaveBeenCalledOnce();
  });

  it('allows client and server analytics only after an explicit grant', async () => {
    getItem.mockReturnValue('{"statistics":true}');

    trackEvent('lead_submit', { source: 'test' });
    await sendGa4Event(
      'lead_contact',
      { lead_type: 'contact' },
      { analyticsConsent: true, clientIdHeader: 'test-client-id' }
    );

    expect(window.dataLayer).toEqual([
      expect.objectContaining({ event: 'lead_submit', source: 'test' }),
    ]);
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
