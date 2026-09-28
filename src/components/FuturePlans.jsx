import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Heart, CheckCircle2 } from 'lucide-react';

export default function FuturePlans({ config, id }) {
  const [selectedCards, setSelectedCards] = useState([1, 2, 3, 4, 5, 6]); // Interactive check/highlight

  const toggleSelect = (cardId) => {
    setSelectedCards((prev) =>
      prev.includes(cardId) ? prev.filter((i) => i !== cardId) : [...prev, cardId]
    );
  };

  return (
    <section id={id} className="relative min-h-screen w-full bg-cream-100 py-12 sm:py-20 px-4 md:px-8 overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-72 h-72 sm:w-[700px] sm:h-[500px] bg-blush-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center w-full">
        
        {/* Header */}
        <div className="space-y-3 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-cream-200 border border-blush-300 text-burgundy-900 text-xs sm:text-sm font-medium"
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 animate-spin-slow" />
            <span>Looking Ahead</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-900 tracking-tight px-2"
          >
            Things I Want To Do With You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-base md:text-lg text-burgundy-800/75 max-w-lg mx-auto font-light px-2"
          >
            Our bucket list of dreams, small adventures, and forever promises.
          </motion.p>
        </div>

        {/* Future Bucket List Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16 text-left">
          {config.futurePlans.map((plan, index) => {
            const isChecked = selectedCards.includes(plan.id);

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => toggleSelect(plan.id)}
                className={`group p-5 sm:p-6 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden w-full ${
                  isChecked
                    ? 'glass-card border-rose-300 shadow-glass hover:shadow-glow-rose'
                    : 'bg-white/40 border-gray-200/60 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-burgundy-900 group-hover:text-rose-600 transition-colors pr-2">
                    {plan.title}
                  </h3>
                  <div className={`p-1 rounded-full flex-shrink-0 ${isChecked ? 'text-rose-600' : 'text-gray-400'}`}>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-100" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-burgundy-800/80 leading-relaxed font-light">
                  {plan.description}
                </p>

                <div className="mt-3.5 sm:mt-4 flex items-center gap-1.5 text-[11px] sm:text-xs text-rose-500 font-medium">
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rose-500" />
                  <span>Promised together</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Final Emotional Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-block glass-card px-5 py-5 sm:px-8 sm:py-6 rounded-3xl border border-gold-400/40 shadow-lg max-w-xl mx-auto w-full"
        >
          <p className="text-base sm:text-xl md:text-2xl font-serif italic text-burgundy-900 leading-relaxed">
            "{config.futureTagline}"
          </p>
          <div className="mt-2.5 sm:mt-3 text-[10px] sm:text-xs uppercase tracking-widest text-gold-600 font-semibold">
            Jenish ❤️ Priyanka
          </div>
        </motion.div>

      </div>
    </section>
  );
}
