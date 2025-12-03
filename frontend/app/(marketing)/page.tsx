"use client";

import RegionLinks from "@/components/RegionLinks";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

export default function MarketingHomePage() {
  return (
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
        <section className="space-y-6" id="faq">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Veelgestelde vragen</h2>
          <div className="space-y-4">
            <details className="group rounded-lg border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-md">
              <summary className="cursor-pointer font-medium transition-colors duration-200 group-hover:text-amber-600">Hoe snel kunnen we een offerte verwachten?</summary>
              <p className="mt-2 text-sm text-slate-600">Binnen 24 uur ontvang je een voorstel op maat voor jouw event.</p>
            </details>
            <details className="group rounded-lg border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-md">
              <summary className="cursor-pointer font-medium transition-colors duration-200 group-hover:text-amber-600">Kunnen jullie afstemmen met de locatie?</summary>
              <p className="mt-2 text-sm text-slate-600">Ja, we nemen direct contact op met de locatie voor techniek en planning.</p>
            </details>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection variant="slide-up" delay={0.1}>
        <section aria-labelledby="region-links-heading" className="space-y-4">
          <h2 id="region-links-heading" className="text-3xl font-semibold tracking-tight text-slate-900">
            Populaire regio's in Brabant &amp; Limburg
          </h2>
          <p className="max-w-2xl text-slate-600">
            We staan klaar voor events in de volledige regio. Verken de meest gevraagde steden en bekijk direct wat we lokaal
            kunnen betekenen.
          </p>
          <RegionLinks />
        </section>
      </AnimatedSection>
    </main>
  );
}
