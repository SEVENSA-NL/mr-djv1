"use client";

import React from "react";
import { useInView } from "@/src/hooks/useInView";

interface TimelinePhase {
  time: string;
  title: string;
  description: string;
  icon: string;
}

const defaultPhases: TimelinePhase[] = [
  {
    time: "14:00",
    title: "Ceremonie",
    description: "Sfeervolle achtergrondmuziek bij binnenkomst, het ja-woord en het uitlopen. Alles afgestemd op jullie wensen.",
    icon: "💍",
  },
  {
    time: "15:30",
    title: "Receptie & borrel",
    description: "Lichte loungemuziek terwijl gasten feliciteren en genieten van de borrel. De perfecte overgang naar het diner.",
    icon: "🥂",
  },
  {
    time: "17:30",
    title: "Diner",
    description: "Subtiele achtergrondmuziek die past bij de sfeer van het diner. Niet te hard, net genoeg om de ambiance te versterken.",
    icon: "🍽️",
  },
  {
    time: "20:00",
    title: "Openingsdans",
    description: "Het magische moment! Op verzoek maken we een unieke mix van jullie favoriete nummers voor de openingsdans.",
    icon: "💃",
  },
  {
    time: "20:30",
    title: "Feestavond",
    description: "De dansvloer gaat open! Van classics tot hits — de DJ leest het publiek en bouwt de avond op tot een hoogtepunt.",
    icon: "🎉",
  },
  {
    time: "00:00",
    title: "Afsluiting",
    description: "De perfecte afsluiting met jullie favoriete nummer. Een onvergetelijk einde van een onvergetelijke dag.",
    icon: "✨",
  },
];

interface EventTimelineProps {
  phases?: TimelinePhase[];
}

export function EventTimeline({ phases = defaultPhases }: EventTimelineProps) {
  const { ref, isInView } = useInView();

  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div ref={ref} className={`mx-auto max-w-3xl px-4 md:px-6 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-yellow-600">
          Jullie dag
        </p>
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
          Van ceremonie tot afsluiting
        </h2>
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-400/60 via-yellow-400/30 to-transparent md:left-8" />
          <div className="space-y-8">
            {phases.map((phase, i) => (
              <div key={i} className="relative flex gap-5 md:gap-6">
                {/* Timeline dot */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-yellow-400 text-lg md:h-16 md:w-16">
                  <span className="text-xl md:text-2xl" role="img" aria-hidden="true">{phase.icon}</span>
                </div>
                <div className="pt-1 md:pt-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-semibold text-yellow-600">{phase.time}</span>
                    <h3 className="text-lg font-semibold text-gray-900 md:text-xl">{phase.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 md:text-base">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
