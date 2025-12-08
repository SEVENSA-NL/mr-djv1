import type { Metadata } from 'next';
import { Sparkles, Music3, PartyPopper, CakeSlice } from 'lucide-react';
import VideoTestimonials from '@/components/sections/VideoTestimonials';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { createServiceStructuredData } from '@/lib/seo/structuredData';
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker';
import ParallaxHeroMedia from '@/components/sections/ParallaxHeroMedia';

export const metadata: Metadata = {
  title: 'Feest DJ - Professionele DJ voor elk feest | Mister DJ',
  description: 'Mister DJ verzorgt verjaardagen, jubilea, themafeesten en private parties. Met DJ, verlichting en 100% dansgarantie. Van 30 tot 300 gasten.',
  openGraph: {
    title: 'Feest DJ | Professionele DJ voor verjaardagen & private parties',
    description: 'DJ voor elk feest: verjaardagen, jubilea, themafeesten. Met DJ + Live Saxofoon optie. 100% volle dansvloer gegarandeerd.',
    images: ['/assets/marketing-images/partyDJ/partyDJ-01.webp'],
  },
};

export default function FeestDJPage({ params }: { params: { locale: string } }) {
  const isNL = params.locale === 'nl';
  const structuredData = createServiceStructuredData(
    isNL ? 'Feest DJ' : 'Party DJ',
    isNL
      ? 'Professionele DJ voor verjaardagen, jubilea, themafeesten en alle soorten private parties.'
      : 'Professional DJ for birthdays, anniversaries, themed nights and private parties.',
    params.locale
  );
  const faqItems = isNL
    ? [
        {
          question: 'Hoe snel horen we of jullie beschikbaar zijn?',
          answer: 'Binnen één werkdag. Bij populaire weekenddata sturen we meteen een alternatief mee.',
        },
        {
          question: 'Kunnen we een mix van genres en verzoeknummers doen?',
          answer:
            'Zeker. Must-plays en do-not-plays via intake en live verzoeken zolang het past bij de vibe.',
        },
        {
          question: 'Kunnen jullie sax of extra licht meenemen voor een thuisfeest?',
          answer:
            'Ja, sax als add-on en licht afgestemd op je ruimte zodat het stijlvol blijft, ook in woonwijken.',
        },
        {
          question: 'Hoe gaan jullie om met geluidslimieten of buren?',
          answer:
            'We stemmen volume en eindtijden af en kunnen limiter-friendly draaien voor gevoelige locaties.',
        },
        {
          question: 'Kunnen jullie ook een lounge set doen vooraf?',
          answer:
            'Ja, we starten relaxed voor borrel en bouwen op richting prime time. We wisselen vloeiend tussen zones.',
        },
        {
          question: 'Wat als het weer omslaat bij een buitenfeest?',
          answer:
            'We hebben een compacte opstelling die snel naar binnen kan en houden een backup-plan klaar.',
        },
        {
          question: 'Kunnen jullie MC’en of aankondigingen doen?',
          answer:
            'Ja, kort en functioneel. Voor speeches hebben we draadloze mics en stemmen we cues af.',
        },
      ]
    : [
        {
          question: 'How fast do we get availability?',
          answer: 'Within one business day. For busy weekends we also propose a backup option.',
        },
        {
          question: 'Can we mix genres and share requests?',
          answer:
            'Absolutely. Must-plays and do-not-plays via intake; live requests as long as they fit the vibe.',
        },
        {
          question: 'Can you add sax or extra lighting for a home party?',
          answer:
            'Yes. Sax add-on and lighting scaled to your space so it stays stylish, even in neighborhoods.',
        },
        {
          question: 'How do you manage volume limits or neighbors?',
          answer:
            'We align on volume/end times and can run limiter-friendly for sensitive venues.',
        },
        {
          question: 'Can you start with a lounge set?',
          answer:
            'Yes—chill for reception, building up to prime time, with smooth transitions across zones.',
        },
        {
          question: 'What if weather changes for an outdoor party?',
          answer:
            'We keep a compact rig ready to move indoors quickly and always have a backup plan.',
        },
        {
          question: 'Can you MC or handle announcements?',
          answer:
            'Yes—concise MC, with wireless mics for speeches and pre-agreed cues.',
        },
      ];

  return (
    <main className="bg-white">
      <ScrollDepthTracker page="feest-dj" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <ParallaxHeroMedia
          src="/assets/marketing-images/partyDJ/partyDJ-01.webp"
          alt="Energieke DJ op feest met dansende menigte"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-400">
              {isNL ? 'Private Party Entertainment' : 'Private Party Entertainment'}
            </p>
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {isNL ? 'Professionele Feest DJ' : 'Professional Party DJ'}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
              {isNL
                ? 'Maak je verjaardag, jubileum of themafeest onvergetelijk met de perfecte party vibe. Wij zorgen voor muziek, sfeer en een volle dansvloer.'
                : 'Make your birthday, anniversary or themed night unforgettable with the perfect party vibe. We keep the dance floor full.'}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs customLabels={{ 'feest-dj': 'Feest DJ' }} />
        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 card"><div className="mb-3 text-primary"><PartyPopper className="h-6 w-6" /></div><h2 className="mb-2 text-lg font-semibold text-slate-900">{isNL ? 'Voor elk feest' : 'For every party'}</h2><p className="text-sm text-slate-600">{isNL ? 'Verjaardagen, jubilea, afscheidsfeesten, themafeesten - wij creëren de perfecte party sfeer.' : 'Birthdays, anniversaries, farewell parties, themed nights—we create the perfect party vibe.'}</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 card"><div className="mb-3 text-primary"><Music3 className="h-6 w-6" /></div><h2 className="mb-2 text-lg font-semibold text-slate-900">{isNL ? 'Jouw muziekstijl' : 'Your music style'}</h2><p className="text-sm text-slate-600">{isNL ? 'Van 80s/90s tot Top 40, van house tot R&B - we draaien wat jij en je gasten willen horen.' : 'From 80s/90s to Top 40, house to R&B—we play exactly what you and your guests want.'}</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 card"><div className="mb-3 text-primary"><Sparkles className="h-6 w-6" /></div><h2 className="mb-2 text-lg font-semibold text-slate-900">100% Dansgarantie</h2><p className="text-sm text-slate-600">{isNL ? 'Volle dansvloer of je geld terug. In 500+ events hebben we deze belofte altijd waargemaakt.' : 'Packed dance floor or your money back. Proven across 500+ events.'}</p></div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            {isNL ? 'Voor welke feesten?' : 'For which parties?'}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-6 card"><div className="mb-3 text-primary"><CakeSlice className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-slate-900">Verjaardagen</h3><p className="text-sm text-slate-600">18, 30, 40, 50, 60+ - elk decennium verdient een onvergetelijk feest met de juiste muziek.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 card"><div className="mb-3 text-primary"><Sparkles className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-slate-900">Jubilea</h3><p className="text-sm text-slate-600">12,5 jaar getrouwd, 25 jaar in dienst - vier je mijlpaal met stijl en de beste muziek.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 card"><div className="mb-3 text-primary"><Sparkles className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-slate-900">Themafeesten</h3><p className="text-sm text-slate-600">80s/90s party, Summer festival, Ibiza night - wij passen muziek én verlichting aan op je thema.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 card"><div className="mb-3 text-primary"><PartyPopper className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-slate-900">Afscheidsfeesten</h3><p className="text-sm text-slate-600">Met pensioen, emigreren, nieuwe baan - vier je afscheid met een knallend feest.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 card"><div className="mb-3 text-primary"><Music3 className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-slate-900">Tuinfeesten & BBQ's</h3><p className="text-sm text-slate-600">Summer vibes in je eigen tuin. Van loungy middag tot uptempo avond.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 card"><div className="mb-3 text-primary"><Sparkles className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-slate-900">Gewoon... een feestje!</h3><p className="text-sm text-slate-600">Je hebt niet altijd een reden nodig. Zomaar een feestje met vrienden en goede muziek!</p></div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-0">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">
            {isNL ? 'FAQ voor party hosts' : 'FAQ for party hosts'}
          </h2>
          <p className="mb-8 text-center text-base text-slate-600">
            {isNL
              ? 'Beschikbaarheid, muziekkeuzes en hoe we thuis- of themaparties aankleden.'
              : 'Availability, music choices, and how we stage home or themed parties.'}
          </p>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {faqItems.map((item) => (
              <details key={item.question} className="p-6">
                <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <VideoTestimonials eventType="feest" />
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">Klaar voor een onvergetelijk feest?</h2>
          <p className="mb-8 text-lg text-amber-50">Ontvang binnen 24 uur een offerte op maat voor jouw feest. Vrijblijvend kennismaken en sparren over je wensen.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`/${params.locale}/pakketten`}
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
            >
              {isNL ? 'Bekijk feest pakketten' : 'See party packages'}
            </a>
            <WhatsAppButton
              variant="secondary"
              messageType="party"
              label={isNL ? 'Plan 10-min party check' : 'Plan 10-min party check'}
            />
            <a
              href={`/${params.locale}/contact`}
              className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-amber-600"
            >
              {isNL ? 'Vraag offerte aan' : 'Request a quote'}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
