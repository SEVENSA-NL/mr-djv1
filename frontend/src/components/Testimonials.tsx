import { IconBase, mergeClassNames } from "./shared/IconBase";
import type { IconBaseProps } from "./shared/IconBase";

export interface TestimonialEntry {
  quote: string;
  author: string;
  source: string;
  rating: number;
}

export interface TestimonialsProps {
  testimonials?: TestimonialEntry[];
}

const defaultTestimonials: TestimonialEntry[] = [
  {
    quote:
      "De combinatie van DJ en Saxofonist was het hoogtepunt van onze bruiloft. Vanaf de eerste dans tot de laatste track stond de dansvloer vol. Onze gasten praten er nóg steeds over, 3 maanden later!",
    author: "Jan & Marieke",
    source: "Bruiloft, Kasteel de Haar Utrecht",
    rating: 5,
  },
  {
    quote:
      "Voor ons personeelsfeest met 250 medewerkers zochten we iets speciaals. De DJ + Sax combo overtrof alle verwachtingen. Van loungy borrel tot knallend feest - perfect getimed en gespeeld. Onze CEO vroeg direct het contactgegevens voor volgend jaar!",
    author: "Suzanne van Dijk",
    source: "Bedrijfsfeest Philips, Eindhoven",
    rating: 5,
  },
  {
    quote:
      "Mijn 50e verjaardag werd echt onvergetelijk. De DJ speelde precies de goede mix van oude hits (80s/90s) en nieuwe tracks. Zelfs mijn schoonmoeder stond te dansen - dat zegt genoeg!",
    author: "Mark de Vries",
    source: "Verjaardagsfeest, Eindhoven",
    rating: 5,
  },
  {
    quote:
      "Als eventmanager heb ik met veel DJ's gewerkt, maar deze crew is next level. Professionele communicatie, stipt op tijd, en technisch perfect. Maar het belangrijkste: ze voelen exact aan wat de crowd wil. Hebben ze nu 5 keer geboekt voor ASML events.",
    author: "Thomas Bakker",
    source: "Bedrijfsfeest ASML, Veldhoven",
    rating: 5,
  },
  {
    quote:
      "Onze trouwdag was magisch. De ceremonie-audio werkte perfect (geen gestuntel met microfoons!), de openingsdans met live saxofoon gaf me kippenvel, en het avondfeest was non-stop feest tot 2 uur 's nachts. Volle dansvloer van begin tot eind!",
    author: "Lisa & Jeroen",
    source: "Bruiloft, Landgoed de Biestheuvel Tilburg",
    rating: 5,
  },
  {
    quote:
      "Voor onze 25-jarig jubileum wilden we iets bijzonders. De DJ paste muziek én verlichting aan op ons thema (80s party) en kwam zelfs zelf in stijl. Gasten van 18 tot 75 stonden te dansen. Mega succes!",
    author: "Robert & Sandra",
    source: "Jubileumfeest, Den Bosch",
    rating: 5,
  },
  {
    quote:
      "Wat een verschil met onze vorige bedrijfsfeest (andere DJ). Nu hadden we eindelijk een volle dansvloer! De DJ las de groep perfect: van rustig begin tot knallend einde. En super flexibel toen ons schema uitliep - geen gestress.",
    author: "Marloes Jansen",
    source: "VDL Groep Personeelsfeest, Eindhoven",
    rating: 5,
  },
  {
    quote:
      "Ons tuinfeest voor 80 gasten was geweldig! De DJ regelde alles: overkapping tegen de regen, volledige licht + geluid setup. Van chille middag muziek naar uptempo avond - perfect! Buren kwamen zelfs vragen wie de DJ was.",
    author: "Koen van Doorn",
    source: "Tuinfeest, Helmond",
    rating: 5,
  },
  {
    quote:
      "De 40e verjaardag van mijn man was een verrassing party. De DJ hielp mee met de verrassing, speelde exact zijn favoriete nummers, en hield de energie hoog tot het laatst. Mijn man zei: 'Best party ever!' - beter compliment kan ik niet geven.",
    author: "Emma Visser",
    source: "Verrassingfeest, Breda",
    rating: 5,
  },
  {
    quote:
      "Voor ons openingsfeest (nieuwe vestiging) wilden we iets dat past bij onze brand. De DJ integreerde onze huisstijl in visuals, speelde moderne house/lounge, en creëerde exact de premium sfeer die we zochten. Klanten waren onder de indruk!",
    author: "Stefan de Jong",
    source: "Bedrijfsopening, Eindhoven",
    rating: 5,
  },
];

function StarIcon({ className, ...props }: IconBaseProps) {
  return (
    <IconBase
      className={mergeClassNames("h-5 w-5", className)}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </IconBase>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex" role="img" aria-label={`Beoordeling: ${rating} van de 5 sterren`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon
          key={index}
          className={index < rating ? "text-secondary" : "text-neutral-gray-500"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialEntry }) {
  return (
    <article
      className="bg-neutral-light p-spacing-xl rounded-lg shadow-xl flex flex-col h-full"
      aria-label={`Testimonial van ${testimonial.author}`}
    >
      <StarRating rating={testimonial.rating} />
      <p className="lead text-neutral-dark text-emphasis my-spacing-lg flex-grow">
        “{testimonial.quote}”
      </p>
      <footer className="border-t border-neutral-gray-100 pt-spacing-md">
        <p className="body-md text-strong text-primary">{testimonial.author}</p>
        <p className="body-sm text-neutral-gray-500">{testimonial.source}</p>
      </footer>
    </article>
  );
}

export function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  return (
    <section className="py-spacing-3xl bg-neutral-gray-100">
      <div className="container mx-auto px-spacing-md">
        <h2 className="heading-2 text-center text-neutral-dark mb-spacing-2xl">
          Wat Klanten Zeggen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-xl">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={`${testimonial.author}-${testimonial.source}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
export { defaultTestimonials };
