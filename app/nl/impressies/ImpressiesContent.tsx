"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import { sanitizeFormData } from "@/src/utils/sanitize";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { GalleryLightbox } from "@/src/components/ui/GalleryLightbox";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";

type GalleryCategory = "alles" | "bruiloften" | "bedrijfsfeesten" | "overig";

interface GalleryItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  category: GalleryCategory;
}

const galleryImages: GalleryItem[] = [
  { type: "image", src: "/images/gallery/gallery-01.jpg", alt: "Mister DJ - DJ booth met professionele lichtshow", category: "bruiloften" },
  { type: "image", src: "/images/gallery/gallery-02.jpg", alt: "Mister DJ - dansende gasten op bruiloft", category: "bruiloften" },
  { type: "image", src: "/images/gallery/gallery-03.jpg", alt: "Mister DJ - sfeervolle verlichting op feest", category: "overig" },
  { type: "image", src: "/images/gallery/gallery-04.jpg", alt: "Mister DJ - saxofonist op de dansvloer", category: "bruiloften" },
  { type: "image", src: "/images/gallery/gallery-05.jpg", alt: "Mister DJ - volle dansvloer tijdens bedrijfsfeest", category: "bedrijfsfeesten" },
  { type: "video", src: "/videos/mrdj-impressie.mp4", poster: "/videos/mrdj-impressie-poster.jpg", alt: "Mister DJ - sfeerimpressie video", category: "overig" },
  { type: "image", src: "/images/gallery/gallery-06.jpg", alt: "Mister DJ - lichteffecten en rookmachine", category: "overig" },
  { type: "image", src: "/images/gallery/gallery-07.jpg", alt: "Mister DJ - bruidspaar op de dansvloer", category: "bruiloften" },
  { type: "image", src: "/images/gallery/gallery-08.jpg", alt: "Mister DJ - DJ aan het werk achter de draaitafel", category: "bedrijfsfeesten" },
  { type: "image", src: "/images/gallery/gallery-09.jpg", alt: "Mister DJ - feestende gasten met confetti", category: "overig" },
  { type: "image", src: "/images/gallery/gallery-10.jpg", alt: "Mister DJ - special FX met CO2 en vlammen", category: "bedrijfsfeesten" },
  { type: "image", src: "/images/gallery/gallery-14.jpg", alt: "Mister DJ - romantische verlichting ceremonie", category: "bruiloften" },
  { type: "image", src: "/images/gallery/gallery-15.jpg", alt: "Mister DJ - energieke dansvloer met lichtshow", category: "overig" },
  { type: "image", src: "/images/gallery/gallery-16.jpg", alt: "Mister DJ - DJ booth close-up met LED verlichting", category: "bedrijfsfeesten" },
  { type: "image", src: "/images/gallery/gallery-17.jpg", alt: "Mister DJ - gasten genieten van live saxofoon", category: "bruiloften" },
  { type: "image", src: "/images/gallery/gallery-18.jpg", alt: "Mister DJ - feestelijke aankleding met sfeerverlichting", category: "bruiloften" },
];

const filterOptions: { value: GalleryCategory; label: string }[] = [
  { value: "alles", label: "Alles" },
  { value: "bruiloften", label: "Bruiloften" },
  { value: "bedrijfsfeesten", label: "Bedrijfsfeesten" },
  { value: "overig", label: "Overig" },
];

export default function ImpressiesContent() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("alles");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    const sanitized = sanitizeFormData(
      values as unknown as Record<string, unknown>,
    ) as unknown as AvailabilityRequest;
    if (process.env.NODE_ENV === "development") {
      console.log("[IMPRESSIES] Availability request", sanitized);
    }
  };

  const filteredImages = useMemo(
    () =>
      activeFilter === "alles"
        ? galleryImages
        : galleryImages.filter((img) => img.category === activeFilter),
    [activeFilter]
  );

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <MrDjLayout>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.06),_transparent_50%)]" />
      <Breadcrumbs />
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">Impressies</p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Een sfeerimpressie van feesten met Mister DJ.
        </h1>
        <p className="max-w-2xl text-sm text-gray-700 md:text-base">
          Hieronder zie je een selectie van foto&apos;s en momenten. In de praktijk stemmen we de show
          uiteraard altijd af op jullie locatie, gasten en wensen.
        </p>
      </section>

      {/* Filter buttons */}
      <section className="mx-auto max-w-6xl px-4 pb-4 md:px-6">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setActiveFilter(option.value);
                setLightboxIndex(null);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                activeFilter === option.value
                  ? "bg-yellow-400 text-black"
                  : "border border-gray-300 bg-gray-50 text-gray-600 hover:border-yellow-500/50 hover:text-yellow-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6 md:pb-20">
        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
          {filteredImages.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="mb-3 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 break-inside-avoid cursor-pointer text-left block relative"
              aria-label={`Bekijk ${item.alt}`}
            >
              {item.type === "video" ? (
                <>
                  <video
                    src={item.src}
                    poster={item.poster}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><polygon points="6,3 18,10 6,17" /></svg>
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={400}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                  loading={i < 4 ? "eager" : "lazy"}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-center md:px-6 md:py-12">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 md:text-2xl">
          Zin gekregen? Neem contact op!
        </h2>
        <p className="mb-5 text-sm text-gray-700 md:text-base">
          Wij zorgen ervoor dat jullie feest er net zo spectaculair uitziet. Check direct
          de beschikbaarheid of vraag een vrijblijvende offerte aan.
        </p>
        <Link
          href="/nl/contact"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
        >
          Check beschikbaarheid
        </Link>
      </section>

      {/* Bekijk ook */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Bekijk ook:</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/nl/bruiloften" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Bruiloften</span>
            De complete bruiloftshow met persoonlijk contact en muziek op maat.
          </Link>
          <Link href="/nl/verhuur" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Verhuur</span>
            Professionele licht- en geluidsapparatuur huren in Brabant.
          </Link>
          <Link href="/nl/contact" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Contact</span>
            Neem vrijblijvend contact op of check direct de beschikbaarheid.
          </Link>
        </div>
      </section>

      {/* Contact form */}
      <MrDjContact>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </MrDjContact>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </MrDjLayout>
  );
}
