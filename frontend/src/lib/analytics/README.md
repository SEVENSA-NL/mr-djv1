# Analytics Tracking Documentation

This document outlines the analytics tracking setup for the Mister DJ application, including PostHog, Google Analytics 4 (GA4), and Meta Pixel integration.

## Overview

The analytics system tracks user interactions and business events across multiple platforms:

- **PostHog**: Product analytics and user behavior tracking
- **Google Analytics 4 (GA4)**: Web analytics and conversion tracking
- **Meta Pixel**: Conversion and retargeting tracking

All tracking is implemented with proper error handling, server-side safety checks, and development mode logging.

## Architecture

```
├── posthog.ts           # PostHog client initialization and tracking
├── ga4.ts              # GA4/GTM dataLayer integration
├── events.ts           # Business event tracking (booking, services, packages)
├── trackingUtils.ts    # Centralized tracking utilities
└── README.md           # This file
```

## Configuration

All analytics configuration is managed through environment variables and runtime config:

```typescript
// .env
VITE_POSTHOG_API_KEY=phc_your_api_key
VITE_POSTHOG_API_HOST=https://app.posthog.com
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXXXX
VITE_META_PIXEL_ID=123456789012345
```

See `src/config/runtimeConfig.ts` for the complete configuration structure.

## Initialization

### App Setup

The AnalyticsProvider should be mounted at the root of your app:

```typescript
// src/App.tsx
import AnalyticsProvider from './components/providers/AnalyticsProvider';

function App() {
  return (
    <AnalyticsProvider>
      <YourAppContent />
    </AnalyticsProvider>
  );
}
```

### Automatic Tracking

The `UserBehaviorTracker` component automatically tracks:

- **Page views**: Captured on mount and URL changes
- **Button clicks**: Any `<button>` or `<a>` element clicks
- **Form submissions**: Form submit events
- **Scroll depth**: Tracked at 25%, 50%, 75%, and 100% scrolling milestones

```typescript
// In your main layout/root component
<UserBehaviorTracker />
```

## Event Tracking Functions

### Booking Events

#### `trackBookingStarted(eventType: string, origin?: string)`

Track when a user initiates the booking process.

```typescript
import { trackBookingStarted } from '@/lib/analytics/trackingUtils';

// When user clicks "Book Now"
trackBookingStarted('bruiloft-dj', 'hero-cta');

// In GA4: "begin_checkout" event
// In PostHog: "booking_started" event
// In Meta: "InitiateCheckout" event
```

**Event Name Conventions:**
- `bruiloft-dj` - Wedding DJ
- `bedrijfsfeest-dj` - Corporate Event DJ
- `feest-dj` - Party DJ

#### `trackBookingLead(origin, bookingId?, eventType?, packageId?, status?, value?, currency?)`

Track a completed booking lead submission.

```typescript
import { trackBookingLead } from '@/lib/analytics/trackingUtils';

trackBookingLead(
  'landing-page',           // origin
  'booking-001',            // bookingId
  'bruiloft-dj',           // eventType
  'pkg-premium',           // packageId
  'pending',               // status
  500,                     // value
  'EUR'                    // currency
);

// In GA4: "generate_lead" event
// In PostHog: "booking_lead" event
// In Meta: "Lead" event
```

### Service Events

#### `trackServiceViewed(serviceType: string, serviceId?: string, origin?: string)`

Track when a user views a service offering.

```typescript
import { trackServiceViewed } from '@/lib/analytics/trackingUtils';

trackServiceViewed(
  'bruiloft-dj',      // serviceType
  'service-card-1',   // serviceId
  'pricing-section'   // origin
);

// In GA4: "view_item" event
// In PostHog: "service_viewed" event
```

### Package Events

#### `trackPackageSelected(packageId, packageName, price?, currency?, serviceType?)`

Track when a user selects a service package.

```typescript
import { trackPackageSelected } from '@/lib/analytics/trackingUtils';

trackPackageSelected(
  'pkg-premium',              // packageId
  'Premium DJ Package',       // packageName
  500,                        // price
  'EUR',                      // currency
  'bruiloft-dj'              // serviceType
);

// In GA4: "select_item" event
// In PostHog: "package_selected" event
// In Meta: "AddToCart" event
```

### Contact Events

#### `trackContactChannelClick(channel: string, origin?: string, phoneNumber?: string)`

Track contact channel interactions (phone, email, WhatsApp, etc.).

