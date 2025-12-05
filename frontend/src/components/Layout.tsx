import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

interface LayoutProps {
  children: ReactNode;
}

type AppCopy = {
  title: string;
  subtitle?: string;
};

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const appCopy = t("app", { returnObjects: true }) as AppCopy;

  return (
    <div className="App">
      <header className="app-header">
        <div className="app-brand">
          <p className="app-badge">{t("hero.badge")}</p>
          <Link to="/" className="app-title-link">
            <h1 className="app-title">{appCopy.title}</h1>
          </Link>
          {appCopy.subtitle ? <p className="app-subtitle">{appCopy.subtitle}</p> : null}
        </div>
        <nav className="app-nav">
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">
                {t("nav.home", "Home")}
              </Link>
            </li>
            <li>
              <Link to="/beschikbaarheid" className="nav-link">
                {t("nav.availability", "Beschikbaarheid")}
              </Link>
            </li>
            <li>
              <Link to="/prijzen" className="nav-link">
                {t("nav.pricing", "Prijzen")}
              </Link>
            </li>
            <li>
              <Link to="/over-ons" className="nav-link">
                {t("nav.about", "Over Ons")}
              </Link>
            </li>
          </ul>
        </nav>
        <LanguageSwitcher />
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <div className="container mx-auto px-spacing-md py-spacing-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-xl">
            <div>
              <h3 className="heading-4 text-neutral-dark mb-spacing-md">
                {appCopy.title}
              </h3>
              <p className="body-sm text-neutral-600">
                {t(
                  "footer.tagline",
                  "Professionele DJ services voor bruiloften, bedrijfsfeesten en meer."
                )}
              </p>
            </div>
            <div>
              <h4 className="heading-5 text-neutral-dark mb-spacing-md">
                {t("footer.quickLinks", "Snelle Links")}
              </h4>
              <ul className="space-y-spacing-sm">
                <li>
                  <Link to="/" className="body-sm text-neutral-600 hover:text-primary">
                    {t("nav.home", "Home")}
                  </Link>
                </li>
                <li>
                  <Link to="/beschikbaarheid" className="body-sm text-neutral-600 hover:text-primary">
                    {t("nav.availability", "Beschikbaarheid")}
                  </Link>
                </li>
                <li>
                  <Link to="/prijzen" className="body-sm text-neutral-600 hover:text-primary">
                    {t("nav.pricing", "Prijzen")}
                  </Link>
                </li>
                <li>
                  <Link to="/over-ons" className="body-sm text-neutral-600 hover:text-primary">
                    {t("nav.about", "Over Ons")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="heading-5 text-neutral-dark mb-spacing-md">
                {t("footer.contact", "Contact")}
              </h4>
              <ul className="space-y-spacing-sm">
                <li className="body-sm text-neutral-600">
                  Email:{" "}
                  <a href="mailto:info@mr-dj.nl" className="hover:text-primary">
                    info@mr-dj.nl
                  </a>
                </li>
                <li className="body-sm text-neutral-600">
                  Tel:{" "}
                  <a href="tel:+31612345678" className="hover:text-primary">
                    +31 6 1234 5678
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-spacing-xl pt-spacing-lg border-t border-neutral-gray-200 text-center">
            <p className="body-sm text-neutral-600">
              {t("footer.copyright", {
                year: new Date().getFullYear(),
                defaultValue: `© ${new Date().getFullYear()} Mr. DJ. Alle rechten voorbehouden.`,
              })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
