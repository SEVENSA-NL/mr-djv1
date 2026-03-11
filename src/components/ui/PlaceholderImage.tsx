import React from "react";

interface PlaceholderImageProps {
  variant?: "hero" | "portrait" | "gallery";
  className?: string;
  children?: React.ReactNode;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ variant = "gallery", className = "", children }) => {
  const gradients: Record<string, string> = {
    hero: "bg-[radial-gradient(ellipse_at_top,_rgba(249,181,55,0.1),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.08),_transparent_50%),linear-gradient(135deg,#f3f4f6,#e5e7eb,#f3f4f6)]",
    portrait: "bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.08),_transparent_60%),linear-gradient(180deg,#e5e7eb,#f3f4f6)]",
    gallery: "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100",
  };

  return (
    <div className={`relative overflow-hidden ${gradients[variant]} ${className}`}>
      {/* SVG noise pattern overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
        <rect width="100%" height="100%" filter="url(#noise)"/>
      </svg>
      {/* Content */}
      <div className="relative flex h-full w-full items-center justify-center">{children}</div>
    </div>
  );
};
