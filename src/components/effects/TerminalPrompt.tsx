'use client';

import { motion } from 'framer-motion';

interface TerminalPromptProps {
  text: string;
  delay?: number;
  className?: string;
}

export function TerminalPrompt({ text, delay = 0, className = '' }: TerminalPromptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`flex items-center gap-2 font-mono text-sm text-[#888888] ${className}`}
    >
      <span className="text-[#555555]">{'>'}</span>
      <span>{text}</span>
      <span className="animate-blink">▊</span>
    </motion.div>
  );
}
