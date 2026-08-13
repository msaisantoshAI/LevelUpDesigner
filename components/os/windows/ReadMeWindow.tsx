'use client';

import React from 'react';
import { FileText, Sparkles, Terminal, Heart } from 'lucide-react';
import { useOSStore } from '../../../store/useOSStore';

export const ReadMeWindow: React.FC = () => {
  const openWindow = useOSStore((s) => s.openWindow);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 font-mono text-zinc-200 text-xs select-text overflow-hidden">
      {/* TextEdit Header */}
      <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-zinc-400 flex items-center justify-between text-[11px] select-none">
        <div className="flex items-center space-x-3">
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>Read Me.txt — TextEdit</span>
        </div>
        <span>UTF-8 · Plain Text</span>
      </div>

      {/* Main Text Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 leading-relaxed">
        <div className="text-amber-400 font-bold text-sm">
          WELCOME TO SAI'S MAC 👋
        </div>

        <div className="text-zinc-300">
          Thank you for stopping by!
        </div>

        <p className="text-zinc-300">
          I am <strong className="text-white">Sai Santosh Madhari</strong> — UX/Product Designer, Visual Designer, Creator, Artist, and SideQuester based in India.
        </p>

        <p className="text-zinc-300">
          Rather than presenting you with a conventional portfolio website filled with generic scrolling cards, I created <strong className="text-sky-300">SAI.OS</strong> — an interactive operating environment where you can explore my design work, AI experiments, art, and life directly on my desktop.
        </p>

        <div className="p-3 bg-zinc-900/80 border border-white/10 rounded-xl space-y-1 text-zinc-300">
          <div className="text-amber-300 font-bold">// QUICK NAVIGATION GUIDE</div>
          <div>• Double click any desktop folder or Dock app to launch it.</div>
          <div>• Press <kbd className="px-1 bg-white/15 rounded text-white font-bold">⌘K</kbd> anywhere to open Spotlight Search.</div>
          <div>• Right click desktop space for system options.</div>
          <div>• Click Lock Screen in top menu bar to test session protection.</div>
        </div>

        <div className="pt-2 flex items-center space-x-3">
          <button
            onClick={() => openWindow('case-studies')}
            className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-sans font-semibold rounded-lg transition-colors"
          >
            Explore My Work →
          </button>
          <button
            onClick={() => openWindow('contact')}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-sans font-semibold rounded-lg transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};
