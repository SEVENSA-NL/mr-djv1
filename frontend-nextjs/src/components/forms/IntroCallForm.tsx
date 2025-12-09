// src/components/forms/IntroCallForm.tsx

"use client";

import React, { useState } from "react";
import type { IntroCallRequest } from "../../forms/IntroCallRequest";

interface IntroCallFormProps {
  onSubmit: (values: IntroCallRequest) => Promise<void> | void;
}

export const IntroCallForm: React.FC<IntroCallFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<IntroCallRequest>({
    fullName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
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
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
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
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
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
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Bedrijf / organisatie
          </label>
          <input
            type="text"
            name="companyName"
            value={values.companyName || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Type evenement
        </label>
        <input
          type="text"
          name="eventType"
          value={values.eventType || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Voorkeursmoment voor call
        </label>
        <input
          type="text"
          name="preferredDateTimes"
          value={values.preferredDateTimes || ""}
          onChange={handleChange}
          placeholder="Bijv. doordeweeks overdag / woensdagavond / volgende week"
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Waar wil je het over hebben?
        </label>
        <textarea
          name="topics"
          rows={3}
          value={values.topics || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300 disabled:opacity-60"
      >
        {isSubmitting ? "Verzenden..." : "Vraag call aan"}
      </button>
    </form>
  );
};
