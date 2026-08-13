'use client';

import React from 'react';
import { Apple, Cpu, HardDrive, Zap, Shield, Sparkles } from 'lucide-react';
import { useOSStore } from '../../../store/useOSStore';

export const AboutMacModal: React.FC = () => {
  const openWindow = useOSStore((s) => s.openWindow);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-zinc-950 text-white select-text font-sans space-y-6">
      {/* Laptop Icon & Logo */}
      <div className="flex flex-col items-center space-y-3">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-400 via-blue-600 to-indigo-600 p-1 shadow-2xl">
          <div className="w-full h-full rounded-[22px] bg-zinc-900 flex items-center justify-center text-white border border-white/20">
            <Apple className="w-10 h-10 fill-white text-white drop-shadow-md" />
          </div>
        </div>

        <div className="text-center space-y-0.5">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">SaiBook Pro</h1>
          <p className="text-xs font-mono text-sky-300">16-inch, 2026 Edition</p>
        </div>
      </div>

      {/* System Specs Table */}
      <div className="w-full max-w-sm bg-zinc-900/80 border border-white/10 rounded-2xl p-4 space-y-2.5 text-xs">
        <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
          <span className="text-zinc-400 font-mono">Operating System:</span>
          <span className="font-bold text-amber-300">SaiOS Sonoma v15.0</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
          <span className="text-zinc-400 font-mono">Processor Chip:</span>
          <span className="font-bold text-sky-300">Curiosity M3 Max</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
          <span className="text-zinc-400 font-mono">Unified Memory:</span>
          <span className="font-bold text-emerald-400">∞ GB High-Speed RAM</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
          <span className="text-zinc-400 font-mono">Storage Capacity:</span>
          <span className="font-bold text-purple-300">Too many creative ideas</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-400 font-mono">System Owner:</span>
          <span className="font-bold text-white">Sai Santosh Madhari</span>
        </div>
      </div>

      <div className="pt-1 flex items-center space-x-3 text-xs">
        <button
          onClick={() => openWindow('control-center')}
          className="px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl font-semibold text-white transition-all shadow"
        >
          System Preferences...
        </button>
      </div>
    </div>
  );
};
