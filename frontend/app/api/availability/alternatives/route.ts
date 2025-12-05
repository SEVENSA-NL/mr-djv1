import { NextRequest, NextResponse } from 'next/server';

/**
 * Alternative Dates API
 * POST /api/availability/alternatives
 *
 * Returns available dates near the requested date
 */

interface AlternativesRequest {
  date: string; // ISO string
  range?: number; // Days before/after (default: 14)
}

// Mock booked dates (same as check endpoint)
const BOOKED_DATES = [
  '2025-12-25',
  '2025-12-31',
  '2026-01-15',
  '2026-02-14',
  '2026-03-20',
];

export async function POST(request: NextRequest) {
  try {
    const body: AlternativesRequest = await request.json();

    if (!body.date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    const requestedDate = new Date(body.date);
    const range = body.range || 14;
    const alternatives: string[] = [];

    // Search for available dates within range
    for (let i = 1; i <= range * 2; i++) {
      // Check days after
      const futureDate = new Date(requestedDate);
      futureDate.setDate(futureDate.getDate() + i);
      const futureDateStr = futureDate.toISOString().split('T')[0];

      if (!BOOKED_DATES.includes(futureDateStr)) {
        alternatives.push(futureDateStr);
        if (alternatives.length >= 3) break; // Return max 3 alternatives
      }

      // Check days before (if not in the past)
      if (i <= range) {
        const pastDate = new Date(requestedDate);
        pastDate.setDate(pastDate.getDate() - i);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (pastDate >= today) {
          const pastDateStr = pastDate.toISOString().split('T')[0];
          if (!BOOKED_DATES.includes(pastDateStr)) {
            alternatives.push(pastDateStr);
            if (alternatives.length >= 3) break;
          }
        }
      }
    }

    // Sort alternatives chronologically
    alternatives.sort();

    return NextResponse.json({
      alternatives,
      count: alternatives.length,
    });
  } catch (error) {
    console.error('[AlternativesAPI] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
