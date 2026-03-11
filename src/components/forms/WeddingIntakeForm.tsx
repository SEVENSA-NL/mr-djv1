"use client";

import React, { useState } from "react";
import type { WeddingIntake } from "@/src/forms/WeddingIntake";
import { useFormValidation } from "@/src/hooks/useFormValidation";
import { FormField } from "@/src/components/ui/FormField";
import { SuccessMessage } from "@/src/components/ui/SuccessMessage";
import { trackFormSubmit } from "@/src/utils/tracking";

interface WeddingIntakeFormProps {
  onSubmit: (values: WeddingIntake) => Promise<void> | void;
}

const inputCls = "input-field";
const inputErrorCls = "input-field-error";

export const WeddingIntakeForm: React.FC<WeddingIntakeFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<WeddingIntake>({ coupleNames: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { errors, validate, clearFieldError } = useFormValidation({
    coupleNames: { required: true, minLength: 2 },
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
      try {
        await fetch("/api/wedding-intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      } catch (err) {
        console.error("[FORM] Network error", err);
      }
      trackFormSubmit("wedding_intake");
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setValues({ coupleNames: "" });
    setIsSuccess(false);
  };

  if (isSuccess) return <SuccessMessage onReset={handleReset} />;

  const SectionDivider = ({ label }: { label: string }) => (
    <div className="mt-5 mb-3 flex items-center gap-2 first:mt-0">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gray-400">{label}</span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-xs text-gray-700 md:text-sm" noValidate>
      <SectionDivider label="Basisgegevens" />
      <div className="grid gap-3 md:grid-cols-2">
        <FormField label="Namen bruidspaar" name="coupleNames" required error={errors.coupleNames}>
          <input type="text" id="coupleNames" name="coupleNames" required autoComplete="name" aria-required="true" aria-invalid={!!errors.coupleNames} value={values.coupleNames} onChange={handleChange} aria-describedby={errors.coupleNames ? "coupleNames-error" : undefined} className={errors.coupleNames ? inputErrorCls : inputCls} />
        </FormField>
        <FormField label="Datum bruiloft" name="weddingDate">
          <input type="date" id="weddingDate" name="weddingDate" value={values.weddingDate || ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="E-mailadres" name="email">
          <input type="email" id="email" name="email" autoComplete="email" value={values.email || ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="Telefoonnummer" name="phone">
          <input type="tel" id="phone" name="phone" autoComplete="tel" value={values.phone || ""} onChange={handleChange} className={inputCls} />
        </FormField>
      </div>

      <SectionDivider label="Locaties" />
      <div className="grid gap-3 md:grid-cols-3">
        <FormField label="Locatie ceremonie" name="ceremonyLocation">
          <input type="text" id="ceremonyLocation" name="ceremonyLocation" value={values.ceremonyLocation || ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="Locatie receptie" name="receptionLocation">
          <input type="text" id="receptionLocation" name="receptionLocation" value={values.receptionLocation || ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="Locatie feest" name="partyLocation">
          <input type="text" id="partyLocation" name="partyLocation" value={values.partyLocation || ""} onChange={handleChange} className={inputCls} />
        </FormField>
      </div>

      <SectionDivider label="Gasten & Tijden" />
      <div className="grid gap-3 md:grid-cols-3">
        <FormField label="Aantal volwassenen" name="guestCountAdults">
          <input type="number" id="guestCountAdults" name="guestCountAdults" value={values.guestCountAdults ?? ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="Aantal kinderen" name="guestCountChildren">
          <input type="number" id="guestCountChildren" name="guestCountChildren" value={values.guestCountChildren ?? ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="Tijd feest (begin-eind)" name="startTimeParty">
          <input type="text" id="startTimeParty" name="startTimeParty" placeholder="Bijv. 20:00-01:00" value={values.startTimeParty || ""} onChange={handleChange} className={inputCls} />
        </FormField>
      </div>

      <SectionDivider label="Muziekwensen" />
      <FormField label="Muziek die zeker gedraaid mag worden" name="musicMustPlay">
        <textarea id="musicMustPlay" name="musicMustPlay" rows={3} value={values.musicMustPlay || ""} onChange={handleChange} className={inputCls} />
      </FormField>
      <FormField label="Muziek die jullie liever niet willen" name="musicDoNotPlay">
        <textarea id="musicDoNotPlay" name="musicDoNotPlay" rows={3} value={values.musicDoNotPlay || ""} onChange={handleChange} className={inputCls} />
      </FormField>

      <SectionDivider label="Openingsdans" />
      <div className="grid gap-3 md:grid-cols-3">
        <FormField label="Openingsdans - nummer" name="openingDanceSong">
          <input type="text" id="openingDanceSong" name="openingDanceSong" value={values.openingDanceSong || ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="Openingsdans - artiest" name="openingDanceArtist">
          <input type="text" id="openingDanceArtist" name="openingDanceArtist" value={values.openingDanceArtist || ""} onChange={handleChange} className={inputCls} />
        </FormField>
        <FormField label="Notities bij openingsdans" name="openingDanceNotes">
          <input type="text" id="openingDanceNotes" name="openingDanceNotes" value={values.openingDanceNotes || ""} onChange={handleChange} className={inputCls} />
        </FormField>
      </div>

      <SectionDivider label="Overig" />
      <FormField label="Bijzondere momenten / verrassingen" name="specialMoments">
        <textarea id="specialMoments" name="specialMoments" rows={3} value={values.specialMoments || ""} onChange={handleChange} className={inputCls} />
      </FormField>
      <FormField label="Thema / dresscode" name="dressCodeOrTheme">
        <input type="text" id="dressCodeOrTheme" name="dressCodeOrTheme" value={values.dressCodeOrTheme || ""} onChange={handleChange} className={inputCls} />
      </FormField>
      <FormField label="Overige wensen of opmerkingen" name="extraWishes">
        <textarea id="extraWishes" name="extraWishes" rows={3} value={values.extraWishes || ""} onChange={handleChange} className={inputCls} />
      </FormField>
      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300 disabled:opacity-60">
        {isSubmitting ? "Verzenden..." : "Verstuur bruiloft-intake"}
      </button>
    </form>
  );
};
