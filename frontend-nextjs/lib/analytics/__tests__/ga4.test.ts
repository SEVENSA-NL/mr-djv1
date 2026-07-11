import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendGa4Event } from '../ga4';

describe('server-side GA4 forwarding', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('does not dispatch without explicit analytics consent', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }));
    await sendGa4Event('generate_lead', {}, { analyticsConsent: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('uses the first-party sGTM endpoint and drops forbidden parameters', async () => {
    vi.stubEnv('GA4_MEASUREMENT_ID', 'G-EXAMPLE');
    vi.stubEnv('GA4_API_SECRET', 'test-only-secret');
    vi.stubEnv('SGTM_ENDPOINT', 'https://mr-dj.nl/metrics');
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }));

    await sendGa4Event(
      'generate_lead',
      {
        lead_type: 'availability',
        event_type: 'bruiloft',
        locale: 'nl',
        email: 'private@example.com',
        message: 'private text',
      },
      {
        analyticsConsent: true,
        eventId: '00000000-0000-4000-8000-000000000000',
        clientIdHeader: '12345.67890',
      }
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    const [requestUrl, requestInit] = fetchMock.mock.calls[0];
    expect(String(requestUrl)).toContain('https://mr-dj.nl/metrics/mp/collect');
    const body = JSON.parse(String(requestInit?.body));
    expect(body.events[0].params).toMatchObject({
      lead_type: 'availability',
      event_type: 'bruiloft',
      locale: 'nl',
      event_id: '00000000-0000-4000-8000-000000000000',
      consent_state: 'granted',
    });
    expect(body.events[0].params).not.toHaveProperty('email');
    expect(body.events[0].params).not.toHaveProperty('message');
  });

  it('rejects non-first-party endpoints', async () => {
    vi.stubEnv('GA4_MEASUREMENT_ID', 'G-EXAMPLE');
    vi.stubEnv('GA4_API_SECRET', 'test-only-secret');
    vi.stubEnv('SGTM_ENDPOINT', 'https://www.google-analytics.com');
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }));

    await sendGa4Event('generate_lead', {}, { analyticsConsent: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
