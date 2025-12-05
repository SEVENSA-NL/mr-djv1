# Mister DJ Analytics Setup - Complete Summary

## Overview

A comprehensive analytics tracking system has been set up for the Mister DJ Vite/React application, integrating PostHog, Google Analytics 4 (GA4), and Meta Pixel for multi-platform analytics tracking.

## What Was Implemented

### 1. Core Analytics Modules

#### PostHog Integration (`src/lib/analytics/posthog.ts`)
- Full PostHog client initialization and management
- Page view tracking
- Button click tracking
- Form submission tracking
- User identification and property management
- Custom event tracking
- Error handling with development logging

**Key Functions:**
```typescript
initializePostHog()          // Initialize on app startup
trackPageView(pageName)      // Track page views
trackButtonClick(id, text)   // Track button interactions
trackFormSubmission(id, action)  // Track form submissions
identifyUser(userId, props)  // Identify users
resetUserIdentification()    // Reset on logout
trackCustomEvent(name, props)  // Track custom events
```

#### GA4 Integration (`src/lib/analytics/ga4.ts`)
- GTM dataLayer integration for GA4
- Event pushing to dataLayer
- Page view tracking
- Button click tracking
- Form submission tracking
- Custom event support

**Key Functions:**
```typescript
pushEvent(event)                // Push event to GTM dataLayer
trackPageView(pageName)         // Track page views
trackButtonClick(id, text)      // Track button clicks
trackFormSubmission(id, action) // Track form submissions
trackCustomEvent(name, params)  // Track custom events
```

#### Enhanced Events Module (`src/lib/analytics/events.ts`)
Extended with business-specific event tracking:
- Booking lead tracking
- Contact channel tracking
- Service view tracking
- Package selection tracking
- Booking process tracking

All events now track across GA4, PostHog, and Meta Pixel simultaneously.

**Key Functions:**
```typescript
trackBookingLead(...)       // Multi-platform booking tracking
trackContactChannelClick(...) // Contact interaction tracking
trackServiceViewed(...)     // Service exploration tracking
trackPackageSelected(...)   // Package selection tracking
trackBookingStarted(...)    // Booking initiation tracking
```

### 2. Analytics Provider Component

**File:** `src/components/providers/AnalyticsProvider.tsx`

Centralizes analytics initialization and page view tracking:
- Initializes PostHog on component mount
- Tracks initial page view
- Listens for URL/route changes
- Tracks page views on navigation
- Provides React context for analytics

**Usage:**
```typescript
<AnalyticsProvider>
  <App />
</AnalyticsProvider>
```

### 3. Automatic User Behavior Tracking

**File:** `src/components/analytics/UserBehaviorTracker.tsx`

Completely reimplemented to track automatically:
- **Button/Link Clicks**: Automatically captures all button and link interactions
- **Form Submissions**: Tracks form submission events
- **Scroll Depth**: Tracks scroll milestones (25%, 50%, 75%, 100%)
- **Event Throttling**: Optimized scroll tracking with 1-second throttling
- **Multi-Platform**: Events sent to both GA4 and PostHog

**Usage:**
```typescript
<UserBehaviorTracker />  // Mount once at app root
```

### 4. Centralized Tracking Utilities

**File:** `src/lib/analytics/trackingUtils.ts`

Comprehensive tracking utility module with 11 main functions:

#### Booking Events
```typescript
trackBookingStarted(eventType, origin?)
trackBookingLead(origin, bookingId?, eventType?, packageId?, status?, value?, currency?)
```

#### Service Events
```typescript
trackServiceViewed(serviceType, serviceId?, origin?)
trackPackageSelected(packageId, packageName, price?, currency?, serviceType?)
```

#### Contact Events
```typescript
trackContactChannelClick(channel, origin?, phoneNumber?)
```

#### UI Events
```typescript
trackButtonClick(buttonId, buttonText?, analyticsLabel?)
```

#### Form Events
```typescript
trackFormFieldEngagement(formId, fieldName, fieldType?)
trackFormSubmission(formId, formName, fieldCount?, submissionTime?)
```

#### Engagement Events
```typescript
trackScrollDepth(scrollPercentage)
trackMediaEngagement(mediaType, mediaId, action, duration?)
```

#### Error Events
```typescript
trackError(errorName, errorMessage, errorLocation?)
```

### 5. Comprehensive Documentation

#### README.md (`src/lib/analytics/README.md`)
- Complete architecture overview
- Configuration guide
- All event tracking functions documented
- Best practices
- Troubleshooting guide
- Testing strategies
- Advanced customization

#### INTEGRATION_GUIDE.md (`src/lib/analytics/INTEGRATION_GUIDE.md`)
- Step-by-step component integration examples
- Service card implementation
- Contact channel tracking
- Button component with analytics
- Event type selector
- Pricing table integration
- Video testimonial tracking
- Error boundary integration
- Page routing integration
- Hook patterns
- Unit testing examples
- Common patterns and multi-step flows
- Debugging techniques

