'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const DOCS_INDEX = [
  { slug: 'getting-started', title: 'Getting Started' },
  { slug: 'installation', title: 'Installation' },
  { slug: 'configuration', title: 'Configuration' },
  { slug: 'architecture', title: 'Architecture' },
  { slug: 'api-reference', title: 'API Reference' },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      
      <div className="flex-1 w-full max-w-7xl mx-auto pt-24 px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative min-h-[calc(100vh-14rem)]">
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center justify-between border-b border-[#1a1a1a] pb-4 mb-4">
            <span className="font-mono text-xs tracking-wider text-[#555555]">DOCUMENTATION MENU</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="font-mono text-xs tracking-wider text-white border border-[#333333] hover:border-white px-3 py-1.5 transition-all"
            >
              {mobileMenuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>

          {/* Sidebar */}
          <aside className={`
            ${mobileMenuOpen ? 'block' : 'hidden'} 
            md:block w-full md:w-64 flex-shrink-0 
            md:sticky md:top-24 md:h-[calc(100vh-8rem)] 
            overflow-y-auto pb-8 z-30 bg-black
          `}>
            <div className="space-y-8">
              <div>
                <Link
                  href="/docs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs tracking-[0.1em] text-white hover:text-[#888888] uppercase block mb-6"
                >
                  ← Docs Overview
                </Link>
                
                <h3 className="font-mono text-[10px] tracking-widest text-[#555555] uppercase mb-4">
                  Guides
                </h3>
                <ul className="space-y-3">
                  {DOCS_INDEX.map((doc) => {
                    const href = `/docs/${doc.slug}`;
                    const isActive = pathname === href;
                    return (
                      <li key={doc.slug}>
                        <Link
                          href={href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`font-mono text-xs tracking-wider block transition-all relative pl-3 ${
                            isActive 
                              ? 'text-[#10b981]' 
                              : 'text-[#888888] hover:text-white'
                          }`}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#10b981] rounded-full" />
                          )}
                          {doc.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 pb-16">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
