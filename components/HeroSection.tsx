'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Layers, Cpu } from 'lucide-react';
import { RESUME_DATA } from '@/data/caseStudies';

const easing = [0.16, 1, 0.3, 1];

export const HeroSection: React.FC = () => {
  return (
    <section id="top" className="px-5 pb-0 pt-6 md:px-8 md:pt-10 lg:px-[120px]">
      {/* Main Hero Surface Card matching benshih.design */}
      <div className="section-surface-shadow relative mx-auto w-full max-w-[1200px] overflow-hidden rounded-[20px] bg-white p-6 md:p-12 border border-black/5">
        {/* Background Dot Grid */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none dot-grid" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none dot-grid-dense" />

        <div className="relative flex flex-col gap-6">
          {/* Main Title */}
          <h1 className="font-display text-[44px] font-bold leading-[0.96] tracking-tight text-primary md:text-[82px] md:leading-[0.92]">
            Hi, I'm Sai.<br />
            <span className="bg-gradient-to-r from-primary via-emerald-800 to-indigo-900 bg-clip-text text-transparent">
              UX Designer & AI Builder.
            </span>
          </h1>

          {/* Subhead Description with Inline Pills */}
          <p className="max-w-[840px] text-[18px] font-medium leading-[1.45] text-text-secondary md:text-[22px]">
            Results-driven UX Designer with <strong className="text-primary font-semibold">3+ years of experience</strong> designing intuitive web and mobile experiences. Streamlining enterprise workflows at{' '}
            <span className="inline-block">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-offwhite px-3 py-[4px] align-middle shadow-sm border border-black/10 mx-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span className="text-[13px] font-bold text-primary md:text-[14px]">Ultimatix ( TX Team )</span>
              </span>
            </span>
            {' '}and digital modernization at{' '}
            <span className="inline-block">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111] px-3 py-[4px] align-middle shadow-md mx-1 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span className="text-[13px] font-semibold md:text-[14px]">Tech SW Service - Next Gen</span>
              </span>
            </span>.
          </p>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 pt-2 md:hidden">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-full bg-primary text-white h-11 px-5 text-sm shadow-md"
            >
              <span>Explore Recent Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-full border border-primary/20 text-primary h-11 px-5 text-sm bg-transparent"
            >
              <span>Learn More About Me</span>
            </a>
          </div>
        </div>

        {/* 4-Card Hero Deck (3D Horizontal Stacked Deck) matching benshih.design */}
        <div className="relative mt-12 hidden md:flex min-h-[340px] w-full items-center justify-between gap-4 lg:mt-14 xl:min-h-[380px]">
          {/* Card 1: Selected Work (Warm Orange Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.1 }}
            className="relative flex-1 h-[320px] rounded-[20px] p-6 shadow-card border border-black/5 bg-[#FF7A59] text-slate-900 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase opacity-80 block">
                01 / RECENT WORK
              </span>
              <h2 className="font-display text-[26px] font-bold leading-[1.05] text-slate-950 lg:text-[32px]">
                Selected work
              </h2>
              <p className="text-[14px] font-medium leading-[1.4] text-slate-900/90">
                See how I turn complex enterprise problems into shipped intuitive experiences with 80%+ issue reduction.
              </p>
            </div>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-[8px] bg-black text-white px-4 py-2 text-sm font-semibold hover:opacity-85 transition-opacity w-fit shadow-sm"
              data-cursor="Case Studies"
            >
              <span>Read Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Card 2: Interactive Video / Video Card Preview Frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.2 }}
            className="relative flex-1 h-[320px] rounded-[20px] p-6 shadow-card border border-black/5 bg-slate-950 text-white flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
          >
            <div className="space-y-2 relative z-10">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-400 block">
                PROTOTYPE PREVIEW
              </span>
              <h3 className="font-display text-xl font-bold text-white">
                Ultimatix "All Results" Search
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Structured hierarchy resolving search usability challenges for 500,000+ TCS users.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md relative z-10">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-emerald-400 font-bold">✓ 80%+ Issue Drop</span>
                <span className="text-slate-300">50% Ticket Drop</span>
              </div>
              <span className="text-[10px] text-slate-400 font-sans block">
                Resource tracking for TM System (TMS)
              </span>
            </div>
          </motion.div>

          {/* Card 3: AI-Native Workflows (Purple Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.3 }}
            className="relative flex-1 h-[320px] rounded-[20px] p-6 shadow-card border border-black/5 bg-[#8B5CF6] text-white flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-white/80 block">
                02 / AI ORCHESTRATION
              </span>
              <h2 className="font-display text-[26px] font-bold leading-[1.05] text-white lg:text-[32px]">
                AI-Native Tools
              </h2>
              <p className="text-[14px] font-medium leading-[1.4] text-white/90">
                Blending UX design with Cursor, Antigravity, Lovable, Claude, and GPT to guide users and build trust.
              </p>
            </div>
            <a
              href="#skills"
              className="inline-flex items-center gap-2 rounded-[8px] bg-black text-white px-4 py-2 text-sm font-semibold hover:opacity-85 transition-opacity w-fit shadow-sm"
              data-cursor="AI Tools"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Card 4: Enterprise Experience (Blue Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.4 }}
            className="relative flex-1 h-[320px] rounded-[20px] p-6 shadow-card border border-black/5 bg-[#3B82F6] text-white flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-white/80 block">
                03 / SYSTEMIC RIGOR
              </span>
              <h2 className="font-display text-[26px] font-bold leading-[1.05] text-white lg:text-[32px]">
                Enterprise Depth
              </h2>
              <p className="text-[14px] font-medium leading-[1.4] text-white/90">
                Heuristic evaluation, WCAG accessibility, Figma design systems, and cross-functional leadership.
              </p>
            </div>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-[8px] bg-black text-white px-4 py-2 text-sm font-semibold hover:opacity-85 transition-opacity w-fit shadow-sm"
              data-cursor="About Me"
            >
              <span>Learn About Me</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
