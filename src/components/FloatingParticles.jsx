import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles({ count = 18, theme = 'light' }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 16 + 8, // 8px to 24px
      x: Math.random() * 100, // percentage
      duration: Math.random() * 12 + 10, // 10s to 22s
      delay: Math.random() * 5,
      type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'sparkle' : 'orb',
      opacity: Math.random() * 0.4 + 0.15,
    }));
  }, [count]);

  const heartSvg = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-rose-500/40">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          initial={{ y: '110vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: [0, 45, -45, 90],
            x: [`${p.x}%`, `${p.x + (p.id % 2 === 0 ? 4 : -4)}%`, `${p.x}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.type === 'heart' ? (
            heartSvg
          ) : p.type === 'sparkle' ? (
            <div className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-gold-400/40 blur-[1px]' : 'bg-rose-400/30 blur-[1px]'}`} />
          ) : (
            <div className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-amber-200/20 blur-md' : 'bg-blush-300/30 blur-md'}`} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
