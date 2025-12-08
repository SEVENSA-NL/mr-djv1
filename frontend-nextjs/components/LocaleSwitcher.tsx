'use client';

import { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { locales, type Locale } from '@/i18n.config';

/**
 * LocaleSwitcher Component
 *
 * Provides UI for switching between supported languages.
 * Features:
 * - Persists the selected locale across navigation
 * - Maintains current page structure in the new locale
 * - Shows loading state during transition
 * - SEO-friendly locale switching
 */
export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('language');
  const [isPending, startTransition] = useTransition();

  /**
   * Handle locale change
   * Removes the current locale from the pathname and adds the new one
   */
  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(() => {
      // Remove the current locale from the pathname
      const segments = pathname.split('/');
      segments[1] = newLocale;

      // Navigate to the new locale
      router.push(segments.join('/'));
    });
  };

  return (
    <div className="locale-switcher">
      <label htmlFor="locale-select" className="locale-switcher__label">
        {t('label')}
      </label>

      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        disabled={isPending}
        className="locale-switcher__select"
        aria-label={t('label')}
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {t(`options.${l}`)}
          </option>
        ))}
      </select>

      {isPending && (
        <span className="locale-switcher__loading" aria-live="polite">
          Changing language...
        </span>
      )}
    </div>
  );
}

export default LocaleSwitcher;
