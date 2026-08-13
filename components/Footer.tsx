'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 px-6 md:px-12 bg-bg-cream border-t border-black/10 font-mono text-xs text-muted">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Signature */}
        <div>
          <span className="text-primary font-bold block mb-0.5 font-display text-sm">
            Sai Santosh Madhari
          </span>
          <span>Senior UX Designer · TCS Ultimatix TX & Next Gen</span>
        </div>

        {/* Live IST Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/10 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>India (IST): <strong className="text-primary">{istTime || '05:20 PM IST'}</strong></span>
        </div>

        {/* Right Back to Top */}
        <div className="flex items-center gap-3">
          <span>© 2026 Sai Santosh Madhari</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white border border-black/10 text-primary hover:border-black transition-colors shadow-sm"
            aria-label="Back to Top"
            data-cursor="Scroll Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
