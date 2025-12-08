const GA4_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

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
  options?: { cookieHeader?: string; clientIdHeader?: string }
) {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) {
    return;
  }

  const clientId =
    (typeof params.client_id === 'string' && params.client_id) ||
    parseClientId(options) ||
    `anon_${Date.now()}_${Math.random()}`;

  const body = {
    client_id: clientId,
    events: [
      {
        name: eventName,
        params: {
          engagement_time_msec: 1,
          ...params,
        },
      },
    ],
  };

  try {
    await fetch(`${GA4_ENDPOINT}?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('[ga4] failed to send event', error);
  }
}
