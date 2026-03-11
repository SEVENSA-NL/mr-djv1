"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { trackFaqClick } from "@/src/utils/tracking";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FaqItem[] = [
  // Categorie: Over Mister DJ
  {
    category: "Over Mister DJ",
    question: "Waarom zou ik voor Mister DJ kiezen?",
    answer: "Bij Mister DJ hebben we gezamenlijk meer dan 30 jaar ervaring in het realiseren van geweldige partijen en weten we als geen ander hoe we jouw of jullie feest nog persoonlijker maken: het draait tenslotte om gezellig samen zijn, muziek die jij graag hoort en dans. Daar houden we wel van! Een romantische ceremonie, een bedrijfsborrel of een jubileum, Mr. DJ is van alle markten thuis en helpt graag met passend advies voor een perfecte en onvergetelijke dag. Lees meer over ons team op de Over Mister DJ pagina.",
  },
  {
    category: "Over Mister DJ",
    question: "Wat houdt de 100% Dansgarantie in?",
    answer: "Met onze 100% Dansgarantie beloven we dat de dansvloer gevuld wordt op jullie feest. Hoe? Onze DJ's zijn getraind om de zaal te lezen en de muziek realtime aan te passen. Ze schakelen moeiteloos tussen genres, voelen aan wanneer de energie omhoog moet en wanneer het tijd is voor een rustmoment. We bereiden ons voor met jullie muziekwensen en combineren dat met jarenlange ervaring. Het resultaat: van jong tot oud, iedereen gaat de dansvloer op. Dat garanderen we.",
  },
  {
    category: "Over Mister DJ",
    question: "Wat maakt Mister DJ anders dan andere DJ-bedrijven?",
    answer: "Drie dingen onderscheiden ons: (1) Persoonlijk contact — jullie hebben altijd een vast aanspreekpunt, van kennismaking tot en met het feest. (2) Volledige voorbereiding — we investeren 6-8 uur per evenement in voorbereiding, muziekvragenlijst en programmabespreking. (3) Professionele apparatuur — wij meten elke locatie op en stemmen geluid en licht af op de ruimte. Geen standaard-setje, maar maatwerk. Met een 10/10 score op ThePerfectWedding.nl en 2.500+ succesvolle feesten spreken de resultaten voor zich.",
  },
  {
    category: "Over Mister DJ",
    question: "Wat is het verschil tussen de pakketten?",
    answer: "Wij bieden verschillende pakketten aan, van een basispakket met professionele DJ en standaard geluidsinstallatie tot uitgebreide pakketten met extra verlichting, speciale effecten en een langere speelduur. Elk pakket is volledig aan te passen aan jullie wensen. In de brochure vind je een overzicht, en we maken graag een offerte op maat.",
  },
  {
    category: "Over Mister DJ",
    question: "Kunnen we de DJ van tevoren ontmoeten?",
    answer: "Absoluut! Wij plannen altijd een vrijblijvend kennismakingsgesprek in. Dit kan bij jullie thuis, op de locatie of via videobellen. Zo kunnen we jullie wensen bespreken, de sfeer afstemmen en zorgen dat de klik goed is. Dit gesprek is geheel kosteloos en vrijblijvend.",
  },
  {
    category: "Over Mister DJ",
    question: "Kan ik ook DJ worden?",
    answer: "We zijn altijd op zoek naar nieuw talent! Neem gerust contact op via info@mr-dj.nl of bel 040-8422594.",
  },

  // Categorie: Boekingen & Kosten
  {
    category: "Boekingen & Kosten",
    question: "Waar kan ik de prijzen van Mister DJ terugvinden?",
    answer: "Onze prijzen staan in onze brochure en op onze website bij de DJ Pakketten. Voor specifieke wensen maken we graag een offerte op maat. Neem contact op voor een persoonlijk voorstel.",
  },
  {
    category: "Boekingen & Kosten",
    question: "Wat is jullie annuleringsbeleid?",
    answer: "Bij annulering meer dan 6 maanden voor het evenement bedragen de kosten 25% van het totaalbedrag. Tussen 3 en 6 maanden is dit 50%, tussen 1 en 3 maanden 75%, en bij annulering minder dan 1 maand voor het evenement is het volledige bedrag verschuldigd. Annulering dient altijd schriftelijk te gebeuren. Zie onze algemene voorwaarden voor alle details.",
  },
  {
    category: "Boekingen & Kosten",
    question: "Komen jullie ook buiten Brabant?",
    answer: "Zeker! Hoewel we gevestigd zijn in Veldhoven, komen we door heel Nederland. Voor locaties buiten een straal van 50 kilometer kunnen er aanvullende reiskosten van toepassing zijn. We informeren je hier altijd vooraf over in de offerte.",
  },
  {
    category: "Boekingen & Kosten",
    question: "Hoe zit het met BUMA/STEMRA rechten?",
    answer: "Als professioneel DJ-bedrijf beschikken wij over alle benodigde muzieklicenties. De BUMA/STEMRA-rechten voor het afspelen van muziek op jullie evenement zijn bij ons inbegrepen. Jullie hoeven je hier dus geen zorgen over te maken.",
  },

  // Categorie: De muziek
  {
    category: "De muziek",
    question: "Kunnen we eigen muziekwensen doorgeven?",
    answer: "Natuurlijk! Jullie muziekwensen staan centraal. Na de boeking ontvangen jullie een muziekvragenlijst waarin je al jullie favoriete nummers, genres en eventuele no-go's kunt aangeven. De DJ stemt de playlist hier volledig op af, zodat de muziek echt bij jullie past.",
  },
  {
    category: "De muziek",
    question: "Hoe werkt de muziekvragenlijst?",
    answer: "Na bevestiging van de boeking sturen wij jullie een uitgebreide muziekvragenlijst. Hierin kunnen jullie aangeven welke genres en nummers jullie graag willen horen, maar ook welke muziek je liever niet hoort. De DJ gebruikt deze lijst als leidraad en combineert jullie wensen met zijn ervaring om de perfecte sfeer te creeren.",
  },
  {
    category: "De muziek",
    question: "Verzorgen jullie ook de ceremoniemuziek?",
    answer: "Ja, wij verzorgen graag de muziek tijdens de gehele dag, inclusief de ceremonie. Denk aan muziek bij binnenkomst, tijdens de geloften, het ja-woord en het uitlopen. We bespreken vooraf welke nummers jullie bij elk moment willen horen, zodat het perfect aansluit bij de emotie van het moment.",
  },

  // Categorie: Praktische zaken
  {
    category: "Praktische zaken",
    question: "Hoeveel uur speelt de DJ?",
    answer: "Dit hangt af van het gekozen pakket en jullie wensen. Standaard speelt de DJ tussen de 4 en 6 uur, maar we bieden ook pakketten aan voor een hele dag of avond. Meeruren zijn altijd mogelijk en worden vooraf besproken. Neem contact op voor een aanbieding op maat.",
  },
  {
    category: "Praktische zaken",
    question: "Hoe laat kan de DJ beginnen?",
    answer: "De DJ kan op elk gewenst tijdstip beginnen. Of het nu gaat om een middagborrel, een diner met achtergrondmuziek of een avondfeest, wij passen ons aan jullie planning aan. De DJ is ongeveer 2 uur voor aanvang aanwezig voor de opbouw.",
  },
  {
    category: "Praktische zaken",
    question: "Hoelang van te voren moet een DJ aanwezig zijn?",
    answer: "Je Mister DJ zal ongeveer twee uur nodig hebben om het feest in orde te maken. Dit wordt verder besproken tijdens het kennismakingsgesprek.",
  },
  {
    category: "Praktische zaken",
    question: "Hoeveel ruimte heeft de DJ nodig?",
    answer: "Voor een standaard opstelling hebben we een ruimte nodig van minimaal 2 bij 3 meter, met toegang tot minimaal 2 geaarde stopcontacten (16A) op een eigen groep. Bij uitgebreidere opstellingen met extra verlichting of effecten kan er meer ruimte nodig zijn. We stemmen dit altijd vooraf af met de locatie.",
  },
  {
    category: "Praktische zaken",
    question: "Wat als onze locatie geen stroom heeft?",
    answer: "Geen probleem! Voor buitenlocaties of locaties zonder vaste stroomvoorziening kunnen wij een professionele stille generator regelen. Dit bespreken we graag in de offerte, zodat jullie nergens omkijken naar hebben.",
  },
  {
    category: "Praktische zaken",
    question: "Kunnen jullie ook buiten draaien?",
    answer: "Ja, we hebben ervaring met buitenevenementen en beschikken over weerbestendige apparatuur. Wel is het belangrijk dat er een overdekte noodlocatie beschikbaar is voor de apparatuur bij slecht weer. We bespreken de mogelijkheden en eventuele extra maatregelen graag vooraf.",
  },

  // Categorie: Extra diensten
  {
    category: "Extra diensten",
    question: "Hebben jullie een photobooth?",
    answer: "Ja, wij kunnen een photobooth verzorgen als aanvulling op de DJ-dienst. De photobooth komt inclusief props, achtergrond en directe prints voor jullie gasten. Het is een geweldige toevoeging voor extra entertainment en mooie herinneringen. Vraag naar de mogelijkheden in jullie offerte.",
  },

  // Categorie: Contact
  {
    category: "Contact",
    question: "Hoe kan ik een speciaal verzoek indienen of iets wijzigen?",
    answer: "Je kunt iedere dag bellen met je eigen Mister DJ. Je vraag of verzoek zal dan direct beantwoord worden. Je kunt ook altijd mailen, sms'en of whatsappen. Bezoek onze contactpagina voor alle contactmogelijkheden.",
  },
  {
    category: "Contact",
    question: "Heb je een andere vraag?",
    answer: "Neem gerust contact met ons op! Je kunt ons dagelijks bereiken via info@mr-dj.nl of bel 040-8422594.",
  },
];

