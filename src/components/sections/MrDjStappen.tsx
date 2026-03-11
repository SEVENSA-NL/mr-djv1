"use client";

import React from "react";
import { useInView } from "@/src/hooks/useInView";
import {
  HandshakeIcon,
  DocumentIcon,
  CheckBadgeIcon,
  ClipboardIcon,
  PhoneIcon,
  SparklesIcon,
} from "@/src/components/icons";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Kennismaking",
    description: "Wij gaan graag, geheel vrijblijvend, in gesprek om jullie wensen door te nemen, onze aanpak te bespreken en te bekijken hoe Mr. DJ jullie daarbij kan helpen.",
    icon: <HandshakeIcon className="h-6 w-6" />,
  },
  {
    number: 2,
    title: "Offerte",
    description: "Na het kennismakingsgesprek hebben jullie een goed beeld gekregen van de organisatie Mr. DJ, de shows en de mogelijkheden. Jullie ontvangen vrijblijvend de offerte met de gekozen show en eventuele extra\u2019s.",
    icon: <DocumentIcon className="h-6 w-6" />,
  },
  {
    number: 3,
    title: "Goedkeuring offerte",
    description: "Om misverstanden te voorkomen, vragen we jullie vriendelijk om de offerte goed te controleren. Als jullie tevreden zijn met de offerte, kunnen jullie deze digitaal goedkeuren. Zodra de offerte akkoord is, is de boeking definitief.",
    icon: <CheckBadgeIcon className="h-6 w-6" />,
  },
  {
    number: 4,
    title: "Vragenlijst",
    description: "Er mag op jullie dag niets ontbreken. Vier weken voorafgaande aan het feest ontvangen jullie de Mr. DJ vragenlijst. We vragen jullie deze zo volledig mogelijk in te vullen, zodat het tijdens jullie feestavond aan niets ontbreekt.",
    icon: <ClipboardIcon className="h-6 w-6" />,
  },
  {
    number: 5,
    title: "Laatste details",
    description: "Een paar dagen voor het feest nemen we nog even contact met jullie op. We bespreken jullie dag, gaan de vragenlijst door en zetten de puntjes op de \u2018i\u2019.",
    icon: <PhoneIcon className="h-6 w-6" />,
  },
  {
    number: 6,
    title: "Jullie dag",
    description: "De DJ is tijdig aanwezig om de show, aan de hand van jullie wensen en de mogelijkheden op de locatie, op te bouwen. Daarna is het enkel nog onze taak om er een grandioos mooi knalfeest van te maken!",
    icon: <SparklesIcon className="h-6 w-6" />,
  },
];

interface MrDjStappenProps {
  variant?: "compact" | "expanded";
}

export function MrDjStappen({ variant = "compact" }: MrDjStappenProps) {
  const { ref, isInView } = useInView();

  if (variant === "compact") {
    return (
      <section className="py-14 md:py-20 lg:py-24">
        <div ref={ref} className={`mx-auto max-w-6xl px-4 md:px-6 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="mb-1 text-center font-script text-2xl text-yellow-600 md:text-3xl">Stappen</p>
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
            In 6 stappen naar het perfecte feest
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-gray-600 md:text-base">
            Van het eerste gesprek tot aan jullie feest: we begeleiden jullie bij elke stap.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, i) => (
              <div key={step.number} className="group relative flex flex-col items-center text-center">
                {/* Connecting line (desktop only) */}
                {i > 0 && (
                  <div className="absolute top-7 right-1/2 w-full h-0.5 bg-gradient-to-r from-yellow-200 to-yellow-400 -translate-y-1/2 hidden lg:block" style={{ left: '-50%' }} />
                )}
                <div className="relative z-10 mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-black shadow-md ring-4 ring-yellow-100">
                  {step.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-xs text-gray-500 hidden sm:block line-clamp-3">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Expanded variant - vertical timeline with full descriptions
  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div ref={ref} className={`mx-auto max-w-3xl px-4 md:px-6 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
        <p className="mb-1 text-center font-script text-2xl text-yellow-600 md:text-3xl">Stappen</p>
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
          In 6 stappen naar het perfecte feest
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-gray-600 md:text-base">
          Van het eerste gesprek tot aan jullie feest: we begeleiden jullie bij elke stap.
        </p>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-yellow-200 md:left-8" />
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="relative flex gap-5 md:gap-6">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black shadow-md md:h-16 md:w-16">
                  {step.icon}
                </div>
                <div className="pt-1 md:pt-3">
                  <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
                    <span className="text-yellow-600 mr-2">{step.number}.</span>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 md:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
