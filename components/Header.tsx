'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { projects } from '@/lib/data';

export default function Header() {
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const pathname = usePathname();

  // Close dropdown on route change
  useEffect(() => {
    setIsWorkOpen(false);
  }, [pathname]);

  return (
    <header className="w-full py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center bg-white z-50 relative">
      <Link href="/" className="text-3xl md:text-4xl tracking-tight mb-6 md:mb-0">
        Omobolaji Moses
      </Link>
      
      <nav className="flex items-center gap-6 md:gap-10 text-sm font-medium tracking-wide">
        <div 
          className="relative group"
          onMouseEnter={() => setIsWorkOpen(true)}
          onMouseLeave={() => setIsWorkOpen(false)}
        >
          <button 
            className="uppercase hover:text-gray-600 transition-colors pb-2"
            onClick={() => setIsWorkOpen(!isWorkOpen)}
          >
            Work
          </button>
          
          {/* Dropdown menu */}
          <div 
            className={`absolute top-full left-0 md:left-auto md:right-0 w-48 bg-[#1e1e1e] text-white py-2 shadow-xl transition-all duration-200 origin-top z-50 ${
              isWorkOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
            }`}
          >
            {projects.map((project) => (
              <Link 
                key={project.slug} 
                href={`/work/${project.slug}`}
                className="block px-6 py-3 hover:bg-[#ffcc00] hover:text-black transition-colors text-sm"
              >
                {project.title}
              </Link>
            ))}
          </div>
        </div>
        
        <Link href="/about" className="uppercase hover:text-gray-600 transition-colors pb-2">
          About
        </Link>
        
        <Link href="/work/remember-me" className="uppercase hover:text-gray-600 transition-colors pb-2">
          Remember Me
        </Link>
      </nav>
    </header>
  );
}
