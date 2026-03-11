import Link from "next/link";

const suggestions = [
  { href: "/nl/bruiloften", label: "Bruiloften", desc: "DJ voor jullie trouwdag" },
  { href: "/nl/bedrijfsfeesten", label: "Bedrijfsfeesten", desc: "Zakelijke events" },
  { href: "/nl/verhuur", label: "Verhuur", desc: "Licht & geluid huren" },
  { href: "/nl/impressies", label: "Impressies", desc: "Sfeerbeelden" },
];

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      style={{
        background: "radial-gradient(circle at top, #1f2937 0%, #050509 55%)",
        color: "#F9FAFB",
        fontFamily:
          "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div className="mb-6 text-7xl font-bold text-yellow-400 md:text-9xl">
        404
      </div>
      <h1 className="mb-3 text-xl font-semibold text-white md:text-2xl">
        Oeps! Deze pagina is even pauze aan het houden
      </h1>
      <p className="mb-8 max-w-md text-sm text-gray-400 md:text-base">
        De pagina die je zoekt bestaat niet (meer) of is verplaatst. Geen
        zorgen, de muziek speelt gewoon door!
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/nl"
          className="inline-flex min-h-[44px] items-center rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-lg transition hover:bg-yellow-300"
        >
          Terug naar Home
        </Link>
        <Link
          href="/nl/contact"
          className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:border-yellow-500 hover:text-yellow-400"
        >
          Contact
        </Link>
        <Link
          href="/nl/veelgestelde-vragen"
          className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:border-yellow-500 hover:text-yellow-400"
        >
          FAQ
        </Link>
      </div>

      {/* Page suggestions */}
      <div className="mt-12 grid w-full max-w-lg gap-3 sm:grid-cols-2">
        {suggestions.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur transition hover:border-yellow-500/30 hover:bg-white/10"
          >
            <span className="block text-sm font-semibold text-yellow-400">{s.label}</span>
            <span className="text-xs text-gray-400">{s.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
