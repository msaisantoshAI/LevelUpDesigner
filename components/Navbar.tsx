'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Phone } from 'lucide-react';
import { RESUME_DATA } from '@/data/caseStudies';

const NAV_ITEMS = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('top');
  const [showScrollFloatingNav, setShowScrollFloatingNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollFloatingNav(window.scrollY > 200);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Header Bar matching benshih.design */}
      <header className="w-full px-5 pt-8 md:px-8 md:pt-10 lg:px-[120px] relative z-40">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            {/* Profile Avatar + Name */}
            <a href="#top" className="flex items-center gap-3 group" data-cursor="Sai Santosh">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-black/10 bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
                SM
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold leading-none text-primary md:text-2xl group-hover:text-emerald-700 transition-colors">
                  {RESUME_DATA.name}
                </span>
                <span className="text-[11px] font-mono text-muted tracking-wide mt-0.5">
                  {RESUME_DATA.role} · 3+ Yrs Exp
                </span>
              </div>
            </a>

            {/* Desktop Action Buttons */}
            <div className="flex items-center gap-2 md:order-last">
              <a
                href={`mailto:${RESUME_DATA.email}`}
                className="inline-flex items-center gap-2 rounded-[8px] border border-black bg-black text-white hover:opacity-80 px-[14px] py-[10px] text-sm font-semibold leading-5 shadow-sm transition-all"
                data-cursor="Say Hello"
              >
                <Mail className="h-4 w-4" />
                <span>Say Hello</span>
              </a>

              <a
                href={RESUME_DATA.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center rounded-[8px] border border-black bg-black text-white hover:opacity-80 h-[42px] w-[42px] p-0 shadow-sm transition-all"
                data-cursor="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Centered Desktop Floating Navigation Pill */}
          <div className="hidden md:block">
            <nav className="flex items-center rounded-full px-2 py-1 bg-white/95 shadow-[0px_8px_24px_rgba(16,24,40,0.08)] border border-black/5 backdrop-blur-md">
              <div className="relative flex h-10 items-center gap-1 p-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`relative z-10 inline-flex h-8 items-center px-4 rounded-full text-xs font-semibold leading-none transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-text-secondary hover:text-primary'
                      }`}
                      data-cursor={item.label}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 bg-black rounded-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Floating Scroll Nav Bar (Fixed on scroll for Desktop) */}
      <div
        className={`hidden md:block fixed left-1/2 top-5 z-50 -translate-x-1/2 transition-all duration-300 ${
          showScrollFloatingNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="flex items-center rounded-full px-3 py-1.5 bg-white/95 shadow-[0px_8px_32px_rgba(16,24,40,0.14)] backdrop-blur-lg border border-black/10">
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative inline-flex h-8 items-center px-4 rounded-full text-xs font-semibold transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="scrollActivePill"
                      className="absolute inset-0 bg-black rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile Floating Nav Pill (Fixed Bottom) */}
      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center md:hidden px-4">
        <nav className="flex items-center rounded-full bg-white/95 px-3 py-1.5 shadow-[0_8px_32px_rgba(16,24,40,0.14)] backdrop-blur-lg border border-black/10">
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-full text-xs font-semibold ${
                    isActive ? 'bg-black text-white' : 'text-text-secondary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};
