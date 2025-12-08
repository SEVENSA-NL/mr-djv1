import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mr. DJ',
  description: 'DJ + Sax that packs your dance floor in two tracks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
