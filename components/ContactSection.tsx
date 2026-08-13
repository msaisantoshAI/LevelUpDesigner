'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check, FileText, Linkedin, Send, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESUME_DATA } from '@/data/caseStudies';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(RESUME_DATA.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0F172A', '#10B981', '#FF7A59']
      });
    }, 700);
  };

  return (
    <section id="contact" className="px-5 py-12 md:px-8 md:py-16 lg:px-[120px]">
      <div className="section-surface-shadow mx-auto w-full max-w-[1200px] rounded-[20px] bg-white p-6 md:p-12 border border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Contact Information */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block mb-2">
                04 / SAY HELLO
              </span>
              <h2 className="font-display text-[32px] font-bold leading-[0.98] tracking-tight text-primary md:text-[48px] mb-3">
                Let's turn operational chaos into clarity.
              </h2>
              <p className="text-base text-text-secondary font-medium leading-relaxed font-sans">
                Open to Senior UX Designer, Lead UX, and Product Design roles. Whether you need a heuristic evaluation of a complex enterprise workflow or want to build AI-native systems, let's connect.
              </p>
            </div>

            {/* Email Box */}
            <div className="p-4 rounded-2xl bg-bg-offwhite border border-black/5 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-xl bg-black text-white shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-mono text-muted uppercase block">Direct Enterprise Email</span>
                  <span className="font-mono text-sm font-bold text-primary truncate block">
                    {RESUME_DATA.email}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-xl bg-white border border-black/10 hover:bg-black hover:text-white text-primary font-semibold text-xs transition-all duration-200 shrink-0 flex items-center gap-1.5 shadow-sm"
                data-cursor="Copy Email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Box */}
            <div className="p-4 rounded-2xl bg-bg-offwhite border border-black/5 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-xl bg-emerald-700 text-white shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-mono text-muted uppercase block">Direct Phone / Call</span>
                  <span className="font-mono text-sm font-bold text-primary truncate block">
                    {RESUME_DATA.phone}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyPhone}
                className="px-4 py-2 rounded-xl bg-white border border-black/10 hover:bg-black hover:text-white text-primary font-semibold text-xs transition-all duration-200 shrink-0 flex items-center gap-1.5 shadow-sm"
                data-cursor="Copy Phone"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Behance & LinkedIn Links */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={RESUME_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white border border-black/10 text-primary text-xs font-semibold hover:border-black transition-all flex items-center gap-2 shadow-sm"
                data-cursor="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-primary" />
                <span>LinkedIn: {RESUME_DATA.linkedin}</span>
                <ExternalLink className="w-3 h-3 text-muted" />
              </a>

              <a
                href={RESUME_DATA.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white border border-black/10 text-primary text-xs font-semibold hover:border-black transition-all flex items-center gap-2 shadow-sm"
                data-cursor="Behance"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>Behance: {RESUME_DATA.behance}</span>
                <ExternalLink className="w-3 h-3 text-muted" />
              </a>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-6">
            <div className="p-6 md:p-8 rounded-[16px] bg-bg-offwhite border border-black/5">
              <h3 className="font-display font-bold text-xl text-primary mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Send a Direct Message</span>
              </h3>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-white border border-black/5 text-center space-y-3 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mx-auto text-lg">
                    ✓
                  </div>
                  <h4 className="font-display font-bold text-base text-primary">Message Received!</h4>
                  <p className="text-xs text-text-secondary font-sans">
                    Thank you for reaching out. Sai Santosh will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-full bg-primary text-white font-semibold text-xs mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-mono text-muted uppercase block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Design Lead"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-2.5 text-sm text-primary focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-muted uppercase block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-2.5 text-sm text-primary focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-muted uppercase block mb-1">Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell me about your role or enterprise workflow challenge..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-2.5 text-sm text-primary focus:border-primary focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-[8px] bg-black text-white font-semibold text-sm shadow-md hover:opacity-85 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    data-cursor="Submit Form"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
