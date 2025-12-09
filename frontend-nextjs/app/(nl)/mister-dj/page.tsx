// Mister DJ – NL page skeleton
// Onderdeel van dev-kit Z05–Z06 (all-in-one met Z03–Z04).
// Gebruik dit als basis voor app/(nl)/.../page.tsx.
// Agent-taken:
// - imports aanpassen op jouw alias-structuur (@/ vs ../..)
// - content uit www.mr-dj.nl + brochures invullen
// - Z03-formulieren koppelen aan API/mail/CRM

"use client";

import React from "react";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";

const MisterDjPageSkeleton: React.FC = () => {
  return (
    <MrDjLayout>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
          Mister DJ
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
          Over Mister DJ – de DJ achter jullie feest.
        </h1>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-start">
          <div>
            <p className="mb-3 text-sm text-white/80 md:text-base">
              {/* TODO: Vul deze tekst met de biografie en werkwijze van Mister DJ zoals in de brochure/website. */}
              Hier vertel je wie je bent, wat je achtergrond is, hoe je als DJ werkt en waarom
              je juist zo goed aansluit bij bruiloften, bedrijfsfeesten en andere events.
            </p>
            <p className="mb-3 text-sm text-white/80 md:text-base">
              Denk aan onderwerpen als: ervaring, muziekstijlen, aanpak van de avond,
              samenwerking met locaties en leveranciers, en de reden dat zoveel klanten terugkomen.
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3">
              <div className="aspect-[4/5] w-full bg-[url('/images/mrdj-portrait-placeholder.jpg')] bg-cover bg-center" />
              <div className="mt-3 text-xs text-white/70">
                {/* TODO: Plaats hier een echte foto + korte quote van Mister DJ. */}
                "Het mooiste moment van de avond? Als ik zie dat echt álles en iedereen opgaat in de muziek."
              </div>
            </div>
          </div>
        </div>
      </section>
    </MrDjLayout>
  );
};

export default MisterDjPageSkeleton;
