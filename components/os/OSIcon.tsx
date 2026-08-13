import React from 'react';
import { 
  Folder, 
  FileText, 
  AppWindow, 
  FileCheck, 
  Trash2, 
  Terminal, 
  Mail, 
  Briefcase,
  Sparkles,
  Shield,
  Layers,
  Cpu,
  Globe,
  Settings,
  Compass,
  LayoutGrid
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export interface OSIconProps {
  type: string;
  size?: number;
  label?: string;
  badge?: string;
  className?: string;
}

export const OSIcon: React.FC<OSIconProps> = ({ type, size = 48, label, badge, className = '' }) => {
  const osMode = useOSStore((s) => s.osMode);

  const getIconElement = () => {
    switch (type) {
      case 'folder':
      case 'case-studies':
        return <Folder className="w-1/2 h-1/2 drop-shadow" />;
      case 'text':
      case 'about':
        return <FileText className="w-1/2 h-1/2 drop-shadow" />;
      case 'app':
      case 'skills':
        return <AppWindow className="w-1/2 h-1/2 drop-shadow" />;
      case 'pdf':
      case 'resume':
        return <FileCheck className="w-1/2 h-1/2 drop-shadow" />;
      case 'trash':
        return <Trash2 className="w-1/2 h-1/2 drop-shadow" />;
      case 'terminal':
        return <Terminal className="w-1/2 h-1/2 text-emerald-400 drop-shadow" />;
      case 'mail':
      case 'contact':
        return <Mail className="w-1/2 h-1/2 drop-shadow" />;
      case 'case':
        return <Briefcase className="w-1/2 h-1/2 drop-shadow" />;
      case 'research':
        return <Sparkles className="w-1/2 h-1/2 drop-shadow" />;
      case 'systems':
        return <Layers className="w-1/2 h-1/2 drop-shadow" />;
      case 'craft':
        return <Shield className="w-1/2 h-1/2 drop-shadow" />;
      case 'ai':
        return <Cpu className="w-1/2 h-1/2 drop-shadow" />;
      case 'browser':
        return <Compass className="w-1/2 h-1/2 drop-shadow" />;
      case 'settings':
        return <Settings className="w-1/2 h-1/2 drop-shadow" />;
      default:
        return <Folder className="w-1/2 h-1/2 drop-shadow" />;
    }
  };

  // macOS Apple HIG Squircle Gradient Palettes
  const getMacGradient = () => {
    switch (type) {
      case 'folder':
      case 'case-studies':
        return 'from-sky-400 via-blue-500 to-indigo-600 text-white shadow-blue-500/40';
      case 'text':
      case 'about':
        return 'from-amber-300 via-yellow-500 to-orange-500 text-slate-950 shadow-amber-500/40';
      case 'app':
      case 'skills':
        return 'from-emerald-400 via-teal-500 to-cyan-600 text-white shadow-teal-500/40';
      case 'pdf':
      case 'resume':
        return 'from-rose-500 via-red-600 to-pink-600 text-white shadow-red-500/40';
      case 'trash':
        return 'from-slate-600 via-zinc-700 to-zinc-800 text-zinc-200 shadow-black/50';
      case 'terminal':
        return 'from-slate-900 via-zinc-900 to-black text-emerald-400 border border-white/20 shadow-black/60';
      case 'mail':
      case 'contact':
        return 'from-blue-500 via-indigo-600 to-purple-600 text-white shadow-blue-600/40';
      case 'case':
        return 'from-violet-500 via-purple-600 to-indigo-700 text-white shadow-purple-500/40';
      case 'browser':
        return 'from-blue-400 via-sky-500 to-cyan-500 text-white shadow-sky-500/40';
      case 'settings':
        return 'from-slate-400 via-gray-500 to-zinc-600 text-white shadow-gray-500/40';
      default:
        return 'from-blue-500 to-indigo-600 text-white shadow-blue-500/40';
    }
  };

  // Windows 11 Fluent Acrylic Duotone Containers
  const getWinStyle = () => {
    switch (type) {
      case 'folder':
      case 'case-studies':
        return 'bg-gradient-to-b from-sky-900/90 to-blue-950/90 border-sky-400/50 text-sky-300 shadow-sky-900/30';
      case 'text':
      case 'about':
        return 'bg-gradient-to-b from-amber-900/90 to-orange-950/90 border-amber-400/50 text-amber-300 shadow-amber-900/30';
      case 'app':
      case 'skills':
        return 'bg-gradient-to-b from-teal-900/90 to-cyan-950/90 border-teal-400/50 text-teal-300 shadow-teal-900/30';
      case 'pdf':
      case 'resume':
        return 'bg-gradient-to-b from-rose-900/90 to-red-950/90 border-rose-400/50 text-rose-300 shadow-rose-900/30';
      case 'trash':
        return 'bg-gradient-to-b from-zinc-800/90 to-zinc-950/90 border-zinc-600/50 text-zinc-300 shadow-zinc-900/30';
      case 'terminal':
        return 'bg-black/95 border-emerald-500/60 text-emerald-400 shadow-black/80';
      case 'mail':
      case 'contact':
        return 'bg-gradient-to-b from-blue-900/90 to-indigo-950/90 border-blue-400/50 text-blue-300 shadow-blue-900/30';
      case 'case':
        return 'bg-gradient-to-b from-purple-900/90 to-indigo-950/90 border-purple-400/50 text-purple-300 shadow-purple-900/30';
      default:
        return 'bg-gradient-to-b from-blue-900/90 to-slate-950/90 border-blue-400/50 text-blue-300 shadow-blue-900/30';
    }
  };

  if (osMode === 'mac') {
    // Authentic macOS / iOS Apple HIG Squircle App Icon
    return (
      <div className={`relative flex flex-col items-center justify-center group ${className}`}>
        <div
          style={{ width: size, height: size }}
          className={`relative rounded-[22%] bg-gradient-to-br ${getMacGradient()} shadow-xl flex items-center justify-center transition-all duration-200 transform group-hover:scale-105 group-hover:-translate-y-1 overflow-hidden`}
        >
          {/* Specular Top Reflection Curve */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none rounded-t-[22%]" />
          {/* Subtle 1px Inner Highlight Rim */}
          <div className="absolute inset-0 rounded-[22%] ring-1 ring-white/30 pointer-events-none" />
          {getIconElement()}
          {badge && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
              {badge}
            </span>
          )}
        </div>
        {label && (
          <span className="mt-1.5 text-[11px] font-medium text-white tracking-tight text-center max-w-[95px] truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {label}
          </span>
        )}
      </div>
    );
  }

  // Authentic Windows 11 Fluent Acrylic Duotone Icon
  return (
    <div className={`relative flex flex-col items-center justify-center group ${className}`}>
      <div
        style={{ width: size, height: size }}
        className={`relative rounded-xl ${getWinStyle()} border backdrop-blur-xl shadow-lg flex items-center justify-center transition-all duration-200 group-hover:border-sky-400 group-hover:shadow-sky-500/30 group-hover:-translate-y-1`}
      >
        {/* Fluent Light Reflection */}
        <div className="absolute inset-0 bg-white/10 rounded-xl pointer-events-none" />
        {getIconElement()}
        {badge && (
          <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] font-semibold px-1.5 py-0.2 rounded-sm shadow">
            {badge}
          </span>
        )}
      </div>
      {label && (
        <span className="mt-1.5 text-[11px] font-normal text-slate-100 tracking-normal text-center max-w-[95px] truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {label}
        </span>
      )}
    </div>
  );
};
