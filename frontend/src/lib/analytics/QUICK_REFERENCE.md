# Analytics Quick Reference

Quick lookup guide for all available tracking functions in the Mister DJ analytics system.

## Setup

```typescript
// Add to App.tsx root
import AnalyticsProvider from '@/components/providers/AnalyticsProvider';
import UserBehaviorTracker from '@/components/analytics/UserBehaviorTracker';

<AnalyticsProvider>
  <UserBehaviorTracker />
  <App />
</AnalyticsProvider>
```

## Import Statement

```typescript
import * as tracking from '@/lib/analytics/trackingUtils';
// or individual imports:
import {
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
} from '@/lib/analytics/trackingUtils';
```

## Tracking Functions

### Booking Events

| Function | Parameters | Example |
|----------|-----------|---------|
| `trackBookingStarted` | `(eventType, origin?)` | `trackBookingStarted('bruiloft-dj', 'hero')` |
| `trackBookingLead` | `(origin, bookingId?, eventType?, packageId?, status?, value?, currency?)` | `trackBookingLead('form', 'b123', 'bruiloft-dj', 'p1', 'pending', 500, 'EUR')` |

### Service Events

| Function | Parameters | Example |
|----------|-----------|---------|
| `trackServiceViewed` | `(serviceType, serviceId?, origin?)` | `trackServiceViewed('bruiloft-dj', 'card-1', 'hero')` |
| `trackPackageSelected` | `(packageId, packageName, price?, currency?, serviceType?)` | `trackPackageSelected('pkg-1', 'Premium', 500, 'EUR', 'bruiloft-dj')` |

### Contact Events

| Function | Parameters | Example |
|----------|-----------|---------|
| `trackContactChannelClick` | `(channel, origin?, phoneNumber?)` | `trackContactChannelClick('phone', 'footer', '+31-6-123')` |

### UI Events

| Function | Parameters | Example |
|----------|-----------|---------|
| `trackButtonClick` | `(buttonId, buttonText?, analyticsLabel?)` | `trackButtonClick('cta-1', 'Book Now', 'primary')` |

### Form Events

| Function | Parameters | Example |
|----------|-----------|---------|
| `trackFormFieldEngagement` | `(formId, fieldName, fieldType?)` | `trackFormFieldEngagement('booking-form', 'email', 'text')` |
| `trackFormSubmission` | `(formId, formName, fieldCount?, submissionTime?)` | `trackFormSubmission('booking-form', 'Booking', 5, 120)` |

### Engagement Events

| Function | Parameters | Example |
|----------|-----------|---------|
| `trackScrollDepth` | `(scrollPercentage)` | `trackScrollDepth(50)` |
| `trackMediaEngagement` | `(mediaType, mediaId, action, duration?)` | `trackMediaEngagement('video', 'testimonial-1', 'play', 45)` |

### Error Events

| Function | Parameters | Example |
|----------|-----------|---------|
| `trackError` | `(errorName, errorMessage, errorLocation?)` | `trackError('validation', 'Email invalid', 'BookingForm')` |

## Event Types (for trackBookingStarted)

- `bruiloft-dj` - Wedding DJ
- `bedrijfsfeest-dj` - Corporate Event DJ
- `feest-dj` - Party DJ

## Contact Channels (for trackContactChannelClick)

- `phone` - Phone call
- `email` - Email
- `whatsapp` - WhatsApp
- `instagram` - Instagram
- `messenger` - Facebook Messenger

## Media Actions (for trackMediaEngagement)

- `play` - Media started playing
- `pause` - Media paused
- `complete` - Media finished playing
- `view` - Media viewed

## Common Usage Patterns

### Booking Form
```typescript
// On form load
trackFormFieldEngagement('booking-form', 'initialized');

// On service select
trackServiceViewed('bruiloft-dj', 'booking-form', 'service-select');

// On package select
trackPackageSelected('pkg-1', 'Premium', 500, 'EUR', 'bruiloft-dj');

// On submit button
trackBookingStarted('bruiloft-dj', 'booking-form');

// After successful submission
trackBookingLead('booking-form', 'booking-123', 'bruiloft-dj', 'pkg-1', 'pending', 500, 'EUR');
```

