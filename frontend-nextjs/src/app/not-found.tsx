import Link from 'next/link';

export default function NotFound(): React.ReactElement {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-neutral-light">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-2xl font-semibold text-neutral-dark">Pagina niet gevonden</p>
        <p className="mt-2 text-neutral-gray-500">Sorry, de pagina die je zoekt bestaat niet.</p>
        <Link href="/" className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark">
          Terug naar home
        </Link>
      </div>
    </div>
  );
}
