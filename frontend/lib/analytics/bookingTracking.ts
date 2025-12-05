/**
 * Booking Form Analytics Tracking
 * PostHog integration for booking form events
 */

declare global {
  interface Window {
    posthog?: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void;
      identify: (userId: string, properties?: Record<string, unknown>) => void;
      alias: (userId: string) => void;
      people: {
        set: (properties: Record<string, unknown>) => void;
      };
    };
  }
}

interface BookingFormEventData {
  step?: number;
  eventType?: string;
  packageType?: string;
  addonsCount?: number;
  bookingId?: string;
  error?: string;
  [key: string]: unknown;
}

/**
 * Track booking form events
 */
export class BookingAnalytics {
  private static isPostHogAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.posthog;
  }

  /**
   * Track when user starts filling the form
   */
  static trackFormStarted(data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_started', {
      ...data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer,
    });
  }

  /**
   * Track form step completion
   */
  static trackStepCompleted(step: number, data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_step_completed', {
      step,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track step navigation back
   */
  static trackStepBack(step: number, data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_step_back', {
      step,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track field interactions
   */
  static trackFieldInteraction(fieldName: string, data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_field_interaction', {
      field_name: fieldName,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track field validation errors
   */
  static trackValidationError(fieldName: string, error: string, data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_validation_error', {
      field_name: fieldName,
      error_message: error,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track package selection
   */
  static trackPackageSelected(packageType: string, data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_package_selected', {
      package_type: packageType,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track addon selection
   */
  static trackAddonToggled(addonId: string, selected: boolean, data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_addon_toggled', {
      addon_id: addonId,
      selected,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track form submission attempt
   */
  static trackSubmitStarted(data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_submit_started', {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track successful form submission
   */
  static trackSubmitSuccess(bookingId: string, data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_submit_success', {
      booking_id: bookingId,
      ...data,
      timestamp: new Date().toISOString(),
    });

    // Track as conversion event
    window.posthog!.capture('booking_conversion', {
      booking_id: bookingId,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track form submission error
   */
  static trackSubmitError(error: string, data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_submit_error', {
      error_message: error,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track spam detection
   */
  static trackSpamDetected(method: string, data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_spam_detected', {
      detection_method: method,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track form abandonment
   */
  static trackFormAbandoned(step: number, data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_abandoned', {
      abandoned_at_step: step,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track form reset
   */
  static trackFormReset(data: BookingFormEventData = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.capture('booking_form_reset', {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Identify user after successful booking
   */
  static identifyUser(email: string, properties: Record<string, unknown> = {}) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.identify(email, {
      email,
      ...properties,
      last_booking_date: new Date().toISOString(),
    });
  }

  /**
   * Set user properties
   */
  static setUserProperties(properties: Record<string, unknown>) {
    if (!this.isPostHogAvailable()) return;

    window.posthog!.people.set(properties);
  }
}

export default BookingAnalytics;
