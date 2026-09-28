import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift } from 'lucide-react';

export default function BirthdayReveal({ config, id }) {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const triggerConfetti = () => {
    // Subtle romantic confetti (rose gold, blush pink, gold colors)
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D9777F', '#D4AF37', '#F8E1DC', '#5C1D2E', '#F3E5AB'],
      scalar: 1.1,
      disableForReducedMotion: true
    });
  };

  const handleCakeClick = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      triggerConfetti();
    } else {
      triggerConfetti(); // re-trigger on extra tap
    }
  };

  return (
    <section id={id} className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cream-50 px-4 py-12 sm:py-16 overflow-hidden text-center">
      {/* Soft background decor */}
      <div className="absolute w-72 h-72 sm:w-[500px] sm:h-[500px] rounded-full bg-blush-100/40 blur-3xl pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8 w-full">
        
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs sm:text-sm font-semibold tracking-wider uppercase">
            <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" /> 
            <span>{config.birthday.dateBadge || "1 October 2026 • Special Day"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-burgundy-900 tracking-tight leading-tight px-2">
            {config.birthday.title}
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-burgundy-800/80 max-w-xl mx-auto font-light leading-relaxed px-2">
            {config.birthday.subtitle}
          </p>
        </motion.div>

        {/* Interactive Cake Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="py-4 sm:py-6 flex flex-col items-center justify-center cursor-pointer w-full"
          onClick={handleCakeClick}
        >
          <div className="relative p-5 sm:p-8 rounded-3xl glass-card border border-rose-200/50 shadow-glass hover:shadow-glow-rose transition-all duration-500 group w-full max-w-sm sm:max-w-md">
            
            {/* SVG Interactive Birthday Cake */}
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 mx-auto flex items-center justify-center">
              
              {/* Flames / Smoke */}
              <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 flex justify-between w-16 sm:w-24 md:w-28 z-20">
                {[0, 1, 2].map((candleIndex) => (
                  <div key={candleIndex} className="relative flex flex-col items-center">
                    <AnimatePresence>
                      {!candlesBlown ? (
                        <motion.div
                          key="flame"
                          initial={{ scale: 0.8 }}
                          animate={{ 
                            scale: [1, 1.2, 0.9, 1.1, 1],
                            y: [0, -2, 0, -1, 0]
                          }}
                          exit={{ opacity: 0, y: -15, scale: 0 }}
                          transition={{ repeat: Infinity, duration: 0.8 + candleIndex * 0.2 }}
                          className="w-3.5 h-5 sm:w-4 sm:h-6 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_12px_#F59E0B]"
                        />
                      ) : (
                        <motion.div
                          key="smoke"
                          initial={{ opacity: 1, y: 0, scale: 0.5 }}
                          animate={{ opacity: 0, y: -25, scale: 1.5 }}
                          transition={{ duration: 1.5 }}
                          className="w-3 h-3 rounded-full bg-gray-400/50 blur-[2px]"
                        />
                      )}
                    </AnimatePresence>
                    {/* Candle stick */}
                    <div className="w-2 h-8 sm:w-2.5 sm:h-10 md:h-12 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-sm shadow-inner mt-1 border-x border-rose-400/50" />
                  </div>
                ))}
              </div>

              {/* Cake Layers SVG */}
              <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
                {/* Cake Stand / Plate */}
                <ellipse cx="100" cy="148" rx="85" ry="10" fill="#E5C158" opacity="0.8" />
                <ellipse cx="100" cy="145" rx="80" ry="8" fill="#F3E5AB" />
                
                {/* Bottom Layer */}
                <path d="M 30 100 Q 100 115 170 100 L 170 140 Q 100 155 30 140 Z" fill="#5C1D2E" />
                <path d="M 30 100 Q 100 115 170 100 L 170 112 Q 100 127 30 112 Z" fill="#C45B66" />
                
                {/* Middle Layer Icing Drips */}
                <path d="M 40 70 Q 100 82 160 70 L 160 105 Q 100 120 40 105 Z" fill="#F8E1DC" />
                <path d="M 40 70 C 50 85 60 70 70 85 C 80 70 90 85 100 70 C 110 85 120 70 130 85 C 140 70 150 85 160 70 L 160 78 Q 100 92 40 78 Z" fill="#FFFFFF" />

                {/* Top Frosting & Hearts Decor */}
                <ellipse cx="100" cy="70" rx="60" ry="12" fill="#FAF7F2" />
                <circle cx="70" cy="70" r="3" fill="#D9777F" />
                <circle cx="100" cy="73" r="3.5" fill="#D4AF37" />
                <circle cx="130" cy="70" r="3" fill="#D9777F" />
              </svg>
            </div>

            {/* Instruction / Wish Reveal */}
            <div className="mt-4 min-h-[44px] sm:min-h-[48px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!candlesBlown ? (
                  <motion.div
                    key="blowPrompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-burgundy-900 font-medium text-xs sm:text-sm md:text-base group-hover:text-rose-600 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-gold-500 animate-spin flex-shrink-0" />
                    <span>{config.birthday.cakeInstruction}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="wishText"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-rose-500 text-white font-serif text-base sm:text-lg shadow-md"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white animate-bounce flex-shrink-0" />
                    <span>{config.birthday.wishPrompt}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
