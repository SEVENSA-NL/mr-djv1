"use client";

import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children?: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      {children}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[0.6rem] font-bold text-gray-400 transition hover:border-yellow-500 hover:text-yellow-600"
        aria-label="Meer informatie"
      >
        ?
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 z-tooltip mb-2 w-48 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 border border-gray-200 shadow-xl">
          {text}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </span>
      )}
    </span>
  );
};
