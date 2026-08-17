import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';

export default function Home() {
  // Show only the first 3 projects on the home page as per mockup
  const homeProjects = projects.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 w-full mt-4">
      {homeProjects.map((project) => (
        <Link 
          key={project.slug} 
          href={`/work/${project.slug}`}
          className="group block relative w-full aspect-[2/3] overflow-hidden bg-neutral-100 flex items-center justify-center p-4 text-center"
        >
          <span className="text-neutral-400 font-mono text-sm absolute z-0">
            {project.posterImage.replace('/', '')}
          </span>
          <Image
            src={project.posterImage}
            alt={project.posterImage.replace('/', '')}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 z-10"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Subtle overlay on hover if desired */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-20" />
        </Link>
      ))}
    </div>
  );
}
