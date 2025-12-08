import type { EventType } from '@/lib/types/service';

export interface Testimonial {
  name: string;
  eventType: EventType;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sanne & Tom',
    eventType: 'bruiloft',
    quote:
      'Onze bruiloft was één groot feest. De dansvloer is geen minuut leeg geweest.',
  },
  {
    name: 'Philips Events',
    eventType: 'bedrijfsfeest',
    quote:
      'Professionele communicatie, strakke opbouw en een volle dansvloer tot het einde.',
  },
  {
    name: 'Lisa\'s 30e verjaardag',
    eventType: 'feest',
    quote:
      'Precies de juiste mix van classics en nieuwe hits. Iedereen stond op de dansvloer.',
  },
];

export const testimonialsByEventType: Record<EventType, Testimonial[]> = {
  bruiloft: testimonials.filter((t) => t.eventType === 'bruiloft'),
  bedrijfsfeest: testimonials.filter((t) => t.eventType === 'bedrijfsfeest'),
  feest: testimonials.filter((t) => t.eventType === 'feest'),
  overig: [],
};

