'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { projects } from '@/lib/data';

export default function Header() {
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setIsWorkOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full py-6 sm:py-8 px-4 sm:px-6 md:px-10 lg:px-12 bg-white z-50 relative border-b border-neutral-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl sm:text-3xl md:text-4xl font-logo font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none rounded-sm"
          aria-label="Omobolaji Moses Home"
        >
          Omobolaji Moses
        </Link>

        {/* Hamburger Button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] relative z-[60] focus-visible:ring-2 focus-visible:ring-black outline-none rounded-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>

        {/* Desktop Nav */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-medium tracking-wide">
          <div className="relative group">
            <button
              className="uppercase hover:text-neutral-600 transition-colors py-2 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none rounded-sm flex items-center gap-1 cursor-default"
              aria-haspopup="true"
            >
              Work
            </button>

            {/* Desktop Dropdown */}
            <div
              className="absolute top-full left-0 pt-1 w-52 z-50 opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-200 origin-top"
              role="menu"
              aria-label="Work Projects"
            >
              <div className="bg-[#1e1e1e] text-white py-2 shadow-2xl rounded-sm">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="block px-6 py-3 hover:bg-[#ffcc00] hover:text-black transition-colors text-sm focus-visible:bg-[#ffcc00] focus-visible:text-black outline-none"
                    role="menuitem"
                  >
                    {project.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link 
            href="/about" 
            className="uppercase hover:text-neutral-600 transition-colors pb-2 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none rounded-sm"
          >
            About
          </Link>

          <Link 
            href="/work/remember-me" 
            className="uppercase hover:text-neutral-600 transition-colors pb-2 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none rounded-sm"
          >
            Remember Me
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-50 flex flex-col transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Mobile menu header */}
        <div className="flex justify-between items-center py-6 px-4 sm:px-6 border-b border-neutral-100">
          <Link 
            href="/" 
            className="text-2xl sm:text-3xl tracking-tight font-logo font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Omobolaji Moses
          </Link>
          <button
            className="flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
          >
            <span className="block w-6 h-[2px] bg-black rotate-45 translate-y-[7px] transition-all duration-300 origin-center" />
            <span className="block w-6 h-[2px] bg-black opacity-0 transition-all duration-300" />
            <span className="block w-6 h-[2px] bg-black -rotate-45 -translate-y-[7px] transition-all duration-300 origin-center" />
          </button>
        </div>

        {/* Mobile nav links */}
        <nav aria-label="Mobile Navigation" className="flex flex-col px-6 pt-8 gap-2">
          {/* Work — with expandable sub-items */}
          <div>
            <button
              className="w-full text-left text-2xl font-medium uppercase tracking-wide py-3 flex justify-between items-center"
              onClick={() => setIsWorkOpen(!isWorkOpen)}
              aria-expanded={isWorkOpen}
            >
              Work
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isWorkOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-4 pb-2 flex flex-col gap-1">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="block py-2 text-lg text-neutral-600 hover:text-black transition-colors"
                  >
                    {project.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className="text-2xl font-medium uppercase tracking-wide py-3"
          >
            About
          </Link>

          <Link
            href="/work/remember-me"
            className="text-2xl font-medium uppercase tracking-wide py-3"
          >
            Remember Me
          </Link>
        </nav>
      </div>
    </header>
  );
}
