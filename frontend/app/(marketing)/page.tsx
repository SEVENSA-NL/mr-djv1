"use client";

import RegionLinks from "@/components/RegionLinks";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import ComprehensiveFAQ from "@/components/ComprehensiveFAQ";
import HowItWorks from "@/components/HowItWorks";
import { motion } from "framer-motion";
import Script from "next/script";

const schemaOrgData = {
  "@context": "https://schema.org",
  "@type": "EntertainmentBusiness",
  name: "Mister DJ",
  description:
    "Professionele DJ service voor bruiloften en bedrijfsfeesten in Brabant & Limburg. 100% dansgarantie, 15+ jaar ervaring, 500+ geslaagde events.",
  url: "https://www.mister-dj.nl",
  telephone: "+31408422594",
  email: "hallo@misterdj.nl",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Eindhoven",
    addressRegion: "Noord-Brabant",
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "51.4416",
    longitude: "5.4697",
  },
  areaServed: [
    { "@type": "City", name: "Eindhoven" },
    { "@type": "City", name: "Tilburg" },
    { "@type": "City", name: "Den Bosch" },
    { "@type": "City", name: "Breda" },
    { "@type": "City", name: "Helmond" },
    { "@type": "City", name: "Veldhoven" },
    { "@type": "City", name: "Best" },
  ],
  priceRange: "€495 - €1,295",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Brons Pakket",
      description: "DJ 4 uur met professioneel geluidssysteem",
      price: "495",
      priceCurrency: "EUR",
    },
    {
      "@type": "Offer",
      name: "Zilver Pakket",
      description: "DJ 6 uur met geluid en lichtshow",
      price: "795",
      priceCurrency: "EUR",
    },
    {
      "@type": "Offer",
      name: "Goud Pakket",
      description: "DJ + Live Saxofoon 8 uur all-inclusive",
      price: "1295",
      priceCurrency: "EUR",
    },
  ],
};

