'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, ArrowRight, ShieldCheck, Palette, Heart } from 'lucide-react';
import { RESUME_DATA } from '@/data/caseStudies';

const easing = [0.16, 1, 0.3, 1];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="px-5 py-12 md:px-8 md:py-16 lg:px-[120px]">
      {/* Section Surface Card matching benshih.design */}
      <div className="section-surface-shadow mx-auto w-full max-w-[1200px] rounded-[20px] bg-white p-6 md:p-10 border border-black/5">
        <div className="space-y-4">
          <p className="text-[18px] font-semibold leading-[1.3] text-text-secondary md:text-xl">
            A bit about me
          </p>
          <h2 className="font-display text-[34px] font-bold leading-[0.98] tracking-tight text-primary md:text-[56px]">
            Design is how I think.<br />
            Building is how I prove it.
          </h2>
        </div>

        <div className="mt-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/* Editorial Photo Frame Box matching benshih.design */}
          <div className="relative h-[220px] w-full max-w-[354px] shrink-0 overflow-hidden rounded-[12px] border-8 border-[#ede7de] bg-slate-900 text-white p-6 flex flex-col justify-between shadow-md">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                FINE ARTS FOUNDATION
              </span>
              <h3 className="font-display text-xl font-bold">{RESUME_DATA.education.degree}</h3>
              <p className="text-xs text-slate-300 font-mono mt-1">{RESUME_DATA.education.institution}</p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>{RESUME_DATA.experienceYears}</span>
              <span className="text-emerald-400">TCS Ultimatix & Next Gen</span>
            </div>
          </div>

          {/* Bio Narrative from Resume */}
          <div className="w-full max-w-[720px] space-y-6">
            <p className="text-[18px] font-medium leading-[1.45] text-text-secondary md:text-xl">
              {RESUME_DATA.aboutMe}
            </p>

            <p className="text-sm md:text-base leading-relaxed text-muted font-sans border-l-2 border-primary/20 pl-4 py-1">
              {RESUME_DATA.experienceSummary}
            </p>

            <div className="pt-2">
              <a
                href="#skills"
                className="inline-flex items-center gap-2 rounded-[8px] border border-black bg-black text-white hover:opacity-85 px-[16px] py-[10px] text-sm font-semibold leading-5 shadow-sm transition-all"
                data-cursor="Skills & Certs"
              >
                <span>Explore Skills & Certifications</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Certifications Grid from Resume */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-xl text-primary">
              Certifications & Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {RESUME_DATA.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-bg-offwhite border border-black/5 hover:border-primary/20 transition-all shadow-sm"
              >
                <span className="font-bold text-sm text-primary block mb-1">
                  {cert.title}
                </span>
                <span className="text-xs font-mono text-muted block">
                  {cert.issuer}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interests & Human Layer */}
        <div className="mt-8 pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-primary">
            <Heart className="w-4 h-4 text-rose-500" />
            <span className="font-bold">Creative Passions & Interests:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {RESUME_DATA.interests.map((interest, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-bg-offwhite border border-black/5 text-text-secondary font-semibold">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
