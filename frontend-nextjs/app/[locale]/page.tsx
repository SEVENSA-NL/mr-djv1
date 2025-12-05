import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

/**
 * Home page for Mr. DJ
 * Demonstrates locale-specific routing and translations
 */
export default function HomePage() {
  const t = useTranslations();

  return (
    <main>
      <header>
        <LocaleSwitcher />
      </header>

      <section>
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
        <button>{t('hero.ctaPrimaryText')}</button>
      </section>
    </main>
  );
}
