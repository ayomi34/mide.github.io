import { useState, useEffect } from 'react';
import { ProfileData, ThemeColor } from './types/portfolio';
import { defaultProfile } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProfileCustomizerModal } from './components/ProfileCustomizerModal';
import { CommandPalette } from './components/CommandPalette';
import { AdminDashboard } from './components/AdminDashboard';
import { fetchPublishedContent, isCmsConfigured } from './lib/supabase';

export function App() {
  // Load saved profile or fallback to default
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('akinola_portfolio_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultProfile;
      }
    }
    return defaultProfile;
  });

  // Load saved theme or fallback to indigo
  const [activeTheme, setActiveTheme] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem('alex_portfolio_theme') as ThemeColor;
    return saved || 'indigo';
  });

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('alex_portfolio_mode');
    return saved ? saved === 'dark' : true;
  });

  // Modals state
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Sync dark class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('alex_portfolio_mode', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Persist theme
  const handleSelectTheme = (theme: ThemeColor) => {
    setActiveTheme(theme);
    localStorage.setItem('alex_portfolio_theme', theme);
  };

  // Persist profile
  const handleSaveProfile = (newProfile: ProfileData) => {
    setProfile(newProfile);
    localStorage.setItem('akinola_portfolio_profile', JSON.stringify(newProfile));
  };

  // Keyboard shortcut for Cmd+K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!isCmsConfigured) return;
    void fetchPublishedContent().then((entries) => {
      const content = Object.fromEntries(entries.map((entry) => [entry.key, entry.value]));
      const hero = content.hero ?? {};
      const contact = content.contact ?? {};
      const socials = content.socials ?? {};
      setProfile((current) => ({
        ...current,
        name: typeof hero.name === 'string' ? hero.name : current.name,
        title: typeof hero.title === 'string' ? hero.title : current.title,
        tagline: typeof hero.description === 'string' ? hero.description : current.tagline,
        email: typeof contact.email === 'string' ? contact.email : current.email,
        phone: typeof contact.phone === 'string' ? contact.phone : current.phone,
        github: typeof socials.github === 'string' ? socials.github : current.github,
        linkedin: typeof socials.linkedin === 'string' ? socials.linkedin : current.linkedin,
        twitter: typeof socials.twitter === 'string' ? socials.twitter : current.twitter,
      }));
      const seo = content.seo ?? {};
      if (typeof seo.title === 'string') document.title = seo.title;
      if (typeof seo.description === 'string') document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
    }).catch(() => undefined);
  }, []);

  if (window.location.pathname === '/admin') return <AdminDashboard />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern selection:bg-indigo-500 selection:text-white relative">
      {/* Subtle top atmospheric background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-600/10 blur-[160px] pointer-events-none -z-10" />

      {/* Sticky Navigation */}
      <Navbar
        profile={profile}
        activeTheme={activeTheme}
        onSelectTheme={handleSelectTheme}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Section with Live Terminal Widget */}
        <Hero
          profile={profile}
          activeTheme={activeTheme}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* About & Philosophy Section */}
        <AboutSection profile={profile} activeTheme={activeTheme} />

        {/* Technical Skills & Blueprints */}
        <SkillsSection activeTheme={activeTheme} />

        {/* Featured Projects Showcase with Case Study Modal */}
        <ProjectsSection activeTheme={activeTheme} />

        {/* Client Endorsements & Testimonials */}
        <TestimonialsSection activeTheme={activeTheme} />

        {/* Contact Form & Direct Booking */}
        <ContactSection
          profile={profile}
          activeTheme={activeTheme}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        activeTheme={activeTheme}
      />

      {/* Modals */}
      {isResumeOpen && (
        <ResumeModal
          profile={profile}
          onClose={() => setIsResumeOpen(false)}
        />
      )}

      {isCustomizerOpen && (
        <ProfileCustomizerModal
          currentProfile={profile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsCustomizerOpen(false)}
        />
      )}

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectTheme={handleSelectTheme}
        onToggleDark={() => setIsDark(!isDark)}
        isDark={isDark}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        userEmail={profile.email}
      />
    </div>
  );
}

export default App;
