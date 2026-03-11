import React from "react";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message = "Binnenkort meer..." }) => (
  <div className="flex flex-col items-center gap-3 py-12 text-center">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
    <p className="text-sm text-gray-400">{message}</p>
  </div>
);
