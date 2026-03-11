"use client";

import React from "react";
import { useVisitorProfile } from "@/src/hooks/useVisitorProfile";
import { trackEvent } from "@/src/utils/tracking";

/**
 * Smart CTA that personalizes messaging based on visitor behavior.
 *
 * - First visit: generic "Check beschikbaarheid"
 * - Returning with bruiloft interest: "Plan jullie bruiloft-DJ"
 * - Returning with bedrijfsfeest interest: "Offerte voor bedrijfsevent"
 * - High engagement (3+ pages): shows urgency
 */
export const SmartCTA: React.FC<{ className?: string }> = ({ className }) => {
  const profile = useVisitorProfile();

  let text = "Check beschikbaarheid";
  let subtext = "vrijblijvend";
  let href = "/nl/contact";

  if (profile?.isReturning) {
    switch (profile.primaryInterest) {
      case "bruiloft":
        text = "Plan jullie bruiloft-DJ";
        subtext = "persoonlijk advies";
        href = "/nl/bruiloften#mr-dj-contact";
        break;
      case "bedrijfsfeest":
        text = "Offerte bedrijfsevent";
        subtext = "binnen 24 uur";
        href = "/nl/bedrijfsfeesten#mr-dj-contact";
        break;
      case "feest":
        text = "Boek voor jullie feest";
        subtext = "vrijblijvend";
        break;
    }

    // High engagement: add urgency
    if (profile.pagesViewed.length >= 3) {
      subtext = "nog 3 data beschikbaar in " + getNextMonth();
    }
  }

  const handleClick = () => {
    trackEvent("smart_cta_click", {
      variant: profile?.primaryInterest || "unknown",
      is_returning: String(!!profile?.isReturning),
      visit_count: String(profile?.visitCount || 0),
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center min-h-[44px] rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-lg transition hover:bg-yellow-300 ${className || ""}`}
    >
      {text}
      <span className="ml-1 text-[0.6rem] font-normal normal-case tracking-normal opacity-70">
        - {subtext}
      </span>
    </a>
  );
};

function getNextMonth(): string {
  const months = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
  ];
  const next = new Date();
  next.setMonth(next.getMonth() + 1);
  return months[next.getMonth()];
}
