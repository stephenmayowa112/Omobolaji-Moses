import Image from 'next/image';
import { bioText } from '@/lib/data';

export const metadata = {
  title: 'About | Omobolaji Moses',
};

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col pt-8">
      <h1 className="text-xl tracking-wide uppercase mb-8 md:mb-12">BIO</h1>
      
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        <div className="w-full md:w-[350px] shrink-0">
          <div className="relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden">
            <Image
              src="https://picsum.photos/seed/omobolaji/600/750"
              alt="Omobolaji Moses"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 350px"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-6 text-sm md:text-base text-gray-800 leading-relaxed max-w-2xl">
          {bioText.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
