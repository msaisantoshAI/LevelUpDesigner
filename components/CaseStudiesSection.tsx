'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Lock } from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '@/data/caseStudies';
import { MockupVisuals } from './MockupVisuals';
import { CaseStudyModal } from './CaseStudyModal';

const easing = [0.16, 1, 0.3, 1];

export const CaseStudiesSection: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="px-5 py-12 md:px-8 md:py-16 lg:px-[120px]">
      {/* Section Surface Card Container matching benshih.design */}
      <div className="section-surface-shadow mx-auto w-full max-w-[1200px] rounded-[20px] bg-white p-6 md:p-10 border border-black/5">
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-black/10 flex flex-col md:flex-row md:items-end justify-between">
          <div className="space-y-1">
            <h2 className="font-display text-[34px] font-bold leading-[0.98] tracking-tight text-primary sm:text-[44px] lg:text-[60px]">
              Some recent work
            </h2>
            <p className="text-[17px] font-medium leading-[1.35] text-text-secondary sm:text-[19px] lg:text-xl">
              (from Tata Consultancy Services full-time projects)
            </p>
          </div>
          <span className="text-xs font-mono text-muted mt-3 md:mt-0 px-3 py-1 rounded-full bg-black/5 border border-black/10 font-medium">
            3+ Years Enterprise Experience
          </span>
        </div>

        {/* Timeline Stack matching benshih.design */}
        <div className="space-y-16 relative">
          {CASE_STUDIES.map((study) => (
            <div key={study.id} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-start">
              {/* Left Sticky Year Badge Column */}
              <div className="sticky top-[100px] z-20 flex items-center gap-3 pt-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
                <h3 className="font-display text-[32px] md:text-[42px] font-bold leading-none tracking-tight text-primary/30">
                  {study.year}
                </h3>
              </div>

              {/* Right Content & Screen Card */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: easing }}
                className="space-y-5 p-6 md:p-8 rounded-[20px] bg-bg-offwhite/80 border border-black/5 hover:border-primary/20 transition-all duration-300 group"
              >
                {/* Meta Strip */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider px-2.5 py-1 rounded bg-white border border-black/5">
                    {study.context.team} · {study.context.role}
                  </span>
                  <span className="text-xs font-mono text-muted">
                    {study.context.timeline}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h3 className="font-display text-[26px] md:text-[36px] font-bold leading-[1.08] tracking-tight text-primary group-hover:text-emerald-700 transition-colors">
                    {study.title}
                  </h3>
                  <p className="max-w-[720px] text-[15px] md:text-lg font-medium leading-[1.5] text-text-secondary">
                    {study.subtitle}
                  </p>
                </div>

                {/* Quantified Metrics */}
                <div className="flex flex-wrap items-center gap-4 py-2.5 border-y border-black/10 text-xs font-mono">
                  {study.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-bold text-primary">{m.value}</span>
                      <span className="text-muted">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Exact Resume Bullet Highlights */}
                <div className="space-y-2 py-1 text-xs text-text-secondary">
                  <span className="font-mono text-[10px] uppercase font-bold text-primary tracking-wider block mb-1">
                    Key Achievements & Responsibilities
                  </span>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {study.bullets.slice(0, 4).map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Video Card / Interactive Mockup Preview */}
                <div
                  onClick={() => setSelectedCaseStudy(study)}
                  className="cursor-pointer transform group-hover:scale-[1.005] transition-transform duration-300 rounded-[16px] overflow-hidden shadow-sm"
                  data-cursor="Read Case Study"
                >
                  <MockupVisuals type={study.screenType} />
                </div>

                {/* Action Trigger */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCaseStudy(study)}
                    className="inline-flex items-center gap-2 rounded-[8px] bg-black text-white hover:opacity-85 px-4 py-2.5 text-sm font-semibold transition-all shadow-sm"
                    data-cursor="Read Case Study"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono text-muted hidden sm:inline">
                    Password Protected / Enterprise Portfolio Spec
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal Drawer */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};
