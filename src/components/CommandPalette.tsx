import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  FileText, 
  Mail, 
  Sun, 
  Moon, 
  Palette, 
  FolderGit2, 
  Code2, 
  Cpu, 
  Calculator, 
  Sliders
} from 'lucide-react';
import { ThemeColor } from '../types/portfolio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (theme: ThemeColor) => void;
  onToggleDark: () => void;
  isDark: boolean;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
  userEmail: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTheme,
  onToggleDark,
  isDark,
  onOpenResume,
  onOpenCustomizer,
  userEmail,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'projects',
      label: 'Jump to Featured Projects',
      icon: <FolderGit2 className="w-4 h-4 text-indigo-400" />,
      run: () => {
        const el = document.getElementById('projects');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'sandbox',
      label: 'Open Interactive Sandbox & Token Simulator',
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      run: () => {
        const el = document.getElementById('sandbox');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'skills',
      label: 'Inspect Technical Skills Matrix',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      run: () => {
        const el = document.getElementById('skills');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'estimator',
      label: 'Launch Project Scope & Cost Estimator',
      icon: <Calculator className="w-4 h-4 text-amber-400" />,
      run: () => {
        const el = document.getElementById('estimator');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'resume',
      label: 'View Curriculum Vitae / Resume Modal',
      icon: <FileText className="w-4 h-4 text-slate-300" />,
      run: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'customizer',
      label: 'Edit Portfolio (Name, Title, Bio, Rates)',
      icon: <Sliders className="w-4 h-4 text-purple-400" />,
      run: () => {
        onClose();
        onOpenCustomizer();
      },
    },
    {
      id: 'email',
      label: `Copy Contact Email (${userEmail})`,
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      run: () => {
        navigator.clipboard.writeText(userEmail);
        onClose();
      },
    },
    {
      id: 'theme_mode',
      label: isDark ? 'Switch to Light Theme Mode' : 'Switch to Dark Theme Mode',
      icon: isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />,
      run: () => {
        onToggleDark();
        onClose();
      },
    },
    {
      id: 'theme_emerald',
      label: 'Set Accent to Emerald Cyber',
      icon: <Palette className="w-4 h-4 text-emerald-400" />,
      run: () => {
        onSelectTheme('emerald');
        onClose();
      },
    },
    {
      id: 'theme_indigo',
      label: 'Set Accent to Electric Indigo',
      icon: <Palette className="w-4 h-4 text-indigo-400" />,
      run: () => {
        onSelectTheme('indigo');
        onClose();
      },
    },
    {
      id: 'theme_cyan',
      label: 'Set Accent to Arctic Cyan',
      icon: <Palette className="w-4 h-4 text-cyan-400" />,
      run: () => {
        onSelectTheme('cyan');
        onClose();
      },
    },
  ];

  const filtered = actions.filter((act) =>
    act.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-4 h-4 text-slate-400 mr-2.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <p className="p-4 text-center text-xs text-slate-500">
              No matching actions found for "{query}".
            </p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.run}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white">
                    {item.label}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Navigate with click or arrow keys</span>
          <span>alex-portfolio-v8</span>
        </div>

      </div>
    </div>
  );
};
