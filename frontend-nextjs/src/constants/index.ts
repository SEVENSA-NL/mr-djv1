export const APP_NAME = 'Mister DJ';
export const APP_DESCRIPTION = 'Premium DJ Services voor Bruiloften, Bedrijfsfeesten & Events';

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const PHONE_NUMBER = '+31 6 XXXXXXXX';
export const EMAIL = 'info@mister-dj.nl';

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/misterdj',
  instagram: 'https://instagram.com/misterdj',
  tiktok: 'https://tiktok.com/@misterdj',
  youtube: 'https://youtube.com/@misterdj',
};

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/diensten', label: 'Diensten' },
  { href: '/about', label: 'Over Ons' },
  { href: '/contact', label: 'Contact' },
];

export const DESIGN_TOKENS = {
  colors: {
    primary: '#00AEEF',
    'primary-dark': '#0096D6',
    secondary: '#D4AF37',
    'neutral-dark': '#1A2C4B',
    'neutral-light': '#FFFFFF',
    'neutral-gray-100': '#F3F4F6',
    'neutral-gray-300': '#D1D5DB',
    'neutral-gray-500': '#6B7280',
    'semantic-success': '#4CAF50',
    'semantic-error': '#FF4D4D',
    'semantic-warning': '#FFC107',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
};
