import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './i18n.config';

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale = (await requestLocale) || defaultLocale;

  return {
    // Supported locales and default locale for middleware + routing
    locales,
    defaultLocale,
    localePrefix: 'always',
    locale: resolvedLocale,
    // Load locale-specific message bundles for server rendering
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});
