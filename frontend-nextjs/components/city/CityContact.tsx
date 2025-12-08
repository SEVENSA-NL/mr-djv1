'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics/trackEvent';
import type { City } from '../../types/city';
import { Phone, Mail } from 'lucide-react';

interface CityContactProps {
  city: City;
  locale: string;
}

export default function CityContact({ city, locale }: CityContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
    city: city.slug,
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const isNL = locale === 'nl';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (!res.ok) throw new Error('Request failed');

      trackEvent('lead_submitted', {
        source: 'city_page',
        city: city.slug,
        eventType: formData.eventType,
        page: 'city',
        locale,
        ga4_event: 'lead_submitted',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: '',
        city: city.slug,
      });
      setStatus({
        type: 'success',
        text: isNL
          ? 'Bedankt! We nemen binnen 24 uur contact op met opties.'
          : 'Thanks! We will contact you within 24 hours with options.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        text: isNL ? 'Er ging iets mis. Probeer opnieuw.' : 'Something went wrong. Please try again.',
      });
      trackEvent('lead_submit_error', {
        source: 'city_page',
        error: (error as Error).message,
        ga4_event: 'lead_submit_error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isNL ? 'Vraag Direct een Offerte Aan' : 'Request a Quote Directly'}
            </h2>
            <p className="text-xl text-purple-100">
              {isNL
                ? `Voor uw event in ${city.name}. Vrijblijvend en binnen 24 uur reactie.`
                : `For your event in ${city.name}. Non-binding and response within 24 hours.`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {isNL ? 'Naam *' : 'Name *'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder={isNL ? 'Uw naam' : 'Your name'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {isNL ? 'E-mail *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder={isNL ? 'uw@email.nl' : 'your@email.com'}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {isNL ? 'Telefoon *' : 'Phone *'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="+31 6 12345678"
                  />
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium mb-2">
                    {isNL ? 'Type Event *' : 'Event Type *'}
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="" className="text-gray-900">
                      {isNL ? 'Selecteer type' : 'Select type'}
                    </option>
                    <option value="bruiloft" className="text-gray-900">
                      {isNL ? 'Bruiloft' : 'Wedding'}
                    </option>
                    <option value="bedrijfsfeest" className="text-gray-900">
                      {isNL ? 'Bedrijfsfeest' : 'Corporate Event'}
                    </option>
                    <option value="feest" className="text-gray-900">
                      {isNL ? 'Feest' : 'Party'}
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
                    {isNL ? 'Datum Event' : 'Event Date'}
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {isNL ? 'Bericht' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder={
                      isNL
                        ? 'Vertel ons over uw event...'
                        : 'Tell us about your event...'
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70"
                >
                  {loading
                    ? isNL
                      ? 'Versturen...'
                      : 'Sending...'
                    : isNL
                      ? 'Verstuur Aanvraag'
                      : 'Send Request'}
                </button>
                {status && (
                  <div
                    role="status"
                    className={`rounded-lg px-4 py-3 text-sm ${
                      status.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {status.text}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  {isNL ? 'Direct Contact' : 'Direct Contact'}
                </h3>
                <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">
                      {isNL ? 'Telefoon' : 'Phone'}
                    </p>
                    <a
                      href="tel:+31612345678"
                      className="text-purple-200 hover:text-white"
                    >
                      +31 6 12 34 56 78
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a
                        href="mailto:info@misterdj.nl"
                        className="text-purple-200 hover:text-white"
                      >
                        info@misterdj.nl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">
                        {isNL ? 'Werkgebied' : 'Service Area'}
                      </p>
                      <p className="text-purple-200">
                        {city.name} {isNL ? 'en omgeving' : 'and surroundings'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3">
                  {isNL ? 'Snel Reageren' : 'Quick Response'}
                </h4>
                <ul className="space-y-2 text-purple-100">
                  <li className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      {isNL ? 'Reactie binnen 24 uur' : 'Response within 24 hours'}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      {isNL
                        ? 'Vrijblijvende offerte'
                        : 'Non-binding quote'}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      {isNL
                        ? 'Persoonlijk advies'
                        : 'Personal advice'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
