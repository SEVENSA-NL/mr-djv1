// src/components/layout/MrDjLayout.tsx
//
// Basislayout voor Mister DJ in brochurestijl.
//
import React from "react";
import Link from "next/link";
import { mrDjTheme } from "../../design/mr-dj-theme";

interface MrDjLayoutProps {
  children: React.ReactNode;
}

const navItems: { href: string; label: string }[] = [
  { href: "/nl", label: "Home" },
  { href: "/nl/bruiloften", label: "Bruiloften" },
  { href: "/nl/bedrijfsfeesten", label: "Bedrijfsfeesten" },
  { href: "/nl/feesten-overig", label: "Overige feesten" },
  { href: "/nl/impressies", label: "Impressies" },
  { href: "/nl/mister-dj", label: "Mister DJ" },
  { href: "/nl/veelgestelde-vragen", label: "FAQ" },
  { href: "/nl/contact", label: "Contact" },
];

export const MrDjLayout: React.FC<MrDjLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(circle at top, #1f2937 0, ${mrDjTheme.colors.background} 55%)`,
        color: mrDjTheme.colors.textPrimary,
        fontFamily: mrDjTheme.typography.fontSans,
      }}
      className="flex min-h-screen flex-col"
    >
      <header className="border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg">
              <span className="text-xs font-bold tracking-wide">DJ</span>
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                Mister DJ
              </div>
              <div className="text-sm text-white/80">
                100% dansgarantie voor jullie feest
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.18em] text-white/70 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-yellow-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/nl/contact"
              className="inline-flex items-center rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black shadow-lg transition hover:bg-yellow-300"
            >
              Check beschikbaarheid
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 md:hidden"
            aria-label="Open navigatie"
          >
            <span className="h-0.5 w-4 bg-white" />
          </button>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-white/10 bg-black/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <div className="font-semibold uppercase tracking-[0.18em] text-white/70">
              Mister DJ
            </div>
            <div>Bruiloften · Bedrijfsfeesten · Feesten & events</div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:info@mr-dj.nl"
              className="transition-colors hover:text-yellow-300"
            >
              info@mr-dj.nl
            </a>
            <span className="text-white/30">•</span>
            <a
              href="tel:+31600000000"
              className="transition-colors hover:text-yellow-300"
            >
              +31 (0)6 – 00 00 00 00
            </a>
            <span className="text-white/30">•</span>
            <span>Regio Brabant & omstreken</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
