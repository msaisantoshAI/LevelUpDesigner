'use client';

import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import { WindowFrame } from './WindowFrame';
import { AboutWindow } from './windows/AboutWindow';
import { CaseStudiesFolderWindow } from './windows/CaseStudiesFolderWindow';
import { CaseStudyDetailWindow } from './windows/CaseStudyDetailWindow';
import { ExperimentsWindow } from './windows/ExperimentsWindow';
import { SideQuestsWindow } from './windows/SideQuestsWindow';
import { ArtWindow } from './windows/ArtWindow';
import { ResumeWindow } from './windows/ResumeWindow';
import { ReadMeWindow } from './windows/ReadMeWindow';
import { ContactWindow } from './windows/ContactWindow';
import { BrowserWindow } from './windows/BrowserWindow';
import { TerminalWindow } from './windows/TerminalWindow';
import { TrashWindow } from './windows/TrashWindow';
import { AboutMacModal } from './windows/AboutMacModal';
import { ControlCenterWindow } from './windows/ControlCenterWindow';

export const WindowManager: React.FC = () => {
  const windows = useOSStore((s) => s.windows);

  const renderWindowContent = (winId: string, data?: any) => {
    switch (winId) {
      case 'about':
        return <AboutWindow />;
      case 'case-studies':
        return <CaseStudiesFolderWindow />;
      case 'case-ultimatix':
        return <CaseStudyDetailWindow caseId="enterprise-search" />;
      case 'case-service':
        return <CaseStudyDetailWindow caseId="service-portal" />;
      case 'case-ai':
        return <CaseStudyDetailWindow caseId="ai-workflow" />;
      case 'experiments':
        return <ExperimentsWindow />;
      case 'side-quests':
        return <SideQuestsWindow />;
      case 'art':
        return <ArtWindow />;
      case 'resume':
        return <ResumeWindow />;
      case 'readme':
        return <ReadMeWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'browser':
        return <BrowserWindow />;
      case 'terminal':
        return <TerminalWindow />;
      case 'trash':
        return <TrashWindow />;
      case 'about-mac':
        return <AboutMacModal />;
      case 'control-center':
        return <ControlCenterWindow />;
      default:
        return <AboutWindow />;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {Object.values(windows).map((win) => {
        if (!win.isOpen || win.isMinimized) return null;
        return (
          <div key={win.id} className="pointer-events-auto">
            <WindowFrame windowState={win}>{renderWindowContent(win.id, win.data)}</WindowFrame>
          </div>
        );
      })}
    </div>
  );
};
