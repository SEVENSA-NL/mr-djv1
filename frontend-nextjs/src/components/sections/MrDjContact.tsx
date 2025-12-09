// src/components/sections/MrDjContact.tsx
//
// Contactsectie met een placeholder voor het availability-formulier (Z03).

import React from "react";
import { mrDjTheme } from "../../design/mr-dj-theme";

interface MrDjContactProps {
  children?: React.ReactNode; // hier kan AvailabilityForm in geplaatst worden
}

export const MrDjContact: React.FC<MrDjContactProps> = ({ children }) => {
  return (
    <section
      style={{
        paddingTop: mrDjTheme.layout.sectionPaddingY.mobile,
        paddingBottom: mrDjTheme.layout.sectionPaddingY.mobile,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
              Contact
            </p>
            <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
              Vertel kort iets over jullie plannen – we denken graag mee.
            </h2>
            <p className="mb-4 text-sm text-white/75 md:text-base">
              Vul het formulier hiernaast in om te checken of Mister DJ nog beschikbaar is
              op jullie datum. Je ontvangt zo snel mogelijk een reactie met een voorstel
              dat past bij jullie feest.
            </p>
            <div className="space-y-2 text-sm text-white/75">
              <div>
                <span className="font-semibold text-white">E-mail: </span>
                <a
                  href="mailto:info@mr-dj.nl"
                  className="text-yellow-300 underline-offset-2 hover:underline"
                >
                  info@mr-dj.nl
                </a>
              </div>
              <div>
                <span className="font-semibold text-white">Telefoon: </span>
                <a
                  href="tel:+31600000000"
                  className="text-yellow-300 underline-offset-2 hover:underline"
                >
                  +31 (0)6 – 00 00 00 00
                </a>
              </div>
              <div>
                Regio Brabant & omstreken · samenwerking met diverse trouw- en feestlocaties.
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl">
              {children ? (
                children
              ) : (
                <div className="text-xs text-white/70">
                  {/*
                    Hier kan de AvailabilityForm uit Z03 worden geplaatst, bijv.:

                    <AvailabilityForm
                      onSubmit={async (values) => { ... }}
                    />

                    De agent kan dit later automatisch koppelen.
                  */}
                  Formulier-placeholder – koppel hier de AvailabilityForm uit Z03.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
