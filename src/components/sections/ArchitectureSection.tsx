"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { Section } from "@/components/ui/Section";

export function ArchitectureSection() {
  const { t } = useI18n();

  return (
    <Section id="architecture" title={t.architecture.title}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs md:text-sm leading-relaxed max-w-2xl mx-auto overflow-hidden"
      >
        <div className="flex flex-col items-center overflow-hidden w-full">
          <pre className="text-[#555555] leading-tight">
            <span className="block">{`┌──────────────────────────────────────────────────────────────┐`}</span>
            <span className="block">{`│                        HOST / DOCKER                         │`}</span>
            <span className="block">{`│                                                              │`}</span>
            <span className="block">{`│    ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │`}</span>
            <span className="block">
              {`│    │ `}
              <span className="text-cyan-400 font-semibold">Frontend</span>
              {` │ │   `}
              <span className="text-blue-400 font-semibold">API</span>
              {`    │ │    `}
              <span className="text-purple-400 font-semibold">AI</span>
              {`    │ │  `}
              <span className="text-amber-400 font-semibold">Worker</span>
              {`  │       │`}
            </span>
            <span className="block">
              {`│    │`}
              <span className="text-cyan-400">SvelteKit</span>
              {` │ │ FastAPI  │ │ FastAPI  │ │ asyncio  │       │`}
            </span>
            <span className="block">
              {`│    │  `}
              <span className="text-emerald-400">:3000</span>
              {`   │ │  `}
              <span className="text-emerald-400">:8000</span>
              {`   │ │  `}
              <span className="text-emerald-400">:8002</span>
              {`   │ │  `}
              <span className="text-emerald-400">:8001</span>
              {`   │       │`}
            </span>
            <span className="block">{`│    └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │`}</span>
            <span className="block">{`│         │            │            │            │             │`}</span>
            <span className="block">{`│         └─────┬──────┘            └─────┬──────┘             │`}</span>
            <span className="block">{`│               │                         │                    │`}</span>
            <span className="block">{`│               └────────────┬────────────┘                    │`}</span>
            <span className="block">{`│                            │                                 │`}</span>
            <span className="block">{`│                     ┌─────────────┐                          │`}</span>
            <span className="block">
              {`│                     │  `}
              <span className="text-rose-400 font-semibold">PostgreSQL</span>
              {` │                          │`}
            </span>
            <span className="block">
              {`│                     │  `}
              <span className="text-rose-400">+ pgvector</span>
              {` │                          │`}
            </span>
            <span className="block">
              {`│                     │    `}
              <span className="text-emerald-400">:5432</span>
              {`    │                          │`}
            </span>
            <span className="block">{`│                     └─────────────┘                          │`}</span>
            <span className="block">{`│                                                              │`}</span>
            <span className="block">{`└──────────────────────────────────────────────────────────────┘`}</span>
            <span className="block">{`                                                              `}</span>
            <span className="block">
              <span className="text-[#555555]">{`published `}</span>
              <span className="text-emerald-400">{`:3000 (ui) · :8000 (api)`}</span>
              <span className="text-[#555555]">{`  → 127.0.0.1 (BIND_ADDR)`}</span>
            </span>
            <span className="block">
              <span className="text-[#555555]">{`internal  `}</span>
              <span className="text-[#888888]">{`:8002 (ai) · :8001 (worker)`}</span>
              <span className="text-[#555555]">{`  → compose network only`}</span>
            </span>
          </pre>
        </div>
      </motion.div>
    </Section>
  );
}
