'use client';

import React from 'react';
import { 
  Sliders, 
  Monitor, 
  Volume2, 
  VolumeX, 
  Zap, 
  Eye, 
  Image as ImageIcon, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useOSStore } from '../../../store/useOSStore';
import { sounds } from '../../../utils/soundEffects';

export const ControlCenterWindow: React.FC = () => {
  const osMode = useOSStore((s) => s.osMode);
  const toggleOSMode = useOSStore((s) => s.toggleOSMode);
  const soundEnabled = useOSStore((s) => s.soundEnabled);
  const toggleSound = useOSStore((s) => s.toggleSound);
  const motionMode = useOSStore((s) => s.motionMode);
  const setMotionMode = useOSStore((s) => s.setMotionMode);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white select-text overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center shadow-lg">
          <Sliders className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">System Preferences & Settings</h1>
          <p className="text-xs text-zinc-400 font-mono">Customize SAI.OS appearance, motion, sound, and theme</p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. OS Skin Selector */}
        <div className="p-5 bg-zinc-900/80 border border-white/10 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase">
            <Monitor className="w-4 h-4" />
            <span>Operating System Skin</span>
          </div>
          <p className="text-xs text-zinc-300">
            Switch between Apple macOS Sonoma and Windows 11 Fluent Acrylic design languages.
          </p>
          <div className="flex items-center space-x-3 pt-1">
            <button
              onClick={toggleOSMode}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                osMode === 'mac'
                  ? 'bg-sky-500 text-white border border-sky-400'
                  : 'bg-white/10 text-zinc-300 hover:bg-white/20'
              }`}
            >
              macOS Sonoma
            </button>
            <button
              onClick={toggleOSMode}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                osMode === 'windows'
                  ? 'bg-sky-600 text-white border border-sky-400'
                  : 'bg-white/10 text-zinc-300 hover:bg-white/20'
              }`}
            >
              Windows 11
            </button>
          </div>
        </div>

        {/* 2. Motion Accessibility Setting */}
        <div className="p-5 bg-zinc-900/80 border border-white/10 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase">
            <Zap className="w-4 h-4" />
            <span>Motion & Accessibility</span>
          </div>
          <p className="text-xs text-zinc-300">
            Toggle spring animations or enable Reduced Motion mode for accessibility.
          </p>
          <div className="flex items-center space-x-3 pt-1">
            <button
              onClick={() => setMotionMode('full')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                motionMode === 'full'
                  ? 'bg-amber-500 text-white border border-amber-400'
                  : 'bg-white/10 text-zinc-300 hover:bg-white/20'
              }`}
            >
              Full Motion
            </button>
            <button
              onClick={() => setMotionMode('reduced')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                motionMode === 'reduced'
                  ? 'bg-amber-600 text-white border border-amber-400'
                  : 'bg-white/10 text-zinc-300 hover:bg-white/20'
              }`}
            >
              Reduced Motion
            </button>
          </div>
        </div>

        {/* 3. Audio UI Sound Toggle */}
        <div className="p-5 bg-zinc-900/80 border border-white/10 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold uppercase">
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>System Audio & Feedback</span>
          </div>
          <p className="text-xs text-zinc-300">
            Synthesized Web Audio API clicks, pops, and window interaction sound effects.
          </p>
          <button
            onClick={() => {
              toggleSound();
              if (!soundEnabled) sounds.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
              soundEnabled
                ? 'bg-emerald-500 text-white border border-emerald-400'
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}
          >
            {soundEnabled ? '✓ Sound FX Enabled' : '✕ Sound Muted'}
          </button>
        </div>

        {/* 4. Wallpaper Info */}
        <div className="p-5 bg-zinc-900/80 border border-white/10 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold uppercase">
            <ImageIcon className="w-4 h-4" />
            <span>Desktop Wallpaper</span>
          </div>
          <p className="text-xs text-zinc-300">
            Currently using supplied personal wallpaper <code className="text-sky-300 font-mono">public/wallpapers/macos.png</code>.
          </p>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Personal image visual foundation active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
