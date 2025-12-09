export type CityContent = {
  heroImage: string;
  highlights: string[];
  venues: string[];
  perks: string[];
};

export const cityContent: Record<string, CityContent> = {
  eindhoven: {
    heroImage: '/assets/marketing-images/corporateEvent/corporateEvent-01.webp',
    highlights: ['Brainport crowd lovers', 'Hybrid DJ + sax show', 'Tech-friendly riders'],
    venues: ['Evoluon', 'Het Ketelhuis', 'Klokgebouw'],
    perks: ['Snelle load-in', 'Branding-ready visuals', 'Team events & launches'],
  },
  tilburg: {
    heroImage: '/assets/marketing-images/partyDJ/partyDJ-02.webp',
    highlights: ['013 vibes zonder wachtrij', 'Live sax op de dansvloer', 'Elke genreblend mogelijk'],
    venues: ['Koepelhal', 'De Pont', 'Doloris Rooftop'],
    perks: ['Strakke opbouw', 'Compacte lichtshow', 'Party tot sluit'],
  },
  breda: {
    heroImage: '/assets/marketing-images/weddingDJ/weddingDJ-03.jpg',
    highlights: ['Bourgondisch + dansgarantie', 'Ceremonie tot afterparty', 'Bruiloft & corporate'],
    venues: ['Grote Kerk', 'Kasteel Bouvigne', 'STEEL Breda'],
    perks: ['Luxe sound & light', 'Sax of percussie als add-on', 'Intake in 20 min geregeld'],
  },
  'den-bosch': {
    heroImage: '/assets/marketing-images/weddingDJ/weddingDJ-05.jpg',
    highlights: ['Bossche sfeer + volle vloer', 'DJ + sax voor borrel en feest', 'Zakelijk en privé'],
    venues: ['De Orangerie', 'Verkadefabriek', 'De Gruyter Fabriek'],
    perks: ['Snelle availability-check', 'Locatie-afstemming geregeld', 'Dance classics + modern mashups'],
  },
};

