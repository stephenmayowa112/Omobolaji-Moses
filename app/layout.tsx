import type {Metadata} from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Omobolaji Moses',
  description: 'Portfolio of Omobolaji Moses, Producer and Director',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-black font-sans antialiased selection:bg-neutral-200" suppressHydrationWarning>
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
