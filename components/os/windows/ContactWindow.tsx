import React, { useState } from 'react';
import { Mail, Send, Linkedin, Globe, CheckCircle2, User, Phone } from 'lucide-react';
import { RESUME_DATA } from '../../../data/caseStudies';

export const ContactWindow: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setSent(true);

    // Open mailto link as fallback
    const mailto = `mailto:${RESUME_DATA.email}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(message)}`;
    window.open(mailto, '_blank');
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white overflow-hidden select-none">
      {/* Top Mail Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-zinc-200">Compose Message — Mail</span>
        </div>
        <span className="text-zinc-500 font-mono">Status: Ready</span>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Contact Sidebar */}
        <div className="w-full md:w-5/12 p-6 bg-zinc-900/40 border-r border-zinc-800 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">DIRECT CONTACT INFO</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs">
                <Mail className="w-4 h-4 text-blue-400" />
                <div>
                  <span className="text-[10px] text-zinc-500 block">EMAIL</span>
                  <a href={`mailto:${RESUME_DATA.email}`} className="text-zinc-200 hover:text-blue-400 font-medium">
                    {RESUME_DATA.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs">
                <Phone className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-zinc-500 block">PHONE</span>
                  <span className="text-zinc-200 font-medium">{RESUME_DATA.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">EXTERNAL PROFILES</h3>
            <div className="space-y-2">
              <a
                href={RESUME_DATA.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-zinc-900/60 hover:bg-blue-950/40 border border-zinc-800 hover:border-blue-500/40 rounded-xl text-xs transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-zinc-200">LinkedIn Profile</span>
                </div>
                <span className="text-[10px] text-zinc-500">Connect ↗</span>
              </a>

              <a
                href={RESUME_DATA.behanceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-zinc-900/60 hover:bg-blue-950/40 border border-zinc-800 hover:border-blue-500/40 rounded-xl text-xs transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  <span className="font-medium text-zinc-200">Behance Portfolio</span>
                </div>
                <span className="text-[10px] text-zinc-500">View ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Compose Form */}
        <div className="flex-1 p-6 overflow-y-auto bg-zinc-950">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
              <p className="text-xs text-zinc-400 max-w-sm">
                Your email client was triggered with your pre-filled inquiry. Sai will respond promptly.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 text-[11px] font-mono">TO:</label>
                <input
                  type="text"
                  value={`Sai Santosh Madhari <${RESUME_DATA.email}>`}
                  disabled
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-400 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 text-[11px] font-mono">SUBJECT:</label>
                <input
                  type="text"
                  placeholder="UX Design Role / Opportunity Inquiry..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 text-[11px] font-mono">MESSAGE:</label>
                <textarea
                  rows={6}
                  placeholder="Hi Sai, I reviewed your portfolio and would like to discuss..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-lg p-3 text-white outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
