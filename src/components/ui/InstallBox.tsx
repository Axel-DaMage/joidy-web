"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n";

const installMethods = [
  {
    id: "docker",
    label: "Docker",
    command:
      "git clone https://github.com/Axel-DaMage/joidy.git && cd joidy && cp .env.example .env && docker compose up -d",
  },
  {
    id: "curl",
    label: "curl",
    command:
      "curl -fsSL https://raw.githubusercontent.com/Axel-DaMage/joidy/development/scripts/install.sh | bash",
  },
  {
    id: "powershell",
    label: "PS",
    command:
      "irm https://raw.githubusercontent.com/Axel-DaMage/joidy/development/scripts/install.ps1 | iex",
  },
  {
    id: "brew",
    label: "brew",
    command:
      "brew tap Axel-DaMage/homebrew-tap && brew install joidy && joidy up",
  },
  {
    id: "aur",
    label: "aur",
    command: "yay -S joidy",
  },
];

export function InstallBox({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState(installMethods[0]);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API unavailable (insecure context or denied permission)
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        // Give up silently — the command remains selectable manually
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex flex-col w-full bg-[#050505]/80 backdrop-blur-sm border border-[#1a1a1a] hover:border-[#333333] text-left overflow-hidden ${className}`}
    >
      {/* Pestañas integradas */}
      <div className="flex overflow-x-auto border-b border-[#1a1a1a] hide-scrollbar w-full">
        {installMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setActiveTab(method)}
            className={`px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-colors whitespace-nowrap shrink-0 ${
              activeTab.id === method.id
                ? "text-[#00FFFF] bg-white/5 border-b border-[#00FFFF]"
                : "text-[#777777] hover:text-[#aaaaaa] hover:bg-white/5 border-b border-transparent"
            }`}
          >
            {method.label}
          </button>
        ))}
      </div>

      {/* Área del Comando (Usando Grid estricto para evitar expansión horizontal absoluta) */}
      <div className="p-4 grid grid-cols-[1fr_64px] items-center gap-4 w-full">
        <div className="font-mono text-xs text-[#cccccc] overflow-x-auto whitespace-nowrap min-w-0">
          <span className="text-[#00FFFF] mr-3 select-none">$</span>
          {activeTab.command}
        </div>
        <button
          onClick={() => copyToClipboard(activeTab.command)}
          aria-live="polite"
          className="font-mono text-[10px] text-[#777777] hover:text-[#00FFFF] transition-colors uppercase tracking-widest text-right whitespace-nowrap w-full"
        >
          {copied ? t.cta.copied : t.cta.copy}
        </button>
      </div>
    </div>
  );
}
