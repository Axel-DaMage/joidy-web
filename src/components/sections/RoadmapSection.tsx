'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';

type GitHubItem = {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  html_url: string;
  pull_request?: object;
  user?: {
    login: string;
    avatar_url: string;
  } | null;
};

export function RoadmapSection() {
  const { t } = useI18n();
  const [items, setItems] = useState<GitHubItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Fisher–Yates shuffle, then take only 3
          const shuffled = [...data];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          setItems(shuffled.slice(0, 3));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Section id="roadmap" title={t.roadmap.title || 'Roadmap'}>
      <div className="w-full max-w-6xl mx-auto">
        {loading ? (
          <div className="font-mono text-sm text-[#777777] text-center py-20 motion-safe:animate-pulse">
            {t.roadmap.loading}
          </div>
        ) : items.length === 0 ? (
          <div className="font-mono text-sm text-[#777777] text-center py-20">
            {t.roadmap.empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {items.map((item, i) => {
              const isPR = !!item.pull_request;
              const isOpen = item.state === 'open';
              
              // Colores: PR = Verde (emerald), Issue = Rojo (red)
              const baseColor = isPR ? 'text-emerald-400' : 'text-red-400';
              const borderColor = isPR ? 'border-emerald-500/40 hover:border-emerald-400' : 'border-red-500/40 hover:border-red-400';
              const hoverBg = isPR ? 'group-hover:bg-emerald-950/20' : 'group-hover:bg-red-950/20';
              
              // Generar un seudo-hash determinista de 7 caracteres para mantener la estética TUI
              const pseudoHash = item.id.toString(16).slice(0, 7).padStart(7, '0');
              
              return (
                <m.a
                  href={item.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`group flex flex-col justify-between p-5 border ${borderColor} bg-black transition-colors relative overflow-hidden min-h-[120px] ${hoverBg} z-0 hover:z-10`}
                >
                  {/* Header: ID, Hash, Avatar */}
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className={`font-mono text-xs flex items-center gap-2 ${isOpen ? baseColor : 'text-[#777777]'}`}>
                      <span className="font-bold opacity-90">#{item.number}</span>
                      <span className="opacity-50 text-[10px] tracking-widest">[{pseudoHash}]</span>
                    </div>
                    {item.user?.avatar_url ? (
                      <Image
                        src={item.user.avatar_url}
                        alt={item.user.login}
                        width={24}
                        height={24}
                        className={`w-6 h-6 rounded-sm grayscale group-hover:grayscale-0 transition-all border ${borderColor}`}
                        title={item.user.login}
                      />
                    ) : (
                      <span className={`w-6 h-6 rounded-sm border ${borderColor} flex items-center justify-center font-mono text-[10px] text-[#555555]`}>
                        ?
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div className={`font-mono text-sm font-semibold line-clamp-3 w-full ${isOpen ? 'text-[#cccccc] group-hover:text-white' : 'text-[#777777] line-through group-hover:text-[#888888]'} transition-colors leading-relaxed`}>
                    {item.title}
                  </div>
                </m.a>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}
