'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CheckCircle2, AlertTriangle, Cpu, Layers, Sparkles, User, FileText, ArrowRight, Shield, Zap, RefreshCw, Terminal, Check } from 'lucide-react';

interface MockupProps {
  type: 'search' | 'service' | 'ai-workflow';
}

const SEARCH_DATABASE = [
  { id: '1', title: 'Direct Download Form 16 (Part A & B)', category: 'actions', desc: 'Instant PDF download for Tax Year 2024–25 · Verified Payroll DB', type: 'Action', relevance: '99%', badge: 'High Intent' },
  { id: '2', title: 'Ultimatix Tax & Payroll Portal', category: 'apps', desc: 'Main Finance Module · Ultimatix TX Portal', type: 'Application', relevance: '98%', badge: 'Primary App' },
  { id: '3', title: 'TCS Income Tax Exemption Policy Document 2025', category: 'docs', desc: 'HR Policy PDF · Enterprise Compliance', type: 'Document', relevance: '92%', badge: 'Verified Policy' },
  { id: '4', title: 'Form 16A TDS Certificate Request Portal', category: 'apps', desc: 'Financial Services Micro-App', type: 'Application', relevance: '89%', badge: 'Micro-App' },
  { id: '5', title: 'Payroll Helpdesk & Tax Declaration Guide', category: 'docs', desc: 'Self-Serve KB Article #4092', type: 'Document', relevance: '85%', badge: 'Self-Serve' },
];

