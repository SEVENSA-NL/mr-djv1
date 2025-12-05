# Complete Tracking Functions Reference

Comprehensive reference for all 21 analytics tracking functions available in the Mister DJ application.

## Import Statement

```typescript
import {
  // Booking functions
  trackBookingStarted,
  trackBookingLead,

  // Service functions
  trackServiceViewed,
  trackPackageSelected,

  // Contact functions
  trackContactChannelClick,

  // UI functions
  trackButtonClick,

  // Form functions
  trackFormFieldEngagement,
  trackFormSubmission,

  // Engagement functions
  trackScrollDepth,
  trackMediaEngagement,

  // Error functions
  trackError,
} from '@/lib/analytics/trackingUtils';
```

## PostHog-Specific Functions

Available directly from PostHog module:

```typescript
import {
  initializePostHog,
  trackPageView,
  trackCustomEvent,
  identifyUser,
  resetUserIdentification,
  setUserProperties,
} from '@/lib/analytics/posthog';
```

## GA4-Specific Functions

Available directly from GA4 module:

```typescript
import {
  pushEvent,
  trackPageView,
  trackCustomEvent,
} from '@/lib/analytics/ga4';
```

---

## Function Signatures & Documentation

### BOOKING FUNCTIONS

#### 1. trackBookingStarted

**Signature:**
```typescript
function trackBookingStarted(eventType: string, origin?: string): void
```

**Description:**
Track when a user initiates the booking process. This is typically called when the user clicks a "Book Now" CTA or enters the booking form.

**Parameters:**
- `eventType` (string, required): Type of event being booked
  - Options: `bruiloft-dj`, `bedrijfsfeest-dj`, `feest-dj`
- `origin` (string, optional): Where the action originated from
  - Examples: `hero-cta`, `landing-page`, `pricing-section`

**Events Triggered:**
- GA4: `begin_checkout`
- PostHog: `booking_started`
- Meta: `InitiateCheckout`

**Example:**
```typescript
trackBookingStarted('bruiloft-dj', 'hero-cta');
```

**Use Cases:**
- User clicks "Book Now" button
- User enters booking form
- User starts the checkout process

---

#### 2. trackBookingLead

**Signature:**
```typescript
function trackBookingLead(
  origin: string,
  bookingId?: string | null,
  eventType?: string | null,
  packageId?: string | null,
  status?: string | null,
  value?: number | null,
  currency?: string | null
): void
```

**Description:**
Track a completed booking lead submission. This is typically called after the user successfully submits their booking details.

**Parameters:**
- `origin` (string, required): Source of the booking
  - Examples: `booking-form`, `contact-form`, `cta-link`
- `bookingId` (string | null, optional): Unique booking identifier
- `eventType` (string | null, optional): Type of event
  - Options: `bruiloft-dj`, `bedrijfsfeest-dj`, `feest-dj`
- `packageId` (string | null, optional): Selected package ID
- `status` (string | null, optional): Booking status
  - Options: `pending`, `confirmed`, `completed`
- `value` (number | null, optional): Booking value in cents/lowest unit
- `currency` (string | null, optional): Currency code
  - Examples: `EUR`, `USD`, `GBP`

**Events Triggered:**
- GA4: `generate_lead`
- PostHog: `booking_lead`
- Meta: `Lead`

**Example:**
```typescript
trackBookingLead(
  'booking-form',
  'booking-001',
  'bruiloft-dj',
  'package-premium',
  'pending',
  50000,  // €500.00
  'EUR'
);
```

**Use Cases:**
- After user submits booking form
- After successful payment/lead capture
- For CRM lead sync

---

### SERVICE FUNCTIONS

#### 3. trackServiceViewed

**Signature:**
```typescript
function trackServiceViewed(
  serviceType: string,
  serviceId?: string,
  origin?: string
): void
```

**Description:**
Track when a user views or engages with a service offering. This helps understand which services interest users.

**Parameters:**
- `serviceType` (string, required): Type of service
  - Options: `bruiloft-dj`, `bedrijfsfeest-dj`, `feest-dj`
