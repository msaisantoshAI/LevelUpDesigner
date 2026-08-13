'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '@/data/caseStudies';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const easing = [0.16, 1, 0.3, 1];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="px-5 py-12 md:px-8 md:py-16 lg:px-[120px]">
      <div className="section-surface-shadow mx-auto w-full max-w-[1200px] rounded-[20px] bg-white/80 p-6 md:p-10 border border-black/5">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block mb-2">
            03 / METHODOLOGY & PROCESS
          </span>
          <h2 className="font-display text-[32px] font-bold leading-[0.98] tracking-tight text-primary md:text-[50px] mb-3">
            How I Reduce Chaos to Structure
          </h2>
          <p className="text-base text-text-secondary font-medium leading-relaxed font-sans">
            A repeatable 4-stage framework blending traditional Nielsen Norman usability rigor with modern AI prototyping velocity.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]'
                    : 'bg-bg-cream/60 border-black/5 text-primary hover:border-primary/20'
                }`}
                data-cursor={`Step ${step.number}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-emerald-300' : 'text-primary'}`}>
                    PHASE {step.number}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-muted'}`}>
                    {step.phase}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base mb-2">
                  {step.title}
                </h3>
                <p className={`text-xs font-sans line-clamp-2 ${isActive ? 'text-slate-200' : 'text-muted'}`}>
                  {step.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Display Card */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easing }}
          className="rounded-2xl p-6 md:p-8 bg-bg-cream border border-black/5 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/10 mb-4">
            <div>
              <span className="font-mono text-xs text-primary font-bold tracking-wider block mb-1">
                CURRENT FOCUS · STEP {PROCESS_STEPS[activeStep].number}
              </span>
              <h3 className="font-display font-bold text-2xl text-primary">
                {PROCESS_STEPS[activeStep].title}
              </h3>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-black/5 text-primary font-mono text-xs shadow-sm">
              <span>Deliverable: <strong>{PROCESS_STEPS[activeStep].deliverable}</strong></span>
            </div>
          </div>

          <p className="text-base text-text-secondary leading-relaxed font-sans max-w-3xl mb-6">
            {PROCESS_STEPS[activeStep].description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-text-secondary">
            <div className="p-3.5 rounded-xl bg-white border border-black/5 shadow-sm">
              <span className="text-primary block mb-1 font-bold">Usability Heuristics</span>
              <span>NN/g 10 Usability Principles Audit</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-black/5 shadow-sm">
              <span className="text-primary block mb-1 font-bold">Accessibility Guardrails</span>
              <span>WCAG 2.1 AA Contrast & Key Nav</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-black/5 shadow-sm">
              <span className="text-indigo-600 block mb-1 font-bold">AI Workflow Velocity</span>
              <span>Claude & Cursor Prototyping</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
