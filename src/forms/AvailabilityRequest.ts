// src/forms/AvailabilityRequest.ts

export type EventType =
  | "bruiloft"
  | "bedrijfsfeest"
  | "verjaardag"
  | "jubileum"
  | "overig";

export interface AvailabilityRequest {
  fullName: string;
  email: string;
  phone?: string;
  eventType: EventType;
  eventDate?: string; // ISO-date string, bijv. 2025-09-21
  venueName?: string;
  venueCity?: string;
  guestCountApprox?: number;
  howDidYouFindUs?: string;
  message?: string;
}
