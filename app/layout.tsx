import type {Metadata} from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Omobolaji Moses',
  description: 'Portfolio of Omobolaji Moses, Producer and Director',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col bg-white text-black antialiased selection:bg-neutral-200 ${poppins.variable} font-poppins`} suppressHydrationWarning>
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
