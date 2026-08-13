'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useOSStore } from '../../../store/useOSStore';
import { RESUME_DATA } from '../../../data/caseStudies';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const TerminalWindow: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'output', text: 'SAI.OS Terminal CLI v15.0 (x86_64-apple-darwin23.0)' },
    { id: '2', type: 'output', text: 'Type "whoami", "role", "skills", "quests", or "help" for commands.' }
  ]);

  const openWindow = useOSStore((s) => s.openWindow);
  const toggleOSMode = useOSStore((s) => s.toggleOSMode);
  const osMode = useOSStore((s) => s.osMode);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const promptStr = osMode === 'mac' ? 'sai@macbook-pro ~ %' : 'PS C:\\Users\\Santosh>';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newHistory: TerminalLine[] = [...history, { id: Date.now().toString(), type: 'input', text: `${promptStr} ${cmd}` }];
    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    switch (mainCmd) {
      case 'help':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `Available commands:
  whoami       - Display author name & identity
  role         - Print professional roles
  skills       - Print core capabilities & tools
  quests       - Load SideQuests summary
  ls           - List desktop applications & folders
  open <app>   - Open window (options: work, about, art, experiments, side-quests, resume, contact)
  theme        - Toggle macOS / Windows 11 skin
  date         - Output current system timestamp
  sudo         - Gain root superuser privileges
  clear        - Clear console output`
        });
        break;

      case 'whoami':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: 'Sai Santosh Madhari'
        });
        break;

      case 'role':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: 'UX Designer · Product Designer · Visual Designer · Creator · SideQuester'
        });
        break;

      case 'skills':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: 'UX · Product Design · Visual Design · AI Orchestration · Heuristic Audits · WCAG Accessibility · CRO · Fine Art'
        });
        break;

      case 'quests':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: 'Loading SideQuests...\n⚡ Collected 4 adventures in Enterprise UX, Fine Art, AI Orchestration & Spatial OS Design.'
        });
        break;

      case 'ls':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `drwxr-xr-x  My_Work/
drwxr-xr-x  Experiments.app/
drwxr-xr-x  SideQuests.app/
drwxr-xr-x  Art_and_Visuals.app/
-rw-r--r--  About_Me.txt
-rw-r--r--  Resume.pdf
-rw-r--r--  Read_Me.txt
-rwxr-xr-x  Mail_Contact.app`
        });
        break;

      case 'open':
        if (arg.includes('work') || arg.includes('case')) {
          openWindow('case-studies');
          newHistory.push({ id: (Date.now() + 1).toString(), type: 'output', text: 'Opened My Work Finder window.' });
        } else if (arg.includes('about')) {
          openWindow('about');
          newHistory.push({ id: (Date.now() + 1).toString(), type: 'output', text: 'Opened About Sai window.' });
        } else if (arg.includes('art')) {
          openWindow('art');
          newHistory.push({ id: (Date.now() + 1).toString(), type: 'output', text: 'Opened Art & Visuals gallery.' });
        } else if (arg.includes('exp')) {
          openWindow('experiments');
          newHistory.push({ id: (Date.now() + 1).toString(), type: 'output', text: 'Opened Experiments window.' });
        } else if (arg.includes('quest') || arg.includes('side')) {
          openWindow('side-quests');
          newHistory.push({ id: (Date.now() + 1).toString(), type: 'output', text: 'Opened SideQuests window.' });
        } else if (arg.includes('resume')) {
          openWindow('resume');
          newHistory.push({ id: (Date.now() + 1).toString(), type: 'output', text: 'Opened Resume.pdf window.' });
        } else if (arg.includes('contact') || arg.includes('mail')) {
          openWindow('contact');
          newHistory.push({ id: (Date.now() + 1).toString(), type: 'output', text: 'Opened Contact Mail window.' });
        } else {
          newHistory.push({ id: (Date.now() + 1).toString(), type: 'error', text: `open: '${arg}' not recognized. Try 'open work' or 'open resume'.` });
        }
        break;

      case 'sudo':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: 'Permission granted. You are now Superuser of Sai\'s Mac 🚀'
        });
        break;

      case 'theme':
        toggleOSMode();
        newHistory.push({ id: (Date.now() + 1).toString(), type: 'output', text: `Switched OS skin to ${osMode === 'windows' ? 'macOS' : 'Windows 11'}.` });
        break;

      case 'date':
        newHistory.push({ id: (Date.now() + 1).toString(), type: 'output', text: new Date().toString() });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({ id: (Date.now() + 1).toString(), type: 'error', text: `command not found: ${mainCmd}. Type 'help' for available commands.` });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="w-full h-full flex flex-col bg-black text-emerald-400 font-mono text-xs p-4 overflow-hidden select-text">
      <div className="flex-1 overflow-y-auto space-y-1">
        {history.map((line) => (
          <div
            key={line.id}
            className={`whitespace-pre-wrap ${
              line.type === 'error'
                ? 'text-rose-400 font-semibold'
                : line.type === 'success'
                ? 'text-amber-300 font-bold'
                : line.type === 'input'
                ? 'text-white font-bold'
                : 'text-emerald-400/90'
            }`}
          >
            {line.text}
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center space-x-2 pt-2">
          <span className="text-emerald-500 font-bold">{promptStr}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs caret-emerald-400"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
