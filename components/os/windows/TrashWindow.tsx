'use client';

import React from 'react';
import { Trash2, AlertCircle, Sparkles, RefreshCw, XCircle } from 'lucide-react';

interface KilledIdea {
  id: string;
  title: string;
  project: string;
  concept: string;
  reasonKilled: string;
  takeaway: string;
}

const KILLED_IDEAS: KilledIdea[] = [
  {
    id: '1',
    title: 'Infinite Scroll for Enterprise Search Results',
    project: 'Ultimatix TX Team',
    concept: 'Attempted to replace paginated/categorized search with an infinite vertical stream of result cards.',
    reasonKilled: 'Users lost mental anchors when seeking specific documentation. Enterprise users need predictable pagination and categorized tabs to verify result counts.',
    takeaway: 'Pattern novelty should never overwrite spatial memory in work-critical tools.'
  },
  {
    id: '2',
    title: 'Hyper-3D Glassmorphic Icon Overhaul',
    project: 'Tech SW Service Next Gen',
    concept: 'Proposed full 3D rendered translucent icons with heavy shadows across all service request categories.',
    reasonKilled: 'Excessive visual weight created high cognitive noise on low-resolution enterprise desktop monitors and degraded contrast ratios below WCAG AA thresholds.',
    takeaway: 'Simplicity and legibility always win over trendy visual ornamentation.'
  },
  {
    id: '3',
    title: 'Multi-Step Modal Wizard for Simple Service Tickets',
    project: 'Tech SW Service Next Gen',
    concept: 'Broke a single 4-field ticket creation form into a 5-step interactive wizard.',
    reasonKilled: 'Critique revealed task completion time jumped by 35% because users had to click "Next" repeatedly for minimal input fields.',
    takeaway: 'Wizards are for complex conditional branching, not for padding short forms.'
  }
];

export const TrashWindow: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white overflow-hidden select-text">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs">
        <div className="flex items-center space-x-2">
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span className="font-bold text-zinc-200">Trash — Idea Archive</span>
        </div>
        <span className="text-zinc-500 font-mono text-[11px]">3 Discarded Ideas</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Prompt Easter Egg Banner */}
        <div className="p-4 bg-zinc-900/90 border border-amber-500/40 rounded-xl text-xs text-amber-200 flex items-start space-x-3 shadow-lg">
          <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-white font-bold mb-0.5 text-sm">"Nothing here. I don't delete ideas."</strong>
            Every discarded concept is a stepping stone to a better design decision. Here is the critique log of ideas pitched, tested, and transformed.
          </div>
        </div>

        <div className="space-y-4">
          {KILLED_IDEAS.map((idea) => (
            <div key={idea.id} className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <h3 className="text-sm font-bold text-white">{idea.title}</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                  {idea.project}
                </span>
              </div>

              <p className="text-xs text-zinc-300">
                <strong className="text-zinc-400">Initial Concept: </strong>
                {idea.concept}
              </p>

              <div className="p-3 bg-zinc-950 border border-rose-900/40 rounded-lg text-xs space-y-1">
                <div className="text-rose-400 font-semibold text-[11px] uppercase tracking-wider">CRITIQUE FEEDBACK</div>
                <div className="text-zinc-300">{idea.reasonKilled}</div>
              </div>

              <div className="text-xs text-emerald-400 font-mono">
                ✓ <strong>Design Judgment Takeaway:</strong> {idea.takeaway}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
