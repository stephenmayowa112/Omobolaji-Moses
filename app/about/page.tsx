import Image from 'next/image';
import { Metadata } from 'next';
import { bioText } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Omobolaji Moses — 3D animator, producer, and director known for leading global collaboration on NEW AGE and directing REMEMBER ME.',
  openGraph: {
    title: 'About | Omobolaji Moses',
    description:
      'Learn about Omobolaji Moses — 3D animator, producer, and director known for leading global collaboration on NEW AGE and directing REMEMBER ME.',
    url: 'https://omobolajimoses.com/about',
    images: [
      {
        url: '/images/omobolaji-profile.png',
        width: 800,
        height: 1000,
        alt: 'Omobolaji Moses Profile Picture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Omobolaji Moses',
    description:
      'Learn about Omobolaji Moses — 3D animator, producer, and director.',
    images: ['/images/omobolaji-profile.png'],
  },
  alternates: {
    canonical: 'https://omobolajimoses.com/about',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Omobolaji Moses',
      jobTitle: 'Producer & Director',
      description: bioText.join(' '),
      image: 'https://omobolajimoses.com/images/omobolaji-profile.png',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full flex flex-col pt-8">
        <h1 className="text-xl tracking-wide uppercase mb-6 sm:mb-8 md:mb-12 font-bold">BIO</h1>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="w-full md:w-[280px] lg:w-[350px] shrink-0">
            <div className="relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden flex items-center justify-center p-4 text-center rounded-sm">
              <span className="text-neutral-400 font-mono text-sm absolute z-0">omobolaji-profile.png</span>
              <Image
                src="/images/omobolaji-profile.png"
                alt="Omobolaji Moses - Producer and Director"
                fill
                className="object-cover z-10"
                sizes="(max-width: 768px) 100vw, 350px"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6 text-sm md:text-base text-neutral-800 leading-relaxed max-w-2xl">
            {bioText.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
