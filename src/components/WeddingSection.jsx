import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Clock, Calendar } from 'lucide-react';

export default function WeddingSection({ config, id }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(config.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [config.weddingDate]);

  return (
    <section id={id} className="relative min-h-screen w-full bg-gradient-to-b from-cream-100 via-blush-50 to-darkRomantic-900 py-16 sm:py-24 px-4 md:px-8 overflow-hidden text-center flex flex-col items-center justify-center">
      
      {/* Background ring / sparkle graphics */}
      <div className="absolute top-10 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/80 border border-gold-400/40 text-gold-600 text-[11px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase shadow-md mb-4 sm:mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500 animate-pulse flex-shrink-0" />
          <span>The Next Beautiful Chapter</span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500 animate-pulse flex-shrink-0" />
        </motion.div>

        {/* Names */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-burgundy-900 tracking-tight mb-3 sm:mb-4 px-2 break-words"
        >
          {config.wedding.groom} <span className="text-rose-500 font-sans text-2xl sm:text-4xl md:text-5xl">❤️</span> {config.wedding.bride}
        </motion.h2>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-lg sm:text-2xl md:text-3xl font-serif font-bold text-gold-600 tracking-widest uppercase mb-8 sm:mb-12"
        >
          <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-gold-500" />
          <span>{config.wedding.dateDisplay}</span>
        </motion.div>

        {/* Countdown Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, i) => (
            <div
              key={item.label}
              className="glass-card p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-gold-400/30 shadow-glass flex flex-col items-center justify-center hover:shadow-glow-gold transition-all duration-300"
            >
              <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-rose-gradient">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-medium tracking-wider uppercase text-burgundy-800/70 mt-1.5 sm:mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-xs sm:text-base md:text-lg text-burgundy-800/80 font-serif italic max-w-md mx-auto px-4"
        >
          "{config.wedding.quote}"
        </motion.p>

      </div>
    </section>
  );
}
