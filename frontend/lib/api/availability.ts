/**
 * Availability API
 * Checks date availability for DJ bookings
 * Phase 1: Manual calendar (database lookup)
 * Phase 2: RentGuy API integration (real-time sync)
 */

import { apiClient } from '@/src/lib/apiClient';

export interface AvailabilityStatus {
  available: boolean;
  status: 'available' | 'almost-full' | 'fully-booked';
  message: string;
  alternativeDates?: Date[];
  confidence?: number; // 0-100%
}

export interface AvailabilityCheckRequest {
  date: Date;
  eventType?: 'bruiloft' | 'bedrijfsfeest' | 'feest' | 'other';
  guestCount?: number;
}

/**
 * Check if a date is available for booking
 * @param request - Availability check parameters
 * @returns Availability status with alternative dates if needed
 */
export async function checkAvailability(
  request: AvailabilityCheckRequest
): Promise<AvailabilityStatus> {
  try {
    // Phase 1: Check against manual calendar (database)
    const data = await apiClient.post<AvailabilityStatus>(
      '/api/availability/check',
      {
        date: request.date.toISOString(),
        eventType: request.eventType,
        guestCount: request.guestCount,
      }
    );

    return data;
  } catch (error) {
    console.error('[AvailabilityAPI] Check failed:', error);

    // Fallback: Return uncertain status
    return {
      available: true,
      status: 'available',
      message: 'We kunnen de beschikbaarheid momenteel niet controleren. Neem contact op voor bevestiging.',
      confidence: 0,
    };
  }
}

/**
 * Get alternative dates near the requested date
 * @param originalDate - The original requested date
 * @param range - Number of days before/after to search (default: 14)
 * @returns Array of available alternative dates
 */
export async function getAlternativeDates(
  originalDate: Date,
  range: number = 14
): Promise<Date[]> {
  try {
    const data = await apiClient.post<{ alternatives: string[]; count: number }>(
      '/api/availability/alternatives',
      {
        date: originalDate.toISOString(),
        range,
      }
    );

    return data.alternatives.map((d: string) => new Date(d));
  } catch (error) {
    console.error('[AvailabilityAPI] Alternative dates failed:', error);
    return [];
  }
}

/**
 * Track availability check event in PostHog
 */
export function trackAvailabilityCheck(
  status: AvailabilityStatus,
  request: AvailabilityCheckRequest
) {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('availability_check_completed', {
      date: request.date.toISOString(),
      event_type: request.eventType,
      guest_count: request.guestCount,
      result_status: status.status,
      result_available: status.available,
      timestamp: new Date().toISOString(),
    });
  }
}
