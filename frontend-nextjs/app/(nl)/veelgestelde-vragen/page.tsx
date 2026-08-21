import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { createMrDjFaqStructuredData, MR_DJ_FAQ } from "@/lib/data/mrDjFaq";

export default function VeelgesteldeVragenPage() {
  const featuredFaq = MR_DJ_FAQ.slice(0, 6);
  return (
    <MrDjLayout>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12" aria-labelledby="faq-title">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createMrDjFaqStructuredData()) }} />
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
          Veelgestelde vragen
        </p>
        <h1 id="faq-title" className="mb-3 text-2xl font-semibold text-white md:text-3xl">
          Antwoorden op de meest gestelde vragen.
        </h1>
        <p className="mb-6 max-w-2xl text-sm text-white/80 md:text-base">
          Van muziek en voorbereiding tot techniek, planning en voorwaarden. Afspraken over een boeking worden altijd schriftelijk bevestigd.
        </p>
        <div className="space-y-3">
          {featuredFaq.map((item) => (
            <details
              key={item.id}
              id={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-300">
                {item.question}
              </summary>
              <div className="mt-2 text-xs leading-6 text-white/80 md:text-sm">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
        <h2 className="mt-12 mb-4 text-xl font-semibold text-white">Alle vragen</h2>
        <div className="space-y-3">
          {MR_DJ_FAQ.slice(6).map((item) => (
            <details key={item.id} id={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <summary className="cursor-pointer list-none text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-300">{item.question}</summary>
              <div className="mt-2 text-xs leading-6 text-white/80 md:text-sm">{item.answer}</div>
            </details>
          ))}
        </div>
      </section>
    </MrDjLayout>
  );
}
