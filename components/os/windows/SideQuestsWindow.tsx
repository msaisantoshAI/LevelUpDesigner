'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  MapPin, 
  Trophy, 
  Target, 
  Flame, 
  Heart, 
  Camera, 
  Coffee,
  X
} from 'lucide-react';

interface SideQuest {
  id: string;
  title: string;
  category: 'Challenge' | 'Travel' | 'First Experience' | 'Creative Quest';
  location: string;
  year: string;
  quote: string;
  story: string;
  learnings: string[];
  gradient: string;
  emoji: string;
}

export const SideQuestsWindow: React.FC = () => {
  const [activeQuest, setActiveQuest] = useState<SideQuest | null>(null);

  const quests: SideQuest[] = [
    {
      id: 'quest-1',
      title: 'Designing for 500,000 Enterprise Users at TCS',
      category: 'Challenge',
      location: 'Tata Consultancy Services',
      year: '2024 — Present',
      quote: 'Navigating enterprise complexity with structured heuristics.',
      story: 'Rebuilt the Ultimatix Enterprise Search experience from scratch. Reduced recurring usability issues by 80%+ and cut support tickets in half through strategic UI architecture and Figma icon component design systems.',
      learnings: ['Enterprise Scale Design', 'Heuristic Evaluation Rigor', 'Cross-Functional Alignment'],
      gradient: 'from-amber-500 via-orange-600 to-red-600',
      emoji: '⚡',
    },
    {
      id: 'quest-2',
      title: 'BFA Visual Communication Design & Painting',
      category: 'Creative Quest',
      location: 'JNAFAU Hyderabad',
      year: '2019 — 2022',
      quote: 'Rooting interaction design in traditional visual art principles.',
      story: 'Spent four years mastering fine art, painting, composition, and visual ergonomics at JNAFAU before transitioning to digital product design. Fine art taught me optical weight, grid balance, and emotional resonance.',
      learnings: ['Composition & Color Theory', 'Visual Hierarchy', 'Storytelling through Form'],
      gradient: 'from-purple-600 via-indigo-600 to-blue-600',
      emoji: '🎨',
    },
    {
      id: 'quest-3',
      title: 'AI Orchestration & Living Code Prototypes',
      category: 'First Experience',
      location: 'AI Practice Studio',
      year: '2023 — 2026',
      quote: 'Pioneering prompt-driven UI development with Antigravity & Cursor.',
      story: 'Fascinated by the intersection of UX and AI, I integrated AI coding tools (Cursor, Antigravity, Claude, Lovable) into my workflow to build functional React prototypes directly alongside Figma visual specs.',
      learnings: ['Living Code Handoff', 'Prompt Engineering for UI', 'Zero-Lag Prototyping'],
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      emoji: '🤖',
    },
    {
      id: 'quest-4',
      title: 'The macOS Desktop Portfolio Simulation (SAI.OS)',
      category: 'Creative Quest',
      location: 'Personal Studio',
      year: '2026',
      quote: 'Why scroll a static website when you can explore a Mac?',
      story: 'Designed and engineered a complete client-side spatial operating system simulation inspired by Apple HIG, featuring window dragging, dock magnification, sound synthesis, and real-time clock widgets.',
      learnings: ['Interaction Philosophy', 'Zustand State Architecture', 'User Delight'],
      gradient: 'from-sky-400 via-blue-600 to-indigo-700',
      emoji: '💻',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white select-text overflow-hidden">
      {/* Top Banner */}
      <div className="p-5 bg-gradient-to-r from-amber-950/80 via-zinc-900 to-orange-950 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg text-xl">
            🧭
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">SideQuests.app</h1>
            <p className="text-xs text-amber-300 font-mono italic font-semibold">
              "I don't just design experiences. I collect them."
            </p>
          </div>
        </div>
        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-full text-xs font-mono font-bold">
          4 Quests Collected
        </span>
      </div>

      {/* Quest Cards Grid */}
      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {quests.map((quest) => (
          <div
            key={quest.id}
            onClick={() => setActiveQuest(quest)}
            className="group relative p-5 bg-zinc-900/80 border border-white/10 hover:border-amber-400/60 rounded-2xl transition-all duration-200 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer flex flex-col justify-between space-y-4"
          >
            {/* Visual Header Gradient */}
            <div className={`h-32 rounded-xl bg-gradient-to-br ${quest.gradient} p-4 flex flex-col justify-between shadow-inner relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-black/40 backdrop-blur-md text-[10px] font-mono font-bold text-white rounded-full border border-white/20">
                  {quest.category}
                </span>
                <span className="text-2xl drop-shadow">{quest.emoji}</span>
              </div>
              <div className="space-y-0.5 text-white font-mono text-[11px] drop-shadow">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-amber-300" />
                  <span>{quest.location}</span>
                </div>
                <div className="text-[10px] opacity-80">{quest.year}</div>
              </div>
            </div>

            {/* Quest Details */}
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {quest.title}
              </h2>
              <p className="text-xs text-zinc-300 italic">
                "{quest.quote}"
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                {quest.story}
              </p>
            </div>

            {/* Learnings Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
              {quest.learnings.map((learning, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-white/5 border border-white/10 text-amber-300 rounded text-[10px] font-mono">
                  ✓ {learning}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quest Detail Modal Overlay */}
      {activeQuest && (
        <div
          onClick={() => setActiveQuest(null)}
          className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md p-6 flex items-center justify-center select-text"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-zinc-900 border border-white/20 rounded-2xl shadow-2xl p-6 space-y-4 text-xs text-zinc-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{activeQuest.emoji}</span>
                <div>
                  <h3 className="text-sm font-bold text-white">{activeQuest.title}</h3>
                  <p className="text-[10px] font-mono text-amber-400">{activeQuest.location} · {activeQuest.year}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveQuest(null)}
                className="p-1 bg-white/10 hover:bg-white/20 rounded-full text-zinc-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <blockquote className="p-3 bg-amber-950/30 border-l-2 border-amber-400 text-amber-200 italic font-serif text-sm">
              "{activeQuest.quote}"
            </blockquote>

            <div className="space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Quest Narrative</div>
              <p className="text-zinc-300 leading-relaxed">{activeQuest.story}</p>
            </div>

            <div className="space-y-1 pt-2">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Learnings & Outcomes</div>
              <div className="flex flex-wrap gap-2">
                {activeQuest.learnings.map((l, i) => (
                  <span key={i} className="px-2.5 py-1 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-lg text-xs font-mono">
                    ✓ {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
