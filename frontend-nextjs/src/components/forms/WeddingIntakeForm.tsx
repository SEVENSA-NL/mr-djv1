// src/components/forms/WeddingIntakeForm.tsx

"use client";

import React, { useState } from "react";
import type { WeddingIntake } from "../../forms/WeddingIntake";

interface WeddingIntakeFormProps {
  onSubmit: (values: WeddingIntake) => Promise<void> | void;
}

export const WeddingIntakeForm: React.FC<WeddingIntakeFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<WeddingIntake>({
    coupleNames: "",
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
            Namen bruidspaar
          </label>
          <input
            type="text"
            name="coupleNames"
            required
            value={values.coupleNames}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Datum bruiloft
          </label>
          <input
            type="date"
            name="weddingDate"
            value={values.weddingDate || ""}
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
            value={values.email || ""}
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
            Locatie ceremonie
          </label>
          <input
            type="text"
            name="ceremonyLocation"
            value={values.ceremonyLocation || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Locatie receptie
          </label>
          <input
            type="text"
            name="receptionLocation"
            value={values.receptionLocation || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text.white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Locatie feest
          </label>
          <input
            type="text"
            name="partyLocation"
            value={values.partyLocation || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text.white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-1 block font-semibold text-white">
            Aantal volwassenen
          </label>
          <input
            type="number"
            name="guestCountAdults"
            value={values.guestCountAdults ?? ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Aantal kinderen
          </label>
          <input
            type="number"
            name="guestCountChildren"
            value={values.guestCountChildren ?? ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Tijd feest (begin–eind)
          </label>
          <input
            type="text"
            name="startTimeParty"
            placeholder="Bijv. 20:00–01:00"
            value={values.startTimeParty || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Muziek die zeker gedraaid mag worden
        </label>
        <textarea
          name="musicMustPlay"
          rows={3}
          value={values.musicMustPlay || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Muziek die jullie liever niet willen
        </label>
        <textarea
          name="musicDoNotPlay"
          rows={3}
          value={values.musicDoNotPlay || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-1 block font-semibold text-white">
            Openingsdans – nummer
          </label>
          <input
            type="text"
            name="openingDanceSong"
            value={values.openingDanceSong || ""}
            onChange={handleChange}
            className="w-full rounded-md border border.white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Openingsdans – artiest
          </label>
          <input
            type="text"
            name="openingDanceArtist"
            value={values.openingDanceArtist || ""}
            onChange={handleChange}
            className="w-full rounded-md border border.white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Notities bij openingsdans
          </label>
          <input
            type="text"
            name="openingDanceNotes"
            value={values.openingDanceNotes || ""}
            onChange={handleChange}
            className="w-full rounded-md border border.white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Bijzondere momenten / verrassingen
        </label>
        <textarea
          name="specialMoments"
          rows={3}
          value={values.specialMoments || ""}
          onChange={handleChange}
          className="w-full rounded-md border border.white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Thema / dresscode
        </label>
        <input
          type="text"
          name="dressCodeOrTheme"
          value={values.dressCodeOrTheme || ""}
          onChange={handleChange}
          className="w-full rounded-md border border.white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Overige wensen of opmerkingen
        </label>
        <textarea
          name="extraWishes"
          rows={3}
          value={values.extraWishes || ""}
          onChange={handleChange}
          className="w-full rounded-md border border.white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300 disabled:opacity-60"
      >
        {isSubmitting ? "Verzenden..." : "Verstuur bruiloft-intake"}
      </button>
    </form>
  );
};
