// src/forms/OpeningDanceMixRequest.ts
//
// Aanvraag voor een openingsdans-mix.

export interface OpeningDanceMixSong {
  title: string;
  artist?: string;
  startAt?: string; // bijv. "0:15"
  endAt?: string; // bijv. "1:05"
  notes?: string;
}

export interface OpeningDanceMixRequest {
  coupleNames: string;
  weddingDate?: string;
  email?: string;
  phone?: string;
  venueName?: string;
  venueCity?: string;
  songs: OpeningDanceMixSong[];
  extraNotes?: string;
}
