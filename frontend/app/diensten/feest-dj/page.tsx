import type { Metadata } from "next";
import Image from "next/image";
import PricingTables from "@/src/components/PricingTables";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import AvailabilityChecker from "@/components/booking/AvailabilityChecker";
import VideoTestimonial from "@/components/video/VideoTestimonial";
import { partyTestimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Feest DJ - Professionele DJ voor elk feest",
  description:
    "Mister DJ verzorgt verjaardagen, jubilea, themafeesten en private parties. Met DJ, verlichting en 100% dansgarantie. Van 30 tot 300 gasten.",
  openGraph: {
    title: "Feest DJ | Professionele DJ voor verjaardagen & private parties",
    description:
      "DJ voor elk feest: verjaardagen, jubilea, themafeesten. Met DJ + Live Saxofoon optie. 100% volle dansvloer gegarandeerd. 15+ jaar ervaring.",
  },
};

export default function FeestDJPage() {
  return (
    <main className="bg-white">
      {/* Hero Image Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="/assets/marketing-images/partyDJ/partyDJ-01.webp"
          alt="Energieke DJ op feest met dansende menigte"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-400">
              Private Party Entertainment
            </p>
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Professionele Feest DJ
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
              Maak je verjaardag, jubileum of themafeest onvergetelijk met de perfecte party vibe. Wij zorgen voor muziek, sfeer en een volle dansvloer.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs
          customLabels={{
            "feest-dj": "Feest DJ"
          }}
        />

        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">🎉</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Voor elk feest</h2>
            <p className="text-sm text-slate-600">
              Verjaardagen, jubilea, afscheidsfeesten, themafeesten - wij creëren de perfecte party sfeer voor elke gelegenheid.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">🎶</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Jouw muziekstijl</h2>
            <p className="text-sm text-slate-600">
              Van 80s/90s tot Top 40, van house tot R&B, van Latin tot Nederlands - we draaien wat jij en je gasten willen horen.
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

      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Voor welke feesten?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">🎂</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Verjaardagen</h3>
              <p className="text-sm text-slate-600">
                18, 30, 40, 50, 60+ - elk decennium verdient een onvergetelijk feest met de juiste muziek en sfeer.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">🏆</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Jubilea</h3>
              <p className="text-sm text-slate-600">
                12,5 jaar getrouwd, 25 jaar in dienst, 10 jaar bedrijf - vier je mijlpaal met stijl en de beste muziek.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">🎭</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Themafeesten</h3>
              <p className="text-sm text-slate-600">
                80s/90s party, Summer festival, Ibiza night, Foute party - wij passen muziek én verlichting aan op je thema.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">👋</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Afscheidsfeesten</h3>
              <p className="text-sm text-slate-600">
                Met pensioen, emigreren, nieuwe baan - vier je afscheid met een knallend feest dat niemand vergeet.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">🌴</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Tuinfeesten & BBQ's</h3>
              <p className="text-sm text-slate-600">
                Summer vibes in je eigen tuin. Van loungy middag tot uptempo avond - wij zorgen voor de perfecte soundtrack.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">🎊</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Gewoon... een feestje!</h3>
              <p className="text-sm text-slate-600">
                Je hebt niet altijd een reden nodig. Zomaar een feestje met vrienden, familie en goede muziek!
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingTables />

      <AvailabilityChecker defaultEventType="feest" />

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Hoe werkt het?
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
                1
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Vertel ons over je feest</h3>
                <p className="text-sm text-slate-600">
                  Via contact, WhatsApp of telefoon bespreken we wat voor feest je wilt. Hoeveel gasten? Welke leeftijden? Wat voor muziekstijl? Binnen of buiten? We luisteren naar je wensen.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
                2
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Offerte op maat</h3>
                <p className="text-sm text-slate-600">
                  Binnen 24 uur ontvang je een offerte die past bij je wensen en budget. We adviseren welk pakket het beste past (Brons, Zilver of Goud) en of extra opties zinvol zijn.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
                3
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Muziekwensen doorgeven</h3>
                <p className="text-sm text-slate-600">
                  Je krijgt een formulier om je muziekwensen door te geven. Spotify playlists, favoriete nummers, must-haves én do-not-plays - alles kan. Zo weten we precies wat jij wilt horen.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
                4
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Party time!</h3>
                <p className="text-sm text-slate-600">
                  We komen ruim voor aanvang om alles op te bouwen. Dan is het feest: van de eerste track tot de laatste encore - wij zorgen voor een volle dansvloer en onvergetelijke avond. Jij hoeft alleen maar te genieten!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonial testimonials={partyTestimonials} showControls={true} />

      {/* Image Gallery Section */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-0">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Onze feesten in beeld
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Van verjaardagen tot themafeesten - bekijk hoe wij jullie feest onvergetelijk maken
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/assets/marketing-images/partyDJ/partyDJ-02.webp"
                alt="Verjaardagsfeest met DJ setup en ballondecoraties"
                fill
                className="object-cover transition duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="group relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/assets/marketing-images/partyDJ/partyDJ-03.webp"
                alt="DJ op outdoor festival bij zonsondergang"
                fill
                className="object-cover transition duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="group relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/assets/marketing-images/partyDJ/partyDJ-04.webp"
                alt="House party met DJ en kleurrijke LED verlichting"
                fill
                className="object-cover transition duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="group relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/assets/marketing-images/partyDJ/partyDJ-06.webp"
                alt="Jubileumfeest met DJ en dansende gasten"
                fill
                className="object-cover transition duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="group relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/assets/marketing-images/partyDJ/partyDJ-08.webp"
                alt="Pool party DJ setup met zomerse sfeer"
                fill
                className="object-cover transition duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="group relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/assets/marketing-images/partyDJ/partyDJ-10.webp"
                alt="Rooftop party met DJ en skyline achtergrond"
                fill
                className="object-cover transition duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">Klaar voor een onvergetelijk feest?</h2>
          <p className="mb-8 text-lg text-amber-50">
            Ontvang binnen 24 uur een offerte op maat voor jouw feest. Vrijblijvend kennismaken en sparren over je wensen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/pakketten"
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
            >
              Bekijk feest pakketten
            </a>
            <WhatsAppButton
              variant="secondary"
              messageType="party"
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
            Veelgestelde vragen over feest DJ's
          </h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Wat kost een DJ voor mijn feest?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Onze pakketten starten vanaf €495 voor 4 uur (pakket Brons). Voor de meeste private feesten adviseren we pakket Zilver (6 uur, lichtshow, €795). Bekijk alle prijzen op de <a href="/pakketten" className="text-amber-600 underline">pakketten pagina</a>.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Hoeveel ruimte heeft een DJ nodig?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Voor een basis setup (pakket Brons) hebben we ongeveer 2x2 meter nodig. Met lichtshow (pakket Zilver/Goud) liefst 3x2 meter. We stemmen altijd af met je locatie om de beste plek te bepalen.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Kunnen jullie ook buiten draaien (tuinfeest)?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Ja! We doen regelmatig tuinfeesten en outdoor events. Belangrijkste vereisten: toegang tot 220V stroompunt, afdak/overkapping bij regen (voor apparatuur), en voldoende ruimte voor de setup.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Hoe ver van tevoren moeten we boeken?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Voor weekend-datums (vrijdag/zaterdag) adviseren we 2-3 maanden van tevoren. Voor doordeweekse feesten kan het vaak ook korter. Check gerust onze beschikbaarheid - soms hebben we last-minute slots!
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Wat als we toch moeten annuleren?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Bij annulering meer dan 2 maanden van tevoren: volledige restitutie minus €50 administratiekosten. Binnen 2 maanden: 50% restitutie. Binnen 2 weken: geen restitutie (datum is dan geblokkeerd). We begrijpen dat dingen kunnen gebeuren en denken graag mee!
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
