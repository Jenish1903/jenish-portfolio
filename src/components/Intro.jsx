import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import FloatingParticles from './FloatingParticles';

export default function Intro({ config, onStart }) {
  const [step, setStep] = useState(0);

  // Sequenced text reveal
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1800); // Today is not just another day...
    const timer2 = setTimeout(() => setStep(2), 3800); // Today is the day...
    const timer3 = setTimeout(() => setStep(3), 5800); // Priyanka reveal & Button
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-cream-100 via-blush-50 to-cream-100 px-4 py-8 sm:py-12 overflow-hidden text-center select-none">
      <FloatingParticles count={22} theme="light" />

      {/* Decorative luxury radial background glow */}
      <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none -top-20 -left-20" />
      <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gold-300/20 blur-3xl pointer-events-none -bottom-20 -right-20" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 w-full">
        
        {/* Step 0: Hey Birthday Girl */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/70 backdrop-blur-md border border-blush-200 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500 animate-pulse" />
          <span className="text-xs sm:text-sm md:text-base font-medium tracking-wide text-burgundy-900">
            {config.intro.greeting}
          </span>
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500" />
        </motion.div>

        {/* Dynamic Text Container */}
        <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex flex-col items-center justify-center w-full px-2">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.p
                key="step0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="text-base sm:text-lg md:text-xl font-light text-burgundy-800/80 italic font-serif"
              >
                Let me tell you something...
              </motion.p>
            )}

            {step >= 1 && step < 2 && (
              <motion.p
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.9 }}
                className="text-xl sm:text-2xl md:text-3xl font-serif text-burgundy-900 tracking-wide font-normal px-2 leading-relaxed"
              >
                "{config.intro.line1}"
              </motion.p>
            )}

            {step >= 2 && step < 3 && (
              <motion.p
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.9 }}
                className="text-xl sm:text-2xl md:text-3xl font-serif text-burgundy-900 leading-relaxed font-normal px-2"
              >
                "{config.intro.line2}"
              </motion.p>
            )}

            {step >= 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4 w-full"
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-rose-gradient tracking-tight drop-shadow-sm py-1 sm:py-2 break-words max-w-full">
                  {config.intro.name}
                </h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-sm sm:text-base md:text-lg font-light text-burgundy-800/90 tracking-wide"
                >
                  {config.intro.tagline}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button & Scroll cue */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center space-y-4 sm:space-y-6 pt-2 sm:pt-4 w-full"
          >
            <button
              onClick={onStart}
              className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-800 text-white font-medium text-base sm:text-lg shadow-lg hover:shadow-glow-rose transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer overflow-hidden max-w-full"
            >
              <span className="relative z-10 font-sans tracking-wide">
                {config.intro.buttonText}
              </span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white group-hover:scale-125 transition-transform duration-300 relative z-10 flex-shrink-0" />
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-burgundy-800/40 flex flex-col items-center gap-1 text-xs"
            >
              <span>Scroll to explore</span>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
