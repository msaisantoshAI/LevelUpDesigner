'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { OSIcon } from './OSIcon';
import { sounds } from '../../utils/soundEffects';

interface DockItemProps {
  id: string;
  label: string;
  iconType: string;
  isOpen: boolean;
  isMinimized: boolean;
  badge?: string;
  mouseX: any;
}

const DockIcon: React.FC<DockItemProps> = ({ id, label, iconType, isOpen, isMinimized, badge, mouseX }) => {
  const openWindow = useOSStore((s) => s.openWindow);
  const restoreWindow = useOSStore((s) => s.restoreWindow);
  const focusWindow = useOSStore((s) => s.focusWindow);
  const soundEnabled = useOSStore((s) => s.soundEnabled);

  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 12 });

  const handleClick = () => {
    if (soundEnabled) sounds.playClick();
    if (isMinimized) {
      restoreWindow(id);
    } else if (isOpen) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={handleClick}
      className="relative flex flex-col items-center justify-center cursor-pointer group pb-1"
    >
      <OSIcon type={iconType} size={48} badge={badge} />

      {/* Tooltip Label */}
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none px-2.5 py-1 bg-zinc-900/90 border border-white/20 rounded-md text-[11px] font-medium text-white shadow-xl whitespace-nowrap backdrop-blur-md z-50">
        {label}
      </div>

      {/* Running App Indicator Dot */}
      <div className="h-1 flex items-center justify-center mt-1">
        {isOpen && (
          <motion.div
            layoutId={`dot-${id}`}
            className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-sm"
          />
        )}
      </div>
    </motion.div>
  );
};

export const MacDock: React.FC = () => {
  const windows = useOSStore((s) => s.windows);
  const mouseX = useMotionValue(Infinity);

  const dockItems = [
    { id: 'case-studies', label: 'Finder — My Work', iconType: 'folder' },
    { id: 'about', label: 'About Sai', iconType: 'text' },
    { id: 'art', label: 'Art & Visuals', iconType: 'art' },
    { id: 'experiments', label: 'Experiments', iconType: 'app' },
    { id: 'side-quests', label: 'Side Quests', iconType: 'app' },
    { id: 'browser', label: 'Safari', iconType: 'browser' },
    { id: 'resume', label: 'Resume.pdf', iconType: 'pdf' },
    { id: 'contact', label: 'Mail — Contact', iconType: 'mail' },
    { id: 'terminal', label: 'Terminal', iconType: 'terminal' },
    { id: 'trash', label: 'Trash', iconType: 'trash' },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 flex justify-center pointer-events-none select-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="pointer-events-auto flex items-end space-x-2.5 px-3.5 py-1.5 bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl shadow-2xl shadow-black/60"
      >
        {dockItems.map((item) => {
          const win = windows[item.id];
          return (
            <DockIcon
              key={item.id}
              id={item.id}
              label={item.label}
              iconType={item.iconType}
              isOpen={win?.isOpen || false}
              isMinimized={win?.isMinimized || false}
              mouseX={mouseX}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
