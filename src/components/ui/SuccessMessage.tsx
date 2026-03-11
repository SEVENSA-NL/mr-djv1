import React from "react";

interface SuccessMessageProps {
  onReset: () => void;
}

const timelineSteps = [
  { label: "Je ontvangt binnen 5 minuten een bevestigingsmail", icon: "1" },
  { label: "Wij nemen binnen 24 uur persoonlijk contact op", icon: "2" },
  { label: "Samen bespreken we jullie wensen", icon: "3" },
];

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReset }) => (
  <div role="status" aria-live="polite" className="flex flex-col items-center gap-6 py-10 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#34C759]/20">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
    </div>
    <div>
      <h3 className="mb-1 text-lg font-semibold text-gray-900">Bedankt voor je aanvraag!</h3>
      <p className="text-sm text-gray-600">We nemen zo snel mogelijk contact met je op.</p>
    </div>

    {/* Wat gebeurt er nu? timeline */}
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-gray-50 p-5 text-left">
      <h4 className="mb-4 text-center text-sm font-semibold text-yellow-600">Wat gebeurt er nu?</h4>
      <ol className="space-y-4">
        {timelineSteps.map((step) => (
          <li key={step.icon} className="flex items-start gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
              {step.icon}
            </span>
            <span className="text-sm text-gray-700">{step.label}</span>
          </li>
        ))}
      </ol>
    </div>

    {/* Cross-sell tip */}
    <div className="w-full max-w-sm rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3 text-center">
      <p className="text-xs text-yellow-600">
        Tip: bekijk ook onze photobooth add-on!
      </p>
    </div>

    <button type="button" onClick={onReset} className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-full border border-gray-300 bg-gray-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-700 transition hover:border-yellow-500 hover:text-yellow-600">
      Verstuur nog een aanvraag
    </button>
  </div>
);
