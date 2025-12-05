# Booking Form Integration - Setup Guide

## Overview

Complete Next.js booking form system with validation, spam protection, analytics tracking, and backend API integration for Mr. DJ.

## Features

- Multi-step form (Contact → Event Details → Package Selection)
- Real-time validation with Zod
- React Hook Form integration
- Mobile-responsive design
- Dark mode support
- Analytics tracking (PostHog)
- Spam protection (honeypot, rate limiting, pattern detection)
- Loading states and error handling
- Success/error notifications
- Booking confirmation page
- API route handler with validation

## Project Structure

```
frontend/
├── components/booking/
│   ├── BookingForm.tsx              # Main form component
│   ├── BookingForm.module.css       # Form styles
│   ├── ContactForm.tsx              # Contact info section
│   ├── ContactForm.module.css
│   ├── DatePicker.tsx               # Date selection component
│   ├── DatePicker.module.css
│   ├── PackageSelector.tsx          # Package selection component
│   ├── PackageSelector.module.css
│   └── AvailabilityChecker.tsx      # Existing availability checker
│
├── lib/
│   ├── schemas/
│   │   └── booking.ts               # Zod validation schemas
│   ├── hooks/
│   │   └── useBookingForm.ts        # Custom form hook
│   ├── analytics/
│   │   └── bookingTracking.ts       # PostHog tracking utilities
│   └── security/
│       ├── rateLimiter.ts           # Client-side rate limiting
│       └── spamProtection.ts        # Spam detection utilities
│
└── app/
    ├── api/booking/
    │   └── route.ts                 # Booking API handler
    └── booking/
        └── confirmation/
            ├── page.tsx             # Confirmation page
            └── page.module.css
```

## Installation

### 1. Dependencies

Already installed in package.json:
- `react-hook-form`: ^7.65.0
- `@hookform/resolvers`: ^5.2.2
- `zod`: ^4.1.12
- `react-day-picker`: ^9.11.1
- `posthog-js`: ^1.168.0

### 2. Environment Variables

Add to `.env.local`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Backend Integration (when ready)
BACKEND_API_URL=https://api.example.com
BACKEND_API_KEY=your_api_key_here

# Email Service (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Usage

### Basic Implementation

Create a booking page at `/app/booking/page.tsx`:

```tsx
import { BookingForm } from '@/components/booking/BookingForm';

export default function BookingPage() {
  return (
    <div className="container">
      <h1>Boek je DJ</h1>
      <BookingForm />
    </div>
  );
}
```

### Custom Form Implementation

```tsx
import { useBookingForm } from '@/lib/hooks/useBookingForm';
import { ContactForm } from '@/components/booking/ContactForm';

export default function CustomBooking() {
  const { form, state, submitBooking } = useBookingForm();

  return (
    <form onSubmit={form.handleSubmit(submitBooking)}>
      <ContactForm
        register={form.register}
        errors={form.formState.errors}
      />
      <button type="submit" disabled={state.isSubmitting}>
        {state.isSubmitting ? 'Versturen...' : 'Verstuur'}
      </button>
    </form>
  );
}
```

## Validation Schema

### Available Types

```typescript
// Event Types
type EventType = 'bruiloft' | 'bedrijfsfeest' | 'feest' | 'verjaardag' | 'jubileum' | 'other';

// Package Types
type PackageType = 'basis' | 'premium' | 'all-in' | 'custom';

// Form Data Structure
interface BookingFormData {
  // Contact Info
  name: string;
  email: string;
  phone: string;
  company?: string;

  // Event Details
  eventType: EventType;
  eventDate: string;
  eventTime?: string;
  guestCount?: number;
  duration?: number;
  location: {
    venue?: string;
    address?: string;
    city: string;
    postalCode?: string;
  };

  // Package Selection
  packageType: PackageType;
  addons?: Array<{ id: string; name: string; price: number }>;
  specialRequests?: string;

  // Additional
  budget?: number;
  hearAboutUs?: string;
  newsletter: boolean;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  website?: string; // Honeypot
}
```

### Custom Validation

```typescript
import { bookingFormSchema, validateBookingForm } from '@/lib/schemas/booking';

const result = validateBookingForm(formData);
if (!result.success) {
  console.error(result.error.flatten());
}
```

## API Integration

### Endpoint: POST /api/booking

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0612345678",
  "eventType": "bruiloft",
  "eventDate": "2025-06-15",
  "location": {
    "city": "Amsterdam"
  },
  "packageType": "premium",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

Response (Success):
```json
{
  "success": true,
  "bookingId": "BK-ABC123",
  "message": "Je aanvraag is succesvol ontvangen."
}
```

Response (Error):
```json
{
  "error": "Validatie mislukt",
  "code": "VALIDATION_ERROR",
  "details": {
    "fieldErrors": {
      "email": ["Voer een geldig e-mailadres in"]
    }
  }
}
```

