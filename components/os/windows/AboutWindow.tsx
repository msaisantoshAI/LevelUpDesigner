'use client';

import React from 'react';
import { useOSStore } from '../../../store/useOSStore';
import { RESUME_DATA } from '../../../data/caseStudies';
import { 
  User, 
  Sparkles, 
  Award, 
  BookOpen, 
  Heart, 
  Briefcase, 
  Compass, 
  CheckCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const AboutWindow: React.FC = () => {
  const openWindow = useOSStore((s) => s.openWindow);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-zinc-100 overflow-y-auto select-text">
      {/* Top Header Card */}
      <div className="relative p-6 bg-gradient-to-r from-sky-950/80 via-indigo-950/70 to-zinc-900 border-b border-white/10 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 p-1 shadow-2xl flex-shrink-0">
            <div className="w-full h-full rounded-[22px] bg-zinc-900 flex items-center justify-center text-white text-3xl font-extrabold border border-white/20">
              SM
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-zinc-950 shadow">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex-1 text-center md:text-left space-y-1.5">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">{RESUME_DATA.name}</h1>
            <span className="px-2.5 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-400/40 rounded-full text-xs font-mono font-semibold">
              Senior UX/Product Designer
            </span>
          </div>
          <p className="text-xs text-zinc-300">
            UX & Product Designer · Visual Designer · Creator · Artist · SideQuester
          </p>
          <p className="text-xs font-mono text-amber-300/90">
            3+ Years Experience · TCS Ultimatix TX Team · Enterprise Systems & AI Orchestration
          </p>
        </div>

        {/* Quick Contact Action */}
        <button
          onClick={() => openWindow('contact')}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center space-x-1.5"
        >
          <span>Get in Touch</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Body Content Grid */}
      <div className="p-6 space-y-8 max-w-4xl mx-auto w-full">
        {/* 1. Introduction & Philosophy */}
        <div className="space-y-3 bg-zinc-900/60 p-5 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Design Philosophy & Craft</span>
          </div>
          <blockquote className="text-lg font-serif italic text-sky-200 border-l-2 border-sky-400 pl-4 py-1">
            "I don't just design experiences. I collect them."
          </blockquote>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {RESUME_DATA.aboutMe}
          </p>
        </div>

        {/* 2. My Journey Timeline */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>My Career & Creative Journey</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-zinc-900/70 border border-white/10 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Foundation</span>
              <h3 className="font-bold text-white">BFA in Applied Art</h3>
              <p className="text-[11px] text-zinc-400">JNAFAU · Visual Communication Design</p>
            </div>

            <div className="p-3.5 bg-zinc-900/70 border border-white/10 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">Enterprise Craft</span>
              <h3 className="font-bold text-white">TCS Tech SW Service</h3>
              <p className="text-[11px] text-zinc-400">Software service portal modernization</p>
            </div>

            <div className="p-3.5 bg-zinc-900/70 border border-white/10 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Scale & Search</span>
              <h3 className="font-bold text-white">Ultimatix TX Team</h3>
              <p className="text-[11px] text-zinc-400">Enterprise search for 500k+ users</p>
            </div>

            <div className="p-3.5 bg-zinc-900/70 border border-white/10 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">Frontier</span>
              <h3 className="font-bold text-white">AI & Living Code</h3>
              <p className="text-[11px] text-zinc-400">Cursor, Antigravity, Claude & Lovable</p>
            </div>
          </div>
        </div>

        {/* 3. Core Competencies */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Core Competencies & Capabilities</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {RESUME_DATA.skills.map((skill, idx) => (
              <div key={idx} className="p-2.5 bg-zinc-900/80 border border-white/10 rounded-xl flex items-center space-x-2 text-xs text-zinc-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Certifications & Specializations */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Certifications & Specializations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {RESUME_DATA.certifications.map((cert, idx) => (
              <div key={idx} className="p-3 bg-zinc-900/60 border border-white/10 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{cert.title}</div>
                  <div className="text-[11px] text-zinc-400">{cert.issuer}</div>
                </div>
                <span className="text-amber-400 text-xs">✓ Verified</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Personal Interests */}
        <div className="space-y-3 pb-4">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>Interests & Side Quests</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {RESUME_DATA.interests.map((interest, idx) => (
              <span key={idx} className="px-3 py-1 bg-rose-950/40 text-rose-300 border border-rose-800/40 rounded-full text-xs font-medium">
                🎨 {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
