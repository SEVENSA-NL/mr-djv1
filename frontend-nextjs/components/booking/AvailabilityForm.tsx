'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics/trackEvent';
import { analyticsConsentHeader } from '@/lib/analytics/consent';

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

    const guestCountBucket = form.guests < 50 ? '10_49' : form.guests < 100 ? '50_99' : form.guests < 200 ? '100_199' : '200_plus';
    const eventId = globalThis.crypto?.randomUUID?.() || `evt_${Date.now()}`;
    trackEvent('availability_check_started', {
      locale,
      event_type: form.eventType,
      guest_count_bucket: guestCountBucket,
      form_id: 'availability',
      ga4_event: 'availability_check_started',
    });

    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Event-Id': eventId,
          ...analyticsConsentHeader(),
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Request failed');

      setMessage({
        type: 'success',
        text: isNL
          ? 'Bedankt! We bevestigen binnen 24 uur of de datum vrij is.'
          : 'Thanks! We will confirm availability within 24 hours.',
      });
      setForm(defaultState);
      trackEvent('form_submit', {
        locale,
        event_id: eventId,
        event_type: form.eventType,
        guest_count_bucket: guestCountBucket,
        form_id: 'availability',
        lead_intent: 'availability',
        ga4_event: 'form_submit',
      });
    } catch {
      setMessage({
        type: 'error',
        text: isNL ? 'Er ging iets mis. Probeer het opnieuw.' : 'Something went wrong. Please try again.',
      });
      trackEvent('availability_check_error', { locale, form_id: 'availability', ga4_event: 'availability_check_error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold mb-2">{isNL ? 'Naam' : 'Name'}</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-neutral-light placeholder-neutral-gray-200 focus:border-secondary focus:outline-none"
            placeholder={isNL ? 'Bijv. Alex Janssen' : 'e.g., Alex Johnson'}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">{isNL ? 'E-mail' : 'Email'}</label>
          <input
            name="email"
            type="email"
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
          <label className="block text-sm font-semibold mb-2">{isNL ? 'Telefoon' : 'Phone'}</label>
          <input
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-neutral-light placeholder-neutral-gray-200 focus:border-secondary focus:outline-none"
            placeholder="+31 6 12345678"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">{isNL ? 'Event datum' : 'Event date'}</label>
          <input
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
          <label className="block text-sm font-semibold mb-2">{isNL ? 'Type event' : 'Event type'}</label>
          <select
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
          <label className="block text-sm font-semibold mb-2">{isNL ? 'Aantal gasten' : 'Guest count'}</label>
          <input
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
          role="status"
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
