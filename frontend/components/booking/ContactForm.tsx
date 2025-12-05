'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { BookingFormData } from '@/lib/schemas/booking';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  showCompanyField?: boolean;
}

/**
 * ContactForm Component
 * Reusable contact information form section
 */
export const ContactForm: React.FC<ContactFormProps> = ({
  register,
  errors,
  showCompanyField = false,
}) => {
  return (
    <div className={styles.contactForm}>
      <div className={styles.header}>
        <h3 className={styles.title}>Contactgegevens</h3>
        <p className={styles.subtitle}>
          Vul je gegevens in zodat we contact met je kunnen opnemen
        </p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Naam <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Voornaam Achternaam"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className={styles.errorText} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            E-mailadres <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="jouw@email.nl"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className={styles.errorText} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Telefoonnummer <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            placeholder="06 12345678"
            {...register('phone')}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className={styles.errorText} role="alert">
              {errors.phone.message}
            </p>
          )}
          <p className={styles.helperText}>
            We bellen je binnen 4 uur voor een persoonlijke offerte
          </p>
        </div>

        {showCompanyField && (
          <div className={styles.formGroup}>
            <label htmlFor="company" className={styles.label}>
              Bedrijfsnaam {showCompanyField && <span className={styles.required}>*</span>}
            </label>
            <input
              type="text"
              id="company"
              className={`${styles.input} ${errors.company ? styles.inputError : ''}`}
              placeholder="Jouw bedrijf BV"
              {...register('company')}
              aria-invalid={errors.company ? 'true' : 'false'}
              aria-describedby={errors.company ? 'company-error' : undefined}
            />
            {errors.company && (
              <p id="company-error" className={styles.errorText} role="alert">
                {errors.company.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className={styles.privacyNote}>
        <p>
          Je gegevens worden vertrouwelijk behandeld volgens ons{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            privacybeleid
          </a>
          . We gebruiken je gegevens alleen voor deze booking aanvraag.
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
