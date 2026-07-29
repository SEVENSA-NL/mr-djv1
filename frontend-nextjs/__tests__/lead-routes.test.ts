import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { POST as postAvailability } from '@/app/api/availability/route';
import { POST as postContact } from '@/app/api/contact/route';
import { sendGa4Event } from '@/lib/analytics/ga4';

vi.mock('@/lib/analytics/ga4', () => ({
  sendGa4Event: vi.fn(),
}));

const routes = [
  {
    eventName: 'lead_contact',
    handler: postContact,
    name: 'contact',
    path: 'contact',
    payload: {
      city: 'Eindhoven',
      email: 'private-contact@example.test',
      eventType: 'wedding',
      locale: 'nl',
      message: 'private contact message',
      name: 'Private Contact',
    },
  },
  {
    eventName: 'lead_availability',
    handler: postAvailability,
    name: 'availability',
    path: 'availability',
    payload: {
      city: 'Tilburg',
      email: 'private-availability@example.test',
      eventDate: '2030-05-20',
      eventType: 'corporate',
      locale: 'nl',
      name: 'Private Availability',
    },
  },
] as const;

function requestWith(payload: object): Request {
  return new Request('http://localhost/api/lead', {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      cookie: '_ga=private-cookie-value',
      'x-client-id': 'private-client-id',
    },
    method: 'POST',
  });
}

function loggedText(spies: Array<ReturnType<typeof vi.spyOn>>): string {
  return JSON.stringify(spies.flatMap((spy) => spy.mock.calls));
}

describe.each(routes)('$name lead route', ({ eventName, handler, path, payload }) => {
  let errorSpy: ReturnType<typeof vi.spyOn>;
  let infoSpy: ReturnType<typeof vi.spyOn>;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.stubEnv('BACKEND_API_URL', 'https://backend.example.test/base/');
    vi.stubEnv('BACKEND_API_KEY', 'private-backend-key');
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    vi.mocked(sendGa4Event).mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns a safe 503 without reading or logging the lead when backend config is absent', async () => {
    vi.stubEnv('BACKEND_API_URL', '');
    const json = vi.fn(() => Promise.resolve(payload));
    const request = {
      headers: new Headers(),
      json,
    } as unknown as Request;

    const response = await handler(request);

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: 'error',
      code: 'LEAD_BACKEND_UNCONFIGURED',
    });
    expect(json).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendGa4Event).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(loggedText([errorSpy])).not.toContain(payload.email);
    expect(loggedText([errorSpy])).not.toContain(payload.name);
  });

  it('returns success and emits GA4 only after a configured backend accepts the lead', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));

    const response = await handler(requestWith(payload));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      status: 'ok',
      code: 'LEAD_DELIVERED',
    });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe(`https://backend.example.test/base/${path}`);
    expect(options.headers.Authorization).toBe('Bearer private-backend-key');
    expect(sendGa4Event).toHaveBeenCalledOnce();
    expect(sendGa4Event).toHaveBeenCalledWith(
      eventName,
      expect.any(Object),
      expect.any(Object)
    );
    expect(errorSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
  });

  it('returns a safe 502 and suppresses GA4 for a configured backend rejection', async () => {
    const providerBody = 'private-provider-response-body';
    const readProviderBody = vi.fn(() => {
      throw new Error(providerBody);
    });
    fetchMock.mockResolvedValue({
      json: readProviderBody,
      ok: false,
      status: 422,
      text: readProviderBody,
    });

    const response = await handler(requestWith(payload));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      status: 'error',
      code: 'LEAD_BACKEND_REJECTED',
    });
    expect(readProviderBody).not.toHaveBeenCalled();
    expect(sendGa4Event).not.toHaveBeenCalled();
    const logs = loggedText([errorSpy, infoSpy]);
    expect(logs).toContain('LEAD_BACKEND_REJECTED');
    expect(logs).not.toContain(providerBody);
    expect(logs).not.toContain(payload.email);
    expect(logs).not.toContain('private-backend-key');
  });

  it('returns a safe 503 and suppresses GA4 when the configured backend throws', async () => {
    fetchMock.mockRejectedValue(
      new Error(`network failure carrying ${payload.email} and private-backend-key`)
    );

    const response = await handler(requestWith(payload));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: 'error',
      code: 'LEAD_BACKEND_UNAVAILABLE',
    });
    expect(sendGa4Event).not.toHaveBeenCalled();
    const logs = loggedText([errorSpy, infoSpy]);
    expect(logs).toContain('LEAD_BACKEND_UNAVAILABLE');
    expect(logs).not.toContain(payload.email);
    expect(logs).not.toContain('private-backend-key');
  });
});
