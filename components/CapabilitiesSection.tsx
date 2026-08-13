'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Wrench, Sparkles, Terminal } from 'lucide-react';
import { RESUME_DATA } from '@/data/caseStudies';

const easing = [0.16, 1, 0.3, 1];

export const CapabilitiesSection: React.FC = () => {
  return (
    <section id="skills" className="px-5 py-12 md:px-8 md:py-16 lg:px-[120px]">
      <div className="section-surface-shadow mx-auto w-full max-w-[1200px] rounded-[20px] bg-white p-6 md:p-10 border border-black/5">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block mb-2">
            02 / SKILLS & ALL TOOLS
          </span>
          <h2 className="font-display text-[32px] font-bold leading-[0.98] tracking-tight text-primary md:text-[50px] mb-3">
            Craft & AI Tools Ecosystem
          </h2>
          <p className="text-base text-text-secondary font-medium leading-relaxed font-sans">
            100% verified skills and design-to-code tool stack from my professional practice:
          </p>
        </div>

        {/* 12 Skills Grid */}
        <div className="mb-12">
          <h3 className="font-display font-bold text-lg text-primary mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Core Design & Leadership Skills</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {RESUME_DATA.skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-bg-offwhite border border-black/5 flex items-center gap-2.5 hover:border-primary/20 transition-all shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-xs text-primary">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 12 Tools Grid from Resume Image */}
        <div className="pt-8 border-t border-black/10">
          <h3 className="font-display font-bold text-lg text-primary mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" />
            <span>All Tools (Design, Code & AI Assistants)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {RESUME_DATA.tools.map((tool, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center transition-all shadow-sm ${
                  tool.category.includes('AI')
                    ? 'bg-slate-900 text-white border-indigo-500/30'
                    : 'bg-bg-offwhite text-primary border-black/5 hover:border-primary/20'
                }`}
              >
                <span className="font-display font-bold text-sm block">
                  {tool.name}
                </span>
                <span className={`text-[10px] font-mono block mt-0.5 ${tool.category.includes('AI') ? 'text-indigo-300' : 'text-muted'}`}>
                  {tool.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
