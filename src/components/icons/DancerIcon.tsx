import React from "react";
export const DancerIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2"/><path d="M7 22l3-7"/><path d="M17 22l-3-7"/><path d="M8 10l4 2 4-2"/><path d="M12 12v4"/><path d="M5 14l3-4 4 2 4-2 3 4"/>
  </svg>
);
