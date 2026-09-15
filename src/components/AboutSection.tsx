import React from 'react';
import { ArrowUpRight, CheckCircle2, Code2, MapPin, Sparkles } from 'lucide-react';
import { ProfileData, ThemeColor } from '../types/portfolio';
import { colorThemeMap } from '../data/portfolioData';

interface AboutSectionProps {
  profile: ProfileData;
  activeTheme: ThemeColor;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, activeTheme }) => {
  const currentTheme = colorThemeMap[activeTheme] || colorThemeMap.indigo;
  const focusAreas = ['Product interfaces', 'Scalable systems', 'AI-powered tools', 'Thoughtful UX'];

  return (
    <section id="about" className="relative overflow-hidden bg-slate-100 py-24 text-slate-900 md:py-32">
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14">
        <div className="mb-14 max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-indigo-600">
            <Code2 className="h-3.5 w-3.5" />
            About me
          </div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            The person behind the
            <span className="block text-indigo-600">pixels and systems.</span>
          </h2>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-indigo-200 via-cyan-100 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 p-2 shadow-2xl shadow-slate-300/60">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <img
                  src="/ayomi.png"
                  alt={`${profile.name} portrait`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="text-lg font-bold text-white">{profile.name}</p>
                    <p className="mt-1 text-xs text-slate-200">Building with clarity and care.</p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    Available
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl shadow-slate-300/60 sm:block">
              <p className="text-3xl font-extrabold text-slate-950">{profile.completedProjects}+</p>
              <p className="mt-1 text-xs text-slate-500">Projects delivered</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
              <p>
                I&apos;m {profile.name}, a frontend developer focused on creating digital experiences that feel clear, fast, and memorable.
              </p>
              <p>
                I bring together strong visual systems, thoughtful interaction, and dependable engineering to turn ambitious ideas into products people enjoy using.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
                <MapPin className="h-4 w-4 text-indigo-600" />
                Remote & worldwide
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Detail-driven craft
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 border-y border-slate-200 py-6 sm:grid-cols-4">
              <div>
                <p className="text-2xl font-extrabold text-slate-950">{profile.yearsExperience}+</p>
                <p className="mt-1 text-xs text-slate-500">Years experience</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-950">{profile.completedProjects}+</p>
                <p className="mt-1 text-xs text-slate-500">Projects shipped</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-950">99%</p>
                <p className="mt-1 text-xs text-slate-500">Client satisfaction</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-950">24/7</p>
                <p className="mt-1 text-xs text-slate-500">Curiosity</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">What I care about</p>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((focus) => (
                  <span key={focus} className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {focus}
                  </span>
                ))}
              </div>
            </div>

            <a href="#projects" className={`inline-flex items-center gap-2 text-sm font-bold ${currentTheme.text} hover:underline`}>
              Explore my work
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
