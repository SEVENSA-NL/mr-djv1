'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, RefreshCw } from 'lucide-react';
import CitySectionNav from '@/components/city/CitySectionNav';
import CityContact from '@/components/city/CityContact';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import type { City } from '@/types/city';
import { cityContent } from '@/lib/cityContent';

type CityPageClientProps = {
  locale: string;
  city: City;
};

export default function CityPageClient({ locale, city }: CityPageClientProps) {
  const isNL = locale === 'nl';
  const content = cityContent[city.slug] || cityContent.eindhoven;
  const sectionNav = [
    { id: 'city-overview', label: isNL ? 'Wat we doen' : 'Overview' },
    { id: 'city-venues', label: isNL ? 'Favoriete venues' : 'Venues' },
    { id: 'city-perks', label: isNL ? 'Waarom boeken' : 'Why book us' },
    { id: 'city-faq', label: 'FAQ' },
    { id: 'city-contact', label: isNL ? 'Contact' : 'Contact' },
  ];

  return (
    <main className="bg-white">
      <ScrollDepthTracker page={`city-${city.slug}`} />
      <section className="relative h-[55vh] min-h-[480px] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.03, y: 8 }}
          animate={{ scale: 1.0, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <Image
            src={content.heroImage}
            alt={`DJ in ${city.name}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={90}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 pt-16 text-center text-white sm:pt-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-300">
              {isNL ? `DJ in ${city.name}` : `DJ in ${city.name}`}
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {isNL ? `Premium DJ + Sax voor ${city.name}` : `Premium DJ + Sax for ${city.name}`}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
              {isNL
                ? 'Snelle beschikbaarheidscheck, venue-afstemming en een volle dansvloer—van borrel tot afterparty.'
                : 'Fast availability check, venue coordination, and a packed dance floor—from reception to afterparty, for weddings, corporate events, and private parties.'}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                prefetch={false}
                href={`/${locale}/beschikbaarheid`}
                className="inline-flex items-center rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-amber-900 shadow-md transition hover:bg-amber-300"
              >
                {isNL ? 'Check beschikbaarheid' : 'Check availability'}
              </Link>
              <WhatsAppButton
                variant="secondary"
                messageType="general"
                label={isNL ? 'Plan 10-min call' : 'Book a 10-min call'}
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/80">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20">
                <MapPin className="h-4 w-4" />
                {isNL ? 'Lokale crew Brabant' : 'Local crew Brabant'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20">
                <RefreshCw className="h-4 w-4" />
                {isNL ? 'Wekelijks geüpdatet' : 'Updated weekly'}
              </span>
            </div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: isNL ? 'Home' : 'Home',
                item: `/${locale}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: isNL ? 'Steden' : 'Cities',
                item: `/${locale}/steden`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: city.name,
                item: `/${locale}/${city.slug}`,
              },
            ],
          }),
        }}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 lg:px-0">
        <Breadcrumbs />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div
              id="city-overview"
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-slate-900">
                {isNL ? `Wat we doen in ${city.name}` : `What we do in ${city.name}`}
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                {isNL
                  ? 'Van bruiloft tot bedrijfsfeest: we stemmen muziek, licht en visuals af op jullie venue in Brabant. DJ + live sax als upgrade voor maximaal effect.'
                  : 'From weddings to corporate events: we tune music, lighting, and visuals to your Brabant venue. DJ + live sax as an upgrade for maximum impact.'}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {content.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-white p-4 text-sm font-semibold text-slate-800 shadow-xs ring-1 ring-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              id="city-venues"
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900">
                {isNL ? 'Favoriete venues' : 'Favorite venues'}
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                {isNL
                  ? 'We kennen de crews, load-ins en geluidslimieten. Dat scheelt tijd op je eventdag.'
                  : 'We know the crews, load-ins, and sound limits. That saves time on your event day.'}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {content.venues.map((venue) => (
                  <li
                    key={venue}
                    className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-800 ring-1 ring-slate-200"
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    {venue}
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="city-perks"
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900">
                {isNL ? 'Waarom teams en bruidsparen boeken' : 'Why teams and couples book us'}
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {content.perks.map((perk) => (
                  <div
                    key={perk}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800"
                  >
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            <div
              id="city-faq"
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900">
                {isNL ? 'FAQ voor steden & planners' : 'FAQ for cities & planners'}
              </h3>
              <div className="mt-4 space-y-4 divide-y divide-slate-200">
                {(isNL
                  ? [
                      [
                        'Hoe snel horen we of onze stad beschikbaar is?',
                        'Binnen één werkdag. Populaire data krijgen direct een backup-optie.',
                      ],
                      [
                        'Komen jullie in contact met onze locatie?',
                        'Ja, we delen tech rider, load-in en checken geluidslimieten.',
                      ],
                      [
                        'Kunnen we lokale voorkeuren doorgeven?',
                        'Ja, we verwerken muziekvoorkeuren en schakelen met vaste AV/leveranciers.',
                      ],
                      [
                        'Is er een lokale crew beschikbaar?',
                        'Ja, in Brabant werken we met lokale DJ’s/techs voor snelle opbouw.',
                      ],
                      [
                        'Hoe vaak vernieuwen jullie city content?',
                        'Wekelijks, met nieuwe venues, foto’s en referenties.',
                      ],
                      [
                        'Kunnen jullie meerdere locaties op een dag doen?',
                        'Ja, met een tweede crew/compacte set voor ceremonie of borrel.',
                      ],
                    ]
                  : [
                      [
                        'How fast do we get city availability?',
                        'Within one business day; hot dates include a backup option.',
                      ],
                      [
                        'Will you coordinate with our venue?',
                        'Yes—tech rider, load-in timing, and sound limits aligned.',
                      ],
                      [
                        'Can we share local preferences?',
                        'Absolutely—music must-haves and preferred AV vendors.',
                      ],
                      [
                        'Do you have local crews?',
                        'Yes, local DJs/techs in Brabant for faster load-ins.',
                      ],
                      [
                        'How fresh is the city content?',
                        'Updated weekly with new venues, photos, and references.',
                      ],
                      [
                        'Can you support multiple spots in one day?',
                        'Yes, with a second crew/compact setup for ceremonies or cocktails.',
                      ],
                    ]).map(([q, a]) => (
                  <details key={q} className="py-3">
                    <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                      {q}
                    </summary>
                    <p className="mt-2 text-sm text-slate-700">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <CitySectionNav sections={sectionNav} />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-amber-900">
                {isNL ? 'Snelle intake voor Brabant' : 'Fast intake for Brabant'}
              </h3>
              <p className="mt-2 text-sm text-amber-800">
                {isNL
                  ? 'Binnen 24 uur reactie. We sturen direct opties voor DJ + sax en afgestemde lichtset.'
                  : 'Response within 24 hours. We share DJ + sax options and a right-sized lighting setup.'}
              </p>
              <div className="mt-4 space-y-3">
                <Link
                  prefetch={false}
                  href={`/${locale}/pakketten`}
                  className="block rounded-lg bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-amber-900 shadow hover:bg-amber-400"
                >
                  {isNL ? 'Bekijk pakketten' : 'See packages'}
                </Link>
                <Link
                  prefetch={false}
                  href={`/${locale}/diensten`}
                  className="block rounded-lg border border-amber-300 px-4 py-3 text-center text-sm font-semibold text-amber-900 hover:border-amber-400"
                >
                  {isNL ? 'Naar diensten' : 'View services'}
                </Link>
              </div>
            </div>

            <div id="city-contact" className="scroll-mt-24">
              <CityContact city={city} locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

