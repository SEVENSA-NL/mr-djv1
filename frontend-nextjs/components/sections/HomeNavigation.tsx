import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Button from '@/components/shared/Button';

export default function HomeNavigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (path: string) => pathname?.startsWith(path);
  const linkClass = (path: string) =>
    [
      'group relative inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold transition-colors duration-200',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary/70',
      isActive(path) ? 'text-primary' : 'text-neutral-gray-100 hover:text-primary',
    ].join(' ');

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-neutral-dark/90 text-neutral-light shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} prefetch={false} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-lg font-black text-primary ring-1 ring-primary/30">
            DJ
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              {t('brandTag')}
            </div>
            <div className="text-base font-semibold">{t('brand')}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-gray-100 md:flex">
          <Link
            href={`/${locale}/diensten`}
            prefetch={false}
            className={linkClass(`/${locale}/diensten`)}
            aria-current={isActive(`/${locale}/diensten`) ? 'page' : undefined}
          >
            <span>{t('links.services')}</span>
            <span
              className={`absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary transition duration-300 ease-out ${
                isActive(`/${locale}/diensten`)
                  ? 'scale-x-100 opacity-100'
                  : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
              }`}
            />
          </Link>
          <Link
            href={`/${locale}/pakketten`}
            prefetch={false}
            className={linkClass(`/${locale}/pakketten`)}
            aria-current={isActive(`/${locale}/pakketten`) ? 'page' : undefined}
          >
            <span>{t('links.packages')}</span>
            <span
              className={`absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary transition duration-300 ease-out ${
                isActive(`/${locale}/pakketten`)
                  ? 'scale-x-100 opacity-100'
                  : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
              }`}
            />
          </Link>
          <Link
            href={`/${locale}/steden`}
            prefetch={false}
            className={linkClass(`/${locale}/steden`)}
            aria-current={isActive(`/${locale}/steden`) ? 'page' : undefined}
          >
            <span>{t('links.cities')}</span>
            <span
              className={`absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary transition duration-300 ease-out ${
                isActive(`/${locale}/steden`)
                  ? 'scale-x-100 opacity-100'
                  : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
              }`}
            />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href={`/${locale}/pakketten`} className="hidden sm:block">
            <Button size="sm" variant="secondary">
              {t('links.cta')}
            </Button>
          </Link>
          <WhatsAppButton
            variant="primary"
            messageType="general"
            label={t('links.whatsapp')}
            className="hidden sm:inline-flex"
          />
        </div>
      </div>
    </header>
  );
}
