"use client";

import React from "react";
import { useInView } from "@/src/hooks/useInView";
import { AnimatedCounter } from "@/src/components/ui/AnimatedCounter";
import { trackHubspotClick } from "@/src/utils/tracking";
import { ABTestVariant } from "@/src/components/ui/ABTestVariant";
import { companyStats as stats } from "@/src/data/company-stats";

interface MrDjHeroProps {
  onCheckAvailabilityHref?: string;
  onIntroCallHref?: string;
}

export const MrDjHero: React.FC<MrDjHeroProps> = ({
  onCheckAvailabilityHref = "/nl/contact",
  onIntroCallHref = "https://meetings.hubspot.com/info879",
}) => {
  const { ref, isInView } = useInView();

  return (
    <section className="relative overflow-hidden">
      {/* Video background (desktop only) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/mrdj-impressie-poster.jpg"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover hidden md:block motion-reduce:hidden"
      >
        <source src="/videos/mrdj-impressie.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-white/65 to-white/50 md:from-white/75 md:via-white/60 md:to-white/45" />

      {/* Background gradient (fallback + mobile) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(249,181,55,0.08),_transparent_50%),radial-gradient(ellipse_at_70%_80%,_rgba(59,130,246,0.05),_transparent_50%)]" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:py-32 transition-opacity ${
          isInView ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Trust line above heading */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="font-semibold text-gray-700">{stats.averageRating} gemiddeld</span>
          </span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>{stats.totalReviews}+ reviews</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>{stats.totalEvents}+ feesten</span>
        </div>

        {/* Main heading */}
        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-6xl xl:text-7xl">
          D&eacute; feestspecialist{" "}
          <span className="text-yellow-600">van het Zuiden</span>
        </h1>

        <p className="mb-8 max-w-xl text-base text-gray-600 md:text-lg lg:text-xl">
          Van zinderende bruiloften tot zakelijke borrels.
          Met {stats.yearsExperience}+ jaar ervaring en persoonlijke aandacht
          maken we van elk feest een onvergetelijke avond.
        </p>

        {/* CTA buttons */}
        <div className="mb-12 flex flex-wrap gap-3">
          <ABTestVariant
            experimentId="hero_cta_text"
            variants={{
              control: (
                <a href={onCheckAvailabilityHref} className="btn-primary text-sm px-7 py-3">
                  Check beschikbaarheid
                  <span className="ml-2 text-[0.6rem] font-normal normal-case tracking-normal opacity-70">&mdash; vrijblijvend</span>
                </a>
              ),
              variant_a: (
                <a href={onCheckAvailabilityHref} className="btn-primary text-sm px-7 py-3">
                  Vraag vrijblijvend aan
                  <span className="ml-2 text-[0.6rem] font-normal normal-case tracking-normal opacity-70">&mdash; gratis offerte</span>
                </a>
              ),
              variant_b: (
                <a href={onCheckAvailabilityHref} className="btn-primary text-sm px-7 py-3">
                  Plan jullie feest
                  <span className="ml-2 text-[0.6rem] font-normal normal-case tracking-normal opacity-70">&mdash; in 2 minuten</span>
                </a>
              ),
            }}
          />
          <a
            href={onIntroCallHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackHubspotClick}
            className="btn-secondary text-sm"
          >
            Plan een kennismaking
            <span className="sr-only"> (opent in nieuw venster)</span>
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-8 border-t border-gray-200 pt-8 md:gap-12">
          <div>
            <div className="text-3xl font-bold text-gray-900 md:text-4xl">
              <AnimatedCounter target={stats.totalEvents} suffix="+" />
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">Feesten</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 md:text-4xl">
              <AnimatedCounter target={stats.yearsExperience} suffix="+" />
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">Jaar ervaring</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600 md:text-4xl gold-glow">
              <AnimatedCounter target={stats.averageRating} decimal suffix="" />
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">Gemiddeld beoordeeld</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 md:text-4xl">100%</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">Dansgarantie</div>
          </div>
        </div>
      </div>
    </section>
  );
};
