'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { InstallBox } from '@/components/ui/InstallBox';

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      // 20% chance to trigger a glitch cycle
      if (Math.random() > 0.8) {
        const arr = text.split('');
        const numGlitches = Math.floor(Math.random() * 2) + 1; // 1 or 2 letters
        
        for(let i=0; i<numGlitches; i++) {
          const idx = Math.floor(Math.random() * arr.length);
          // Only glitch letters, ignore spaces
          if (arr[idx] !== ' ') {
            arr[idx] = Math.random() > 0.5 ? '1' : '0';
          }
        }
        
        setDisplay(arr.join(''));
        
        // Restore original text extremely quickly (20-50ms)
        setTimeout(() => {
          setDisplay(text);
        }, 20 + Math.random() * 30);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [text]);

  return <>{display}</>;
}

export function HeroSection() {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Store history to avoid the Canvas "dirty alpha" rounding issue
    // which leaves permanent grey trails.
    const history: {x: number, y: number, char: string, curveIdx: number}[] = [];
    const MAX_AGE = 75; // Reducido para acortar la estela

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.01;
      
      // Clear the canvas completely instead of using semi-transparent fill
      // This guarantees absolutely 0 grey residue on the black background.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const a = 3;
      const b = 2;
      const delta = Math.PI / 2;
      
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Calculate new points
      const currentPoints = [];
      for(let i=0; i<5; i++) {
        const offset = i * 100;
        const A = canvas.width * 0.4 - offset;
        const B = canvas.height * 0.4 - offset;
        if(A <= 0 || B <= 0) continue;
        
        const localTime = time + i * 0.5;
        const x = cx + A * Math.sin(a * localTime + delta);
        const y = cy + B * Math.sin(b * localTime);
        
        currentPoints.push({
          x, 
          y, 
          char: Math.random() > 0.5 ? '1' : '0',
          curveIdx: i
        });
      }
      
      // Add new points to the beginning of the history
      history.unshift(...currentPoints);
      
      // Remove points that exceed our max age (5 curves * MAX_AGE frames)
      if (history.length > 5 * MAX_AGE) {
        history.length = 5 * MAX_AGE;
      }
      
      // Draw all points from oldest to newest
      for (let i = history.length - 1; i >= 0; i--) {
        const pt = history[i];
        const age = Math.floor(i / 5); 
        
        // Usar una caída exponencial (curva cuadrática) para que se vuelva 
        // transparente mucho más rápido, emulando el efecto de disipación real
        const progress = 1 - (age / MAX_AGE);
        const opacity = Math.max(0, Math.pow(progress, 2));
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * (0.8 - pt.curveIdx * 0.15)})`;
        ctx.fillText(pt.char, pt.x, pt.y);
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />
      
      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-mono text-7xl md:text-9xl font-light tracking-[-0.06em] text-white mb-6 drop-shadow-md">
            <GlitchText text={t.hero.title || 'JOIDY'} />
          </h1>
          <p className="font-mono text-sm md:text-base text-[#aaaaaa] font-light max-w-xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
        </motion.div>

        {/* Unified Install Box - subtle in the hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 pointer-events-auto w-full max-w-lg"
        >
          <InstallBox className="shadow-2xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pointer-events-auto"
        >
          <button
            onClick={() => document.getElementById('what-is')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 font-mono text-base text-[#555555] hover:text-white transition-colors mx-auto animate-bounce"
            aria-label="Scroll down"
          >
            <span className="inline-block rotate-90 tracking-tighter opacity-80">&gt;&gt;</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}