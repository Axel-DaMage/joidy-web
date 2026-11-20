"use client";

import { m } from "framer-motion";
import { useI18n } from "@/i18n";
import { Section } from "@/components/ui/Section";

export function ArchitectureSection() {
  const { t } = useI18n();

  return (
    <Section id="architecture" title={t.architecture.title}>
      <m.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs md:text-sm leading-relaxed max-w-2xl mx-auto overflow-hidden"
      >
        <div className="flex flex-col items-center overflow-hidden w-full">
          <pre className="text-[#555555] leading-tight">
            <div>{`┌──────────────────────────────────────────────────────────────┐`}</div>
            <div>{`│                        HOST / DOCKER                         │`}</div>
            <div>{`│                                                              │`}</div>
            <div>{`│    ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │`}</div>
            <div>
              {`│    │ `}
              <span className="text-cyan-400 font-semibold">Frontend</span>
              {` │ │   `}
              <span className="text-blue-400 font-semibold">API</span>
              {`    │ │    `}
              <span className="text-purple-400 font-semibold">AI</span>
              {`    │ │  `}
              <span className="text-amber-400 font-semibold">Worker</span>
              {`  │       │`}
            </div>
            <div>
              {`│    │`}
              <span className="text-cyan-400">SvelteKit</span>
              {` │ │ FastAPI  │ │ FastAPI  │ │ asyncio  │       │`}
            </div>
            <div>
              {`│    │  `}
              <span className="text-emerald-400">:3000</span>
              {`   │ │  `}
              <span className="text-emerald-400">:8000</span>
              {`   │ │  `}
              <span className="text-emerald-400">:8002</span>
              {`   │ │  `}
              <span className="text-emerald-400">:8001</span>
              {`   │       │`}
            </div>
            <div>{`│    └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │`}</div>
            <div>{`│         │            │            │            │             │`}</div>
            <div>{`│         └─────┬──────┘            └─────┬──────┘             │`}</div>
            <div>{`│               │                         │                    │`}</div>
            <div>{`│               └────────────┬────────────┘                    │`}</div>
            <div>{`│                            │                                 │`}</div>
            <div>{`│                     ┌─────────────┐                          │`}</div>
            <div>
              {`│                     │  `}
              <span className="text-rose-400 font-semibold">PostgreSQL</span>
              {` │                          │`}
            </div>
            <div>
              {`│                     │  `}
              <span className="text-rose-400">+ pgvector</span>
              {` │                          │`}
            </div>
            <div>
              {`│                     │    `}
              <span className="text-emerald-400">:5432</span>
              {`    │                          │`}
            </div>
            <div>{`│                     └─────────────┘                          │`}</div>
            <div>{`│                                                              │`}</div>
            <div>{`└──────────────────────────────────────────────────────────────┘`}</div>
            <div>{`                                                              `}</div>
            <div>
              <span className="text-[#555555]">{`published `}</span>
              <span className="text-emerald-400">{`:3000 (ui) · :8000 (api)`}</span>
              <span className="text-[#555555]">{`  → 127.0.0.1 (BIND_ADDR)`}</span>
            </div>
            <div>
              <span className="text-[#555555]">{`internal  `}</span>
              <span className="text-[#888888]">{`:8002 (ai) · :8001 (worker)`}</span>
              <span className="text-[#555555]">{`  → compose network only`}</span>
            </div>
          </pre>
        </div>
      </m.div>
    </Section>
  );
}
