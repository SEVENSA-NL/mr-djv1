import { NextRequest, NextResponse } from 'next/server';

/**
 * Availability Check API
 * POST /api/availability/check
 *
 * Phase 1: Manual calendar (database lookup)
 * Phase 2: RentGuy API integration
 */

interface AvailabilityRequest {
  date: string; // ISO string
  eventType?: 'bruiloft' | 'bedrijfsfeest' | 'feest' | 'other';
  guestCount?: number;
}

// Mock booked dates for Phase 1 (replace with database query)
const BOOKED_DATES = [
  '2025-12-25', // Christmas
  '2025-12-31', // New Year's Eve
  '2026-01-15',
  '2026-02-14', // Valentine's Day
  '2026-03-20',
];

// Mock almost-full dates (replace with database query)
const ALMOST_FULL_DATES = [
  '2026-01-10',
  '2026-02-28',
  '2026-04-05',
];

export async function POST(request: NextRequest) {
  try {
    const body: AvailabilityRequest = await request.json();

    if (!body.date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    const requestedDate = new Date(body.date);
    const dateStr = requestedDate.toISOString().split('T')[0];

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (requestedDate < today) {
      return NextResponse.json({
        available: false,
        status: 'fully-booked',
        message: 'Deze datum ligt in het verleden. Kies een toekomstige datum.',
        confidence: 100,
      });
    }

    // Check if fully booked
    if (BOOKED_DATES.includes(dateStr)) {
      return NextResponse.json({
        available: false,
        status: 'fully-booked',
        message:
          'Deze datum is helaas volledig geboekt. Bekijk onderstaande alternatieve datums of neem contact op.',
        confidence: 100,
      });
    }

    // Check if almost full
    if (ALMOST_FULL_DATES.includes(dateStr)) {
      return NextResponse.json({
        available: true,
        status: 'almost-full',
        message:
          'Deze datum is nog beschikbaar, maar wordt al vol! We raden aan om snel te boeken om teleurstelling te voorkomen.',
        confidence: 90,
      });
    }

    // Date is available
    return NextResponse.json({
      available: true,
      status: 'available',
      message:
        'Geweldig nieuws! Deze datum is nog beschikbaar. Vraag nu je offerte aan om te reserveren.',
      confidence: 100,
    });
  } catch (error) {
    console.error('[AvailabilityAPI] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET method for health check
export async function GET() {
  return NextResponse.json({
    service: 'availability-check',
    status: 'healthy',
    phase: 'manual-calendar',
  });
}
