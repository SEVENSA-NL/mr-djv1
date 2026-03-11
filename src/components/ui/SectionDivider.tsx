"use client";

import React from "react";

interface SectionDividerProps {
  /** Flip the wave vertically */
  flip?: boolean;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  flip = false,
  className = "",
}) => {
  return (
    <div
      className={`pointer-events-none overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block h-[30px] w-full md:h-[50px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0V30Z"
          fill="currentColor"
          className="text-white/[0.03]"
        />
      </svg>
    </div>
  );
};
