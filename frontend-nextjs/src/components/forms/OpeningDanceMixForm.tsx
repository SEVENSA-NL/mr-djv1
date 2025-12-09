// src/components/forms/OpeningDanceMixForm.tsx

"use client";

import React, { useState } from "react";
import type { OpeningDanceMixRequest, OpeningDanceMixSong } from "../../forms/OpeningDanceMixRequest";

interface OpeningDanceMixFormProps {
  onSubmit: (values: OpeningDanceMixRequest) => Promise<void> | void;
}

const emptySong: OpeningDanceMixSong = {
  title: "",
};

export const OpeningDanceMixForm: React.FC<OpeningDanceMixFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<OpeningDanceMixRequest>({
    coupleNames: "",
    songs: [emptySong],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSongChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
            onChange={handleFieldChange}
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
            onChange={handleFieldChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-1 block font-semibold text-white">
            E-mailadres
          </label>
          <input
            type="email"
            name="email"
            value={values.email || ""}
            onChange={handleFieldChange}
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
            onChange={handleFieldChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-white">
            Locatie
          </label>
          <input
            type="text"
            name="venueName"
            value={values.venueName || ""}
            onChange={handleFieldChange}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Plaats
        </label>
        <input
          type="text"
          name="venueCity"
          value={values.venueCity || ""}
          onChange={handleFieldChange}
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <div className="space-y-2">
        <label className="mb-1 block font-semibold text-white">
          Nummers voor de openingsdans
        </label>
        {values.songs.map((song, index) => (
          <div key={index} className="grid gap-2 rounded-md border border-white/10 bg-black/30 p-3 md:grid-cols-4">
            <div className="md:col-span-2">
              <input
                type="text"
                name="title"
                placeholder="Titel"
                value={song.title}
                onChange={(e) => handleSongChange(index, e)}
                className="w-full rounded-md border border-white/15 bg-black/40 px-2 py-1.5 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
              />
            </div>
            <div>
              <input
                type="text"
                name="artist"
                placeholder="Artiest"
                value={song.artist || ""}
                onChange={(e) => handleSongChange(index, e)}
                className="w-full rounded-md border border-white/15 bg-black/40 px-2 py-1.5 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
              />
            </div>
            <div>
              <input
                type="text"
                name="notes"
                placeholder="Bijv. refrein, bepaalde timing"
                value={song.notes || ""}
                onChange={(e) => handleSongChange(index, e)}
                className="w-full rounded-md border border-white/15 bg-black/40 px-2 py-1.5 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addSong}
          className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white hover:border-yellow-300 hover:text-yellow-200"
        >
          + Nummer toevoegen
        </button>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-white">
          Overige wensen of opmerkingen
        </label>
        <textarea
          name="extraNotes"
          rows={3}
          value={values.extraNotes || ""}
          onChange={handleFieldChange}
          className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-yellow-300/70"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300 disabled:opacity-60"
      >
        {isSubmitting ? "Verzenden..." : "Verstuur openingsdans-mix"}
      </button>
    </form>
  );
};
