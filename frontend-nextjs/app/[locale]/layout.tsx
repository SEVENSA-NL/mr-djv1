import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { locales, defaultLocale, localeMetadata } from '@/i18n.config';

/**
 * Generate static parameters for all supported locales
 * This enables static generation for locale-specific pages
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Generate metadata for locale-specific layouts
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  const messages: any = await getMessages();
  const title = messages.app?.title || 'Mr. DJ';
  const description = messages.app?.subtitle || 'DJ + Sax that packs your dance floor';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: locales.reduce(
        (acc, l) => ({
          ...acc,
          [localeMetadata[l].hreflang]: `/${l}`,
        }),
        {}
      ),
    },
    openGraph: {
      title,
      description,
      locale: locale,
      alternateLocale: locales.filter((l) => l !== locale),
    },
  };
}

/**
 * Locale-specific root layout
 * Wraps all pages with the i18n provider and locale-specific context
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  return (
    <html
      lang={locale || defaultLocale}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
