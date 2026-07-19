'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';

const NAV_IDS = ['features', 'architecture', 'roadmap', 'faq', 'privacy'];

export function Header() {
  const { lang, setLang, t } = useI18n();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si ya estamos en la página de inicio, hacemos scroll suave hacia arriba
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
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
        {t.header.nav.map((label, i) => (
          <Link
            key={label}
            href={`/#${NAV_IDS[i]}`}
            className="font-mono text-xs tracking-[0.1em] text-[#888888] hover:text-white transition-colors uppercase"
          >
            {label}
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
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          className="font-mono text-xs tracking-wider text-[#555555] hover:text-white transition-colors w-8 h-8 flex items-center justify-center border border-[#1a1a1a] rounded"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </motion.header>
  );
}
