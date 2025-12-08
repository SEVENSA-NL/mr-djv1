/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Mister DJ - Premium DJ Services voor Bruiloften & Feesten',
  description:
    'Professionele DJ services voor bruiloften, bedrijfsfeesten en private events in Nederland. Mister DJ zorgt voor het perfecte muziekprogramma voor jouw speciale moment.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://mister-dj.nl',
    siteName: 'Mister DJ',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
