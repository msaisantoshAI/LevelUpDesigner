'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  Code2, 
  Layers, 
  ExternalLink, 
  Play, 
  Terminal, 
  Zap, 
  FlaskConical,
  Bot,
  Wand2
} from 'lucide-react';
import { useOSStore } from '../../../store/useOSStore';

interface Experiment {
  id: string;
  title: string;
  category: 'AI Assistant' | 'Micro App' | 'Canvas Toy' | 'Interaction Spec';
  description: string;
  tools: string[];
  status: 'Live Prototype' | 'Experimental' | 'In Progress';
  metrics: string;
  previewGradient: string;
  codeSnippet?: string;
}

export const ExperimentsWindow: React.FC = () => {
  const openWindow = useOSStore((s) => s.openWindow);
  const [selectedExp, setSelectedExp] = useState<Experiment | null>(null);

  const experiments: Experiment[] = [
    {
      id: 'ai-prompt-orchestrator',
      title: 'AI Prompt & Context Orchestrator',
      category: 'AI Assistant',
      description: 'Built with Cursor & Antigravity. Automatically synthesizes user feedback logs into actionable Nielsen Norman heuristic evaluations and design specs.',
      tools: ['Antigravity', 'Claude 3.5 Sonnet', 'React', 'Tailwind'],
      status: 'Live Prototype',
      metrics: '10x Speedup in Qualitative Synthesis',
      previewGradient: 'from-purple-600 via-indigo-600 to-blue-600',
      codeSnippet: `// Heuristic Extraction Prompt Spec
const evaluateHeuristics = async (transcript: string) => {
  const result = await anthropic.messages.create({
    model: "claude-3-5-sonnet-2000",
    max_tokens: 1000,
    system: "You are a Senior UX Heuristic Auditor following NN/g 10 principles.",
    messages: [{ role: "user", content: transcript }]
  });
  return parseSeverityMatrix(result);
};`,
    },
    {
      id: 'mac-os-sim',
      title: 'SAI.OS — Spatial Operating System Simulation',
      category: 'Micro App',
      description: 'A full macOS desktop environment simulated in browser with window management, draggable desktop icons, native cursor handling, and audio effects.',
      tools: ['Next.js 14', 'Framer Motion', 'Zustand', 'Web Audio API'],
      status: 'Live Prototype',
      metrics: '100% Client-Side React OS Engine',
      previewGradient: 'from-sky-500 via-blue-600 to-indigo-700',
      codeSnippet: `// Spatial Window Z-Index Management
const focusWindow = (id: string) => set((state) => {
  const newZIndex = state.highestZIndex + 1;
  return {
    highestZIndex: newZIndex,
    activeWindowId: id,
    windows: { ...state.windows, [id]: { ...state.windows[id], zIndex: newZIndex } }
  };
});`,
    },
    {
      id: 'interactive-micro-interactions',
      title: 'Fluid Spring Physics Micro-Interactions',
      category: 'Canvas Toy',
      description: 'Interactive demonstration of apple-style squircle dock magnification, spring physics cursor trailing, and glassmorphic depth elevation.',
      tools: ['Framer Motion', 'Canvas', 'CSS Glassmorphism'],
      status: 'Live Prototype',
      metrics: '60 FPS Hardware Accelerated Motion',
      previewGradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    },
    {
      id: 'ai-design-system-tokens',
      title: 'AI Token Synthesizer for Figma to Code',
      category: 'Interaction Spec',
      description: 'Automated token extraction pipeline mapping Figma variables directly to Tailwind CSS configuration and dark mode glass tokens.',
      tools: ['Figma API', 'Node.js', 'TailwindCSS'],
      status: 'Experimental',
      metrics: 'Zero Handoff Friction',
      previewGradient: 'from-amber-500 via-orange-600 to-rose-600',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white select-text overflow-hidden">
      {/* Header Banner */}
      <div className="p-5 bg-gradient-to-r from-purple-950/80 via-zinc-900 to-indigo-950 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Experiments & AI Prototypes</h1>
            <p className="text-xs text-zinc-400 font-mono">Playful explorations in AI, creative coding, and interactive design</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-400/40 rounded-full text-xs font-mono">
          4 Active Experiments
        </span>
      </div>

      {/* Grid of Experiments */}
      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            onClick={() => setSelectedExp(exp)}
            className="group relative p-5 bg-zinc-900/70 border border-white/10 hover:border-purple-400/60 rounded-2xl transition-all duration-200 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer flex flex-col justify-between space-y-4"
          >
            {/* Top Visual Banner */}
            <div className={`h-28 rounded-xl bg-gradient-to-tr ${exp.previewGradient} p-4 flex flex-col justify-between shadow-inner relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-black/40 backdrop-blur-md text-[10px] font-mono font-bold text-white rounded-full border border-white/20">
                  {exp.category}
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-500/80 text-[10px] font-bold text-white rounded-full shadow">
                  {exp.status}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-white font-mono text-xs drop-shadow">
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>{exp.metrics}</span>
              </div>
            </div>

            {/* Experiment Content Details */}
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                {exp.title}
              </h2>
              <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                {exp.description}
              </p>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
              {exp.tools.map((tool, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-white/5 border border-white/10 text-zinc-400 rounded text-[10px] font-mono">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal Overlay for Code Snippet Preview */}
      {selectedExp && (
        <div
          onClick={() => setSelectedExp(null)}
          className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md p-6 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-zinc-900 border border-white/20 rounded-2xl shadow-2xl p-6 space-y-4 text-xs text-zinc-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Wand2 className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">{selectedExp.title}</h3>
              </div>
              <button
                onClick={() => setSelectedExp(null)}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs"
              >
                Close
              </button>
            </div>

            <p className="text-zinc-300">{selectedExp.description}</p>

            {selectedExp.codeSnippet && (
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-purple-400 font-bold uppercase">Code & Logic Spec</div>
                <pre className="p-3 bg-black/90 rounded-xl border border-white/10 font-mono text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
                  {selectedExp.codeSnippet}
                </pre>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setSelectedExp(null);
                  openWindow('terminal');
                }}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold flex items-center space-x-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Test in Terminal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
