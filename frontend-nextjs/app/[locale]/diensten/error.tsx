'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function DienstenError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ locale?: string }>();
  const locale = (params?.locale as string) || 'nl';

  useEffect(() => {
    console.error('Diensten page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Er ging iets mis</h1>
          <p className="text-lg text-slate-600 mb-8">
            We konden de pagina niet laden. Probeer het opnieuw of ga terug naar de homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-amber-500"
          >
            Probeer opnieuw
          </button>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 bg-transparent px-6 py-3 text-base font-semibold text-slate-900 transition-all hover:bg-slate-50"
          >
            Ga naar homepage
          </Link>
        </div>

        <div className="mt-8 text-sm text-slate-500">
          <p>
            Of neem contact op via{' '}
            <a href={`/${locale}/contact`} className="text-amber-600 hover:underline">
              ons contactformulier
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
