'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';

type GitHubItem = {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  html_url: string;
  pull_request?: object;
  body: string | null;
  user: {
    login: string;
    avatar_url: string;
  };
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
          // Mezclar aleatoriamente y tomar solo 3
          const shuffled = data.sort(() => 0.5 - Math.random());
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
    <Section id="roadmap" title={t.roadmap.title || 'Roadmap & Progreso'}>
      <div className="w-full max-w-6xl mx-auto">
        {loading ? (
          <div className="font-mono text-sm text-[#555555] text-center py-20 animate-pulse">
            Fetching GitHub data...
          </div>
        ) : items.length === 0 ? (
          <div className="font-mono text-sm text-[#555555] text-center py-20">
            No hay datos disponibles en el repositorio.
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
                <motion.a
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
                    <div className={`font-mono text-xs flex items-center gap-2 ${isOpen ? baseColor : 'text-[#555555]'}`}>
                      <span className="font-bold opacity-90">#{item.number}</span>
                      <span className="opacity-50 text-[10px] tracking-widest">[{pseudoHash}]</span>
                    </div>
                    <img 
                      src={item.user.avatar_url} 
                      alt={item.user.login} 
                      className={`w-6 h-6 rounded-sm grayscale group-hover:grayscale-0 transition-all border ${borderColor}`} 
                      title={item.user.login}
                    />
                  </div>

                  {/* Title */}
                  <div className={`font-mono text-sm font-semibold line-clamp-3 w-full ${isOpen ? 'text-[#cccccc] group-hover:text-white' : 'text-[#666666] line-through group-hover:text-[#888888]'} transition-colors leading-relaxed`}>
                    {item.title}
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}
