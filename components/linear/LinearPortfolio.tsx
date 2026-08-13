import React, { useState } from 'react';
import { CASE_STUDIES, RESUME_DATA } from '../../data/caseStudies';
import { useOSStore } from '../../store/useOSStore';
import { 
  TrendingUp, 
  ArrowRight, 
  Download, 
  Mail, 
  Linkedin, 
  Globe, 
  CheckCircle, 
  Sparkles, 
  Monitor, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Wrench,
  FileText
} from 'lucide-react';

export const LinearPortfolio: React.FC = () => {
  const setViewMode = useOSStore((s) => s.setViewMode);
  const [activeCase, setActiveCase] = useState<string | null>(null);

  const selectedStudy = CASE_STUDIES.find((c) => c.id === activeCase);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white pb-20">
      {/* Top Sticky Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            SS
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">{RESUME_DATA.name}</h1>
            <p className="text-xs text-slate-400">UX Designer · TCS Ultimatix TX Team</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode('desktop')}
            className="flex items-center space-x-2 px-3.5 py-1.5 bg-sky-950/80 hover:bg-sky-900 border border-sky-500/40 rounded-full text-xs font-semibold text-sky-300 transition-all"
          >
            <Monitor className="w-3.5 h-3.5 text-sky-400" />
            <span>Enter OS Desktop View 🖥️</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-16 max-w-5xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-sky-950/60 border border-sky-500/30 rounded-full text-xs text-sky-300 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>3+ Years Enterprise UX · Tata Consultancy Services</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
          Designing Enterprise Workflows, System IA & AI Orchestration
        </h1>

        <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
          {RESUME_DATA.aboutMe}
        </p>

        {/* Hero Quantified Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
            <div className="text-3xl md:text-4xl font-extrabold text-sky-400 tracking-tight">80%+</div>
            <div className="text-sm font-bold text-white mt-1">Reduction in Recurring Issues</div>
            <div className="text-xs text-slate-400 mt-0.5">Achieved via Enterprise Search IA rebuild at TCS Ultimatix.</div>
          </div>
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
            <div className="text-3xl md:text-4xl font-extrabold text-teal-400 tracking-tight">50%</div>
            <div className="text-sm font-bold text-white mt-1">Decrease in Support Tickets</div>
            <div className="text-xs text-slate-400 mt-0.5">Streamlined self-serve navigation for 500k+ employees.</div>
          </div>
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
            <div className="text-3xl md:text-4xl font-extrabold text-purple-400 tracking-tight">BFA</div>
            <div className="text-sm font-bold text-white mt-1">Visual Communication</div>
            <div className="text-xs text-slate-400 mt-0.5">JNAFAU Fine Arts University degree in Applied Art.</div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="px-6 md:px-12 py-12 max-w-5xl mx-auto space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Featured Case Studies</h2>
          <p className="text-slate-400 text-xs mt-1">Deep dives into enterprise search, service workflows, and AI orchestration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              onClick={() => setActiveCase(cs.id)}
              className="p-6 bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-slate-900 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  {cs.context.timeline}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                  {cs.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3">{cs.subtitle}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-sky-400 font-semibold">
                <span>View Full Narrative</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal Viewer for Selected Case Study */}
        {selectedStudy && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-10">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-8 text-slate-100">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-sky-400 font-bold">{selectedStudy.tag}</span>
                <button
                  onClick={() => setActiveCase(null)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-white"
                >
                  Close ✕
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white">{selectedStudy.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{selectedStudy.subtitle}</p>

              {/* Quantified Outcomes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedStudy.metrics.map((m, i) => (
                  <div key={i} className="p-4 bg-slate-950 border border-sky-500/30 rounded-xl">
                    <div className="text-2xl font-extrabold text-sky-400">{m.value}</div>
                    <div className="text-xs font-bold text-white mt-1">{m.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{m.detail}</div>
                  </div>
                ))}
              </div>

              {/* Problem & Decision */}
              <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white">The Problem & Challenge</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedStudy.problem.description}</p>
              </div>

              <div className="space-y-3 bg-purple-950/30 p-5 rounded-xl border border-purple-500/30">
                <h3 className="text-sm font-bold text-purple-300">The Decision — Judgment Call Worth Defending</h3>
                <p className="text-xs text-slate-200"><strong>Rationale: </strong>{selectedStudy.theDecision.rationale}</p>
                <p className="text-xs text-slate-400"><strong>Trade-off: </strong>{selectedStudy.theDecision.tradeoff}</p>
              </div>

              <div className="text-right">
                <button
                  onClick={() => setActiveCase(null)}
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white rounded-xl"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* About & Skills Grid */}
      <section className="px-6 md:px-12 py-12 max-w-5xl mx-auto space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Skill Matrix & Competencies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESUME_DATA.skills.map((skill, idx) => (
            <div key={idx} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center space-x-3 text-xs">
              <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span className="font-semibold text-slate-200">{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 md:px-12 py-12 max-w-5xl mx-auto space-y-6">
        <div className="p-8 bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/30 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Let's Connect</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Reach out for UX Design leadership opportunities, enterprise project collaborations, or design inquiries.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${RESUME_DATA.email}`}
              className="flex items-center space-x-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-lg"
            >
              <Mail className="w-4 h-4" />
              <span>Email Sai</span>
            </a>
            <a
              href={RESUME_DATA.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
