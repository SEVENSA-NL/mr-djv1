// src/forms/IntroCallRequest.ts

export interface IntroCallRequest {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  eventType?: string;
  preferredDateTimes?: string; // vrije tekst, bijv. "di/wo avond, volgend weekend"
  topics?: string; // wat wil men bespreken
}
