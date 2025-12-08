/**
 * Pricing data for DJ packages and add-ons
 * Used across pricing pages and calculator components
 */

export interface Package {
  id: 'brons' | 'zilver' | 'goud';
  name: string;
  subtitle: string;
  basePrice: number;
  description: string;
  features: string[];
  duration: string;
  guestCapacity: string;
  recommended?: boolean;
  isFeatured?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'lighting' | 'entertainment' | 'effects' | 'decor';
  popular?: boolean;
}

export interface PricingFeature {
  icon: string;
  title: string;
  description: string;
}

export const PACKAGES: Package[] = [
  {
    id: 'brons',
    name: 'Brons Pakket',
    subtitle: 'Perfect voor intieme feesten',
    basePrice: 495,
    description: 'Ideaal voor kleine feesten en evenementen tot 100 gasten',
    duration: '4 uur',
    guestCapacity: 'Tot 100 gasten',
    features: [
      '4 uur non-stop muziek en energie',
      'Club-waardig geluid voor tot 100 gasten',
      'Persoonlijke muziekwensen intake',
      'Professionele DJ met 15+ jaar ervaring',
      'Draadloze microfoons voor speeches',
      'Uitgebreide muziekbibliotheek (alle genres)',
    ],
  },
  {
    id: 'zilver',
    name: 'Zilver Pakket',
    subtitle: 'Favoriet van 300+ bruidsparen',
    basePrice: 795,
    description: 'Meest gekozen voor bruiloften en middelgrote events',
    duration: '6 uur',
    guestCapacity: '80-150 gasten',
    recommended: true,
    isFeatured: true,
    features: [
      '6 uur onvergetelijke feestavond',
      'Spectaculaire lichtshow die iedereen imponeert',
      'Moving heads & LED spots',
      'Optie: DJ + Live Saxofoon (het verschil tussen leuk en legendarisch)',
      '100% volle dansvloer gegarandeerd of geld terug',
      'Voor elke groepsgrootte - van 50 tot 500 gasten',
      'Persoonlijk draaiboek vooraf',
    ],
  },
  {
    id: 'goud',
    name: 'Goud Pakket',
    subtitle: 'Premium All-Inclusive - Stress-vrij feest',
    basePrice: 1295,
    description: 'Premium pakket voor grote events en bruiloften',
    duration: '8 uur',
    guestCapacity: '150+ gasten',
    features: [
      '8 uur complete entertainment ervaring',
      'Concert-kwaliteit licht & geluid',
      'DJ + Live Saxofonist inbegrepen (wow-factor gegarandeerd)',
      'Ceremonie tot afterparty - volledig verzorgd',
      'Persoonlijk draaiboek + technische regisseur',
      'Venue uplighting (sfeerverlichting)',
      'Backup DJ en apparatuur standaard',
    ],
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'led-floor',
    name: 'LED Dansvloer',
    price: 450,
    description: 'Verlichte dansvloer 4x4m met LED-effecten',
    category: 'lighting',
    popular: true,
  },
  {
    id: 'photobooth',
    name: 'Photobooth',
    price: 350,
    description: 'Inclusief prints, props en digitale downloads',
    category: 'entertainment',
    popular: true,
  },
  {
    id: 'co2-cannons',
    name: 'CO2 Cannons',
    price: 200,
    description: '2 CO2 cannons met tanks voor spectaculaire effecten',
    category: 'effects',
  },
  {
    id: 'live-sax-extra',
    name: 'Live Saxofoon (extra uur)',
    price: 300,
    description: 'Extra uur live saxofoon bovenop standaard performance',
    category: 'entertainment',
    popular: true,
  },
  {
    id: 'live-sax-addon',
    name: 'Live Saxofoon toevoegen',
    price: 400,
    description: 'Voeg live saxofonist toe aan Brons of Zilver pakket',
    category: 'entertainment',
    popular: true,
  },
  {
    id: 'uplighting',
    name: 'Venue Uplighting',
    price: 250,
    description: '12 LED uplights voor sfeerverlichting van je venue',
    category: 'lighting',
  },
  {
    id: 'love-letters',
    name: 'Love Letters',
    price: 150,
    description: 'Verlichte LOVE letters 1.2m hoog',
    category: 'decor',
  },
  {
    id: 'extra-hour',
    name: 'Extra Uur',
    price: 150,
    description: 'Verleng je feest met een extra uur DJ + verlichting',
    category: 'entertainment',
  },
  {
    id: 'sparkular',
    name: 'Sparkular Machines',
    price: 300,
    description: '2 sparkular machines voor vuurwerk-effect (zonder vuur)',
    category: 'effects',
  },
  {
    id: 'smoke-machine',
    name: 'Professionele Rookmachine',
    price: 100,
    description: 'Heavy-duty rookmachine voor extra sfeer',
    category: 'effects',
  },
];

