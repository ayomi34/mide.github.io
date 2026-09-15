import React from 'react';
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import { ProfileData, ThemeColor } from '../types/portfolio';
import { colorThemeMap } from '../data/portfolioData';

interface ContactSectionProps {
  profile: ProfileData;
  activeTheme: ThemeColor;
}

const XMark: React.FC = () => <span className="text-sm font-bold" aria-hidden="true">X</span>;
const GithubMark: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.84a9.6 9.6 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
  </svg>
);
const LinkedinMark: React.FC = () => <span className="text-sm font-bold" aria-hidden="true">in</span>;

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, activeTheme: _activeTheme }) => {
  return (
    <section id="contact" className="relative overflow-hidden bg-slate-100 py-24 text-slate-900 md:py-32">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl" />
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-indigo-600">
              <MessageCircle className="h-3.5 w-3.5" />
              Get in touch
            </div>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Let&apos;s build something
              <span className="block text-indigo-600">useful.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Have an idea, a project, or a problem that needs a digital solution? Let&apos;s talk.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Whether you need a modern website, an AI-powered application, a SaaS product, data analysis, or help turning an idea into a working MVP, I&apos;d be happy to discuss it.
            </p>
            <p className="mt-6 text-lg font-semibold text-slate-900">
              Have a project in mind? Let&apos;s make it happen.
            </p>
            <a
              href="https://wa.me/2348134349499?text=Hello%20Mide%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-transform hover:-translate-y-1 hover:bg-indigo-500"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="mb-6 text-2xl font-bold text-slate-950">Get in Touch</h3>

            <a href={`mailto:${profile.email}`} className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-slate-200/70">
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-slate-500">
                <Mail className="h-4 w-4 text-indigo-600" />
                Email
              </span>
              <span className="mt-3 block break-all text-sm font-semibold text-slate-800 group-hover:text-indigo-600">{profile.email}</span>
            </a>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-slate-500">
                <MapPin className="h-4 w-4 text-indigo-600" />
                Location
              </span>
              <p className="mt-3 text-sm font-semibold text-slate-800">Ibadan, Nigeria</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-slate-500">Availability</span>
              <p className="mt-3 text-sm leading-6 text-slate-700">Open to freelance projects, collaborations, and new opportunities.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-slate-500">Connect with me</span>
              <div className="mt-4 flex items-center gap-3">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-indigo-600">
                  <LinkedinMark />
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-indigo-600">
                  <GithubMark />
                </a>
                <a href={profile.twitter} target="_blank" rel="noreferrer" aria-label="X" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-indigo-600">
                  <XMark />
                </a>
                <span className="ml-1 text-sm text-slate-500">LinkedIn · GitHub · X</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
