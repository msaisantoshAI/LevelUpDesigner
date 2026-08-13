import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Folder, FileText, AppWindow, FileCheck, Mail, Terminal as TermIcon } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export const Spotlight: React.FC = () => {
  const spotlightOpen = useOSStore((s) => s.spotlightOpen);
  const setSpotlightOpen = useOSStore((s) => s.setSpotlightOpen);
  const openWindow = useOSStore((s) => s.openWindow);
  const [query, setQuery] = useState('');

  // Listen for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSpotlightOpen]);

  if (!spotlightOpen) return null;

  const items = [
    { id: 'case-studies', title: 'Case Studies — Enterprise Search & Service Portals', type: 'folder', action: () => openWindow('case-studies') },
    { id: 'case-ultimatix', title: 'Ultimatix (TX Team) — Case Study', type: 'case', action: () => openWindow('case-ultimatix') },
    { id: 'case-service', title: 'Tech SW Service Next Gen — Case Study', type: 'case', action: () => openWindow('case-service') },
    { id: 'case-ai', title: 'AI-Native UX Design System — Case Study', type: 'case', action: () => openWindow('case-ai') },
    { id: 'about', title: 'About_Me.txt — Biography & Certifications', type: 'text', action: () => openWindow('about') },
    { id: 'skills', title: 'Skills & Capabilities — Installed Apps', type: 'app', action: () => openWindow('skills') },
    { id: 'resume', title: 'Resume.pdf — PDF Preview & Download', type: 'pdf', action: () => openWindow('resume') },
    { id: 'terminal', title: 'Terminal — Interactive Developer CLI', type: 'terminal', action: () => openWindow('terminal') },
    { id: 'contact', title: 'Contact / Mail — Send Inquiry', type: 'mail', action: () => openWindow('contact') },
  ];

  const filtered = items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (itemAction: () => void) => {
    itemAction();
    setSpotlightOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-28 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-xl bg-zinc-900/90 border border-white/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl text-white"
        >
          {/* Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 space-x-3">
            <Search className="w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Spotlight Search (Type to find case studies, skills, resume...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-zinc-400 font-sans"
              autoFocus
            />
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
              ESC to close
            </span>
          </div>

          {/* Results List */}
          <div className="max-h-72 overflow-y-auto p-2 divide-y divide-white/5">
            {filtered.length === 0 ? (
              <div className="p-4 text-xs text-center text-zinc-400">No results found</div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.action)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sky-400">
                      {item.type === 'folder' && <Folder className="w-4 h-4" />}
                      {item.type === 'text' && <FileText className="w-4 h-4" />}
                      {item.type === 'app' && <AppWindow className="w-4 h-4" />}
                      {item.type === 'pdf' && <FileCheck className="w-4 h-4" />}
                      {item.type === 'mail' && <Mail className="w-4 h-4" />}
                      {item.type === 'terminal' && <TermIcon className="w-4 h-4" />}
                    </span>
                    <span className="text-xs font-medium text-zinc-100 group-hover:text-white">{item.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
