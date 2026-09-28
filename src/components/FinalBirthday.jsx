import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Infinity as InfinityIcon } from 'lucide-react';
import FloatingParticles from './FloatingParticles';

export default function FinalBirthday({ config, id }) {
  useEffect(() => {
    // Gentle recurring sparkle confetti burst
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#D9777F', '#F8E1DC']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#D9777F', '#F8E1DC']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <section id={id} className="relative min-h-screen w-full bg-darkRomantic-900 text-white py-16 sm:py-24 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-center text-center">
      
      <FloatingParticles count={25} theme="dark" />

      {/* Ambient background glows */}
      <div className="absolute w-72 h-72 sm:w-[600px] sm:h-[600px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none top-10 left-10" />

      <div className="max-w-3xl mx-auto relative z-10 w-full space-y-8 sm:space-y-10">
        
        {/* Top Infinity Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold-500/10 border border-gold-400/30 mx-auto flex items-center justify-center text-gold-300"
        >
          <InfinityIcon className="w-7 h-7 sm:w-8 sm:h-8 text-gold-400 animate-pulse" />
        </motion.div>

        {/* Sequenced Emotional Statements */}
        <div className="space-y-4 sm:space-y-6 w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-gold-gradient tracking-tight px-2"
          >
            {config.finalScreen.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl font-serif italic text-cream-100/90 font-light px-2"
          >
            "{config.finalScreen.sub1}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-3 sm:my-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-cream-200/80 font-light max-w-xl mx-auto leading-relaxed px-2"
          >
            {config.finalScreen.sub2}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl font-serif text-rose-300 font-normal max-w-md mx-auto px-2"
          >
            "{config.finalScreen.sub3}"
          </motion.p>
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="pt-6 sm:pt-8 border-t border-gold-500/20 max-w-xs mx-auto space-y-2"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-cream-200/60 font-sans">
            {config.finalScreen.closing}
          </span>
          <p className="text-2xl sm:text-3xl font-handwriting text-gold-300 font-bold">
            {config.finalScreen.signature}
          </p>
        </motion.div>

        {/* Scroll back to top cue */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="pt-4 sm:pt-6"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs text-cream-200/50 hover:text-gold-300 transition-colors flex items-center gap-1.5 mx-auto font-sans tracking-wider uppercase py-2 px-4 rounded-full hover:bg-white/5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Replay Surprise</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
