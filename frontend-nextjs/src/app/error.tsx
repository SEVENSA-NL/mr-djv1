'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.ReactElement {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-neutral-light">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-semantic-error">500</h1>
        <p className="mt-4 text-2xl font-semibold text-neutral-dark">Er is iets misgegaan</p>
        <p className="mt-2 text-neutral-gray-500">
          {error.message || 'Een onverwachte fout is opgetreden. Probeer het opnieuw.'}
        </p>
        <button
          onClick={() => reset()}
          className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark"
        >
          Probeer opnieuw
        </button>
      </div>
    </div>
  );
}
