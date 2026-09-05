import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Metadata } from 'next';
import { cities, getCitiesByProvince, getCitiesByRegion } from '../../../lib/cities';

interface CitiesOverviewProps {
  params: {
    locale: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: CitiesOverviewProps): Promise<Metadata> {
  const isNL = params.locale === 'nl';
  const title = isNL
    ? 'DJ per Plaats | Mister DJ'
    : 'DJ by Location | Mister DJ';
  const description = isNL
    ? 'Professionele DJ diensten voor bruiloften, bedrijfsfeesten en events. Bekijk lokale informatie voor uw event.'
    : 'Professional DJ services for weddings, corporate events and parties. Explore local information for your event.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://mr-dj.sevensa.nl/${params.locale}/steden`,
    },
  };
}

export default function CitiesOverview({ params }: CitiesOverviewProps) {
  const isNL = params.locale === 'nl';
  const faqItems = isNL
    ? [
        {
          question: 'Hoe bespreken we een event in onze stad?',
          answer:
            'Deel je datum, locatie en wensen. In een persoonlijk gesprek bespreken we wat past bij jullie event.',
        },
        {
          question: 'Komen jullie in contact met onze locatie?',
          answer:
            'Ja. We delen tech rider, stemmen load-in tijden en checken geluidslimieten zodat alles soepel loopt.',
        },
        {
          question: 'Kunnen we lokale voorkeuren doorgeven (muziek, leveranciers)?',
          answer:
            'Zeker. We verwerken lokale muziekvoorkeuren en schakelen graag met vaste leveranciers voor licht/AV.',
        },
      ]
    : [
        {
          question: 'How do we discuss an event in our city?',
          answer:
            'Share your date, venue and wishes. In a personal conversation, we discuss what fits your event.',
        },
        {
          question: 'Will you coordinate with our venue?',
          answer:
            'Yes. We share the tech rider, align on load-in timing, and respect sound limits for a smooth event.',
        },
        {
          question: 'Can we share local preferences (music, vendors)?',
          answer:
            'Absolutely. We include your music must-haves and will coordinate with preferred lighting/AV vendors.',
        },
      ];

  // Group cities by region
  const regions = [
    { key: 'north', name: isNL ? 'Noord' : 'North' },
    { key: 'east', name: isNL ? 'Oost' : 'East' },
    { key: 'west', name: isNL ? 'West' : 'West' },
    { key: 'south', name: isNL ? 'Zuid' : 'South' },
    { key: 'middle', name: isNL ? 'Midden' : 'Middle' },
  ] as const;

  // Get unique provinces
  const provinces = Array.from(new Set(cities.map(city => city.province))).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isNL ? 'DJ per Plaats' : 'DJ by Location'}
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              {isNL
                ? 'Selecteer uw stad voor lokale informatie, venues en prijzen.'
                : 'Select your city for local information, venues and prices.'}
            </p>
            <div className="w-full max-w-md rounded-lg bg-white/10 p-6 backdrop-blur-sm sm:inline-block sm:w-auto sm:max-w-none">
              <div className="flex flex-col items-center justify-center gap-6 text-center sm:flex-row sm:gap-8">
                <div className="min-w-0">
                  <div className="text-3xl font-bold">{cities.length}</div>
                  <div className="text-purple-200">
                    {isNL ? 'Plaatsen met lokale informatie' : 'Places with local information'}
                  </div>
                </div>
                <div className="hidden h-12 w-px bg-white/20 sm:block" />
                <div className="min-w-0">
                  <div className="text-3xl font-bold">{provinces.length}</div>
                  <div className="text-purple-200">
                    {isNL ? 'Provincies in selectie' : 'Provinces in selection'}
                  </div>
                </div>
                <div className="hidden h-12 w-px bg-white/20 sm:block" />
                <div className="min-w-0">
                  <div className="text-3xl font-bold">{isNL ? 'Maatwerk' : 'Tailored'}</div>
                  <div className="text-purple-200">
                    {isNL ? 'Voorstel per event' : 'Proposal per event'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities by Region */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center space-y-2">
            <p className="eyebrow text-primary inline-flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" /> {isNL ? 'Lokale crew & snel schakelen' : 'Local crews & fast coordination'}
            </p>
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              {isNL ? 'Steden per Regio' : 'Cities by Region'}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {regions.map((region) => {
              const regionCities = getCitiesByRegion(region.key);
              return (
                <div key={region.key} className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-purple-900 mb-6 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold mr-3">
                      {regionCities.length}
                    </span>
                    {region.name} Nederland
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {regionCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/${params.locale}/${city.slug}`}
                        className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors text-gray-800 hover:text-purple-900 font-medium"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities by Province */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {isNL ? 'Steden per Provincie' : 'Cities by Province'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {provinces.map((province) => {
              const provinceCities = getCitiesByProvince(province);
              return (
                <div
                  key={province}
                  className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-purple-200">
                    {province}
                  </h3>
                  <ul className="space-y-2">
                    {provinceCities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/${params.locale}/${city.slug}`}
                          className="text-gray-700 hover:text-purple-600 transition-colors flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          DJ {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Persona-aligned FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
            {isNL ? 'FAQ voor steden & planners' : 'FAQ for cities & planners'}
          </h2>
          <p className="mb-8 text-center text-base text-gray-700">
            {isNL
              ? 'Snel duidelijkheid over beschikbaarheid, locatie-afstemming en lokale voorkeuren.'
              : 'Fast clarity on availability, venue coordination, and local preferences.'}
          </p>
          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm">
            {faqItems.map((item) => (
              <details key={item.question} className="p-6">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isNL
              ? 'Staat Uw Plaats Er Niet Bij?'
              : "Can't Find Your Location?"}
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            {isNL
              ? 'Neem contact op om je locatie, datum en wensen te bespreken.'
              : 'Contact us to discuss your venue, date and wishes.'}
          </p>
          <Link
            href={`/${params.locale}/contact`}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isNL ? 'Bespreek je locatie' : 'Discuss your location'}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
