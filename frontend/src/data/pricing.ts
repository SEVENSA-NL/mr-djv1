export interface Package {
  id: 'brons' | 'zilver' | 'goud';
  name: string;
  basePrice: number;
  description: string;
  recommended?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  popular?: boolean;
}

export const PACKAGES: Package[] = [
  {
    id: 'brons',
    name: 'Brons Pakket',
    basePrice: 850,
    description: 'Perfect voor kleine feesten tot 80 gasten',
  },
  {
    id: 'zilver',
    name: 'Zilver Pakket',
    basePrice: 1350,
    description: 'Meest gekozen voor bruiloften 80-150 gasten',
    recommended: true,
  },
  {
    id: 'goud',
    name: 'Goud Pakket',
    basePrice: 2000,
    description: 'Premium pakket voor grote events 150+ gasten',
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'led-floor',
    name: 'LED Dansvloer',
    price: 450,
    description: 'Verlichte dansvloer 4x4m',
    popular: true,
  },
  {
    id: 'photobooth',
    name: 'Photobooth',
    price: 350,
    description: 'Inclusief prints en props',
    popular: true,
  },
  {
    id: 'co2-cannons',
    name: 'CO2 Cannons',
    price: 200,
    description: '2 cannons + CO2 tanks',
  },
  {
    id: 'live-sax',
    name: 'Live Saxofoon (extra uur)',
    price: 300,
    description: 'Extra uur live saxofoon',
    popular: true,
  },
  {
    id: 'uplighting',
    name: 'Venue Uplighting',
    price: 250,
    description: '12 LED uplights voor venue',
  },
  {
    id: 'love-letters',
    name: 'Love Letters',
    price: 150,
    description: 'Verlichte LOVE letters 1.2m',
  },
];
