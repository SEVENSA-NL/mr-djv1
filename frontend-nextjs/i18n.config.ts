/**
 * i18n Configuration for Mr. DJ Frontend
 * Configures next-intl for multi-language support
 */

export const locales = ['nl', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'nl';

export const localeNames: Record<Locale, string> = {
  nl: 'Nederlands',
  en: 'English',
};

/**
 * Locale-specific metadata for routing and SEO
 */
export const localeMetadata: Record<
  Locale,
  {
    label: string;
    direction: 'ltr' | 'rtl';
    hreflang: string;
  }
> = {
  nl: {
    label: 'Nederlands',
    direction: 'ltr',
    hreflang: 'nl',
  },
  en: {
    label: 'English',
    direction: 'ltr',
    hreflang: 'en',
  },
};

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: unknown): locale is Locale {
  return typeof locale === 'string' && locales.includes(locale as Locale);
}

/**
 * Get the locale or default if invalid
 */
export function getLocaleOrDefault(locale: unknown): Locale {
  return isValidLocale(locale) ? locale : defaultLocale;
}
