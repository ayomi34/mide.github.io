import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { ProfileData, ThemeColor } from '../types/portfolio';
import { colorThemeMap } from '../data/portfolioData';

interface NavbarProps {
  profile: ProfileData;
  activeTheme: ThemeColor;
  onSelectTheme: (theme: ThemeColor) => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
  onOpenCommand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeTheme,
  onSelectTheme,
  isDark,
  onToggleDark,
  onOpenResume,
  onOpenCustomizer,
  onOpenCommand,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b border-slate-800/80 bg-slate-950/90 py-3 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2.5 group">
              <span className="text-2xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text">
                Portfolio
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-orange-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Primary Hire / Contact CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-orange-400"
          >
            Hire Me
            <ArrowUpRight className="h-4 w-4" />
          </a>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <a
              href="#contact"
              className="inline-flex items-center gap-1 rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-orange-400"
            >
              Hire Me
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800/90 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 mt-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-800/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </a>
            ))}
          </div>

        </div>
      )}
    </header>
  );
};
