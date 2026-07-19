'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { ShieldIcon, ServerIcon, DatabaseIcon, CpuIcon } from '@/components/ui/Icons';

const privacyIcons = [ShieldIcon, ServerIcon, DatabaseIcon, CpuIcon];

export function PrivacySection() {
  const { t } = useI18n();
  const points = t.privacy.points;

  return (
    <Section id="privacy" title={t.privacy.title}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base md:text-lg text-[#888888] leading-relaxed max-w-2xl mb-14 text-center"
      >
        {t.privacy.description}
      </motion.p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl w-full">
        {points.map((point, i) => {
          const Icon = privacyIcons[i];
          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.1 }}
              className="border border-[#1a1a1a] hover:border-[#333333] transition-all p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4 text-white/80">
                <Icon size={22} />
              </div>
              <h3 className="text-sm font-mono text-white mb-2 tracking-wide">{point.title}</h3>
              <p className="text-xs text-[#888888] leading-relaxed">{point.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
