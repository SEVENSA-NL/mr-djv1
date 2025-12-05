import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { bookingFormSchema, type BookingFormData } from '@/lib/schemas/booking';
import { apiClient } from '@/src/lib/apiClient';

interface BookingFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  step: number;
}

interface UseBookingFormReturn {
  form: ReturnType<typeof useForm<BookingFormData>>;
  state: BookingFormState;
  submitBooking: () => Promise<void>;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

const TOTAL_STEPS = 3;

/**
 * Custom hook for booking form management
 * Handles form state, validation, submission, and multi-step navigation
 */
export function useBookingForm(): UseBookingFormReturn {
  const router = useRouter();
  const [state, setState] = useState<BookingFormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    step: 1,
  });

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      eventType: 'feest',
      eventDate: '',
      eventTime: '',
      guestCount: undefined,
      duration: undefined,
      location: {
        venue: '',
        address: '',
        city: '',
        postalCode: '',
      },
      packageType: 'premium',
      addons: [],
      specialRequests: '',
      budget: undefined,
      hearAboutUs: undefined,
      newsletter: false,
      termsAccepted: false,
      privacyAccepted: false,
      website: '', // Honeypot
    },
  });

  // Track form analytics
  const trackFormEvent = useCallback((eventName: string, data?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture(eventName, {
        ...data,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  // Step navigation
  const nextStep = useCallback(async () => {
    // Validate current step fields before proceeding
    const fieldsToValidate = getFieldsForStep(state.step);
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid && state.step < TOTAL_STEPS) {
      setState((prev) => ({ ...prev, step: prev.step + 1 }));
      trackFormEvent('booking_form_step_completed', {
        step: state.step,
        next_step: state.step + 1,
      });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [state.step, form, trackFormEvent]);

  const prevStep = useCallback(() => {
    if (state.step > 1) {
      setState((prev) => ({ ...prev, step: prev.step - 1 }));
      trackFormEvent('booking_form_step_back', {
        step: state.step,
        prev_step: state.step - 1,
      });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [state.step, trackFormEvent]);

  // Form submission
  const submitBooking = useCallback(async () => {
    setState((prev) => ({ ...prev, isSubmitting: true, error: null }));

    try {
      const formData = form.getValues();

      // Check honeypot
      if (formData.website && formData.website.length > 0) {
        console.warn('Spam detected via honeypot');
        trackFormEvent('booking_form_spam_detected', { method: 'honeypot' });
        throw new Error('Invalid submission');
      }

      // Track submission attempt
      trackFormEvent('booking_form_submit_started', {
        event_type: formData.eventType,
        package_type: formData.packageType,
        addons_count: formData.addons?.length || 0,
      });

      // Submit to API
      const response = await apiClient.post<{ success: boolean; bookingId: string }>(
        '/api/booking',
        formData
      );

      // Track successful submission
      trackFormEvent('booking_form_submit_success', {
        booking_id: response.bookingId,
        event_type: formData.eventType,
        package_type: formData.packageType,
      });

      setState((prev) => ({ ...prev, isSubmitting: false, isSuccess: true }));

      // Redirect to confirmation page
      setTimeout(() => {
        router.push(`/booking/confirmation?id=${response.bookingId}`);
      }, 1000);
    } catch (error) {
      console.error('Booking submission error:', error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Er is een fout opgetreden bij het versturen van je aanvraag. Probeer het opnieuw.';

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: errorMessage,
      }));

      // Track error
      trackFormEvent('booking_form_submit_error', {
        error: errorMessage,
      });
    }
  }, [form, router, trackFormEvent]);

  // Reset form
  const resetForm = useCallback(() => {
    form.reset();
    setState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
      step: 1,
    });
    trackFormEvent('booking_form_reset');
  }, [form, trackFormEvent]);

  return {
    form,
    state,
    submitBooking,
    nextStep,
    prevStep,
    resetForm,
  };
}

/**
 * Get fields that need validation for a specific step
 */
function getFieldsForStep(step: number): (keyof BookingFormData)[] {
  switch (step) {
    case 1:
      // Contact information
      return ['name', 'email', 'phone', 'company'];
    case 2:
      // Event details
      return ['eventType', 'eventDate', 'eventTime', 'guestCount', 'location'];
    case 3:
      // Package & terms
      return ['packageType', 'termsAccepted', 'privacyAccepted'];
    default:
      return [];
  }
}

export default useBookingForm;
