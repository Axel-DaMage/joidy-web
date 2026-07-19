"use client";

import { motion } from "framer-motion";

const catAscii = [
  "       .^-^.",
  "      ( 'x' )",
  "      /     \\",
  "   __(       )",
  "~~~~~~'-----o-o-'~~~~",
];

const lines = [
  { label: "OS", value: "Docker / Linux (x86_64)", color: "text-[#00FFFF]" },
  { label: "Frontend", value: "SvelteKit + TypeScript", color: "text-[#55AAFF]" },
  { label: "API", value: "Python (FastAPI)", color: "text-[#AA55FF]" },
  { label: "AI", value: "Gemini / OpenAI / Anthropic / Ollama", color: "text-[#FF00FF]" },
  { label: "DB", value: "SQLite + sqlite-vec", color: "text-[#FF55AA]" },
  { label: "Worker", value: "Python asyncio", color: "text-[#FFAA55]" },
  { label: "License", value: "GPL v3", color: "text-[#FFFF00]" },
];

export function NeofetchOutput() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="font-mono text-xs md:text-sm bg-black border border-[#1a1a1a] p-6 md:p-8 max-w-3xl mx-auto rounded-none shadow-xl text-white overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Logo Section */}
        <div className="text-white font-bold leading-tight whitespace-pre shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          {catAscii.join("\n")}
        </div>

        {/* Info Section */}
        <div className="flex flex-col flex-1 w-full mt-6 md:mt-0">
          {/* Header */}
          <div className="font-bold mb-1 w-full">
            <div className="flex items-center justify-between md:justify-start md:gap-4 w-full bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFFF00] bg-clip-text text-transparent drop-shadow-sm">
              <span>joidy@docker</span>
              <span className="font-sans">ᓚᘏᗢ</span>
            </div>
          </div>
          <div className="text-[#333333] mb-3">------------------------</div>

          {/* Info Lines */}
          <div className="space-y-[2px]">
            {lines.map((line) => (
              <div key={line.label} className="flex">
                <span className={`${line.color} font-bold w-24 shrink-0 drop-shadow-md`}>
                  {line.label}
                </span>
                <span className="text-[#555555] mr-2">:</span>
                <span className="text-[#aaaaaa]">{line.value}</span>
              </div>
            ))}
          </div>

          {/* Color Blocks (Fastfetch signature) */}
          <div className="flex flex-col gap-0 mt-5">
            {/* Normal colors */}
            <div className="flex gap-0">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#333333]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#cc0000]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#4e9a06]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#c4a000]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#3465a4]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#75507b]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#06989a]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#d3d7cf]"></div>
            </div>
            {/* Bright colors */}
            <div className="flex gap-0">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#555753]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#ef2929]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#8ae234]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#fce94f]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#729fcf]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#ad7fa8]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#34e2e2]"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#eeeeec]"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
