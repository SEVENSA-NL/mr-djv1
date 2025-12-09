// src/components/sections/MrDjHero.tsx
//
// Homepage hero in brochurestijl.

import React from "react";
import { mrDjTheme } from "../../design/mr-dj-theme";

interface MrDjHeroProps {
  onCheckAvailabilityHref?: string;
  onIntroCallHref?: string;
}

export const MrDjHero: React.FC<MrDjHeroProps> = ({
  onCheckAvailabilityHref = "/nl/contact",
  onIntroCallHref = "/nl/contact",
}) => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: mrDjTheme.layout.sectionPaddingY.mobile,
        paddingBottom: mrDjTheme.layout.sectionPaddingY.mobile,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,200,76,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.16),_transparent_55%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-center md:px-6 md:py-6">
        <div className="md:w-1/2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
            Mister DJ · Event & Bruiloft DJ
          </p>
          <h1 className="mb-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
            Van zinderende bruiloften tot uitbundige bedrijfsfeesten –
            <span className="block text-yellow-300">
              altijd met 100% dansgarantie.
            </span>
          </h1>
          <p className="mb-6 max-w-md text-sm text-white/80 md:text-base">
            Mister DJ verzorgt al jaren feesten in Brabant en ver daarbuiten.
            Met professionele show, persoonlijk contact en – als jullie willen –
            live sax voor dat extra beetje magie.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={onCheckAvailabilityHref}
              className="inline-flex items-center rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-lg transition hover:bg-yellow-300"
            >
              Check beschikbaarheid
            </a>
            <a
              href={onIntroCallHref}
              className="inline-flex items-center rounded-full border border-white/40 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur transition hover:border-yellow-300 hover:text-yellow-200"
            >
              Plan kennismaking
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/70">
            <div>
              <span className="font-semibold text-yellow-300">2500+</span> feesten
            </div>
            <div>
              <span className="font-semibold text-yellow-300">15+</span> jaar ervaring
            </div>
            <div>
              <span className="font-semibold text-yellow-300">9,8</span> gemiddeld beoordeeld
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] border border-yellow-300/30 opacity-60 blur-[1px]" />
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/80 p-3 shadow-2xl">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[url('/images/mrdj-hero-placeholder.jpg')] bg-cover bg-center" />
              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-white/80">
                <div>
                  <div className="font-semibold uppercase tracking-[0.18em] text-white/60">
                    Live from the dancefloor
                  </div>
                  <div>Het hele feest in één woord: onvergetelijk.</div>
                </div>
                <div className="rounded-full bg-black/60 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-yellow-300">
                  100% dansgarantie
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
