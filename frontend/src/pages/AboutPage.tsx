import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="py-spacing-2xl">
      <div className="container mx-auto px-spacing-md">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-spacing-2xl">
            <h1 className="heading-1 text-neutral-dark mb-spacing-md">
              {t("about.title", "Over Ons")}
            </h1>
            <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
              {t(
                "about.subtitle",
                "De beste DJ voor jouw event. Al 15+ jaar zorgen wij voor onvergetelijke feesten."
              )}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-spacing-xl md:p-spacing-2xl mb-spacing-xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="heading-2 text-neutral-dark mb-spacing-lg">
                {t("about.story.title", "Ons Verhaal")}
              </h2>
              <p className="body-md text-neutral-700 mb-spacing-md">
                {t(
                  "about.story.paragraph1",
                  "Mr. DJ is ontstaan uit een passie voor muziek en het creëren van onvergetelijke momenten. Met meer dan 15 jaar ervaring hebben we honderden events verzorgd, van intieme bruiloften tot grote bedrijfsfeesten."
                )}
              </p>
              <p className="body-md text-neutral-700 mb-spacing-md">
                {t(
                  "about.story.paragraph2",
                  "Wat ons onderscheidt is onze persoonlijke aanpak. We nemen de tijd om je te leren kennen, je muziekvoorkeuren te begrijpen en een unieke draailijst samen te stellen die perfect past bij jouw event en gasten."
                )}
              </p>

              <h2 className="heading-2 text-neutral-dark mb-spacing-lg mt-spacing-2xl">
                {t("about.experience.title", "Onze Ervaring")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-lg mb-spacing-xl">
                <div className="text-center p-spacing-lg bg-neutral-gray-50 rounded-lg">
                  <div className="heading-1 text-primary mb-spacing-sm">500+</div>
                  <div className="body-md text-neutral-700">Events Verzorgd</div>
                </div>
                <div className="text-center p-spacing-lg bg-neutral-gray-50 rounded-lg">
                  <div className="heading-1 text-primary mb-spacing-sm">15+</div>
                  <div className="body-md text-neutral-700">Jaar Ervaring</div>
                </div>
                <div className="text-center p-spacing-lg bg-neutral-gray-50 rounded-lg">
                  <div className="heading-1 text-primary mb-spacing-sm">4.9/5</div>
                  <div className="body-md text-neutral-700">Gemiddelde Beoordeling</div>
                </div>
              </div>

              <h2 className="heading-2 text-neutral-dark mb-spacing-lg mt-spacing-2xl">
                {t("about.values.title", "Onze Waarden")}
              </h2>
              <ul className="space-y-spacing-md">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-spacing-md mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <strong className="text-neutral-dark">Professionaliteit:</strong>{" "}
                    <span className="text-neutral-700">
                      Top kwaliteit apparatuur en betrouwbare service
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-spacing-md mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <strong className="text-neutral-dark">Persoonlijke Aanpak:</strong>{" "}
                    <span className="text-neutral-700">
                      Elk event is uniek en krijgt onze volledige aandacht
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-spacing-md mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <strong className="text-neutral-dark">100% Dansgarantie:</strong>{" "}
                    <span className="text-neutral-700">
                      We zorgen voor een volle dansvloer of je geld terug
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-spacing-md mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <strong className="text-neutral-dark">Passie voor Muziek:</strong>{" "}
                    <span className="text-neutral-700">
                      We leven voor dat perfecte moment op de dansvloer
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="body-lg text-neutral-700 mb-spacing-lg">
              {t("about.cta.text", "Klaar om jouw feest onvergetelijk te maken?")}
            </p>
            <div className="flex flex-wrap justify-center gap-spacing-md">
              <a
                href="/beschikbaarheid"
                className="inline-block bg-primary text-white px-spacing-xl py-spacing-md rounded-lg hover:bg-primary-dark transition"
              >
                {t("about.cta.availability", "Check Beschikbaarheid")}
              </a>
              <a
                href="/prijzen"
                className="inline-block bg-white text-primary border-2 border-primary px-spacing-xl py-spacing-md rounded-lg hover:bg-neutral-gray-50 transition"
              >
                {t("about.cta.packages", "Bekijk Pakketten")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
