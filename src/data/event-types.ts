export interface EventType {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroHeading: string;
  heroDescription: string;
  gradientTint: string;
  usps: string[];
  faqItems: { question: string; answer: string }[];
  crossLinks: { href: string; title: string; description: string }[];
  formEventType: string;
}

export const eventTypes: EventType[] = [
  {
    slug: "verjaardag",
    title: "Verjaardag",
    metaTitle: "DJ voor je verjaardag | Mister DJ - 100% dansgarantie",
    metaDescription: "Op zoek naar een DJ voor je verjaardagsfeest? Mister DJ zorgt voor de perfecte muziek en sfeer. Van 30e verjaardag tot Abraham/Sarah-feest. Vraag vrijblijvend aan!",
    heroLabel: "Verjaardag DJ",
    heroHeading: "Maak van je verjaardag een echt feest",
    heroDescription: "Van een intiem feestje met 30 gasten tot een groot verjaardagsfeest met 300 man. Mister DJ stemt de muziek af op jouw smaak en zorgt voor een volle dansvloer.",
    gradientTint: "rgba(236,72,153,0.06)",
    usps: [
      "Persoonlijke muziekkeuze afgestemd op jouw smaak",
      "Professionele DJ-booth met sfeervolle lichtshow",
      "Van 30 tot 300 gasten, elke zaalgrootte",
      "Optioneel: fotobooth, saxofonist, LED dansvloer",
      "All-in prijs inclusief op- en afbouw",
    ],
    faqItems: [
      { question: "Wat kost een DJ voor mijn verjaardag?", answer: "Onze pakketten starten vanaf \u20ac695 all-in. De exacte prijs hangt af van het gekozen pakket, eventuele extra\u2019s en de locatie. Vraag vrijblijvend een offerte aan." },
      { question: "Kan ik zelf nummers opgeven?", answer: "Absoluut! Je ontvangt vooraf een persoonlijke vragenlijst waar je je favoriete nummers, genres en eventueel \u2018not-play\u2019 nummers kunt doorgeven." },
      { question: "Hoe vroeg moet ik boeken?", answer: "We raden aan om minimaal 3 maanden van tevoren te boeken, vooral voor weekenden in het voorjaar en najaar." },
    ],
    crossLinks: [
      { href: "/nl/bruiloften", title: "Bruiloften", description: "De complete bruiloftshow met persoonlijk contact en muziek op maat." },
      { href: "/nl/jubileum", title: "Jubileum", description: "Een huwelijksjubileum of ander jubileum met 100% dansgarantie." },
      { href: "/nl/impressies", title: "Impressies", description: "Bekijk sfeerbeelden van feesten verzorgd door Mister DJ." },
    ],
    formEventType: "verjaardag",
  },
  {
    slug: "eindexamenfeest",
    title: "Eindexamenfeest",
    metaTitle: "DJ voor eindexamenfeest | Mister DJ - Geslaagd? Feest!",
    metaDescription: "Net geslaagd voor je eindexamen? Vier het met een knalfeest! Mister DJ zorgt voor de muziek, lichtshow en een onvergetelijke avond. Boek nu!",
    heroLabel: "Eindexamenfeest DJ",
    heroHeading: "Geslaagd? Tijd voor een knalfeest!",
    heroDescription: "Na al dat harde studeren verdien je een feest om nooit te vergeten. Mister DJ zorgt voor de perfecte mix, dikke beats en een lichtshow die je klasgenoten van de vloer blaast.",
    gradientTint: "rgba(34,197,94,0.06)",
    usps: [
      "Actuele hitlijsten en jouw favoriete nummers",
      "Energieke lichtshow die past bij het feest",
      "Ervaring met feesten voor jongeren",
      "Optioneel: rookmachine, laser, LED effecten",
      "Voordelig all-in pakket vanaf \u20ac695",
    ],
    faqItems: [
      { question: "Vanaf welke leeftijd verzorgen jullie feesten?", answer: "We verzorgen feesten voor alle leeftijden, ook voor minderjarigen. We passen de muziek en sfeer aan op de doelgroep." },
      { question: "Kunnen we zelf een playlist maken?", answer: "Ja! Je mag zoveel nummers opgeven als je wilt. We combineren jullie wensen met onze ervaring voor de perfecte mix." },
      { question: "Wat als de locatie nog niet vaststaat?", answer: "Geen probleem. Reserveer alvast jullie datum, de locatiegegevens kunnen later worden aangevuld." },
    ],
    crossLinks: [
      { href: "/nl/verjaardag", title: "Verjaardag", description: "Ook een verjaardagsfeest plannen? Bekijk onze mogelijkheden." },
      { href: "/nl/feesten-overig", title: "Overige feesten", description: "Familiedagen, re\u00FCnies en andere speciale gelegenheden." },
      { href: "/nl/contact", title: "Contact", description: "Neem vrijblijvend contact op of check de beschikbaarheid." },
    ],
    formEventType: "overig",
  },
  {
    slug: "jubileum",
    title: "Jubileum",
    metaTitle: "DJ voor jubileum | Mister DJ - Vier jullie mijlpaal",
    metaDescription: "Huwelijksjubileum, pensioenfeest of bedrijfsjubileum? Mister DJ zorgt voor de perfecte muzikale omlijsting. 15+ jaar ervaring. Vraag vrijblijvend aan!",
    heroLabel: "Jubileum DJ",
    heroHeading: "Vier jullie mijlpaal in stijl",
    heroDescription: "Een 25-jarig huwelijksjubileum, pensioenfeest of bedrijfsjubileum. Elke mijlpaal verdient een feest met de juiste muziek en sfeer. Mister DJ stemt alles persoonlijk af.",
    gradientTint: "rgba(168,85,247,0.06)",
    usps: [
      "Muziek afgestemd op de generatie en smaak",
      "Van achtergrondmuziek tot dansfeest",
      "Ervaring met gemixte gezelschappen (jong en oud)",
      "Sfeervolle verlichting voor een elegante ambiance",
      "Persoonlijk kennismakingsgesprek vooraf",
    ],
    faqItems: [
      { question: "Passen jullie de muziek aan per moment?", answer: "Absoluut. We bouwen de avond op: rustige achtergrondmuziek bij het diner, geleidelijk opbouwen naar het feestgedeelte, en afsluiten met de toppers." },
      { question: "Kunnen jullie ook overdag draaien?", answer: "Ja, we verzorgen ook middagfeesten en recepties. De show wordt volledig aangepast aan het tijdstip en de sfeer." },
      { question: "Hebben jullie ervaring met oudere gasten?", answer: "Zeker! We draaien muziek voor alle leeftijden en weten precies hoe we een gemixte zaal van jong tot oud aan het dansen krijgen." },
    ],
    crossLinks: [
      { href: "/nl/bruiloften", title: "Bruiloften", description: "De complete bruiloftshow met persoonlijk contact." },
      { href: "/nl/bedrijfsfeesten", title: "Bedrijfsfeesten", description: "Professionele DJ voor zakelijke jubilea en events." },
      { href: "/nl/contact", title: "Contact", description: "Neem vrijblijvend contact op of check de beschikbaarheid." },
    ],
    formEventType: "jubileum",
  },
  {
    slug: "kerstfeest",
    title: "Kerstfeest",
    metaTitle: "DJ voor kerstfeest & kerstborrel | Mister DJ",
    metaDescription: "Op zoek naar een DJ voor jullie kerstfeest, kerstborrel of nieuwjaarsreceptie? Mister DJ zorgt voor een feestelijke sfeer. Boek tijdig!",
    heroLabel: "Kerstfeest DJ",
    heroHeading: "De perfecte afsluiting van het jaar",
    heroDescription: "Kerstborrel, kerstdiner, eindejaarsfeest of nieuwjaarsreceptie. Mister DJ zorgt voor de perfecte muzikale omlijsting en een sfeervolle afsluiting van het jaar.",
    gradientTint: "rgba(220,38,38,0.06)",
    usps: [
      "Sfeervolle kerstmuziek \u00e9n dansbare hits",
      "Thematische aankleding met verlichting mogelijk",
      "Ervaring met bedrijfskerstborrels en -diners",
      "Geschikt voor 30 tot 300 personen",
      "Boek tijdig: december is onze drukste maand!",
    ],
    faqItems: [
      { question: "Hoe vroeg moet ik boeken voor een kerstfeest?", answer: "December is onze drukste maand. We raden aan om minimaal 4-6 maanden van tevoren te boeken om teleurstelling te voorkomen." },
      { question: "Verzorgen jullie ook achtergrondmuziek bij het diner?", answer: "Ja! We starten met sfeervolle achtergrondmuziek tijdens het diner en bouwen geleidelijk op naar het feestgedeelte." },
      { question: "Kunnen jullie ook een themafeest verzorgen?", answer: "Absoluut! Denk aan een Winterwonderland, Foute Kersttruien-party, of After Ski-thema. We passen muziek en sfeer aan." },
    ],
    crossLinks: [
      { href: "/nl/bedrijfsfeesten", title: "Bedrijfsfeesten", description: "Professionele DJ voor personeelsfeesten en events." },
      { href: "/nl/verjaardag", title: "Verjaardag", description: "Ook een verjaardagsfeest plannen?" },
      { href: "/nl/contact", title: "Contact", description: "Neem vrijblijvend contact op of check de beschikbaarheid." },
    ],
    formEventType: "overig",
  },
  {
    slug: "carnaval",
    title: "Carnaval",
    metaTitle: "DJ voor carnaval | Mister DJ - Alaaf!",
    metaDescription: "Carnavalsfeest organiseren? Mister DJ uit Veldhoven kent de Brabantse carnavalstradities als geen ander. Van kroegentocht tot carnavalsbal!",
    heroLabel: "Carnaval DJ",
    heroHeading: "Alaaf! Carnaval met Mister DJ",
    heroDescription: "Als echte Brabanders kennen we de carnavalstradities als geen ander. Van een gezellig kroegfeest tot een groot carnavalsbal \u2014 Mister DJ zorgt voor de juiste sfeer en muziek.",
    gradientTint: "rgba(249,115,22,0.06)",
    usps: [
      "Echte Brabantse carnavalsmuziek \u00e9n moderne hits",
      "Ervaring met carnavalsverenigingen en caf\u00e9s",
      "Thematische lichtshow in carnavalskleuren",
      "Van intiem kroegfeest tot groot carnavalsbal",
      "Beschikbaar voor alle drie de dagen",
    ],
    faqItems: [
      { question: "Draaien jullie echte carnavalsmuziek?", answer: "Natuurlijk! We kennen alle Brabantse carnavalskrakers, van klassiekers tot de nieuwste carnavalshits. Gecombineerd met feestmuziek die iedereen kent." },
      { question: "Zijn jullie beschikbaar voor meerdere dagen?", answer: "Ja, we zijn beschikbaar voor alle carnavalsdagen. Boek tijdig want carnaval is populair!" },
      { question: "Kunnen jullie ook buiten draaien?", answer: "Ja, we hebben weerbestendige apparatuur en ervaring met buitenpodia en tentfeesten." },
    ],
    crossLinks: [
      { href: "/nl/feesten-overig", title: "Overige feesten", description: "Bekijk al onze feestmogelijkheden." },
      { href: "/nl/verjaardag", title: "Verjaardag", description: "Ook een verjaardagsfeest plannen?" },
      { href: "/nl/contact", title: "Contact", description: "Neem vrijblijvend contact op of check de beschikbaarheid." },
    ],
    formEventType: "overig",
  },
];

export function getEventTypeBySlug(slug: string): EventType | undefined {
  return eventTypes.find((e) => e.slug === slug);
}
