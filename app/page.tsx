'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore } from '../store/useOSStore';
import { Wallpaper } from '../components/os/Wallpaper';
import { Desktop } from '../components/os/Desktop';
import { WindowManager } from '../components/os/WindowManager';
import { Taskbar } from '../components/os/Taskbar';
import { MacMenuBar } from '../components/os/MacMenuBar';
import { MacDock } from '../components/os/MacDock';
import { Spotlight } from '../components/os/Spotlight';
import { BypassBar } from '../components/os/BypassBar';
import { BootSequence } from '../components/os/BootSequence';
import { LockScreenOverlay } from '../components/os/LockScreenOverlay';
import { LinearPortfolio } from '../components/linear/LinearPortfolio';
import { MobileSpringboard } from '../components/mobile/MobileSpringboard';

export default function Home() {
  const osMode = useOSStore((s) => s.osMode);
  const viewMode = useOSStore((s) => s.viewMode);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  // 1. Linear Portfolio Bypass Mode for Recruiters
  if (viewMode === 'linear') {
    return (
      <main className="min-h-screen bg-slate-950">
        <BypassBar />
        <LinearPortfolio />
      </main>
    );
  }

  // 2. Mobile Springboard Metaphor Mode (< 768px)
  if (isMobile) {
    return (
      <main className="min-h-screen bg-slate-950">
        <MobileSpringboard />
      </main>
    );
  }

  // 3. SAI.OS macOS Desktop Simulation Mode
  return (
    <main
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        fontFamily:
          osMode === 'mac'
            ? '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif'
            : '"Segoe UI Variable", "Segoe UI", system-ui, sans-serif',
      }}
    >
      {/* Boot Sequence Overlay on Startup */}
      <BootSequence />

      {/* Lock Screen Overlay */}
      <LockScreenOverlay />

      {/* Background Desktop Wallpaper */}
      <Wallpaper />

      {/* Top Bypass Bar & Recruiter Quick Bar */}
      <BypassBar />

      {/* macOS Top Menu Bar */}
      {osMode === 'mac' && <MacMenuBar />}

      {/* Desktop Canvas, Widgets & Icons */}
      <Desktop />

      {/* Interactive Window System Dispatcher */}
      <WindowManager />

      {/* macOS Spotlight Search (⌘K / Ctrl+K) */}
      {osMode === 'mac' && <Spotlight />}

      {/* macOS Floating Dock vs Windows 11 Bottom Taskbar */}
      {osMode === 'mac' ? <MacDock /> : <Taskbar />}
    </main>
  );
}
