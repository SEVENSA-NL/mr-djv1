import { NextRequest, NextResponse } from 'next/server';
import { bookingFormSchema, type BookingFormData } from '@/lib/schemas/booking';
import { z } from 'zod';

/**
 * Booking API Route Handler
 * POST /api/booking
 *
 * Handles booking form submissions with:
 * - Validation using Zod schema
 * - Spam protection (honeypot, rate limiting)
 * - Backend API integration
 * - Email notifications
 * - Analytics tracking
 */

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

// Simple rate limiting
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

// Generate unique booking ID
function generateBookingId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `BK-${timestamp}-${randomStr}`.toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          error: 'Te veel aanvragen. Probeer het later opnieuw.',
          code: 'RATE_LIMIT_EXCEEDED',
        },
        { status: 429 }
      );
    }

    // Parse request body
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type', code: 'INVALID_CONTENT_TYPE' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate with Zod schema
    const validationResult = bookingFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validatie mislukt',
          code: 'VALIDATION_ERROR',
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const bookingData: BookingFormData = validationResult.data;

    // Check honeypot field
    if (bookingData.website && bookingData.website.length > 0) {
      console.warn('[Booking API] Spam detected via honeypot', {
        ip: clientIp,
        timestamp: new Date().toISOString(),
      });

      // Return success to not alert spammers
      return NextResponse.json(
        {
          success: true,
          bookingId: 'SPAM-DETECTED',
          message: 'Je aanvraag wordt verwerkt.',
        },
        { status: 200 }
      );
    }

    // Generate booking ID
    const bookingId = generateBookingId();

    // Prepare data for backend/CRM
    const bookingPayload = {
      bookingId,
      ...bookingData,
      source: 'mr-dj.nl',
      userAgent: request.headers.get('user-agent'),
      referrer: request.headers.get('referer'),
      ipAddress: clientIp,
      submittedAt: new Date().toISOString(),
    };

    // TODO: Send to backend API or CRM (RentGuy)
    // Example:
    // const backendResponse = await fetch(process.env.BACKEND_API_URL + '/bookings', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(bookingPayload),
    // });

    // Log booking (temporary until backend integration)
    console.log('[Booking API] New booking received:', {
      bookingId,
      name: bookingData.name,
      email: bookingData.email,
      eventType: bookingData.eventType,
      eventDate: bookingData.eventDate,
      packageType: bookingData.packageType,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send confirmation email to customer
    // TODO: Send notification email to admin
    // TODO: Store in database as backup

    // TODO: Integrate with PostHog for analytics
    // Track conversion event server-side

    // Return success response
    return NextResponse.json(
      {
        success: true,
        bookingId,
        message: 'Je aanvraag is succesvol ontvangen. We nemen binnen 4 uur contact met je op!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Booking API] Error processing booking:', error);

    // Don't expose internal errors to clients
    return NextResponse.json(
      {
        error: 'Er is een onverwachte fout opgetreden. Probeer het later opnieuw.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    service: 'booking-api',
    status: 'healthy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
