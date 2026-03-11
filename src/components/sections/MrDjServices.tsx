"use client";

import React from "react";
import Image from "next/image";
import { useInView } from "@/src/hooks/useInView";

interface ServiceCard {
  slug: string;
  title: string;
  description: string;
  badge?: string;
  image?: string;
}

const defaultServices: ServiceCard[] = [
  {
    slug: "/nl/bruiloften",
    title: "Bruiloften",
    description:
      "Op de mooiste dag van je leven, laat je natuurlijk niets aan het toeval over. De locatie, het decor \u00e9n de juiste muziek.",
    badge: "100% dansgarantie",
    image: "/images/services/bruiloften.jpg",
  },
  {
    slug: "/nl/bedrijfsfeesten",
    title: "Bedrijfsfeesten",
    description:
      "Bij een succesvol bedrijf hoort een succesvol feest. Personeelsfeesten, jubilea en netwerkborrels.",
    badge: "30-300 personen",
    image: "/images/services/bedrijfsfeesten.jpg",
  },
  {
    slug: "/nl/verjaardag",
    title: "Verjaardag",
    description:
      "Van 30e verjaardag tot Abraham/Sarah-feest. Een echte DJ maakt elk verjaardagsfeest compleet.",
    badge: "Vanaf \u20ac695",
    image: "/images/services/verjaardag.jpg",
  },
  {
    slug: "/nl/eindexamenfeest",
    title: "Eindexamenfeest",
    description:
      "Net geslaagd? Dat verdient een knalfeest! Met de juiste muziek en lichtshow wordt het onvergetelijk.",
    badge: "Populair",
    image: "/images/services/eindexamenfeest.jpg",
  },
  {
    slug: "/nl/jubileum",
    title: "Jubileum",
    description:
      "Een huwelijksjubileum, pensioenfeest of bedrijfsjubileum. Elk jubileum verdient de juiste sfeer.",
    image: "/images/services/jubileum.jpg",
  },
  {
    slug: "/nl/kerstfeest",
    title: "Kerstfeest",
    description:
      "Kerstborrel, kerstdiner of nieuwjaarsfeest. De perfecte afsluiting van het jaar met Mister DJ.",
    badge: "Seizoen 2026",
    image: "/images/services/kerstfeest.jpg",
  },
];

interface MrDjServicesProps {
  services?: ServiceCard[];
}

export const MrDjServices: React.FC<MrDjServicesProps> = ({
  services = defaultServices,
}) => {
  const { ref, isInView } = useInView();

  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div ref={ref} className={`mx-auto max-w-6xl px-4 md:px-6 transition-opacity ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="mb-10 max-w-lg">
          <p className="section-label">
            Voor elk feest het juiste plan
          </p>
          <h2 className="section-heading mb-3">
            Jullie avond, jullie muziek
          </h2>
          <p className="text-base text-gray-600">
            Of het nu gaat om een intieme bruiloft, groot bedrijfsfeest of knallende verjaardag,
            de show wordt volledig afgestemd op jullie wensen, locatie en gasten.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {services.map((service) => (
            <a
              key={service.slug + service.title}
              href={service.slug}
              className="card-elevated group flex flex-col justify-between overflow-hidden !p-0"
            >
              {service.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  {service.badge && (
                    <span className="rounded-full bg-yellow-400/15 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-yellow-700">
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-yellow-600">
                  <span>Meer info</span>
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
