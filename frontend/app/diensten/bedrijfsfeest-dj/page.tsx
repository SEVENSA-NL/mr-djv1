import type { Metadata } from "next";
import PricingTables from "@/src/components/PricingTables";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import AvailabilityChecker from "@/components/booking/AvailabilityChecker";

export const metadata: Metadata = {
  title: "Bedrijfsfeest DJ - Professionele DJ voor corporate events",
  description:
    "Mister DJ verzorgt bedrijfsfeesten, teamuitjes en corporate events. Met DJ, verlichting, branding visuals en volledige ontzorging. Philips, ASML, VDL vertrouwen op ons.",
  openGraph: {
    title: "Bedrijfsfeest DJ | Professionele entertainment voor corporate events",
    description:
      "DJ + Entertainment voor bedrijfsfeesten. Van teamuitje tot gala. Inclusief branding, verlichting en volledige ontzorging. 15+ jaar corporate ervaring.",
  },
};

export default function BedrijfsfeestDJPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs
          customLabels={{
            "bedrijfsfeest-dj": "Bedrijfsfeest DJ"
          }}
        />
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-500">
            Corporate Entertainment
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Professionele Bedrijfsfeest DJ
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Maak je bedrijfsfeest of teamuitje onvergetelijk met professionele entertainment. Van netwerkborrel tot gala-avond - wij zorgen voor de perfecte sfeer en energie. Inclusief branding en volledige ontzorging.
          </p>
        </div>

        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">🏢</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Corporate ervaring</h2>
            <p className="text-sm text-slate-600">
              15+ jaar ervaring met bedrijfsfeesten voor Philips, ASML, VDL en honderden MKB bedrijven. We weten wat werkt.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">🎨</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Branding & Visuals</h2>
            <p className="text-sm text-slate-600">
              Projectie van je bedrijfslogo, huisstijlkleuren in de verlichting en visual content op maat voor echte merkbeleving.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">💼</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Professionele Afhandeling</h2>
            <p className="text-sm text-slate-600">
              Offerte, contract, factuur, BTW - alles zakelijk correct. We denken mee over planning en afstemming met je eventbureau.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Voor welke bedrijfsevents?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">🎉</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Teamuitjes & Personeelsfeesten</h3>
              <p className="text-sm text-slate-600">
                Zomer BBQ, kerstborrel, jubileumfeest - wij zorgen voor de muziek en sfeer die je team samenbrengt. Van loungy tot uptempo.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">🏆</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Gala's & Award Shows</h3>
              <p className="text-sm text-slate-600">
                Professionele muzikale begeleiding voor galadiner, prijsuitreikingen en netwerkevenementen. Inclusief walk-in muziek en afterparty.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">🚀</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Product Launches & Openings</h3>
              <p className="text-sm text-slate-600">
                Maak je product launch of opening onvergetelijk. Muziek, verlichting en visuals volledig afgestemd op je brand identity.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">🤝</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Relatie Events & Netwerkborrels</h3>
              <p className="text-sm text-slate-600">
                Sfeervolle achtergrondmuziek voor netwerkmoment, overgaand naar uptempo muziek voor het feestgedeelte.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingTables />

      <AvailabilityChecker defaultEventType="bedrijfsfeest" />

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Wat maakt ons anders bij corporate events?
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="text-3xl">✨</div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Professionele aanpak</h3>
                <p className="text-sm text-slate-600">
                  We begrijpen dat een bedrijfsfeest niet zomaar een feestje is. Het vertegenwoordigt je bedrijfscultuur en employer brand. We kleden ons professioneel, communiceren helder en leveren altijd wat we beloven.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Flexibel in programming</h3>
                <p className="text-sm text-slate-600">
                  Van loungy achtergrondmuziek tijdens netwerken tot upbeat party tracks - we voelen perfect aan wanneer de energie omhoog kan. We luisteren naar de eventmanager en passen ons aan het programma aan.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="text-3xl">🎨</div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Branding & Maatwerk</h3>
                <p className="text-sm text-slate-600">
                  We kunnen je bedrijfslogo projecteren, verlichting in huisstijlkleuren instellen en zelfs custom intro's maken voor belangrijke momenten (directeur-speech, awards). Jouw event, jouw identiteit.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="text-3xl">💼</div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Zakelijk correct</h3>
                <p className="text-sm text-slate-600">
                  Offerte met BTW, contract, factuur na afloop - alles correct voor je administratie. We werken samen met eventbureaus en locaties en denken proactief mee over planning en logistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Bedrijven die ons vertrouwen
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
              <p className="mb-3 text-xl font-semibold text-amber-400">Philips</p>
              <p className="text-sm text-slate-300">
                Personeelsfeesten en product launches met tot 500+ medewerkers. Volledige audio-visuele productie.
              </p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
              <p className="mb-3 text-xl font-semibold text-amber-400">ASML</p>
              <p className="text-sm text-slate-300">
                Teamuitjes en netwerkevents. Professionele begeleiding van borrel tot party.
              </p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
              <p className="mb-3 text-xl font-semibold text-amber-400">VDL Groep</p>
              <p className="text-sm text-slate-300">
                Jubileumfeesten en gala-avonden met volledige technische ondersteuning en branding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">Klaar voor een geslaagd bedrijfsfeest?</h2>
          <p className="mb-8 text-lg text-amber-50">
            Ontvang binnen 24 uur een offerte op maat voor je corporate event. Inclusief branding, planning en technische specificaties.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/pakketten"
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
            >
              Bekijk corporate pakketten
            </a>
            <WhatsAppButton
              variant="secondary"
              messageType="corporate"
              label="Chat via WhatsApp"
            />
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-amber-600"
            >
              Vraag zakelijke offerte
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Veelgestelde vragen over bedrijfsfeest DJ's
          </h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Kunnen jullie een offerte maken met BTW-specificatie?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Ja, alle offertes en facturen zijn BTW-compliant en zakelijk correct. We leveren een gedetailleerde offerte met BTW-uitsplitsing, contractvoorwaarden en betalingstermijnen.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Hoe werkt de samenwerking met eventbureaus?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                We werken regelmatig samen met eventbureaus en locaties. We zorgen voor proactieve communicatie, technische riders, en zijn flexibel met planning en last-minute aanpassingen. Het team weet dat ze op ons kunnen rekenen.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Kunnen jullie branding/logo's in de show verwerken?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Absoluut! We kunnen je bedrijfslogo projecteren, verlichting in huisstijlkleuren instellen, en visual content op maat maken. Lever je logo aan (SVG/PNG) en we zorgen voor integratie in de show.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Wat als het event eerder/later eindigt dan gepland?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                We zijn flexibel! Als het programma uitloopt, overleggen we ter plekke over verlenging (€150/uur). Als het eerder stopt, geen probleem - we passen ons aan. Zakelijke flexibiliteit staat voorop.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
