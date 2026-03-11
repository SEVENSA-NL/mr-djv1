"use client";

import React from "react";
import { useInView } from "@/src/hooks/useInView";
import { companyStats as stats } from "@/src/data/company-stats";

interface PlatformRating {
  platform: string;
  score: string;
  reviewCount: number;
  label: string;
  stars: number;
  href?: string;
}

const platforms: PlatformRating[] = [
  {
    platform: "ThePerfectWedding.nl",
    score: stats.platforms.tpw.score,
    reviewCount: stats.platforms.tpw.reviews,
    label: stats.platforms.tpw.label,
    stars: 5,
    href: "https://www.theperfectwedding.nl/bedrijven/26384/mr-dj",
  },
  {
    platform: "Google Reviews",
    score: stats.platforms.google.score,
    reviewCount: stats.platforms.google.reviews,
    label: stats.platforms.google.label,
    stars: 5,
  },
  {
    platform: "Facebook",
    score: stats.platforms.facebook.score,
    reviewCount: stats.platforms.facebook.reviews,
    label: stats.platforms.facebook.label,
    stars: 5,
  },
];

const StarRating: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }, (_, i) => (
      <span key={i} className="text-yellow-400 text-sm">&#9733;</span>
    ))}
  </div>
);

export const MrDjSocialProof: React.FC = () => {
  const { ref, isInView } = useInView();

  return (
    <section className="section-dark py-12 md:py-16">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 md:px-6 transition-opacity ${
          isInView ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <p className="mb-1 text-center font-script text-2xl text-yellow-400 md:text-3xl">
          Wat zeggen onze klanten?
        </p>
        <p className="mb-8 text-center text-sm text-gray-400">
          Aanbevolen door 99% van onze klanten · {stats.platforms.tpw.reviews + stats.platforms.google.reviews + stats.platforms.facebook.reviews} reviews
        </p>

        <div className="grid gap-4 sm:grid-cols-3 stagger-children">
          {platforms.map((item) => {
            const content = (
              <>
                <p className="mb-2 text-sm font-medium text-gray-400">
                  {item.platform}
                </p>
                <StarRating count={item.stars} />
                <p className="my-2 text-4xl font-bold text-white gold-glow">
                  {item.score}
                </p>
                <p className="text-sm text-gray-500">
                  {item.reviewCount} {item.label}
                </p>
              </>
            );

            if (item.href) {
              return (
                <a
                  key={item.platform}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition hover:bg-white/10"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={item.platform}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
