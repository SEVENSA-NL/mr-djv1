// src/components/forms/FairOfferForm.tsx

"use client";

import React, { useState } from "react";
import type { FairOfferRequest } from "../../forms/FairOfferRequest";

interface FairOfferFormProps {
  onSubmit: (values: FairOfferRequest) => Promise<void> | void;
}

export const FairOfferForm: React.FC<FairOfferFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<FairOfferRequest>({
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
            Naam partner
          </label>
          <input
            type="text"
            name="partnerName"
            value={values.partnerName || ""}
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
            Telefoonnummer
          </label>
          <input
            type="tel"
            name="phone"
            value={values.phone || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-1 block font-semibold text-white">
            Type feest
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
            Datum
          </label>
          <input
            type="date"
            name="eventDate"
            value={values.eventDate || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Beurs / event
          </label>
          <input
            type="text"
            name="fairName"
            value={values.fairName || ""}
            onChange={handleChange}
            placeholder="Bijv. Trouwbeurs Eindhoven"
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-semibold text-white">
            Locatie / zaal
          </label>
          <input
            type="text"
            name="venueName"
            value={values.venueName || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
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
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Voucher / beurscode
        </label>
        <input
          type="text"
          name="voucherCode"
          value={values.voucherCode || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Opmerkingen
        </label>
        <textarea
          name="notes"
          rows={3}
          value={values.notes || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300 disabled:opacity-60"
      >
        {isSubmitting ? "Verzenden..." : "Vraag beursaanbieding aan"}
      </button>
    </form>
  );
};
