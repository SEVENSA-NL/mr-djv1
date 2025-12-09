// src/components/forms/AvailabilityForm.tsx

"use client";

import React, { useState } from "react";
import type { AvailabilityRequest, EventType } from "../../forms/AvailabilityRequest";

interface AvailabilityFormProps {
  onSubmit: (values: AvailabilityRequest) => Promise<void> | void;
}

export const AvailabilityForm: React.FC<AvailabilityFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<AvailabilityRequest>({
    fullName: "",
    email: "",
    eventType: "bruiloft",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: name === "guestCountApprox" ? Number(value) || undefined : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventTypes: { label: string; value: EventType }[] = [
    { label: "Bruiloft", value: "bruiloft" },
    { label: "Bedrijfsfeest", value: "bedrijfsfeest" },
    { label: "Verjaardag", value: "verjaardag" },
    { label: "Jubileum", value: "jubileum" },
    { label: "Overig", value: "overig" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-xs text-white/80 md:text-sm">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-semibold text-white">
            Naam
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={values.fullName}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none ring-yellow-300/0 transition focus:ring-2"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            E-mailadres
          </label>
          <input
            type="email"
            name="email"
            required
            value={values.email}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none ring-yellow-300/0 transition focus:ring-2"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Telefoon
          </label>
          <input
            type="tel"
            name="phone"
            value={values.phone || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none ring-yellow-300/0 transition focus:ring-2"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Type feest
          </label>
          <select
            name="eventType"
            value={values.eventType}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none ring-yellow-300/0 transition focus:ring-2"
          >
            {eventTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Datum (indien bekend)
          </label>
          <input
            type="date"
            name="eventDate"
            value={values.eventDate || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none ring-yellow-300/0 transition focus:ring-2"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Locatie / zaal
          </label>
          <input
            type="text"
            name="venueName"
            value={values.venueName || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none ring-yellow-300/0 transition focus:ring-2"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Plaats
          </label>
          <input
            type="text"
            name="venueCity"
            value={values.venueCity || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none ring-yellow-300/0 transition focus:ring-2"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Aantal gasten (ongeveer)
          </label>
          <input
            type="number"
            name="guestCountApprox"
            value={values.guestCountApprox ?? ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none ring-yellow-300/0 transition focus:ring-2"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Hoe hebben jullie Mister DJ gevonden?
        </label>
        <input
          type="text"
          name="howDidYouFindUs"
          value={values.howDidYouFindUs || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none ring-yellow-300/0 transition focus:ring-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Vertel kort iets over jullie plannen
        </label>
        <textarea
          name="message"
          rows={3}
          value={values.message || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none ring-yellow-300/0 transition focus:ring-2"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300 disabled:opacity-60"
      >
        {isSubmitting ? "Verzenden..." : "Verstuur aanvraag"}
      </button>
    </form>
  );
};
