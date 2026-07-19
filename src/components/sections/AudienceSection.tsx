'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { ShieldIcon, BrainIcon, CpuIcon, BookIcon } from '@/components/ui/Icons';

const audienceIcons = [ShieldIcon, BrainIcon, CpuIcon, BookIcon];
const hoverColors = [
  'group-hover:text-emerald-400',
  'group-hover:text-blue-400',
  'group-hover:text-amber-400',
  'group-hover:text-purple-400',
];

export function AudienceSection() {
  const { t } = useI18n();

  return (
    <Section title={t.audience.title}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-5xl mx-auto">
        {t.audience.items.map((item, i) => {
          const total = t.audience.items.length;
          const isLastAndOrphanOnLg = i === total - 1 && total % 3 === 1;
          const colClass = isLastAndOrphanOnLg ? 'lg:col-start-2' : '';
          const Icon = audienceIcons[i % audienceIcons.length];
          const colorClass = hoverColors[i % hoverColors.length];
          
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`group border border-[#1a1a1a] hover:border-[#333333] transition-all p-5 hover:bg-[#0a0a0a] flex flex-col items-center text-center ${colClass}`}
            >
              <div className={`mb-3 text-white/70 transition-colors duration-300 ${colorClass}`}>
                <Icon size={22} />
              </div>
              <h3 className="text-sm font-mono text-white mb-2 tracking-wide">{item.title}</h3>
              <p className="text-xs text-[#888888] leading-relaxed flex-1">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
