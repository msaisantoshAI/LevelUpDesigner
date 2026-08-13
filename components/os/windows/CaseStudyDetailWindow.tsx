import React from 'react';
import { CASE_STUDIES, CaseStudy } from '../../../data/caseStudies';
import { CheckCircle2, AlertTriangle, Lightbulb, ExternalLink, ArrowLeft, ShieldCheck, Layers, FileText } from 'lucide-react';
import { useOSStore } from '../../../store/useOSStore';

export interface CaseStudyDetailWindowProps {
  caseId: string;
}

export const CaseStudyDetailWindow: React.FC<CaseStudyDetailWindowProps> = ({ caseId }) => {
  const caseStudy = CASE_STUDIES.find((cs) => cs.id === caseId) || CASE_STUDIES[0];
  const openWindow = useOSStore((s) => s.openWindow);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden select-text">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs">
        <button
          onClick={() => openWindow('case-studies')}
          className="flex items-center space-x-1.5 text-zinc-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Studies</span>
        </button>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded bg-sky-950/80 text-sky-400 border border-sky-800/40 text-[11px] font-medium">
            {caseStudy.context.company}
          </span>
          <span className="text-zinc-500 font-mono">{caseStudy.year}</span>
        </div>
      </div>

      {/* Main Case Study Reader Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 max-w-4xl mx-auto">
        {/* Title & One-Liner */}
        <div className="space-y-3">
          <div className="inline-block px-3 py-1 bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-semibold">
            {caseStudy.tag}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {caseStudy.title}
          </h1>
          <p className="text-zinc-300 text-base leading-relaxed">
            {caseStudy.subtitle}
          </p>
        </div>

        {/* 1. CONTEXT STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs">
          <div>
            <span className="text-zinc-500 block text-[11px] uppercase tracking-wider font-semibold">ROLE</span>
            <span className="text-zinc-200 font-medium">{caseStudy.context.role}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px] uppercase tracking-wider font-semibold">TEAM</span>
            <span className="text-zinc-200 font-medium">{caseStudy.context.team}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px] uppercase tracking-wider font-semibold">TIMELINE</span>
            <span className="text-zinc-200 font-medium">{caseStudy.context.timeline}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px] uppercase tracking-wider font-semibold">TOOLS</span>
            <span className="text-zinc-200 font-medium">{caseStudy.context.tools.slice(0, 3).join(', ')}</span>
          </div>
        </div>

        {/* HERO STAT QUANTIFIED OUTCOMES */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-sky-400 font-bold">// QUANTIFIED OUTCOMES & IMPACT</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {caseStudy.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-5 bg-gradient-to-b from-sky-950/40 to-zinc-900/80 border border-sky-500/30 rounded-xl flex flex-col justify-between"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400 tracking-tight">
                  {metric.value}
                </div>
                <div className="mt-2 text-sm font-semibold text-white">{metric.label}</div>
                <div className="mt-1 text-xs text-zinc-400">{metric.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. THE PROBLEM */}
        <div className="space-y-4 bg-zinc-900/40 p-6 rounded-xl border border-zinc-800">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>THE PROBLEM</span>
          </div>
          <h3 className="text-lg font-bold text-white">{caseStudy.problem.title}</h3>
          <p className="text-zinc-300 text-sm leading-relaxed">{caseStudy.problem.description}</p>
          <ul className="space-y-2 pt-2">
            {caseStudy.problem.painPoints.map((pain, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs text-zinc-300">
                <span className="text-rose-400 font-bold">•</span>
                <span>{pain}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. CONSTRAINTS */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-amber-400 font-bold">// CONSTRAINTS & BOUNDARIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {caseStudy.constraints.map((c, i) => (
              <div key={i} className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-lg text-xs text-zinc-300 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. PROCESS */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-sky-400 font-bold">// PROCESS & WORKFLOW</h2>
          <div className="space-y-4">
            {caseStudy.process.map((p, idx) => (
              <div key={idx} className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-0.5 bg-sky-950 text-sky-400 text-xs font-mono font-bold rounded">
                    {p.step}
                  </span>
                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pl-9">{p.description}</p>

                {p.artifact && (
                  <div className="mt-3 ml-9 p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-sky-300">{p.artifact.title}</div>
                      <div className="text-zinc-500 text-[11px]">{p.artifact.description}</div>
                    </div>
                    <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-[10px] rounded">
                      {p.artifact.badge}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 5. THE DECISION (JUDGMENT CALL WORTH DEFENDING) */}
        <div className="p-6 bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-zinc-900/80 border border-purple-500/40 rounded-xl space-y-3">
          <div className="flex items-center space-x-2 text-purple-300 font-bold text-sm uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-purple-400" />
            <span>THE DECISION — JUDGMENT CALL WORTH DEFENDING</span>
          </div>
          <h3 className="text-base font-bold text-white">{caseStudy.theDecision.title}</h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            <strong className="text-purple-300">Rationale: </strong>
            {caseStudy.theDecision.rationale}
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-300">Trade-off Accepted: </strong>
            {caseStudy.theDecision.tradeoff}
          </p>
        </div>

        {/* 6. REFLECTION */}
        <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl flex items-start space-x-3 text-xs text-zinc-300 italic">
          <span className="text-sky-400 font-serif text-xl leading-none">“</span>
          <div>
            <strong className="not-italic text-zinc-200 block mb-1 font-sans">Honest Reflection:</strong>
            {caseStudy.reflection}
          </div>
        </div>
      </div>
    </div>
  );
};
