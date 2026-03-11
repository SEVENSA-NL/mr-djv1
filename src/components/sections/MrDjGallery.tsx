"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { useInView } from "@/src/hooks/useInView";
import { GalleryLightbox } from "@/src/components/ui/GalleryLightbox";

interface GalleryItem {
  src: string;
  alt: string;
  type?: "image" | "video";
  poster?: string;
}

const defaultItems: GalleryItem[] = [
  { src: "/images/gallery/gallery-33.jpg", alt: "Mister DJ drive-in show met sparkulars en lichtshow" },
  { src: "/images/gallery/gallery-01.jpg", alt: "Mister DJ sfeerbeeld - DJ booth op bruiloft" },
  { src: "/images/gallery/gallery-19.jpg", alt: "Bruidspaar dansend op feest met Mister DJ" },
  { src: "/images/gallery/gallery-02.jpg", alt: "Mister DJ sfeerbeeld - dansende gasten" },
  { src: "/images/gallery/gallery-24.jpg", alt: "Mister DJ lasershow met dansende gasten" },
  { src: "/images/gallery/gallery-03.jpg", alt: "Mister DJ sfeerbeeld - lichtshow op de dansvloer" },
  { src: "/images/gallery/gallery-20.jpg", alt: "Openingsdans bruidspaar met Mister DJ booth" },
  { src: "/images/gallery/gallery-04.jpg", alt: "Mister DJ sfeerbeeld - bruiloft feestzaal" },
  { src: "/images/gallery/gallery-22.jpg", alt: "Mister DJ setup met saxofonist en dansende gasten" },
  { src: "/images/gallery/gallery-05.jpg", alt: "Mister DJ sfeerbeeld - DJ aan het werk" },
  { src: "/images/gallery/gallery-30.jpg", alt: "Confetti shot op feest met Mister DJ" },
  { src: "/images/gallery/gallery-06.jpg", alt: "Mister DJ sfeerbeeld - sfeerverlichting" },
  { src: "/images/gallery/gallery-26.jpg", alt: "Mister DJ booth met sparkulars vuurwerk" },
  { src: "/images/gallery/gallery-07.jpg", alt: "Mister DJ sfeerbeeld - volle dansvloer" },
  { src: "/images/gallery/gallery-23.jpg", alt: "Live muzikanten gitarist en zanger bij Mister DJ" },
  { src: "/images/gallery/gallery-08.jpg", alt: "Mister DJ sfeerbeeld - bedrijfsfeest" },
  { src: "/images/gallery/gallery-25.jpg", alt: "Mister DJ booth setup met LED zuilen" },
  { src: "/images/gallery/gallery-09.jpg", alt: "Mister DJ sfeerbeeld - DJ booth met lichtshow" },
  { src: "/images/gallery/gallery-29.jpg", alt: "Volle dansvloer op feest met Mister DJ" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Mister DJ sfeerbeeld - feestende gasten" },
  { src: "/images/gallery/gallery-28.jpg", alt: "Mister DJ booth in feestlocatie met LED verlichting" },
  { src: "/images/gallery/gallery-14.jpg", alt: "Mister DJ sfeerbeeld - feestlocatie aankleding" },
  { src: "/images/gallery/gallery-21.jpg", alt: "Bruidspaar feest met sterrenhemel achtergrond" },
  { src: "/images/gallery/gallery-15.jpg", alt: "Mister DJ sfeerbeeld - DJ en publiek" },
  { src: "/images/gallery/gallery-27.jpg", alt: "LED dansvloer close-up bij Mister DJ" },
  { src: "/images/gallery/gallery-16.jpg", alt: "Mister DJ sfeerbeeld - lichteffecten" },
  { src: "/images/gallery/gallery-31.jpg", alt: "Mister DJ photobooth unit" },
  { src: "/images/gallery/gallery-17.jpg", alt: "Mister DJ sfeerbeeld - gezellige sfeer" },
  { src: "/images/gallery/gallery-32.jpg", alt: "Gasten met props bij Mister DJ photobooth" },
  { src: "/images/gallery/gallery-18.jpg", alt: "Mister DJ sfeerbeeld - dansende bruidspaar" },
];

interface MrDjGalleryProps {
  items?: GalleryItem[];
}

export const MrDjGallery: React.FC<MrDjGalleryProps> = ({
  items = defaultItems,
}) => {
  const { ref, isInView } = useInView();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? items.length - 1 : prev - 1
    );
  }, [items.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === items.length - 1 ? 0 : prev + 1
    );
  }, [items.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  if (items.length === 0) return <EmptyState message="Binnenkort meer impressies..." />;

  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div ref={ref} className={`mx-auto max-w-6xl px-4 md:px-6 transition-opacity ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 font-script text-2xl text-yellow-600 md:text-3xl">
              Impressies
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
              Een kleine greep uit de feesten.
            </h2>
          </div>
          <div className="hidden text-xs text-gray-600 md:block">
            Meer foto&apos;s en video&apos;s? Neem gerust contact op, we denken graag met je mee.
          </div>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 cursor-pointer text-left"
              aria-label={`Bekijk ${item.alt}`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.src}
                      poster={item.poster}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><polygon points="6,3 18,10 6,17" /></svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={items}
          currentIndex={lightboxIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
};
