// src/components/sections/MrDjGallery.tsx
//
// Eenvoudige impressie-grid. Foto's kunnen later gekoppeld worden aan echte assets.

import React from "react";
import { mrDjTheme } from "../../design/mr-dj-theme";

interface GalleryItem {
  src: string;
  alt: string;
  label?: string;
}

const defaultItems: GalleryItem[] = [
  {
    src: "/images/mrdj-gallery-1.jpg",
    alt: "Dansvloer vol tijdens bruiloft",
    label: "Bruiloft – volle dansvloer",
  },
  {
    src: "/images/mrdj-gallery-2.jpg",
    alt: "DJ booth met lichtshow",
    label: "Show & licht",
  },
  {
    src: "/images/mrdj-gallery-3.jpg",
    alt: "DJ en saxofonist samen op podium",
    label: "DJ + Sax",
  },
  {
    src: "/images/mrdj-gallery-4.jpg",
    alt: "Bedrijfsfeest met feestende collega’s",
    label: "Bedrijfsfeest",
  },
];

interface MrDjGalleryProps {
  items?: GalleryItem[];
}

export const MrDjGallery: React.FC<MrDjGalleryProps> = ({
  items = defaultItems,
}) => {
  return (
    <section
      style={{
        paddingTop: mrDjTheme.layout.sectionPaddingY.mobile,
        paddingBottom: mrDjTheme.layout.sectionPaddingY.mobile,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
              Impressies
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Een kleine greep uit de feesten.
            </h2>
          </div>
          <div className="hidden text-xs text-white/70 md:block">
            Meer foto’s en video’s? Neem gerust contact op, we denken mee.
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.src}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40"
            >
              <div
                className="aspect-[4/5] w-full bg-cover bg-center transition-transform group-hover:scale-105"
                style={{ backgroundImage: `url(${item.src})` }}
                aria-label={item.alt}
              />
              {item.label && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-xs text-white">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
