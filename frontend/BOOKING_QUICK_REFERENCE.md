# Booking Form - Quick Reference

## File Locations

### Components
```
/srv/apps/mr-djv1/frontend/components/booking/
├── BookingForm.tsx              # Main form (multi-step)
├── BookingForm.module.css
├── ContactForm.tsx              # Contact info section
├── ContactForm.module.css
├── DatePicker.tsx               # Date selection
├── DatePicker.module.css
├── PackageSelector.tsx          # Package selection
└── PackageSelector.module.css
```

### Logic & Utilities
```
/srv/apps/mr-djv1/frontend/lib/
├── schemas/booking.ts           # Zod validation schemas
├── hooks/useBookingForm.ts      # Form state management
├── analytics/bookingTracking.ts # PostHog tracking
└── security/
    ├── rateLimiter.ts           # Rate limiting
    └── spamProtection.ts        # Spam detection
```

### API & Pages
```
/srv/apps/mr-djv1/frontend/app/
├── api/booking/route.ts         # API handler
├── booking/page.tsx             # Booking page
└── booking/confirmation/
    ├── page.tsx                 # Confirmation page
    └── page.module.css
```

## Quick Start

### 1. Use the Form
```tsx
import { BookingForm } from '@/components/booking/BookingForm';

export default function Page() {
  return <BookingForm />;
}
```

### 2. Custom Implementation
```tsx
import { useBookingForm } from '@/lib/hooks/useBookingForm';

export default function Custom() {
  const { form, state, submitBooking, nextStep, prevStep } = useBookingForm();

  return (
    <form onSubmit={form.handleSubmit(submitBooking)}>
      {/* Your custom form fields */}
    </form>
  );
}
```

## API Endpoints

### Submit Booking
```bash
POST /api/booking
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0612345678",
  "eventType": "bruiloft",
  "eventDate": "2025-06-15",
  "location": { "city": "Amsterdam" },
  "packageType": "premium",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

### Health Check
```bash
GET /api/booking
```

## Validation Schema

### Contact Info
- name: 2-100 chars, letters only
- email: valid email format
- phone: 10+ digits, Dutch format
- company: optional (required for business events)

### Event Details
- eventType: bruiloft | bedrijfsfeest | feest | verjaardag | jubileum | other
- eventDate: ISO date string, future date
- eventTime: HH:MM format (optional)
- guestCount: 1-10000 (optional)
- location.city: required, 2-100 chars
- location.postalCode: Dutch format (1234AB) (optional)

### Package
- packageType: basis | premium | all-in | custom
- addons: array of {id, name, price}
- specialRequests: max 1000 chars

## Analytics Events

```typescript
import { BookingAnalytics } from '@/lib/analytics/bookingTracking';

// Track events
BookingAnalytics.trackFormStarted();
BookingAnalytics.trackStepCompleted(1);
BookingAnalytics.trackPackageSelected('premium');
BookingAnalytics.trackSubmitSuccess('BK-ABC123');
```

## Security Features

### Rate Limiting
```typescript
import { bookingRateLimiter } from '@/lib/security/rateLimiter';

if (!bookingRateLimiter.isAllowed()) {
  alert('Too many requests');
  return;
}
bookingRateLimiter.recordAttempt();
```

### Spam Check
```typescript
import { performSpamCheck } from '@/lib/security/spamProtection';

const result = performSpamCheck(formData);
if (result.isSpam) {
  console.warn('Spam detected:', result.reasons);
}
```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
BACKEND_API_URL=https://api.example.com
BACKEND_API_KEY=your_key
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Common Tasks

### Add Custom Package
Edit `PackageSelector.tsx`:
```typescript
const PACKAGES: Package[] = [
  {
    id: 'my-package',
    name: 'My Package',
    description: 'Description',
    price: '€999',
    features: ['Feature 1', 'Feature 2'],
  },
];
```

### Add Custom Field
Edit `booking.ts` schema:
```typescript
export const bookingFormSchema = z.object({
  // ... existing fields
  myField: z.string().optional(),
});
```

### Add Backend Integration
Edit `app/api/booking/route.ts`:
```typescript
const response = await fetch(process.env.BACKEND_API_URL + '/bookings', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bookingPayload),
});
```

## Troubleshooting

### Form not submitting
- Check console for errors
- Verify API endpoint is accessible
- Check network tab for response
- Verify all required fields are valid

### Analytics not tracking
- Verify PostHog key in env
- Check `window.posthog` in console
- View events in PostHog dashboard

### Rate limit issues
- Clear localStorage: `localStorage.clear()`
- Wait 1 minute for reset

## Testing URLs

- Booking Form: http://localhost:3000/booking
- Confirmation: http://localhost:3000/booking/confirmation?id=TEST-123
- API Health: http://localhost:3000/api/booking

## Support

See full documentation:
- Setup Guide: `BOOKING_FORM_SETUP.md`
- Implementation Summary: `BOOKING_INTEGRATION_SUMMARY.md`
