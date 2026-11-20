'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { LATEST_VERSION } from '@/lib/version';

export function Footer({ version }: { version?: ReactNode }) {
  const { t } = useI18n();

  const footerLinks = {
    navigation: [
      { href: '/#features', label: t.footer.navLinks.features },
      { href: '/#architecture', label: t.footer.navLinks.architecture },
      { href: '/#faq', label: t.footer.navLinks.faq },
      { href: '/#privacy', label: t.footer.navLinks.privacy },
    ],
    connect: [
      { href: 'https://github.com/Axel-DaMage/joidy', label: t.footer.connectLinks.github, external: true },
      { href: '/docs', label: t.footer.connectLinks.docs },
      { href: 'https://github.com/Axel-DaMage/joidy/issues', label: t.footer.connectLinks.reportBug, external: true },
      { href: 'https://github.com/Axel-DaMage/joidy/blob/main/LICENSE', label: t.footer.connectLinks.license, external: true },
    ],
  };

  return (
    <footer className="border-t border-[#1a1a1a] py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <p className="font-mono text-sm tracking-[0.15em] text-white mb-4">JOIDY</p>
            <p className="font-mono text-xs text-[#777777] leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label={t.a11y.footerNav}>
            <h2 className="font-mono text-xs tracking-wider text-[#888888] uppercase mb-4">
              {t.footer.nav}
            </h2>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-mono text-xs text-[#777777] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.a11y.communityNav}>
            <h2 className="font-mono text-xs tracking-wider text-[#888888] uppercase mb-4">
              {t.footer.connect}
            </h2>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[#777777] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-mono text-xs text-[#777777] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-xs text-[#777777] text-center md:text-left">
            {version ?? LATEST_VERSION} · <a href="https://github.com/Axel-DaMage" target="_blank" rel="noopener noreferrer" className="hover:text-[#aaaaaa] transition-colors">Axel-DaMage</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