### Contact Button
```typescript
trackContactChannelClick('phone', 'contact-section', '+31-6-12345678');
// Then: window.location.href = 'tel:+31-6-12345678';
```

### Service Card
```typescript
trackServiceViewed('bruiloft-dj', 'service-card-1', 'services-section');
```

### Package Selection
```typescript
trackPackageSelected(
  'premium-wedding',
  'Premium Wedding Package',
  1500,
  'EUR',
  'bruiloft-dj'
);
```

### Video Testimonial
```typescript
// On play
trackMediaEngagement('video', 'testimonial-1', 'play');

// On complete
trackMediaEngagement('video', 'testimonial-1', 'complete', 45);
```

## Environment Variables

```bash
VITE_POSTHOG_API_KEY=phc_your_api_key
VITE_POSTHOG_API_HOST=https://app.posthog.com
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXXXX
VITE_META_PIXEL_ID=123456789012345
```

## Automatic Tracking (UserBehaviorTracker)

The `UserBehaviorTracker` component automatically tracks:
- Page views on mount and URL changes
- Button/link clicks
- Form submissions
- Scroll depth milestones (25%, 50%, 75%, 100%)

No manual tracking needed for these events!

## Advanced: Direct PostHog/GA4 Access

```typescript
// Direct PostHog
import { trackCustomEvent, identifyUser } from '@/lib/analytics/posthog';

trackCustomEvent('custom_event', { prop: 'value' });
identifyUser('user-123', { email: 'user@example.com' });

// Direct GA4
import * as GA4 from '@/lib/analytics/ga4';

GA4.trackCustomEvent('custom_event', { prop: 'value' });
```

## Debugging

```typescript
// Check GTM dataLayer
console.log(window.dataLayer);

// Check PostHog
console.log(window.posthog);

// All tracking logs to console in development mode
```

## TypeScript Types

```typescript
// Service engagement
type ServiceEngagementPayload = {
  serviceType: string;
  serviceId?: string;
  origin?: string;
};

// Booking tracking
type BookingTrackingPayload = {
  origin: string;
  bookingId?: string | null;
  eventType?: string | null;
  packageId?: string | null;
  status?: string | null;
  value?: number | null;
  currency?: string | null;
};

// Package selection
type PackageSelectionPayload = {
  packageId: string;
  packageName: string;
  price?: number;
  currency?: string;
  serviceType?: string;
};

// Contact channel
type ContactChannelPayload = {
  channel: string;
  origin?: string;
  phoneNumber?: string;
};

// Booking started
type BookingStartedPayload = {
  eventType: string;
  origin?: string;
};
```

## File Structure

```
src/lib/analytics/
├── posthog.ts              # PostHog client
├── ga4.ts                  # GA4/GTM integration
├── events.ts               # Business event tracking
├── trackingUtils.ts        # Central tracking utilities
├── README.md               # Full documentation
├── INTEGRATION_GUIDE.md    # Component integration examples
└── QUICK_REFERENCE.md      # This file

src/components/
├── analytics/
│   └── UserBehaviorTracker.tsx  # Automatic tracking
└── providers/
    └── AnalyticsProvider.tsx    # Analytics initialization
```

## Common Mistakes to Avoid

1. **Forgetting to initialize**: Wrap app with `<AnalyticsProvider>`
2. **Missing origin parameter**: Always include context where possible
3. **Tracking sensitive data**: Don't track passwords, credit cards, etc.
4. **Not handling errors**: All functions are safe and won't crash app
5. **Calling in wrong order**: Initialize before tracking events
6. **Using inconsistent IDs**: Use descriptive, consistent identifiers

## Performance Tips

1. Scroll tracking is automatically throttled
2. Events are batched by GA4 and PostHog
3. All tracking is non-blocking
4. Use identifyUser for user context (don't repeat on every event)
5. Debounce rapid events if needed

## Support

See detailed docs:
- `README.md` - Full documentation
- `INTEGRATION_GUIDE.md` - Component examples
- `QUICK_REFERENCE.md` - This file
