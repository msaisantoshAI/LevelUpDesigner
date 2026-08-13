import React from 'react';
import { CASE_STUDIES } from '../../../data/caseStudies';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, AlertTriangle, Lightbulb, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = CASE_STUDIES.find((c) => c.id === params.id || c.screenType === params.id);
  if (!cs) return { title: 'Case Study | Sai Santosh Madhari' };
  return {
    title: `${cs.title} | Sai Santosh Madhari - UX Designer`,
    description: cs.subtitle,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const cs = CASE_STUDIES.find((c) => c.id === params.id || c.screenType === params.id);
  if (!cs) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-sky-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-sky-400 hover:text-sky-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Home</span>
        </Link>

        <div className="space-y-4">
          <div className="inline-block px-3 py-1 bg-sky-950 text-sky-300 border border-sky-500/30 rounded-full text-xs font-bold">
            {cs.tag}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">{cs.title}</h1>
          <p className="text-slate-300 text-lg leading-relaxed">{cs.subtitle}</p>
        </div>

        {/* Quantified Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cs.metrics.map((m, i) => (
            <div key={i} className="p-6 bg-slate-900 border border-sky-500/30 rounded-2xl">
              <div className="text-3xl md:text-4xl font-extrabold text-sky-400">{m.value}</div>
              <div className="text-sm font-bold text-white mt-2">{m.label}</div>
              <div className="text-xs text-slate-400 mt-1">{m.detail}</div>
            </div>
          ))}
        </div>

        {/* Narrative Section */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-rose-400 uppercase tracking-wider">THE PROBLEM</h2>
          <h3 className="text-xl font-bold text-white">{cs.problem.title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{cs.problem.description}</p>
        </div>

        <div className="p-6 bg-purple-950/30 border border-purple-500/30 rounded-2xl space-y-2">
          <h2 className="text-sm font-bold text-purple-300 uppercase tracking-wider">THE DECISION</h2>
          <h3 className="text-lg font-bold text-white">{cs.theDecision.title}</h3>
          <p className="text-xs text-slate-200"><strong>Rationale: </strong>{cs.theDecision.rationale}</p>
          <p className="text-xs text-slate-400"><strong>Trade-off: </strong>{cs.theDecision.tradeoff}</p>
        </div>
      </div>
    </main>
  );
}
