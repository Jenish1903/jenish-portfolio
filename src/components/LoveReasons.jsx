import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smile, 
  HeartHandshake, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  HeartPulse, 
  PartyPopper, 
  Crown,
  Heart,
  ChevronRight
} from 'lucide-react';

const iconMap = {
  Smile: Smile,
  HeartHandshake: HeartHandshake,
  ShieldCheck: ShieldCheck,
  Flame: Flame,
  Sparkles: Sparkles,
  HeartPulse: HeartPulse,
  PartyPopper: PartyPopper,
  Crown: Crown,
};

export default function LoveReasons({ config, id }) {
  const [activeReason, setActiveReason] = useState(null);

  return (
    <section id={id} className="relative min-h-screen w-full bg-gradient-to-b from-cream-100 via-blush-50 to-cream-50 py-12 sm:py-20 px-4 md:px-8 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[600px] sm:h-[600px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium"
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-rose-500 text-rose-500" />
            <span>Countless Reasons</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-900 tracking-tight px-2"
          >
            Little Reasons I Love You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-base md:text-lg text-burgundy-800/75 max-w-lg mx-auto font-light px-2"
          >
            Tap on any card to uncover what makes you so irreplaceable to me.
          </motion.p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {config.loveReasons.map((reason, index) => {
            const IconComponent = iconMap[reason.icon] || Heart;
            const isOpen = activeReason === reason.id;

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                onClick={() => setActiveReason(isOpen ? null : reason.id)}
                className={`group relative rounded-3xl p-5 sm:p-6 transition-all duration-500 cursor-pointer overflow-hidden border ${
                  isOpen
                    ? 'bg-gradient-to-br from-burgundy-900 to-burgundy-950 text-white border-gold-400/50 shadow-glow-burgundy scale-[1.02]'
                    : 'glass-card border-blush-200/80 hover:border-rose-300 shadow-sm hover:shadow-glow-rose'
                }`}
              >
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`p-2.5 sm:p-3 rounded-2xl ${
                    isOpen ? 'bg-gold-500/20 text-gold-300' : 'bg-rose-100 text-rose-600 group-hover:scale-110 transition-transform'
                  }`}>
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className={`text-xs font-serif italic ${isOpen ? 'text-gold-300' : 'text-burgundy-800/50'}`}>
                    #{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-lg sm:text-xl font-serif font-bold mb-1 ${isOpen ? 'text-gold-300' : 'text-burgundy-900'}`}>
                  {reason.title}
                </h3>
                
                <p className={`text-xs font-medium mb-2.5 sm:mb-3 ${isOpen ? 'text-cream-200/70' : 'text-rose-600'}`}>
                  {reason.short}
                </p>

                {/* Message expansion */}
                <AnimatePresence>
                  {isOpen ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-3 border-t border-gold-500/20"
                    >
                      <p className="text-xs sm:text-sm font-light leading-relaxed text-cream-100/90 italic font-serif">
                        "{reason.message}"
                      </p>
                    </motion.div>
                  ) : (
                    <div className="flex items-center text-xs font-medium text-burgundy-800/60 group-hover:text-rose-600 transition-colors pt-1 sm:pt-2">
                      <span>Tap to read</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
