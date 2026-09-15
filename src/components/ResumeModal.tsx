import React from 'react';
import { X, Printer, Mail } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { experienceList } from '../data/portfolioData';

interface ResumeModalProps {
  profile: ProfileData;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ profile, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 space-y-8 text-slate-200">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono uppercase text-slate-400">
              Curriculum Vitae / Resume
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div className="space-y-8 font-sans">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {profile.name}
            </h1>
            <p className="text-base sm:text-lg text-indigo-400 font-medium mt-1">
              {profile.title}
            </p>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-slate-400 mt-3">
              <span>{profile.location}</span>
              <span>•</span>
              <a href={`mailto:${profile.email}`} className="text-indigo-400 hover:underline">
                {profile.email}
              </a>
              <span>•</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                GitHub
              </a>
              <span>•</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-bold">
              Executive Summary
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-bold">
              Core Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-bold text-white block mb-1">Frontend & Architecture:</span>
                <span className="text-slate-400">
                  React 19, Next.js 15, TypeScript, Tailwind CSS, State Management (Zustand, TanStack Query), WebSockets.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-bold text-white block mb-1">Backend & Cloud Systems:</span>
                <span className="text-slate-400">
                  Node.js, Python, FastAPI, PostgreSQL, Redis, Docker, AWS (ECS, Lambda, RDS), Terraform.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-bold text-white block mb-1">Artificial Intelligence:</span>
                <span className="text-slate-400">
                  LangChain, pgvector, Pinecone, Semantic Caching, RAG Pipelines, OpenAI/Claude APIs, vLLM.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-bold text-white block mb-1">Methodology & Tooling:</span>
                <span className="text-slate-400">
                  Vitest, Playwright, CI/CD GitHub Actions, Trunk-based development, Distributed Tracing.
                </span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-bold">
              Professional Experience
            </h2>

            <div className="space-y-6">
              {experienceList.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{exp.role}</h3>
                      <p className="text-xs font-semibold text-indigo-400">{exp.company} — {exp.location}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-400 mt-0.5 sm:mt-0">{exp.period}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-1 pt-1 text-xs text-slate-300 pl-4 list-disc marker:text-indigo-500">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h2 className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-bold">
              Education & Certifications
            </h2>
            <div className="text-xs space-y-1 text-slate-300">
              <p className="font-bold text-white">B.S. in Computer Science — UC Berkeley (Magna Cum Laude Honors)</p>
              <p className="text-slate-400">AWS Certified Solutions Architect (Professional) • Certified Kubernetes Administrator</p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between print:hidden">
          <a
            href={`mailto:${profile.email}?subject=Resume%20Inquiry`}
            className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Inquire Directly</span>
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
