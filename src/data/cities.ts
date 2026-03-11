export interface CityData {
  slug: string;
  name: string;
  region: string;
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
    description:
      "Veldhoven, onze thuisbasis in het hart van de Brainport-regio, is waar het allemaal begon. Met korte lijnen en lokale bekendheid verzorgt Mister DJ hier al jarenlang de mooiste feesten. Van Het Gastenhuis tot Restaurant & Partycentrum Lucius — wij kennen elke locatie.",
    venues: ["Het Gastenhuis", "Koetshuis", "Restaurant & Partycentrum Lucius"],
    metaTitle: "DJ in Veldhoven - Mister DJ | 100% Dansgarantie",
    metaDescription:
      "Op zoek naar een DJ in Veldhoven? Mister DJ verzorgt bruiloften, bedrijfsfeesten en events in Veldhoven en omgeving. Vraag nu de beschikbaarheid aan.",
    nearby: ["eindhoven", "helmond", "weert"],
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
