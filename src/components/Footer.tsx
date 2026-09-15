import React from 'react';
import { Mail } from 'lucide-react';
import { ProfileData, ThemeColor } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
  activeTheme: ThemeColor;
}

const GithubMark: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.84a9.6 9.6 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
  </svg>
);

const LinkedinMark: React.FC = () => <span className="text-sm font-bold" aria-hidden="true">in</span>;
const XMark: React.FC = () => <span className="text-sm font-bold" aria-hidden="true">X</span>;

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-14 text-slate-300">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14">
        <div className="grid gap-10 border-b border-slate-800 pb-10 md:grid-cols-[1.3fr_0.8fr_0.8fr]">
          <div>
            <a href="#" className="text-2xl font-extrabold tracking-tight text-orange-400">Mide</a>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Front-end Web Developer · AI &amp; SaaS Builder · Certified Data Analyst
            </p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
              I build modern digital products, AI-powered solutions, and data-driven applications that solve real problems.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Navigation</h2>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-400">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="transition-colors hover:text-orange-400">{link.label}</a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Connect</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-300 transition-colors hover:bg-orange-400 hover:text-slate-950">
                <LinkedinMark />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-300 transition-colors hover:bg-orange-400 hover:text-slate-950">
                <GithubMark />
              </a>
              <a href={profile.twitter} target="_blank" rel="noreferrer" aria-label="X" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-300 transition-colors hover:bg-orange-400 hover:text-slate-950">
                <XMark />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-300 transition-colors hover:bg-orange-400 hover:text-slate-950">
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <a href={`mailto:${profile.email}`} className="mt-4 block break-all text-sm text-slate-400 transition-colors hover:text-orange-400">{profile.email}</a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-slate-500 sm:flex-row">
          <span>© 2026 Mide. All rights reserved.</span>
          <span>Built with care.</span>
        </div>
      </div>
    </footer>
  );
};
