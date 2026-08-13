'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Command, Sparkles } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export const BootSequence: React.FC = () => {
  const isBooting = useOSStore((s) => s.isBooting);
  const setBooting = useOSStore((s) => s.setBooting);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isBooting) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setBooting(false), 200);
          return 100;
        }
        return prev + 25;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isBooting, setBooting]);

  if (!isBooting) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onClick={() => setBooting(false)}
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white cursor-pointer select-none"
      >
        {/* Central Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-zinc-900 to-zinc-800 border border-white/20 flex items-center justify-center shadow-2xl">
            <Apple className="w-10 h-10 fill-white text-white drop-shadow-md" />
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-zinc-100">SAI.OS</h1>
            <p className="text-xs font-mono text-zinc-400 tracking-wider uppercase">macOS Sonoma v15.0 · Sai's Mac</p>
          </div>

          {/* Progress Bar Container */}
          <div className="w-56 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-white/10 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>

          <span className="text-[11px] font-mono text-zinc-500 animate-pulse">
            Click anywhere to jump directly to desktop →
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
