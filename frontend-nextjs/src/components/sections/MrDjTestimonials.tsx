// src/components/sections/MrDjTestimonials.tsx
//
// Testimonial/grid-sectie met quotes van bruidsparen en klanten.

import React from "react";
import { mrDjTheme } from "../../design/mr-dj-theme";

interface Testimonial {
  name: string;
  eventType: string;
  quote: string;
  location?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Kim & Silas",
    eventType: "Bruiloft",
    quote:
      "Vanaf het eerste nummer stond de dansvloer vol. De communicatie vooraf was super en alles liep precies zoals we hadden gehoopt.",
    location: "Eindhoven",
  },
  {
    name: "Familie van Liempt",
    eventType: "Jubileumfeest",
    quote:
      "Alle generaties stonden samen op de dansvloer. De muziek sloot perfect aan op onze familie.",
    location: "Tilburg",
  },
  {
    name: "HR-team",
    eventType: "Bedrijfsfeest",
    quote:
      "Onze collega’s praten nog steeds over het feest. Professioneel, flexibel en bovenal een topavond.",
    location: "Regio Brainport",
  },
];

interface MrDjTestimonialsProps {
  testimonials?: Testimonial[];
}

export const MrDjTestimonials: React.FC<MrDjTestimonialsProps> = ({
  testimonials = defaultTestimonials,
}) => {
  return (
    <section
      style={{
        paddingTop: mrDjTheme.layout.sectionPaddingY.mobile,
        paddingBottom: mrDjTheme.layout.sectionPaddingY.mobile,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 max-w-lg">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
            Reviews
          </p>
          <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
            Wat andere feestgevers over Mister DJ zeggen.
          </h2>
          <p className="text-sm text-white/75 md:text-base">
            Jullie avond gebeurt maar één keer. Daarom is het fijn om te lezen
            hoe andere bruidsparen, families en bedrijven het hebben ervaren.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name + item.eventType}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 text-white shadow-lg"
            >
              <blockquote className="mb-3 text-sm text-white/80">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-auto text-xs text-white/70 md:text-sm">
                <div className="font-semibold">{item.name}</div>
                <div className="text-white/60">
                  {item.eventType}
                  {item.location ? ` · ${item.location}` : null}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
