import React from 'react';
import { useOSStore } from '../../store/useOSStore';

export const Wallpaper: React.FC = () => {
  const osMode = useOSStore((s) => s.osMode);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black select-none">
      {/* Windows 11 Authentic Bloom Wallpaper */}
      <img
        src="/wallpapers/win11.png"
        alt="Windows 11 Bloom Wallpaper"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          osMode === 'windows' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />

      {/* macOS Sonoma Authentic Liquid Gradient Wallpaper */}
      <img
        src="/wallpapers/macos.png"
        alt="macOS Sonoma Wallpaper"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          osMode === 'mac' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />

      {/* Ambient Vignette & Lighting Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

      {/* Subtle Blueprint & Designer Watermark */}
      <div className="absolute bottom-16 right-8 pointer-events-none opacity-20 flex flex-col items-end text-right select-none">
        <span className="text-3xl font-extrabold tracking-widest text-white uppercase font-sans drop-shadow-lg">
          Sai Santosh
        </span>
        <span className="text-xs font-mono tracking-wider text-sky-200 mt-0.5 drop-shadow">
          UX DESIGNER · TCS ULTIMATIX TX TEAM
        </span>
      </div>
    </div>
  );
};
