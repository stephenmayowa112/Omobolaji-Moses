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
    <header className="w-full py-6 sm:py-8 px-4 sm:px-6 md:px-10 lg:px-12 bg-white z-50 relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl sm:text-3xl md:text-4xl tracking-tight">
          Omobolaji Moses
        </Link>

        {/* Hamburger Button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] relative z-[60]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-medium tracking-wide">
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

            {/* Desktop Dropdown */}
            <div
              className={`absolute top-full right-0 w-48 bg-[#1e1e1e] text-white py-2 shadow-xl transition-all duration-200 origin-top z-50 ${
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
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-50 flex flex-col transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Mobile menu header — matches main header for alignment */}
        <div className="flex justify-between items-center py-6 px-4 sm:px-6">
          <Link href="/" className="text-2xl sm:text-3xl tracking-tight">
            Omobolaji Moses
          </Link>
          <button
            className="flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="block w-6 h-[2px] bg-black rotate-45 translate-y-[7px] transition-all duration-300 origin-center" />
            <span className="block w-6 h-[2px] bg-black opacity-0 transition-all duration-300" />
            <span className="block w-6 h-[2px] bg-black -rotate-45 -translate-y-[7px] transition-all duration-300 origin-center" />
          </button>
        </div>

        {/* Mobile nav links */}
        <nav className="flex flex-col px-6 pt-8 gap-2">
          {/* Work — with expandable sub-items */}
          <div>
            <button
              className="w-full text-left text-2xl font-medium uppercase tracking-wide py-3 flex justify-between items-center"
              onClick={() => setIsWorkOpen(!isWorkOpen)}
            >
              Work
              <span
                className={`text-sm transition-transform duration-200 ${
                  isWorkOpen ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
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
