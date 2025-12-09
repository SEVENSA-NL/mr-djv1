import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type OnboardingSessionSuccess = {
  status: 'ok';
  sessionId: string;
  onboardingUrl: string;
  expiresAt?: string | null;
  // Allow additional fields without breaking callers
  [key: string]: unknown;
};

type OnboardingSessionError = {
  status: 'error';
  reason: string;
};

function getUpstreamUrl(): string | null {
  const direct = process.env.RENTGUY_ONBOARDING_SESSION_URL?.trim();
  if (direct) {
    return direct;
  }

  const base = process.env.RENTGUY_ONBOARDING_BASE_URL?.trim();
  if (base) {
    const normalized = base.endsWith('/') ? base.slice(0, -1) : base;
    return `${normalized}/api/session`;
  }

  return null;
}

export async function GET() {
  const upstreamUrl = getUpstreamUrl();

  if (!upstreamUrl) {
    const body: OnboardingSessionError = {
      status: 'error',
      reason: 'not-configured',
    };
    return NextResponse.json(body, { status: 503 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(upstreamUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const body: OnboardingSessionError = {
        status: 'error',
        reason: `upstream-${response.status}`,
      };
      return NextResponse.json(body, { status: 502 });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      const preview = await response.text().catch(() => '');
      // Log for ops without leaking full HTML into responses
      // eslint-disable-next-line no-console
      console.error('[onboarding-session] upstream returned non-JSON', {
        contentType,
        preview: preview.slice(0, 200),
      });

      const body: OnboardingSessionError = {
        status: 'error',
        reason: 'invalid-upstream-response',
      };
      return NextResponse.json(body, { status: 502 });
    }

    const raw = (await response.json()) as Record<string, unknown>;

    const sessionId = (raw.sessionId ?? raw.id) as string | undefined;
    const onboardingUrl = (raw.onboardingUrl ?? raw.url) as string | undefined;

    if (!sessionId || !onboardingUrl) {
      const body: OnboardingSessionError = {
        status: 'error',
        reason: 'missing-fields',
      };
      return NextResponse.json(body, { status: 502 });
    }

    const payload: OnboardingSessionSuccess = {
      status: 'ok',
      sessionId,
      onboardingUrl,
    };

    if (typeof raw.expiresAt === 'string') {
      payload.expiresAt = raw.expiresAt;
    }

    return NextResponse.json(payload);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[onboarding-session] upstream call failed', error);
    const reason =
      error instanceof Error && error.name === 'AbortError'
        ? 'timeout'
        : 'upstream-error';

    const body: OnboardingSessionError = {
      status: 'error',
      reason,
    };
    return NextResponse.json(body, { status: 504 });
  } finally {
    clearTimeout(timeout);
  }
}

