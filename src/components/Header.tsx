'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useI18n } from '@/i18n';

export function Header() {
  const { lang, setLang, t } = useI18n();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si ya estamos en la página de inicio, hacemos scroll suave hacia arriba
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <m.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14 border-b border-[#1a1a1a] bg-black/80 backdrop-blur-md"
    >
      <Link
        href="/"
        onClick={handleLogoClick}
        className="font-mono text-sm tracking-[0.15em] text-white hover:text-[#888888] transition-colors"
      >
        JOIDY
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {t.header.nav.map((item) => (
          <Link
            key={item.id}
            href={`/#${item.id}`}
            className="font-mono text-xs tracking-[0.1em] text-[#888888] hover:text-white transition-colors uppercase"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/docs"
          className="font-mono text-xs tracking-[0.1em] text-[#888888] hover:text-white transition-colors uppercase"
        >
          {t.header.docs}
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t.header.menu}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="md:hidden font-mono text-xs tracking-wider text-[#777777] hover:text-white transition-colors w-8 h-8 flex items-center justify-center border border-[#1a1a1a] rounded"
        >
          {menuOpen ? '✕' : '≡'}
        </button>
        <button
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label={lang === 'es' ? 'English' : 'Español'}
          className="font-mono text-xs tracking-wider text-[#777777] hover:text-white transition-colors w-8 h-8 flex items-center justify-center border border-[#1a1a1a] rounded"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="md:hidden absolute top-14 left-0 right-0 border-b border-[#1a1a1a] bg-black/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
          {t.header.nav.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-xs tracking-[0.1em] text-[#888888] hover:text-white transition-colors uppercase"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/docs"
            onClick={() => setMenuOpen(false)}
            className="font-mono text-xs tracking-[0.1em] text-[#888888] hover:text-white transition-colors uppercase"
          >
            {t.header.docs}
          </Link>
        </nav>
      )}
    </m.header>
  );
}