### Backend Integration

Update `/app/api/booking/route.ts`:

```typescript
// Send to backend API
const backendResponse = await fetch(process.env.BACKEND_API_URL + '/bookings', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bookingPayload),
});

if (!backendResponse.ok) {
  throw new Error('Backend API error');
}
```

## Analytics Tracking

### Available Events

```typescript
import { BookingAnalytics } from '@/lib/analytics/bookingTracking';

// Track form start
BookingAnalytics.trackFormStarted();

// Track step completion
BookingAnalytics.trackStepCompleted(1, { eventType: 'bruiloft' });

// Track package selection
BookingAnalytics.trackPackageSelected('premium');

// Track submission
BookingAnalytics.trackSubmitSuccess('BK-ABC123', {
  eventType: 'bruiloft',
  packageType: 'premium'
});
```

### PostHog Dashboard

View events in PostHog:
- `booking_form_started`
- `booking_form_step_completed`
- `booking_package_selected`
- `booking_form_submit_success`
- `booking_conversion`

## Spam Protection

### Multiple Layers

1. **Honeypot Field**: Hidden field that should remain empty
2. **Rate Limiting**: Max 3 submissions per minute per IP
3. **Submission Time**: Minimum 3 seconds to complete form
4. **Email Validation**: Blocks disposable email domains
5. **Pattern Detection**: Detects common spam keywords
6. **Browser Fingerprinting**: Basic client identification

### Usage

```typescript
import { performSpamCheck, SubmissionTimeValidator } from '@/lib/security/spamProtection';

const timeValidator = new SubmissionTimeValidator(3000);

// Later, on submit
const spamCheck = performSpamCheck(formData, timeValidator);
if (spamCheck.isSpam) {
  console.warn('Spam detected:', spamCheck.reasons);
}
```

## Security Features

### Rate Limiting

Client-side:
```typescript
import { bookingRateLimiter } from '@/lib/security/rateLimiter';

if (!bookingRateLimiter.isAllowed()) {
  alert('Te veel aanvragen. Probeer het later opnieuw.');
  return;
}

bookingRateLimiter.recordAttempt();
```

Server-side rate limiting is implemented in the API route handler.

### CSRF Protection

Next.js API routes are automatically protected against CSRF when using the built-in `fetch` API.

### Data Sanitization

All inputs are validated and sanitized through Zod schemas before processing.

## Customization

### Styling

All components use CSS Modules. Override styles by:

1. Import the module CSS
2. Create custom classes
3. Use CSS variables for theming

Example:
```css
:root {
  --color-primary: #3b82f6;
  --color-error: #dc2626;
  --color-success: #10b981;
}
```

### Form Fields

Add custom fields in `booking.ts` schema:

```typescript
export const bookingFormSchema = z.object({
  // ... existing fields
  customField: z.string().optional(),
});
```

### Packages & Pricing

Edit packages in `PackageSelector.tsx`:

```typescript
const PACKAGES: Package[] = [
  {
    id: 'custom-package',
    name: 'Custom',
    description: 'Your description',
    price: '€999',
    features: ['Feature 1', 'Feature 2'],
  },
];
```

## Testing

### Manual Testing

1. Fill form with valid data → Should succeed
2. Fill form too quickly → Should detect spam
3. Fill honeypot field → Should block
4. Use disposable email → Should warn/block
5. Submit 4 times in 1 minute → Should rate limit
6. Test validation errors → Should show error messages

### Test URLs

- Form: http://localhost:3000/booking
- Confirmation: http://localhost:3000/booking/confirmation?id=TEST-123
- API Health: http://localhost:3000/api/booking (GET)

## Deployment Checklist

- [ ] Configure environment variables
- [ ] Set up backend API integration
- [ ] Configure email service (SMTP)
- [ ] Set up PostHog project
- [ ] Test rate limiting in production
- [ ] Configure CORS if needed
- [ ] Set up monitoring/alerts
- [ ] Test mobile responsiveness
- [ ] Verify analytics tracking
- [ ] Test confirmation emails

## Troubleshooting

### Form not submitting

1. Check browser console for errors
2. Verify API route is accessible
3. Check network tab for API response
4. Verify validation schema matches form data

### Analytics not tracking

1. Verify PostHog key in environment
2. Check PostHog is loaded in browser
3. Open browser console and check for `window.posthog`
4. Verify events in PostHog dashboard

### Rate limiting issues

1. Clear localStorage: `localStorage.clear()`
2. Wait 1 minute for rate limit reset
3. Check rate limit config in code

## Support

For issues or questions:
- Check this documentation
- Review component code comments
- Contact development team

## License

Proprietary - Mr. DJ © 2025
