import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart, Sparkles, ChevronRight, ChevronLeft,
  Smartphone, ScrollText, Home, Cake, Camera,
  Mail, Gift, Crown, Compass, Layers, RefreshCw
} from 'lucide-react';

import { birthdayConfig } from './data/birthdayConfig';
import Intro from './components/Intro';
import BirthdayReveal from './components/BirthdayReveal';
import StoryTimeline from './components/StoryTimeline';
import MemoriesGallery from './components/MemoriesGallery';
import LoveReasons from './components/LoveReasons';
import FunnyMoments from './components/FunnyMoments';
import LoveLetter from './components/LoveLetter';
import FuturePlans from './components/FuturePlans';
import WeddingSection from './components/WeddingSection';
import SecretSurprise from './components/SecretSurprise';
import FinalBirthday from './components/FinalBirthday';
import MusicPlayer from './components/MusicPlayer';
import ProgressIndicator from './components/ProgressIndicator';

const SESSIONS = [
  { id: 'intro', label: 'Welcome', icon: Home, component: Intro, nextText: 'Start Surprise Journey 🎁' },
  { id: 'birthday', label: 'Birthday Wish', icon: Cake, component: BirthdayReveal, nextText: 'Explore Our Story Timeline 💖' },
  { id: 'story', label: 'Our Story', icon: Heart, component: StoryTimeline, nextText: 'Open Photo Gallery 📸' },
  { id: 'memories', label: 'Photo Gallery', icon: Camera, component: MemoriesGallery, nextText: 'Why I Love You ❤️' },
  { id: 'reasons', label: 'Love Reasons', icon: Heart, component: LoveReasons, nextText: 'See Our Funny Moments 😜' },
  { id: 'funny', label: 'Funny Side', icon: Sparkles, component: FunnyMoments, nextText: 'Read Special Love Letter 💌' },
  { id: 'letter', label: 'Love Letter', icon: Mail, component: LoveLetter, nextText: 'Our Future Dreams ✨' },
  { id: 'future', label: 'Future Plans', icon: Compass, component: FuturePlans, nextText: 'Wedding Countdown 💍' },
  { id: 'wedding', label: 'Wedding', icon: Heart, component: WeddingSection, nextText: 'Unlock Secret Gift 🎁' },
  { id: 'surprise', label: 'Secret Surprise', icon: Gift, component: SecretSurprise, nextText: 'Grand Celebration 🎉' },
  { id: 'final', label: 'Grand Celebration', icon: Crown, component: FinalBirthday, nextText: 'Replay Journey 🔄' },
];