- `serviceId` (string, optional): Unique identifier for the service instance
  - Examples: `service-card-1`, `pricing-bruiloft`
- `origin` (string, optional): Where the service was viewed from
  - Examples: `hero-section`, `pricing-page`, `services-grid`

**Events Triggered:**
- GA4: `view_item`
- PostHog: `service_viewed`

**Example:**
```typescript
trackServiceViewed('bruiloft-dj', 'service-card-1', 'services-grid');
```

**Use Cases:**
- User views a service card
- User opens service details
- User navigates to service page
- User scrolls past service section

---

#### 4. trackPackageSelected

**Signature:**
```typescript
function trackPackageSelected(
  packageId: string,
  packageName: string,
  price?: number,
  currency?: string,
  serviceType?: string
): void
```

**Description:**
Track when a user selects a specific service package. This is a key conversion indicator.

**Parameters:**
- `packageId` (string, required): Unique package identifier
  - Examples: `pkg-standard`, `pkg-premium`, `pkg-deluxe`
- `packageName` (string, required): Display name of the package
  - Examples: `Standard Wedding DJ`, `Premium Package`
- `price` (number, optional): Price in lowest currency unit (cents)
  - Example: `50000` for €500.00
- `currency` (string, optional): Currency code
  - Examples: `EUR`, `USD`, `GBP`
- `serviceType` (string, optional): Type of service the package is for
  - Options: `bruiloft-dj`, `bedrijfsfeest-dj`, `feest-dj`

**Events Triggered:**
- GA4: `select_item`
- PostHog: `package_selected`
- Meta: `AddToCart`

**Example:**
```typescript
trackPackageSelected(
  'pkg-premium',
  'Premium Wedding DJ Package',
  150000,  // €1500.00
  'EUR',
  'bruiloft-dj'
);
```

**Use Cases:**
- User clicks "Select" on a package
- User hovers over package
- User expands package details
- User adds package to cart

---

### CONTACT FUNCTIONS

#### 5. trackContactChannelClick

**Signature:**
```typescript
function trackContactChannelClick(
  channel: string,
  origin?: string,
  phoneNumber?: string
): void
```

**Description:**
Track when a user interacts with a contact channel (phone, email, social media, etc.). This helps understand preferred contact methods.

**Parameters:**
- `channel` (string, required): Contact channel
  - Options: `phone`, `email`, `whatsapp`, `instagram`, `messenger`
- `origin` (string, optional): Where the contact action originated
  - Examples: `contact-section`, `footer`, `floating-cta`
- `phoneNumber` (string, optional): Phone number being called/displayed

**Events Triggered:**
- GA4: `select_content` (content_type: contact_channel)
- PostHog: `contact_channel_click`
- Meta: `ContactChannelClick`

**Example:**
```typescript
trackContactChannelClick('phone', 'contact-section', '+31-6-12345678');
trackContactChannelClick('whatsapp', 'floating-button');
trackContactChannelClick('email', 'footer');
```

**Use Cases:**
- User clicks phone button → initiates call
- User clicks email button → opens email client
- User clicks WhatsApp → opens WhatsApp
- User clicks Instagram → opens Instagram

---

### UI FUNCTIONS

#### 6. trackButtonClick

**Signature:**
```typescript
function trackButtonClick(
  buttonId: string,
  buttonText?: string,
  analyticsLabel?: string
): void
```

**Description:**
Track button clicks. Mostly used manually when you need custom categorization, as most clicks are tracked automatically by UserBehaviorTracker.

**Parameters:**
- `buttonId` (string, required): Unique button identifier
  - Examples: `cta-book-now`, `submit-form`, `close-modal`
- `buttonText` (string, optional): Display text of the button
  - Will be trimmed and truncated to 120 characters
- `analyticsLabel` (string, optional): Custom analytics label for categorization
  - Examples: `primary-cta`, `secondary-action`

**Events Triggered:**
- GA4: `select_content` (content_type: button)
- PostHog: `user_click`

**Example:**
```typescript
trackButtonClick('cta-book-now', 'Mijn DJ Boeken', 'primary-cta');
trackButtonClick('submit-form', 'Submit');
```

