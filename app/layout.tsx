import './globals.css';
import type { Metadata } from 'next';
import { Rajdhani } from 'next/font/google';
import Providers from '@/components/Providers';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ultrawares — Ultra Solutions',
  description: 'Ultrawares provides cutting-edge solutions for businesses wanting to optimize their operations and gain a competitive edge.',
  openGraph: {
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={rajdhani.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap"
        />
        {/* Ethnocentric via CDN fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/ethnocentric"
        />
      </head>
      <body className="font-rajdhani antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