export const MockupVisuals: React.FC<MockupProps> = ({ type }) => {
  // Search State
  const [searchQuery, setSearchQuery] = useState('Tax Form 16');
  const [searchTab, setSearchTab] = useState<'all' | 'actions' | 'apps' | 'docs'>('all');
  const [isSearching, setIsSearching] = useState(false);

  // Service State
  const [ticketSubject, setTicketSubject] = useState('Unable to request Adobe Acrobat Pro license...');
  const [assignedSuccess, setAssignedSuccess] = useState(false);

  // AI Workflow State
  const [aiStep, setAiStep] = useState<0 | 1 | 2>(0);
  const [aiPrompt, setAiPrompt] = useState('Analyze 50 employee transcripts for search zero-state friction points');

  const filteredResults = SEARCH_DATABASE.filter(item => {
    const matchesTab = searchTab === 'all' || item.category === searchTab;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  if (type === 'search') {
    return (
      <div className="w-full bg-[#0B0C10] rounded-2xl border border-indigo-500/20 p-5 text-slate-100 font-sans shadow-2xl overflow-hidden relative group">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] pointer-events-none rounded-full" />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-300 font-semibold hidden sm:inline">
              Ultimatix TX Enterprise Search Engine
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Shield className="w-3 h-3" /> WCAG 2.1 AA Compliant
          </span>
        </div>

        {/* Interactive Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(true);
              setTimeout(() => setIsSearching(false), 200);
            }}
            placeholder="Search enterprise tools, policies, pay slips..."
            className="w-full bg-white/5 border border-indigo-500/40 rounded-xl pl-10 pr-24 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-400 font-mono transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded">
            Live Filter
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 no-scrollbar">
          {(['all', 'actions', 'apps', 'docs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSearchTab(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                searchTab === tab
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab === 'all' ? 'All Results (Intent Ranked)' : tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-2.5 min-h-[140px]">
          {isSearching ? (
            <div className="flex items-center justify-center py-8 text-xs font-mono text-slate-400 gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
              <span>Querying Ultimatix TX Knowledge Graph...</span>
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/40 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
                    {item.category === 'actions' ? <Zap className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{item.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-emerald-400 block">{item.relevance}</span>
                  <span className="text-[9px] font-mono text-slate-500">{item.badge}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-slate-400 font-mono">
              No results found for "{searchQuery}". Try searching "Form 16" or "Portal".
            </div>
          )}
        </div>

        {/* Footer Metrics */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Search Velocity: <strong>0.4s</strong> (was 3.2s)</span>
          <span className="text-emerald-400 font-semibold">✓ 80%+ Issue Reduction Deflection</span>
        </div>
      </div>
    );
  }

  if (type === 'service') {
    return (
      <div className="w-full bg-[#0B0D13] rounded-2xl border border-indigo-500/20 p-5 text-slate-100 font-sans shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Tech SW Service Next Gen — Ticket Workflow
            </h4>
            <p className="text-[11px] text-slate-400">Progressive Disclosure & Auto Deflection Engine</p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            50% Ticket Drop
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Support Ticket Form */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">Support Ticket Subject</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">Category & Persona Tag</label>
              <div className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-xs text-indigo-300 flex items-center justify-between">
                <span>Software License · Creative Applications</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">Auto-Detected</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center justify-between text-slate-200">
                <span>Form Complexity:</span>
                <strong className="text-emerald-400 font-mono">4 Inputs (was 20 inputs)</strong>
              </div>
              <p>Hides non-essential administrative fields using progressive disclosure rules.</p>
            </div>
          </div>

          {/* Inline Self-Resolution Panel */}
          <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-xl p-4 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Automated Deflection Suggestion</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Detected request for Adobe Acrobat Pro. SSO role auto-provisioning available instantly.
              </p>

              {assignedSuccess ? (
                <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>License assigned to employee SSO! Ticket deflected.</span>
                </div>
              ) : (
                <button
                  onClick={() => setAssignedSuccess(true)}
                  className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Auto-Assign Adobe License Now</span>
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Resolution Time: <strong>0 Minutes</strong></span>
              <span className="text-indigo-300">CSAT Score: 4.8 / 5</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AI Workflow
  return (
    <div className="w-full bg-[#0D0D12] rounded-2xl border border-indigo-500/20 p-5 text-slate-100 font-sans shadow-2xl">
      <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono font-bold text-white">AI-Native UX Research & Code Pipeline</span>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          3x Speed Acceleration
        </span>
      </div>

      {/* Step Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { step: 0, title: '01. Research Coding', tool: 'Claude / Perplexity' },
          { step: 1, title: '02. Living Prototype', tool: 'Cursor & Antigravity' },
          { step: 2, title: '03. Token Verification', tool: 'WCAG Contrast Bot' }
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => setAiStep(s.step as 0 | 1 | 2)}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              aiStep === s.step
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-[10px] font-mono font-bold block">{s.title}</span>
            <span className="text-[9px] font-sans opacity-80 block">{s.tool}</span>
          </button>
        ))}
      </div>

      {/* Step Content Preview */}
      <div className="p-4 rounded-xl bg-black/60 border border-white/10 min-h-[120px] font-mono text-xs text-slate-200">
        {aiStep === 0 && (
          <div className="space-y-2">
            <span className="text-indigo-400 font-bold block">// Prompt Execution: Qualitative Audit Analysis</span>
            <p className="text-slate-300 font-sans text-xs">
              Synthesized 50 employee user test transcripts against Nielsen Norman Heuristic #3 (User Control & Freedom) and #7 (Flexibility & Efficiency).
            </p>
            <div className="text-emerald-400 text-[11px] pt-1">
              ✓ Output: Identified 4 critical zero-state search friction patterns in 180 seconds.
            </div>
          </div>
        )}

        {aiStep === 1 && (
          <div className="space-y-2">
            <span className="text-indigo-300 font-bold block">// Living React Component Code Generator</span>
            <pre className="text-[10px] text-slate-300 overflow-x-auto bg-white/5 p-2 rounded border border-white/10">
{`<EnterpriseSearchInput 
  focusRing="WCAG_2.1_AA" 
  intentAutoSuggest={true}
  keyboardShortcut="Cmd+K"
/>`}
            </pre>
            <p className="text-[11px] text-slate-400 font-sans">
              Zero handoff gap between Figma tokens and functional code.
            </p>
          </div>
        )}

        {aiStep === 2 && (
          <div className="space-y-2">
            <span className="text-emerald-400 font-bold block">// Automated Accessibility Token Verification</span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="text-slate-400 block">Dark Base Text Contrast:</span>
                <strong className="text-emerald-400">14.2:1 (Passes AAA)</strong>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="text-slate-400 block">Keyboard Focus State:</span>
                <strong className="text-emerald-400">2px Ring Verified</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Tools: Claude · Cursor · Antigravity · Figma AI · Lovable</span>
        <span className="text-emerald-400 font-semibold">100% Craft & Speed</span>
      </div>
    </div>
  );
};
