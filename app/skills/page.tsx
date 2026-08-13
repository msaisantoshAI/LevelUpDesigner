import React from 'react';
import Link from 'next/link';
import { RESUME_DATA } from '../../data/caseStudies';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills & Capabilities | Sai Santosh Madhari',
  description: 'Enterprise UX design, heuristic evaluations, WCAG accessibility, and AI workflow skills.',
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-sky-400">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Home</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-white">Skills & Competencies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESUME_DATA.skills.map((s, i) => (
            <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center space-x-3 text-xs">
              <CheckCircle className="w-4 h-4 text-teal-400" />
              <span className="font-semibold text-slate-200">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
