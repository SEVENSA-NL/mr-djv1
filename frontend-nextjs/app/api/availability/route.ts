import { NextResponse } from 'next/server';
import { sendGa4Event } from '@/lib/analytics/ga4';
import { randomUUID } from 'node:crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const backendUrl = process.env.BACKEND_API_URL;
    const backendApiKey = process.env.BACKEND_API_KEY;
    if (backendUrl) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(`${backendUrl}/availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(backendApiKey ? { Authorization: `Bearer ${backendApiKey}` } : {}),
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        console.error('[availability] backend responded non-200', res.status);
        return NextResponse.json({ status: 'error' }, { status: 502 });
      }
    } else {
      console.warn('[availability] backend unavailable');
      return NextResponse.json({ status: 'error' }, { status: 503 });
    }

    const suppliedEventId = request.headers.get('x-event-id') || '';
    const eventId = /^[0-9a-f-]{36}$/i.test(suppliedEventId) ? suppliedEventId : randomUUID();
    await sendGa4Event(
      'generate_lead',
      {
        lead_type: 'availability',
        event_type: payload.eventType,
        locale: payload.locale,
        city: payload.city,
        page: payload.page || 'availability',
      },
      {
        cookieHeader: request.headers.get('cookie') || undefined,
        clientIdHeader:
          request.headers.get('x-client-id') ||
          request.headers.get('x-ga-cid') ||
          undefined,
        analyticsConsent: request.headers.get('x-analytics-consent') === 'granted',
        eventId,
      }
    );
  } catch {
    console.error('[availability] failed to forward');
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok', received: true });
}