```typescript
import { trackContactChannelClick } from '@/lib/analytics/trackingUtils';

trackContactChannelClick(
  'phone',                     // channel
  'contact-section',          // origin
  '+31-6-12345678'           // phoneNumber (optional)
);

// Supported channels: 'phone', 'email', 'whatsapp', 'instagram', 'messenger'

// In GA4: "select_content" event
// In PostHog: "contact_channel_click" event
// In Meta: "ContactChannelClick" event
```

### UI Events

#### `trackButtonClick(buttonId: string, buttonText?: string, analyticsLabel?: string)`

Track button clicks with optional categorization.

```typescript
import { trackButtonClick } from '@/lib/analytics/trackingUtils';

trackButtonClick(
  'cta-book-now',           // buttonId
  'Mijn DJ Boeken',         // buttonText
  'primary-cta'             // analyticsLabel
);

// Automatically tracked by UserBehaviorTracker for most buttons
// Use manually for custom analytics labels or special tracking
```

### Form Events

#### `trackFormFieldEngagement(formId: string, fieldName: string, fieldType?: string)`

Track individual form field interactions.

```typescript
import { trackFormFieldEngagement } from '@/lib/analytics/trackingUtils';

trackFormFieldEngagement(
  'booking-form',        // formId
  'event_date',         // fieldName
  'date'                // fieldType
);

// In GA4 & PostHog: "form_field_engagement" event
```

#### `trackFormSubmission(formId: string, formName: string, fieldCount?: number, submissionTime?: number)`

Track form submissions with metadata.

```typescript
import { trackFormSubmission } from '@/lib/analytics/trackingUtils';

trackFormSubmission(
  'booking-form',           // formId
  'DJ Booking Form',       // formName
  5,                       // fieldCount
  120                      // submissionTime (seconds)
);

// Automatically tracked by UserBehaviorTracker for form submissions
// Use manually for additional metadata
```

### Engagement Events

#### `trackScrollDepth(scrollPercentage: number)`

Track scroll depth milestones.

```typescript
import { trackScrollDepth } from '@/lib/analytics/trackingUtils';

trackScrollDepth(50); // User scrolled to 50%

// Automatically tracked by UserBehaviorTracker
// Manual tracking useful for custom scroll monitoring
```

#### `trackMediaEngagement(mediaType: string, mediaId: string, action: string, duration?: number)`

Track video, image carousel, and other media interactions.

```typescript
import { trackMediaEngagement } from '@/lib/analytics/trackingUtils';

trackMediaEngagement(
  'video',              // mediaType
  'testimonial-1',      // mediaId
  'play',              // action: 'play', 'pause', 'complete', 'view'
  45                   // duration in seconds (optional)
);

// In GA4 & PostHog: "media_engagement" event
```

### Error Tracking

#### `trackError(errorName: string, errorMessage: string, errorLocation?: string)`

Track application errors for debugging and monitoring.

```typescript
import { trackError } from '@/lib/analytics/trackingUtils';

trackError(
  'form_validation',                    // errorName
  'Email format invalid',              // errorMessage
  'QuickBookingForm'                   // errorLocation
);

// In GA4 & PostHog: "error_tracked" event
```

## Event Tracking Matrix

| Event | GA4 Event | PostHog Event | Meta Event | Purpose |
|-------|-----------|---------------|-----------|---------|
| Booking Started | `begin_checkout` | `booking_started` | `InitiateCheckout` | Track booking funnel entry |
| Booking Lead | `generate_lead` | `booking_lead` | `Lead` | Track booking submissions |
| Service Viewed | `view_item` | `service_viewed` | - | Track service exploration |
| Package Selected | `select_item` | `package_selected` | `AddToCart` | Track package selection |
| Contact Channel | `select_content` | `contact_channel_click` | `ContactChannelClick` | Track contact interactions |
| Button Click | `select_content` | `user_click` | - | Track UI interactions |
| Form Submission | `form_submit` | `form_submitted` | - | Track form completions |
| Scroll Milestone | `scroll_milestone` | `scroll_milestone` | - | Track engagement depth |
| Media Engagement | `media_engagement` | `media_engagement` | - | Track media interactions |
| Form Field | `form_field_engagement` | `form_field_engagement` | - | Track field interactions |
| Error | `error_tracked` | `error_tracked` | - | Track application errors |

## User Identification

### PostHog User Identification

