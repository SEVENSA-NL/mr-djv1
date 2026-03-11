import { Metadata } from "next";
import VerhuurContent from "./VerhuurContent";

export const metadata: Metadata = {
  title: "Licht en geluid verhuur in Brabant – Mister DJ",
  description:
    "Professionele DJ apparatuur nodig? Huur van een professionele DJ! ✓Draaitafels ✓Geluidsset ✓Kabels ✓Microfoons ✓Mixers ✓Lichtinstallaties ✓Lasers ✓En meer!",
  alternates: { canonical: "https://mr-dj.nl/nl/verhuur" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Licht en geluid verhuur",
  description:
    "Professionele DJ-apparatuur, geluidsinstallaties en lichtshows huren in Brabant. Inclusief bezorging, opbouw en afbouw.",
  provider: {
    "@type": "LocalBusiness",
    name: "Mister DJ",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kapteijnlaan 17",
      addressLocality: "Veldhoven",
      postalCode: "5505 AV",
      addressCountry: "NL",
    },
    telephone: "+31408422594",
    url: "https://mr-dj.nl",
  },
  areaServed: {
    "@type": "State",
    name: "Noord-Brabant",
  },
  serviceType: "Verhuur DJ-apparatuur, geluidsinstallaties en lichtinstallaties",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    description: "Prijzen op aanvraag. Inclusief levering binnen 40km van Veldhoven.",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Verhuur categorieën",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Feest & DJ apparatuur",
        description: "Draaitafels, DJ booth, rookmachine, lichtgevende dansvloer, discoballen",
      },
      {
        "@type": "OfferCatalog",
        name: "Geluidsinstallatie verhuur",
        description: "Speakers, versterkers, subwoofers, kabels, speakerstandaarden, microfoons, mixers",
      },
      {
        "@type": "OfferCatalog",
        name: "Lichtinstallatie & lasershow verhuur",
        description: "Complete lasershows, losse lasers, lichtinstallaties, LED podium lampen",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <VerhuurContent />
    </>
  );
}
