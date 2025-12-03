"use client";

import { useState } from "react";
import { Phone, FileText, Music, Wrench, Sparkles, ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

interface ProcessStep {
  id: string;
  number: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  details: string[];
  cta?: {
    label: string;
    href: string;
  };
}

const processSteps: ProcessStep[] = [
  {
    id: "kennismaking",
    number: 1,
    icon: Phone,
    title: "Kennismakingsgesprek",
    subtitle: "Gratis & vrijblijvend",
    description:
      "Start met een kort gesprek waarin we jouw event bespreken en direct indicatie geven of we beschikbaar zijn en wat het ongeveer kost.",
    duration: "15-30 minuten",
    details: [
      "WhatsApp, telefoon of videocall",
      "Event type, datum, locatie, aantal gasten",
      "Globale muziekvoorkeur inventariseren",
      "Indicatieve prijsopgave direct",
      "Geen verplichtingen",
    ],
    cta: {
      label: "Plan gratis kennismaking",
      href: "/contact",
    },
  },
  {
    id: "offerte",
    number: 2,
    icon: FileText,
    title: "Offerte op Maat",
    subtitle: "Binnen 24 uur",
    description:
      "Je ontvangt een gedetailleerde offerte met transparante all-in prijzen, geen verborgen kosten, en duidelijke pakket breakdown.",
    duration: "Je ontvangt binnen 24 uur",
    details: [
      "Pakket breakdown (Brons/Zilver/Goud)",
      "All-in prijzen zonder verrassingen",
      "Optionele add-ons (sax, extra uren, verlichting)",
      "Beschikbaarheidsbevestiging",
      "Bedenktijd zonder druk",
    ],
  },
  {
    id: "intake",
    number: 3,
    icon: Music,
    title: "Intakegesprek",
    subtitle: "Na boeking",
    description:
      "Diepgaand gesprek waarin we jouw muziekvoorkeur tot in detail bespreken. We maken samen een Spotify/YouTube playlist en lopen het event tijdschema door.",
    duration: "30-60 minuten",
    details: [
      "Muziekvoorkeur analyse (favoriete nummers, genres, no-go's)",
      "Spotify/YouTube playlist samenwerken",
      "Tijdschema event doorlopen",
      "Speciale momenten bespreken (openingsdans, speeches)",
      "Gasten demografie (leeftijd, muziekvoorkeur)",
    ],
  },
  {
    id: "voorbereiding",
    number: 4,
    icon: Wrench,
    title: "Technische Voorbereiding",
    subtitle: "1 week voor event",
    description:
      "We regelen alles met de locatie, checken technische zaken en zorgen dat er geen verrassingen zijn op de dag zelf.",
    duration: "1 week voor event",
    details: [
      "Locatie check (ruimte, stroom, geluid)",
      "Coördinatie met venue/coordinator",
      "Equipment planning + backup systemen",
      "Tijdschema finale versie",
      "Noodplan (backup DJ, techniek dubbel)",
    ],
  },
  {
    id: "showtime",
    number: 5,
    icon: Sparkles,
    title: "Showtime - Jouw Event",
    subtitle: "De dag waar het om draait",
    description:
      "Op de dag zelf zijn we 2 uur voor het event aanwezig voor opbouw, soundcheck en lichttest. Dan begint het feest - van eerste dans tot laatste track.",
    duration: "4-8 uur (afhankelijk van pakket)",
    details: [
      "2 uur voor event: opbouw + soundcheck",
      "Ceremonie audio (indien gewenst)",
      "Openingsdans live coaching",
      "Avondfeest met crowd reading",
      "Abbouw + evaluatie",
      "100% dansgarantie - volle vloer of geld terug",
    ],
    cta: {
      label: "Bekijk onze pakketten",
      href: "#pakketten",
    },
  },
];

function ProcessStepCard({
  step,
  isExpanded,
  onToggle,
}: {
  step: ProcessStep;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = step.icon;

  return (
    <div className="relative">
      {/* Connector Line (not for last step) */}
      {step.number < processSteps.length && (
        <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-amber-600 to-amber-600/20 -translate-y-4" />
      )}

      <div className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Number Badge */}
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">{step.number}</span>
          </div>

          {/* Title */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-5 h-5 text-amber-600" />
              <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
            </div>
            <p className="text-sm text-amber-600 font-medium">{step.subtitle}</p>
            <p className="text-sm text-slate-600 mt-1">ñ {step.duration}</p>
          </div>

          {/* Expand Button */}
          <button
            onClick={onToggle}
            className="flex-shrink-0 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label={isExpanded ? "Verberg details" : "Toon details"}
          >
            <ChevronDown
              className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Description */}
        <p className="text-slate-700 mb-4">{step.description}</p>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
            <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
              Wat gebeurt er:
            </h4>
            <ul className="space-y-2">
              {step.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-amber-600 mt-0.5"></span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            {/* CTA if present */}
            {step.cta && (
              <a
                href={step.cta.href}
                className="inline-flex items-center justify-center mt-4 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
              >
                {step.cta.label}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [expandedStep, setExpandedStep] = useState<string | null>("kennismaking");

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <section className="py-spacing-3xl bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-spacing-md">
        {/* Section Header */}
        <AnimatedSection variant="fade" delay={0.1}>
          <div className="text-center mb-spacing-2xl max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-spacing-md">
              Hoe Het Werkt: Van Kennismaking Tot Onvergetelijk Feest
            </h2>
            <p className="text-lg text-slate-700">
              We begeleiden je stap voor stap naar een perfect event. Volledige transparantie, geen
              verrassingen, en altijd persoonlijk contact.
            </p>
          </div>
        </AnimatedSection>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto space-y-6">
          {processSteps.map((step, index) => (
            <AnimatedSection key={step.id} variant="slide-up" delay={0.1 * (index + 1)}>
              <ProcessStepCard
                step={step}
                isExpanded={expandedStep === step.id}
                onToggle={() => toggleStep(step.id)}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection variant="fade" delay={0.7}>
          <div className="mt-spacing-2xl text-center">
            <p className="text-lg text-slate-700 mb-spacing-md">
              Klaar om te starten? Begin met een gratis kennismakingsgesprek.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              Plan Nu Je Kennismaking
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default HowItWorks;