export const PRICING_FEATURES: PricingFeature[] = [
  {
    icon: '✨',
    title: 'All-in pakketten',
    description: 'Geen verborgen kosten. Alle prijzen zijn inclusief aankomst, opbouw, uitvoering en afbouw.',
  },
  {
    icon: '🎷',
    title: 'Live Saxofoon optie',
    description: 'Upgrade elk pakket met een live saxofonist. Het verschil tussen leuk en legendarisch.',
  },
  {
    icon: '💯',
    title: '100% Dansgarantie',
    description: 'Volle dansvloer of je geld terug. In 500+ events hebben we deze belofte altijd waargemaakt.',
  },
];

export const PACKAGE_INCLUDES = [
  {
    icon: '🎵',
    title: 'Professioneel geluid & muziek',
    items: [
      'Club-kwaliteit geluidsinstallatie (geschikt voor jouw locatie)',
      'Draadloze microfoons voor speeches & ceremonies',
      'Uitgebreide muziekbibliotheek (alle genres & decennia)',
      'Persoonlijke muziekwensen intake vooraf',
    ],
  },
  {
    icon: '💡',
    title: 'Sfeervolle verlichting',
    items: [
      'Moving heads & LED spots (vanaf pakket Zilver)',
      'Sfeerverlichting afgestemd op je thema & locatie',
      'Lichtshow gesynchroniseerd met de muziek',
      'Dimbare verlichting voor intieme momenten',
    ],
  },
  {
    icon: '🎯',
    title: 'Volledige ontzorging',
    items: [
      'Afstemming met je locatie (technische planning)',
      'Opbouw ruim voor aanvang (geen stress)',
      'Ervaren DJ die de vibe aanvoelt & de dansvloer vult',
      'Backup apparatuur standaard aanwezig',
    ],
  },
];

export const PRICING_FAQ = [
  {
    question: 'Kunnen we een pakket uitbreiden met extra uren?',
    answer: 'Ja, absoluut! We kunnen elk pakket uitbreiden met extra uren. De kosten hiervoor zijn €150 per extra uur. Dit is inclusief DJ, muziek en verlichting.',
  },
  {
    question: 'Wat kost de live saxofonist als extra optie?',
    answer: 'De live saxofonist kan bij pakket Brons en Zilver worden toegevoegd voor €400 extra. Bij pakket Goud is deze al inbegrepen! De saxofonist speelt live mee met de DJ gedurende de hoogtepunten van je feest (bijv. openingsdans, hit van de avond).',
  },
  {
    question: 'Zijn reiskosten inbegrepen in de prijs?',
    answer: 'Voor events in Brabant en Limburg zijn er geen reiskosten. Voor locaties daarbuiten berekenen we €0,30 per kilometer (enkele reis vanaf Eindhoven). We vermelden dit altijd duidelijk in de offerte.',
  },
  {
    question: 'Wat gebeurt er als de DJ ziek wordt?',
    answer: 'We hebben een netwerk van ervaren backup DJ\'s. In het onverhoopte geval dat je DJ ziek wordt, regelen we direct een vervanger met dezelfde kwaliteit. Dit is onderdeel van onze 100% zekerheidsgarantie.',
  },
  {
    question: 'Kunnen we zelf een playlist aanleveren?',
    answer: 'Ja! We vinden het fijn als je muziekwensen deelt. Je kunt een Spotify playlist aanleveren, favoriete nummers opgeven of juist aangeven wat je NIET wilt horen. Onze DJ mixt jouw wensen met zijn ervaring om de dansvloer vol te houden.',
  },
  {
    question: 'Zijn de prijzen inclusief BTW?',
    answer: 'De vermelde prijzen zijn exclusief 21% BTW. Voor particuliere klanten geldt de prijs inclusief BTW. Voor zakelijke klanten wordt BTW separaat vermeld op de factuur.',
  },
];

/**
 * Get package by ID
 */
export function getPackageById(id: string): Package | undefined {
  return PACKAGES.find((pkg) => pkg.id === id);
}

/**
 * Get recommended package based on guest count
 */
export function getRecommendedPackage(guestCount: number): Package['id'] {
  if (guestCount < 80) return 'brons';
  if (guestCount >= 150) return 'goud';
  return 'zilver';
}

/**
 * Calculate total price with add-ons
 */
export function calculateTotalPrice(
  packageId: Package['id'],
  addOnIds: string[]
): number {
  const pkg = getPackageById(packageId);
  const packagePrice = pkg?.basePrice || 0;

  const addOnsPrice = addOnIds.reduce((sum, addOnId) => {
    const addOn = ADD_ONS.find((a) => a.id === addOnId);
    return sum + (addOn?.price || 0);
  }, 0);

  return packagePrice + addOnsPrice;
}
