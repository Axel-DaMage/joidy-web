'use client';

import { useI18n } from '@/i18n';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Footer() {
  const { t } = useI18n();
  const [version, setVersion] = useState('v0.1.0-alpha');

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
      { href: '/#features', label: 'Características' },
      { href: '/#architecture', label: 'Arquitectura' },
      { href: '/#faq', label: 'Preguntas Frecuentes' },
      { href: '/#privacy', label: 'Privacidad' },
    ],
    connect: [
      { href: 'https://github.com/Axel-DaMage/Joidy', label: 'GitHub', external: true },
      { href: '/docs', label: 'Documentación' },
      { href: 'https://github.com/Axel-DaMage/Joidy/issues', label: 'Reportar Bug', external: true },
      { href: 'https://github.com/Axel-DaMage/Joidy/blob/main/LICENSE', label: 'Licencia (GPL v3)', external: true },
    ],
  };

  return (
    <footer className="border-t border-[#1a1a1a] py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <p className="font-mono text-sm tracking-[0.15em] text-white mb-4">JOIDY</p>
            <p className="font-mono text-xs text-[#555555] leading-relaxed max-w-xs">
              Un sistema de progresión disciplinario. Privado, open-source y alojado en tu propia máquina.
            </p>
          </div>

          <nav>
            <h4 className="font-mono text-xs tracking-wider text-[#888888] uppercase mb-4">
              Navegación
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
              Comunidad y Enlaces
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