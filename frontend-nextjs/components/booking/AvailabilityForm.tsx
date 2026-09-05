'use client';

import { useId, useState } from 'react';
import { hasStatisticsConsent } from '@/lib/analytics/consent';
import { trackEvent } from '@/lib/analytics/trackEvent';

type AvailabilityFormProps = {
  locale: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  date: string;
  eventType: string;
  guests: number;
};

const defaultState: FormState = {
  name: '',
  email: '',
  phone: '',
  date: '',
  eventType: '',
  guests: 100,
};

export default function AvailabilityForm({ locale }: AvailabilityFormProps) {
  const isNL = locale === 'nl';
  const formId = useId();
  const [form, setForm] = useState<FormState>(defaultState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'guests' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const analyticsConsent = hasStatisticsConsent();
    trackEvent('availability_check_started', {
      locale,
      eventType: form.eventType,
      guests: form.guests,
      ga4_event: 'availability_check_started',
    });

    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale, analyticsConsent }),
      });

      if (!res.ok) throw new Error('Request failed');

      setMessage({
        type: 'success',
        text: isNL
          ? 'Bedankt! We nemen binnen 24 uur contact met je op.'
          : 'Thanks! We will be in touch within 24 hours.',
      });
      setForm(defaultState);
      trackEvent('availability_check_success', {
        locale,
        eventType: form.eventType,
        ga4_event: 'availability_check_success',
      });
    } catch {
      setMessage({
        type: 'error',
        text: isNL ? 'Er ging iets mis. Probeer het opnieuw.' : 'Something went wrong. Please try again.',
      });
      trackEvent('availability_check_error', {
        locale,
        eventType: form.eventType,
        reason: 'request_failed',
        ga4_event: 'availability_check_error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="block text-sm font-semibold mb-2">
            {isNL ? 'Naam' : 'Name'}
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-neutral-light placeholder-neutral-gray-200 focus:border-secondary focus:outline-none"
            placeholder={isNL ? 'Bijv. Alex Janssen' : 'e.g., Alex Johnson'}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="block text-sm font-semibold mb-2">
            {isNL ? 'E-mail' : 'Email'}
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-neutral-light placeholder-neutral-gray-200 focus:border-secondary focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold mb-2">
            {isNL ? 'Telefoon' : 'Phone'}
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-neutral-light placeholder-neutral-gray-200 focus:border-secondary focus:outline-none"
            placeholder="+31 6 12345678"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-date`} className="block text-sm font-semibold mb-2">
            {isNL ? 'Event datum' : 'Event date'}
          </label>
          <input
            id={`${formId}-date`}
            name="date"
            type="date"
            required
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-neutral-light placeholder-neutral-gray-200 focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-event-type`} className="block text-sm font-semibold mb-2">
            {isNL ? 'Type event' : 'Event type'}
          </label>
          <select
            id={`${formId}-event-type`}
            name="eventType"
            required
            value={form.eventType}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-neutral-light focus:border-secondary focus:outline-none"
          >
            <option value="">{isNL ? 'Kies event' : 'Select event'}</option>
            <option value="bruiloft">{isNL ? 'Bruiloft' : 'Wedding'}</option>
            <option value="bedrijfsfeest">{isNL ? 'Bedrijfsfeest' : 'Corporate'}</option>
            <option value="feest">{isNL ? 'Feest/Party' : 'Party'}</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${formId}-guests`} className="block text-sm font-semibold mb-2">
            {isNL ? 'Aantal gasten' : 'Guest count'}
          </label>
          <input
            id={`${formId}-guests`}
            name="guests"
            type="number"
            min={10}
            max={500}
            value={form.guests}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-neutral-light placeholder-neutral-gray-200 focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-secondary px-6 py-3 text-neutral-dark font-semibold shadow-lg transition hover:bg-secondary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 disabled:opacity-60"
      >
        {loading ? (isNL ? 'Verzenden...' : 'Sending...') : isNL ? 'Check beschikbaarheid' : 'Check availability'}
      </button>

      {message && (
        <div
          role={message.type === 'success' ? 'status' : 'alert'}
          aria-live={message.type === 'success' ? 'polite' : undefined}
          className={`mt-2 rounded-md px-4 py-3 text-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}
