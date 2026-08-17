import Image from 'next/image';
import { bioText } from '@/lib/data';

export const metadata = {
  title: 'About | Omobolaji Moses',
};

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col pt-8">
      <h1 className="text-xl tracking-wide uppercase mb-6 sm:mb-8 md:mb-12">BIO</h1>
      
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
        <div className="w-full md:w-[280px] lg:w-[350px] shrink-0">
          <div className="relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden flex items-center justify-center p-4 text-center">
            <span className="text-neutral-400 font-mono text-sm absolute z-0">omobolaji-profile.png</span>
            <Image
              src="/images/omobolaji-profile.png"
              alt="omobolaji-profile.png"
              fill
              className="object-cover z-10"
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
