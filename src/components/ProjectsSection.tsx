import React, { useEffect, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2, ExternalLink } from 'lucide-react';
import { ThemeColor } from '../types/portfolio';
import { colorThemeMap } from '../data/portfolioData';
import { fetchProjects, CmsProject } from '../lib/supabase';

interface ProjectsSectionProps {
  activeTheme: ThemeColor;
}

const projects = [
  {
    title: 'Mide Online Test',
    category: 'Education • Web Application',
    description: 'An online assessment platform that allows students to take structured tests while teachers and administrators create, manage, and monitor assessments.',
    features: ['Student online testing', 'Teacher test management', 'Automatic scoring', 'Performance tracking', 'Admin dashboard', 'Subject and class management'],
    tech: ['JavaScript', 'React', 'Supabase'],
    url: 'https://mideonlinetest.vercel.app/',
    accent: 'from-cyan-500/20 via-indigo-500/10 to-transparent',
  },
  {
    title: 'ExamPro',
    category: 'Education • Desktop Application',
    description: 'A Windows-based examination and practice platform designed for students preparing for WAEC, NECO, and UTME examinations.',
    features: ['Timed examinations', 'Practice and mock exams', 'Question bank management', 'Performance analytics', 'Study planning', 'Offline-first experience'],
    tech: ['Python', 'PySide6', 'SQLite', 'SQLAlchemy'],
    accent: 'from-amber-500/20 via-orange-500/10 to-transparent',
  },
  {
    title: 'Smart Prints & Research Consult',
    category: 'Printing • Research Services',
    description: 'A digital platform connecting customers with printing and academic research services, making it easier to submit documents, request services, and manage orders.',
    features: ['Document upload', 'Printing service requests', 'Research service requests', 'Online payment integration', 'Order management', 'Delivery and pickup options'],
    tech: ['JavaScript', 'Supabase', 'Paystack'],
    url: 'https://printsave.vercel.app/',
    accent: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  },
  {
    title: 'School Examination Generator',
    category: 'EdTech • AI Product',
    description: 'An AI-powered examination system designed to help schools generate structured examination papers from their curriculum, class topics, and examination requirements.',
    features: ['Curriculum and topic input', 'AI question generation', 'Objective and theory questions', 'Customizable examination structure', 'School-branded exam documents', 'Subscription-based school access'],
    tech: ['AI', 'SaaS', 'Document Generation'],
    url: 'https://e-crafts.vercel.app/',
    accent: 'from-fuchsia-500/20 via-indigo-500/10 to-transparent',
  },
];

type DisplayProject = (typeof projects)[number];

const mapCmsProject = (project: CmsProject): DisplayProject => ({
  title: project.title,
  category: project.category,
  description: project.description,
  features: project.features,
  tech: project.technologies,
  url: project.live_url ?? undefined,
  accent: 'from-indigo-500/20 via-cyan-500/10 to-transparent',
});

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ activeTheme }) => {
  const currentTheme = colorThemeMap[activeTheme] || colorThemeMap.indigo;
  const [publishedProjects, setPublishedProjects] = useState<DisplayProject[]>(projects);

  useEffect(() => {
    void fetchProjects().then((loadedProjects) => {
      if (loadedProjects.length > 0) setPublishedProjects(loadedProjects.map(mapCmsProject));
    }).catch(() => undefined);
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden border-t border-slate-900 bg-slate-950 py-24 text-white md:py-32">
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14">
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-indigo-300">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            Featured Projects
          </div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Digital work built for
            <span className={`block bg-gradient-to-r ${currentTheme.gradient} bg-clip-text text-transparent`}>
              real-world needs.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            A selection of digital products, platforms, and solutions I&apos;ve designed and built to solve real-world problems.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {publishedProjects.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-950/30 sm:p-8"
            >
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${project.accent} opacity-80`} />
              <div className="relative">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-mono uppercase tracking-[0.14em] text-indigo-300">{project.category}</p>
                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-200">{project.title}</h3>
                  </div>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${project.title}`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-950/60 text-slate-300 transition-colors hover:border-indigo-400 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-[11px] font-semibold text-slate-400">Desktop app</span>
                  )}
                </div>

                <p className="max-w-xl text-sm leading-7 text-slate-400">{project.description}</p>

                <div className="mt-6">
                  <p className="mb-3 text-xs font-mono uppercase tracking-[0.14em] text-slate-500">Key features</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-5">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((technology) => (
                      <span key={technology} className="rounded-md bg-slate-950/70 px-2.5 py-1 text-xs font-mono text-slate-300 ring-1 ring-slate-800">
                        {technology}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300 hover:text-indigo-200">
                      View project
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
