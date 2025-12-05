"use client";

import { useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

export interface FAQItem {
  question: string;
  answer: string;
  category: "pricing" | "booking" | "music" | "technical" | "general";
}

export interface ComprehensiveFAQProps {
  questions?: FAQItem[];
  showCategories?: boolean;
}

const defaultFAQs: FAQItem[] = [
  // PRICING & PACKAGES (5 questions)
  {
    question: "Wat kost een DJ voor mijn event?",
    answer:
      "Onze pakketten starten vanaf €495 voor 4 uur (pakket Brons) tot €1,295 voor 8 uur all-inclusive met DJ + Live Saxofoon (pakket Goud). De meeste klanten kiezen pakket Zilver (6 uur, lichtshow, €795). Alle prijzen zijn all-in zonder verborgen kosten.",
    category: "pricing",
  },
  {
    question: "Wat zit er precies in elk pakket?",
    answer:
      "**Brons (€495)**: 4 uur non-stop muziek, club-waardig geluid voor tot 100 gasten, muziekwensen intake, professionele DJ. **Zilver (€795)**: 6 uur, spectaculaire lichtshow, optie DJ + Live Saxofoon (+€350), 100% dansgarantie, voor 50-500 gasten. **Goud (€1,295)**: 8 uur, concert-kwaliteit licht & geluid, DJ + Live Saxofonist inbegrepen, ceremonie tot afterparty, persoonlijk draaiboek.",
    category: "pricing",
  },
  {
    question: "Kan ik een pakket aanpassen aan mijn budget?",
    answer:
      "Ja, absoluut! We snappen dat elk event uniek is. Je kunt bijvoorbeeld starten met pakket Brons en alleen verlichting toevoegen (+€150), of kiezen voor pakket Zilver zonder lichtshow. We denken graag met je mee om binnen je budget het beste resultaat te behalen. Bel of WhatsApp ons voor een persoonlijk advies.",
    category: "pricing",
  },
  {
    question: "Zijn reiskosten inbegrepen in de prijs?",
    answer:
      "Voor events binnen Brabant en Limburg (binnen 50 km van Eindhoven) zijn er geen reiskosten. Voor locaties verder weg berekenen we €0,40 per kilometer vanaf 50 km. Dit vermelden we altijd vooraf in de offerte, zodat er geen verrassingen zijn.",
    category: "pricing",
  },
  {
    question: "Wanneer moet ik betalen en hoe werkt dat?",
    answer:
      "Je betaalt in twee delen: 50% aanbetaling bij bevestiging (om je datum vast te leggen) en 50% uiterlijk 2 weken voor het event. We accepteren iDEAL, bankoverschrijving, of creditcard. Je ontvangt altijd een duidelijke factuur en bevestigingsmail.",
    category: "pricing",
  },

  // BOOKING PROCESS (4 questions)
  {
    question: "Hoe ver van tevoren moeten we boeken?",
    answer:
      "Voor weekend-datums (vrijdag/zaterdag) in het bruilofts- en eventseizoen (mei-september) adviseren we 6-12 maanden van tevoren. Voor doordeweekse events of het winterseizoen kan het vaak ook 2-3 maanden. Maar we hebben soms ook last-minute beschikbaarheid – check gerust, want je weet maar nooit!",
    category: "booking",
  },
  {
    question: "Hoe snel kunnen we een offerte verwachten?",
    answer:
      "Binnen 24 uur ontvang je een persoonlijke offerte op maat. Als je een spoedaanvraag hebt (event binnen 30 dagen), krijg je vaak binnen 1-4 uur reactie. We zijn snel, maar nemen wel de tijd om je event goed te begrijpen zodat de offerte echt past bij jouw wensen.",
    category: "booking",
  },
  {
    question: "Wat als we toch moeten annuleren?",
    answer:
      "We begrijpen dat dingen kunnen gebeuren. **Meer dan 3 maanden van tevoren**: volledige restitutie minus €100 administratiekosten. **1-3 maanden van tevoren**: 50% restitutie. **Binnen 1 maand**: geen restitutie (je datum is dan geblokkeerd en we kunnen die vaak niet meer invullen). Bij overmacht (ernstige ziekte, overlijden) zijn we altijd coulant en zoeken we samen naar een oplossing.",
    category: "booking",
  },
  {
    question: "Kunnen we de DJ van tevoren ontmoeten?",
    answer:
      "Ja, graag zelfs! Na je boeking plannen we een kennismakingsgesprek (telefonisch of in persoon, jouw keuze). Hier bespreken we jullie muziekwensen, het verloop van de avond, en eventuele speciale momenten. Voor bruiloften adviseren we altijd een persoonlijke afspraak – zo leren we elkaar kennen en weet je zeker dat de klik er is.",
    category: "booking",
  },

  // MUSIC & PERFORMANCE (3 questions)
  {
    question: "Hoe werkt de muziekwensen intake?",
    answer:
      "Na je boeking krijg je toegang tot ons muziekwensen-formulier. Hier kun je aangeven: **Must-haves** (nummers die je zeker wilt horen), **Do-not-plays** (nummers die echt niet mogen), **Favoriete genres** (house, 80s/90s, Top 40, Nederlands, etc.), **Spotify playlists** (je kunt links delen), en **Speciale momenten** (openingsdans, taart aansnijden, etc.). De DJ gebruikt dit als leidraad maar leest ook de dansvloer – als niemand op house reageert, schakelen we over naar wat wél werkt.",
    category: "music",
  },
  {
    question: "Wat is het verschil tussen DJ + Live Saxofoon en alleen DJ?",
    answer:
      "Een saxofonist tilt je event naar een hoger niveau. Het zorgt voor **wow-momenten** tijdens je openingsdans of belangrijke tracks, geeft je feest een **premium uitstraling**, en creëert **emotionele hoogtepunten** die gasten nóg weken bespreken. Denk aan: openingsdans, grote hits waar iedereen op danst, overgang van ceremonie naar borrel. Het verschil? Tussen leuk en legendarisch. 9 van de 10 klanten met Live Sax zegt: \"Best money spent.\"",
    category: "music",
  },
  {
    question: "Draait de DJ ook ceremonies (trouwen, speeches)?",
    answer:
      "Ja, bij pakket Zilver en Goud is dit standaard inbegrepen. We verzorgen de audio tijdens je ceremonie, speeches, taart aansnijden, en andere belangrijke momenten. Voor pakket Brons kunnen we ceremonie-ondersteuning toevoegen (+€150). We stemmen vooraf af met jullie en de locatie over techniek, timing, en microfoons.",
    category: "music",
  },

  // TECHNICAL & LOGISTICS (3 questions)
  {
    question: "Hoeveel ruimte heeft de DJ nodig?",
    answer:
      "Voor pakket Brons hebben we ongeveer **2x2 meter** nodig (DJ-booth + speakers). Met lichtshow (pakket Zilver/Goud) liefst **3x2,5 meter** (extra ruimte voor licht-stands). We stemmen altijd af met je locatie om de beste plek te bepalen: goede zichtlijnen naar de dansvloer, dicht bij stroomvoorziening, niet midden in de looproute. We kunnen ook flexibel opstellen als de ruimte krap is.",
    category: "technical",
  },
  {
    question: "Kunnen jullie ook buiten draaien (tuinfeest, terras)?",
    answer:
      "Ja! We doen regelmatig outdoor events. Belangrijkste vereisten: **Stroompunt** (220V, normale stopcontact), **Afdak/overkapping bij regen** (voor bescherming van apparatuur), **Vaste ondergrond** (geen los zand of gras dat te zacht is). Bij twijfel sturen we graag iemand vooraf langs om de locatie te checken. We hebben ook een backup stroomaggregaat beschikbaar als er geen vaste stroom is (+€150).",
    category: "technical",
  },
  {
    question: "Wat als de DJ ziek wordt of er technische problemen zijn?",
    answer:
      "**DJ back-up**: We werken met een team van 5 professionele DJ's. Als je DJ onverhoopt ziek wordt, hebben we altijd een vervanger met dezelfde kwaliteit en jouw muziekwensen. Dit is nog nooit voorgekomen, maar de zekerheid is er. **Technische back-up**: We hebben altijd reserve-apparatuur bij (extra laptop, backup mixer, reserve kabels). Mochten er toch onvoorziene problemen zijn, dan lossen we dat ter plekke op. In 500+ events hebben we nog nooit een event moeten afbreken.",
    category: "technical",
  },

  // GENERAL / OTHER (2 questions)
  {
    question: "Wat is jullie 100% dansgarantie precies?",
    answer:
      "Simpel: als je dansvloer niet van start tot finish vol is, krijg je je geld terug. Geen vragen, geen gedoe. Wij lezen de crowd, spelen de juiste muziek op het juiste moment, en zorgen dat iedereen in beweging komt. In 500+ events hebben we deze belofte altijd waargemaakt – geen enkele keer geld hoeven teruggeven. We zijn zo zeker van onze zaak dat we deze garantie durven te geven.",
    category: "general",
  },
  {
    question: "Kunnen jullie ook aan onze huisstijl/branding aanpassen (bedrijfsfeest)?",
    answer:
      "Ja, zeker voor bedrijfsevents! We kunnen: **Visuals op screens** (jullie logo, bedrijfskleuren, slideshow), **Branding op DJ-booth** (logo-projectie of doek), **Gepersonaliseerde intro/outro** (bedrijfshymne of special opening), **Kleur-thema in verlichting** (bijv. blauw voor Philips, groen voor ASML). Dit bespreken we in het intakegesprek en verwerken we in het draaiboek. Kleine aanpassingen zijn gratis, grote custom visuals vanaf €150.",
    category: "general",
  },
];

export function ComprehensiveFAQ({
  questions = defaultFAQs,
  showCategories = false,
}: ComprehensiveFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Alle vragen", icon: "📋" },
    { id: "pricing", label: "Prijzen & Pakketten", icon: "💰" },
    { id: "booking", label: "Boeken & Planning", icon: "📅" },
    { id: "music", label: "Muziek & Performance", icon: "🎵" },
    { id: "technical", label: "Techniek & Locatie", icon: "🔧" },
    { id: "general", label: "Algemeen", icon: "❓" },
  ];

  const filteredQuestions =
    selectedCategory === "all"
      ? questions
      : questions.filter((q) => q.category === selectedCategory);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16" id="faq">
      <div className="mx-auto max-w-5xl px-4 lg:px-0">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900">
            Veelgestelde vragen
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Alles wat je wilt weten over het boeken van een DJ. Vraag niet beantwoord?{" "}
            <a
              href="/contact"
              className="font-semibold text-amber-600 hover:text-amber-500"
            >
              Neem contact op
            </a>{" "}
            of chat via WhatsApp.
          </p>
        </div>

        {showCategories && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {filteredQuestions.map((faq, index) => (
            <details
              key={index}
              open={openIndex === index}
              onClick={(e) => {
                e.preventDefault();
                handleToggle(index);
              }}
              className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-4">
                <span className="text-lg font-semibold text-slate-900 transition-colors duration-200 group-hover:text-amber-600">
                  {faq.question}
                </span>
                <svg
                  className={`h-6 w-6 flex-shrink-0 text-amber-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="mt-4 text-slate-600">{faq.answer}</div>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 p-8 text-center shadow-sm">
          <h3 className="mb-4 text-2xl font-bold text-slate-900">
            Vraag niet beantwoord?
          </h3>
          <p className="mb-6 text-lg text-slate-600">
            We helpen je graag verder! Chat direct met ons via WhatsApp of vraag een vrijblijvende
            offerte aan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <WhatsAppButton
              variant="primary"
              messageType="general"
              label="Chat via WhatsApp"
            />
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg border-2 border-amber-600 bg-white px-6 py-3 text-base font-semibold text-amber-600 shadow-sm transition-all duration-200 hover:bg-amber-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              Vraag offerte aan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComprehensiveFAQ;
export { defaultFAQs };
