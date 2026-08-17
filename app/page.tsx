import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';

export default function Home() {
  // Show only the first 3 projects on the home page as per mockup
  const homeProjects = projects.slice(0, 3);

  // Structured Data (JSON-LD) for Person & Portfolio Website
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Omobolaji Moses',
    jobTitle: 'Producer & Director',
    url: 'https://omobolajimoses.com',
    image: 'https://omobolajimoses.com/images/omobolaji-profile.png',
    sameAs: [],
    knowsAbout: [
      '3D Animation',
      'Film Direction',
      'Film Production',
      'Storytelling',
    ],
    workExample: homeProjects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      url: `https://omobolajimoses.com/work/${p.slug}`,
      image: `https://omobolajimoses.com${p.posterImage}`,
    })),
  };

  return (
    <>
      {/* JSON-LD for Search Engine Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Accessible H1 for SEO Hierarchy */}
      <h1 className="sr-only">
        Omobolaji Moses — Producer & Director Portfolio
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 w-full mt-4">
        {homeProjects.map((project, index) => (
          <Link 
            key={project.slug} 
            href={`/work/${project.slug}`}
            className="group block relative w-full aspect-[2/3] overflow-hidden bg-neutral-100 flex items-center justify-center p-4 text-center focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none rounded-sm"
            aria-label={`View ${project.title} project details`}
          >
            <span className="text-neutral-400 font-mono text-sm absolute z-0">
              {project.posterImage.replace('/images/', '').replace('/', '')}
            </span>
            <Image
              src={project.posterImage}
              alt={`${project.title} - Official Poster`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 z-10"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index === 0}
              referrerPolicy="no-referrer"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-20" />
          </Link>
        ))}
      </div>
    </>
  );
}
