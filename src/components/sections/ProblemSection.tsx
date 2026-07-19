'use client';

import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { ShieldIcon, DatabaseIcon, LockIcon, CpuIcon } from '@/components/ui/Icons';

function ProblemPanel({ side, items, color }: { side: 'before' | 'after'; items: string[]; color: 'red' | 'green' }) {
  const borderColor = color === 'red' ? 'border-red-900/40' : 'border-emerald-900/40';
  const headerBg = color === 'red' ? 'bg-red-950/30' : 'bg-emerald-950/30';
  const headerText = color === 'red' ? 'text-red-400' : 'text-emerald-400';
  const dotColor = color === 'red' ? 'bg-red-500' : 'bg-emerald-500';
  const iconColor = color === 'red' ? 'text-red-400/60' : 'text-emerald-400/60';

  return (
    <div className={`flex-1 border ${borderColor} bg-black/40 min-w-0`}>
      <div className={`flex items-center gap-2 px-4 py-2.5 ${headerBg} border-b ${borderColor}`}>
        <div className="flex gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor} opacity-60`} />
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor} opacity-30`} />
        </div>
        <span className={`font-mono text-xs tracking-wider ${headerText} ml-2`}>
          {side === 'before' ? 'issue.md' : 'fix.sh'}
        </span>
      </div>
      <div className="p-5 space-y-4 font-mono text-sm leading-relaxed">
        {items.map((item, i) => {
          const parts = item.split(':');
          const title = parts[0];
          const desc = parts.slice(1).join(':');

          return (
            <div key={i} className="flex items-start gap-3">
              <span className={`${iconColor} mt-0.5 shrink-0`}>
                {side === 'before' ? '✗' : '✓'}
              </span>
              <span className={`${color === 'red' ? 'text-red-200/70' : 'text-emerald-200/80'}`}>
                {desc ? (
                  <>
                    <strong className={`font-semibold ${color === 'red' ? 'text-red-400' : 'text-emerald-400'}`}>{title}:</strong>
                    {desc}
                  </>
                ) : (
                  item
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProblemSection() {
  const { t } = useI18n();

  return (
    <Section title={t.problem.title}>
      {/* Side-by-side panels */}
      <div className="w-full flex flex-col md:flex-row gap-4 max-w-4xl mt-8">
        <ProblemPanel side="before" items={t.problem.before} color="red" />
        <div className="hidden md:flex items-center">
          <div className="font-mono text-xs text-[#555555] tracking-wider rotate-90">vs</div>
        </div>
        <div className="flex md:hidden items-center justify-center gap-2 py-2">
          <span className="font-mono text-xs text-[#555555] tracking-wider">───── vs ─────</span>
        </div>
        <ProblemPanel side="after" items={t.problem.after} color="green" />
      </div>
    </Section>
  );
}
