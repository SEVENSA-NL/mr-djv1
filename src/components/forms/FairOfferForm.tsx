"use client";

import React, { useState } from "react";
import type { FairOfferRequest } from "@/src/forms/FairOfferRequest";
import { useFormValidation } from "@/src/hooks/useFormValidation";
import { FormField } from "@/src/components/ui/FormField";
import { SuccessMessage } from "@/src/components/ui/SuccessMessage";
import { trackFormSubmit } from "@/src/utils/tracking";

interface FairOfferFormProps {
  onSubmit: (values: FairOfferRequest) => Promise<void> | void;
}

const inputCls = "input-field";
const inputErrorCls = "input-field-error";

export const FairOfferForm: React.FC<FairOfferFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<FairOfferRequest>({ fullName: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { errors, validate, clearFieldError } = useFormValidation({
    fullName: { required: true, minLength: 2 },
    email: { required: true, email: true },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(values as unknown as Record<string, unknown>)) return;
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      trackFormSubmit("fair_offer");
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setValues({ fullName: "", email: "" });
    setIsSuccess(false);
  };

  if (isSuccess) return <SuccessMessage onReset={handleReset} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-xs text-gray-700 md:text-sm" noValidate>
      <div className="grid gap-3 md:grid-cols-2">
        <FormField label="Naam" name="fullName" required error={errors.fullName}>
          <input type="text" id="fullName" name="fullName" required autoComplete="name" aria-required="true" aria-invalid={!!errors.fullName} value={values.fullName} onChange={handleChange} aria-describedby={errors.fullName ? "fullName-error" : undefined} className={errors.fullName ? inputErrorCls : inputCls} />
        </FormField>
        <FormField label="Naam partner" name="partnerName">
          <input type="text" id="partnerName" name="partnerName" autoComplete="off" value={values.partnerName || ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="E-mailadres" name="email" required error={errors.email}>
          <input type="email" id="email" name="email" required autoComplete="email" aria-required="true" aria-invalid={!!errors.email} value={values.email} onChange={handleChange} aria-describedby={errors.email ? "email-error" : undefined} className={errors.email ? inputErrorCls : inputCls} />
        </FormField>
        <FormField label="Telefoonnummer" name="phone">
          <input type="tel" id="phone" name="phone" autoComplete="tel" value={values.phone || ""} onChange={handleChange} className={inputCls} />
        </FormField>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <FormField label="Type feest" name="eventType">
          <input type="text" id="eventType" name="eventType" value={values.eventType || ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="Datum" name="eventDate">
          <input type="date" id="eventDate" name="eventDate" value={values.eventDate || ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="Beurs / event" name="fairName">
          <input type="text" id="fairName" name="fairName" value={values.fairName || ""} onChange={handleChange} placeholder="Bijv. Trouwbeurs Eindhoven" className={inputCls} />
        </FormField>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <FormField label="Locatie / zaal" name="venueName">
          <input type="text" id="venueName" name="venueName" value={values.venueName || ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="Plaats" name="venueCity">
          <input type="text" id="venueCity" name="venueCity" value={values.venueCity || ""} onChange={handleChange} className={inputCls} />
        </FormField>
      </div>
      <FormField label="Voucher / beurscode" name="voucherCode">
        <input type="text" id="voucherCode" name="voucherCode" value={values.voucherCode || ""} onChange={handleChange} className={inputCls} />
      </FormField>
      <FormField label="Opmerkingen" name="notes">
        <textarea id="notes" name="notes" rows={3} value={values.notes || ""} onChange={handleChange} className={inputCls} />
      </FormField>
      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300 disabled:opacity-60">
        {isSubmitting ? "Verzenden..." : "Vraag beursaanbieding aan"}
      </button>
    </form>
  );
};
