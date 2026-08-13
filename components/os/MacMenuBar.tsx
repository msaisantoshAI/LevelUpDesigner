'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, 
  Search, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Sliders, 
  Wifi, 
  Bluetooth, 
  Sun, 
  Moon, 
  Music,
  Lock,
  FolderOpen,
  Terminal,
  FileText,
  HelpCircle,
  BatteryCharging,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { sounds } from '../../utils/soundEffects';

type ActiveMenu = 'sai' | 'file' | 'edit' | 'view' | 'window' | 'help' | 'wifi' | 'battery' | 'controlCenter' | null;

export const MacMenuBar: React.FC = () => {
  const osMode = useOSStore((s) => s.osMode);
  const toggleOSMode = useOSStore((s) => s.toggleOSMode);
  const soundEnabled = useOSStore((s) => s.soundEnabled);
  const toggleSound = useOSStore((s) => s.toggleSound);
  const activeWindowId = useOSStore((s) => s.activeWindowId);
  const windows = useOSStore((s) => s.windows);
  const setSpotlightOpen = useOSStore((s) => s.setSpotlightOpen);
  const setViewMode = useOSStore((s) => s.setViewMode);
  const openWindow = useOSStore((s) => s.openWindow);
  const closeWindow = useOSStore((s) => s.closeWindow);
  const minimizeWindow = useOSStore((s) => s.minimizeWindow);
  const maximizeWindow = useOSStore((s) => s.maximizeWindow);
  const setLocked = useOSStore((s) => s.setLocked);

  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [timeStr, setTimeStr] = useState('');

  const [volumeLevel, setVolumeLevel] = useState(85);
  const [brightnessLevel, setBrightnessLevel] = useState(95);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', weekday: 'short', month: 'short', day: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeTitle = activeWindowId ? windows[activeWindowId]?.title || 'Finder' : 'Finder';

  const toggleMenu = (menu: ActiveMenu) => {
    if (soundEnabled) sounds.playClick();
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <div ref={navRef} className="relative z-50">
      {/* MACOS TOP MENU BAR CONTAINER */}
      <div className="fixed top-0 left-0 right-0 h-7 bg-black/40 backdrop-blur-2xl border-b border-white/15 z-40 flex items-center justify-between px-3 text-xs text-white select-none">
        
        {/* Left Side: Logo & Native Menus */}
        <div className="flex items-center space-x-1.5">
          {/* Apple / Sai Logo Menu Trigger */}
          <button
            onClick={() => toggleMenu('sai')}
            className={`p-1 rounded flex items-center justify-center transition-colors ${
              activeMenu === 'sai' ? 'bg-white/25 text-white' : 'hover:bg-white/15 text-zinc-100'
            }`}
          >
            <Apple className="w-3.5 h-3.5 fill-current text-white" />
          </button>

          {/* Active App Title / Branding */}
          <span className="font-extrabold text-white tracking-tight px-1.5">{activeTitle}</span>

          {/* Top Dropdown Menu Triggers */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => toggleMenu('file')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                activeMenu === 'file' ? 'bg-white/20 text-white font-medium' : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              File
            </button>
            <button
              onClick={() => toggleMenu('edit')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                activeMenu === 'edit' ? 'bg-white/20 text-white font-medium' : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => toggleMenu('view')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                activeMenu === 'view' ? 'bg-white/20 text-white font-medium' : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              View
            </button>
            <button
              onClick={() => toggleMenu('window')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                activeMenu === 'window' ? 'bg-white/20 text-white font-medium' : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Window
            </button>
            <button
              onClick={() => toggleMenu('help')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                activeMenu === 'help' ? 'bg-white/20 text-white font-medium' : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Help
            </button>
          </div>
        </div>

        {/* Right Side: Indicators & System Controls */}
        <div className="flex items-center space-x-2.5 text-[11px]">
          {/* Wi-Fi Indicator Trigger */}
          <button
            onClick={() => toggleMenu('wifi')}
            className={`p-1 rounded transition-colors ${
              activeMenu === 'wifi' ? 'bg-white/20 text-white' : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
            title="Wi-Fi Status"
          >
            <Wifi className="w-3.5 h-3.5 text-sky-400" />
          </button>

          {/* Battery Indicator Trigger */}
          <button
            onClick={() => toggleMenu('battery')}
            className={`p-1 rounded transition-colors ${
              activeMenu === 'battery' ? 'bg-white/20 text-white' : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
            title="Battery Status"
          >
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
          </button>

          {/* Control Center Trigger */}
          <button
            onClick={() => toggleMenu('controlCenter')}
            className={`p-1 rounded transition-colors ${
              activeMenu === 'controlCenter' ? 'bg-white/25 text-white' : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
            title="Control Center"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          {/* Spotlight Search Trigger (⌘K) */}
          <button
            onClick={() => setSpotlightOpen(true)}
            className="flex items-center space-x-1 px-2 py-0.5 hover:bg-white/20 rounded text-zinc-300 hover:text-white transition-colors"
            title="Spotlight Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[10px] font-mono opacity-70">⌘K</span>
          </button>

          {/* Audio Sound FX Toggle */}
          <button
            onClick={() => {
              toggleSound();
              if (!soundEnabled) sounds.playClick();
            }}
            className="p-1 hover:bg-white/20 rounded text-zinc-300 hover:text-white transition-colors"
            title={soundEnabled ? 'Mute OS Sound FX' : 'Enable OS Sound FX'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
          </button>

          {/* OS Skin Mode Toggle Button */}
          <button
            onClick={() => {
              toggleOSMode();
              if (soundEnabled) sounds.playClick();
            }}
            className="flex items-center space-x-1.5 px-2.5 py-0.5 bg-white/15 hover:bg-white/25 border border-white/20 rounded-full text-[11px] font-medium text-sky-300 transition-all transform hover:scale-105 active:scale-95 shadow-sm"
            title="Toggle OS Theme (macOS / Win 11)"
          >
            <Monitor className="w-3 h-3 text-sky-400" />
            <span>{osMode === 'mac' ? 'macOS' : 'Win 11'}</span>
          </button>

          {/* Live Dynamic Date & Time */}
          <span className="font-semibold text-zinc-200 text-[11px] font-mono pl-1">{timeStr}</span>
        </div>
      </div>

      {/* DROPDOWN MENUS CONTAINER */}
      <AnimatePresence>
        {/* 1. Sai / Apple System Menu */}
        {activeMenu === 'sai' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.12 }}
            className="fixed top-8 left-3 z-50 w-56 bg-zinc-900/90 border border-white/20 rounded-xl shadow-2xl backdrop-blur-2xl py-1 text-xs text-zinc-200 divide-y divide-white/10"
          >
            <div className="px-3 py-1.5 font-bold text-white flex items-center justify-between">
              <span>SaiBook Pro</span>
              <span className="text-[10px] font-mono text-amber-400">Sonoma 15.0</span>
            </div>
            <div className="py-1">
              <button onClick={() => { openWindow('about-mac'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
                <Apple className="w-3.5 h-3.5" />
                <span>About This Mac</span>
              </button>
              <button onClick={() => { openWindow('about'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
                <FileText className="w-3.5 h-3.5" />
                <span>About Sai Santosh</span>
              </button>
              <button onClick={() => { openWindow('control-center'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>System Preferences...</span>
              </button>
            </div>
            <div className="py-1">
              <button onClick={() => { setLocked(true); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Lock Screen</span>
              </button>
              <button onClick={() => { toggleOSMode(); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
                <Monitor className="w-3.5 h-3.5" />
                <span>Switch OS Skin</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* 2. File Menu */}
        {activeMenu === 'file' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.12 }}
            className="fixed top-8 left-16 z-50 w-52 bg-zinc-900/90 border border-white/20 rounded-xl shadow-2xl backdrop-blur-2xl py-1 text-xs text-zinc-200 divide-y divide-white/10"
          >
            <div className="py-1">
              <button onClick={() => { openWindow('case-studies'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Open Work Folder</span>
              </button>
              <button onClick={() => { openWindow('terminal'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>New Terminal Window</span>
              </button>
            </div>
            <div className="py-1">
              <button
                onClick={() => {
                  if (activeWindowId) closeWindow(activeWindowId);
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-rose-600 hover:text-white flex items-center justify-between"
              >
                <span>Close Active Window</span>
                <span className="font-mono text-[10px] opacity-70">Esc</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* 3. Edit Menu */}
        {activeMenu === 'edit' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.12 }}
            className="fixed top-8 left-28 z-50 w-48 bg-zinc-900/90 border border-white/20 rounded-xl shadow-2xl backdrop-blur-2xl py-1 text-xs text-zinc-200"
          >
            <button onClick={() => setActiveMenu(null)} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex justify-between">
              <span>Undo</span>
              <span className="font-mono text-[10px] opacity-60">⌘Z</span>
            </button>
            <button onClick={() => setActiveMenu(null)} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex justify-between">
              <span>Copy</span>
              <span className="font-mono text-[10px] opacity-60">⌘C</span>
            </button>
            <button onClick={() => setActiveMenu(null)} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex justify-between">
              <span>Select All</span>
              <span className="font-mono text-[10px] opacity-60">⌘A</span>
            </button>
          </motion.div>
        )}

        {/* 4. View Menu */}
        {activeMenu === 'view' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.12 }}
            className="fixed top-8 left-36 z-50 w-52 bg-zinc-900/90 border border-white/20 rounded-xl shadow-2xl backdrop-blur-2xl py-1 text-xs text-zinc-200"
          >
            <button onClick={() => { openWindow('art'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>View Art & Visuals</span>
            </button>
            <button onClick={() => { setViewMode('linear'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Switch to Linear Portfolio</span>
            </button>
          </motion.div>
        )}

        {/* 5. Window Menu */}
        {activeMenu === 'window' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.12 }}
            className="fixed top-8 left-48 z-50 w-52 bg-zinc-900/90 border border-white/20 rounded-xl shadow-2xl backdrop-blur-2xl py-1 text-xs text-zinc-200"
          >
            <button
              onClick={() => {
                if (activeWindowId) minimizeWindow(activeWindowId);
                setActiveMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Minimize</span>
            </button>
            <button
              onClick={() => {
                if (activeWindowId) maximizeWindow(activeWindowId);
                setActiveMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Zoom / Maximize</span>
            </button>
          </motion.div>
        )}

        {/* 6. Help Menu */}
        {activeMenu === 'help' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.12 }}
            className="fixed top-8 left-56 z-50 w-56 bg-zinc-900/90 border border-white/20 rounded-xl shadow-2xl backdrop-blur-2xl py-1 text-xs text-zinc-200"
          >
            <button onClick={() => { openWindow('readme'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Read Me & Quick Guide</span>
            </button>
            <button onClick={() => { setSpotlightOpen(true); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search Portfolio (⌘K)</span>
            </button>
          </motion.div>
        )}

        {/* 7. Wi-Fi Status Flyout */}
        {activeMenu === 'wifi' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.12 }}
            className="fixed top-8 right-16 z-50 w-64 bg-zinc-900/95 border border-white/20 rounded-xl shadow-2xl backdrop-blur-2xl p-3 text-xs text-white space-y-2"
          >
            <div className="flex items-center justify-between font-bold border-b border-white/10 pb-1.5">
              <span className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-sky-400" />
                <span>Wi-Fi Network</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">Connected</span>
            </div>
            <div className="space-y-1 text-zinc-300">
              <div className="flex justify-between"><span>Network:</span><span className="font-semibold text-white">TCS_Enterprise_5G</span></div>
              <div className="flex justify-between"><span>Signal:</span><span className="font-mono text-emerald-400">100% (Excel)</span></div>
              <div className="flex justify-between"><span>IP Address:</span><span className="font-mono text-zinc-400">192.168.1.104</span></div>
              <div className="flex justify-between"><span>Speed:</span><span className="font-mono text-sky-300">1.2 Gbps</span></div>
            </div>
          </motion.div>
        )}

        {/* 8. Battery Status Flyout */}
        {activeMenu === 'battery' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.12 }}
            className="fixed top-8 right-12 z-50 w-56 bg-zinc-900/95 border border-white/20 rounded-xl shadow-2xl backdrop-blur-2xl p-3 text-xs text-white space-y-2"
          >
            <div className="flex items-center justify-between font-bold border-b border-white/10 pb-1.5">
              <span className="flex items-center space-x-2">
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
                <span>Battery</span>
              </span>
              <span className="text-emerald-400 font-mono font-bold">98%</span>
            </div>
            <div className="space-y-1 text-zinc-300">
              <div className="flex justify-between"><span>Power Source:</span><span className="font-semibold text-white">Power Adapter</span></div>
              <div className="flex justify-between"><span>Condition:</span><span className="font-mono text-emerald-400">Normal</span></div>
            </div>
          </motion.div>
        )}

        {/* 9. Control Center Flyout */}
        {activeMenu === 'controlCenter' && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="fixed top-8 right-4 z-50 w-80 bg-zinc-900/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-4 text-white space-y-4 select-none"
          >
            {/* Top Connectivity Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/10 border border-white/10 rounded-xl flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Wi-Fi</div>
                  <div className="text-[10px] text-zinc-400">TCS_Enterprise</div>
                </div>
              </div>

              <div className="p-3 bg-white/10 border border-white/10 rounded-xl flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Bluetooth className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Bluetooth</div>
                  <div className="text-[10px] text-zinc-400">AirPods Pro</div>
                </div>
              </div>
            </div>

            {/* Display Brightness Slider */}
            <div className="p-3 bg-white/10 border border-white/10 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <span className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">Display Brightness</span>
                </span>
                <span className="font-mono text-zinc-400">{brightnessLevel}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={brightnessLevel}
                onChange={(e) => setBrightnessLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Sound Volume Slider */}
            <div className="p-3 bg-white/10 border border-white/10 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <span className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-sky-400" />
                  <span className="font-medium">Sound Volume</span>
                </span>
                <span className="font-mono text-zinc-400">{volumeLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volumeLevel}
                onChange={(e) => setVolumeLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => { openWindow('control-center'); setActiveMenu(null); }}
                className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-semibold text-sky-300 flex items-center justify-center space-x-2"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Preferences</span>
              </button>
              <button
                onClick={() => { setLocked(true); setActiveMenu(null); }}
                className="p-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-xl text-xs font-semibold text-amber-300 flex items-center justify-center space-x-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Screen</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
