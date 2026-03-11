// src/forms/FairOfferRequest.ts
//
// Aanvraag gebaseerd op beursaanbieding / trouwbeurs.

export interface FairOfferRequest {
  fullName: string;
  partnerName?: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  venueName?: string;
  venueCity?: string;
  fairName?: string; // bijv. "Trouwbeurs Eindhoven"
  voucherCode?: string; // beursactie-code
  notes?: string;
}
