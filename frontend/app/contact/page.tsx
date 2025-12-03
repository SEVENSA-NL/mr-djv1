import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact - Vraag een vrijblijvende offerte aan",
  description:
    "Neem contact op met Mister DJ voor een vrijblijvende offerte voor je bruiloft, bedrijfsfeest of evenement. We reageren binnen 24 uur.",
  openGraph: {
    title: "Contact - Vraag een vrijblijvende offerte aan | Mister DJ",
    description:
      "Neem contact op voor een vrijblijvende offerte. Professionele DJ + Live Saxofoon voor je event.",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
      <Breadcrumbs />
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-500">
          Neem contact op
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Vraag een vrijblijvende offerte aan
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          Vertel ons over je event en ontvang binnen 24 uur een op maat gemaakte offerte. Of chat direct met ons via WhatsApp voor snelle vragen.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <WhatsAppButton
            variant="secondary"
            messageType="contact"
            label="Chat via WhatsApp"
          />
          <a
            href="tel:+31408422594"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Bel direct: +31 (0) 40 842 2594
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <ContactForm />
      </div>

      <div className="mt-12 rounded-lg bg-slate-50 p-8">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">Wat kun je verwachten?</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <div className="mb-2 text-3xl">📧</div>
            <h3 className="mb-1 font-semibold text-slate-900">Binnen 24 uur reactie</h3>
            <p className="text-sm text-slate-600">
              We reageren snel met een persoonlijke offerte op maat voor jouw event.
            </p>
          </div>
          <div>
            <div className="mb-2 text-3xl">💰</div>
            <h3 className="mb-1 font-semibold text-slate-900">Transparante prijzen</h3>
            <p className="text-sm text-slate-600">
              All-in pakketten zonder verborgen kosten. Budget zekerheid gegarandeerd.
            </p>
          </div>
          <div>
            <div className="mb-2 text-3xl">🎯</div>
            <h3 className="mb-1 font-semibold text-slate-900">Geen verplichtingen</h3>
            <p className="text-sm text-slate-600">
              Vrijblijvend kennismaken en offertes vergelijken. Geen druk, gewoon advies.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-6">
        <p className="font-medium text-amber-900">
          <strong>✨ Tip:</strong> Vermeld je event datum in het bericht, dan kunnen we direct checken of we beschikbaar zijn!
        </p>
      </div>
    </main>
  );
}
