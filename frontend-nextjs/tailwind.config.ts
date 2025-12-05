import type { Config } from 'tailwindcss';

const designTokens = {
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

const borderRadius = {
  xs: '0.25rem',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  pill: '999px',
  card: '1.25rem',
};

const boxShadow = {
  subtle: '0 1px 2px 0 rgba(26, 44, 75, 0.06), 0 1px 3px 1px rgba(26, 44, 75, 0.08)',
  soft: '0 12px 30px -12px rgba(0, 174, 239, 0.25)',
  strong: '0 20px 45px -15px rgba(26, 44, 75, 0.35)',
  focus: '0 0 0 4px rgba(0, 174, 239, 0.35)',
};

const additionalSpacing = {
  gutter: 'clamp(1.5rem, 3vw, 3rem)',
  'section-sm': 'clamp(3rem, 6vw, 4.5rem)',
  'section-lg': 'clamp(4.5rem, 8vw, 6.5rem)',
};

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: 'clamp(1.5rem, 4vw, 2.5rem)',
        lg: 'clamp(2rem, 5vw, 3.5rem)',
        '2xl': 'clamp(2.5rem, 6vw, 4.5rem)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: designTokens.colors,
      spacing: {
        ...designTokens.spacing,
        ...additionalSpacing,
      },
      borderRadius,
      boxShadow,
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        h1: '48px',
        h2: '36px',
        h3: '28px',
        h4: '20px',
        h5: '16px',
        bodyLarge: '18px',
        body: '16px',
        small: '14px',
        caption: '12px',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      lineHeight: {
        tight: '110%',
        snug: '120%',
        normal: '150%',
        relaxed: '160%',
      },
    },
  },
  plugins: [],
};

export default config;