#### QUICK_REFERENCE.md (`src/lib/analytics/QUICK_REFERENCE.md`)
- Quick lookup table for all functions
- Parameter reference
- Event type constants
- Contact channel options
- Media actions list
- Common usage patterns
- Environment variables reference
- Automatic tracking features
- TypeScript type definitions
- Common mistakes to avoid
- Performance tips

## Event Tracking Matrix

| Event | GA4 Event | PostHog Event | Meta Event | Context |
|-------|-----------|---------------|-----------|---------|
| Booking Started | `begin_checkout` | `booking_started` | `InitiateCheckout` | User initiates booking |
| Booking Lead | `generate_lead` | `booking_lead` | `Lead` | Booking form submitted |
| Service Viewed | `view_item` | `service_viewed` | - | User views a service |
| Package Selected | `select_item` | `package_selected` | `AddToCart` | User selects a package |
| Contact Channel | `select_content` | `contact_channel_click` | `ContactChannelClick` | User contacts via channel |
| Button Click | `select_content` | `user_click` | - | Any button click |
| Form Submission | `form_submit` | `form_submitted` | - | Form submission |
| Scroll Milestone | `scroll_milestone` | `scroll_milestone` | - | User scrolls to depth |
| Media Engagement | `media_engagement` | `media_engagement` | - | Video/media interaction |
| Form Field | `form_field_engagement` | `form_field_engagement` | - | Field interaction |
| Error | `error_tracked` | `error_tracked` | - | Error occurred |

## Service Type Constants

The system recognizes and tracks these service types:
- `bruiloft-dj` - Wedding DJ
- `bedrijfsfeest-dj` - Corporate Event DJ
- `feest-dj` - Party DJ

## Contact Channel Constants

The system supports these contact channels:
- `phone` - Phone call
- `email` - Email
- `whatsapp` - WhatsApp messaging
- `instagram` - Instagram DM
- `messenger` - Facebook Messenger

## Implementation Checklist

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install posthog-js  # Already in package.json
   ```

2. **Add AnalyticsProvider to App Root**
   ```typescript
   // src/App.tsx
   import AnalyticsProvider from './components/providers/AnalyticsProvider';

   function App() {
     return (
       <AnalyticsProvider>
         <UserBehaviorTracker />
         {/* Your app content */}
       </AnalyticsProvider>
     );
   }
   ```

3. **Configure Environment Variables**
   ```bash
   # .env or .env.local
   VITE_POSTHOG_API_KEY=phc_your_key
   VITE_POSTHOG_API_HOST=https://app.posthog.com
   VITE_GA4_MEASUREMENT_ID=G-XXXXX
   VITE_GTM_ID=GTM-XXXXX
   VITE_META_PIXEL_ID=123456789
   ```

4. **Implement Tracking in Components**
   See `INTEGRATION_GUIDE.md` for component-specific examples

### Verification Steps

1. **Test Automatic Tracking**
   - Mount UserBehaviorTracker
   - Click buttons - should be tracked automatically
   - Submit forms - should be tracked automatically
   - Scroll page - should track milestones at 25%, 50%, 75%, 100%

2. **Verify PostHog Events**
   - Check PostHog dashboard → Events
   - Look for `user_click`, `form_submitted`, `scroll_milestone` events
   - Check page view events

3. **Verify GA4 Events**
   - Check GTM dataLayer in browser console: `window.dataLayer`
   - Verify GA4 dashboard → Real-time → Events
   - Look for custom events

4. **Debug in Development**
   - All tracking logs to console in development mode
   - Set `import.meta.env.MODE = 'development'` to see debug logs

## File Structure

```
frontend/src/
├── lib/analytics/
│   ├── posthog.ts                  # PostHog client (NEW)
│   ├── ga4.ts                      # GA4 integration (ENHANCED)
│   ├── events.ts                   # Business events (ENHANCED)
│   ├── trackingUtils.ts            # Tracking utilities (NEW)
│   ├── README.md                   # Full documentation (NEW)
│   ├── INTEGRATION_GUIDE.md        # Integration examples (NEW)
│   └── QUICK_REFERENCE.md          # Quick reference (NEW)
├── components/
│   ├── analytics/
│   │   └── UserBehaviorTracker.tsx # Behavior tracking (ENHANCED)
│   └── providers/
│       └── AnalyticsProvider.tsx   # Analytics provider (NEW)
└── config/
    └── runtimeConfig.ts            # Config (already exists)
```

## Configuration Reference

### Environment Variables

```bash
# PostHog Configuration
VITE_POSTHOG_API_KEY=phc_your_api_key           # PostHog API key
VITE_POSTHOG_API_HOST=https://app.posthog.com   # PostHog host (optional)

# Google Analytics Configuration
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX            # GA4 measurement ID
VITE_GTM_ID=GTM-XXXXXXXXX                       # Google Tag Manager ID

# Meta Pixel Configuration
VITE_META_PIXEL_ID=123456789012345              # Meta pixel ID

# Consent/GDPR Configuration
VITE_COMPLIANZ_SITE_ID=cmplz_xxxxx              # Complianz site ID
```

### Runtime Config

All configuration is managed in `src/config/runtimeConfig.ts`:

```typescript
runtimeConfig.analytics.posthog     // PostHog config
runtimeConfig.marketing             // Marketing pixel config
runtimeConfig.consent               // Consent config
```

## Usage Examples

### Basic Integration

```typescript
import { trackBookingStarted, trackPackageSelected } from '@/lib/analytics/trackingUtils';