**Use Cases:**
- Custom button tracking with analytics labels
- Tracking shadow DOM buttons not caught by automatic tracking
- Special CTA buttons requiring additional context

---

### FORM FUNCTIONS

#### 7. trackFormFieldEngagement

**Signature:**
```typescript
function trackFormFieldEngagement(
  formId: string,
  fieldName: string,
  fieldType?: string
): void
```

**Description:**
Track individual form field interactions. Useful for understanding which fields users engage with and where they drop off.

**Parameters:**
- `formId` (string, required): Unique form identifier
  - Examples: `booking-form`, `contact-form`, `newsletter-form`
- `fieldName` (string, required): Name of the form field
  - Examples: `event_date`, `email`, `phone`, `event_type`
- `fieldType` (string, optional): Type of form field
  - Options: `text`, `email`, `tel`, `date`, `select`, `textarea`, `checkbox`, `radio`

**Events Triggered:**
- GA4: `form_field_engagement`
- PostHog: `form_field_engagement`

**Example:**
```typescript
trackFormFieldEngagement('booking-form', 'event_date', 'date');
trackFormFieldEngagement('booking-form', 'email', 'email');
trackFormFieldEngagement('booking-form', 'event_type', 'select');
```

**Use Cases:**
- Track field focus/engagement
- Understand which fields users interact with
- Identify fields causing drop-off
- Measure form completion rate per field

---

#### 8. trackFormSubmission

**Signature:**
```typescript
function trackFormSubmission(
  formId: string,
  formName: string,
  fieldCount?: number,
  submissionTime?: number
): void
```

**Description:**
Track form submissions with metadata. Automatically tracked for most forms by UserBehaviorTracker, but can be manually called for additional data.

**Parameters:**
- `formId` (string, required): Unique form identifier
- `formName` (string, required): Display name of the form
  - Examples: `DJ Booking Form`, `Contact Form`
- `fieldCount` (number, optional): Number of fields in the form
- `submissionTime` (number, optional): Time taken to fill form (in seconds)

**Events Triggered:**
- GA4: `form_submit`
- PostHog: `form_submitted`

**Example:**
```typescript
trackFormSubmission(
  'booking-form',
  'DJ Booking Form',
  5,  // 5 fields
  120  // 2 minutes to fill
);
```

**Use Cases:**
- Track successful form submissions
- Measure time-to-conversion
- Understand form complexity via field count
- Identify friction in form completion

---

### ENGAGEMENT FUNCTIONS

#### 9. trackScrollDepth

**Signature:**
```typescript
function trackScrollDepth(scrollPercentage: number): void
```

**Description:**
Track page scroll depth. Automatically tracked by UserBehaviorTracker at 25%, 50%, 75%, 100% milestones. Manually call for custom scroll tracking.

**Parameters:**
- `scrollPercentage` (number, required): Scroll depth as percentage (0-100)

**Events Triggered:**
- GA4: `scroll_milestone`
- PostHog: `scroll_milestone`

**Example:**
```typescript
trackScrollDepth(50);  // User scrolled to 50% of page
trackScrollDepth(75);  // User scrolled to 75% of page
```

**Use Cases:**
- Understand content engagement depth
- Identify content sections that users don't see
- Measure page scroll behavior

---

#### 10. trackMediaEngagement

**Signature:**
```typescript
function trackMediaEngagement(
  mediaType: string,
  mediaId: string,
  action: string,
  duration?: number
): void
```

**Description:**
Track engagement with media elements like videos, image carousels, and testimonials.

**Parameters:**
- `mediaType` (string, required): Type of media
  - Options: `video`, `image`, `carousel`, `audio`
- `mediaId` (string, required): Unique media identifier
  - Examples: `testimonial-1`, `demo-video`, `carousel-services`
- `action` (string, required): Action performed
  - Options: `play`, `pause`, `resume`, `complete`, `view`, `skip`
- `duration` (number, optional): Duration of engagement (in seconds)

