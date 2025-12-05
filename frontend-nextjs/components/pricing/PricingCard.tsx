'use client';

export interface PricingFeatureSet {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
  buttonText: string;
}

export interface PricingCardProps {
  pkg: PricingFeatureSet;
}

export function PricingCard({ pkg }: PricingCardProps) {
  const { name, subtitle, price, features, isFeatured, buttonText } = pkg;

  const cardClasses = isFeatured
    ? 'bg-neutral-dark text-neutral-light shadow-2xl transform md:scale-105 scale-100 ring-4 ring-amber-500 ring-offset-2 relative z-10'
    : 'bg-neutral-light text-neutral-dark shadow-lg';

  const headerClasses = isFeatured
    ? 'text-secondary border-b border-secondary/50'
    : 'text-primary border-b border-neutral-gray-100';

  const iconColor = isFeatured ? 'text-secondary' : 'text-primary';

  return (
    <div
      className={`relative flex flex-col p-spacing-xl rounded-lg transition duration-300 ${cardClasses}`}
    >
      {isFeatured ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-dark body-sm text-strong px-spacing-lg py-spacing-sm rounded-full shadow-lg border-2 border-amber-300 flex items-center gap-2 whitespace-nowrap animate-pulse-subtle">
          <span className="font-bold">MEEST GEKOZEN</span>
        </div>
      ) : null}
      <div className={`pb-spacing-md mb-spacing-md ${headerClasses}`}>
        <h3 className="heading-3">{name}</h3>
        <p className="body-sm opacity-80">{subtitle}</p>
      </div>
      <div className="flex items-baseline mb-spacing-lg">
        <span className="heading-1">{price}</span>
        <span className="body-md ml-spacing-xs">/ event</span>
      </div>
      <ul className="flex-grow space-y-spacing-sm mb-spacing-xl">
        {features.map((feature) => (
          <li key={feature} className="flex items-start body-md">
            <svg
              className={`w-5 h-5 mr-spacing-sm ${iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="w-full inline-flex items-center justify-center rounded-md bg-amber-500 px-spacing-lg py-spacing-md body-md font-semibold text-slate-900 shadow-md transition hover:bg-amber-400 hover:shadow-lg"
      >
        {buttonText}
      </button>
    </div>
  );
}

