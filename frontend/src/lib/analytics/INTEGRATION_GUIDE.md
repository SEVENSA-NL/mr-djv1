# Analytics Integration Guide

This guide shows how to integrate analytics tracking into your Mister DJ application components and pages.

## Quick Start

### 1. Import Tracking Utilities

```typescript
import {
  trackBookingStarted,
  trackServiceViewed,
  trackPackageSelected,
  trackButtonClick
} from '@/lib/analytics/trackingUtils';
```

### 2. Add Automatic Tracking to Your App

```typescript
// src/App.tsx
import AnalyticsProvider from '@/components/providers/AnalyticsProvider';
import UserBehaviorTracker from '@/components/analytics/UserBehaviorTracker';

function App() {
  return (
    <AnalyticsProvider>
      <UserBehaviorTracker />
      {/* Your app content */}
    </AnalyticsProvider>
  );
}
```

## Component Integration Examples

### Booking Form Component

```typescript
// src/components/booking/QuickBookingForm.tsx
import { useState } from 'react';
import { trackBookingStarted, trackFormFieldEngagement } from '@/lib/analytics/trackingUtils';

export function QuickBookingForm({ origin = 'landing-page' }) {
  const [formData, setFormData] = useState({});

  const handleEventTypeChange = (eventType: string) => {
    // Track service engagement
    trackServiceViewed(eventType, `booking-form`, origin);

    // Track field engagement
    trackFormFieldEngagement('booking-form', 'event_type', 'select');

    setFormData({ ...formData, eventType });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Track booking started
    trackBookingStarted(formData.eventType, origin);

    // Submit form logic...
  };

  return (
    <form onSubmit={handleSubmit} id="booking-form">
      <select
        onChange={(e) => handleEventTypeChange(e.target.value)}
        onFocus={() => trackFormFieldEngagement('booking-form', 'event_type')}
      >
        <option>Select Service</option>
        <option value="bruiloft-dj">Wedding DJ</option>
        <option value="bedrijfsfeest-dj">Corporate Event DJ</option>
        <option value="feest-dj">Party DJ</option>
      </select>

      <button type="submit" id="submit-booking">Book Now</button>
    </form>
  );
}
```

### Service Card Component

```typescript
// src/components/ServiceCard.tsx
import { trackServiceViewed, trackPackageSelected } from '@/lib/analytics/trackingUtils';

export function ServiceCard({
  serviceId,
  serviceName,
  packages,
  section = 'services-section'
}) {
  const handleViewDetails = () => {
    trackServiceViewed(serviceName, serviceId, section);
  };

  const handleSelectPackage = (pkg: Package) => {
    trackPackageSelected(
      pkg.id,
      pkg.name,
      pkg.price,
      'EUR',
      serviceName
    );
  };

  return (
    <div className="service-card" onClick={handleViewDetails}>
      <h3>{serviceName}</h3>

      <div className="packages">
        {packages.map(pkg => (
          <button
            key={pkg.id}
            onClick={() => handleSelectPackage(pkg)}
            id={`package-${pkg.id}`}
          >
            {pkg.name} - €{pkg.price}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Contact Channel Component

```typescript
// src/components/ContactChannels.tsx
import { trackContactChannelClick } from '@/lib/analytics/trackingUtils';

export function ContactChannels() {
  const handleContactClick = (channel: string, value?: string) => {
    trackContactChannelClick(channel, 'contact-section', value);

    // Perform action (open email, call, etc.)
    if (channel === 'phone') {
      window.location.href = `tel:${value}`;
    } else if (channel === 'email') {
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <div id="contact-section">
      <button
        onClick={() => handleContactClick('phone', '+31-6-12345678')}
        id="contact-phone"
      >
        Call Us
      </button>

      <button
        onClick={() => handleContactClick('email', 'info@mister-dj.nl')}
        id="contact-email"
      >
        Email Us
      </button>

      <button
        onClick={() => handleContactClick('whatsapp')}
        id="contact-whatsapp"
      >
        WhatsApp
      </button>
    </div>
  );
}
```

### Button Component with Analytics

```typescript
// src/components/Button.tsx
import { trackButtonClick } from '@/lib/analytics/trackingUtils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  analyticsId?: string;
  analyticsLabel?: string;
  children: React.ReactNode;
}

