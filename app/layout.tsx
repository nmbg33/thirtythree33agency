import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'thirtythree - Brand Building Agency Belgrade',
  description: 'Strategic brand building, cutting-edge web development, and growth-driven ideas that transform businesses into market leaders. Belgrade-based creative agency.',
  keywords: ['brand building', 'web development', 'marketing agency', 'Belgrade', 'Serbia', 'growth strategy'],
  authors: [{ name: 'thirtythree' }],
  openGraph: {
    title: 'thirtythree - Brand Building Agency Belgrade',
    description: 'Strategic brand building, cutting-edge web development, and growth-driven ideas that transform businesses into market leaders.',
    url: 'https://thirtythree.rs',
    siteName: 'thirtythree',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'thirtythree - Brand Building Agency Belgrade',
    description: 'Strategic brand building, cutting-edge web development, and growth-driven ideas that transform businesses into market leaders.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
