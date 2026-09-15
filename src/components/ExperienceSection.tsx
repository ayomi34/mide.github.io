import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Calendar, 
  MapPin,
  ExternalLink
} from 'lucide-react';
import { ThemeColor } from '../types/portfolio';
import { experienceList, colorThemeMap } from '../data/portfolioData';

interface ExperienceSectionProps {
  activeTheme: ThemeColor;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ activeTheme }) => {
  const [expandedId, setExpandedId] = useState<string>('exp-1');
  const currentTheme = colorThemeMap[activeTheme] || colorThemeMap.indigo;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  const certifications = [
    {
      title: 'AWS Certified Solutions Architect — Professional',
      issuer: 'Amazon Web Services',
      year: '2024',
      badge: 'Verified Credential',
    },
    {
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      year: '2023',
      badge: 'Verified Credential',
    },
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI / Andrew Ng',
      year: '2023',
      badge: 'Completed',
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-28 relative border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRACK & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Work Experience & Milestones
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            A track record of technical leadership, architecting resilient web systems, and delivering multimillion-dollar business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Timeline of Roles */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>Professional Journey</span>
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8">
              {experienceList.map((exp) => {
                const isExpanded = expandedId === exp.id;

                return (
                  <div key={exp.id} className="relative group">
                    {/* Timeline Node Dot */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                        exp.current
                          ? 'bg-indigo-500 border-white ring-4 ring-indigo-500/20'
                          : 'bg-slate-900 border-slate-600 group-hover:border-indigo-400'
                      }`}
                    />

                    {/* Card */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/50 border border-slate-800/90 hover:border-slate-700 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                            {exp.current && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-indigo-400 font-medium mt-0.5">
                            <span>{exp.company}</span>
                            {exp.companyUrl && (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-500 hover:text-white"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1 hidden sm:flex">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Expandable Achievements */}
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="mt-3 flex items-center space-x-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Key Achievements' : 'Show Key Achievements'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 animate-fadeIn">
                          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                            Measurable Impact & Milestones:
                          </p>
                          {exp.achievements.map((ach, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{ach}</span>
                            </div>
                          ))}

                          {/* Tech stack pills */}
                          <div className="flex flex-wrap gap-1.5 pt-3">
                            {exp.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700/60"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Education & Certifications */}
          <div className="lg:col-span-4 space-y-8">
            {/* Education Card */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                <span>Education</span>
              </h3>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-indigo-400">2013 — 2017</span>
                <h4 className="text-base font-bold text-white">
                  B.S. in Computer Science
                </h4>
                <p className="text-sm text-slate-300">
                  University of California, Berkeley
                </p>
                <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                  <p>• Magna Cum Laude Honors</p>
                  <p>• Focus: Distributed Systems & Machine Intelligence</p>
                  <p>• Teaching Assistant: Algorithms & Data Structures</p>
                </div>
              </div>
            </div>

            {/* Certifications Card */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Certifications</span>
              </h3>

              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{cert.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{cert.issuer}</p>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability CTA Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-900/40 space-y-3">
              <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider font-bold">
                Open for Q2/Q3 Collaborations
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Whether you need a full-time Staff / Lead Architect, an MVP launched from scratch, or an AI system audit, I'm available for high-impact engagements.
              </p>
              <a
                href="#contact"
                className={`inline-block px-4 py-2 rounded-xl text-xs font-semibold ${currentTheme.primary}`}
              >
                Start a Conversation
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
