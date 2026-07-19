'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export function CtaSection() {
  return (
    <section id="sponsor" className="relative border-t border-[#1a1a1a] py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#050505_0%,_#000000_70%)]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center w-full max-w-2xl mx-auto"
        >
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-rose-500 mx-auto animate-pulse"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <p className="font-mono text-sm md:text-base text-[#888888] leading-relaxed mb-8">
            El proyecto sobrevive gracias a la comunidad open-source y no solo al trabajo de uno. 
            Si deseas apoyar al creador, puedes donar aquí.
          </p>

          <a
            href="https://github.com/sponsors/Axel-DaMage"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#aaaaaa] hover:text-white border border-[#1a1a1a] hover:border-[#ea4aaa]/40 px-6 py-3 transition-all bg-[#050505]"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 16 16" 
              className="w-4 h-4 fill-[#555555] group-hover:fill-[#ea4aaa] transition-colors"
            >
              <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 0 0 8 13.393a20.561 20.561 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path>
            </svg>
            SPONSOR PROJECT
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
