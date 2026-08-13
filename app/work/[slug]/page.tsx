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
    <div className="w-full flex flex-col gap-12 md:gap-16 pb-12">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] bg-neutral-900 overflow-hidden">
        <Image
          src={project.heroImage}
          alt={`${project.title} banner`}
          fill
          className="object-cover opacity-80"
          priority
          sizes="100vw"
          referrerPolicy="no-referrer"
        />
        {/* We can overlay a title here if we want, but mockups just show the image with title embedded in image. We'll leave it as just image. */}
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Poster Column */}
        <div className="w-full md:w-[35%] shrink-0">
          <div className="relative w-full aspect-[2/3] bg-neutral-100 overflow-hidden shadow-lg">
            <Image
              src={project.posterImage}
              alt={`${project.title} poster`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Info Column */}
        <div className="w-full md:w-[65%] flex flex-col pt-2 md:pt-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((image, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                 <div className="relative w-full aspect-video bg-neutral-100 overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} gallery ${i + 1}`}
                    fill
                    className="object-cover"
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