export default function MarketingHomePage() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
      />
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-12 lg:px-0">
      <section className="relative space-y-6 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-white to-slate-50 p-8 shadow-sm lg:p-12" id="hero">
        {/* Decorative gradient orbs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-slate-200/30 to-blue-200/30 blur-3xl" />

        <div className="relative z-10 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-wide text-amber-600"
          >
            Dé feestspecialist van het zuiden
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Professionele DJ + Live Saxofoon voor bruiloften en bedrijfsfeesten
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg font-medium text-slate-700"
          >
            100% Dansgarantie | 15+ jaar ervaring | 500+ geslaagde events
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl text-lg text-slate-600"
          >
            Van intieme bruiloften tot grote bedrijfsfeesten: wij creëren een onvergetelijke avond met professioneel geluid, sfeervolle verlichting en optioneel live saxofoon. Transparante pakketten, persoonlijke aandacht en volledige ontzorging.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="max-w-2xl text-base text-slate-600 leading-relaxed"
          >
            <p className="mb-3">
              <strong>Mister DJ</strong> is dé specialist voor bruiloften en bedrijfsfeesten in Brabant & Limburg.
              Met 15+ jaar ervaring en 500+ geslaagde events creëren we de perfecte muzikale sfeer voor
              jouw dag. Van intieme bruiloften op Kasteel de Haar tot grote bedrijfsfeesten bij Philips,
              ASML en VDL - onze professionele DJ's met optioneel live saxofonist zorgen voor een volle
              dansvloer van begin tot eind.
            </p>
            <p>
              Geen muziek-sausje, maar maatwerk op basis van jouw smaak en gastenlijst. We luisteren eerst,
              dan draaien we. Precies daarom werkt onze <strong>100% dansgarantie</strong>: volle vloer of geld terug.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <a className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-amber-500 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]" href="#pakketten">
              Bekijk pakketten
            </a>
            <WhatsAppButton variant="primary" messageType="general" label="Chat via WhatsApp" />
            <a className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]" href="/contact">
              Vraag een offerte aan
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatedSection variant="fade" delay={0.1}>
        <section className="space-y-6" id="usps">
          <h2 className="sr-only">Waarom kiezen voor Mister DJ</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection variant="slide-up" delay={0.1}>
              <div className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110">🎷</div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">DJ + Live Saxofoon</h3>
                <p className="text-sm text-slate-600">
                  Het verschil tussen leuk en legendarisch. Live muziek tilt je eerste dans en party naar een hoger niveau.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slide-up" delay={0.2}>
              <div className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110">💯</div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">100% Dansgarantie</h3>
                <p className="text-sm text-slate-600">
                  Volle dansvloer of je geld terug. In 500+ events hebben we deze belofte altijd waargemaakt.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slide-up" delay={0.3}>
              <div className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110">⭐</div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">15+ Jaar Ervaring</h3>
                <p className="text-sm text-slate-600">
                  500+ geslaagde events voor bruiloften, bedrijven (Philips, ASML, VDL) en privé feesten.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slide-up" delay={0.4}>
              <div className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110">📍</div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Lokale Expert</h3>
                <p className="text-sm text-slate-600">
                  Dé feestspecialist van Brabant & Limburg. We kennen alle venues en geen reiskosten binnen de regio.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slide-up" delay={0.5}>
              <div className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110">💰</div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Transparante Prijzen</h3>
                <p className="text-sm text-slate-600">
                  All-in pakketten zonder verborgen kosten. Budget zekerheid en offerte binnen 24 uur.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection variant="slide-up" delay={0.1}>
        <section className="space-y-6" id="waarom-mister-dj">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Waarom Kiezen Meer Dan 500 Klanten Voor Mister DJ?
          </h2>
          <div className="prose prose-slate max-w-none space-y-4">
            <p className="text-lg leading-relaxed text-slate-700">
              Als je een <strong>DJ huurt voor je bruiloft</strong> of{" "}
              <strong>bedrijfsfeest</strong>, wil je zekerheid. Zekerheid dat de dansvloer
              vol staat, dat je gasten nog maanden later praten over die geweldige party, en
              dat alles technisch perfect verloopt zonder stress.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              Daarom bieden wij als enige in Brabant & Limburg een{" "}
              <strong>100% dansgarantie</strong>: volle dansvloer of je geld terug. In 15+
              jaar en 500+ events hebben we deze belofte altijd waargemaakt. Niet door
              standaard setlists af te draaien, maar door écht te luisteren naar jouw
              muzieksmaak en je gasten te lezen tijdens het feest.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              Onze <strong>allround DJ's</strong> zijn gespecialiseerd in bruiloften en
              bedrijfsfeesten bij bekende namen als <strong>Philips</strong>,{" "}
              <strong>ASML</strong>, en <strong>VDL</strong>. Optioneel met{" "}
              <strong>live saxofonist</strong> voor die extra WOW-factor tijdens je
              openingsdans of borrel.
            </p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection variant="slide-up" delay={0.1}>
        <section className="space-y-8" id="event-types">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Voor Welke Events Boek Je Mister DJ?
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                🎷 Bruiloft DJ met Live Saxofoon
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Een <strong>bruiloft DJ huren</strong> is een belangrijke keuze - het kan je
                feest maken of breken. Onze bruiloft specialisten begeleiden je van ceremonie
                tot avondfeest. Met optioneel <strong>live saxofonist</strong> voor je
                openingsdans en sfeervolle lounge muziek tijdens het diner. We werken samen
                met alle grote trouwlocaties in Brabant zoals <strong>Kasteel de Haar</strong>
                , <strong>Landgoed de Biestheuvel</strong>, en Fletcher Hotels. Van intieme
                bruiloften (50 gasten) tot grote feesten (250+ gasten) - elk event krijgt een
                persoonlijk intake gesprek waarin we jouw muziekvoorkeur tot in detail
                bespreken.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                🏢 Bedrijfsfeest DJ
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Voor <strong>bedrijfsfeesten</strong> bij <strong>Philips</strong>,{" "}
                <strong>ASML</strong>, <strong>VDL</strong> en 100+ andere bedrijven in
                Brabant verzorgen we complete entertainment oplossingen. Van netwerkborrel met
                lounge DJ tot knallend personeelsfeest met live saxofoon en visuele projecties
                van jullie branding. Onze <strong>professionele DJ's</strong> weten exact hoe
                je een diverse groep (van 20-jarige stagiair tot 60-jarige directeur) op de
                dansvloer krijgt en houdt. Marloes Jansen (VDL Groep): "Eindelijk een volle
                dansvloer! De DJ las de groep perfect."
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                🎉 Privé Feesten & Jubilea
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Verjaardagen, jubilea, tuinfeesten - voor elk privé feest creëren we de juiste
                sfeer. Mark de Vries (50e verjaardag): "Perfecte mix van oude hits (80s/90s)
                en nieuwe tracks. Zelfs mijn schoonmoeder stond te dansen!" We passen muziek
                én setup aan op jouw thema, van chille lounge tot knallend 80s party. Ook voor
                kleinere feesten vanaf 30 personen mogelijk met onze compacte setups.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <HowItWorks />

      <AnimatedSection variant="slide-up" delay={0.1}>
        <section className="space-y-4" id="pakketten">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">DJ pakketten op maat</h2>
          <p className="max-w-2xl text-slate-600">
            Van compacte setups tot all-in shows met verlichting, visuals en live muzikanten: Mister DJ bouwt een pakket dat past
            bij jullie locatie, gastenlijst en favoriete muziekstijlen.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className="group rounded-lg border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5">
              <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-amber-600">Bruiloft pakket</h3>
              <p className="text-sm text-slate-600">Intieme intake, ceremonie-audio, openingsdans coaching en avondshow.</p>
            </li>
            <li className="group rounded-lg border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5">
              <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-amber-600">Business event</h3>
              <p className="text-sm text-slate-600">Opening, plenaire begeleiding en feestavond met branding visuals.</p>
            </li>
          </ul>
        </section>
      </AnimatedSection>

      <AnimatedSection variant="slide-up" delay={0.1}>
        <ComprehensiveFAQ showCategories={true} />
      </AnimatedSection>

      <AnimatedSection variant="slide-up" delay={0.1}>
        <section aria-labelledby="region-links-heading" className="space-y-6 bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl">
          <h2 id="region-links-heading" className="text-3xl font-semibold tracking-tight text-slate-900">
            📍 Actief In Heel Brabant & Limburg
          </h2>
          <div className="prose prose-slate max-w-none space-y-4">
            <p className="text-lg leading-relaxed text-slate-700">
              Als lokale <strong>DJ specialist</strong> zijn we actief in de complete regio
              Brabant & Limburg. <strong>Geen reiskosten</strong> binnen onze kerndekking:{" "}
              <strong>Eindhoven</strong>, <strong>Tilburg</strong>,{" "}
              <strong>Den Bosch</strong>, <strong>Breda</strong>, <strong>Helmond</strong>,{" "}
              <strong>Veldhoven</strong>, <strong>Best</strong>, en omliggende gemeenten.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              We kennen alle grote venues persoonlijk en hebben ervaring met de akoestiek en
              technische mogelijkheden van elk event center, kasteel, en trouwlocatie in de
              regio. Van industriële lofts in Eindhoven tot historische kastelen bij Utrecht -
              we weten precies wat er nodig is qua geluid, verlichting en opbouwruimte.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              Verken hieronder de meest populaire steden waar we actief zijn. Elke stad heeft
              zijn eigen DJ pagina met lokale informatie, venues en prijzen.
            </p>
          </div>
          <RegionLinks />
        </section>
      </AnimatedSection>
    </main>
    </>
  );
}
