'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WhatsAppButton from '@/components/WhatsAppButton';
import styles from './page.module.css';

/**
 * Booking Confirmation Page
 * Displays success message and next steps after booking submission
 */

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Track confirmation page view
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('booking_confirmation_viewed', {
        booking_id: bookingId,
        timestamp: new Date().toISOString(),
      });
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [bookingId]);

  return (
    <div className={styles.confirmationPage}>
      <div className={styles.container}>
        {/* Success Icon */}
        <div className={styles.successIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className={styles.title}>Booking Aanvraag Ontvangen!</h1>
        <p className={styles.subtitle}>
          Je aanvraag is succesvol verzonden. We nemen binnen 4 uur contact met je op.
        </p>

        {/* Booking ID */}
        {bookingId && (
          <div className={styles.bookingIdCard}>
            <p className={styles.bookingIdLabel}>Je booking referentie:</p>
            <p className={styles.bookingId}>{bookingId}</p>
            <p className={styles.bookingIdHelper}>
              Bewaar deze code voor je administratie
            </p>
          </div>
        )}

        {/* Next Steps */}
        <div className={styles.nextSteps}>
          <h2 className={styles.nextStepsTitle}>Wat gebeurt er nu?</h2>
          <div className={styles.stepsList}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Bevestigingsmail</h3>
                <p className={styles.stepDescription}>
                  Je ontvangt een bevestigingsmail met alle details van je aanvraag.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Persoonlijk Contact</h3>
                <p className={styles.stepDescription}>
                  Binnen 4 uur nemen we telefonisch contact met je op om je wensen te bespreken.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Offerte op Maat</h3>
                <p className={styles.stepDescription}>
                  Je ontvangt een persoonlijke offerte inclusief alle besproken opties.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Reservering Bevestigd</h3>
                <p className={styles.stepDescription}>
                  Na akkoord is je datum definitief gereserveerd en ontvang je de bevestiging.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className={styles.contactCard}>
          <h3 className={styles.contactTitle}>Vragen? Neem direct contact op</h3>
          <div className={styles.contactMethods}>
            <a href="tel:+31408422594" className={styles.contactButton}>
              <span className={styles.contactIcon}>📞</span>
              <span>Bel: 040 842 2594</span>
            </a>
            <div className={styles.contactButton}>
              <WhatsAppButton
                variant="primary"
                messageType="contact"
                label="WhatsApp"
                className="!px-4 !py-2 !text-sm"
              />
            </div>
            <a href="mailto:info@mister-dj.nl" className={styles.contactButton}>
              <span className={styles.contactIcon}>✉️</span>
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Social Proof */}
        <div className={styles.socialProof}>
          <p className={styles.socialProofText}>
            Sluit je aan bij 1000+ tevreden klanten die hun feest onvergetelijk maakten met Mr. DJ
          </p>
          <div className={styles.trustBadges}>
            <div className={styles.badge}>⭐⭐⭐⭐⭐ 4.9/5</div>
            <div className={styles.badge}>1000+ Events</div>
            <div className={styles.badge}>100% Tevreden</div>
          </div>
        </div>

        {/* Auto redirect notice */}
        <div className={styles.redirectNotice}>
          <p>
            Je wordt over <strong>{countdown}</strong> seconden automatisch doorgestuurd naar de homepage
          </p>
          <a href="/" className={styles.homeLink}>
            Of klik hier om direct terug te gaan
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