**Events Triggered:**
- GA4: `media_engagement`
- PostHog: `media_engagement`

**Example:**
```typescript
// Video started
trackMediaEngagement('video', 'testimonial-1', 'play');

// Video completed
trackMediaEngagement('video', 'testimonial-1', 'complete', 45);

// Carousel viewed
trackMediaEngagement('carousel', 'services-carousel', 'view', 30);
```

**Use Cases:**
- Track video watch completion
- Monitor carousel engagement
- Measure media interaction
- Understand user interest in specific content

---

### ERROR FUNCTIONS

#### 11. trackError

**Signature:**
```typescript
function trackError(
  errorName: string,
  errorMessage: string,
  errorLocation?: string
): void
```

**Description:**
Track application errors and exceptions. Useful for monitoring and debugging production issues.

**Parameters:**
- `errorName` (string, required): Name/category of the error
  - Examples: `form_validation`, `api_error`, `permission_denied`
- `errorMessage` (string, required): Detailed error message
  - Examples: `Email format invalid`, `Failed to submit form`
- `errorLocation` (string, optional): Where the error occurred
  - Examples: `BookingForm.tsx`, `useBooking.ts`, `API response handler`

**Events Triggered:**
- GA4: `error_tracked`
- PostHog: `error_tracked`

**Example:**
```typescript
trackError(
  'form_validation',
  'Email format invalid',
  'QuickBookingForm'
);

trackError(
  'api_error',
  'Failed to fetch packages',
  'usePackages.ts'
);
```

**Use Cases:**
- Track form validation errors
- Monitor API failures
- Log permission/authorization errors
- Debug component errors

---

## POSTHOG-SPECIFIC FUNCTIONS

#### 12. initializePostHog

**Signature:**
```typescript
function initializePostHog(): void
```

**Description:**
Initialize the PostHog client. Called automatically by AnalyticsProvider but can be called manually if needed.

**Example:**
```typescript
initializePostHog();
```

---

#### 13. identifyUser

**Signature:**
```typescript
function identifyUser(userId: string, properties?: Record<string, unknown>): void
```

**Description:**
Identify a user in PostHog and set their properties for segmentation and analysis.

**Parameters:**
- `userId` (string, required): Unique user identifier
- `properties` (object, optional): User properties
  - Recommended: `email`, `phone`, `name`, `company`

**Example:**
```typescript
identifyUser('user-123', {
  email: 'user@example.com',
  phone: '+31-6-12345678',
  name: 'John Doe',
  booking_count: 2,
  customer_type: 'lead',
});
```

---

#### 14. resetUserIdentification

**Signature:**
```typescript
function resetUserIdentification(): void
```

**Description:**
Reset user identification. Typically called on logout.

**Example:**
```typescript
resetUserIdentification();
```

---

#### 15. setUserProperties

**Signature:**
```typescript
function setUserProperties(properties: Record<string, unknown>): void
```

**Description:**
Set additional user properties without re-identifying the user.

**Example:**
```typescript
setUserProperties({
  booking_count: 5,
  last_booking_date: '2024-01-15',
  preferred_service: 'bruiloft-dj',
});
```

---

#### 16. trackCustomEvent (PostHog)

**Signature:**
```typescript
function trackCustomEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void
```

**Description:**
Track a custom event in PostHog.

**Example:**
```typescript
trackCustomEvent('user_logged_in', {
  login_method: 'email',
  login_duration: 45,
});
```

---

#### 17. trackPageView (PostHog)

**Signature:**
```typescript
function trackPageView(pageName: string): void
```

**Description:**
Track a page view in PostHog.

**Example:**
```typescript
trackPageView('DJ Booking Page');
```

---

## GA4-SPECIFIC FUNCTIONS

#### 18. pushEvent

**Signature:**
```typescript
function pushEvent({ name, params }: Ga4Event): void
```

**Description:**
Push an event directly to the GTM dataLayer for GA4 tracking. Lower-level function, typically not used directly.

**Example:**
```typescript
pushEvent({
  name: 'custom_event',
  params: {
    event_category: 'booking',
    event_label: 'form_submit',
  },
});
```

