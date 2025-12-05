export type CityRegion = 'north' | 'east' | 'south' | 'west' | 'middle';

export interface City {
  slug: string;
  name: string;
  province: string;
  region: CityRegion;
}

