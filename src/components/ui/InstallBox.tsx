"use client";

import { useState } from "react";

const installMethods = [
  {
    id: "docker",
    label: "Docker",
    command: "docker compose up -d",
  },
  {
    id: "curl",
    label: "curl",
    command:
      "curl -fsSL https://raw.githubusercontent.com/Axel-DaMage/joidy/main/scripts/install.sh | bash",
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
  {
    id: "direct",
    label: "git",
    command:
      "git clone https://github.com/Axel-DaMage/joidy.git && cd joidy && cp .env.example .env && docker compose up -d",
  },
];

export function InstallBox({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(installMethods[0]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
                : "text-[#555555] hover:text-[#aaaaaa] hover:bg-white/5 border-b border-transparent"
            }`}
          >
            {method.label}
          </button>
        ))}
      </div>

      {/* Área del Comando (Usando Grid estricto para evitar expansión horizontal absoluta) */}
      <div className="p-4 grid grid-cols-[1fr_64px] items-center gap-4 w-full">
        <span className="font-mono text-xs text-[#cccccc] block overflow-hidden text-ellipsis whitespace-nowrap text-left min-w-0">
          <span className="text-[#00FFFF] mr-3 select-none">$</span>
          {activeTab.command}
        </span>
        <button
          onClick={() => copyToClipboard(activeTab.command)}
          className="font-mono text-[10px] text-[#555555] hover:text-[#00FFFF] transition-colors uppercase tracking-widest text-right whitespace-nowrap w-full"
        >
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
    </div>
  );
}
