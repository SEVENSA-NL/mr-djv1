import type { City, CityRegion } from '@/types/city';

export const cities: City[] = [
  // South (Zuid)
  {
    slug: 'eindhoven',
    name: 'Eindhoven',
    province: 'Noord-Brabant',
    region: 'south',
  },
  {
    slug: 'tilburg',
    name: 'Tilburg',
    province: 'Noord-Brabant',
    region: 'south',
  },
  {
    slug: 'breda',
    name: 'Breda',
    province: 'Noord-Brabant',
    region: 'south',
  },
  {
    slug: 'maastricht',
    name: 'Maastricht',
    province: 'Limburg',
    region: 'south',
  },
  {
    slug: 'venlo',
    name: 'Venlo',
    province: 'Limburg',
    region: 'south',
  },
  // West
  {
    slug: 'amsterdam',
    name: 'Amsterdam',
    province: 'Noord-Holland',
    region: 'west',
  },
  {
    slug: 'rotterdam',
    name: 'Rotterdam',
    province: 'Zuid-Holland',
    region: 'west',
  },
  {
    slug: 'den-haag',
    name: 'Den Haag',
    province: 'Zuid-Holland',
    region: 'west',
  },
  {
    slug: 'haarlem',
    name: 'Haarlem',
    province: 'Noord-Holland',
    region: 'west',
  },
  // Middle
  {
    slug: 'utrecht',
    name: 'Utrecht',
    province: 'Utrecht',
    region: 'middle',
  },
  {
    slug: 'amersfoort',
    name: 'Amersfoort',
    province: 'Utrecht',
    region: 'middle',
  },
  // North
  {
    slug: 'groningen',
    name: 'Groningen',
    province: 'Groningen',
    region: 'north',
  },
  {
    slug: 'leeuwarden',
    name: 'Leeuwarden',
    province: 'Friesland',
    region: 'north',
  },
  // East
  {
    slug: 'arnhem',
    name: 'Arnhem',
    province: 'Gelderland',
    region: 'east',
  },
  {
    slug: 'nijmegen',
    name: 'Nijmegen',
    province: 'Gelderland',
    region: 'east',
  },
];

export function getCitiesByRegion(region: CityRegion): City[] {
  return cities.filter((city) => city.region === region);
}

export function getCitiesByProvince(province: string): City[] {
  return cities.filter((city) => city.province === province);
}

export function getAllCitySlugs(): string[] {
  return cities.map((city) => city.slug);
}

