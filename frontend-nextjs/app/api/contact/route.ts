import { NextResponse } from 'next/server';
import { sendGa4Event } from '@/lib/analytics/ga4';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    console.error('[contact]', { code: 'LEAD_BACKEND_UNCONFIGURED' });
    return NextResponse.json(
      { status: 'error', code: 'LEAD_BACKEND_UNCONFIGURED' },
      { status: 503 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    console.error('[contact]', { code: 'LEAD_INVALID_REQUEST' });
    return NextResponse.json(
      { status: 'error', code: 'LEAD_INVALID_REQUEST' },
      { status: 400 }
    );
  }

  const backendApiKey = process.env.BACKEND_API_KEY;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${backendUrl.replace(/\/+$/, '')}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(backendApiKey ? { Authorization: `Bearer ${backendApiKey}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) {
      console.error('[contact]', {
        code: 'LEAD_BACKEND_REJECTED',
        backend_status: response.status,
      });
      return NextResponse.json(
        { status: 'error', code: 'LEAD_BACKEND_REJECTED' },
        { status: 502 }
      );
    }
  } catch {
    console.error('[contact]', { code: 'LEAD_BACKEND_UNAVAILABLE' });
    return NextResponse.json(
      { status: 'error', code: 'LEAD_BACKEND_UNAVAILABLE' },
      { status: 503 }
    );
  } finally {
    clearTimeout(timeout);
  }

  try {
    await sendGa4Event(
      'lead_contact',
      {
        lead_type: 'contact',
        city: payload.city,
        event_type: payload.eventType,
        locale: payload.locale,
        page: payload.page || payload.source || 'contact',
      },
      {
        cookieHeader: request.headers.get('cookie') || undefined,
        clientIdHeader:
          request.headers.get('x-client-id') ||
          request.headers.get('x-ga-cid') ||
          undefined,
      }
    );
  } catch {
    console.error('[contact]', { code: 'LEAD_ANALYTICS_FAILED' });
  }

  return NextResponse.json({ status: 'ok', code: 'LEAD_DELIVERED' });
}
