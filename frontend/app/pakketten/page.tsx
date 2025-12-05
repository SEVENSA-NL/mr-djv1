import type { Metadata } from "next";
import PricingTables from "@/src/components/PricingTables";
import Breadcrumbs from "@/components/Breadcrumbs";
import PriceCalculator from "@/components/pricing/PriceCalculator";

export const metadata: Metadata = {
  title: "Pakketten & Prijzen - Transparante DJ Pakketten",
  description:
    "Bekijk onze DJ pakketten voor bruiloften, bedrijfsfeesten en events. Van €495 (Brons) tot €1295 (Goud Premium). Transparante prijzen, 100% dansgarantie.",
  openGraph: {
    title: "Pakketten & Prijzen | Mister DJ",
    description:
      "Transparante DJ pakketten van €495 tot €1295. Inclusief geluid, verlichting en optioneel live saxofoon. 100% dansgarantie.",
  },
};

export default function PakkettenPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs />
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-500">
            Prijzen & Pakketten
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Transparante DJ Pakketten
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Kies het pakket dat perfect past bij je event. Van intieme feesten tot grote bruiloften - wij hebben voor elke gelegenheid het juiste aanbod. Inclusief professioneel geluid, sfeerverlichting en optioneel live saxofoon.
          </p>
        </div>

        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">✨</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">All-in pakketten</h2>
            <p className="text-sm text-slate-600">
              Geen verborgen kosten. Alle prijzen zijn inclusief aankomst, opbouw, uitvoering en afbouw.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">🎷</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Live Saxofoon optie</h2>
            <p className="text-sm text-slate-600">
              Upgrade elk pakket met een live saxofonist. Het verschil tussen leuk en legendarisch.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">💯</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">100% Dansgarantie</h2>
            <p className="text-sm text-slate-600">
              Volle dansvloer of je geld terug. In 500+ events hebben we deze belofte altijd waargemaakt.
            </p>
          </div>
        </div>
      </section>

      <PricingTables />

      <PriceCalculator />

      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-0">
        <div className="rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 p-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Wat zit er in elk pakket?</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">🎵</span>
                Professioneel geluid & muziek
              </h3>
              <ul className="ml-8 space-y-1 text-sm text-slate-700">
                <li>• Club-kwaliteit geluidsinstallatie (geschikt voor jouw locatie)</li>
                <li>• Draadloze microfoons voor speeches & ceremonies</li>
                <li>• Uitgebreide muziekbibliotheek (alle genres & decennia)</li>
                <li>• Persoonlijke muziekwensen intake vooraf</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">💡</span>
                Sfeervolle verlichting
              </h3>
              <ul className="ml-8 space-y-1 text-sm text-slate-700">
                <li>• Moving heads & LED spots (vanaf pakket Zilver)</li>
                <li>• Sfeerverlichting afgestemd op je thema & locatie</li>
                <li>• Lichtshow gesynchroniseerd met de muziek</li>
                <li>• Dimbare verlichting voor intieme momenten</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">🎯</span>
                Volledige ontzorging
              </h3>
              <ul className="ml-8 space-y-1 text-sm text-slate-700">
                <li>• Afstemming met je locatie (technische planning)</li>
                <li>• Opbouw ruim voor aanvang (geen stress)</li>
                <li>• Ervaren DJ die de vibe aanvoelt & de dansvloer vult</li>
                <li>• Backup apparatuur standaard aanwezig</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
            <p className="mb-2 font-semibold text-slate-900">💡 Weet je niet welk pakket past?</p>
            <p className="mb-4 text-sm text-slate-600">
              Vertel ons over je event en we adviseren je graag over het perfecte pakket voor jouw wensen en budget.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-amber-600"
              >
                Vraag persoonlijk advies
              </a>
              <a
                href="tel:+31408422594"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Bel direct
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Veelgestelde vragen over onze pakketten
          </h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Kunnen we een pakket uitbreiden met extra uren?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Ja, absoluut! We kunnen elk pakket uitbreiden met extra uren. De kosten hiervoor zijn €150 per extra uur. Dit is inclusief DJ, muziek en verlichting.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Wat kost de live saxofonist als extra optie?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                De live saxofonist kan bij pakket Brons en Zilver worden toegevoegd voor €400 extra. Bij pakket Goud is deze al inbegrepen! De saxofonist speelt live mee met de DJ gedurende de hoogtepunten van je feest (bijv. openingsdans, hit van de avond).
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Zijn reiskosten inbegrepen in de prijs?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Voor events in Brabant en Limburg zijn er geen reiskosten. Voor locaties daarbuiten berekenen we €0,30 per kilometer (enkele reis vanaf Eindhoven). We vermelden dit altijd duidelijk in de offerte.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Wat gebeurt er als de DJ ziek wordt?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                We hebben een netwerk van ervaren backup DJ's. In het onverhoopte geval dat je DJ ziek wordt, regelen we direct een vervanger met dezelfde kwaliteit. Dit is onderdeel van onze 100% zekerheidsgarantie.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Kunnen we zelf een playlist aanleveren?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Ja! We vinden het fijn als je muziekwensen deelt. Je kunt een Spotify playlist aanleveren, favoriete nummers opgeven of juist aangeven wat je NIET wilt horen. Onze DJ mixt jouw wensen met zijn ervaring om de dansvloer vol te houden.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
