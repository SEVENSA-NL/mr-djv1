export interface StructuredDataScript {
  id: string;
  json: string;
}

const BASE_URL = "https://staging.sevensa.nl/";
const LOGO_URL = `${BASE_URL}assets/images/logo.png`;
const BUSINESS_ID = `${BASE_URL}#mister-dj`;
const ORGANIZATION_ID = `${BASE_URL}#organization`;
const SERVICE_ID = `${BASE_URL}#wedding-and-event-dj-service`;

const areaServed = ["Brabant", "Eindhoven", "Tilburg", "Den Bosch", "Zuid-Nederland"];

const sameAs = [
  "https://www.facebook.com/misterdj",
  "https://www.instagram.com/misterdj",
  "https://www.linkedin.com/company/mister-dj",
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: "Mister DJ",
  description:
    "Mister DJ levert dj's en live sax combinaties met 100% dansgarantie voor bruiloften, bedrijfsfeesten en private events.",
  image: LOGO_URL,
  url: BASE_URL,
  telephone: "+31-40-8422594",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kapteijnlaan 17",
    postalCode: "5505 AV",
    addressLocality: "Veldhoven",
    addressRegion: "NB",
    addressCountry: "NL",
  },
  areaServed,
  sameAs,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Mister DJ",
  url: BASE_URL,
  logo: LOGO_URL,
  sameAs,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+31-40-8422594",
      contactType: "customer service",
      areaServed: "NL",
      availableLanguage: ["nl", "en"],
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": SERVICE_ID,
  name: "Mister DJ Bruiloft & Event DJ",
  serviceType: "Wedding and corporate event DJ services",
  description:
    "Volledige DJ-service met maatwerk licht- en geluidsoplossingen voor bruiloften, bedrijfsfeesten en exclusieve events in Zuid-Nederland.",
  provider: {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Mister DJ",
  },
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Brabant",
    },
    {
      "@type": "City",
      name: "Eindhoven",
    },
    {
      "@type": "City",
      name: "Tilburg",
    },
    {
      "@type": "City",
      name: "Den Bosch",
    },
    {
      "@type": "State",
      name: "Zuid-Nederland",
    },
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: BASE_URL,
    eligibleRegion: {
      "@type": "Country",
      name: "NL",
    },
  },
};

const weddingFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat kost een DJ met live saxofonist voor een bruiloft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De kosten variëren afhankelijk van de duur en locatie. Neem contact met ons op voor een persoonlijke offerte op basis van uw wensen en budget.",
      },
    },
    {
      "@type": "Question",
      name: "Hoever van tevoren moet ik een DJ boeken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We raden aan om minstens 3-6 maanden van tevoren te boeken, vooral voor populaire data zoals zaterdagen in het zomerseizoen.",
      },
    },
    {
      "@type": "Question",
      name: "Verzorgen jullie ook de geluidsapparatuur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, wij verzorgen professionele geluidsapparatuur en lichtshow die past bij de grootte en sfeer van uw evenement.",
      },
    },
    {
      "@type": "Question",
      name: "Kunnen we muziekwensen doorgeven?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absoluut! We stemmen de muziek volledig af op uw wensen en kunnen vooraf een playlist samenstellen met uw favoriete nummers.",
      },
    },
    {
      "@type": "Question",
      name: "In welke regio's zijn jullie actief?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We zijn actief in heel Zuid-Nederland, met name in Brabant, Eindhoven, Tilburg, Den Bosch en omgeving.",
      },
    },
  ],
};

const corporateFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat maakt jullie geschikt voor bedrijfsevents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We hebben jarenlange ervaring met bedrijfsfeesten en corporate events. Onze DJ's begrijpen hoe ze een professionele maar ontspannen sfeer kunnen creëren die past bij uw bedrijfscultuur.",
      },
    },
    {
      "@type": "Question",
      name: "Kunnen jullie muziek aanpassen aan verschillende doelgroepen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, we stemmen de muziek af op uw gasten en het type event. Of het nu gaat om een netwerkevent, jubileum of teambuilding, we zorgen voor de juiste sfeer.",
      },
    },
    {
      "@type": "Question",
      name: "Bieden jullie ook technische ondersteuning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, we bieden volledige technische ondersteuning inclusief geluid, verlichting en indien gewenst ook microfoons voor speeches of presentaties.",
      },
    },
  ],
};

export const structuredDataSchemas = {
  localBusiness: localBusinessSchema,
  organization: organizationSchema,
  service: serviceSchema,
  weddingFAQ: weddingFAQSchema,
  corporateFAQ: corporateFAQSchema,
} as const;

export type StructuredDataKey = keyof typeof structuredDataSchemas;

export const toJsonLd = (schema: object): string => JSON.stringify(schema, null, 2);

export const getStructuredDataScripts = (): StructuredDataScript[] =>
  (Object.keys(structuredDataSchemas) as StructuredDataKey[]).map((key) => ({
    id: `schema-${key}`,
    json: toJsonLd(structuredDataSchemas[key]),
  }));

export const injectStructuredData = (doc?: Document): void => {
  const targetDocument = doc ?? (typeof document !== "undefined" ? document : undefined);
  if (!targetDocument) {
    return;
  }

  const head = targetDocument.head ?? targetDocument.getElementsByTagName("head")[0];
  if (!head) {
    return;
  }

  getStructuredDataScripts().forEach(({ id, json }) => {
    let script = targetDocument.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = targetDocument.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      head.appendChild(script);
    }

    script.textContent = json;
  });
};
