"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import type { AvailabilityRequest, EventType } from "@/src/forms/AvailabilityRequest";
import { useFormValidation } from "@/src/hooks/useFormValidation";
import { FormField } from "@/src/components/ui/FormField";
import { SuccessMessage } from "@/src/components/ui/SuccessMessage";
import { trackFormSubmit } from "@/src/utils/tracking";

interface AvailabilityFormProps {
  onSubmit: (values: AvailabilityRequest) => Promise<void> | void;
}

const eventTypes: { label: string; value: EventType }[] = [
  { label: "Bruiloft", value: "bruiloft" },
  { label: "Bedrijfsfeest", value: "bedrijfsfeest" },
  { label: "Verjaardag", value: "verjaardag" },
  { label: "Jubileum", value: "jubileum" },
  { label: "Overig", value: "overig" },
];

const STORAGE_KEY = "mrdj_availability_form";
const TOTAL_STEPS = 3;

const inputCls = "input-field";
const inputErrorCls = "input-field-error";

function getDefaultEventType(pathname: string): EventType {
  if (pathname.includes("bruiloften")) return "bruiloft";
  if (pathname.includes("bedrijfsfeesten")) return "bedrijfsfeest";
  return "bruiloft";
}

function getTodayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function loadSavedForm(): Partial<AvailabilityRequest> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<AvailabilityRequest>;
  } catch {
    return null;
  }
}

function saveForm(values: AvailabilityRequest): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  } catch {
    // silently fail
  }
}

function clearSavedForm(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently fail
  }
}

/* --- Progress Bar --- */
const ProgressBar: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="mb-6 flex items-center justify-center gap-0">
    {Array.from({ length: TOTAL_STEPS }, (_, i) => {
      const step = i + 1;
      const isActive = step <= currentStep;
      return (
        <React.Fragment key={step}>
          {i > 0 && (
            <div className={`h-0.5 w-8 transition-colors ${step <= currentStep ? "bg-yellow-400" : "bg-gray-200"}`} />
          )}
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              isActive ? "bg-yellow-400 text-black" : "border border-gray-300 text-gray-400"
            }`}
          >
            {step}
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

/* --- Main Form --- */
export const AvailabilityForm: React.FC<AvailabilityFormProps> = ({ onSubmit }) => {
  const pathname = usePathname();
  const defaultEvent = getDefaultEventType(pathname);

  const [step, setStep] = useState(1);
  const [values, setValues] = useState<AvailabilityRequest>({
    fullName: "",
    email: "",
    eventType: defaultEvent,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Validation rules per step
  const step1Rules = {};
  const step2Rules = {
    fullName: { required: true, minLength: 2 },
    email: { required: true, email: true },
  };

  const { errors, validate, clearFieldError } = useFormValidation(
    step === 2 ? step2Rules : step1Rules
  );

  // Load saved form data on mount
  useEffect(() => {
    const saved = loadSavedForm();
    if (saved) {
      setValues((prev) => ({ ...prev, ...saved, eventType: saved.eventType || defaultEvent }));
    }
  }, [defaultEvent]);

  // Autosave on value changes
  const autoSave = useCallback(() => {
    saveForm(values);
  }, [values]);

  useEffect(() => {
    const timer = setTimeout(autoSave, 500);
    return () => clearTimeout(timer);
  }, [autoSave]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: name === "guestCountApprox" ? Number(value) || undefined : value }));
    clearFieldError(name);
  };

  const handleNext = () => {
    if (step === 2) {
      if (!validate(values as unknown as Record<string, unknown>)) return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent double submit
    setSubmitError(false);
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      } catch (err) {
        console.error("[FORM] Network error", err);
      }
      trackFormSubmit("availability", values.eventType);
      setIsSuccess(true);
      clearSavedForm();
    } catch {
      setSubmitError(true);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setValues({ fullName: "", email: "", eventType: defaultEvent });
    setIsSuccess(false);
    setStep(1);
    clearSavedForm();
  };

  if (isSuccess) return <SuccessMessage onReset={handleReset} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-gray-700 md:text-sm" noValidate>
      {/* Response time guarantee badge */}
      <div className="flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-800">
        <svg className="h-4 w-4 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span><strong>Reactiegarantie:</strong> antwoord binnen 24 uur</span>
      </div>
      <ProgressBar currentStep={step} />

      {/* Step 1: Datum + Eventtype */}
      {step === 1 && (
        <div className="space-y-3">
          <FormField label="Datum van het feest" name="eventDate">
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              min={getTodayISO()}
              value={values.eventDate || ""}
              onChange={handleChange}
              className={inputCls}
            />
          </FormField>
          <FormField label="Type feest" name="eventType">
            <select id="eventType" name="eventType" value={values.eventType} onChange={handleChange} className={inputCls}>
              {eventTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </FormField>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary w-full"
            >
              Volgende
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Naam + Email + Telefoon */}
      {step === 2 && (
        <div className="space-y-3">
          <FormField label="Naam" name="fullName" required error={errors.fullName}>
            <input type="text" id="fullName" name="fullName" required autoComplete="name" aria-required="true" aria-invalid={!!errors.fullName} value={values.fullName} onChange={handleChange} aria-describedby={errors.fullName ? "fullName-error" : undefined} className={errors.fullName ? inputErrorCls : inputCls} />
          </FormField>
          <FormField label="E-mailadres" name="email" required error={errors.email}>
            <input type="email" id="email" name="email" required autoComplete="email" aria-required="true" aria-invalid={!!errors.email} value={values.email} onChange={handleChange} aria-describedby={errors.email ? "email-error" : undefined} className={errors.email ? inputErrorCls : inputCls} />
          </FormField>
          <FormField label="Telefoon" name="phone">
            <input type="tel" id="phone" name="phone" autoComplete="tel" value={values.phone || ""} onChange={handleChange} className={inputCls} />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary"
            >
              Terug
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary flex-1"
            >
              Volgende
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Locatie + Gasten + Bericht */}
      {step === 3 && (
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <FormField label="Locatie / zaal" name="venueName">
              <input type="text" id="venueName" name="venueName" value={values.venueName || ""} onChange={handleChange} className={inputCls} />
            </FormField>
            <FormField label="Plaats" name="venueCity">
              <input type="text" id="venueCity" name="venueCity" value={values.venueCity || ""} onChange={handleChange} className={inputCls} />
            </FormField>
            <FormField label="Aantal gasten (ongeveer)" name="guestCountApprox">
              <input type="number" id="guestCountApprox" name="guestCountApprox" value={values.guestCountApprox ?? ""} onChange={handleChange} className={inputCls} />
            </FormField>
            <FormField label="Hoe hebben jullie Mister DJ gevonden?" name="howDidYouFindUs">
              <input type="text" id="howDidYouFindUs" name="howDidYouFindUs" value={values.howDidYouFindUs || ""} onChange={handleChange} className={inputCls} />
            </FormField>
          </div>
          <FormField label="Vertel kort iets over jullie plannen" name="message">
            <textarea id="message" name="message" rows={3} value={values.message || ""} onChange={handleChange} className={inputCls} />
          </FormField>
          {submitError && (
            <p role="alert" className="text-xs text-mrdj-error">Er ging iets mis. Probeer het opnieuw.</p>
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary"
            >
              Terug
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 disabled:opacity-60"
            >
              {isSubmitting ? "Verzenden..." : "Verstuur aanvraag"}
            </button>
          </div>
          <p className="text-center text-[0.65rem] text-gray-400">
            Vrijblijvend - antwoord binnen 24 uur
          </p>
        </div>
      )}
    </form>
  );
};
