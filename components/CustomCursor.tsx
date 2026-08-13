'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      setIsDisabled(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isDisabled) return null;

  return (
    <>
      {/* Subtle Trailing Ring for Interactive Elements */}
      {isHovered && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full border border-sky-400/60 bg-sky-500/10 backdrop-blur-[2px]"
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            width: 48,
            height: 48,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
        >
          {cursorText && (
            <span className="text-[10px] font-mono font-bold tracking-tight text-white text-center px-1">
              {cursorText}
            </span>
          )}
        </motion.div>
      )}
    </>
  );
};
