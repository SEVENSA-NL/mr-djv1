import {
  trackBookingLead,
  trackContactChannelClick,
  trackServiceViewed,
  trackPackageSelected,
  trackBookingStarted,
  BookingTrackingPayload,
  ContactChannelPayload,
  ServiceEngagementPayload,
  PackageSelectionPayload,
  BookingStartedPayload,
} from "./events";
import { trackButtonClick as trackPostHogButtonClick } from "./posthog";
import { trackButtonClick as trackGA4ButtonClick } from "./ga4";

/**
 * Central tracking utilities for the Mister DJ application
 * All tracking functions are exported and should be used throughout the app
 */

/**
 * Track when a booking process starts
 *
 * @param eventType - The type of event being booked (e.g., 'bruiloft-dj', 'bedrijfsfeest-dj')
 * @param origin - Optional origin identifier (e.g., page name or CTA source)
 *
 * @example
 * ```tsx
 * trackBookingStarted('bruiloft-dj', 'landing-page');
 * ```
 */
export function trackBookingStarted(eventType: string, origin?: string): void {
  const payload: BookingStartedPayload = { eventType, origin };
  trackBookingStarted(payload);
}

/**
 * Track a service view event
 *
 * @param serviceType - The type of service (e.g., 'bruiloft-dj', 'bedrijfsfeest-dj', 'feest-dj')
 * @param serviceId - Optional unique identifier for the service
 * @param origin - Optional origin identifier
 *
 * @example
 * ```tsx
 * trackServiceViewed('bruiloft-dj', 'service-card', 'hero-section');
 * ```
 */
export function trackServiceViewed(
  serviceType: string,
  serviceId?: string,
  origin?: string
): void {
  const payload: ServiceEngagementPayload = { serviceType, serviceId, origin };
  trackServiceViewed(payload);
}

/**
 * Track a package selection
 *
 * @param packageId - Unique identifier for the package
 * @param packageName - Display name of the package
 * @param price - Optional price of the package
 * @param currency - Optional currency code (e.g., 'EUR')
 * @param serviceType - Optional service type associated with the package
 *
 * @example
 * ```tsx
 * trackPackageSelected('pkg-001', 'Premium DJ Package', 500, 'EUR', 'bruiloft-dj');
 * ```
 */
export function trackPackageSelected(
  packageId: string,
  packageName: string,
  price?: number,
  currency?: string,
  serviceType?: string
): void {
  const payload: PackageSelectionPayload = {
    packageId,
    packageName,
    price,
    currency,
    serviceType,
  };
  trackPackageSelected(payload);
}

/**
 * Track a booking lead submission
 *
 * @param origin - The source/origin of the booking
 * @param bookingId - Optional booking identifier
 * @param eventType - Optional event type
 * @param packageId - Optional package identifier
 * @param status - Optional booking status
 * @param value - Optional monetary value
 * @param currency - Optional currency code
 *
 * @example
 * ```tsx
 * trackBookingLead('landing-page', 'booking-001', 'bruiloft-dj', 'pkg-001', 'pending', 500, 'EUR');
 * ```
 */
export function trackBookingLead(
  origin: string,
  bookingId?: string | null,
  eventType?: string | null,
  packageId?: string | null,
  status?: string | null,
  value?: number | null,
  currency?: string | null
): void {
  const payload: BookingTrackingPayload = {
    origin,
    bookingId,
    eventType,
    packageId,
    status,
    value,
    currency,
  };
  trackBookingLead(payload);
}

/**
 * Track a contact channel interaction
 *
 * @param channel - The contact channel (e.g., 'phone', 'email', 'whatsapp', 'instagram')
 * @param origin - Optional origin identifier
 * @param phoneNumber - Optional phone number (if applicable)
 *
 * @example
 * ```tsx
 * trackContactChannelClick('phone', 'contact-section', '+31-6-12345678');
 * ```
 */
export function trackContactChannelClick(
  channel: string,
  origin?: string,
  phoneNumber?: string
): void {
  const payload: ContactChannelPayload = { channel, origin, phoneNumber };
  trackContactChannelClick(payload);
}

/**
 * Track a generic button click
 *
 * @param buttonId - Unique identifier for the button
 * @param buttonText - Optional display text of the button
 * @param analyticsLabel - Optional label for analytics categorization
 *
 * @example
 * ```tsx
 * trackButtonClick('cta-book-now', 'Mijn DJ Boeken', 'primary-cta');
 * ```
 */
export function trackButtonClick(
  buttonId: string,
  buttonText?: string,
  analyticsLabel?: string
): void {
  trackPostHogButtonClick(buttonId, buttonText);
  trackGA4ButtonClick(buttonId, buttonText);
}

/**
 * Track when the user scrolls to a specific depth
 *
 * @param scrollPercentage - The scroll depth percentage (0-100)
 *
 * @example
 * ```tsx
 * trackScrollDepth(50); // User scrolled to 50% of the page
 * ```
 */
