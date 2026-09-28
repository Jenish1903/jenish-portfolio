import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, List } from 'lucide-react';

const sections = [
  { id: 'intro', label: 'Intro', number: '01' },
  { id: 'birthday', label: 'Birthday', number: '02' },
  { id: 'story', label: 'Story', number: '03' },
  { id: 'memories', label: 'Memories', number: '04' },
  { id: 'reasons', label: 'Reasons', number: '05' },
  { id: 'funny', label: 'Funny', number: '06' },
  { id: 'letter', label: 'Letter', number: '07' },
  { id: 'future', label: 'Future', number: '08' },
  { id: 'wedding', label: 'Wedding', number: '09' },
  { id: 'surprise', label: 'Surprise', number: '10' },
  { id: 'final', label: 'Final', number: '11' },
];

export default function ProgressIndicator() {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const currentIdx = sections.findIndex((s) => s.id === activeSection);
  const nextSectionId = sections[Math.min(currentIdx + 1, sections.length - 1)]?.id;

  return (
    <>
      {/* Desktop Left Fixed Vertical Dots & Numbers Bar */}
      <div className="hidden lg:flex fixed left-6 top-1/2 transform -translate-y-1/2 z-40 flex-col items-start space-y-4">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group flex items-center gap-3 cursor-pointer"
            >
              {/* Dot */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-rose-600 scale-125 ring-4 ring-rose-200/50'
                    : 'bg-burgundy-900/20 group-hover:bg-rose-400'
                }`}
              />

              {/* Label reveal on hover/active */}
              <span
                className={`text-xs font-serif transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 font-bold text-burgundy-900 translate-x-0'
                    : 'opacity-0 group-hover:opacity-100 text-burgundy-800/60 -translate-x-2'
                }`}
              >
                {sec.number} {sec.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Top Floating Mini Progress Pill */}
      <div className="fixed top-3 sm:top-4 inset-x-0 z-40 flex justify-center px-3 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card border border-blush-200/80 shadow-sm text-[11px] sm:text-xs font-medium text-burgundy-900 max-w-[95vw]">
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 fill-rose-500 flex-shrink-0" />
          <span className="font-serif truncate">
            {sections[currentIdx]?.number} • {sections[currentIdx]?.label}
          </span>
          <div className="w-8 sm:w-12 h-1 bg-cream-200 rounded-full overflow-hidden flex-shrink-0">
            <div
              className="h-full bg-rose-500 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / sections.length) * 100}%` }}
            />
          </div>

          {/* Quick Menu Toggle for Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-full hover:bg-rose-100 transition-colors ml-0.5 flex-shrink-0"
            title="Menu"
          >
            <List className="w-3.5 h-3.5 text-burgundy-900" />
          </button>
        </div>
      </div>

      {/* Floating Scroll Next Button */}
      {currentIdx < sections.length - 1 && (
        <button
          onClick={() => scrollTo(nextSectionId)}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full glass-card border border-rose-200 text-burgundy-900 flex items-center justify-center shadow-md hover:bg-rose-500 hover:text-white transition-all duration-300 cursor-pointer"
          title="Next Section"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
        </button>
      )}

      {/* Mobile Drawer Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-50 bg-burgundy-950/80 backdrop-blur-md flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-4/5 max-w-xs h-full bg-cream-50 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between border-b border-blush-200 pb-3.5 sm:pb-4">
                  <h3 className="font-serif font-bold text-burgundy-900 text-base sm:text-lg">
                    Surprise Journey ❤️
                  </h3>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xs text-rose-600 font-bold p-1"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-colors ${
                        activeSection === sec.id
                          ? 'bg-rose-500 text-white font-bold'
                          : 'text-burgundy-900 hover:bg-blush-100'
                      }`}
                    >
                      <span>{sec.label}</span>
                      <span className="text-xs opacity-70">{sec.number}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-blush-200 text-xs text-center text-burgundy-800/60 font-serif italic">
                Made for Priyanka by Jenish
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
