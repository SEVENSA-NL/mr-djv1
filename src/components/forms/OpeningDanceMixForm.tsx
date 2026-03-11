"use client";

import React, { useState } from "react";
import type { OpeningDanceMixRequest, OpeningDanceMixSong } from "@/src/forms/OpeningDanceMixRequest";
import { useFormValidation } from "@/src/hooks/useFormValidation";
import { FormField } from "@/src/components/ui/FormField";
import { SuccessMessage } from "@/src/components/ui/SuccessMessage";
import { trackFormSubmit } from "@/src/utils/tracking";

interface OpeningDanceMixFormProps {
  onSubmit: (values: OpeningDanceMixRequest) => Promise<void> | void;
}

const emptySong: OpeningDanceMixSong = { title: "" };

const inputCls = "input-field";
const inputErrorCls = "input-field-error";
const songInputCls = "w-full rounded-md border border-gray-300 bg-gray-100 px-2 py-1.5 text-xs text-gray-900 outline-none transition focus:ring-2 focus:ring-yellow-500/70";

export const OpeningDanceMixForm: React.FC<OpeningDanceMixFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<OpeningDanceMixRequest>({ coupleNames: "", songs: [emptySong] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { errors, validate, clearFieldError } = useFormValidation({
    coupleNames: { required: true, minLength: 2 },
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  const handleSongChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => {
      const nextSongs = [...prev.songs];
      nextSongs[index] = { ...nextSongs[index], [name]: value };
      return { ...prev, songs: nextSongs };
    });
  };

  const addSong = () => {
    setValues((prev) => ({ ...prev, songs: [...prev.songs, { ...emptySong }] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(values as unknown as Record<string, unknown>)) return;
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      try {
        await fetch("/api/opening-dance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      } catch (err) {
        console.error("[FORM] Network error", err);
      }
      trackFormSubmit("opening_dance_mix");
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setValues({ coupleNames: "", songs: [emptySong] });
    setIsSuccess(false);
  };

  if (isSuccess) return <SuccessMessage onReset={handleReset} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-xs text-gray-700 md:text-sm" noValidate>
      <div className="grid gap-3 md:grid-cols-2">
        <FormField label="Namen bruidspaar" name="coupleNames" required error={errors.coupleNames}>
          <input type="text" id="coupleNames" name="coupleNames" required autoComplete="name" aria-required="true" aria-invalid={!!errors.coupleNames} value={values.coupleNames} onChange={handleFieldChange} aria-describedby={errors.coupleNames ? "coupleNames-error" : undefined} className={errors.coupleNames ? inputErrorCls : inputCls} />
        </FormField>
        <FormField label="Datum bruiloft" name="weddingDate">
          <input type="date" id="weddingDate" name="weddingDate" value={values.weddingDate || ""} onChange={handleFieldChange} className={inputCls} />
        </FormField>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <FormField label="E-mailadres" name="email">
          <input type="email" id="email" name="email" autoComplete="email" value={values.email || ""} onChange={handleFieldChange} className={inputCls} />
        </FormField>
        <FormField label="Telefoonnummer" name="phone">
          <input type="tel" id="phone" name="phone" autoComplete="tel" value={values.phone || ""} onChange={handleFieldChange} className={inputCls} />
        </FormField>
        <FormField label="Locatie" name="venueName">
          <input type="text" id="venueName" name="venueName" value={values.venueName || ""} onChange={handleFieldChange} className={inputCls} />
        </FormField>
      </div>
      <FormField label="Plaats" name="venueCity">
        <input type="text" id="venueCity" name="venueCity" value={values.venueCity || ""} onChange={handleFieldChange} className={inputCls} />
      </FormField>
      <div className="space-y-2">
        <label className="mb-1 block text-xs font-semibold text-gray-900 md:text-sm">Nummers voor de openingsdans</label>
        {values.songs.map((song, index) => (
          <div key={index} className="grid gap-2 rounded-md border border-gray-200 bg-gray-50 p-3 md:grid-cols-4">
            <div className="md:col-span-2"><input type="text" name="title" placeholder="Titel" aria-label={`Nummer ${index + 1} - Titel`} value={song.title} onChange={(e) => handleSongChange(index, e)} className={songInputCls} /></div>
            <div><input type="text" name="artist" placeholder="Artiest" aria-label={`Nummer ${index + 1} - Artiest`} value={song.artist || ""} onChange={(e) => handleSongChange(index, e)} className={songInputCls} /></div>
            <div><input type="text" name="notes" placeholder="Bijv. refrein, bepaalde timing" aria-label={`Nummer ${index + 1} - Notities`} value={song.notes || ""} onChange={(e) => handleSongChange(index, e)} className={songInputCls} /></div>
          </div>
        ))}
        <button type="button" onClick={addSong} className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-gray-300 bg-gray-50 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gray-900 hover:border-yellow-500 hover:text-yellow-600">
          + Nummer toevoegen
        </button>
      </div>
      <FormField label="Overige wensen of opmerkingen" name="extraNotes">
        <textarea id="extraNotes" name="extraNotes" rows={3} value={values.extraNotes || ""} onChange={handleFieldChange} className={inputCls} />
      </FormField>
      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300 disabled:opacity-60">
        {isSubmitting ? "Verzenden..." : "Verstuur openingsdans-mix"}
      </button>
    </form>
  );
};
