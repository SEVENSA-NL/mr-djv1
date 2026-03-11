"use client";

import React from "react";
import Image from "next/image";
import { useInView } from "@/src/hooks/useInView";
import { companyStats as stats } from "@/src/data/company-stats";

interface Stat {
  value: string;
  label: string;
}

const defaultStats: Stat[] = [
  { value: "100%", label: "Dans Garantie" },
  { value: `${stats.totalEvents}+`, label: "Succesvolle Feesten" },
  { value: `${stats.yearsExperience}+`, label: "Jaren Ervaring" },
  { value: "100%", label: "Tevredenheid" },
];

interface StatsStripProps {
  items?: Stat[];
}

export function StatsStrip({ items = defaultStats }: StatsStripProps) {
  const { ref, isInView } = useInView();

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <Image
        src="/images/gallery/bg-stats.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-[#111c30]/80" />
      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-6xl px-4 md:px-6 transition-opacity ${
          isInView ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-yellow-400 md:text-4xl lg:text-5xl gold-glow">
                {stat.value}
              </p>
              <p className="mt-1 font-script text-base text-gray-300 md:text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
