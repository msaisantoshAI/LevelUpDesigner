import React, { useState } from 'react';
import { OSIcon } from '../OSIcon';
import { Sparkles, Shield, Layers, Cpu, Check, Wrench, Terminal as TermIcon } from 'lucide-react';
import { RESUME_DATA } from '../../../data/caseStudies';

interface SkillCluster {
  id: string;
  name: string;
  category: string;
  iconType: string;
  badge: string;
  description: string;
  skills: string[];
}

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: 'research',
    name: 'Research & Evaluation',
    category: 'Product Strategy & Usability',
    iconType: 'research',
    badge: 'Core',
    description: 'Diagnosing usability friction through empirical heuristic scoring, quantitative gap audits, and user testing.',
    skills: ['Heuristic Evaluation', 'UX Audit', 'Usability Testing', 'Data-Driven Design Decisions', 'Nielsen Norman Principles', 'User Interviews']
  },
  {
    id: 'systems',
    name: 'Systems Thinking',
    category: 'Scalability & Accessibility',
    iconType: 'systems',
    badge: 'Enterprise',
    description: 'Architecting design tokens, scalable component libraries, and ensuring full WCAG compliance for 500k+ users.',
    skills: ['Design Systems', 'Accessibility (WCAG AA/AAA)', 'Cross-functional Coordination', 'Project Management Basics', 'Information Architecture', 'Estimation Workflows']
  },
  {
    id: 'craft',
    name: 'Craft & Delivery',
    category: 'Interface & Prototyping',
    iconType: 'craft',
    badge: 'High-Fi',
    description: 'Crafting pixel-perfect interface mockups, micro-interactions, and responsive design specs for fast engineering handoff.',
    skills: ['Visual & Interface Design', 'Figma & Adobe XD Prototyping', 'Stakeholder Collaboration', 'Micro-interactions', 'Design Tokens', 'Design Specs & Handoff']
  },
  {
    id: 'ai',
    name: 'AI-Augmented Workflow',
    category: 'Next-Gen Orchestration',
    iconType: 'ai',
    badge: 'AI practice',
    description: 'Combining visual craft with AI assistants and living React code generators to accelerate research, prototyping, and alignment.',
    skills: ['GPT & Claude Synthesis', 'Perplexity Research', 'Lovable & Antigravity', 'Cursor Prompt Coding', 'AI UX Trust Patterns', 'Living Code Specs']
  }
];

export const SkillsWindow: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<SkillCluster>(SKILL_CLUSTERS[0]);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white overflow-hidden select-none">
      {/* Installed Apps Top Toolbar Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs text-zinc-400">
        <div className="flex items-center space-x-2">
          <Wrench className="w-4 h-4 text-teal-400" />
          <span className="font-semibold text-zinc-200">Installed Skill Applications</span>
        </div>
        <span className="text-zinc-500 font-mono">4 Skill Clusters Installed</span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar / App Icons Grid */}
        <div className="w-full md:w-5/12 p-4 bg-zinc-900/50 border-r border-zinc-800 overflow-y-auto space-y-3">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
            SELECT SKILL CLUSTER
          </div>
          {SKILL_CLUSTERS.map((cluster) => (
            <div
              key={cluster.id}
              onClick={() => setSelectedCluster(cluster)}
              className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                selectedCluster.id === cluster.id
                  ? 'bg-teal-950/60 border-teal-500/60 shadow-md shadow-teal-500/10'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900/80 hover:border-zinc-700'
              }`}
            >
              <OSIcon type={cluster.iconType} size={40} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate">{cluster.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-teal-300 border border-teal-900 font-mono">
                    {cluster.badge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate mt-0.5">{cluster.category}</p>
              </div>
            </div>
          ))}

          {/* Tools & Ecosystem Pills */}
          <div className="pt-4 border-t border-zinc-800/80">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              TOOL ECOSYSTEM ({RESUME_DATA.tools.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {RESUME_DATA.tools.map((t, i) => (
                <span key={i} className="text-[10px] px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-zinc-950">
          <div className="flex items-center space-x-4 border-b border-zinc-800 pb-4">
            <OSIcon type={selectedCluster.iconType} size={52} />
            <div>
              <span className="text-xs text-teal-400 font-mono tracking-wide">{selectedCluster.category}</span>
              <h2 className="text-xl font-extrabold text-white">{selectedCluster.name}</h2>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono text-zinc-400 uppercase">DESCRIPTION & IMPACT</h3>
            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
              {selectedCluster.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono text-zinc-400 uppercase">COMPETENCY BREAKDOWN</h3>
            <div className="grid grid-cols-1 gap-2">
              {selectedCluster.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-zinc-900/40 border border-zinc-800/80 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-teal-950 border border-teal-500/40 flex items-center justify-center text-teal-400 text-xs">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-medium text-zinc-200">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
