"use client";

import { Button } from "./Button";
import WhatsAppButton from "../../components/WhatsAppButton";

export interface PricingFeatureSet {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
  buttonText: string;
}

export interface PricingTablesProps {
  packages?: PricingFeatureSet[];
}

const euroFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

const defaultPackages: PricingFeatureSet[] = [
  {
    name: "Brons",
    subtitle: "Perfect voor intieme feesten",
    price: euroFormatter.format(495),
    features: [
      "4 uur non-stop muziek en energie",
      "Club-waardig geluid voor tot 100 gasten",
      "Persoonlijke muziekwensen intake",
      "Professionele DJ met 15+ jaar ervaring",
    ],
    buttonText: "Bekijk beschikbaarheid",
  },
  {
    name: "Zilver",
    subtitle: "⭐ Favoriet van 300+ bruidsparen",
    price: euroFormatter.format(795),
    features: [
      "6 uur onvergetelijke feestavond",
      "Spectaculaire lichtshow die iedereen imponeert",
      "Optie: DJ + Live Saxofoon (het verschil tussen leuk en legendarisch)",
      "100% volle dansvloer gegarandeerd of geld terug",
      "Voor elke groepsgrootte - van 50 tot 500 gasten",
    ],
    isFeatured: true,
    buttonText: "Plan je event →",
  },
  {
    name: "Goud",
    subtitle: "Premium All-Inclusive - Stress-vrij feest",
    price: euroFormatter.format(1295),
    features: [
      "8 uur complete entertainment ervaring",
      "Concert-kwaliteit licht & geluid",
      "DJ + Live Saxofonist inbegrepen (wow-factor gegarandeerd)",
      "Ceremonie tot afterparty - volledig verzorgd",
      "Persoonlijk draaiboek + technische regisseur",
    ],
    buttonText: "Vraag vrijblijvende offerte →",
  },
];

function PricingCard({ pkg }: { pkg: PricingFeatureSet }) {
  const { name, subtitle, price, features, isFeatured, buttonText } = pkg;

  const cardClasses = isFeatured
    ? "bg-neutral-dark text-neutral-light shadow-2xl transform scale-105 ring-4 ring-amber-500 ring-offset-2"
    : "bg-neutral-light text-neutral-dark shadow-lg";

  const headerClasses = isFeatured
    ? "text-secondary border-b border-secondary/50"
    : "text-primary border-b border-neutral-gray-100";

  const buttonVariant = isFeatured ? "secondary" : "primary";

  return (
    <div
      className={`relative flex flex-col p-spacing-xl rounded-lg transition duration-300 ${cardClasses}`}
    >
      {isFeatured ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-dark body-sm text-strong px-spacing-lg py-spacing-sm rounded-full shadow-lg border-2 border-amber-300 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-bold">MEEST GEKOZEN</span>
        </div>
      ) : null}
      <div className={`pb-spacing-md mb-spacing-md ${headerClasses}`}>
        <h3 className="heading-3">{name}</h3>
        <p className="body-sm opacity-80">{subtitle}</p>
      </div>
      <div className="flex items-baseline mb-spacing-lg">
        <span className="heading-1">{price}</span>
        <span className="body-md ml-spacing-xs">/ event</span>
      </div>
      <ul className="flex-grow space-y-spacing-sm mb-spacing-xl">
        {features.map((feature) => (
          <li key={feature} className="flex items-start body-md">
            <svg
              className={`w-5 h-5 mr-spacing-sm ${isFeatured ? "text-secondary" : "text-primary"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Button variant={buttonVariant} size="lg" className="w-full">
        {buttonText}
      </Button>
    </div>
  );
}

export function PricingTables({ packages = defaultPackages }: PricingTablesProps) {
  return (
    <section className="py-spacing-3xl bg-neutral-gray-100">
      <div className="container mx-auto px-spacing-md">
        <div className="mb-spacing-2xl text-center">
          <h2 className="heading-2 text-neutral-dark mb-spacing-md">Onze Pakketten</h2>
          <div className="flex flex-wrap justify-center gap-x-spacing-xl gap-y-spacing-xs text-sm text-neutral-600">
            <div className="flex items-center gap-spacing-xs">
              <span className="text-lg">⭐</span>
              <span className="font-medium">4.9/5 sterren</span>
            </div>
            <div className="flex items-center gap-spacing-xs">
              <span className="text-lg">🎉</span>
              <span className="font-medium">500+ geslaagde events</span>
            </div>
            <div className="flex items-center gap-spacing-xs">
              <span className="text-lg">💯</span>
              <span className="font-medium">100% dansgarantie</span>
            </div>
            <div className="flex items-center gap-spacing-xs">
              <span className="text-lg">⏱️</span>
              <span className="font-medium">15+ jaar ervaring</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-xl items-center">
          {packages.map((pkg) => (
            <PricingCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
        <div className="mt-spacing-2xl flex flex-col items-center gap-spacing-md text-center">
          <p className="body-lg text-neutral-dark max-w-2xl">
            Niet zeker welk pakket bij je past? Chat direct met ons via WhatsApp voor persoonlijk advies!
          </p>
          <WhatsAppButton variant="primary" messageType="pricing" label="Vraag advies via WhatsApp" />
        </div>
      </div>
    </section>
  );
}

export default PricingTables;
