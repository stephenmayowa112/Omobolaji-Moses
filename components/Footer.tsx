export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 mt-12 sm:mt-16 md:mt-20 border-t border-neutral-200 bg-white text-neutral-600">
      <div className="max-w-4xl mx-auto text-center text-xs md:text-sm leading-relaxed">
        <p className="mb-2 uppercase tracking-wide font-medium">
          ALL ARTWORK AND TEXT COPYRIGHT © {currentYear} OMOBOLAJI MOSES, UNLESS OTHERWISE ATTRIBUTED TO THE RESPECTIVE COPYRIGHT OWNER.
        </p>
        <p className="text-neutral-500">
          IT IS ILLEGAL TO PUBLISH OR PRINT ANY SUCH ARTWORK OR TEXT WITHOUT WRITTEN PERMISSION BY THE ARTIST.
        </p>
      </div>
    </footer>
  );
}
