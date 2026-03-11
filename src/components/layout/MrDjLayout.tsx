"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { mrDjTheme } from "@/src/design/mr-dj-theme";
import Image from "next/image";
import { ScrollToTop } from "@/src/components/ui/ScrollToTop";
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { StickyCTA } from "@/src/components/ui/StickyCTA";
import { ScrollProgress } from "@/src/components/ui/ScrollProgress";
import { CookieConsent } from "@/src/components/ui/CookieConsent";
import { ErrorBoundary } from "@/src/components/ui/ErrorBoundary";
import { ExitIntentPopup } from "@/src/components/ui/ExitIntentPopup";
import { companyStats as stats } from "@/src/data/company-stats";

interface MrDjLayoutProps {
  children: React.ReactNode;
}

const navItems: { href: string; label: string }[] = [
  { href: "/nl", label: "Home" },
  { href: "/nl/impressies", label: "Impressies" },
  { href: "/nl/mister-dj", label: "Over ons" },
  { href: "/nl/contact", label: "Contact" },
];

const feestenDropdownItems = [
  { href: "/nl/bedrijfsfeesten", label: "Bedrijfsfeesten", icon: "building", desc: "Personeelsfeest, borrel of event" },
  { href: "/nl/verjaardag", label: "Verjaardag", icon: "cake", desc: "Van 30e tot Abraham-feest" },
  { href: "/nl/eindexamenfeest", label: "Eindexamenfeest", icon: "graduation", desc: "Knalfeest voor geslaagden" },
  { href: "/nl/jubileum", label: "Jubileum", icon: "trophy", desc: "Huwelijks- of bedrijfsjubileum" },
  { href: "/nl/kerstfeest", label: "Kerstfeest", icon: "snowflake", desc: "Kerstborrel of nieuwjaarsfeest" },
  { href: "/nl/carnaval", label: "Carnaval", icon: "mask", desc: "Alaaf! Carnaval met DJ" },
  { href: "/nl/feesten-overig", label: "Overige feesten", icon: "sparkles", desc: "Iets anders? Alles is mogelijk" },
];

function FeestIcon({ type, className }: { type: string; className?: string }) {
  const cls = className || "h-4 w-4";
  switch (type) {
    case "building":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>;
    case "cake":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m18-4.5a23.72 23.72 0 00-4.5-.528m4.5.528V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-5.992M6 13.608v-.513m12 .513v-.513" /></svg>;
    case "graduation":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>;
    case "trophy":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.996.178-1.768.563-2.152 1.025a.993.993 0 00-.182.506 1.02 1.02 0 00.297.77c.741.758 2.766 1.456 5.323 1.77m0 0a63.135 63.135 0 016.929 0m-6.929 0a63.228 63.228 0 00-.452 3.443m7.381-3.443a63.228 63.228 0 01.452 3.443m-7.833 0a63.953 63.953 0 007.834 0" /></svg>;
    case "snowflake":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-3 3m3-3l3 3m-3 15l-3-3m3 3l3-3M3 12h18m-18 0l3-3m-3 3l3 3m15-3l-3-3m3 3l-3 3" /></svg>;
    case "mask":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>;
    case "sparkles":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>;
    default:
      return null;
  }
}

const mobileNavItems = [
  { href: "/nl", label: "Home" },
  { href: "/nl/bruiloften", label: "Bruiloften" },
  ...feestenDropdownItems,
  { href: "/nl/impressies", label: "Impressies" },
  { href: "/nl/mister-dj", label: "Over ons" },
  { href: "/nl/veelgestelde-vragen", label: "Veelgestelde vragen" },
  { href: "/nl/verhuur", label: "Verhuur" },
  { href: "/nl/blog", label: "Blog" },
  { href: "/nl/contact", label: "Contact" },
];

