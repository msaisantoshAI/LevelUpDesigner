import React from 'react';
import { Download, FileText, Printer, Eye, ExternalLink, CheckCircle } from 'lucide-react';
import { RESUME_DATA } from '../../../data/caseStudies';

export const ResumeWindow: React.FC = () => {
  const handleDownload = () => {
    // Generate text/HTML resume blob download or open link
    const content = `
SAI SANTOSH MADHARI - UX DESIGNER (3+ years experience)
Email: ${RESUME_DATA.email} | Phone: ${RESUME_DATA.phone}
Behance: ${RESUME_DATA.behanceUrl} | LinkedIn: ${RESUME_DATA.linkedinUrl}

ABOUT ME
${RESUME_DATA.aboutMe}

EXPERIENCE SUMMARY
${RESUME_DATA.experienceSummary}

CORE SKILLS
${RESUME_DATA.skills.join(', ')}

EDUCATION
${RESUME_DATA.education.degree} - ${RESUME_DATA.education.institution}

CERTIFICATIONS
${RESUME_DATA.certifications.map((c) => `- ${c.title} (${c.issuer})`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sai_Santosh_Madhari_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white overflow-hidden select-none">
      {/* PDF Chrome Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-zinc-900 border-b border-zinc-800 text-xs">
        <div className="flex items-center space-x-3">
          <FileText className="w-4 h-4 text-rose-400" />
          <span className="font-semibold text-zinc-200">Sai_Santosh_Madhari_Resume.pdf</span>
          <span className="text-zinc-500 font-mono">Page 1 of 1</span>
        </div>

        {/* PROMINENT ONE-CLICK DOWNLOAD BUTTON */}
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <Download className="w-4 h-4 animate-bounce" />
          <span>Download Resume PDF</span>
        </button>
      </div>

      {/* PDF Document Viewer Container */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-zinc-900/60 flex justify-center">
        <div className="w-full max-w-2xl bg-white text-slate-900 p-8 md:p-12 shadow-2xl rounded-sm font-sans space-y-6 text-xs select-text border border-gray-300">
          {/* Header */}
          <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{RESUME_DATA.name}</h1>
              <p className="text-sm font-semibold text-rose-600 mt-0.5">{RESUME_DATA.role} · 3+ Years Experience</p>
              <p className="text-slate-500 text-[11px]">Tata Consultancy Services (TCS) — Ultimatix TX Team</p>
            </div>
            <div className="text-right text-[11px] text-slate-600 space-y-0.5 font-mono">
              <div>{RESUME_DATA.email}</div>
              <div>{RESUME_DATA.phone}</div>
              <div className="text-rose-600 font-sans font-medium">Hyderabad, India</div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="space-y-1">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
              PROFILE SUMMARY
            </h2>
            <p className="text-slate-700 leading-relaxed pt-1">
              {RESUME_DATA.aboutMe}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-3">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
              WORK EXPERIENCE
            </h2>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900">UX Designer — Ultimatix (TX Team)</span>
                <span className="text-slate-500 font-mono text-[10px]">Oct 2025 — Present</span>
              </div>
              <p className="text-slate-600 text-[11px]">Tata Consultancy Services (TCS)</p>
              <ul className="list-disc list-inside text-slate-700 space-y-1 mt-1 pl-1">
                <li>Rebuilt Enterprise Search experience with structured "All Results" IA, reducing recurring issues by 80%+.</li>
                <li>Conducted heuristic evaluations and UX audits across enterprise customer platforms and TM System (TMS).</li>
                <li>Contributed scalable icon libraries and accessibility tokens to the enterprise design system.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900">UX Designer — Tech SW Service Next Gen</span>
                <span className="text-slate-500 font-mono text-[10px]">Oct 2022 — Sept 2025</span>
              </div>
              <p className="text-slate-600 text-[11px]">Tata Consultancy Services (TCS)</p>
              <ul className="list-disc list-inside text-slate-700 space-y-1 mt-1 pl-1">
                <li>Designed low-fi wireframes and high-fi Figma mockups under tight delivery deadlines.</li>
                <li>Validated functional requirements directly with cross-functional engineering and business stakeholders.</li>
              </ul>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                EDUCATION
              </h2>
              <div className="pt-1">
                <div className="font-bold text-slate-900">{RESUME_DATA.education.degree}</div>
                <div className="text-slate-600 text-[11px]">{RESUME_DATA.education.institution}</div>
              </div>
            </div>

            <div>
              <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                KEY CERTIFICATIONS
              </h2>
              <ul className="list-disc list-inside text-slate-700 space-y-0.5 pt-1 text-[11px]">
                {RESUME_DATA.certifications.slice(0, 3).map((c, i) => (
                  <li key={i}>{c.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
