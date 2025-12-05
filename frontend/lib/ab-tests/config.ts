/**
 * A/B Testing Configuration for Mister DJ
 *
 * Feature Flags to configure in PostHog:
 *
 * 1. hero_cta_variant (string)
 *    - control: "Bekijk onze pakketten"
 *    - variant_a: "Plan een gratis gesprek"
 *    - variant_b: "Vraag direct offerte aan"
 *
 * 2. package_badge_variant (string)
 *    - control: "Meest gekozen"
 *    - variant_a: "Best value"
 *    - variant_b: "⭐ Favoriet"
 *
 * 3. testimonial_format (string)
 *    - control: "text" (static text testimonials)
 *    - variant_a: "video" (video testimonials)
 *    - variant_b: "mixed" (mix of both)
 *
 * 4. booking_cta_variant (string)
 *    - control: "Check beschikbaarheid"
 *    - variant_a: "Reserveer je datum"
 *    - variant_b: "Vraag beschikbaarheid op"
 *
 * 5. price_display_variant (string)
 *    - control: "vanaf €495" (from price)
 *    - variant_a: "€495 - €1,295" (range)
 *    - variant_b: "Maatwerk prijzen" (custom)
 *
 * 6. whatsapp_prominence (string)
 *    - control: "normal" (standard button)
 *    - variant_a: "prominent" (larger, more visible)
 *    - variant_b: "floating" (floating action button)
 *
 * Conversion Events to track:
 * - contact_form_submitted
 * - whatsapp_clicked
 * - quote_requested
 * - package_selected
 * - availability_checked
 * - phone_clicked
 */

export const AB_TEST_FLAGS = {
  HERO_CTA: 'hero_cta_variant',
  PACKAGE_BADGE: 'package_badge_variant',
  TESTIMONIAL_FORMAT: 'testimonial_format',
  BOOKING_CTA: 'booking_cta_variant',
  PRICE_DISPLAY: 'price_display_variant',
  WHATSAPP_PROMINENCE: 'whatsapp_prominence',
} as const;

export const CONVERSION_EVENTS = {
  CONTACT_FORM: 'contact_form_submitted',
  WHATSAPP_CLICK: 'whatsapp_clicked',
  QUOTE_REQUEST: 'quote_requested',
  PACKAGE_SELECT: 'package_selected',
  AVAILABILITY_CHECK: 'availability_checked',
  PHONE_CLICK: 'phone_clicked',
} as const;

// Hero CTA variants
export const HERO_CTA_VARIANTS = {
  control: 'Bekijk onze pakketten',
  variant_a: 'Plan een gratis gesprek',
  variant_b: 'Vraag direct offerte aan',
} as const;

// Package badge variants
export const PACKAGE_BADGE_VARIANTS = {
  control: 'Meest gekozen',
  variant_a: 'Best value',
  variant_b: '⭐ Favoriet',
} as const;

// Booking CTA variants
export const BOOKING_CTA_VARIANTS = {
  control: 'Check beschikbaarheid',
  variant_a: 'Reserveer je datum',
  variant_b: 'Vraag beschikbaarheid op',
} as const;

// Price display variants
export const PRICE_DISPLAY_VARIANTS = {
  control: 'vanaf',
  variant_a: 'range',
  variant_b: 'custom',
} as const;

// Testimonial format variants
export const TESTIMONIAL_FORMAT_VARIANTS = {
  control: 'text',
  variant_a: 'video',
  variant_b: 'mixed',
} as const;

// WhatsApp prominence variants
export const WHATSAPP_PROMINENCE_VARIANTS = {
  control: 'normal',
  variant_a: 'prominent',
  variant_b: 'floating',
} as const;

/**
 * Minimum conversions per variant before making decisions
 * As specified in MS-04: 300 conversions per variant
 */
export const MIN_CONVERSIONS_PER_VARIANT = 300;

/**
 * Expected impact range: +15-25% aggregate conversion improvement
 */
export const EXPECTED_IMPACT_RANGE = {
  min: 0.15, // 15%
  max: 0.25, // 25%
} as const;