export default function App() {
  const [viewMode, setViewMode] = useState('app'); // 'app' (Mobile Interactive App) or 'scroll' (Classic Page)
  const [currentSession, setCurrentSession] = useState(0);
  const [direction, setDirection] = useState(1);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.85 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#fbbf24', '#f472b6']
      });
    } catch (e) {
      console.error(e);
    }
  };

  const goToSession = (index) => {
    if (index >= 0 && index < SESSIONS.length) {
      setDirection(index > currentSession ? 1 : -1);
      setCurrentSession(index);
      triggerConfetti();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (index >= SESSIONS.length) {
      setCurrentSession(0);
      triggerConfetti();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentConfig = SESSIONS[currentSession];
  const CurrentComponent = currentConfig.component;

  const pageVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 80 : -80,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -80 : 80,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.7, 0, 0.84, 0],
      },
    }),
  };

  return (
    <main className="relative min-h-screen bg-cream-100 font-sans selection:bg-rose-500 selection:text-white pb-24">
      {/* Floating Background Audio Player */}
      <MusicPlayer config={birthdayConfig} />

      {/* Top Floating Controls Bar */}
      <div className="fixed top-2 sm:top-4 inset-x-0 z-50 flex items-center justify-between px-3 sm:px-6 pointer-events-none max-w-4xl mx-auto">
        {/* Left: View Mode Toggle */}
        <div className="pointer-events-auto inline-flex items-center p-1 rounded-full glass-card border border-blush-200 shadow-md bg-white/80 backdrop-blur-md">
          <button
            onClick={() => setViewMode('app')}
            className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              viewMode === 'app'
                ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-sm'
                : 'text-burgundy-900 hover:text-rose-600'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>App Mode</span>
          </button>
          <button
            onClick={() => setViewMode('scroll')}
            className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              viewMode === 'scroll'
                ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-sm'
                : 'text-burgundy-900 hover:text-rose-600'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>Scroll</span>
          </button>
        </div>

        {/* Right: Active Session Counter Pill (App Mode) */}
        {viewMode === 'app' && (
          <div className="pointer-events-auto hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-rose-200/80 shadow-md text-xs font-medium text-burgundy-900 bg-white/80 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="font-serif">
              Session {currentSession + 1} of {SESSIONS.length}
            </span>
          </div>
        )}
      </div>

      {/* VIEW MODE 1: INTERACTIVE APP MODE (Session by Session) */}
      {viewMode === 'app' ? (
        <div className="pt-12 sm:pt-16">
          {/* Top Progress Line */}
          <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-cream-200">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-rose-600 to-burgundy-700 transition-all duration-500 ease-out"
              style={{ width: `${((currentSession + 1) / SESSIONS.length) * 100}%` }}
            />
          </div>

          {/* Active Session Component with Smooth Screen Transitions */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSession}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <CurrentComponent
                config={birthdayConfig}
                onStart={() => goToSession(1)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Fixed Bottom Action Floating Bar (Next Session Button) */}
          <div className="fixed bottom-3 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none max-w-xl mx-auto">
            <div className="pointer-events-auto glass-card border border-rose-300/80 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-xl flex items-center justify-between gap-2">
              {/* Back Button */}
              <button
                onClick={() => goToSession(currentSession - 1)}
                disabled={currentSession === 0}
                className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                  currentSession === 0
                    ? 'opacity-40 border-cream-200 text-cream-400 cursor-not-allowed'
                    : 'border-blush-200 text-burgundy-900 hover:bg-rose-50 active:scale-95 cursor-pointer'
                }`}
                title="Previous Session"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Step indicator label */}
              <div className="flex flex-col items-center text-center px-1 truncate">
                <span className="text-[10px] uppercase tracking-wider text-rose-600 font-bold">
                  Session {currentSession + 1}/{SESSIONS.length}
                </span>
                <span className="text-xs font-serif font-semibold text-burgundy-900 truncate max-w-[120px] sm:max-w-[180px]">
                  {currentConfig.label}
                </span>
              </div>

              {/* Main Next Session Action Button */}
              <button
                onClick={() => goToSession(currentSession + 1)}
                className="flex-1 max-w-[210px] sm:max-w-[260px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-800 text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-glow-rose active:scale-98 transition-all cursor-pointer truncate"
              >
                <span className="truncate">{currentConfig.nextText}</span>
                {currentSession === SESSIONS.length - 1 ? (
                  <RefreshCw className="w-4 h-4 flex-shrink-0 animate-spin-slow" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0 animate-pulse" />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: CONTINUOUS SCROLL VIEW MODE */
        <div>
          <ProgressIndicator />
          <div id="intro">
            <Intro config={birthdayConfig} onStart={() => {
              const el = document.getElementById('birthday');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />
          </div>
          <BirthdayReveal config={birthdayConfig} id="birthday" />
          <StoryTimeline config={birthdayConfig} id="story" />
          <MemoriesGallery config={birthdayConfig} id="memories" />
          <LoveReasons config={birthdayConfig} id="reasons" />
          <FunnyMoments config={birthdayConfig} id="funny" />
          <LoveLetter config={birthdayConfig} id="letter" />
          <FuturePlans config={birthdayConfig} id="future" />
          <WeddingSection config={birthdayConfig} id="wedding" />
          <SecretSurprise config={birthdayConfig} id="surprise" />
          <FinalBirthday config={birthdayConfig} id="final" />
        </div>
      )}
    </main>
  );
}
