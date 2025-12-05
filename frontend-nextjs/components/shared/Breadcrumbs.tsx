'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbsProps {
  customLabels?: Record<string, string>;
}

export default function Breadcrumbs({ customLabels = {} }: BreadcrumbsProps) {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(nl|en)/, '');
  const segments = pathWithoutLocale.split('/').filter(Boolean);

  const defaultLabels: Record<string, string> = {
    diensten: 'Diensten',
    pakketten: 'Pakketten',
    steden: 'Steden',
    contact: 'Contact',
    'bruiloft-dj': 'Bruiloft DJ',
    'bedrijfsfeest-dj': 'Bedrijfsfeest DJ',
    'feest-dj': 'Feest DJ',
    ...customLabels,
  };

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <li>
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          const label =
            defaultLabels[segment] ||
            segment.charAt(0).toUpperCase() +
              segment.slice(1).replace(/-/g, ' ');

          return (
            <li key={href} className="flex items-center gap-2">
              <span className="text-slate-400">/</span>
              {isLast ? (
                <span className="font-medium text-slate-900">{label}</span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-amber-600 transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

