import React, { useState } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { OSIcon } from '../os/OSIcon';
import { AboutWindow } from '../os/windows/AboutWindow';
import { CaseStudiesFolderWindow } from '../os/windows/CaseStudiesFolderWindow';
import { CaseStudyDetailWindow } from '../os/windows/CaseStudyDetailWindow';
import { SkillsWindow } from '../os/windows/SkillsWindow';
import { ResumeWindow } from '../os/windows/ResumeWindow';
import { TrashWindow } from '../os/windows/TrashWindow';
import { TerminalWindow } from '../os/windows/TerminalWindow';
import { ContactWindow } from '../os/windows/ContactWindow';

import { 
  Wifi, 
  Battery, 
  Signal, 
  Zap, 
  Monitor, 
  X, 
  ChevronLeft,
  Search
} from 'lucide-react';

export const MobileSpringboard: React.FC = () => {
  const osMode = useOSStore((s) => s.osMode);
  const toggleOSMode = useOSStore((s) => s.toggleOSMode);
  const setViewMode = useOSStore((s) => s.setViewMode);

  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  const apps = [
    { id: 'case-studies', title: 'Case Studies', type: 'folder' },
    { id: 'about', title: 'About Me', type: 'text' },
    { id: 'skills', title: 'Skills Grid', type: 'app' },
    { id: 'resume', title: 'Resume PDF', type: 'pdf' },
    { id: 'contact', title: 'Mail App', type: 'mail' },
    { id: 'terminal', title: 'Terminal', type: 'terminal' },
    { id: 'trash', title: 'Recycle Bin', type: 'trash' },
  ];

  const renderSheetContent = () => {
    switch (activeSheet) {
      case 'about':
        return <AboutWindow />;
      case 'case-studies':
        return <CaseStudiesFolderWindow />;
      case 'case-ultimatix':
        return <CaseStudyDetailWindow caseId="enterprise-search" />;
      case 'case-service':
        return <CaseStudyDetailWindow caseId="service-portal" />;
      case 'case-ai':
        return <CaseStudyDetailWindow caseId="ai-workflow" />;
      case 'skills':
        return <SkillsWindow />;
      case 'resume':
        return <ResumeWindow />;
      case 'trash':
        return <TrashWindow />;
      case 'terminal':
        return <TerminalWindow />;
      case 'contact':
        return <ContactWindow />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 relative overflow-hidden font-sans select-none">
      {/* iPhone Dynamic Island & Status Bar Top */}
      <div className="flex items-center justify-between text-xs text-slate-300 pt-2 pb-6 px-2">
        <div className="font-semibold text-sm">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* iPhone Dynamic Island Notch Pill */}
        <div className="w-24 h-5 bg-black border border-white/20 rounded-full flex items-center justify-center space-x-2 shadow-inner">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[9px] font-mono text-zinc-400">iOS 18</span>
        </div>

        {/* Signal & Battery Status Icons */}
        <div className="flex items-center space-x-2 text-slate-300">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* OS Skin Switcher & Bypass Pills */}
      <div className="flex items-center justify-between px-2 mb-4">
        <button
          onClick={toggleOSMode}
          className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[11px] text-sky-300 font-semibold backdrop-blur-md"
        >
          {osMode === 'mac' ? 'iOS Theme' : 'Android Theme'}
        </button>

        <button
          onClick={() => setViewMode('linear')}
          className="flex items-center space-x-1 px-3 py-1 bg-amber-950/80 border border-amber-500/40 rounded-full text-[11px] text-amber-300 font-bold backdrop-blur-md"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Linear Site</span>
        </button>
      </div>

      {/* Main Home Screen Springboard App Grid (4 Columns) */}
      <div className="my-auto grid grid-cols-4 gap-y-6 gap-x-3 max-w-sm mx-auto w-full px-2">
        {apps.map((app) => (
          <div
            key={app.id}
            onClick={() => setActiveSheet(app.id)}
            className="flex flex-col items-center justify-center cursor-pointer active:scale-90 transition-transform"
          >
            <OSIcon type={app.type} size={54} />
            <span className="mt-2 text-[11px] font-medium text-slate-200 text-center tracking-tight truncate w-full">
              {app.title}
            </span>
          </div>
        ))}
      </div>

      {/* iOS Floating Bottom Glass App Dock */}
      <div className="p-3 bg-white/15 border border-white/25 rounded-3xl backdrop-blur-2xl flex items-center justify-around max-w-sm mx-auto w-full shadow-2xl mb-2">
        {apps.slice(0, 4).map((app) => (
          <div
            key={app.id}
            onClick={() => setActiveSheet(app.id)}
            className="p-1 cursor-pointer active:scale-90 transition-transform"
          >
            <OSIcon type={app.type} size={44} />
          </div>
        ))}
      </div>

      {/* Full Screen iOS Slide-Up Modal Sheet */}
      {activeSheet && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in slide-in-from-bottom duration-300">
          {/* iOS Sheet Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs">
            <button
              onClick={() => setActiveSheet(null)}
              className="flex items-center space-x-1 text-sky-400 font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="font-bold text-white uppercase tracking-wider">{activeSheet}</span>
            <button
              onClick={() => setActiveSheet(null)}
              className="text-sky-400 font-bold"
            >
              Done
            </button>
          </div>
          <div className="flex-1 overflow-hidden">{renderSheetContent()}</div>
        </div>
      )}
    </div>
  );
};
