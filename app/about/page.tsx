import React from 'react';
import Link from 'next/link';
import { RESUME_DATA } from '../../data/caseStudies';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me | Sai Santosh Madhari - UX Designer',
  description: 'Learn about Sai Santosh Madhari, UX Designer with 3+ years experience at TCS Ultimatix TX Team.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-sky-400">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Home</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-white">{RESUME_DATA.name}</h1>
        <p className="text-slate-300 leading-relaxed">{RESUME_DATA.aboutMe}</p>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Education</h2>
          <p className="text-slate-200 text-sm font-semibold">{RESUME_DATA.education.degree}</p>
          <p className="text-slate-400 text-xs">{RESUME_DATA.education.institution}</p>
        </div>
      </div>
    </main>
  );
}
