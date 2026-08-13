'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, ArrowRight, Sparkles, Layers, Cpu } from 'lucide-react';
import { CaseStudy } from '@/data/caseStudies';
import { MockupVisuals } from './MockupVisuals';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-background border border-card-border rounded-3xl shadow-2xl overflow-y-auto z-10 p-6 md:p-12 no-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-card border border-card-border text-muted hover:text-foreground hover:border-accent transition-colors"
            aria-label="Close Case Study Modal"
            data-cursor="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Strip */}
          <div className="mb-8 pr-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-accent px-3 py-1 rounded-full bg-accent-subtle border border-accent/30">
                CASE STUDY {caseStudy.number}
              </span>
              <span className="text-xs font-mono text-muted">{caseStudy.tag}</span>
            </div>
            <h2 className="font-display font-bold text-display-lg text-foreground mb-3">
              {caseStudy.title}
            </h2>
            <p className="text-lg text-muted max-w-3xl leading-relaxed">
              {caseStudy.subtitle}
            </p>
          </div>

          {/* Context Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-card border border-card-border mb-10 text-xs font-sans">
            <div>
              <span className="block text-muted font-mono uppercase text-[10px] tracking-wider mb-1">Role</span>
              <span className="font-semibold text-foreground">{caseStudy.context.role}</span>
            </div>
            <div>
              <span className="block text-muted font-mono uppercase text-[10px] tracking-wider mb-1">Team & Company</span>
              <span className="font-semibold text-foreground">{caseStudy.context.team} · {caseStudy.context.company}</span>
            </div>
            <div>
              <span className="block text-muted font-mono uppercase text-[10px] tracking-wider mb-1">Timeline</span>
              <span className="font-semibold text-foreground">{caseStudy.context.timeline}</span>
            </div>
            <div>
              <span className="block text-muted font-mono uppercase text-[10px] tracking-wider mb-1">Tools</span>
              <span className="font-semibold text-foreground">{caseStudy.context.tools.slice(0, 3).join(', ')}</span>
            </div>
          </div>

          {/* Quantified Metrics Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {caseStudy.metrics.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-card border border-card-border">
                <span className="font-mono text-3xl font-bold text-accent block mb-1">
                  {m.value}
                </span>
                <span className="font-display font-bold text-sm text-foreground block mb-1">
                  {m.label}
                </span>
                <p className="text-xs text-muted">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Screen Preview */}
          <div className="mb-12">
            <h3 className="font-mono text-xs text-muted uppercase tracking-wider mb-3">
              Interactive Component System & Mockup Preview
            </h3>
            <MockupVisuals type={caseStudy.screenType} />
          </div>

          {/* Detailed Narrative Sections */}
          <div className="space-y-12">
            {/* The Problem */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>The Problem — What Was Broken Before</span>
              </h3>
              <p className="text-muted leading-relaxed text-base">
                {caseStudy.problem.description}
              </p>
              <div className="space-y-2 pt-2">
                {caseStudy.problem.painPoints.map((pain, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-secondary">
                    <span className="font-mono text-accent font-bold">0{idx + 1}.</span>
                    <span>{pain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraints */}
            <div className="space-y-4 p-6 rounded-2xl bg-card border border-card-border">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span>Enterprise Environment & Technical Constraints</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted list-disc list-inside">
                {caseStudy.constraints.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Process & Artifacts */}
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-foreground">
                Process — Audit to Figma & Validation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.process.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-card border border-card-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-accent font-bold">STEP {step.step}</span>
                      {step.artifact && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-subtle text-accent">
                          {step.artifact.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-display font-bold text-base text-foreground">{step.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Specific Design Decision */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-card via-card to-accent-subtle/20 border border-accent/30 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
                Specific Design Judgment Defended
              </span>
              <h3 className="font-display font-bold text-xl text-foreground">
                {caseStudy.theDecision.title}
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                <strong>Rationale:</strong> {caseStudy.theDecision.rationale}
              </p>
              <p className="text-xs text-muted">
                <strong>Understood Trade-off:</strong> {caseStudy.theDecision.tradeoff}
              </p>
            </div>

            {/* Senior Reflection */}
            <div className="pt-6 border-t border-card-border">
              <span className="font-mono text-xs text-muted uppercase tracking-wider block mb-2">
                Senior Designer Reflection
              </span>
              <p className="text-base text-foreground italic font-sans border-l-2 border-accent pl-4 py-1">
                "{caseStudy.reflection}"
              </p>
            </div>
          </div>

          {/* Modal Footer Close */}
          <div className="mt-12 pt-6 border-t border-card-border flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors"
            >
              Close Case Study
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
