'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';

export function DonateSection() {
  const { t } = useI18n();

  return (
    <Section title={t.donate.title} className="border-b-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <a
          href="https://github.com/sponsors/Axel-DaMage"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 font-mono text-sm tracking-wider text-[#cccccc] hover:text-white bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] hover:border-[#ea4aaa]/50 px-6 py-3 transition-all rounded-md"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 16 16" 
            className="w-4 h-4 fill-[#ea4aaa] group-hover:scale-110 transition-transform"
          >
            <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 0 0 8 13.393a20.561 20.561 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path>
          </svg>
          Sponsor Axel-DaMage
        </a>
      </motion.div>
    </Section>
  );
}
