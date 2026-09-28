import React from 'react';
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

export default function App() {
  const scrollToNext = () => {
    const birthdaySection = document.getElementById('birthday');
    if (birthdaySection) {
      birthdaySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-cream-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Navigation Progress Indicator */}
      <ProgressIndicator />

      {/* Floating Background Audio Player */}
      <MusicPlayer config={birthdayConfig} />

      {/* Section 1: Intro */}
      <div id="intro">
        <Intro config={birthdayConfig} onStart={scrollToNext} />
      </div>

      {/* Section 2: Birthday Reveal */}
      <BirthdayReveal config={birthdayConfig} id="birthday" />

      {/* Section 3: Our Story Timeline */}
      <StoryTimeline config={birthdayConfig} id="story" />

      {/* Section 4: Photo Gallery Memories */}
      <MemoriesGallery config={birthdayConfig} id="memories" />

      {/* Section 5: Reasons I Love You */}
      <LoveReasons config={birthdayConfig} id="reasons" />

      {/* Section 6: Our Funny Side */}
      <FunnyMoments config={birthdayConfig} id="funny" />

      {/* Section 7: Love Letter */}
      <LoveLetter config={birthdayConfig} id="letter" />

      {/* Section 8: Our Future */}
      <FuturePlans config={birthdayConfig} id="future" />

      {/* Section 9: Our Wedding Countdown */}
      <WeddingSection config={birthdayConfig} id="wedding" />

      {/* Section 10: Secret Surprise */}
      <SecretSurprise config={birthdayConfig} id="surprise" />

      {/* Section 11: Final Birthday Screen */}
      <FinalBirthday config={birthdayConfig} id="final" />
    </main>
  );
}
