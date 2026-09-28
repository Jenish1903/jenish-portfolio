import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, Eye } from 'lucide-react';

export default function SecretSurprise({ config, id }) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    // Fire surprise confetti burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#E5C158', '#D9777F', '#F3E5AB'],
    });
  };

  return (
    <section id={id} className="relative min-h-screen w-full bg-darkRomantic-900 py-16 sm:py-24 px-4 md:px-8 text-white overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* Background glowing particles / stars */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-burgundy-900/40 via-darkRomantic-900 to-darkRomantic-900 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 w-full space-y-6 sm:space-y-8">
        
        {/* Mysterious Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-medium"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400 animate-pulse flex-shrink-0" />
          <span>Top Secret • For Priyanka Only</span>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-2.5 sm:space-y-3"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-cream-50 tracking-tight px-2">
            {config.secretSurprise.teaserTitle}
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-cream-200/70 max-w-lg mx-auto font-light px-2">
            {config.secretSurprise.teaserSubtitle}
          </p>
        </motion.div>

        {/* Reveal Card / Box */}
        <div className="pt-2 sm:pt-4 flex justify-center w-full">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="hiddenSurprise"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-card-dark p-6 sm:p-8 md:p-12 rounded-3xl border border-gold-400/30 shadow-2xl max-w-md w-full space-y-4 sm:space-y-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-gold-500 to-amber-300 flex items-center justify-center shadow-glow-gold animate-bounce">
                  <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-burgundy-950" />
                </div>

                <p className="text-xs sm:text-sm text-cream-200/80 font-serif italic">
                  Tap below when you are ready...
                </p>

                <button
                  onClick={handleReveal}
                  className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-gold-500 text-white font-medium text-base sm:text-lg shadow-lg hover:shadow-glow-rose transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{config.secretSurprise.buttonText}</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="revealedSurprise"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="glass-card-dark p-6 sm:p-8 md:p-12 rounded-3xl border border-gold-400 shadow-glow-gold max-w-lg w-full space-y-4 sm:space-y-6 text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-rose-500/20 border border-rose-400 mx-auto flex items-center justify-center text-rose-400">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-rose-500 animate-pulse" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-gold-300">
                  {config.secretSurprise.revealedTitle}
                </h3>

                <div className="p-4 sm:p-6 rounded-2xl bg-burgundy-950/80 border border-gold-500/40">
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-cream-50 leading-relaxed tracking-wide">
                    {config.secretSurprise.secretMessage}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-cream-200/70 font-light italic">
                  {config.secretSurprise.hint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