```typescript
import { identifyUser, setUserProperties } from '@/lib/analytics/posthog';

// Identify a user
identifyUser('user-123', {
  email: 'user@example.com',
  name: 'John Doe',
  phone: '+31-6-12345678',
  customer_type: 'lead',
});

// Set additional properties without re-identifying
setUserProperties({
  booking_count: 5,
  last_booking_date: '2024-01-15',
  preferred_service: 'bruiloft-dj',
});

// Reset identification on logout
import { resetUserIdentification } from '@/lib/analytics/posthog';
resetUserIdentification();
```

## Best Practices

### 1. Always Use Descriptive IDs

```typescript
// Good
trackButtonClick('cta-book-now-hero', 'Mijn DJ Boeken');

// Avoid
trackButtonClick('btn-1', 'Click me');
```

### 2. Include Context Information

```typescript
// Good - includes origin/context
trackServiceViewed('bruiloft-dj', 'service-card-1', 'pricing-section');

// Avoid - missing context
trackServiceViewed('bruiloft-dj');
```

### 3. Use Consistent Event Naming

```typescript
// Naming convention: lowercase_with_underscores
trackCustomEvent('user_clicked_button');
trackCustomEvent('form_submitted');
trackCustomEvent('error_occurred');
```

### 4. Track User Actions at Right Time

```typescript
// Good - track after user action completes
const handleBooking = async () => {
  const result = await submitBooking();
  if (result.success) {
    trackBookingLead('landing-page', result.bookingId);
  }
};
```

### 5. Don't Track Sensitive Data

```typescript
// Avoid tracking sensitive information
// DON'T: password, credit card, SSN, etc.
trackError('form_validation', 'Incorrect password'); // OK - no details

// DON'T track PII unnecessarily
trackCustomEvent('user_action', {
  user_id: '123',        // OK - anonymized ID
  email: 'user@...',     // Avoid if possible
  address: '...',        // Avoid
});
```

### 6. Error Handling

All tracking functions have built-in error handling and won't crash your app:

```typescript
// Safe to call - won't throw errors
try {
  trackBookingStarted('invalid-type'); // Won't throw
} catch (e) {
  // This won't happen - errors are caught internally
}
```

## Testing Analytics

### Development Mode

Enable debug logging in development to see all tracking events:

```typescript
// Events logged to console in development mode
import.meta.env.MODE // 'development' or 'production'

// All tracking functions log warnings/errors in dev mode
```

### Verify GTM DataLayer

```typescript
// In browser console
window.dataLayer // View all pushed events
window.dataLayer.filter(e => e.event === 'booking_started') // Filter by event
```

### PostHog Dashboard

- Visit your PostHog dashboard
- Go to Events
- Look for events with your custom names
- Create insights and dashboards from the events

### Google Analytics 4

- Visit GA4 property
- Go to Real-time > Events
- Verify events are being received
- Set up custom events and conversions

## Troubleshooting

### Events Not Appearing in GA4

1. Check GTM container is loaded: `window.dataLayer` should exist
2. Verify GTM ID in environment variables
3. Check GA4 measurement ID configuration
4. Ensure tags are correctly configured in Google Tag Manager

### Events Not Appearing in PostHog

1. Check PostHog API key is valid: `phc_*` pattern
2. Verify API host is accessible
3. Check browser console for PostHog errors
4. Ensure PostHog is initialized before events are fired

### Performance Issues

1. Tracking functions use throttling for scroll events (1s minimum interval)
2. Events are batched by GA4 and PostHog
3. All operations are non-blocking
4. Consider disabling UserBehaviorTracker on high-traffic pages if needed

## Advanced: Custom Analytics Initialization

```typescript
// Fine-grained control for special cases
import { initializePostHog, trackCustomEvent } from '@/lib/analytics/posthog';

// Initialize only PostHog
initializePostHog();

// Track custom events with full control
trackCustomEvent('custom_event_name', {
  custom_property: 'value',
  timestamp: new Date().toISOString(),
});
```

## Migration Guide

### From Old Tracking to New System

**Old approach:**
```typescript
pushEvent({ name: 'booking_started', params: { type: 'wedding' } });
```

**New approach:**
```typescript
import { trackBookingStarted } from '@/lib/analytics/trackingUtils';
trackBookingStarted('bruiloft-dj', 'origin');
```

The new system automatically:
- Tracks across all platforms (GA4, PostHog, Meta)
- Handles error cases
- Provides consistent event structure
- Includes automatic logging/debugging

## Support & Issues

For issues or questions about analytics tracking:

1. Check the troubleshooting section above
2. Review event documentation for the specific event type
3. Check browser console for error messages
4. Verify analytics configuration in runtimeConfig.ts
5. Test in development mode first
