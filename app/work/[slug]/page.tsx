import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';

// Optional: for static generation if needed later
// export function generateStaticParams() {
//   return projects.map((p) => ({ slug: p.slug }));
// }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Not Found' };
  return { title: `${project.title} | Omobolaji Moses` };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12 md:gap-16 pb-8 sm:pb-12">
      {/* Hero Banner */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-neutral-900 overflow-hidden flex items-center justify-center p-4 text-center">
        <span className="text-neutral-500 font-mono text-sm absolute z-0">{project.heroImage.replace('/', '')}</span>
        <Image
          src={project.heroImage}
          alt={project.heroImage.replace('/', '')}
          fill
          className="object-cover opacity-80 z-10"
          priority
          sizes="100vw"
          referrerPolicy="no-referrer"
        />
        {/* We can overlay a title here if we want, but mockups just show the image with title embedded in image. We'll leave it as just image. */}
      </div>

      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16">
        {/* Poster Column */}
        <div className="w-full md:w-[40%] lg:w-[35%] shrink-0">
          <div className="relative w-full aspect-[2/3] bg-neutral-100 overflow-hidden shadow-lg flex items-center justify-center p-4 text-center">
            <span className="text-neutral-400 font-mono text-sm absolute z-0">{project.posterImage.replace('/', '')}</span>
            <Image
              src={project.posterImage}
              alt={project.posterImage.replace('/', '')}
              fill
              className="object-cover z-10"
              sizes="(max-width: 768px) 100vw, 35vw"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Info Column */}
        <div className="w-full md:w-[60%] lg:w-[65%] flex flex-col pt-2 md:pt-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4 sm:mb-6">
            {project.title}
          </h1>

          {/* Details */}
          <div className="flex flex-col gap-1 text-sm md:text-base text-neutral-600 mb-8">
            {Object.entries(project.details).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
          </div>

          {/* Description */}
          {project.descriptionHeading && (
            <h2 className="text-xl font-bold mb-4">{project.descriptionHeading}</h2>
          )}
          
          <div className="flex flex-col gap-4 text-sm md:text-base text-neutral-800 leading-relaxed mb-8">
            {project.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Credits */}
          <div className="mt-4 flex flex-col gap-4 text-sm md:text-base">
            {Object.entries(project.credits).map(([key, value]) => (
              <div key={key}>
                <p className="font-bold">{key}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {project.gallery.map((image, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                 <div className="relative w-full aspect-video bg-neutral-100 overflow-hidden flex items-center justify-center p-4 text-center">
                  <span className="text-neutral-400 font-mono text-sm absolute z-0">{image.replace('/', '')}</span>
                  <Image
                    src={image}
                    alt={image.replace('/', '')}
                    fill
                    className="object-cover z-10"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xs text-neutral-500 uppercase tracking-widest">
                  {i === 0 && project.slug === 'seasonlings' ? 'Watch the Official Teaser' : 'Gallery'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
