'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { OSIcon } from './OSIcon';
import { sounds } from '../../utils/soundEffects';
import { 
  FolderOpen, 
  Terminal, 
  Sliders, 
  Info, 
  Sparkles, 
  Clock, 
  MapPin, 
  Calendar,
  Layers
} from 'lucide-react';

export const Desktop: React.FC = () => {
  const openWindow = useOSStore((s) => s.openWindow);
  const minimizeWindow = useOSStore((s) => s.minimizeWindow);
  const windows = useOSStore((s) => s.windows);
  const selectedDesktopIcon = useOSStore((s) => s.selectedDesktopIcon);
  const setSelectedDesktopIcon = useOSStore((s) => s.setSelectedDesktopIcon);
  const contextMenu = useOSStore((s) => s.contextMenu);
  const setContextMenu = useOSStore((s) => s.setContextMenu);
  const soundEnabled = useOSStore((s) => s.soundEnabled);
  const osMode = useOSStore((s) => s.osMode);

  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  // Initial desktop items list
  const [items, setItems] = useState([
    { id: 'case-studies', label: 'My Work', type: 'folder', meta: 'Directory · UX/Product Case Studies' },
    { id: 'experiments', label: 'Experiments', type: 'app', meta: 'Application · AI & Prototypes' },
    { id: 'side-quests', label: 'Side Quests', type: 'app', meta: 'Application · Adventures & Life' },
    { id: 'art', label: 'Art & Visuals', type: 'art', meta: 'Gallery · Artwork & Photography' },
    { id: 'about', label: 'About Me', type: 'text', meta: 'Profile · Story & Background' },
    { id: 'resume', label: 'Resume.pdf', type: 'pdf', meta: 'PDF Document · 240 KB' },
    { id: 'readme', label: 'Read Me.txt', type: 'text', meta: 'Plain Text · Welcome Note' },
    { id: 'contact', label: 'Contact Me', type: 'mail', meta: 'Application · Mail Composer' },
  ]);

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleIconClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDesktopIcon(id);
    setContextMenu(null);
  };

  const handleIconDoubleClick = (id: string) => {
    if (soundEnabled) sounds.playOpen();
    openWindow(id);
    setSelectedDesktopIcon(null);
    setContextMenu(null);
  };

  const handleContextMenu = (id: string | null, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDesktopIcon(id);
    setContextMenu({ x: e.clientX, y: e.clientY, iconId: id });
  };

  const handleDesktopClick = () => {
    setSelectedDesktopIcon(null);
    setContextMenu(null);
  };

  const handleShowDesktop = () => {
    Object.values(windows).forEach((w) => {
      if (w.isOpen && !w.isMinimized) {
        minimizeWindow(w.id);
      }
    });
    setContextMenu(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedDesktopIcon) {
        const currIndex = items.findIndex((i) => i.id === selectedDesktopIcon);
        if (e.key === 'Enter') {
          handleIconDoubleClick(selectedDesktopIcon);
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          const next = items[(currIndex + 1) % items.length];
          setSelectedDesktopIcon(next.id);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          const prev = items[(currIndex - 1 + items.length) % items.length];
          setSelectedDesktopIcon(prev.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDesktopIcon, items]);

  return (
    <div
      onClick={handleDesktopClick}
      onContextMenu={(e) => handleContextMenu(null, e)}
      className="absolute inset-0 pt-10 pb-20 px-8 z-0 overflow-hidden select-none"
    >
      {/* 1. TOP-RIGHT DESKTOP WIDGETS (Clock & Introduction) */}
      <div className="absolute top-12 right-10 z-0 flex flex-col items-end space-y-4 pointer-events-auto">
        {/* Desktop Clock Widget */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-black/25 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl text-right text-white space-y-1 w-64 border-t-white/30"
        >
          <div className="flex items-center justify-end space-x-2 text-amber-300 text-xs font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>Local Time</span>
          </div>
          <div className="text-4xl font-extrabold font-mono tracking-tight text-white drop-shadow-md">
            {timeStr}
          </div>
          <div className="flex items-center justify-end space-x-3 text-xs text-sky-200 font-medium">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-sky-300" />
              <span>{dateStr}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-rose-400" />
              <span>Hyderabad / Global</span>
            </span>
          </div>
        </motion.div>

        {/* Desktop Introduction System Widget */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-5 bg-black/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl text-left text-white max-w-sm border-t-white/30 space-y-2.5"
        >
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-sky-500/30 border border-sky-400/50 rounded-full text-[10px] font-mono text-sky-300 font-bold uppercase tracking-wider">
              System Welcome
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-white">
              Welcome to Sai's Mac 👋
            </h2>
            <p className="text-xs text-amber-300/90 font-medium mt-0.5">
              UX/Product Designer · Visual Artist · SideQuester
            </p>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Explore my design work, AI experiments, side quests, and life through my personal macOS desktop environment.
          </p>

          <div className="pt-1 flex items-center justify-between border-t border-white/10 text-[11px] text-zinc-400 font-mono">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white font-bold">⌘K</kbd> to Search</span>
            <button
              onClick={() => openWindow('case-studies')}
              className="text-sky-300 hover:text-white font-semibold flex items-center space-x-1 hover:underline"
            >
              <span>Open Work</span>
              <span>→</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* 2. DRAGGABLE DESKTOP ICONS GRID */}
      <div className="relative z-10 flex flex-col flex-wrap items-start content-start gap-6 max-h-[calc(100vh-140px)]">
        {items.map((item) => {
          const isSelected = selectedDesktopIcon === item.id;

          return (
            <motion.div
              key={item.id}
              drag
              dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 120, bottom: window.innerHeight - 180 }}
              dragElastic={0.1}
              onClick={(e) => handleIconClick(item.id, e)}
              onDoubleClick={() => handleIconDoubleClick(item.id)}
              onContextMenu={(e) => handleContextMenu(item.id, e)}
              tabIndex={0}
              aria-label={`Desktop item ${item.label}`}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-150 border ${
                isSelected
                  ? 'bg-sky-500/35 border-sky-400/70 ring-2 ring-sky-400/60 shadow-2xl backdrop-blur-md'
                  : 'border-transparent hover:bg-white/15'
              }`}
            >
              <OSIcon type={item.type} size={54} label={item.label} />
            </motion.div>
          );
        })}
      </div>

      {/* 3. RIGHT-CLICK DESKTOP CONTEXT MENU */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
            onClick={(e) => e.stopPropagation()}
            className="fixed z-50 w-56 bg-zinc-900/95 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-2xl py-1.5 text-xs text-zinc-200 divide-y divide-white/10 select-none"
          >
            {contextMenu.iconId ? (
              <>
                <div className="py-1">
                  <button
                    onClick={() => {
                      handleIconDoubleClick(contextMenu.iconId!);
                    }}
                    className="w-full text-left px-3.5 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2 font-medium"
                  >
                    <FolderOpen className="w-4 h-4 text-sky-400" />
                    <span>Open Item</span>
                  </button>
                </div>
                <div className="px-3.5 py-2 text-[11px] text-zinc-400 bg-zinc-950/50 space-y-0.5">
                  <div className="font-semibold text-zinc-100">
                    {items.find((i) => i.id === contextMenu.iconId)?.label}
                  </div>
                  <div>{items.find((i) => i.id === contextMenu.iconId)?.meta}</div>
                </div>
              </>
            ) : (
              <div className="py-1">
                <button
                  onClick={() => {
                    openWindow('about-mac');
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2"
                >
                  <Info className="w-3.5 h-3.5 text-sky-400" />
                  <span>About Sai's Mac</span>
                </button>

                <button
                  onClick={() => {
                    openWindow('control-center');
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Change Wallpaper & Settings</span>
                </button>

                <button
                  onClick={handleShowDesktop}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Show Desktop</span>
                </button>

                <button
                  onClick={() => {
                    openWindow('terminal');
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2"
                >
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Open Terminal CLI</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
