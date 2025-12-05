import type { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  backgroundClass?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  titleColor?: string;
  subtitleColor?: string;
  children?: ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimaryText,
  ctaPrimaryHref = "#",
  ctaSecondaryText,
  ctaSecondaryHref = "#",
  backgroundClass = "bg-neutral-dark",
  backgroundImage,
  backgroundImageAlt = "Hero background",
  titleColor = "text-secondary",
  subtitleColor = "text-neutral-light",
  children,
}: HeroSectionProps) {
  return (
    <section
      className={`${backgroundClass} relative py-spacing-3xl px-spacing-xl min-h-[60vh] flex items-center overflow-hidden`}
    >
      {/* Background Image - using next/image for optimization */}
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </>
      )}

      <div className="container mx-auto text-center space-y-spacing-xl relative z-10">
        <div>
          <h1 className={`heading-1 ${titleColor} mb-spacing-md`}>{title}</h1>
          <p className={`lead mb-spacing-xl max-w-4xl mx-auto ${subtitleColor}`}>{subtitle}</p>
        </div>

        <div className="flex justify-center gap-spacing-md flex-wrap">
          <Button variant="secondary" size="lg">
            {ctaPrimaryText}
          </Button>
          {ctaSecondaryText && (
            <Button variant="outline" size="lg">
              {ctaSecondaryText}
            </Button>
          )}
        </div>

        {children && <div className="mt-spacing-lg">{children}</div>}
      </div>
    </section>
  );
}

export default HeroSection;
