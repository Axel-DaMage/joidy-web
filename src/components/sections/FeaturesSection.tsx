'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { ZapIcon, GraphIcon, BrainIcon, SearchIcon, CpuIcon, LinkIcon, TargetIcon, ClockIcon, SyncIcon, RocketIcon } from '@/components/ui/Icons';

const featureIcons = [ZapIcon, GraphIcon, BrainIcon, SearchIcon, CpuIcon, LinkIcon, TargetIcon, ClockIcon, SyncIcon, RocketIcon];

const hoverColors = [
  'group-hover:text-blue-400',
  'group-hover:text-emerald-400',
  'group-hover:text-purple-400',
  'group-hover:text-amber-400',
  'group-hover:text-rose-400',
  'group-hover:text-cyan-400',
  'group-hover:text-pink-400',
  'group-hover:text-teal-400',
  'group-hover:text-indigo-400',
  'group-hover:text-yellow-400',
];

function FeatureCard({ title, desc, highlight, index, total }: { title: string; desc: string; highlight?: string; index: number; total: number }) {
  const Icon = featureIcons[index];
  const colorClass = hoverColors[index % hoverColors.length];

  // If we are on a 3-column grid (lg) and there is exactly 1 item left on the last row (e.g. 10th item of 10)
  const isLastAndOrphanOnLg = index === total - 1 && total % 3 === 1;
  const colClass = isLastAndOrphanOnLg ? 'lg:col-start-2' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.03 + index * 0.03 }}
      className={`group border border-[#1a1a1a] hover:border-[#333333] transition-all p-5 hover:bg-[#0a0a0a] flex flex-col items-center text-center ${colClass}`}
    >
      <div className={`mb-3 text-white/70 transition-colors duration-300 ${colorClass}`}>
        <Icon size={22} />
      </div>
      <h3 className="text-sm font-mono text-white mb-2 tracking-wide">{title}</h3>
      <p className="text-xs text-[#888888] leading-relaxed flex-1">{desc}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const { t } = useI18n();

  return (
    <Section id="features" title={t.features.title}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-5xl">
        {t.features.items.map((f, i) => (
          <FeatureCard key={f.title} title={f.title} desc={f.desc} highlight={f.highlight} index={i} total={t.features.items.length} />
        ))}
      </div>
    </Section>
  );
}
