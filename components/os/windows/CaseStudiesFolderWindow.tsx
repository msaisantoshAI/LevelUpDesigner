import React from 'react';
import { CASE_STUDIES } from '../../../data/caseStudies';
import { useOSStore } from '../../../store/useOSStore';
import { OSIcon } from '../OSIcon';
import { Folder, ArrowRight, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import { sounds } from '../../../utils/soundEffects';

export const CaseStudiesFolderWindow: React.FC = () => {
  const openWindow = useOSStore((s) => s.openWindow);
  const soundEnabled = useOSStore((s) => s.soundEnabled);
  const osMode = useOSStore((s) => s.osMode);

  const handleOpenCase = (caseId: string) => {
    if (soundEnabled) sounds.playOpen();
    if (caseId === 'enterprise-search') openWindow('case-ultimatix');
    else if (caseId === 'service-portal') openWindow('case-service');
    else if (caseId === 'ai-workflow') openWindow('case-ai');
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950/90 text-white overflow-hidden select-none">
      {/* File Explorer / Finder Breadcrumb Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-b border-zinc-800 text-xs text-zinc-400">
        <div className="flex items-center space-x-2">
          <Folder className="w-4 h-4 text-sky-400" />
          <span className="text-zinc-500">/</span>
          <span className="text-zinc-200 font-semibold">Portfolio</span>
          <span className="text-zinc-500">/</span>
          <span className="text-sky-400 font-medium">Case Studies</span>
        </div>
        <div className="text-zinc-500 text-[11px]">
          {CASE_STUDIES.length} items · Double-click to open
        </div>
      </div>

      {/* Case Study Folder Grid / List View */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="text-xs text-zinc-400 max-w-xl">
          Select a project folder to explore the end-to-end first-person design narrative, heuristic evaluations, wireframes, decisions, and quantified impact.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              onClick={() => handleOpenCase(cs.id)}
              className="group relative flex flex-col p-4 bg-zinc-900/60 border border-zinc-800/80 hover:border-sky-500/50 rounded-xl transition-all duration-200 cursor-pointer hover:bg-zinc-900/90 hover:shadow-lg hover:shadow-sky-500/10"
            >
              <div className="flex items-start justify-between">
                <OSIcon type="case" size={44} />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {cs.context.timeline}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2">
                {cs.title}
              </h3>

              <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
                {cs.subtitle}
              </p>

              {/* Key Hero Metric Pill */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{cs.metrics[0].value} {cs.metrics[0].label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
