import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore, WindowState } from '../../store/useOSStore';
import { 
  Minus, 
  Square, 
  X, 
  Maximize2, 
  Minimize2, 
  Plus, 
  Scissors, 
  Copy, 
  Clipboard, 
  Edit3, 
  Share2, 
  Trash2, 
  ArrowUpDown, 
  Grid,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Folder,
  FileText,
  Home,
  Download,
  Image as ImageIcon
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export interface WindowFrameProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ windowState, children }) => {
  const osMode = useOSStore((s) => s.osMode);
  const activeWindowId = useOSStore((s) => s.activeWindowId);
  const soundEnabled = useOSStore((s) => s.soundEnabled);
  const focusWindow = useOSStore((s) => s.focusWindow);
  const closeWindow = useOSStore((s) => s.closeWindow);
  const minimizeWindow = useOSStore((s) => s.minimizeWindow);
  const maximizeWindow = useOSStore((s) => s.maximizeWindow);
  const updatePosition = useOSStore((s) => s.updatePosition);
  const updateSize = useOSStore((s) => s.updateSize);

  const isFocused = activeWindowId === windowState.id;

  const [pos, setPos] = useState(windowState.position);
  const [size, setSize] = useState(windowState.size);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setPos(windowState.position);
  }, [windowState.position]);

  useEffect(() => {
    setSize(windowState.size);
  }, [windowState.size]);

  // Handle Dragging Title Bar
  const handleMouseDownHeader = (e: React.MouseEvent) => {
    if (windowState.isMaximized) return;
    focusWindow(windowState.id);
    setIsDragging(true);

    const startX = e.clientX - pos.x;
    const startY = e.clientY - pos.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = Math.max(10, Math.min(window.innerWidth - size.width - 10, moveEvent.clientX - startX));
      const newY = Math.max(30, Math.min(window.innerHeight - size.height - 40, moveEvent.clientY - startY));
      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      updatePosition(windowState.id, pos.x, pos.y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Handle Resizing (Bottom-Right corner)
  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    focusWindow(windowState.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = size.width;
    const startH = size.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newW = Math.max(380, startW + (moveEvent.clientX - startX));
      const newH = Math.max(280, startH + (moveEvent.clientY - startY));
      setSize({ width: newW, height: newH });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      updateSize(windowState.id, size.width, size.height);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Keyboard shortcut listener (Esc to close, Ctrl+M to minimize)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused) return;
      if (e.key === 'Escape') {
        if (soundEnabled) sounds.playClose();
        closeWindow(windowState.id);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        if (soundEnabled) sounds.playMinimize();
        minimizeWindow(windowState.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, windowState.id, soundEnabled]);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  const isMac = osMode === 'mac';

  const currentStyle = windowState.isMaximized
    ? { top: isMac ? '28px' : '0px', left: 0, right: 0, bottom: isMac ? '76px' : '48px', width: '100%', height: 'calc(100% - 76px)' }
    : { top: `${pos.y}px`, left: `${pos.x}px`, width: `${size.width}px`, height: `${size.height}px` };

  return (
    <motion.div
      role="dialog"
      aria-labelledby={`window-title-${windowState.id}`}
      onClick={() => focusWindow(windowState.id)}
      initial={{ opacity: 0, scale: isMac ? 0.85 : 0.95, y: isMac ? 30 : 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: isMac ? 0.7 : 0.9, y: isMac ? 40 : 20 }}
      transition={{
        duration: isMac ? 0.3 : 0.18,
        ease: isMac ? [0.32, 0.72, 0, 1] : [0.1, 0.9, 0.2, 1],
      }}
      style={{
        ...currentStyle,
        zIndex: windowState.zIndex,
        position: 'absolute',
      }}
      className={`flex flex-col overflow-hidden backdrop-blur-2xl border select-none transition-shadow duration-200 ${
        isMac
          ? `rounded-2xl ${isFocused ? 'shadow-2xl shadow-black/80 border-white/20' : 'shadow-lg shadow-black/50 border-white/10 opacity-95'}`
          : `rounded-xl ${isFocused ? 'shadow-2xl shadow-sky-500/20 border-white/15' : 'shadow-md border-white/10 opacity-95'}`
      }`}
    >
      {/* WINDOW TITLE BAR */}
      <div
        onMouseDown={handleMouseDownHeader}
        className={`flex items-center justify-between px-4 py-2.5 cursor-grab active:cursor-grabbing border-b ${
          isMac ? 'bg-[#242429]/90 border-white/10' : 'bg-[#1c1c1c]/95 border-white/10'
        } ${!isFocused ? 'opacity-80' : ''}`}
      >
        {/* macOS Traffic Lights Controls (Top-Left) */}
        {isMac && (
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (soundEnabled) sounds.playClose();
                closeWindow(windowState.id);
              }}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:bg-red-600 flex items-center justify-center group text-black font-bold"
              title="Close (Esc)"
            >
              <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (soundEnabled) sounds.playMinimize();
                minimizeWindow(windowState.id);
              }}
              className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:bg-amber-600 flex items-center justify-center group text-black font-bold"
              title="Minimize (⌘+M)"
            >
              <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(windowState.id);
              }}
              className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:bg-emerald-600 flex items-center justify-center group text-black font-bold"
              title="Maximize"
            >
              <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        )}

        {/* Title Text */}
        <div id={`window-title-${windowState.id}`} className="text-xs font-semibold text-zinc-100 truncate flex-1 text-center px-4">
          {windowState.title}
        </div>

        {/* Windows 11 Controls (Top-Right) */}
        {!isMac && (
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (soundEnabled) sounds.playMinimize();
                minimizeWindow(windowState.id);
              }}
              className="p-1.5 hover:bg-white/10 rounded text-zinc-300 hover:text-white transition-colors"
              title="Minimize (Ctrl+M)"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(windowState.id);
              }}
              className="p-1.5 hover:bg-white/10 rounded text-zinc-300 hover:text-white transition-colors"
              title="Maximize"
            >
              {windowState.isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (soundEnabled) sounds.playClose();
                closeWindow(windowState.id);
              }}
              className="p-1.5 hover:bg-rose-600 rounded text-zinc-300 hover:text-white transition-colors"
              title="Close (Esc)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* WINDOWS 11 AUTHENTIC RIBBON TOOLBAR (For Explorer/Folders) */}
      {!isMac && windowState.iconType === 'folder' && (
        <div className="flex items-center space-x-4 px-4 py-2 bg-[#191919] border-b border-white/10 text-xs text-zinc-300">
          <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
            <button className="flex items-center space-x-1 px-2 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded font-medium">
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 text-zinc-400">
            <span title="Cut"><Scissors className="w-4 h-4 hover:text-white cursor-pointer" /></span>
            <span title="Copy"><Copy className="w-4 h-4 hover:text-white cursor-pointer" /></span>
            <span title="Paste"><Clipboard className="w-4 h-4 hover:text-white cursor-pointer" /></span>
            <span title="Rename"><Edit3 className="w-4 h-4 hover:text-white cursor-pointer" /></span>
            <span title="Share"><Share2 className="w-4 h-4 hover:text-white cursor-pointer" /></span>
            <span title="Delete"><Trash2 className="w-4 h-4 hover:text-rose-400 cursor-pointer" /></span>
          </div>

          <div className="flex items-center space-x-3 border-l border-white/10 pl-4 text-zinc-400">
            <div className="flex items-center space-x-1 hover:text-white cursor-pointer">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-white cursor-pointer">
              <Grid className="w-3.5 h-3.5" />
              <span>View</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Inner Window Body */}
      <div className="flex-1 overflow-hidden relative bg-[#121214]/95">{children}</div>

      {/* Bottom-Right Resize Handle */}
      {!windowState.isMaximized && (
        <div
          onMouseDown={handleMouseDownResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 z-50 group"
        >
          <div className="w-2 h-2 border-r-2 border-b-2 border-zinc-500 group-hover:border-sky-400 transition-colors" />
        </div>
      )}
    </motion.div>
  );
};
