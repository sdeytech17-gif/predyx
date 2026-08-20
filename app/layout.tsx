import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { GSAPProvider } from '@/app/components/motion/GSAPProvider';
import { ScrollProgress } from '@/app/components/ui/ScrollProgress/ScrollProgress';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PREDYX — Precision Human Performance',
  description: 'A cinematic, technology-driven fitness and wellness platform engineered for elite exercise education, dynamic biomechanics, and intelligent performance tracking.',
  keywords: [
    'fitness',
    'hypertrophy',
    'powerbuilding',
    'biomechanics',
    'exercise education',
    'performance tracking',
    'strength training',
    'periodization'
  ],
  authors: [{ name: 'PREDYX Performance Labs' }],
  metadataBase: new URL('https://predyx.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PREDYX — Precision Human Performance',
    description: 'A cinematic, technology-driven fitness and wellness platform engineered for elite exercise education, dynamic biomechanics, and intelligent performance tracking.',
    url: 'https://predyx.app',
    siteName: 'PREDYX',
    images: [
      {
        url: '/images/predyx_hero_marketing_1787037328660.jpg',
        width: 1920,
        height: 1080,
        alt: 'PREDYX — Precision Human Performance',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PREDYX — Precision Human Performance',
    description: 'Cinematic fitness & biomechanic education platform.',
    images: ['/images/predyx_hero_marketing_1787037328660.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08090a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <GSAPProvider>
          <ScrollProgress />
          {children}
        </GSAPProvider>
      </body>
    </html>
  );
}