export function Button({
  id,
  analyticsId,
  analyticsLabel,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track button click
    const buttonId = analyticsId || id || `button-${Date.now()}`;
    const buttonText = typeof children === 'string' ? children : undefined;

    trackButtonClick(buttonId, buttonText, analyticsLabel);

    // Call original onClick if provided
    onClick?.(e);
  };

  return (
    <button id={id} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
```

### Event Type Selector

```typescript
// src/components/booking/EventTypeSelector.tsx
import { trackServiceViewed } from '@/lib/analytics/trackingUtils';

const EVENT_TYPES = [
  { id: 'bruiloft-dj', name: 'Wedding DJ', icon: '💒' },
  { id: 'bedrijfsfeest-dj', name: 'Corporate Event', icon: '🏢' },
  { id: 'feest-dj', name: 'Party DJ', icon: '🎉' },
];

export function EventTypeSelector() {
  const handleSelectEvent = (eventId: string, eventName: string) => {
    trackServiceViewed(eventId, eventId, 'event-selector');
    // Handle selection...
  };

  return (
    <div className="event-type-selector">
      {EVENT_TYPES.map(event => (
        <button
          key={event.id}
          onClick={() => handleSelectEvent(event.id, event.name)}
          id={`event-${event.id}`}
          className="event-button"
        >
          {event.icon} {event.name}
        </button>
      ))}
    </div>
  );
}
```

### Pricing Table Component

```typescript
// src/components/PricingTables.tsx
import { trackPackageSelected, trackServiceViewed } from '@/lib/analytics/trackingUtils';

interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export function PricingTables({
  serviceType,
  packages
}: {
  serviceType: string;
  packages: Package[];
}) {
  const handleSelectPackage = (pkg: Package) => {
    trackPackageSelected(
      pkg.id,
      pkg.name,
      pkg.price,
      'EUR',
      serviceType
    );

    // Navigate to booking form with selected package
  };

  return (
    <div className="pricing-section">
      {packages.map(pkg => (
        <div key={pkg.id} className="price-card">
          <h3>{pkg.name}</h3>
          <p className="price">€{pkg.price}</p>

          <ul>
            {pkg.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          <button
            onClick={() => handleSelectPackage(pkg)}
            id={`select-package-${pkg.id}`}
            className="select-button"
          >
            Select {pkg.name}
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Testimonials/Media Component

```typescript
// src/components/Testimonials.tsx
import { trackMediaEngagement } from '@/lib/analytics/trackingUtils';

export function Testimonials() {
  const handleVideoPlay = (videoId: string) => {
    trackMediaEngagement('video', videoId, 'play');
  };

  const handleVideoComplete = (videoId: string, duration: number) => {
    trackMediaEngagement('video', videoId, 'complete', duration);
  };

  return (
    <div className="testimonials">
      <video
        id="testimonial-video-1"
        onPlay={() => handleVideoPlay('testimonial-1')}
        onEnded={() => handleVideoComplete('testimonial-1', 45)}
        controls
      >
        <source src="testimonial.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
```

### Error Boundary with Analytics

```typescript
// src/components/ErrorBoundary.tsx
import React from 'react';
import { trackError } from '@/lib/analytics/trackingUtils';

export class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Track the error
    trackError(
      error.name || 'Unknown Error',
      error.message,
      errorInfo.componentStack?.split('\n')[0]
    );

    // Log to console in development
    console.error('Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }

    return this.props.children;
  }
}
```

## Page/Route Integration

### Service Page Integration

```typescript
// src/pages/ServicePage.tsx
import { useEffect } from 'react';
import { trackServiceViewed } from '@/lib/analytics/trackingUtils';

export function ServicePage({ serviceType, serviceId }: { serviceType: string; serviceId: string }) {
  useEffect(() => {
    // Track service page view
    trackServiceViewed(serviceType, serviceId, `${serviceType}-page`);
  }, [serviceType, serviceId]);

  return (
    <div>
      {/* Service page content */}
    </div>
  );
}
```

### Booking Confirmation Page

```typescript
// src/pages/BookingConfirmation.tsx
import { useEffect } from 'react';
import { trackBookingLead } from '@/lib/analytics/trackingUtils';

export function BookingConfirmation({ bookingId, booking }: BookingConfirmationProps) {
  useEffect(() => {
    // Track successful booking
    trackBookingLead(
      'booking-confirmation',
      bookingId,
      booking.eventType,
      booking.packageId,
      'confirmed',
      booking.totalPrice,
      'EUR'
    );
  }, [bookingId, booking]);

  return (
    <div>
      <h1>Booking Confirmed!</h1>
      <p>Booking ID: {bookingId}</p>
    </div>
  );
}
```

## Hook Integration

### Custom Analytics Hook

```typescript
// src/hooks/useTracking.ts
import { useCallback } from 'react';
import * as tracking from '@/lib/analytics/trackingUtils';

export function useTracking() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, unknown>) => {
    // Custom wrapper for tracking
    if (import.meta.env.MODE !== 'production') {
      console.log(`[Analytics] ${eventName}`, properties);
    }
    // Can add custom logic here (rate limiting, batching, etc.)
  }, []);

  return {
    trackEvent,
    ...tracking,
  };
}

// Usage:
const { trackBookingStarted } = useTracking();
trackBookingStarted('bruiloft-dj', 'landing-page');
```

## Testing Analytics

### Unit Test Example

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as trackingUtils from '@/lib/analytics/trackingUtils';
import { Button } from '@/components/Button';

jest.mock('@/lib/analytics/trackingUtils');

describe('Button with Analytics', () => {
  it('should track button click', async () => {
    render(<Button analyticsId="test-button">Click Me</Button>);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(trackingUtils.trackButtonClick).toHaveBeenCalledWith(
      'test-button',
      'Click Me',
      undefined
    );
  });
});
```

## Common Patterns

### Form Submission with Analytics

```typescript
const handleFormSubmit = async (formData: FormData) => {
  try {
    // Track form started
    trackFormFieldEngagement('contact-form', 'initialized');

    // Track field changes as user fills form
    Object.entries(formData).forEach(([field, value]) => {
      if (value) {
        trackFormFieldEngagement('contact-form', field);
      }
    });

    // Submit form
    const result = await submitForm(formData);

    // Track successful submission
    trackFormSubmission(
      'contact-form',
      'Contact Form',
      Object.keys(formData).length,
      submissionTime
    );

    // Track conversion/lead
    trackBookingLead('contact-form-submission');

  } catch (error) {
    // Track error
    trackError('form_submission_failed', error.message, 'contact-form');
  }
};
```

### Multi-step Booking Flow

```typescript
const bookingFlow = {
  step1: () => trackBookingStarted('bruiloft-dj', 'booking-flow-step-1'),
  step2: () => trackServiceViewed('bruiloft-dj', 'booking-flow', 'step-2'),
  step3: (packageId) => trackPackageSelected(packageId, '...', null, 'EUR', 'bruiloft-dj'),
  step4: () => trackFormFieldEngagement('booking-form', 'contact-details'),
  complete: (bookingId) => trackBookingLead('booking-flow', bookingId, 'bruiloft-dj'),
};
```

## Debugging

### Enable Debug Logging

```typescript
// In development, all tracking functions log to console
// Set NODE_ENV or import.meta.env.MODE = 'development'

import { trackBookingStarted } from '@/lib/analytics/trackingUtils';

// This will log to console in development
trackBookingStarted('bruiloft-dj', 'test-origin');

// Console output:
// [PostHog] Initialized successfully
// [GA4] Event pushed to dataLayer
```

### Check DataLayer

```typescript
// In browser console
window.dataLayer // View all events
window.dataLayer.filter(e => e.event === 'booking_started')
window.dataLayer[window.dataLayer.length - 1] // Latest event
```

## Performance Considerations

1. **Throttling**: Scroll events are throttled to 1-second intervals
2. **Batching**: GA4 and PostHog batch events automatically
3. **Non-blocking**: All tracking is non-blocking and won't delay user interactions
4. **Error Safe**: All tracking functions are wrapped in try-catch blocks

## Next Steps

1. Set up PostHog and GA4 projects
2. Configure environment variables
3. Add AnalyticsProvider to app root
4. Implement tracking in key user flows
5. Set up dashboards and goals in GA4
6. Monitor events and optimize based on data
