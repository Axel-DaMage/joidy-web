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
            <div>{`┌──────────────────────────────────────────────────┐`}</div>
            <div>{`│                  HOST / DOCKER                   │`}</div>
            <div>{`│                                                  │`}</div>
            <div>{`│   ┌──────────┐    ┌──────────┐    ┌──────────┐   │`}</div>
            <div>
              {`│   │   `}
              <span className="text-blue-400 font-semibold">API</span>
              {`    │    │    `}
              <span className="text-purple-400 font-semibold">AI</span>
              {`    │    │  `}
              <span className="text-amber-400 font-semibold">Worker</span>
              {`  │   │`}
            </div>
            <div>
              {`│   │  `}
              <span className="text-emerald-400">:8000</span>
              {`   │    │  `}
              <span className="text-emerald-400">:8002</span>
              {`   │    │  `}
              <span className="text-emerald-400">:8001</span>
              {`   │   │`}
            </div>
            <div>{`│   └────┬─────┘    └────┬─────┘    └────┬─────┘   │`}</div>
            <div>{`│        │               │               │         │`}</div>
            <div>{`│        └───────────────┼───────────────┘         │`}</div>
            <div>{`│                        │                         │`}</div>
            <div>{`│                   ┌────┴─────┐                   │`}</div>
            <div>
              {`│                   │  `}
              <span className="text-rose-400 font-semibold">SQLite</span>
              {`  │                   │`}
            </div>
            <div>{`│                   └──────────┘                   │`}</div>
            <div>{`│                                                  │`}</div>
            <div>{`└──────────────────────────────────────────────────┘`}</div>
            <div>{`                         │                          `}</div>
            <div>{`                         ▼                          `}</div>
            <div>{`┌──────────────────────────────────────────────────┐`}</div>
            <div>
              {`│ `}
              <span className="text-emerald-400 font-semibold">{`> Exponer entorno local a internet`}</span>
              {`               │`}
            </div>
            <div>{`├──────────────────────────────────────────────────┤`}</div>
            <div>
              {`│ `}
              <span className="text-[#888888]">{`# Usando Cloudflare Tunnels (recomendado)`}</span>
              {`        │`}
            </div>
            <div>
              {`│ `}
              <span className="text-pink-400">cloudflared</span>
              <span className="text-blue-300">{` tunnel --url http://localhost:8000`}</span>
              {`   │`}
            </div>
            <div>{`│                                                  │`}</div>
            <div>
              {`│ `}
              <span className="text-[#888888]">{`# O usando ngrok`}</span>
              {`                                 │`}
            </div>
            <div>
              {`│ `}
              <span className="text-pink-400">ngrok</span>
              <span className="text-blue-300">{` http 8000`}</span>
              {`                                  │`}
            </div>
            <div>{`└──────────────────────────────────────────────────┘`}</div>
          </pre>
        </div>
      </motion.div>
    </Section>
  );
}
