import { useTranslations } from 'next-intl';

type Persona = {
  name: string;
  need: string;
  win: string;
};

type Props = {
  translationKey: string;
};

export default function ServicePersonaStrip({ translationKey }: Props) {
  const t = useTranslations(translationKey);
  const personas = (t.raw('personas') as Persona[]) || [];
  if (!personas.length) return null;

  return (
    <section className="mt-8 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
      <div className="grid gap-4 md:grid-cols-3">
        {personas.map((p) => (
          <div key={p.name} className="rounded-xl bg-neutral-dark/50 p-4 ring-1 ring-white/10">
            <p className="text-xs uppercase tracking-[0.16em] text-secondary">{p.name}</p>
            <p className="mt-1 text-sm font-semibold text-neutral-light">{p.need}</p>
            <p className="mt-1 text-xs text-neutral-gray-200">{p.win}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
