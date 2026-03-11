"use client";

import React from "react";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { MrDjTestimonials } from "@/src/components/sections/MrDjTestimonials";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import { sanitizeFormData } from "@/src/utils/sanitize";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { DarkCTA } from "@/src/components/sections/DarkCTA";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";
import type { EventType } from "@/src/data/event-types";

interface EventTypeContentProps {
  eventType: EventType;
}

export default function EventTypeContent({ eventType }: EventTypeContentProps) {
  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    const sanitized = sanitizeFormData(values as unknown as Record<string, unknown>) as unknown as AvailabilityRequest;
    if (process.env.NODE_ENV === "development") {
      console.log(`[${eventType.slug.toUpperCase()}] Availability request`, sanitized);
    }
  };

  return (
    <MrDjLayout>
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: `radial-gradient(ellipse at top, ${eventType.gradientTint}, transparent 50%)` }}
      />
      <Breadcrumbs />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <p className="section-label">{eventType.heroLabel}</p>
        <h1 className="section-heading mb-4">
          {eventType.heroHeading}
        </h1>
        <p className="max-w-2xl text-base text-gray-600 md:text-lg">
          {eventType.heroDescription}
        </p>
      </section>

      {/* USPs */}
      <section className="mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 md:text-2xl">
              Wat Mister DJ voor jullie {eventType.title.toLowerCase()} verzorgt
            </h2>
            <ul className="space-y-3">
              {eventType.usps.map((usp) => (
                <li key={usp} className="flex items-start gap-3 text-sm text-gray-700 md:text-base">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-[0.55rem] font-bold text-black">
                    &#10003;
                  </span>
                  {usp}
                </li>
              ))}
            </ul>
          </div>

          {/* Availability form */}
          <div className="card-elevated !p-6">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Check beschikbaarheid
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Vul het formulier in en ontvang een voorstel dat past bij jullie {eventType.title.toLowerCase()}.
            </p>
            <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {eventType.faqItems.length > 0 && (
        <section className="bg-mrdj-surface py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="mb-6 text-xl font-semibold text-gray-900 md:text-2xl">
              Veelgestelde vragen over {eventType.title.toLowerCase()}
            </h2>
            <div className="space-y-4">
              {eventType.faqItems.map((item) => (
                <details
                  key={item.question}
                  className="card-elevated group !p-0 cursor-pointer"
                >
                  <summary className="flex items-center justify-between p-5 text-sm font-semibold text-gray-900 md:text-base [&::-webkit-details-marker]:hidden list-none">
                    {item.question}
                    <span className="ml-4 text-yellow-600 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="border-t border-gray-100 px-5 pb-5 pt-3 text-sm text-gray-600">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <MrDjTestimonials maxItems={6} />

      <DarkCTA
        heading={`100% dansgarantie op jullie ${eventType.title.toLowerCase()}?`}
        subtext="Neem vrijblijvend contact op en we bespreken samen de mogelijkheden."
      />

      {/* Cross-links */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 md:text-2xl">Bekijk ook:</h2>
        <div className="grid gap-4 sm:grid-cols-3 stagger-children">
          {eventType.crossLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card-elevated !p-5 group"
            >
              <span className="block font-semibold text-yellow-600 mb-1 group-hover:text-yellow-700 transition-colors">
                {link.title}
              </span>
              <span className="text-sm text-gray-600">{link.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <MrDjContact>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </MrDjContact>
    </MrDjLayout>
  );
}