// In your booking form
const handleSelectService = (serviceType) => {
  trackBookingStarted(serviceType, 'booking-form');
};

const handleSelectPackage = (pkg) => {
  trackPackageSelected(pkg.id, pkg.name, pkg.price, 'EUR', pkg.serviceType);
};
```

### Component with Analytics

```typescript
import { trackServiceViewed } from '@/lib/analytics/trackingUtils';

export function ServiceCard({ service }) {
  useEffect(() => {
    trackServiceViewed(service.type, service.id, 'services-section');
  }, [service]);

  return <div>{service.name}</div>;
}
```

### Error Boundary

```typescript
import { trackError } from '@/lib/analytics/trackingUtils';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    trackError(error.name, error.message, info.componentStack);
  }
}
```

## Performance Characteristics

- **Scroll Tracking**: Throttled to 1-second minimum interval
- **Event Batching**: GA4 and PostHog batch events automatically
- **Non-blocking**: All tracking is non-blocking and won't delay UI
- **Error Safe**: All functions are wrapped in try-catch blocks
- **Memory**: Minimal memory footprint with automatic cleanup

## Browser Compatibility

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Gracefully handles server-side rendering (checks for `typeof window`)
- Development-only console logging doesn't affect production

## Troubleshooting

### Events Not Appearing in PostHog
- Check PostHog API key is valid: `phc_*` pattern or 32+ chars
- Verify `import.meta.env.VITE_POSTHOG_API_KEY` is set
- Check browser console for initialization errors

### Events Not Appearing in GA4
- Verify GTM dataLayer exists: `window.dataLayer`
- Check GA4 measurement ID is correct
- Ensure GTM container is loaded
- Verify GA4 tags are configured in GTM

### Scroll Tracking Not Working
- Verify page is scrollable (content height > window height)
- Check scroll events aren't being prevented
- Look for scroll event listeners in browser

### Performance Issues
- Scroll events are automatically throttled
- Consider disabling UserBehaviorTracker on high-traffic pages if needed
- All events are batched by GA4/PostHog

## Next Steps

1. **Set Up Analytics Dashboards**
   - Create PostHog dashboards for user behavior
   - Set up GA4 goals and funnels
   - Configure Meta pixel conversion tracking

2. **Implement Component Tracking**
   - Follow INTEGRATION_GUIDE.md for each component
   - Test tracking in development mode
   - Verify events in dashboards

3. **Monitor and Optimize**
   - Review analytics data weekly
   - Identify conversion bottlenecks
   - Optimize based on user behavior data

4. **Advanced Features**
   - Set up user cohorts in PostHog
   - Create retention funnels
   - Analyze user journeys

## Support Resources

- **Full Documentation**: `src/lib/analytics/README.md`
- **Integration Examples**: `src/lib/analytics/INTEGRATION_GUIDE.md`
- **Quick Lookup**: `src/lib/analytics/QUICK_REFERENCE.md`
- **PostHog Docs**: https://posthog.com/docs
- **GA4 Docs**: https://support.google.com/analytics
- **GTM Docs**: https://support.google.com/tagmanager

## Summary of Tracking Functions

### Available Tracking Functions (17 total)

**Booking & Leads (2)**
- `trackBookingStarted()` - Booking process initiated
- `trackBookingLead()` - Booking form submitted

**Services (2)**
- `trackServiceViewed()` - Service viewed
- `trackPackageSelected()` - Package selected

**Contact (1)**
- `trackContactChannelClick()` - Contact channel clicked

**UI (1)**
- `trackButtonClick()` - Button clicked

**Forms (2)**
- `trackFormFieldEngagement()` - Form field interacted
- `trackFormSubmission()` - Form submitted

**Engagement (2)**
- `trackScrollDepth()` - Page scrolled
- `trackMediaEngagement()` - Video/media engaged

**Errors (1)**
- `trackError()` - Error occurred

**PostHog Specific (4)**
- `initializePostHog()` - Initialize PostHog
- `identifyUser()` - Identify user
- `resetUserIdentification()` - Reset user
- `setUserProperties()` - Set user properties

## Auto-Tracked Events (UserBehaviorTracker)

The following events are automatically tracked without manual intervention:
- Page views (on mount and route changes)
- All button clicks
- All form submissions
- Scroll depth milestones (25%, 50%, 75%, 100%)

## Summary

The analytics setup is production-ready with:
- ✅ Multi-platform tracking (GA4, PostHog, Meta)
- ✅ Comprehensive documentation
- ✅ TypeScript support
- ✅ Error handling and safety
- ✅ Development debugging
- ✅ Performance optimization
- ✅ Automatic user behavior tracking
- ✅ Business event tracking
- ✅ Flexible component integration
- ✅ Easy to extend and customize

All tracking functions are exported from `@/lib/analytics/trackingUtils` for easy importing and usage throughout your application.