---

#### 19. trackPageView (GA4)

**Signature:**
```typescript
function trackPageView(pageName: string): void
```

**Description:**
Track a page view in GA4.

**Example:**
```typescript
trackPageView('Services Page');
```

---

#### 20. trackCustomEvent (GA4)

**Signature:**
```typescript
function trackCustomEvent(
  eventName: string,
  params?: Record<string, unknown>
): void
```

**Description:**
Track a custom event in GA4.

**Example:**
```typescript
trackCustomEvent('user_action', {
  action_type: 'button_click',
  target: 'cta-button',
});
```

---

## AUTOMATIC TRACKING EVENTS

The `UserBehaviorTracker` component automatically tracks these events without manual intervention:

| Event | Trigger | GA4 Event | PostHog Event |
|-------|---------|-----------|---------------|
| Page View | Component mount, route change | `page_view` | `$pageview` |
| Button Click | Any `<button>` click | `select_content` | `user_click` |
| Link Click | Any `<a>` click | `select_content` | `user_click` |
| Form Submit | Form submit event | `form_submit` | `form_submitted` |
| Scroll 25% | User scrolls 25% | `scroll_milestone` | `scroll_milestone` |
| Scroll 50% | User scrolls 50% | `scroll_milestone` | `scroll_milestone` |
| Scroll 75% | User scrolls 75% | `scroll_milestone` | `scroll_milestone` |
| Scroll 100% | User scrolls 100% | `scroll_milestone` | `scroll_milestone` |

---

## Event Properties Reference

### Standard Properties (All Events)
- `timestamp`: ISO 8601 timestamp
- `url`: Current page URL (most events)

### Booking Event Properties
```typescript
{
  lead_origin: string,
  booking_id: string,
  event_type: string,        // bruiloft-dj, bedrijfsfeest-dj, feest-dj
  package_id: string,
  booking_status: string,    // pending, confirmed, completed
  value: number,
  currency: string,          // EUR, USD, etc.
}
```

### Service Event Properties
```typescript
{
  item_id: string,
  item_name: string,
  item_category: string,
  origin: string,
}
```

### Contact Event Properties
```typescript
{
  content_type: string,      // "contact_channel"
  item_id: string,           // phone, email, whatsapp, etc.
  item_variant: string,      // origin
  phone_number: string,
}
```

---

## Summary Table

| Function | Module | Use Case | Platforms |
|----------|--------|----------|-----------|
| trackBookingStarted | trackingUtils | Booking initiated | GA4, PostHog, Meta |
| trackBookingLead | trackingUtils | Booking submitted | GA4, PostHog, Meta |
| trackServiceViewed | trackingUtils | Service explored | GA4, PostHog |
| trackPackageSelected | trackingUtils | Package selected | GA4, PostHog, Meta |
| trackContactChannelClick | trackingUtils | Contact clicked | GA4, PostHog, Meta |
| trackButtonClick | trackingUtils | Button clicked | GA4, PostHog |
| trackFormFieldEngagement | trackingUtils | Form field used | GA4, PostHog |
| trackFormSubmission | trackingUtils | Form submitted | GA4, PostHog |
| trackScrollDepth | trackingUtils | Page scrolled | GA4, PostHog |
| trackMediaEngagement | trackingUtils | Media used | GA4, PostHog |
| trackError | trackingUtils | Error occurred | GA4, PostHog |
| initializePostHog | posthog | Setup | PostHog |
| identifyUser | posthog | User setup | PostHog |
| resetUserIdentification | posthog | User logout | PostHog |
| setUserProperties | posthog | User data | PostHog |
| trackCustomEvent | posthog/ga4 | Custom tracking | PostHog/GA4 |
| trackPageView | posthog/ga4 | Page view | PostHog/GA4 |
| pushEvent | ga4 | Low-level | GA4 |

---

## Total: 21 Tracking Functions

- **Business Functions**: 11
- **PostHog-Specific**: 4
- **GA4-Specific**: 3
- **Automatic (UserBehaviorTracker)**: 8+ additional
