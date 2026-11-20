'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ef2929]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#fce94f]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#8ae234]" />
    </div>
  );
}

function WindowCaption({ children }: { children: string }) {
  return (
    <p className="mt-3 font-mono text-[10px] tracking-widest uppercase text-[#555555] text-center">
      {children}
    </p>
  );
}

function TerminalWindow() {
  return (
    <div className="w-full bg-[#050505] border border-[#1a1a1a] hover:border-[#333333] transition-colors overflow-hidden text-left">
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#1a1a1a]">
        <WindowDots />
        <span className="font-mono text-[10px] tracking-widest text-[#555555] truncate">
          joidy@localhost: ~
        </span>
      </div>
      <div className="p-4 md:p-5 font-mono text-[11px] md:text-xs leading-relaxed overflow-x-auto">
        <div>
          <span className="text-[#00FFFF] select-none">$ </span>
          <span className="text-[#cccccc]">joidy up</span>
        </div>
        <div className="text-[#888888]">[+] Running 6/6</div>
        <div>
          <span className="text-emerald-400"> ✔</span>
          <span className="text-[#888888]"> Container </span>
          <span className="text-[#aaaaaa]">joidy-postgres-1</span>
          <span className="text-[#555555]">{`    `}</span>
          <span className="text-emerald-400">Healthy</span>
        </div>
        <div>
          <span className="text-emerald-400"> ✔</span>
          <span className="text-[#888888]"> Container </span>
          <span className="text-[#aaaaaa]">joidy-api-1</span>
          <span className="text-[#555555]">{`         `}</span>
          <span className="text-emerald-400">Started</span>
        </div>
        <div>
          <span className="text-emerald-400"> ✔</span>
          <span className="text-[#888888]"> Container </span>
          <span className="text-[#aaaaaa]">joidy-ai-service-1</span>
          <span className="text-[#555555]">{`  `}</span>
          <span className="text-emerald-400">Started</span>
        </div>
        <div>
          <span className="text-emerald-400"> ✔</span>
          <span className="text-[#888888]"> Container </span>
          <span className="text-[#aaaaaa]">joidy-worker-1</span>
          <span className="text-[#555555]">{`      `}</span>
          <span className="text-emerald-400">Started</span>
        </div>
        <div>
          <span className="text-emerald-400"> ✔</span>
          <span className="text-[#888888]"> Container </span>
          <span className="text-[#aaaaaa]">joidy-frontend-1</span>
          <span className="text-[#555555]">{`    `}</span>
          <span className="text-emerald-400">Started</span>
        </div>
        <div>&nbsp;</div>
        <div>
          <span className="text-[#00FFFF] select-none">$ </span>
          <span className="text-[#cccccc]">joidy status</span>
        </div>
        <div className="text-[#555555]">
          {`NAME                 STATUS                PORTS`}
        </div>
        <div>
          <span className="text-[#aaaaaa]">joidy-postgres-1</span>
          <span className="text-[#555555]">{`     `}</span>
          <span className="text-emerald-400">Up 2 min (healthy)</span>
          <span className="text-[#555555]">{`    `}</span>
          <span className="text-[#888888]">5432/tcp</span>
        </div>
        <div>
          <span className="text-[#aaaaaa]">joidy-api-1</span>
          <span className="text-[#555555]">{`          `}</span>
          <span className="text-emerald-400">Up 2 min (healthy)</span>
          <span className="text-[#555555]">{`    `}</span>
          <span className="text-[#888888]">127.0.0.1:8000-&gt;8000/tcp</span>
        </div>
        <div>
          <span className="text-[#aaaaaa]">joidy-ai-service-1</span>
          <span className="text-[#555555]">{`   `}</span>
          <span className="text-emerald-400">Up 2 min</span>
          <span className="text-[#555555]">{`            `}</span>
          <span className="text-[#888888]">8002/tcp</span>
        </div>
        <div>
          <span className="text-[#aaaaaa]">joidy-worker-1</span>
          <span className="text-[#555555]">{`       `}</span>
          <span className="text-emerald-400">Up 2 min</span>
          <span className="text-[#555555]">{`            `}</span>
          <span className="text-[#888888]">8001/tcp</span>
        </div>
        <div>
          <span className="text-[#aaaaaa]">joidy-frontend-1</span>
          <span className="text-[#555555]">{`     `}</span>
          <span className="text-emerald-400">Up 2 min</span>
          <span className="text-[#555555]">{`            `}</span>
          <span className="text-[#888888]">127.0.0.1:3000-&gt;3000/tcp</span>
        </div>
        <div>&nbsp;</div>
        <div>
          <span className="text-[#00FFFF] select-none">$ </span>
          <span className="text-[#cccccc]">xdg-open http://localhost:3000</span>
        </div>
      </div>
    </div>
  );
}

function AppWindow() {
  const { t } = useI18n();
  const app = t.demo.app;

  return (
    <div className="w-full bg-[#050505] border border-[#1a1a1a] hover:border-[#333333] transition-colors overflow-hidden text-left">
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#1a1a1a]">
        <WindowDots />
        <span className="flex-1 mx-auto max-w-[240px] font-mono text-[10px] tracking-wider text-[#888888] text-center bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-0.5 truncate">
          localhost:3000
        </span>
        <span className="w-[52px] shrink-0 hidden sm:block" />
      </div>
      <div className="flex font-mono">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col gap-1 w-28 shrink-0 border-r border-[#1a1a1a] p-3">
          {app.nav.map((item, i) => (
            <span
              key={item}
              className={`text-[10px] tracking-wide px-2 py-1 rounded ${
                i === 0
                  ? 'text-[#00FFFF] bg-white/5'
                  : 'text-[#555555]'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        {/* Main panel */}
        <div className="flex-1 p-4 md:p-5 min-w-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {app.stats.map((s) => (
              <div
                key={s.label}
                className="border border-[#1a1a1a] p-2.5 flex flex-col items-center"
              >
                <span className="text-sm md:text-base text-white">{s.value}</span>
                <span className="text-[9px] tracking-widest uppercase text-[#555555] mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="border border-[#1a1a1a] p-3">
              <p className="text-[9px] tracking-widest uppercase text-[#555555] mb-2">
                {app.notesTitle}
              </p>
              <div className="space-y-1.5">
                {app.notes.map((note) => (
                  <div key={note} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#00FFFF] shrink-0" />
                    <span className="text-[10px] text-[#aaaaaa] truncate">{note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[#1a1a1a] p-3">
              <p className="text-[9px] tracking-widest uppercase text-[#555555] mb-2">
                {app.goalsTitle}
              </p>
              <div className="space-y-2.5">
                {app.goals.map((goal) => (
                  <div key={goal.name}>
                    <div className="flex justify-between gap-2 mb-1">
                      <span className="text-[10px] text-[#aaaaaa] truncate">{goal.name}</span>
                      <span className="text-[10px] text-[#555555] shrink-0">{goal.progress}</span>
                    </div>
                    <div className="h-1 w-full bg-[#1a1a1a]">
                      <div className="h-1 bg-[#00FFFF]" style={{ width: goal.progress }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoSection() {
  const { t } = useI18n();

  return (
    <Section id="demo" title={t.demo.title}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base md:text-lg text-[#888888] leading-relaxed max-w-3xl mb-16 text-center"
      >
        {t.demo.description}
      </motion.p>

      <div className="w-full max-w-3xl flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TerminalWindow />
          <WindowCaption>{t.demo.terminalCaption}</WindowCaption>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <AppWindow />
          <WindowCaption>{t.demo.appCaption}</WindowCaption>
        </motion.div>
      </div>
    </Section>
  );
}
