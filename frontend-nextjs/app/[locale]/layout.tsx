import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, defaultLocale, localeMetadata } from '@/i18n.config';
import { Space_Grotesk } from 'next/font/google';
import { Inter, Playfair_Display } from 'next/font/google';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mr-dj.sevensa.nl';

export const dynamic = 'force-dynamic';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-playfair',
});

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

  const messages = (await getMessages()) as { app?: { title?: string; subtitle?: string } };
  const title = messages.app?.title || 'Mr. DJ';
  const description = messages.app?.subtitle || 'DJ + Sax that packs your dance floor';

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
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
  const messages = await getMessages();

  // Validate locale
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  return (
    <html
      lang={locale || defaultLocale}
      suppressHydrationWarning
    >
      <body className={`${spaceGrotesk.className} ${inter.variable} ${playfair.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
