'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

interface GalleryModalProps {
  images: string[];
  title: string;
  galleryLogoImage?: string;
}

export default function GalleryModal({ images, title, galleryLogoImage }: GalleryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, images.length - 1));
    setCurrentIndex(clamped);
    if (scrollRef.current) {
      const child = scrollRef.current.children[clamped] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [images.length]);

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closeModal, goPrev, goNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Gallery Preview — clickable thumbnail that opens the modal */}
      <section className="mt-8" aria-label={`${title} Gallery`}>
        <div className="relative w-full aspect-video bg-neutral-100 overflow-hidden rounded-sm cursor-pointer group"
          onClick={() => openModal(0)}
        >
          <Image
            src={images[0]}
            alt={`${title} - Gallery Preview`}
            fill
            className="object-cover z-10 transition-transform duration-300 group-hover:scale-105"
            sizes="100vw"
            referrerPolicy="no-referrer"
          />
          {/* Gallery Logo Overlay on preview */}
          {galleryLogoImage && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[90%] md:w-[80%] max-w-[600px] pointer-events-none">
              <Image
                src={galleryLogoImage}
                alt={`${title} Gallery Logo`}
                width={600}
                height={200}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          )}
          {/* Hover overlay with "View Gallery" */}
          <div className="absolute inset-0 z-40 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              View Gallery ({images.length})
            </span>
          </div>
        </div>
      </section>

      {/* Full-screen Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
          onClick={closeModal}
        >
          {/* Header bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-4 z-50">
            <span className="text-white/70 text-sm font-medium tracking-wide">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={closeModal}
              className="text-white/70 hover:text-white transition-colors p-2 cursor-pointer"
              aria-label="Close gallery"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Main image area */}
          <div
            className="relative w-full h-full flex items-center justify-center px-16 sm:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left arrow */}
            {currentIndex > 0 && (
              <button
                onClick={goPrev}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 text-white/60 hover:text-white transition-colors p-2 cursor-pointer"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Current image */}
            <div className="relative w-full max-w-5xl aspect-video">
              <Image
                src={images[currentIndex]}
                alt={`${title} - Gallery ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Right arrow */}
            {currentIndex < images.length - 1 && (
              <button
                onClick={goNext}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 text-white/60 hover:text-white transition-colors p-2 cursor-pointer"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom thumbnail strip */}
          <div className="absolute bottom-0 left-0 right-0 py-4 px-4 z-50">
            <div ref={scrollRef} className="flex gap-2 justify-center overflow-x-auto scrollbar-hide">
              {images.map((image, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  className={`relative w-16 h-10 sm:w-20 sm:h-12 shrink-0 rounded overflow-hidden transition-all duration-200 cursor-pointer ${
                    i === currentIndex
                      ? 'ring-2 ring-white opacity-100'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
