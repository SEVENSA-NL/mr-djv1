'use client';

import React, { useEffect } from 'react';
import { useBookingForm } from '@/lib/hooks/useBookingForm';
import { ContactForm } from './ContactForm';
import { DatePicker } from './DatePicker';
import { PackageSelector } from './PackageSelector';
import styles from './BookingForm.module.css';

/**
 * Main BookingForm Component
 * Multi-step booking form with validation and submission handling
 */
export const BookingForm: React.FC = () => {
  const { form, state, submitBooking, nextStep, prevStep } = useBookingForm();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const eventType = watch('eventType');
  const selectedDate = watch('eventDate');
  const selectedPackage = watch('packageType');

  // Show company field for business events
  const showCompanyField = eventType === 'bedrijfsfeest';

  useEffect(() => {
    if (showCompanyField) {
      // Mark company as required for business events
      register('company', { required: true });
    }
  }, [showCompanyField, register]);

  const renderStepContent = () => {
    switch (state.step) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>Stap 1: Contactgegevens</h2>
              <p className={styles.stepDescription}>
                Laat ons weten hoe we contact met je kunnen opnemen
              </p>
            </div>

            <ContactForm
              register={register}
              errors={errors}
              showCompanyField={showCompanyField}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>Stap 2: Event Details</h2>
              <p className={styles.stepDescription}>
                Vertel ons meer over je event
              </p>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formGroup}>
                <label htmlFor="eventType" className={styles.label}>
                  Type Event <span className={styles.required}>*</span>
                </label>
                <select
                  id="eventType"
                  className={`${styles.select} ${errors.eventType ? styles.inputError : ''}`}
                  {...register('eventType')}
                >
                  <option value="bruiloft">Bruiloft</option>
                  <option value="bedrijfsfeest">Bedrijfsfeest</option>
                  <option value="feest">Feest/Partij</option>
                  <option value="verjaardag">Verjaardag</option>
                  <option value="jubileum">Jubileum</option>
                  <option value="other">Anders</option>
                </select>
                {errors.eventType && (
                  <p className={styles.errorText}>{errors.eventType.message}</p>
                )}
              </div>

              <DatePicker
                selected={selectedDate ? new Date(selectedDate) : undefined}
                onSelect={(date) => setValue('eventDate', date?.toISOString().split('T')[0] || '')}
                error={errors.eventDate?.message}
                label="Event Datum"
                helperText="Selecteer de datum waarop je event plaatsvindt"
                required
              />

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="eventTime" className={styles.label}>
                    Starttijd
                  </label>
                  <input
                    type="time"
                    id="eventTime"
                    className={`${styles.input} ${errors.eventTime ? styles.inputError : ''}`}
                    {...register('eventTime')}
                  />
                  {errors.eventTime && (
                    <p className={styles.errorText}>{errors.eventTime.message}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="guestCount" className={styles.label}>
                    Aantal Gasten
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    className={`${styles.input} ${errors.guestCount ? styles.inputError : ''}`}
                    placeholder="bijv. 100"
                    {...register('guestCount', { valueAsNumber: true })}
                  />
                  {errors.guestCount && (
                    <p className={styles.errorText}>{errors.guestCount.message}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="duration" className={styles.label}>
                    Duur (uren)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    className={`${styles.input} ${errors.duration ? styles.inputError : ''}`}
                    placeholder="bijv. 4"
                    {...register('duration', { valueAsNumber: true })}
                  />
                  {errors.duration && (
                    <p className={styles.errorText}>{errors.duration.message}</p>
                  )}
                </div>
              </div>

              <div className={styles.formSection}>
                <h4 className={styles.sectionTitle}>Locatie</h4>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="venue" className={styles.label}>
                      Locatie Naam
                    </label>
                    <input
                      type="text"
                      id="venue"
                      className={styles.input}
                      placeholder="bijv. De Grote Zaal"
                      {...register('location.venue')}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="address" className={styles.label}>
                      Adres
                    </label>
                    <input
                      type="text"
                      id="address"
                      className={styles.input}
                      placeholder="Straatnaam 123"
                      {...register('location.address')}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="city" className={styles.label}>
                      Stad <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      className={`${styles.input} ${errors.location?.city ? styles.inputError : ''}`}
                      placeholder="Amsterdam"
                      {...register('location.city')}
                    />
                    {errors.location?.city && (
                      <p className={styles.errorText}>{errors.location.city.message}</p>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="postalCode" className={styles.label}>
                      Postcode
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      className={`${styles.input} ${errors.location?.postalCode ? styles.inputError : ''}`}
                      placeholder="1234 AB"
                      {...register('location.postalCode')}
                    />
                    {errors.location?.postalCode && (
                      <p className={styles.errorText}>{errors.location.postalCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>Stap 3: Pakket & Bevestiging</h2>
              <p className={styles.stepDescription}>
                Kies je pakket en bevestig je booking
              </p>
            </div>

            <PackageSelector
              selectedPackage={selectedPackage}
              onPackageSelect={(pkg) => setValue('packageType', pkg)}
              selectedAddons={watch('addons')?.map((a) => a.id) || []}
              onAddonsChange={(addonIds) => {
                // Map addon IDs back to addon objects
                const addons = addonIds.map((id) => ({
                  id,
                  name: id,
                  price: 0, // Price will be calculated on backend
                }));
                setValue('addons', addons);
              }}
              error={errors.packageType?.message}
            />

            <div className={styles.formSection}>
              <div className={styles.formGroup}>
                <label htmlFor="specialRequests" className={styles.label}>
                  Speciale Wensen
                </label>
                <textarea
                  id="specialRequests"
                  className={styles.textarea}
                  rows={4}
                  placeholder="Heb je speciale wensen of opmerkingen? Laat het ons weten!"
                  {...register('specialRequests')}
                />
                {errors.specialRequests && (
                  <p className={styles.errorText}>{errors.specialRequests.message}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="budget" className={styles.label}>
                  Budget (optioneel)
                </label>
                <input
                  type="number"
                  id="budget"
                  className={styles.input}
                  placeholder="€"
                  {...register('budget', { valueAsNumber: true })}
                />
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    {...register('newsletter')}
                  />
                  <span>Ja, houd me op de hoogte van nieuws en aanbiedingen</span>
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <label
                  className={`${styles.checkboxLabel} ${errors.termsAccepted ? styles.checkboxError : ''}`}
                >
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    {...register('termsAccepted')}
                  />
                  <span>
                    Ik ga akkoord met de{' '}
                    <a href="/algemene-voorwaarden" target="_blank" rel="noopener noreferrer">
                      algemene voorwaarden
                    </a>{' '}
                    <span className={styles.required}>*</span>
                  </span>
                </label>
                {errors.termsAccepted && (
                  <p className={styles.errorText}>{errors.termsAccepted.message}</p>
                )}
              </div>

              <div className={styles.checkboxGroup}>
                <label
                  className={`${styles.checkboxLabel} ${errors.privacyAccepted ? styles.checkboxError : ''}`}
                >
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    {...register('privacyAccepted')}
                  />
                  <span>
                    Ik ga akkoord met het{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                      privacybeleid
                    </a>{' '}
                    <span className={styles.required}>*</span>
                  </span>
                </label>
                {errors.privacyAccepted && (
                  <p className={styles.errorText}>{errors.privacyAccepted.message}</p>
                )}
              </div>

              {/* Honeypot field */}
              <input
                type="text"
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                {...register('website')}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form className={styles.bookingForm} onSubmit={handleSubmit(submitBooking)}>
      {/* Progress indicator */}
      <div className={styles.progressBar}>
        <div className={styles.progressSteps}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`${styles.progressStep} ${
                state.step >= step ? styles.progressStepActive : ''
              } ${state.step === step ? styles.progressStepCurrent : ''}`}
            >
              <div className={styles.progressStepNumber}>{step}</div>
              <div className={styles.progressStepLabel}>
                {step === 1 && 'Contact'}
                {step === 2 && 'Event'}
                {step === 3 && 'Pakket'}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.progressLine}>
          <div
            className={styles.progressLineFill}
            style={{ width: `${((state.step - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* Form content */}
      {renderStepContent()}

      {/* Error message */}
      {state.error && (
        <div className={styles.errorBanner} role="alert">
          <span className={styles.errorIcon}>⚠</span>
          <p>{state.error}</p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className={styles.formActions}>
        {state.step > 1 && (
          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={prevStep}
            disabled={state.isSubmitting}
          >
            Vorige
          </button>
        )}

        {state.step < 3 ? (
          <button
            type="button"
            className={styles.buttonPrimary}
            onClick={nextStep}
            disabled={state.isSubmitting}
          >
            Volgende
          </button>
        ) : (
          <button
            type="submit"
            className={styles.buttonPrimary}
            disabled={state.isSubmitting}
          >
            {state.isSubmitting ? (
              <>
                <span className={styles.spinner} />
                Versturen...
              </>
            ) : (
              'Verstuur Aanvraag'
            )}
          </button>
        )}
      </div>

      {/* Success message */}
      {state.isSuccess && (
        <div className={styles.successBanner}>
          <span className={styles.successIcon}>✓</span>
          <p>Je aanvraag is succesvol verstuurd! Je wordt doorgestuurd...</p>
        </div>
      )}
    </form>
  );
};

export default BookingForm;
