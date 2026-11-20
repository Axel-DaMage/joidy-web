'use client';

import { m } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { ZapIcon, ShieldIcon, GraphIcon } from '@/components/ui/Icons';

const pillarIcons = [ZapIcon, ShieldIcon, GraphIcon];

function PillarCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const Icon = pillarIcons[index % pillarIcons.length];
  
  // Colores primarios: Cyan, Magenta, Amarillo
  const hoverStyles = [
    'group-hover:text-[#00FFFF] group-hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.6)]',
    'group-hover:text-[#FF00FF] group-hover:drop-shadow-[0_0_12px_rgba(255,0,255,0.6)]',
    'group-hover:text-[#FFFF00] group-hover:drop-shadow-[0_0_12px_rgba(255,255,0,0.6)]'
  ];

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
      className="group border border-[#1a1a1a] hover:border-[#333333] transition-colors p-8 flex flex-col items-center text-center"
    >
      <div className={`mb-6 text-white/60 transition-all duration-300 ${hoverStyles[index % hoverStyles.length]}`}>
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-mono font-light text-white mb-3">{title}</h3>
      <p className="text-sm text-[#888888] leading-relaxed">{desc}</p>
    </m.div>
  );
}

export function WhatIsSection() {
  const { t } = useI18n();

  return (
    <Section id="what-is" title={t.whatIs.title}>
      <m.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-base md:text-lg text-[#888888] leading-relaxed max-w-3xl mb-16 text-center"
      >
        {t.whatIs.description}
      </m.p>

      <div className="grid md:grid-cols-3 gap-4 w-full max-w-4xl">
        {t.whatIs.pillars.map((p, i) => (
          <PillarCard key={p.title} title={p.title} desc={p.desc} index={i} />
        ))}
      </div>
    </Section>
  );
}
