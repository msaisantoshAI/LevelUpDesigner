import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { OSIcon } from './OSIcon';
import { 
  Search, 
  Volume2, 
  VolumeX, 
  Wifi, 
  Monitor, 
  ChevronUp,
  Power,
  RotateCcw,
  Moon,
  Sun,
  Bluetooth,
  Bell,
  Sliders,
  Sparkles,
  FileText,
  Clock,
  Battery
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Taskbar: React.FC = () => {
  const osMode = useOSStore((s) => s.osMode);
  const toggleOSMode = useOSStore((s) => s.toggleOSMode);
  const windows = useOSStore((s) => s.windows);
  const activeWindowId = useOSStore((s) => s.activeWindowId);
  const openWindow = useOSStore((s) => s.openWindow);
  const restoreWindow = useOSStore((s) => s.restoreWindow);
  const focusWindow = useOSStore((s) => s.focusWindow);
  const minimizeWindow = useOSStore((s) => s.minimizeWindow);
  const soundEnabled = useOSStore((s) => s.soundEnabled);
  const toggleSound = useOSStore((s) => s.toggleSound);
  const startMenuOpen = useOSStore((s) => s.startMenuOpen);
  const setStartMenuOpen = useOSStore((s) => s.setStartMenuOpen);
  const setViewMode = useOSStore((s) => s.setViewMode);

  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [powerMenuOpen, setPowerMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [startQuery, setStartQuery] = useState('');

  // Sliders state for Quick Settings flyout
  const [volumeLevel, setVolumeLevel] = useState(80);
  const [brightnessLevel, setBrightnessLevel] = useState(90);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(d.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const pinnedApps = [
    { id: 'case-studies', label: 'File Explorer', iconType: 'folder' },
    { id: 'about', label: 'Notepad', iconType: 'text' },
    { id: 'skills', label: 'Skills Grid', iconType: 'app' },
    { id: 'resume', label: 'PDF Viewer', iconType: 'pdf' },
    { id: 'contact', label: 'Mail App', iconType: 'mail' },
    { id: 'terminal', label: 'Terminal', iconType: 'terminal' },
    { id: 'trash', label: 'Recycle Bin', iconType: 'trash' },
  ];

  const recentFiles = [
    { name: 'Ultimatix_Enterprise_Search_IA.docx', time: '2h ago', action: () => openWindow('case-ultimatix') },
    { name: 'Sai_Santosh_Madhari_Resume.pdf', time: '4h ago', action: () => openWindow('resume') },
    { name: 'Tech_SW_Service_Prototypes.fig', time: 'Yesterday', action: () => openWindow('case-service') },
  ];

  const handleTaskbarIconClick = (id: string) => {
    if (soundEnabled) sounds.playClick();
    const win = windows[id];

    if (!win || !win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      restoreWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const filteredApps = pinnedApps.filter((item) =>
    item.label.toLowerCase().includes(startQuery.toLowerCase())
  );

  return (
    <>
      {/* WINDOWS 11 QUICK SETTINGS FLYOUT */}
      <AnimatePresence>
        {quickSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-14 right-4 z-50 w-80 bg-[#1c1c1c]/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl p-5 text-white space-y-5 select-none"
          >
            {/* Quick Action Toggles */}
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center justify-center p-3 bg-sky-600 rounded-xl space-y-1.5 hover:bg-sky-500 transition-colors">
                <Wifi className="w-5 h-5 text-white" />
                <span className="text-[11px] font-semibold">TCS_Enterprise</span>
              </button>

              <button className="flex flex-col items-center justify-center p-3 bg-sky-600 rounded-xl space-y-1.5 hover:bg-sky-500 transition-colors">
                <Bluetooth className="w-5 h-5 text-white" />
                <span className="text-[11px] font-semibold">Bluetooth</span>
              </button>

              <button
                onClick={() => {
                  toggleSound();
                  if (!soundEnabled) sounds.playClick();
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-xl space-y-1.5 transition-colors ${
                  soundEnabled ? 'bg-sky-600 text-white' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                <span className="text-[11px] font-semibold">{soundEnabled ? 'Sound On' : 'Muted'}</span>
              </button>
            </div>

            {/* Volume Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <span className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-sky-400" />
                  <span className="font-medium">Volume</span>
                </span>
                <span className="font-mono text-zinc-400">{volumeLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volumeLevel}
                onChange={(e) => setVolumeLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Display Brightness Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <span className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">Brightness</span>
                </span>
                <span className="font-mono text-zinc-400">{brightnessLevel}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={brightnessLevel}
                onChange={(e) => setBrightnessLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Quick Settings Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4 text-emerald-400" />
                <span>100% Fully Charged</span>
              </div>
              <button
                onClick={() => toggleOSMode()}
                className="text-sky-400 font-semibold hover:text-sky-300"
              >
                Switch OS Skin
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WINDOWS 11 AUTHENTIC START MENU */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.1, 0.9, 0.2, 1] }}
            className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl bg-[#1c1c1c]/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl text-white p-7 overflow-hidden select-none"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center mb-6">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4" />
              <input
                type="text"
                placeholder="Type here to search apps, portfolio case studies, skills..."
                value={startQuery}
                onChange={(e) => setStartQuery(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-zinc-400 outline-none focus:border-sky-500 shadow-inner"
                autoFocus
              />
            </div>

            {/* Pinned Applications Section */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white tracking-tight">Pinned Apps</span>
                <span className="text-[11px] font-mono text-sky-400">All apps →</span>
              </div>

              <div className="grid grid-cols-6 gap-3">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      openWindow(app.id);
                      setStartMenuOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group"
                  >
                    <OSIcon type={app.iconType} size={42} />
                    <span className="mt-2 text-[11px] font-medium text-zinc-200 group-hover:text-white truncate max-w-[80px] text-center">
                      {app.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Files Section */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-bold text-white">Recommended</span>
                <span className="text-[11px]">More →</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {recentFiles.map((file, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      file.action();
                      setStartMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <FileText className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-zinc-100 truncate text-[11px]">{file.name}</div>
                      <div className="text-[10px] text-zinc-400">{file.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom User Profile & Power Bar */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs relative">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-extrabold text-white text-xs shadow-md">
                  SS
                </div>
                <div>
                  <div className="font-bold text-white tracking-tight">Sai Santosh Madhari</div>
                  <div className="text-[10px] text-zinc-400">UX Designer · TCS Ultimatix TX Team</div>
                </div>
              </div>

              {/* Power Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setPowerMenuOpen(!powerMenuOpen)}
                  className="p-2 hover:bg-white/10 rounded-lg text-zinc-300 hover:text-white transition-colors"
                  title="Power Options"
                >
                  <Power className="w-4 h-4 text-rose-400" />
                </button>

                {powerMenuOpen && (
                  <div className="absolute right-0 bottom-10 w-44 bg-[#141414] border border-white/15 rounded-xl shadow-2xl py-1 text-xs text-zinc-200 z-50 divide-y divide-white/10">
                    <button
                      onClick={() => {
                        setViewMode('linear');
                        setStartMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Standard View</span>
                    </button>
                    <button
                      onClick={() => {
                        toggleOSMode();
                        setStartMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-sky-600 hover:text-white flex items-center space-x-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Switch to macOS</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WINDOWS 11 FULL-WIDTH BOTTOM TASKBAR */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#1c1c1c]/85 backdrop-blur-2xl border-t border-white/10 z-40 flex items-center justify-between px-4 select-none text-white shadow-2xl">
        {/* Left Side (Empty spacer for balanced centering) */}
        <div className="w-36 hidden md:block" />

        {/* CENTERED WINDOWS 11 TASKBAR APP ICONS */}
        <div className="flex items-center space-x-1">
          {/* Windows Official 4-Square Start Button */}
          <button
            onClick={() => {
              setStartMenuOpen(!startMenuOpen);
              setQuickSettingsOpen(false);
            }}
            className={`p-2 rounded-xl transition-all duration-150 group ${
              startMenuOpen ? 'bg-white/15 shadow-inner' : 'hover:bg-white/10'
            }`}
            title="Start Menu"
          >
            {/* Windows 11 Blue 4-Square Icon SVG */}
            <svg className="w-5 h-5 transition-transform group-hover:scale-105" viewBox="0 0 88 88" fill="none">
              <path d="M0 0H41.8V41.8H0V0Z" fill="#0078D4" />
              <path d="M46.2 0H88V41.8H46.2V0Z" fill="#0078D4" />
              <path d="M0 46.2H41.8V88H0V46.2Z" fill="#0078D4" />
              <path d="M46.2 46.2H88V88H46.2V46.2Z" fill="#0078D4" />
            </svg>
          </button>

          {/* Pinned & Open Windows 11 Icons */}
          {pinnedApps.map((app) => {
            const win = windows[app.id];
            const isOpen = win?.isOpen || false;
            const isFocused = activeWindowId === app.id && isOpen && !win?.isMinimized;

            return (
              <button
                key={app.id}
                onClick={() => handleTaskbarIconClick(app.id)}
                className={`relative p-1.5 rounded-xl transition-all duration-150 group ${
                  isFocused
                    ? 'bg-white/15 border border-white/20 shadow-md'
                    : isOpen
                    ? 'bg-white/10 hover:bg-white/15'
                    : 'hover:bg-white/10'
                }`}
                title={app.label}
              >
                <OSIcon type={app.iconType} size={32} />

                {/* Windows 11 Active App Pill Indicator Underline */}
                {isOpen && (
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 rounded-full transition-all ${
                      isFocused ? 'w-4 h-1 bg-sky-400 shadow-sm shadow-sky-400' : 'w-2 h-0.75 bg-zinc-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* RIGHT SYSTEM TRAY & QUICK SETTINGS */}
        <div className="flex items-center justify-end space-x-2 text-xs">
          {/* Quick Settings Group Button (Wi-Fi, Volume, Battery) */}
          <button
            onClick={() => {
              setQuickSettingsOpen(!quickSettingsOpen);
              setStartMenuOpen(false);
            }}
            className="flex items-center space-x-2 px-2.5 py-1 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10"
            title="Quick Settings"
          >
            <Wifi className="w-3.5 h-3.5 text-zinc-300" />
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </button>

          {/* OS SKIN SWITCHER BUTTON */}
          <button
            onClick={() => {
              toggleOSMode();
              if (soundEnabled) sounds.playClick();
            }}
            className="flex items-center space-x-1.5 px-2.5 py-1 bg-sky-950/90 hover:bg-sky-900 border border-sky-500/40 rounded-lg text-xs font-semibold text-sky-300 transition-all transform hover:scale-105 active:scale-95 shadow-sm"
            title="Switch to macOS Skin"
          >
            <Monitor className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px]">Win 11 Skin</span>
          </button>

          {/* Stacked Clock & Date */}
          <div className="text-right text-[11px] font-mono leading-tight text-zinc-300 font-medium px-1">
            <div>{timeStr}</div>
            <div className="text-[10px] text-zinc-500">{dateStr}</div>
          </div>
        </div>
      </div>
    </>
  );
};