export function trackScrollDepth(scrollPercentage: number): void {
  const roundedPercentage = Math.round(scrollPercentage);
  const milestone = Math.floor(roundedPercentage / 25) * 25;

  if (milestone > 0 && milestone % 25 === 0) {
    const payload = {
      scroll_percentage: roundedPercentage,
      milestone,
      timestamp: new Date().toISOString(),
    };

    // GA4 tracking
    window.dataLayer?.push({
      event: "scroll_milestone",
      ...payload,
    });

    // PostHog tracking
    if (typeof window !== "undefined") {
      const posthog = (window as Record<string, unknown>).posthog;
      if (posthog && typeof (posthog as unknown as Record<string, unknown>).capture === "function") {
        ((posthog as unknown as Record<string, unknown>).capture as (eventName: string, props: unknown) => void)("scroll_milestone", payload);
      }
    }
  }
}

/**
 * Track form field engagement
 *
 * @param formId - Identifier of the form
 * @param fieldName - Name of the form field
 * @param fieldType - Type of field (e.g., 'text', 'select', 'email')
 *
 * @example
 * ```tsx
 * trackFormFieldEngagement('booking-form', 'event_date', 'date');
 * ```
 */
export function trackFormFieldEngagement(
  formId: string,
  fieldName: string,
  fieldType?: string
): void {
  const payload = {
    form_id: formId,
    field_name: fieldName,
    field_type: fieldType,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer?.push({
    event: "form_field_engagement",
    ...payload,
  });

  if (typeof window !== "undefined") {
    const posthog = (window as Record<string, unknown>).posthog;
    if (posthog && typeof (posthog as unknown as Record<string, unknown>).capture === "function") {
      ((posthog as unknown as Record<string, unknown>).capture as (eventName: string, props: unknown) => void)("form_field_engagement", payload);
    }
  }
}

/**
 * Track form submission with field data
 *
 * @param formId - Identifier of the form
 * @param formName - Display name of the form
 * @param fieldCount - Number of fields in the form
 * @param submissionTime - Time taken to fill the form (in seconds)
 *
 * @example
 * ```tsx
 * trackFormSubmission('booking-form', 'DJ Booking Form', 5, 120);
 * ```
 */
export function trackFormSubmission(
  formId: string,
  formName: string,
  fieldCount?: number,
  submissionTime?: number
): void {
  const payload = {
    form_id: formId,
    form_name: formName,
    field_count: fieldCount,
    submission_time_seconds: submissionTime,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer?.push({
    event: "form_submission",
    ...payload,
  });

  if (typeof window !== "undefined") {
    const posthog = (window as Record<string, unknown>).posthog;
    if (posthog && typeof (posthog as unknown as Record<string, unknown>).capture === "function") {
      ((posthog as unknown as Record<string, unknown>).capture as (eventName: string, props: unknown) => void)("form_submission", payload);
    }
  }
}

/**
 * Track an error or exception
 *
 * @param errorName - Name/category of the error
 * @param errorMessage - Error message or description
 * @param errorLocation - Where the error occurred (component, function, etc.)
 *
 * @example
 * ```tsx
 * trackError('form_validation', 'Email format invalid', 'QuickBookingForm');
 * ```
 */
export function trackError(
  errorName: string,
  errorMessage: string,
  errorLocation?: string
): void {
  const payload = {
    error_name: errorName,
    error_message: errorMessage,
    error_location: errorLocation,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer?.push({
    event: "error_tracked",
    ...payload,
  });

  if (typeof window !== "undefined") {
    const posthog = (window as Record<string, unknown>).posthog;
    if (posthog && typeof (posthog as unknown as Record<string, unknown>).capture === "function") {
      ((posthog as unknown as Record<string, unknown>).capture as (eventName: string, props: unknown) => void)("error_tracked", payload);
    }
  }
}

/**
 * Track user engagement with media (video, image, etc.)
 *
 * @param mediaType - Type of media (e.g., 'video', 'image', 'carousel')
 * @param mediaId - Identifier for the media
 * @param action - Action performed (e.g., 'play', 'pause', 'view')
 * @param duration - Optional duration of engagement (in seconds)
 *
 * @example
 * ```tsx
 * trackMediaEngagement('video', 'testimonial-1', 'play', 30);
 * ```
 */
export function trackMediaEngagement(
  mediaType: string,
  mediaId: string,
  action: string,
  duration?: number
): void {
  const payload = {
    media_type: mediaType,
    media_id: mediaId,
    action,
    duration_seconds: duration,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer?.push({
    event: "media_engagement",
    ...payload,
  });

  if (typeof window !== "undefined") {
    const posthog = (window as Record<string, unknown>).posthog;
    if (posthog && typeof (posthog as unknown as Record<string, unknown>).capture === "function") {
      ((posthog as unknown as Record<string, unknown>).capture as (eventName: string, props: unknown) => void)("media_engagement", payload);
    }
  }
}

export default {
  trackBookingStarted,
  trackServiceViewed,
  trackPackageSelected,
  trackBookingLead,
  trackContactChannelClick,
  trackButtonClick,
  trackScrollDepth,
  trackFormFieldEngagement,
  trackFormSubmission,
  trackError,
  trackMediaEngagement,
};
