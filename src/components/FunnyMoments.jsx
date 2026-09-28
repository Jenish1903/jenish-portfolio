import React from 'react';
import { motion } from 'framer-motion';
import { Laugh, Heart } from 'lucide-react';

export default function FunnyMoments({ config, id }) {
  return (
    <section id={id} className="relative min-h-screen w-full bg-cream-50 py-12 sm:py-20 px-4 md:px-8 overflow-hidden">
      
      {/* Decorative bg element */}
      <div className="absolute top-1/4 right-10 w-64 h-64 sm:w-72 sm:h-72 bg-gold-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs sm:text-sm font-medium"
          >
            <Laugh className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
            <span>Our Playful Side</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-900 tracking-tight px-2"
          >
            Things You Do That I Secretly Love 😂
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-base md:text-lg text-burgundy-800/75 max-w-lg mx-auto font-light px-2"
          >
            Because love isn't just romantic sunset walks—it's also laughing at our silly habits every day.
          </motion.p>
        </div>

        {/* Playful Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {config.funnyMoments.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card p-5 sm:p-7 rounded-3xl border border-blush-200/70 shadow-sm hover:shadow-glow-rose hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between w-full"
            >
              <div>
                {/* Emoji Pill */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl p-2.5 sm:p-3 rounded-2xl bg-white/90 shadow-inner group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </span>
                  <Heart className="w-4 h-4 text-rose-400 group-hover:fill-rose-500 transition-colors" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-serif font-bold text-burgundy-900 mb-1">
                  {item.title}
                </h3>

                {/* Subtitle quote */}
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-600 mb-2.5 sm:mb-3">
                  "{item.subtitle}"
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-burgundy-800/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-blush-100 flex items-center justify-between text-[11px] sm:text-xs text-burgundy-800/50 italic">
                <span>Verdict: 100% Guilty</span>
                <span className="text-rose-500 font-medium">Still Love You ❤️</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
