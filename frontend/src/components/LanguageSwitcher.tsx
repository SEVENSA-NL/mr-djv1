import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES: Array<{ code: string; labelKey: string; shortCode?: string }> = [
  { code: "en", labelKey: "language.options.en", shortCode: "EN" },
  { code: "nl", labelKey: "language.options.nl", shortCode: "NL" },
];

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (language: string) => {
    void i18n.changeLanguage(language);
    setIsOpen(false);
    // Persist to localStorage
    localStorage.setItem("preferredLanguage", language);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const currentLanguage = LANGUAGES.find(
    (lang) => lang.code === i18n.resolvedLanguage
  );
  const currentLabelKey = currentLanguage?.labelKey || LANGUAGES[0].labelKey;
  const currentShortCode = currentLanguage?.shortCode || "EN";

  return (
    <div
      className="language-switcher"
      ref={menuRef}
      style={{ display: "inline-block", position: "relative" }}
    >
      <button
        aria-label={t("language.aria.label")}
        onClick={() => setIsOpen(!isOpen)}
        className="language-switcher__button"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {currentShortCode}
      </button>
      <div
        className="language-switcher__menu"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop: "0.25rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          zIndex: 1000,
          minWidth: "120px",
          visibility: isOpen ? "visible" : "hidden",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out",
        }}
      >
        {LANGUAGES.map(({ code, labelKey }) => (
          <button
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={`language-switcher__option ${
              code === i18n.resolvedLanguage ? "active" : ""
            }`}
            data-language={code}
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem 1rem",
              border: "none",
              backgroundColor:
                code === i18n.resolvedLanguage ? "#e0e0e0" : "transparent",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