const categories = Array.from(new Set(faqItems.map((item) => item.category)));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

const FaqAccordion: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    if (!open) {
      trackFaqClick(question);
    }
    setOpen(!open);
  };
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-700 overflow-hidden">
      <button type="button" onClick={handleToggle} className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-gray-900 min-h-[44px]" aria-expanded={open}>
        <span>{question}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`shrink-0 ml-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true"><path d="M5 7.5l5 5 5-5"/></svg>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-4 pb-4 text-xs text-gray-700 md:text-sm">{answer}</div>
        </div>
      </div>
    </div>
  );
};

export default function VeelgesteldeVragenContent() {
  return (
    <MrDjLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs />
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">Veelgestelde vragen</p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Antwoorden op de meest gestelde vragen.
        </h1>
        <p className="mb-6 max-w-2xl text-sm text-gray-700 md:text-base">
          Vind je hieronder niet wat je zoekt? Neem gerust contact op, we denken graag mee.
        </p>

        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="mb-3 text-lg font-semibold text-yellow-600/90">{category}</h2>
              <div className="space-y-3">
                {faqItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <FaqAccordion
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bekijk ook */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Bekijk ook:</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/nl/bruiloften" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Bruiloften</span>
            De complete bruiloftshow met persoonlijk contact en muziek op maat.
          </Link>
          <Link href="/nl/bedrijfsfeesten" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Bedrijfsfeesten</span>
            Professionele DJ voor personeelsfeesten, jubilea en zakelijke events.
          </Link>
          <Link href="/nl/contact" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Contact</span>
            Neem vrijblijvend contact op of check direct de beschikbaarheid.
          </Link>
        </div>
      </section>
    </MrDjLayout>
  );
}
