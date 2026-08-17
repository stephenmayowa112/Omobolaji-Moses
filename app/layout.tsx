import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = 'https://omobolajimoses.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Omobolaji Moses | Producer & Director',
    template: '%s | Omobolaji Moses',
  },
  description:
    'Official portfolio of Omobolaji Moses — 3D animator, producer, and film director. Creator of REMEMBER ME, NEW AGE, SEASONLINGS, and THAMES.',
  keywords: [
    'Omobolaji Moses',
    'Omobolaji Peter Moses',
    'Producer',
    'Director',
    '3D Animator',
    'Animation Director',
    'Remember Me',
    'New Age',
    'Seasonlings',
    'Thames',
    'African Animation',
    'Short Film',
    'Feature Film',
  ],
  authors: [{ name: 'Omobolaji Moses', url: siteUrl }],
  creator: 'Omobolaji Moses',
  publisher: 'Omobolaji Moses',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Omobolaji Moses Portfolio',
    title: 'Omobolaji Moses | Producer & Director',
    description:
      'Official portfolio of Omobolaji Moses — 3D animator, producer, and film director. Creator of REMEMBER ME, NEW AGE, SEASONLINGS, and THAMES.',
    images: [
      {
        url: '/images/omobolaji-profile.png',
        width: 800,
        height: 1000,
        alt: 'Omobolaji Moses - Producer & Director',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omobolaji Moses | Producer & Director',
    description:
      'Official portfolio of Omobolaji Moses — 3D animator, producer, and film director.',
    images: ['/images/omobolaji-profile.png'],
    creator: '@omobolajimoses',
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
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} min-h-screen flex flex-col bg-white text-black antialiased selection:bg-neutral-200`}
        suppressHydrationWarning
      >
        {/* Skip Link for Keyboard & Screen Reader Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-black focus:text-white focus:font-medium focus:rounded-md focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>
        
        <Header />
        <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
