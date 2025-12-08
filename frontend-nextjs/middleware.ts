import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

/**
 * Middleware for handling locale detection and routing
 *
 * Features:
 * - Detects locale from URL, headers, and cookies
 * - Redirects to appropriate locale if missing
 * - Sets locale cookie for persistent user preference
 * - Handles SEO-friendly locale prefixes
 */
export default createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale: defaultLocale,

  // Locale detection strategy
  localePrefix: 'always', // Always include locale in URL (e.g., /nl/diensten, /en/services)

  // Enable locale cookie for persistent user preference
  localeDetection: true,
});

/**
 * Configure which paths should be processed by the middleware
 * Exclude static files, API routes, and other non-page resources
 */
export const config = {
  matcher: [
    // Match all paths except:
    // - _next (Next.js internals)
    // - api (health + backend routes should bypass locale handling)
    // - .*\\.svg$ (SVG files)
    // - .*\\.png$ (PNG files)
    // - .*\\.jpg$ (JPG files)
    // - .*\\.jpeg$ (JPEG files)
    // - .*\\.ico$ (ICO files)
    // - .*\\.gif$ (GIF files)
    // - .*\\.webp$ (WebP files)
    // - .*\\.woff$ (WOFF fonts)
    // - .*\\.woff2$ (WOFF2 fonts)
    '/((?!_next|api|.*\\.(?:svg|png|jpg|jpeg|ico|gif|webp|woff|woff2)$).*)',
  ],
};
