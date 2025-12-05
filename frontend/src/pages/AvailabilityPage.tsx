import { useTranslation } from "react-i18next";
import AvailabilityChecker from "../components/AvailabilityChecker";

export default function AvailabilityPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-spacing-md py-spacing-2xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-spacing-2xl">
          <h1 className="heading-1 text-neutral-dark mb-spacing-md">
            {t("availability.title", "Check Beschikbaarheid")}
          </h1>
          <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
            {t(
              "availability.subtitle",
              "Controleer direct of je gewenste datum nog vrij is. We reageren binnen 24 uur met een bevestiging."
            )}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-spacing-xl">
          <AvailabilityChecker />
        </div>

        <div className="mt-spacing-xl text-center">
          <p className="body-md text-neutral-600 mb-spacing-md">
            {t(
              "availability.info",
              "Al je datum gevonden? Bekijk onze pakketten voor de beste deal!"
            )}
          </p>
          <a
            href="/prijzen"
            className="inline-block bg-primary text-white px-spacing-xl py-spacing-md rounded-lg hover:bg-primary-dark transition"
          >
            {t("availability.viewPackages", "Bekijk Pakketten")}
          </a>
        </div>
      </div>
    </div>
  );
}
