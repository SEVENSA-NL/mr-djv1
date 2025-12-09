import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityPageClient from '@/components/city/CityPageClient';
import { cities } from '@/lib/cities';
import { locales } from '@/i18n.config';
import type { City } from '@/types/city';
import { cityContent } from '@/lib/cityContent';

type Props = {
  params: Promise<{ locale: string; city: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) => cities.map((city) => ({ locale, city: city.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city || !locales.includes(locale as (typeof locales)[number])) return {};

  const isNL = locale === 'nl';
  const baseTitle = isNL ? `DJ in ${city.name}` : `DJ in ${city.name}`;
  const description = isNL
    ? `Boek een premium DJ + sax in ${city.name}. Snelle beschikbaarheidscheck, venue-afstemming en 100% dansgarantie.`
    : `Book a premium DJ + sax in ${city.name} for weddings, corporate events, and private parties. Fast availability, venue coordination, and a packed dance floor.`;

  return {
    title: `${baseTitle} | Mister DJ`,
    description,
    alternates: {
      canonical: `/${locale}/${city.slug}`,
    },
    openGraph: {
      title: baseTitle,
      description,
      images: [cityContent[city.slug]?.heroImage || '/assets/marketing-images/weddingDJ/weddingDJ-01.jpg'],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { locale, city: citySlug } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  const city: City | undefined = cities.find((c) => c.slug === citySlug);
  if (!city) notFound();

  return <CityPageClient locale={locale} city={city} />;
}
