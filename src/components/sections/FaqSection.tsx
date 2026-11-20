'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="border-b border-[#1a1a1a]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left font-mono text-sm text-[#888888] hover:text-white transition-colors"
      >
        <span className="flex items-center gap-3">
          <span className="text-[#555555] text-xs">[?]</span>
          {q}
        </span>
        <m.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#555555] text-xs"
        >
          ▼
        </m.span>
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-[#666666] leading-relaxed pl-7">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

export function FaqSection() {
  const { t } = useI18n();

  return (
    <Section id="faq" title={t.faq.title}>
      <div className="w-full max-w-2xl mx-auto">
        {t.faq.items.map((item, i) => (
          <AccordionItem key={item.q} q={item.q} a={item.a} index={i} />
        ))}
      </div>
    </Section>
  );
}
