import React, { useState, useEffect } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { Zap, Monitor, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BypassBar: React.FC = () => {
  const viewMode = useOSStore((s) => s.viewMode);
  const setViewMode = useOSStore((s) => s.setViewMode);
  const toggleViewMode = useOSStore((s) => s.toggleViewMode);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Show non-intrusive prompt after 3s on first visit if in desktop mode
    if (viewMode === 'desktop') {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);

  return (
    <>
      {/* PERSISTENT TOP-RIGHT CONTROL BUTTON */}
      <div className="fixed top-3 right-4 z-50 flex items-center space-x-2 select-none">
        <button
          onClick={toggleViewMode}
          className="flex items-center space-x-2 px-3.5 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 border border-white/20 rounded-full text-xs font-semibold text-white shadow-xl backdrop-blur-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          {viewMode === 'desktop' ? (
            <>
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Skip OS / View Standard Site</span>
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5 text-sky-400" />
              <span>Switch to Desktop OS Simulation</span>
            </>
          )}
        </button>
      </div>

      {/* 3-SECOND AUTO-PROMPT TOAST FOR BUSY RECRUITERS */}
      <AnimatePresence>
        {showToast && viewMode === 'desktop' && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-14 right-4 z-50 max-w-sm bg-zinc-900/95 border border-amber-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl text-white text-xs space-y-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2 font-bold text-amber-400">
                <Zap className="w-4 h-4" />
                <span>Short on time?</span>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-zinc-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              Jump straight to Sai's case studies and resume in a fast linear portfolio format without window drag.
            </p>
            <div className="pt-1 flex items-center justify-between">
              <button
                onClick={() => {
                  setViewMode('linear');
                  setShowToast(false);
                }}
                className="flex items-center space-x-1 text-xs font-bold text-amber-300 hover:text-amber-200"
              >
                <span>Jump straight to work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowToast(false)}
                className="text-[10px] text-zinc-500 hover:text-zinc-400"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
