import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Heart, Sparkles, X } from 'lucide-react';

export default function LoveLetter({ config, id }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id={id} className="relative min-h-screen w-full bg-gradient-to-b from-cream-50 via-blush-50 to-cream-100 py-12 sm:py-20 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full relative z-10 text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500" />
            <span>Private & Personal</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-900 tracking-tight px-2">
            You Have One Private Message 💌
          </h2>
          <p className="text-xs sm:text-base text-burgundy-800/75 max-w-md mx-auto font-light px-2">
            Written straight from the heart, just for you.
          </p>
        </motion.div>

        {/* Envelope & Letter Container */}
        <div className="relative flex justify-center py-4 sm:py-6 w-full">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Sealed Envelope */
              <motion.div
                key="closedEnvelope"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsOpen(true)}
                className="group relative w-full max-w-md bg-gradient-to-br from-cream-100 to-blush-100 p-5 sm:p-8 rounded-3xl border-2 border-rose-200/80 shadow-glass hover:shadow-glow-rose cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center space-y-4 sm:space-y-6"
              >
                {/* Envelope Wax Seal Effect */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-burgundy-900 via-rose-700 to-burgundy-800 flex items-center justify-center shadow-lg border-2 border-gold-400 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-gold-300 fill-gold-400 animate-pulse" />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <p className="font-serif font-bold text-lg sm:text-xl text-burgundy-900">
                    To: {config.loveLetter.recipient} ❤️
                  </p>
                  <p className="text-[10px] sm:text-xs text-burgundy-800/60 font-mono tracking-widest uppercase">
                    Strictly Confidential • Sealed with love
                  </p>
                </div>

                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-burgundy-900 text-gold-300 font-medium text-sm sm:text-base shadow-md group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                  <MailOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Open My Letter</span>
                </button>
              </motion.div>
            ) : (
              /* Opened Letter Reveal */
              <motion.div
                key="openedLetter"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full bg-[#FFFDF9] p-5 sm:p-8 md:p-12 rounded-3xl border border-gold-400/40 shadow-2xl text-left font-handwriting"
              >
                {/* Close / Fold Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                  title="Fold letter back"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Decorative letterhead */}
                <div className="flex items-center justify-between border-b border-rose-200/60 pb-3 sm:pb-4 mb-4 sm:mb-6 text-burgundy-900 font-sans">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-rose-600">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>Birthday Love Note</span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-burgundy-800/50 font-serif italic pr-6 sm:pr-0">
                    With endless love
                  </span>
                </div>

                {/* Letter Body Text */}
                <div className="space-y-4 sm:space-y-6 text-burgundy-950 font-serif text-base sm:text-lg md:text-xl leading-relaxed whitespace-pre-line font-normal tracking-wide">
                  {config.loveLetter.content}
                </div>

                {/* Letter Signature */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-rose-200/60 flex items-center justify-between">
                  <div className="text-[11px] sm:text-xs font-sans text-burgundy-800/60">
                    Forever & Always
                  </div>
                  <div className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-700">
                    {config.loveLetter.sender} ❤️
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
