/**
 * Example usage of HeroSection component in Next.js
 * This file demonstrates various ways to use the HeroSection component
 */

import { HeroSection } from "./HeroSection";

// Example 1: Basic hero section with solid background
export function BasicHeroExample() {
  return (
    <HeroSection
      title="Boek de ultieme bruiloft DJ"
      subtitle="Laat uw gasten genieten van een onvergetelijke avond vol energie, live sax en een feest dat nog lang zal nazinderen."
      ctaPrimaryText="Bekijk beschikbaarheid"
      ctaSecondaryText="Vraag offerte aan"
    />
  );
}

// Example 2: Hero section with background image
export function HeroWithBackgroundImageExample() {
  return (
    <HeroSection
      title="DJ + Sax die je dansvloer binnen 2 tracks vult"
      subtitle="Live mashups, saxofonist tussen je gasten en realtime setlists afgestemd op jouw publiek."
      ctaPrimaryText="Plan je intake"
      ctaSecondaryText="Vraag een mixdemo aan"
      backgroundImage="/assets/marketing-images/weddingDJ/weddingDJ-01.webp"
      backgroundImageAlt="Professionele bruiloft DJ setup met elegante verlichting"
      titleColor="text-white"
      subtitleColor="text-white/90"
    />
  );
}

// Example 3: Hero section with gradient background and custom colors
export function HeroWithGradientExample() {
  return (
    <HeroSection
      title="Ervaar de ultieme avond"
      subtitle="Van ceremoniële momenten tot de laatste dans, wij verzorgen het muzikale hoogtepunt."
      ctaPrimaryText="Controleer beschikbaarheid"
      ctaSecondaryText="Vraag een offerte aan"
      backgroundClass="bg-gradient-to-r from-primary to-secondary"
      titleColor="text-neutral-light"
      subtitleColor="text-neutral-light/80"
    />
  );
}

// Example 4: Hero section with children (additional content)
export function HeroWithChildrenExample() {
  return (
    <HeroSection
      title="Professionele Bruiloft DJ"
      subtitle="Maak je trouwdag onvergetelijk met de perfecte soundtrack."
      ctaPrimaryText="Bekijk beschikbaarheid"
      ctaSecondaryText="Bekijk pakketten"
    >
      <div className="flex justify-center gap-8 mt-8 text-neutral-light">
        <div className="text-center">
          <p className="text-3xl font-bold">4.9/5</p>
          <p className="text-sm">Gem. reviewscore</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">120+</p>
          <p className="text-sm">Evenementen per jaar</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">98%</p>
          <p className="text-sm">Dansvloeractivatie</p>
        </div>
      </div>
    </HeroSection>
  );
}

// Example 5: Minimal hero section (single CTA)
export function MinimalHeroExample() {
  return (
    <HeroSection
      title="Boek nu je DJ"
      subtitle="Beschikbaarheid checken duurt minder dan 30 seconden."
      ctaPrimaryText="Check beschikbaarheid"
    />
  );
}

// Example 6: Hero for server page (no client interactions needed)
export function ServerHeroExample() {
  return (
    <HeroSection
      title="Welcome to Mister DJ"
      subtitle="Professional DJ services for weddings, corporate events, and parties"
      ctaPrimaryText="Get Started"
      backgroundImage="/assets/hero-default.webp"
      backgroundImageAlt="DJ equipment setup at a professional event"
    >
      <p className="text-neutral-light mt-4">
        Inclusief licht- en geluidspakket op maat.
      </p>
    </HeroSection>
  );
}
