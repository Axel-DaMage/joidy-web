'use client';

import { type ReactNode } from 'react';
import { m } from 'framer-motion';
import { Container } from './Container';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Section({ id, children, className = '', title }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 border-b border-[#1a1a1a] py-24 md:py-32 cv-auto ${className}`}
    >
      <Container>
        {title && (
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-sm font-mono tracking-[0.2em] uppercase text-[#888888] text-center w-full"
          >
            {'// '}{title}
          </m.h2>
        )}
        <div className="w-full flex flex-col items-center">
          {children}
        </div>
      </Container>
    </section>
  );
}
