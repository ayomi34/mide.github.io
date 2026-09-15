import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProfileData, ThemeColor } from '../types/portfolio';
import { colorThemeMap } from '../data/portfolioData';
import profileImage from '../../profile~3.jpg';

interface HeroProps {
  profile: ProfileData;
  activeTheme: ThemeColor;
  onOpenResume: () => void;
}

const GithubMark: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.84a9.6 9.6 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
  </svg>
);

const LinkedinMark: React.FC = () => <span className="text-base font-bold" aria-hidden="true">in</span>;

const TwitterMark: React.FC = () => <span className="text-base font-bold" aria-hidden="true">X</span>;

export const Hero: React.FC<HeroProps> = ({ profile, activeTheme }) => {
  const currentTheme = colorThemeMap[activeTheme] || colorThemeMap.indigo;

  return (
    <section className="hero-animated-bg relative min-h-screen overflow-hidden bg-slate-950 pt-28 pb-16 sm:pt-32">
      <div className="hero-scanline pointer-events-none absolute inset-0" />
      <div
        className="hero-glow pointer-events-none absolute -left-24 top-24 h-96 w-96 rounded-full blur-[130px] opacity-20"
        style={{ background: currentTheme.glow }}
      />
      <div className="hero-glow hero-glow-delayed pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[130px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-6xl items-center px-6 sm:px-10 lg:px-14">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 space-y-7 lg:order-1">
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-xl font-semibold text-slate-200 sm:text-2xl">Hi, I&apos;m</p>
                <h1 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl whitespace-nowrap">
                <span className="text-orange-400">
                  {profile.name}
                </span>
                </h1>
              </div>
              <p className="text-xl font-bold text-slate-200 sm:text-2xl">
                Web Developer · AI &amp; SaaS Builder · Certified Data Analyst
              </p>
            </div>

            <p className="max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              I&apos;m Mide, a web developer and AI &amp; SaaS builder focused on creating modern web applications, intelligent digital products, and data-driven solutions that are practical, scalable, and easy to use.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 transition-transform hover:-translate-y-1 ${currentTheme.primary}`}
              >
                Hire me
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center rounded-full border border-cyan-400/70 px-7 py-3.5 text-sm font-bold text-cyan-300 transition-colors hover:bg-cyan-400/10"
              >
                View My Projects
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-slate-200 transition-colors hover:bg-slate-700 hover:text-white">
                <GithubMark />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-slate-200 transition-colors hover:bg-slate-700 hover:text-white">
                <LinkedinMark />
              </a>
              <a href={profile.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-slate-200 transition-colors hover:bg-slate-700 hover:text-white">
                <TwitterMark />
              </a>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative h-72 w-72 sm:h-96 sm:w-96 lg:h-[30rem] lg:w-[30rem]">
              <div
                className="absolute inset-0 rounded-full opacity-50 blur-2xl"
                style={{ background: currentTheme.glow }}
              />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-slate-700/80 bg-slate-800 shadow-2xl shadow-indigo-950/40">
                <img
                  src={profileImage}
                  alt={profile.name}
                  onError={(event) => {
                    event.currentTarget.src = profile.avatarUrl;
                  }}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
