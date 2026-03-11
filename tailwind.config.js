/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['var(--font-script)', 'Georgia', 'serif'],
      },
      colors: {
        /* Brand gold palette based on mr-dj.nl #f9b537 */
        yellow: {
          50: '#fef9eb',
          100: '#fdf0cc',
          200: '#fbe199',
          300: '#fad266',
          400: '#f9b537',
          500: '#e89f1c',
          600: '#c47f14',
          700: '#a06112',
          800: '#7d4b14',
          900: '#5c3812',
          950: '#351d08',
        },
        'mrdj-bg': '#FFFFFF',
        'mrdj-surface': '#F9FAFB',
        'mrdj-surface-alt': '#F3F4F6',
        'mrdj-gold': '#f9b537',
        'mrdj-gold-light': '#fad266',
        'mrdj-gold-soft': '#fef9eb',
        'mrdj-text': '#1A1A2E',
        'mrdj-text-secondary': '#4B5563',
        'mrdj-text-muted': '#9CA3AF',
        'mrdj-blue': '#1E40AF',
        'mrdj-blue-light': '#3B82F6',
        'mrdj-error': '#DC2626',
        'mrdj-success': '#16A34A',
        'mrdj-warning': '#D97706',
        'mrdj-navy': '#1a2744',
        'mrdj-navy-light': '#243352',
        'mrdj-navy-dark': '#111c30',
        'mrdj-border': 'rgba(0,0,0,0.08)',
      },
      zIndex: {
        'header': '50',
        'mobile-menu': '40',
        'overlay': '30',
        'scroll-top': '20',
        'tooltip': '60',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
};
