'use client';

import { useI18n } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { useEffect, useState } from 'react';

const LATEST_VERSION = 'v1.1.0-beta.5';

export function Footer() {
  const { t } = useI18n();
  const [version, setVersion] = useState(LATEST_VERSION);

  useEffect(() => {
    fetch('/api/github/version')
      .then(res => res.json())
      .then(data => {
        if (data.version) {
          setVersion(data.version);
        }
      })
      .catch(console.error);
  }, []);

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
            <p className="font-mono text-xs text-[#555555] leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          <nav>
            <h4 className="font-mono text-xs tracking-wider text-[#888888] uppercase mb-4">
              {t.footer.nav}
            </h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-xs text-[#555555] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <h4 className="font-mono text-xs tracking-wider text-[#888888] uppercase mb-4">
              {t.footer.connect}
            </h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="font-mono text-xs text-[#555555] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-xs text-[#555555] text-center md:text-left">
            {version} · <a href="https://github.com/Axel-DaMage" target="_blank" rel="noopener noreferrer" className="hover:text-[#aaaaaa] transition-colors">Axel-DaMage</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
