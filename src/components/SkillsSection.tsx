import React from 'react';
import {
  BarChart3,
  BrainCircuit,
  Check,
  Code2,
  Database,
  Lightbulb,
  Settings2,
  Sparkles,
} from 'lucide-react';
import { ThemeColor } from '../types/portfolio';
import { colorThemeMap } from '../data/portfolioData';

interface SkillsSectionProps {
  activeTheme: ThemeColor;
}

const expertiseGroups = [
  {
    title: 'Frontend Development',
    icon: Code2,
    items: [
      'HTML5, CSS3 & JavaScript',
      'React & modern frontend frameworks',
      'Responsive and mobile-first design',
      'Component-based UI development',
      'API integration',
      'Interactive web applications',
    ],
  },
  {
    title: 'AI & SaaS Development',
    icon: BrainCircuit,
    items: [
      'AI-powered web applications',
      'AI API integration',
      'SaaS product development',
      'AI automation workflows',
      'LLM-powered features',
      'MVP development and rapid prototyping',
    ],
  },
  {
    title: 'Backend & Systems',
    icon: Database,
    items: [
      'REST API integration',
      'Authentication & authorization',
      'Database-driven applications',
      'Supabase',
      'Server-side logic',
      'Third-party API integration',
    ],
  },
  {
    title: 'Data Analytics & Research',
    icon: BarChart3,
    items: [
      'Microsoft Excel',
      'Python for data analysis',
      'Data cleaning & transformation',
      'Data visualization',
      'Statistical analysis',
      'SPSS & questionnaire analysis',
      'Research data interpretation',
    ],
  },
  {
    title: 'Tools & Technologies',
    icon: Settings2,
    items: [
      'Git & GitHub',
      'VS Code',
      'Supabase',
      'OpenRouter',
      'n8n',
      'Microsoft Office',
      'IT & Technical Support',
    ],
  },
  {
    title: 'ICT Administration',
    icon: Sparkles,
    items: [
      'Computer systems setup and maintenance',
      'Software installation and troubleshooting',
      'Network and hardware support',
      'Technical documentation',
      'ICT administration',
    ],
  },
];

const strengths = [
  {
    title: 'Problem Solving',
    text: 'I turn real-world problems into practical digital solutions.',
  },
  {
    title: 'Product Thinking',
    text: 'I focus on usability, functionality, scalability, and business value.',
  },
  {
    title: 'Research & Data',
    text: 'I use data and structured research to support better decisions.',
  },
  {
    title: 'Continuous Learning',
    text: 'I continuously explore emerging technologies, especially AI, automation, and modern web development.',
  },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ activeTheme }) => {
  const currentTheme = colorThemeMap[activeTheme] || colorThemeMap.indigo;

  return (
    <section id="skills" className="relative overflow-hidden bg-slate-950 py-24 text-white md:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[48rem] -translate-x-1/2 rounded-full opacity-10 blur-[130px]"
        style={{ background: currentTheme.glow }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14">
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            Skills & Expertise
          </div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Practical skills for
            <span className={`block bg-gradient-to-r ${currentTheme.gradient} bg-clip-text text-transparent`}>
              useful digital products.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            I build practical digital solutions that combine clean interfaces, intelligent automation, reliable systems, and data-driven decision-making.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {expertiseGroups.map(({ title, icon: Icon, items }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-colors hover:border-indigo-400/40 hover:bg-slate-900"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-300 ring-1 ring-indigo-400/20">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-white">{title}</h3>
              </div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-5 text-slate-400">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <div className="mb-7 flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-amber-300" />
            <h3 className="text-2xl font-bold text-white">What I Bring</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((strength) => (
              <article key={strength.title} className="border-l border-indigo-400/50 pl-5">
                <h4 className="text-base font-bold text-white">{strength.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">{strength.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
