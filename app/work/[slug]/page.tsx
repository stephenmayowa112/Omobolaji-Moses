import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = `${project.title} | Omobolaji Moses`;
  const description = project.description[0] || `Explore ${project.title}, directed by Omobolaji Moses.`;
  const shareImage = project.heroImage || project.posterImage;
  const url = `https://omobolajimoses.com/work/${project.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'Omobolaji Moses Portfolio',
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: `${project.title} Banner`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shareImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: project.title,
    description: project.description.join(' '),
    director: {
      '@type': 'Person',
      name: 'Omobolaji Peter Moses',
    },
    image: `https://omobolajimoses.com${project.posterImage}`,
    url: `https://omobolajimoses.com/work/${project.slug}`,
    genre: project.details.Genre || 'Animated Film',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="w-full flex flex-col gap-8 sm:gap-12 md:gap-16 pb-8 sm:pb-12">
        {/* Hero Banner */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-neutral-900 overflow-hidden flex items-center justify-center p-4 text-center rounded-sm">
          <span className="text-neutral-500 font-mono text-sm absolute z-0">
            {project.heroImage.replace('/images/', '').replace('/', '')}
          </span>
          <Image
            src={project.heroImage}
            alt={`${project.title} - Official Hero Banner`}
            fill
            className="object-cover opacity-80 z-10"
            priority
            sizes="100vw"
            referrerPolicy="no-referrer"
          />
          {/* Optional Project Logo Overlay */}
          {project.logoImage && (
            <div className="relative z-20 w-[60%] sm:w-[50%] md:w-[40%] max-w-[500px]">
              <Image
                src={project.logoImage}
                alt={`${project.title} Logo`}
                width={800}
                height={400}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {/* Poster Column */}
          <div className="w-full md:w-[40%] lg:w-[35%] shrink-0">
            <div className="relative w-full aspect-[2/3] bg-neutral-100 overflow-hidden shadow-lg flex items-center justify-center p-4 text-center rounded-sm">
              <span className="text-neutral-400 font-mono text-sm absolute z-0">
                {project.posterImage.replace('/images/', '').replace('/', '')}
              </span>
              <Image
                src={project.posterImage}
                alt={`${project.title} - Movie Poster`}
                fill
                className="object-cover z-10"
                sizes="(max-width: 768px) 100vw, 35vw"
                priority
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
            <dl className="flex flex-col gap-1 text-sm md:text-base text-neutral-600 mb-8">
              {Object.entries(project.details).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <dt className="font-semibold text-neutral-800">{key}:</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

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
            <dl className="mt-4 flex flex-col gap-4 text-sm md:text-base">
              {Object.entries(project.credits).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-bold text-neutral-900">{key}</dt>
                  <dd className="text-neutral-700">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-8" aria-label={`${project.title} Gallery`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {project.gallery.map((image, i) => (
                <figure key={i} className="flex flex-col items-center gap-4">
                  <div className="relative w-full aspect-video bg-neutral-100 overflow-hidden flex items-center justify-center p-4 text-center rounded-sm">
                    <span className="text-neutral-400 font-mono text-sm absolute z-0">
                      {image.replace('/images/', '').replace('/', '')}
                    </span>
                    <Image
                      src={image}
                      alt={`${project.title} - Gallery Still ${i + 1}`}
                      fill
                      className="object-cover z-10"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <figcaption className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
                    {i === 0 && project.slug === 'seasonlings' ? 'Watch the Official Teaser' : 'Gallery'}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
