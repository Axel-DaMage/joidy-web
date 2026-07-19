'use client';

import { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export function Typewriter({ text, speed = 30, onComplete, className = '' }: TypewriterProps) {
  const [idx, setIdx] = useState(0);
  const completeCalled = useRef(false);

  const done = idx >= text.length;

  useEffect(() => {
    if (done) {
      if (!completeCalled.current && onComplete) {
        completeCalled.current = true;
        onComplete();
      }
      return;
    }
    const timer = setTimeout(() => setIdx(idx + 1), speed);
    return () => clearTimeout(timer);
  }, [idx, speed, done, onComplete]);

  return (
    <span className={className}>
      {text.slice(0, idx)}
      {!done && <span className="animate-blink" style={{ fontSize: '0.9em' }}>▊</span>}
    </span>
  );
}
