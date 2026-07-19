'use client';

import { motion } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  label: string;
}

const nodes: Node[] = [
  { x: 200, y: 60, label: 'obsidian' },
  { x: 80, y: 150, label: 'python' },
  { x: 320, y: 140, label: 'docker' },
  { x: 50, y: 280, label: 'fastapi' },
  { x: 200, y: 200, label: 'joidy' },
  { x: 350, y: 270, label: 'svelte' },
  { x: 120, y: 370, label: 'sqlite' },
  { x: 290, y: 370, label: 'gemini' },
];

const edges: [number, number][] = [
  [0, 4], [1, 4], [2, 4], [5, 4],
  [1, 3], [3, 4], [2, 3], [4, 6],
  [4, 7], [6, 4], [7, 4],
];

export function KnowledgeGraphSVG() {
  const offsetY = 30;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto my-16"
    >
      <svg viewBox="0 0 400 440" className="w-full h-auto">
        {edges.map(([from, to], i) => {
          const f = nodes[from];
          const t = nodes[to];
          return (
            <motion.line
              key={`e${i}`}
              x1={f.x}
              y1={f.y + offsetY}
              x2={t.x}
              y2={t.y + offsetY}
              stroke="#1a1a1a"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.04 }}
            />
          );
        })}

        {nodes.map((node, i) => (
          <motion.g
            key={`n${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
            whileHover={{ scale: 1.2 }}
            className="cursor-pointer"
          >
            <circle cx={node.x} cy={node.y + offsetY} r={3} fill="#555555" />
            <text
              x={node.x}
              y={node.y + offsetY + 20}
              textAnchor="middle"
              fill="#888888"
              fontSize={9}
              fontFamily="Geist Mono, monospace"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
