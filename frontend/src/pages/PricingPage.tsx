import { useTranslation } from "react-i18next";
import PriceCalculator from "../components/pricing/PriceCalculator";
import PricingTables from "../components/PricingTables";

export default function PricingPage() {
  const { t } = useTranslation();

  return (
    <div className="py-spacing-2xl">
      <div className="container mx-auto px-spacing-md text-center mb-spacing-2xl">
        <h1 className="heading-1 text-neutral-dark mb-spacing-md">
          {t("pricing.title", "Prijzen & Pakketten")}
        </h1>
        <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
          {t(
            "pricing.subtitle",
            "Kies het pakket dat perfect bij jouw feest past. Alle pakketten inclusief professionele DJ en top kwaliteit apparatuur."
          )}
        </p>
      </div>

      <PricingTables />

      <div className="container mx-auto px-spacing-md mt-spacing-3xl">
        <div className="max-w-5xl mx-auto">
          <PriceCalculator />
        </div>
      </div>
    </div>
  );
}