export const MrDjLayout: React.FC<MrDjLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeestenOpen, setIsFeestenOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        fontFamily: mrDjTheme.typography.fontSans,
      }}
      className="bg-layout flex min-h-screen flex-col text-mrdj-text"
    >
      {/* Skip-to-content link (#112, #702) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-yellow-400 focus:px-4 focus:py-2 focus:text-black focus:text-sm focus:font-semibold"
      >
        Ga naar hoofdinhoud
      </a>

      <ScrollProgress />
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${isScrolled ? "shadow-sm" : ""}`}>
        {/* Top bar — trust badges + contact (desktop only, hides on scroll) */}
        <div className={`border-b border-gray-100 transition-all duration-300 overflow-hidden ${isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"}`}>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-[0.7rem] text-gray-500 md:px-6">
            <div className="hidden items-center gap-4 sm:flex">
              {/* TPW trust badge */}
              <a
                href="https://www.theperfectwedding.nl/bedrijven/26384/mr-dj"
                target="_blank"
                rel="noopener noreferrer"
                className="tpw_company_widget_a flex items-center gap-1.5 transition-colors hover:text-gray-900"
                data-width="230"
                data-href="https://www.theperfectwedding.nl/default/company/widget/id/26384/light"
              >
                <span className="text-yellow-400 text-[0.6rem]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <span className="font-semibold text-gray-700">{stats.platforms.tpw.score}</span>
                <span className="text-gray-400">TPW</span>
              </a>
              <span className="text-gray-200">|</span>
              <a href="tel:+31408422594" className="flex items-center gap-1 transition-colors hover:text-gray-900">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                040-8422594
              </a>
              <a href="mailto:info@mr-dj.nl" className="flex items-center gap-1 transition-colors hover:text-gray-900">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                info@mr-dj.nl
              </a>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <span className="text-gray-400">Veldhoven &middot; Noord-Brabant</span>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-2">
                <a href="https://www.facebook.com/mrdj.nl/" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-gray-700" aria-label="Facebook">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/mr_dj.nl/" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-gray-700" aria-label="Instagram">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* TPW widget script (loaded once globally) */}
        <Script
          src="https://cdn.theperfectwedding.nl/js/widget/widget.js"
          strategy="afterInteractive"
        />

        {/* Main nav bar */}
        <div className={`mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6 transition-all duration-300 ${isScrolled ? "py-2.5" : "py-3.5"}`}>
          {/* Brand */}
          <a href="/nl" className="flex items-center gap-2.5 group">
            <Image
              src="/images/logo.png"
              alt="Mister DJ Logo"
              width={48}
              height={48}
              sizes="48px"
              priority
              className={`transition-all duration-300 ${isScrolled ? "h-10 w-10" : "h-12 w-12"}`}
            />
            <div className="leading-none">
              <div className="text-sm font-bold tracking-wide text-gray-900 group-hover:text-yellow-600 transition-colors">
                Mister DJ
              </div>
              <div className={`text-[0.65rem] text-gray-400 transition-all duration-300 overflow-hidden ${isScrolled ? "max-h-0 opacity-0 mt-0" : "max-h-5 opacity-100 mt-0.5"}`}>
                100% dansgarantie
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-1 lg:flex">
            <a
              href="/nl"
              aria-current={pathname === "/nl" ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 text-[0.7rem] font-medium transition-all duration-200 ${
                pathname === "/nl"
                  ? "bg-yellow-50 text-yellow-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Home
            </a>

            {/* Bruiloften — standalone (focus item) */}
            <a
              href="/nl/bruiloften"
              aria-current={pathname === "/nl/bruiloften" ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 text-[0.7rem] font-medium transition-all duration-200 ${
                pathname === "/nl/bruiloften"
                  ? "bg-yellow-50 text-yellow-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Bruiloften
            </a>

            {/* Feesten dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsFeestenOpen(true)}
              onMouseLeave={() => setIsFeestenOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[0.7rem] font-medium transition-all duration-200 ${
                  feestenDropdownItems.some((i) => pathname === i.href)
                    ? "bg-yellow-50 text-yellow-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                aria-expanded={isFeestenOpen}
              >
                Feesten
                <svg className={`h-3 w-3 transition-transform ${isFeestenOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </button>
              <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-1 transition-all duration-200 ${isFeestenOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"}`}>
                <div className="w-80 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                  <div className="grid grid-cols-2 gap-1">
                    {feestenDropdownItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`flex items-start gap-2.5 rounded-lg px-3 py-2.5 transition-colors ${
                          pathname === item.href
                            ? "bg-yellow-50 text-yellow-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <span className="mt-0.5 shrink-0 text-gray-400">
                          <FeestIcon type={item.icon} className="h-4 w-4" />
                        </span>
                        <div>
                          <div className={`text-xs font-medium ${pathname === item.href ? "font-semibold" : ""}`}>{item.label}</div>
                          <div className="text-[0.6rem] leading-tight text-gray-400">{item.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {navItems.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-[0.7rem] font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-yellow-50 text-yellow-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="tel:+31408422594"
              className="hidden items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-gray-900 lg:flex"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              040-8422594
            </a>
            <a
              href="/nl/contact"
              className="inline-flex min-h-[40px] items-center rounded-full bg-yellow-400 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gray-900 shadow-sm transition-all hover:bg-yellow-300 hover:shadow-md"
            >
              Beschikbaarheid checken
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Sluit navigatie" : "Open navigatie"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-0 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
          >
            <span className={`block h-0.5 w-5 bg-gray-600 transition-all duration-200 ${isMenuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gray-600 transition-all duration-200 my-1 ${isMenuOpen ? "opacity-0 scale-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gray-600 transition-all duration-200 ${isMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-live="polite"
        className={`z-50 overflow-hidden border-b border-gray-100 bg-white shadow-lg transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav aria-label="Mobiele navigatie" className="mx-auto max-w-6xl divide-y divide-gray-100 px-4 py-2">
          {mobileNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`flex items-center py-3 px-2 text-sm transition-colors ${
                pathname === item.href
                  ? "font-semibold text-yellow-600"
                  : "text-gray-700 hover:text-yellow-600"
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-yellow-400" />
              )}
            </a>
          ))}
        </nav>
        <div className="border-t border-gray-100 px-4 py-3">
          <a
            href="/nl/contact"
            onClick={() => setIsMenuOpen(false)}
            className="flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-yellow-300"
          >
            Beschikbaarheid checken
          </a>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
            <a href="tel:+31408422594" className="flex items-center gap-1 hover:text-gray-900">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              040-8422594
            </a>
            <a href="mailto:info@mr-dj.nl" className="flex items-center gap-1 hover:text-gray-900">
              info@mr-dj.nl
            </a>
          </div>
        </div>
      </div>

      <main id="main-content" className="flex-1">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <div className="mb-2 font-semibold uppercase tracking-[0.18em] text-gray-600">
                Mister DJ
              </div>
              <div className="text-xs text-gray-600">
                Bruiloften &middot; Bedrijfsfeesten &middot; Feesten &amp; events
              </div>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://www.facebook.com/mrdj.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors hover:text-yellow-600"
                  aria-label="Facebook (opent in nieuw venster)"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href="https://www.instagram.com/mr_dj.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors hover:text-yellow-600"
                  aria-label="Instagram (opent in nieuw venster)"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=31620383638"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors hover:text-yellow-600"
                  aria-label="WhatsApp (opent in nieuw venster)"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Pagina&apos;s
              </div>
              <nav aria-label="Footer navigatie" className="flex flex-col gap-1.5 text-xs text-gray-600">
                {navItems.slice(0, 6).map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="transition-colors hover:text-yellow-600"
                  >
                    {item.label}
                  </a>
                ))}
                <a href="/nl/verzoeknummers" className="transition-colors hover:text-yellow-600">
                  Verzoeknummers
                </a>
              </nav>
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Contact
              </div>
              <div className="flex flex-col gap-1.5 text-xs text-gray-600">
                <a
                  href="tel:+31408422594"
                  className="transition-colors hover:text-yellow-600"
                >
                  040-8422594
                </a>
                <a
                  href="mailto:info@mr-dj.nl"
                  className="transition-colors hover:text-yellow-600"
                >
                  info@mr-dj.nl
                </a>
                <span>Kapteijnlaan 17, 5505 AV Veldhoven</span>
                <span className="text-gray-500">KvK: 68906277</span>
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Regio&apos;s
              </div>
              <nav aria-label="Regio navigatie" className="flex flex-col gap-1.5 text-xs text-gray-600">
                <a href="/nl/dj-eindhoven" className="transition-colors hover:text-yellow-600">DJ Eindhoven</a>
                <a href="/nl/dj-tilburg" className="transition-colors hover:text-yellow-600">DJ Tilburg</a>
                <a href="/nl/dj-den-bosch" className="transition-colors hover:text-yellow-600">DJ Den Bosch</a>
                <a href="/nl/dj-breda" className="transition-colors hover:text-yellow-600">DJ Breda</a>
                <a href="/nl/dj-helmond" className="transition-colors hover:text-yellow-600">DJ Helmond</a>
                <a href="/nl/dj-weert" className="transition-colors hover:text-yellow-600">DJ Weert</a>
                <a href="/nl/dj-veldhoven" className="transition-colors hover:text-yellow-600">DJ Veldhoven</a>
              </nav>
            </div>
          </div>
          {/* Programmatic SEO internal links */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Populaire locaties
            </div>
            <nav aria-label="Locaties" className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.65rem] text-gray-400">
              <a href="/nl/locaties/mispelhoef-eindhoven" className="transition-colors hover:text-yellow-600">DJ Mispelhoef</a>
              <a href="/nl/locaties/kasteel-henkenshage-sint-oedenrode" className="transition-colors hover:text-yellow-600">DJ Kasteel Henkenshage</a>
              <a href="/nl/locaties/kasteel-maurick-vught" className="transition-colors hover:text-yellow-600">DJ Kasteel Maurick</a>
              <a href="/nl/locaties/ketelhuis-eindhoven" className="transition-colors hover:text-yellow-600">DJ Ketelhuis Eindhoven</a>
              <a href="/nl/locaties/kasteelhoeve-geldrop" className="transition-colors hover:text-yellow-600">DJ Kasteelhoeve Geldrop</a>
            </nav>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              DJ services per regio
            </div>
            <nav aria-label="DJ services" className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.65rem] text-gray-400">
              <a href="/nl/dj-service/dj-bruiloft-eindhoven" className="transition-colors hover:text-yellow-600">Bruiloft DJ Eindhoven</a>
              <a href="/nl/dj-service/dj-bruiloft-tilburg" className="transition-colors hover:text-yellow-600">Bruiloft DJ Tilburg</a>
              <a href="/nl/dj-service/dj-bedrijfsfeest-eindhoven" className="transition-colors hover:text-yellow-600">Bedrijfsfeest DJ Eindhoven</a>
              <a href="/nl/dj-service/dj-bedrijfsfeest-breda" className="transition-colors hover:text-yellow-600">Bedrijfsfeest DJ Breda</a>
              <a href="/nl/dj-service/dj-feest-den-bosch" className="transition-colors hover:text-yellow-600">Feest DJ Den Bosch</a>
            </nav>
          </div>
          <div className="border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
            <div className="mb-2">
              <a href="/nl/privacyverklaring" className="transition-colors hover:text-yellow-600">Privacyverklaring</a>
              {" \u00B7 "}
              <a href="/nl/algemene-voorwaarden" className="transition-colors hover:text-yellow-600">Algemene voorwaarden</a>
            </div>
            &copy; {new Date().getFullYear()} Mister DJ - Alle rechten voorbehouden
          </div>
        </div>
      </footer>

      <ScrollToTop />
      <WhatsAppButton />
      <StickyCTA />
      <CookieConsent />
      <ExitIntentPopup />
    </div>
  );
};
