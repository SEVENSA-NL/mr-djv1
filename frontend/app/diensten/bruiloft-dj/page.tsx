import type { Metadata } from "next";
import PricingTables from "@/src/components/PricingTables";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Bruiloft DJ - Professionele DJ voor je trouwfeest",
  description:
    "Mister DJ maakt je bruiloft onvergetelijk. Van ceremonie tot late-night party met DJ + Live Saxofoon. 15+ jaar ervaring, 300+ bruidsparen geholpen. Vraag offerte.",
  openGraph: {
    title: "Bruiloft DJ | Professionele DJ voor je trouwfeest",
    description:
      "DJ + Live Saxofoon voor je bruiloft. Van eerste dans tot afterparty. 100% dansgarantie, 15+ jaar ervaring. Favoriete keuze van 300+ bruidsparen.",
  },
};

export default function BruiloftDJPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs
          customLabels={{
            "bruiloft-dj": "Bruiloft DJ"
          }}
        />
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-500">
            Bruiloft Entertainment
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Professionele Bruiloft DJ
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Maak je trouwdag onvergetelijk met de perfecte soundtrack. Van ceremonie tot late-night afterparty - wij zorgen voor muziek, sfeer en een volle dansvloer. DJ + Live Saxofoon optioneel.
          </p>
        </div>

        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">💒</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Ceremonie Muziek</h2>
            <p className="text-sm text-slate-600">
              Professionele audio voor je ceremonie. Van binnenkomst tot eerste dans - wij zorgen voor de perfecte muzikale begeleiding.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">🎷</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">DJ + Live Saxofoon</h2>
            <p className="text-sm text-slate-600">
              Het verschil tussen leuk en legendarisch. Live saxofonist speelt mee tijdens je eerste dans en party highlights.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">💯</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">100% Dansgarantie</h2>
            <p className="text-sm text-slate-600">
              Volle dansvloer of je geld terug. In 300+ bruiloften hebben we deze belofte altijd waargemaakt.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Hoe verloopt een bruiloft met Mister DJ?
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
                1
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Persoonlijk intakegesprek</h3>
                <p className="text-sm text-slate-600">
                  We plannen een videocall of ontmoeting om je wensen te bespreken. Wat is jullie muziekstijl? Zijn er speciale nummers? Wat is de sfeer die je wilt creëren? We luisteren naar jullie verhaal.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
                2
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Planning & Afstemming met locatie</h3>
                <p className="text-sm text-slate-600">
                  We nemen contact op met jullie trouwlocatie voor de technische planning. Opbouwtijden, stroomvoorziening, ruimte-indeling - alles wordt vooraf geregeld zodat jullie je nergens zorgen over hoeven te maken.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
                3
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">De grote dag - Ceremonie tot afterparty</h3>
                <p className="text-sm text-slate-600">
                  We zijn er ruim voor aanvang om alles op te bouwen. Van ceremoniemuziek tot borrel-achtergrondmuziek, van first dance tot late-night party - wij zorgen voor de perfecte soundtrack van jullie dag. Met backup apparatuur voor 100% zekerheid.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
                4
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Nabespreking & Feedback</h3>
                <p className="text-sm text-slate-600">
                  Na jullie bruiloft ontvangen we graag feedback. Wat vonden jullie en de gasten van de muziek? Dit helpt ons om nóg beter te worden. Veel bruidsparen bevelen ons aan bij vrienden!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingTables />

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Wat zeggen bruidsparen over ons?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="mb-3 text-amber-500">⭐⭐⭐⭐⭐</div>
              <p className="mb-4 text-sm text-slate-600">
                "De DJ voelde perfect aan wat de gasten wilden horen. De dansvloer was vanaf het eerste nummer tot het einde bomvol. Onze gasten praten er nóg over!"
              </p>
              <p className="text-xs font-medium text-slate-900">- Lisa & Tom, Bruiloft Eindhoven 2024</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="mb-3 text-amber-500">⭐⭐⭐⭐⭐</div>
              <p className="mb-4 text-sm text-slate-600">
                "De live saxofonist tijdens onze eerste dans was echt het hoogtepunt van de avond. Kippenvel moment! Iedereen was onder de indruk."
              </p>
              <p className="text-xs font-medium text-slate-900">- Sarah & Mark, Bruiloft Tilburg 2023</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="mb-3 text-amber-500">⭐⭐⭐⭐⭐</div>
              <p className="mb-4 text-sm text-slate-600">
                "Super professioneel en volledig ontzorgd. Van ceremonie tot afterparty alles geregeld. Wij konden gewoon genieten van onze dag!"
              </p>
              <p className="text-xs font-medium text-slate-900">- Emma & David, Bruiloft 's-Hertogenbosch 2024</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">Klaar om je bruiloft onvergetelijk te maken?</h2>
          <p className="mb-8 text-lg text-amber-50">
            Ontvang binnen 24 uur een offerte op maat voor jullie trouwdag. Vrijblijvend kennismaken en sparren over jullie wensen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/pakketten"
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
            >
              Bekijk bruiloft pakketten
            </a>
            <WhatsAppButton
              variant="secondary"
              messageType="wedding"
              label="Chat via WhatsApp"
            />
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-amber-600"
            >
              Vraag offerte aan
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Veelgestelde vragen over bruiloft DJ's
          </h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Hoever van tevoren moeten we een bruiloft DJ boeken?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                We adviseren 6-12 maanden van tevoren, vooral voor populaire datums (zaterdag in het hoogseizoen mei-september). Maar neem gerust contact op - soms hebben we ook last-minute beschikbaarheid!
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Kunnen we zelf onze muziekwensen doorgeven?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Absoluut! We vinden het juist fijn als jullie muziekwensen delen. Spotify playlists, must-play nummers, do-not-play lijsten - het helpt ons om jullie perfecte dag te creëren. Onze DJ mixt jullie wensen met zijn ervaring.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Wat kost de live saxofonist erbij?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                De live saxofonist kan bij pakket Brons en Zilver worden toegevoegd voor €400 extra. Bij pakket Goud (Premium All-Inclusive) is deze al inbegrepen! Perfect voor jullie eerste dans en party highlights.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Kunnen jullie ook de ceremonie muzikaal begeleiden?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Ja! Vanaf pakket Zilver (of optioneel bij Brons) verzorgen we ook de ceremoniemuziek. Van jullie binnenkomst tot de handtekeningen - wij zorgen voor de perfecte muzikale begeleiding op het juiste volume.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Wat als de DJ ziek wordt op onze trouwdag?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                We hebben een netwerk van ervaren backup DJ's. In het onverhoopte geval dat je DJ ziek wordt, regelen we direct een vervanger met dezelfde kwaliteit. Dit is onderdeel van onze 100% zekerheidsgarantie - jullie trouwdag gaat altijd door!
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
