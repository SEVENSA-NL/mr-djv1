// src/forms/WeddingIntake.ts
//
// Samenvatting van de belangrijkste velden uit de bruiloft-vragenlijst.

export interface WeddingIntake {
  coupleNames: string;
  weddingDate?: string;
  email?: string;
  phone?: string;
  ceremonyLocation?: string;
  receptionLocation?: string;
  partyLocation?: string;
  guestCountAdults?: number;
  guestCountChildren?: number;
  startTimeParty?: string;
  endTimeParty?: string;
  musicMustPlay?: string; // vrije tekst, top-nummers
  musicDoNotPlay?: string; // no-go nummers / genres
  openingDanceSong?: string;
  openingDanceArtist?: string;
  openingDanceNotes?: string;
  specialMoments?: string; // bijv. speeches, verrassingen
  dressCodeOrTheme?: string;
  extraWishes?: string;
}
