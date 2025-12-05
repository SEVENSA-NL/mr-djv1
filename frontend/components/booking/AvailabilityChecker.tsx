'use client';

import React, { useState } from 'react';
import {
  checkAvailability,
  getAlternativeDates,
  trackAvailabilityCheck,
  type AvailabilityStatus,
} from '@/lib/api/availability';
import styles from './AvailabilityChecker.module.css';

interface AvailabilityCheckerProps {
  eventType?: 'bruiloft' | 'bedrijfsfeest' | 'feest' | 'other';
  guestCount?: number;
  onAvailable?: (date: Date) => void;
}

export const AvailabilityChecker: React.FC<AvailabilityCheckerProps> = ({
  eventType,
  guestCount,
  onAvailable,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<AvailabilityStatus | null>(null);
  const [alternativeDates, setAlternativeDates] = useState<Date[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSelectedDate(date);
    setStatus(null); // Reset status when date changes
  };

  const handleCheckAvailability = async () => {
    if (!selectedDate) return;

    setLoading(true);
    setStatus(null);
    setAlternativeDates([]);

    try {
      // Track start event
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture('availability_check_started', {
          date: selectedDate.toISOString(),
          event_type: eventType,
          guest_count: guestCount,
          timestamp: new Date().toISOString(),
        });
      }

      // Check availability
      const result = await checkAvailability({
        date: selectedDate,
        eventType,
        guestCount,
      });

      setStatus(result);

      // Track completion
      trackAvailabilityCheck(result, {
        date: selectedDate,
        eventType,
        guestCount,
      });

      // If fully booked, get alternative dates
      if (result.status === 'fully-booked') {
        const alternatives = await getAlternativeDates(selectedDate);
        setAlternativeDates(alternatives);
      }

      // If available, trigger callback
      if (result.available && onAvailable) {
        onAvailable(selectedDate);
      }
    } catch (error) {
      console.error('[AvailabilityChecker] Error:', error);
      setStatus({
        available: true,
        status: 'available',
        message: 'We kunnen de beschikbaarheid momenteel niet controleren. Neem contact op.',
        confidence: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (!status) return null;
    switch (status.status) {
      case 'available':
        return '✅';
      case 'almost-full':
        return '⚠️';
      case 'fully-booked':
        return '❌';
    }
  };

  const getStatusColor = () => {
    if (!status) return '';
    switch (status.status) {
      case 'available':
        return styles.statusAvailable;
      case 'almost-full':
        return styles.statusAlmostFull;
      case 'fully-booked':
        return styles.statusFullyBooked;
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Minimum date is tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <div className={styles.availabilityChecker}>
      <div className={styles.header}>
        <h3 className={styles.title}>📅 Check Beschikbaarheid</h3>
        <p className={styles.subtitle}>
          Controleer direct of je datum nog vrij is
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.inputGroup}>
          <label htmlFor="event-date" className={styles.label}>
            Selecteer je event datum:
          </label>
          <input
            type="date"
            id="event-date"
            className={styles.dateInput}
            min={minDateStr}
            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
            onChange={handleDateChange}
          />
        </div>

        <button
          type="button"
          className={styles.checkButton}
          onClick={handleCheckAvailability}
          disabled={!selectedDate || loading}
        >
          {loading ? '⏳ Controleren...' : '🔍 Check Beschikbaarheid'}
        </button>

        {status && (
          <div className={`${styles.statusBox} ${getStatusColor()}`}>
            <div className={styles.statusHeader}>
              <span className={styles.statusIcon}>{getStatusIcon()}</span>
              <span className={styles.statusText}>
                {status.status === 'available' && 'Beschikbaar!'}
                {status.status === 'almost-full' && 'Bijna Vol'}
                {status.status === 'fully-booked' && 'Volledig Geboekt'}
              </span>
            </div>
            <p className={styles.statusMessage}>{status.message}</p>

            {status.available && (
              <div className={styles.successActions}>
                <p className={styles.successText}>
                  <strong>{formatDate(selectedDate!)}</strong> is beschikbaar!
                </p>
                <a href="/contact" className={styles.ctaButton}>
                  ✨ Reserveer Nu
                </a>
              </div>
            )}

            {status.status === 'fully-booked' && alternativeDates.length > 0 && (
              <div className={styles.alternatives}>
                <p className={styles.alternativesTitle}>
                  <strong>Alternatieve datums:</strong>
                </p>
                <div className={styles.alternativesList}>
                  {alternativeDates.slice(0, 3).map((date, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={styles.alternativeDate}
                      onClick={() => {
                        setSelectedDate(date);
                        handleCheckAvailability();
                      }}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className={styles.footer}>
          <p className={styles.footerText}>
            💬 Vragen? <a href="/contact" className={styles.link}>Neem contact op</a> of{' '}
            <a
              href="https://wa.me/31612345678?text=Hoi%20Mr.%20DJ,%20ik%20wil%20graag%20beschikbaarheid%20checken"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              WhatsApp ons
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityChecker;
