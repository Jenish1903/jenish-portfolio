import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Heart, Sparkles, Maximize2, X } from 'lucide-react';

export default function StoryTimeline({ config, id }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id={id} className="relative min-h-screen w-full bg-gradient-to-b from-cream-50 via-blush-50/40 to-cream-100 py-12 sm:py-20 px-3 sm:px-6 md:px-8 overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gold-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-blush-200 shadow-sm text-rose-600 text-xs sm:text-sm font-medium"
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-rose-500 text-rose-500" />
            <span>Our Journey Together</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-900 tracking-tight"
          >
            Our Story ❤️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-burgundy-800/75 max-w-xl mx-auto font-serif italic px-2"
          >
            "Some moments become memories. Some memories become a lifetime."
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full">
          {/* Central Vertical Line (Left-aligned on mobile, centered on MD+) */}
          <div className="absolute left-5 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-300 via-gold-400 to-rose-400 transform -translate-x-1/2 shadow-sm" />

          <div className="space-y-8 sm:space-y-12 md:space-y-20 w-full">
            {config.storyTimeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Heart Marker Node */}
                  <div className="absolute left-5 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cream-50 border-2 border-rose-500 shadow-md z-20 top-4 md:top-auto">
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500" />
                  </div>

                  {/* Content Box */}
                  <div className="pl-11 md:pl-0 w-full md:w-1/2 md:px-8">
                    <div className="glass-card p-4 sm:p-6 md:p-7 rounded-3xl border border-blush-200/80 shadow-glass hover:shadow-glow-rose transition-all duration-300 group w-full">
                      
                      {/* Image Container */}
                      {item.image && (
                        <div
                          onClick={() => setSelectedPhoto(item)}
                          className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden mb-4 sm:mb-5 shadow-sm bg-cream-200/60 cursor-pointer group/img"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-top transform group-hover/img:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='100%' height='100%' fill='%23F8E1DC'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='28' fill='%235C1D2E'>❤️ Our Special Moment ❤️</text></svg>";
                            }}
                          />
                          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] sm:text-xs font-medium flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-gold-300" />
                            <span>{item.tag || "Memory"}</span>
                          </div>

                          {/* Zoom Expand Badge */}
                          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] sm:text-xs font-medium flex items-center gap-1 opacity-90 group-hover/img:opacity-100 transition-opacity">
                            <Maximize2 className="w-3 h-3 text-gold-300" />
                            <span>Tap to view full</span>
                          </div>
                        </div>
                      )}

                      {/* Header info */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 text-[11px] sm:text-xs font-semibold tracking-wider text-rose-600 uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.date}
                        </span>
                        {item.location && (
                          <span className="flex items-center gap-1 text-burgundy-800/60 font-normal">
                            <MapPin className="w-3.5 h-3.5 text-gold-600" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-burgundy-900 mb-1.5">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm md:text-base text-burgundy-800/80 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal for Timeline Images */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-burgundy-950/90 backdrop-blur-md cursor-pointer overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-cream-50 rounded-3xl overflow-hidden shadow-2xl border border-gold-400/30 cursor-default my-auto"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">
                <div className="md:w-3/5 bg-black/95 flex items-center justify-center max-h-[45vh] md:max-h-[85vh] p-2 overflow-hidden">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="md:w-2/5 p-5 sm:p-6 md:p-8 flex flex-col justify-between bg-cream-50 overflow-y-auto max-h-[45vh] md:max-h-[85vh]">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-rose-600" />
                      {selectedPhoto.date}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-burgundy-900 leading-snug">
                      {selectedPhoto.title}
                    </h3>

                    <div className="w-12 h-0.5 bg-gold-500 my-1.5" />

                    <p className="text-sm sm:text-base text-burgundy-800/90 leading-relaxed font-light">
                      {selectedPhoto.description}
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-blush-200/60 flex items-center justify-between text-xs text-burgundy-800/60">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      Jenish & Priyanka
                    </span>
                    <span>Our Story</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
