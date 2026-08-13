'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck, Key } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { sounds } from '../../utils/soundEffects';

export const LockScreenOverlay: React.FC = () => {
  const isLocked = useOSStore((s) => s.isLocked);
  const setLocked = useOSStore((s) => s.setLocked);
  const soundEnabled = useOSStore((s) => s.soundEnabled);

  const [password, setPassword] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (soundEnabled) sounds.playOpen();
    setLocked(false);
    setPassword('');
  };

  if (!isLocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[90] flex flex-col items-center justify-between py-12 px-6 bg-cover bg-center select-none"
        style={{ backgroundImage: `url('/wallpapers/macos.png')` }}
      >
        {/* Dark Backdrop Blur Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl pointer-events-none" />

        {/* Top Clock Section */}
        <div className="relative z-10 flex flex-col items-center space-y-1 text-center pt-8">
          <div className="text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl font-mono">
            {timeStr}
          </div>
          <div className="text-lg font-medium text-sky-200 tracking-wide drop-shadow-md">
            {dateStr}
          </div>
        </div>

        {/* Center User Login Card */}
        <div className="relative z-10 flex flex-col items-center space-y-4 max-w-sm w-full">
          {/* User Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400 via-blue-600 to-indigo-600 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-white text-3xl font-extrabold border border-white/20 shadow-inner">
                SM
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-zinc-950 shadow">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-white tracking-tight drop-shadow">Sai Santosh Madhari</h2>
            <p className="text-xs font-mono text-sky-300/80">UX & Product Designer · TCS Ultimatix</p>
          </div>

          {/* Password Input Form */}
          <form onSubmit={handleUnlock} className="w-full relative flex items-center">
            <input
              type="password"
              placeholder="Enter password or press Enter..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/15 border border-white/30 rounded-full text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-xl shadow-xl transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-1.5 p-2 bg-sky-500 hover:bg-sky-400 text-white rounded-full transition-transform hover:scale-105 active:scale-95 shadow-md"
              title="Unlock Sai.OS"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[11px] font-mono text-zinc-400 text-center pt-2">
            Touch ID or Enter Password to Unlock
          </p>
        </div>

        {/* Bottom Footer Info */}
        <div className="relative z-10 text-xs text-zinc-400 font-mono flex items-center space-x-2">
          <Lock className="w-3.5 h-3.5 text-sky-400" />
          <span>SAI.OS Sonoma — Protected Session</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
