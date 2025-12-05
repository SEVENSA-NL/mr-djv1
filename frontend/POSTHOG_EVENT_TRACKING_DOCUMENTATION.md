# PostHog Event Tracking Documentation

**Last Updated:** 2025-12-05
**PostHog API Key:** `phc_OWPltdSQMiMZGABR8n6sXRPLqpwEKzFBvQjNCDAy1EK`
**PostHog Host:** `https://app.posthog.com`

## Table of Contents

1. [Overview](#overview)
2. [PostHog Configuration](#posthog-configuration)
3. [Event Naming Convention](#event-naming-convention)
4. [Tracked Events by Component](#tracked-events-by-component)
5. [Event Properties Standard](#event-properties-standard)
6. [Implementation Status](#implementation-status)
7. [Testing & Verification](#testing--verification)

---

## Overview

This document provides a comprehensive reference for all PostHog event tracking implemented across the Mr. DJ frontend application. PostHog is used to track user behavior, conversions, and engagement metrics.

### Key Features
- Automatic page view tracking
- User interaction tracking (clicks, form submissions)
- Scroll depth tracking
- Custom event tracking for business-critical actions
- Feature flag support

---

## PostHog Configuration

### Configuration File
**Location:** `/srv/apps/mr-djv1/frontend/src/config/runtimeConfig.ts`

```typescript
export const runtimeConfig = {
  analytics: {
    posthog: {
      apiKey: "phc_OWPltdSQMiMZGABR8n6sXRPLqpwEKzFBvQjNCDAy1EK",
      apiHost: "https://app.posthog.com"
    }
  }
}
```

### Initialization
**Location:** `/srv/apps/mr-djv1/frontend/src/lib/analytics/posthog.ts`

PostHog is initialized via:
- `initializePostHog()` function
- Called from `AnalyticsProvider` component
- Mounted in the application via `UserBehaviorTracker`

**Initialization Settings:**
- `autocapture: false` (manual event tracking only)
- Validates API key format before initialization
- Graceful fallback if initialization fails

---

## Event Naming Convention

### Standard Format
All events follow **snake_case** naming convention:

```typescript
posthog.capture('event_name', {
  component: 'ComponentName',
  action: 'specific_action',
  timestamp: new Date().toISOString(),
  // ... other relevant properties
});
```

### Event Categories

1. **User Actions** - Direct user interactions
   - `mobile_cta_bar_click`
   - `whatsapp_button_click`
   - `user_click`

2. **Form Events** - Form interactions and submissions
   - `lead_submitted`
   - `booking_form_submit_started`
   - `booking_form_submit_success`
   - `booking_form_step_completed`
   - `form_submitted`

3. **Feature Interactions** - Feature-specific events
   - `availability_check_started`
   - `availability_check_completed`
   - `price_calculator_addon_toggle`
   - `price_calculator_package_change`
   - `price_calculator_get_quote`

4. **Content Engagement** - Media and content interactions
   - `video_testimonial_viewed`
   - `video_testimonial_played`
   - `video_testimonial_completed`

5. **System Events** - Page views and navigation
   - `$pageview` (PostHog standard)
   - `scroll_milestone`
   - `button_click`
   - `form_submit`

---

## Tracked Events by Component

### 1. MobileCTABar Component
**File:** `/srv/apps/mr-djv1/frontend/components/MobileCTABar.tsx`

#### Event: `mobile_cta_bar_click`
**Trigger:** User clicks any CTA button in mobile bar
**Properties:**
```typescript
{
  cta_action: string,      // 'call', 'whatsapp', 'contact'
  timestamp: string,       // ISO 8601 format
  href: string            // Target URL/link
}
```

**Current Status:** ✅ **COMPLIANT** - Already using snake_case

---

### 2. WhatsAppButton Component
**File:** `/srv/apps/mr-djv1/frontend/components/WhatsAppButton.tsx`

#### Event: `whatsapp_button_click`
**Trigger:** User clicks WhatsApp button
**Properties:**
```typescript
{
  variant: string,         // 'primary', 'secondary', 'floating'
  message_type: string,    // 'general', 'wedding', 'party', etc.
  timestamp: string        // ISO 8601 format
}
```

**Current Status:** ✅ **COMPLIANT** - Already using snake_case

---

### 3. AvailabilityChecker Component
**File:** `/srv/apps/mr-djv1/frontend/components/booking/AvailabilityChecker.tsx`

#### Event: `availability_check_started`
**Trigger:** User initiates availability check
**Properties:**
```typescript
{
  date: string,           // ISO 8601 date
  event_type: string,     // 'bruiloft', 'bedrijfsfeest', 'feest', 'other'
  guest_count: number,    // Number of guests
  timestamp: string       // ISO 8601 format
}
```

#### Event: `availability_check_completed`
**Trigger:** Availability check receives response
**Properties:**
```typescript
{
  date: string,
  event_type: string,
  guest_count: number,
  result_status: string,     // 'available', 'almost-full', 'fully-booked'
  result_available: boolean,
  timestamp: string
}
```

**Current Status:** ✅ **COMPLIANT** - Already using snake_case

---

### 4. PriceCalculator Component
**File:** `/srv/apps/mr-djv1/frontend/components/pricing/PriceCalculator.tsx`

#### Event: `price_calculator_addon_toggle`
**Trigger:** User adds/removes an addon
**Properties:**
```typescript
{
  addon_id: string,       // ID of the addon
  action: string,         // 'added' or 'removed'
  timestamp: string
}
```

#### Event: `price_calculator_package_change`
**Trigger:** User selects a different package
**Properties:**
```typescript
{
  package_id: string,     // 'brons', 'zilver', 'goud'
  timestamp: string
}
```

#### Event: `price_calculator_get_quote`
**Trigger:** User clicks "Get Quote" button
**Properties:**
```typescript
{
  package_id: string,
  guest_count: number,
  addons: string[],       // Array of addon IDs
  total_price: number,
  timestamp: string
}
```

**Current Status:** ✅ **COMPLIANT** - Already using snake_case

---

### 5. ContactForm Component
**File:** `/srv/apps/mr-djv1/frontend/components/forms/ContactForm.tsx`

#### Event: `lead_submitted`
**Trigger:** Contact form successfully submitted
**Properties:**
```typescript
{
  source: string,         // 'contact_form'
  has_phone: boolean,     // Whether phone provided
  has_event_date: boolean,// Whether date provided
  field_count: number,    // Number of fields filled
  timestamp: string
}
```

**Current Status:** ✅ **COMPLIANT** - Already using snake_case

---

### 6. BookingForm Components
**Files:**
- `/srv/apps/mr-djv1/frontend/components/booking/BookingForm.tsx`
- `/srv/apps/mr-djv1/frontend/lib/hooks/useBookingForm.ts`

#### Event: `booking_form_step_completed`
**Trigger:** User completes a form step
**Properties:**
```typescript
{
  step: number,           // Current step number
  next_step: number,      // Next step number
  timestamp: string
}
```

#### Event: `booking_form_step_back`
**Trigger:** User navigates back a step
**Properties:**
```typescript
{
  step: number,
  prev_step: number,
  timestamp: string
}
```

#### Event: `booking_form_submit_started`
**Trigger:** User submits the booking form
**Properties:**
```typescript
{
  event_type: string,
  package_type: string,
  addons_count: number,
  timestamp: string
}
```

#### Event: `booking_form_submit_success`
**Trigger:** Booking form successfully submitted
**Properties:**
```typescript
{
  booking_id: string,
  event_type: string,
  package_type: string,
  timestamp: string
}
```

#### Event: `booking_form_submit_error`
**Trigger:** Booking form submission fails
**Properties:**
```typescript
{
  error: string,          // Error message
  timestamp: string
}
```

#### Event: `booking_form_spam_detected`
**Trigger:** Honeypot field triggered
**Properties:**
```typescript
{
  method: string,         // 'honeypot'
  timestamp: string
}
```

**Current Status:** ✅ **COMPLIANT** - Already using snake_case

---

### 7. VideoTestimonial Component
**File:** `/srv/apps/mr-djv1/frontend/components/video/VideoTestimonial.tsx`

#### Event: `video_testimonial_viewed`
**Trigger:** Video testimonial component rendered
**Properties:**
```typescript
{
  testimonial_id: string,
  testimonial_name: string,
  event_type: string,     // 'bruiloft', 'bedrijfsfeest', 'feest'
  index: number,          // Position in carousel
  timestamp: string
}
```

#### Event: `video_testimonial_played`
**Trigger:** User plays video
**Properties:**
```typescript
{
  testimonial_id: string,
  testimonial_name: string,
  timestamp: string
}
```

#### Event: `video_testimonial_completed`
**Trigger:** Video finishes playing
**Properties:**
```typescript
{
  testimonial_id: string,
  testimonial_name: string,
  timestamp: string
}
```

**Current Status:** ✅ **COMPLIANT** - Already using snake_case

---

### 8. UserBehaviorTracker (Automatic Events)
**File:** `/srv/apps/mr-djv1/frontend/src/components/analytics/UserBehaviorTracker.tsx`

#### Event: `user_click`
**Trigger:** User clicks button or link
**Properties:**
```typescript
{
  element_type: string,   // 'button' or 'a'
  element_id: string,
  element_text: string,
  url: string,
  timestamp: string
}
```

#### Event: `form_submitted`
**Trigger:** Form submission detected
**Properties:**
```typescript
{
  form_id: string,
  form_action: string,
  url: string,
  timestamp: string
}
```

#### Event: `scroll_milestone`
**Trigger:** User reaches 25%, 50%, 75%, or 100% scroll
**Properties:**
```typescript
{
  scroll_percentage: number,
  milestone: number,      // 25, 50, 75, or 100
  timestamp: string
}
```

**Current Status:** ✅ **COMPLIANT** - Already using snake_case

---

### 9. Booking Confirmation Page
**File:** `/srv/apps/mr-djv1/frontend/app/booking/confirmation/page.tsx`

#### Event: `booking_confirmation_viewed`
**Trigger:** User views booking confirmation page
**Properties:**
```typescript
{
  booking_id: string,
  timestamp: string
}
```

**Current Status:** ✅ **COMPLIANT** - Already using snake_case

---

## Event Properties Standard

### Required Properties (All Events)
Every event should include:
```typescript
{
  timestamp: new Date().toISOString()
}
```

### Common Optional Properties
```typescript
{
  component: string,      // Component name (e.g., 'MobileCTABar')
  action: string,         // Specific action (e.g., 'click', 'submit')
  url: string,           // Current page URL
  user_id: string,       // If user is identified
  session_id: string     // If session tracking enabled
}
```

### Property Naming Rules
1. Use **snake_case** for all property names
2. Use descriptive names (e.g., `event_type` not `type`)
3. Include units in name if applicable (e.g., `duration_ms`, `price_eur`)
4. Boolean properties should be `is_` or `has_` prefixed
5. Arrays should be pluralized (e.g., `addons` not `addon`)

---

## Implementation Status

### Overall Status: ✅ **100% COMPLIANT**

All components are using the standardized snake_case naming convention.

### Component Checklist

| Component | Events Tracked | Naming Standard | Status |
|-----------|---------------|-----------------|--------|
| MobileCTABar | 1 | ✅ snake_case | ✅ Complete |
| WhatsAppButton | 1 | ✅ snake_case | ✅ Complete |
| AvailabilityChecker | 2 | ✅ snake_case | ✅ Complete |
| PriceCalculator | 3 | ✅ snake_case | ✅ Complete |
| ContactForm | 1 | ✅ snake_case | ✅ Complete |
| BookingForm | 6 | ✅ snake_case | ✅ Complete |
| VideoTestimonial | 3 | ✅ snake_case | ✅ Complete |
| UserBehaviorTracker | 3 | ✅ snake_case | ✅ Complete |
| Confirmation Page | 1 | ✅ snake_case | ✅ Complete |

**Total Events Tracked:** 21 unique events

---

## Testing & Verification

### Verifying PostHog Initialization

1. **Check Browser Console:**
   ```javascript
   // In browser console
   window.posthog
   // Should return PostHog object if initialized
   ```

2. **Check Network Tab:**
   - Look for requests to `https://app.posthog.com`
   - Events sent as POST requests to `/e/` endpoint

3. **PostHog Dashboard:**
   - Log in to PostHog at https://app.posthog.com
   - Navigate to Events → Live Events
   - Trigger actions on the site and verify events appear

### Testing Individual Events

#### Test MobileCTABar:
1. Open site on mobile viewport (< 1024px width)
2. Scroll down 300px
3. Click any CTA button
4. Verify `mobile_cta_bar_click` in PostHog

#### Test AvailabilityChecker:
1. Select a date
2. Click "Check Beschikbaarheid"
3. Verify both `availability_check_started` and `availability_check_completed`

#### Test PriceCalculator:
1. Change guest count slider
2. Select different package
3. Toggle addons
4. Click "Offerte Aanvragen"
5. Verify all 3 events appear

#### Test VideoTestimonials:
1. Load page with video testimonials
2. Verify `video_testimonial_viewed`
3. Click play button
4. Verify `video_testimonial_played`
5. Let video complete
6. Verify `video_testimonial_completed`

### Common Issues & Solutions

**Issue:** Events not appearing in PostHog
- **Solution:** Check API key is correct in `runtimeConfig.ts`
- **Solution:** Verify network connectivity to PostHog servers
- **Solution:** Check browser console for PostHog errors

**Issue:** Events appear but with incorrect properties
- **Solution:** Verify property names use snake_case
- **Solution:** Check property values are correct type (string, number, boolean)

**Issue:** Duplicate events
- **Solution:** Ensure component isn't mounting multiple times
- **Solution:** Check for duplicate event listeners

---

## Additional Resources

- **PostHog Documentation:** https://posthog.com/docs
- **PostHog API Reference:** https://posthog.com/docs/api
- **Feature Flags:** https://posthog.com/docs/feature-flags
- **Session Replay:** https://posthog.com/docs/session-replay

---

## Maintenance Notes

### When Adding New Events:
1. Follow snake_case naming convention
2. Include `timestamp` property
3. Add documentation to this file
4. Test in PostHog dashboard
5. Update component checklist

### Event Deprecation:
- Mark as deprecated in code comments
- Continue tracking for 30 days
- Remove tracking code after deprecation period
- Update documentation

### Version History:
- **v1.0** (2025-12-05): Initial comprehensive audit and documentation
- All events standardized to snake_case
- Complete inventory of tracked events across 9 components
- PostHog key validated and confirmed working

---

**Document Owner:** Development Team
**Last Reviewed:** 2025-12-05
**Next Review:** 2026-01-05
