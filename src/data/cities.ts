export interface CityData {
  slug: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  description: string;
  venues: string[];
  metaTitle: string;
  metaDescription: string;
  nearby: string[];
}

export const cities: CityData[] = [
  {
    slug: "eindhoven",
    name: "Eindhoven",
    region: "Noord-Brabant",
    latitude: 51.4416,
    longitude: 5.4697,
    description:
      "Eindhoven, de bruisende technologiestad van het zuiden, is de perfecte plek voor een onvergetelijk feest. Of het nu gaat om een bruiloft in het iconische Evoluon, een bedrijfsfeest in het industriële Klokgebouw of een knalfeest in De Effenaar — Mister DJ kent de stad en haar locaties als geen ander.",
    venues: ["Evoluon", "Klokgebouw", "De Effenaar", "Royal Hotel Eindhoven"],
    metaTitle: "DJ in Eindhoven - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Eindhoven? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Eindhoven en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["veldhoven", "helmond", "tilburg"],
  },
  {
    slug: "tilburg",
    name: "Tilburg",
    region: "Noord-Brabant",
    latitude: 51.5555,
    longitude: 5.0913,
    description:
      "Tilburg, de gezelligste stad van Brabant, biedt prachtige locaties voor elk type feest. Van een intieme bruiloft bij De Postelse Hoeve tot een groots evenement in de Stadsschouwburg — Mister DJ zorgt overal voor een volle dansvloer.",
    venues: ["De Postelse Hoeve", "Brasserie Het Witte Kasteel", "Stadsschouwburg Tilburg"],
    metaTitle: "DJ in Tilburg - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Tilburg? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Tilburg en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["breda", "eindhoven", "den-bosch"],
  },
  {
    slug: "den-bosch",
    name: "Den Bosch",
    region: "Noord-Brabant",
    latitude: 51.6978,
    longitude: 5.3037,
    description:
      "Den Bosch, de historische hoofdstad van Noord-Brabant, heeft een rijke keuze aan sfeervolle feestlocaties. Van het Theater aan de Parade in het hartje van de stad tot de groene omgeving van Villa Augustus — Mister DJ maakt van elk evenement een succes.",
    venues: ["Theater aan de Parade", "Villa Augustus", "Hotel & Partycentrum De Druiventros"],
    metaTitle: "DJ in Den Bosch - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Den Bosch? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Den Bosch en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["tilburg", "eindhoven", "helmond"],
  },
  {
    slug: "breda",
    name: "Breda",
    region: "Noord-Brabant",
    latitude: 51.5719,
    longitude: 4.7683,
    description:
      "Breda, de parel van West-Brabant, staat bekend om haar bruisende uitgaansleven en prachtige feestlocaties. Van het indrukwekkende Chassé Theater tot gezellige partycentra — Mister DJ brengt de perfecte sfeer voor jullie feest in Breda.",
    venues: ["Chassé Theater", "De Stadhouder", "Hotel & Partycentrum Breda"],
    metaTitle: "DJ in Breda - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Breda? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Breda en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["tilburg", "den-bosch", "eindhoven"],
  },
  {
    slug: "helmond",
    name: "Helmond",
    region: "Noord-Brabant",
    latitude: 51.4758,
    longitude: 5.6611,
    description:
      "Helmond, de dynamische stad in Oost-Brabant, biedt unieke locaties voor elk feest. Van de creatieve sfeer in De Cacaofabriek tot het stijlvolle Grand Café Het Paleis — Mister DJ zorgt voor onvergetelijke momenten in Helmond.",
    venues: ["De Cacaofabriek", "Grand Café Het Paleis", "Commanderij College"],
    metaTitle: "DJ in Helmond - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Helmond? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Helmond en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["eindhoven", "veldhoven", "den-bosch"],
  },
  {
    slug: "weert",
    name: "Weert",
    region: "Limburg",
    latitude: 51.2517,
    longitude: 5.7067,
    description:
      "Weert, gelegen op de grens van Brabant en Limburg, combineert Brabantse gezelligheid met Limburgse gastvrijheid. Van het sfeervolle Munttheater tot het historische Kasteel Daelenbroeck — Mister DJ maakt van elk feest in Weert een succes.",
    venues: ["Het Munttheater", "De Fatima", "Kasteel Daelenbroeck"],
    metaTitle: "DJ in Weert - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Weert? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Weert en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["eindhoven", "helmond", "veldhoven"],
  },
  {
    slug: "veldhoven",
    name: "Veldhoven",
    region: "Noord-Brabant",
    latitude: 51.4200,
    longitude: 5.3850,
    description:
      "Veldhoven, onze thuisbasis in het hart van de Brainport-regio, is waar het allemaal begon. Met korte lijnen en lokale bekendheid verzorgt Mister DJ hier al jarenlang de mooiste feesten. Van Het Gastenhuis tot Restaurant & Partycentrum Lucius — wij kennen elke locatie.",
    venues: ["Het Gastenhuis", "Koetshuis", "Restaurant & Partycentrum Lucius"],
    metaTitle: "DJ in Veldhoven - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Veldhoven? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Veldhoven en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["eindhoven", "helmond", "weert"],
  },
  {
    slug: "oss",
    name: "Oss",
    region: "Noord-Brabant",
    latitude: 51.7650,
    longitude: 5.5183,
    description:
      "Oss, de gastvrije stad in het noordoosten van Brabant, biedt prachtige locaties voor elk type feest. Van het stijlvolle Theater de Lievekamp tot sfeervolle partycentra — Mister DJ brengt de perfecte sfeer in Oss en omgeving.",
    venues: ["Theater de Lievekamp", "De Rusheuvel", "Het Vliegend Hert"],
    metaTitle: "DJ in Oss - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Oss? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Oss en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["den-bosch", "eindhoven", "helmond"],
  },
  {
    slug: "roosendaal",
    name: "Roosendaal",
    region: "Noord-Brabant",
    latitude: 51.5308,
    longitude: 4.4567,
    description:
      "Roosendaal, de levendige stad in West-Brabant, heeft een divers aanbod aan feestlocaties. Van het moderne Stadskantoor tot gezellige zalen — Mister DJ verzorgt al jaren succesvolle feesten in Roosendaal en de regio.",
    venues: ["De Stok", "Theater De Kring", "De Heerlijckheijd"],
    metaTitle: "DJ in Roosendaal - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Roosendaal? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Roosendaal en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["breda", "tilburg", "den-bosch"],
  },
  {
    slug: "waalwijk",
    name: "Waalwijk",
    region: "Noord-Brabant",
    latitude: 51.6833,
    longitude: 5.0667,
    description:
      "Waalwijk, gelegen in de Langstraat tussen Tilburg en Den Bosch, biedt unieke locaties voor feesten. Van het sfeervolle Schoenfabriek tot gezellige restaurants — Mister DJ zorgt voor een onvergetelijk feest.",
    venues: ["De Schoenfabriek", "De Twee Kolommen", "Partycentrum De Loonse Hof"],
    metaTitle: "DJ in Waalwijk - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Waalwijk? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Waalwijk en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["tilburg", "den-bosch", "breda"],
  },
  {
    slug: "best",
    name: "Best",
    region: "Noord-Brabant",
    latitude: 51.5100,
    longitude: 5.3900,
    description:
      "Best, gelegen tussen Eindhoven en Oirschot, combineert natuur met bereikbaarheid. Van het populaire 'T Boshuys tot Beachclub Sunrise bij Aquabest — Mister DJ kent de locaties en zorgt voor het perfecte feest.",
    venues: ["'T Boshuys", "Beachclub Sunrise Aquabest", "De Boshut"],
    metaTitle: "DJ in Best - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Best? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Best en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["eindhoven", "veldhoven", "tilburg"],
  },
  {
    slug: "oirschot",
    name: "Oirschot",
    region: "Noord-Brabant",
    latitude: 51.5000,
    longitude: 5.3100,
    description:
      "Oirschot, het monumentale dorp aan de rand van de Kampina, staat bekend om kastelen en sfeervolle locaties. Van het indrukwekkende Kasteel Bijstervelt tot landelijke hoeves — Mister DJ maakt van elk feest in Oirschot een succes.",
    venues: ["Kasteel Bijstervelt", "De Beurs", "Herberg Sint-Petrus"],
    metaTitle: "DJ in Oirschot - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Oirschot? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Oirschot en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["eindhoven", "veldhoven", "best"],
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
