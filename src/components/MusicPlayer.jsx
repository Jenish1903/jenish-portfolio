import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause, Play } from 'lucide-react';

export default function MusicPlayer({ config }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Web Audio Synth Fallback refs
  const audioCtxRef = useRef(null);
  const synthTimerRef = useRef(null);

  // Soft romantic chime notes (Hz frequencies)
  const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 440.00, 349.23, 392.00];

  const startSynthMelody = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      let noteIdx = 0;
      const playNextNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = 'triangle'; // Soft warm tone
        osc.frequency.setValueAtTime(notes[noteIdx % notes.length], audioCtxRef.current.currentTime);

        // Soft attack & decay
        gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, audioCtxRef.current.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 1.9);

        noteIdx++;
      };

      playNextNote();
      synthTimerRef.current = setInterval(playNextNote, 600);
    } catch (e) {
      console.log("Synth playback error:", e);
    }
  };

  const stopSynthMelody = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      // Pause both audio element and synth
      if (audioRef.current) audioRef.current.pause();
      stopSynthMelody();
      setIsPlaying(false);
    } else {
      // Try playing MP3 file first
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        const promise = audioRef.current.play();

        if (promise !== undefined) {
          promise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // If MP3 file missing or unsupported, fallback to warm synth melody!
              console.log("No custom MP3 found, playing romantic synth chime fallback");
              startSynthMelody();
              setIsPlaying(true);
            });
        } else {
          setIsPlaying(true);
        }
      } else {
        startSynthMelody();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopSynthMelody();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={config.musicFile}
        preload="auto"
        loop
      />

      {/* Floating Interactive Music Pill */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={togglePlay}
        className={`group relative flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-glass backdrop-blur-md border transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-burgundy-900/90 text-gold-300 border-gold-400/40 shadow-glow-gold'
            : 'bg-white/80 text-burgundy-900 border-rose-200/80 hover:bg-rose-50'
        }`}
        title={isPlaying ? "Pause Music" : "Play Our Song"}
      >
        <div className={`relative flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isPlaying ? 'text-gold-400' : 'text-rose-500'}`} />
        </div>

        <span className="text-[11px] sm:text-xs font-medium tracking-wide font-sans">
          {isPlaying ? "🎵 Our Song" : "🎵 Play Song"}
        </span>

        <div className="p-0.5 sm:p-1 rounded-full bg-white/20 text-current">
          {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />}
        </div>
      </motion.button>
    </div>
  );
}
