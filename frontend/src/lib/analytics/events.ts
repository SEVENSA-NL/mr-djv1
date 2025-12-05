import { pushEvent } from "./ga4";
import { trackCustomEvent as trackPostHogEvent } from "./posthog";

type Fbq = ((...args: unknown[]) => void) | null;

const getFbq = (): Fbq => {
  if (typeof window === "undefined") {
    return null;
  }

  const candidate = (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq;
  return typeof candidate === "function" ? candidate : null;
};

/**
 * Booking tracking payload
 */
export type BookingTrackingPayload = {
  origin: string;
  bookingId?: string | null;
  eventType?: string | null;
  packageId?: string | null;
  status?: string | null;
  value?: number | null;
  currency?: string | null;
};

/**
 * Track a booking lead across GA4, PostHog, and Meta Pixel
 */
export const trackBookingLead = ({
  origin,
  bookingId,
  eventType,
  packageId,
  status,
  value,
  currency,
}: BookingTrackingPayload): void => {
  const params = {
    lead_origin: origin,
    booking_id: bookingId ?? undefined,
    event_type: eventType ?? undefined,
    package_id: packageId ?? undefined,
    booking_status: status ?? undefined,
    value: typeof value === "number" ? value : undefined,
    currency: currency ?? undefined,
  };

  pushEvent({
    name: "generate_lead",
    params,
  });

  trackPostHogEvent("booking_lead", params);

  const fbq = getFbq();
  if (fbq) {
    fbq("track", "Lead", {
      content_name: origin,
      content_category: eventType ?? undefined,
      status: status ?? undefined,
      package: packageId ?? undefined,
      value: typeof value === "number" ? value : undefined,
      currency: currency ?? undefined,
    });
  }
};

/**
 * Contact channel payload
 */
export type ContactChannelPayload = {
  channel: string;
  origin?: string;
  phoneNumber?: string;
};

/**
 * Track a contact channel click across GA4, PostHog, and Meta Pixel
 */
export const trackContactChannelClick = ({
  channel,
  origin,
  phoneNumber,
}: ContactChannelPayload): void => {
  pushEvent({
    name: "select_content",
    params: {
      content_type: "contact_channel",
      item_id: channel,
      item_variant: origin ?? undefined,
      phone_number: phoneNumber ?? undefined,
    },
  });

  trackPostHogEvent("contact_channel_click", {
    channel,
    origin,
    phone_number: phoneNumber,
  });

  const fbq = getFbq();
  if (fbq) {
    fbq("trackCustom", "ContactChannelClick", {
      channel,
      origin,
      phoneNumber,
    });
  }
};

/**
 * Service engagement payload
 */
export type ServiceEngagementPayload = {
  serviceType: string;
  serviceId?: string;
  origin?: string;
};

/**
 * Track service view event
 */
export const trackServiceViewed = ({
  serviceType,
  serviceId,
  origin,
}: ServiceEngagementPayload): void => {
  pushEvent({
    name: "view_item",
    params: {
      item_category: "service",
      item_id: serviceId ?? serviceType,
      item_name: serviceType,
      origin: origin ?? undefined,
    },
  });

  trackPostHogEvent("service_viewed", {
    service_type: serviceType,
    service_id: serviceId,
    origin,
  });
};

/**
 * Package selection payload
 */
export type PackageSelectionPayload = {
  packageId: string;
  packageName: string;
  price?: number;
  currency?: string;
  serviceType?: string;
};

/**
 * Track package selection event
 */
export const trackPackageSelected = ({
  packageId,
  packageName,
  price,
  currency,
  serviceType,
}: PackageSelectionPayload): void => {
  pushEvent({
    name: "select_item",
    params: {
      item_id: packageId,
      item_name: packageName,
      item_category: serviceType ?? "package",
      price: price ?? undefined,
      currency: currency ?? undefined,
    },
  });

  trackPostHogEvent("package_selected", {
    package_id: packageId,
    package_name: packageName,
    price,
    currency,
    service_type: serviceType,
  });

  const fbq = getFbq();
  if (fbq) {
    fbq("track", "AddToCart", {
      content_name: packageName,
      content_type: "product",
      content_ids: [packageId],
      value: price ?? undefined,
      currency: currency ?? undefined,
    });
  }
};

/**
 * Booking started payload
 */
export type BookingStartedPayload = {
  eventType: string;
  origin?: string;
};

/**
 * Track booking process started
 */
export const trackBookingStarted = ({
  eventType,
  origin,
}: BookingStartedPayload): void => {
  pushEvent({
    name: "begin_checkout",
    params: {
      event_type: eventType,
      origin: origin ?? undefined,
    },
  });

  trackPostHogEvent("booking_started", {
    event_type: eventType,
    origin,
  });

  const fbq = getFbq();
  if (fbq) {
    fbq("track", "InitiateCheckout", {
      content_type: "product",
      content_category: eventType,
    });
  }
};
