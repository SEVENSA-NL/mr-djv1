export const locales = ['nl', 'en'];
export const defaultLocale = 'nl';

export const localeNames = {
  nl: 'Nederlands',
  en: 'English',
};

export const localeMetadata = {
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

export function isValidLocale(locale) {
  return typeof locale === 'string' && locales.includes(locale);
}

export function getLocaleOrDefault(locale) {
  return isValidLocale(locale) ? locale : defaultLocale;
}
