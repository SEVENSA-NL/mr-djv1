type EventParams = Record<string, string | number | boolean | null | undefined>;

function parseClientId(options?: { cookieHeader?: string; clientIdHeader?: string }): string | undefined {
  const cookieHeader = options?.cookieHeader || '';
  const clientIdHeader = options?.clientIdHeader;

  if (clientIdHeader) return clientIdHeader;

  // Try GA cookie first
  const gaCookie = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('_ga='))
    ?.split('=')[1];

  if (gaCookie && gaCookie.startsWith('GA')) {
    const parts = gaCookie.split('.');
    const cid = parts.slice(-2).join('.');
    if (cid) return cid;
  }
  return undefined;
}

export async function sendGa4Event(
  eventName: string,
  params: EventParams = {},
  options?: { cookieHeader?: string; clientIdHeader?: string; analyticsConsent?: boolean; eventId?: string }
) {
  if (options?.analyticsConsent !== true || !/^[a-z][a-z0-9_]{0,39}$/.test(eventName)) return;

  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  const configuredEndpoint = process.env.SGTM_ENDPOINT;

  if (!measurementId || !apiSecret || !configuredEndpoint) return;
  let endpoint: URL;
  try {
    endpoint = new URL(configuredEndpoint);
  } catch {
    return;
  }
  const allowedHost = endpoint.hostname === 'mr-dj.nl' || endpoint.hostname === 'www.mr-dj.nl' || endpoint.hostname.endsWith('.sevensa.nl');
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password || !allowedHost) return;

  const allowedParams = new Set(['city', 'event_type', 'lead_type', 'locale', 'page']);
  const safeParams: EventParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (!allowedParams.has(key) || !['string', 'number', 'boolean'].includes(typeof value)) continue;
    if (typeof value === 'string' && value.length > 80) continue;
    safeParams[key] = value;
  }

  const clientId =
    parseClientId(options) ||
    `anon_${Date.now()}_${Math.random()}`;

  const body = {
    client_id: clientId,
    events: [
      {
        name: eventName,
        params: {
          engagement_time_msec: 1,
          event_id: options.eventId,
          consent_state: 'granted',
          ...safeParams,
        },
      },
    ],
  };

  try {
    endpoint.pathname = `${endpoint.pathname.replace(/\/$/, '')}/mp/collect`;
    endpoint.searchParams.set('measurement_id', measurementId);
    endpoint.searchParams.set('api_secret', apiSecret);
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    console.error('[ga4] failed to send event');
  }
}
