import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomeFooter() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-white/5 bg-neutral-dark px-6 py-10 text-neutral-gray-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-secondary">{t('eyebrow')}</p>
          <h3 className="text-lg font-semibold text-neutral-light">{t('title')}</h3>
          <p className="text-sm text-neutral-gray-300">{t('subtitle')}</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="https://wa.me/31612345678" className="hover:text-primary">
            {t('cta')}
          </Link>
          <span className="text-neutral-gray-500">•</span>
          <Link href="mailto:hello@mrdj.sevensa.nl" className="hover:text-primary">
            {t('email')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
