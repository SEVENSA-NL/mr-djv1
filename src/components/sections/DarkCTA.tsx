"use client";

import React from "react";
import Image from "next/image";
import { useInView } from "@/src/hooks/useInView";

interface DarkCTAProps {
  heading?: string;
  subtext?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export const DarkCTA: React.FC<DarkCTAProps> = ({
  heading = "Klaar om jullie feest te plannen?",
  subtext = "Neem vrijblijvend contact op en we maken er samen een onvergetelijk feest van.",
  primaryHref = "/nl/contact",
  primaryLabel = "Check beschikbaarheid",
  secondaryHref = "tel:+31408422594",
  secondaryLabel = "Bel 040-8422594",
}) => {
  const { ref, isInView } = useInView();

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <Image
        src="/images/gallery/bg-cta.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#111c30]/90 via-[#1a2744]/85 to-[#111c30]/90" />
      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-3xl px-4 text-center md:px-6 transition-opacity ${
          isInView ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <p className="mb-2 font-script text-2xl text-yellow-400 md:text-3xl">Mister DJ</p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <p className="mb-8 text-base text-gray-400 md:text-lg">
          {subtext}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={primaryHref} className="btn-primary">
            {primaryLabel}
          </a>
          <a href={secondaryHref} className="btn-outline-white">
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
};
