import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Calendar, Heart, Camera } from 'lucide-react';

export default function MemoriesGallery({ config, id }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id={id} className="relative min-h-screen w-full bg-cream-100 py-12 sm:py-20 px-4 md:px-8 overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-blush-100 border border-blush-200 text-rose-700 text-xs sm:text-sm font-medium"
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Captured Love</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-900 tracking-tight px-2"
          >
            Little Moments, Big Memories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-base md:text-lg text-burgundy-800/75 max-w-lg mx-auto font-light px-2"
          >
            Every picture holds a story, a laughter, and a quiet promise of forever.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {config.memories.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden glass-card border border-blush-200/60 shadow-sm hover:shadow-glow-rose transition-all duration-500 cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-blush-50">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='100%' height='100%' fill='%23FDF0ED'/><text x='50%' y='48%' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='24' fill='%23C45B66'>💖 Our Beautiful Memory 💖</text><text x='50%' y='58%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%235C1D2E'>Tap to expand</text></svg>";
                  }}
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-burgundy-950/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Expand Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white opacity-90 sm:opacity-0 group-hover:opacity-100 transform translate-y-0 sm:translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gold-300 font-medium mb-1">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{photo.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-1 group-hover:text-blush-100 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-cream-200/90 line-clamp-2 font-light">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
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
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">
                  {/* Image Container */}
                  <div className="md:w-3/5 bg-black flex items-center justify-center max-h-[45vh] md:max-h-[85vh] overflow-hidden">
                    <img
                      src={selectedPhoto.image}
                      alt={selectedPhoto.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='100%' height='100%' fill='%23FDF0ED'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='24' fill='%23C45B66'>💖 Our Memory 💖</text></svg>";
                      }}
                    />
                  </div>

                  {/* Details Sidebar */}
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
                        {selectedPhoto.caption}
                      </p>
                    </div>

                    <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-blush-200/60 flex items-center justify-between text-xs text-burgundy-800/60">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        Jenish & Priyanka
                      </span>
                      <span>Forever Memory</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
