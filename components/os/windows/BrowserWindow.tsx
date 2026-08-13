'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Lock, 
  Share2, 
  ExternalLink, 
  Compass, 
  Bookmark,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { RESUME_DATA } from '../../../data/caseStudies';

interface BookmarkItem {
  title: string;
  url: string;
  icon: string;
  category: string;
  description: string;
}

export const BrowserWindow: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('https://sai.os/portfolio');

  const bookmarks: BookmarkItem[] = [
    {
      title: 'Behance Portfolio — M. Sai Santosh',
      url: 'https://behance.net/saisantosh',
      icon: '🎨',
      category: 'Design & Visuals',
      description: 'UX case studies, visual design explorations, and brand graphics portfolio.',
    },
    {
      title: 'LinkedIn Profile — Sai Santosh Madhari',
      url: 'https://linkedin.com/in/sai-santosh-madhari',
      icon: '💼',
      category: 'Professional Network',
      description: 'Career history, endorsement badges, TCS Ultimatix project milestones.',
    },
    {
      title: 'TCS Ultimatix Enterprise Search (Internal)',
      url: 'https://ultimatix.tcs.com',
      icon: '🔍',
      category: 'Enterprise Platform',
      description: 'The enterprise search and platform experience rebuilt for 500,000+ TCS users.',
    },
    {
      title: 'AI Practice Studio & Living Prototypes',
      url: 'https://ai.sai.os',
      icon: '🤖',
      category: 'AI Orchestration',
      description: 'React living code prototypes engineered with Cursor, Antigravity, and Claude.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white select-text overflow-hidden">
      {/* Safari Navigation Bar */}
      <div className="p-3 bg-zinc-900/90 border-b border-white/10 flex items-center space-x-3 text-xs">
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-1 text-zinc-400">
          <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Back">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Forward">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Reload">
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 flex items-center space-x-2 px-3 py-1.5 bg-black/60 border border-white/15 rounded-xl font-mono text-xs text-zinc-200">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-zinc-100 font-mono text-xs"
          />
        </div>

        <button className="p-1.5 hover:bg-white/10 rounded text-zinc-300 hover:text-white transition-colors" title="Share Link">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Safari Bookmarks & Page Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Bookmark className="w-4 h-4" />
          <span>Safari Favorites & External Links</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((bm, idx) => (
            <a
              key={idx}
              href={bm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-zinc-900/80 border border-white/10 hover:border-sky-400/60 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-sky-500/20 group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className="text-2xl">{bm.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors">
                      {bm.title}
                    </h3>
                    <p className="text-[11px] font-mono text-sky-400">{bm.url}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 transition-colors" />
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {bm.description}
              </p>

              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                {bm.category}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
