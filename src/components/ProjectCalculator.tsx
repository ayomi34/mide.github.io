import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Layers,
  ShieldCheck
} from 'lucide-react';
import { ThemeColor } from '../types/portfolio';
import { colorThemeMap } from '../data/portfolioData';

interface ProjectCalculatorProps {
  activeTheme: ThemeColor;
  onSelectScopeForContact: (scopeData: {
    serviceType: string;
    budget: string;
    messageSummary: string;
  }) => void;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({
  activeTheme,
  onSelectScopeForContact,
}) => {
  const currentTheme = colorThemeMap[activeTheme] || colorThemeMap.indigo;

  const [projectType, setProjectType] = useState<'mvp' | 'saas' | 'ai' | 'audit'>('saas');
  const [timeline, setTimeline] = useState<'standard' | 'expedited' | 'flexible'>('standard');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'auth',
    'realtime',
    'cloud',
  ]);

  const projectTypes = [
    {
      id: 'mvp',
      name: 'High-Velocity MVP',
      basePrice: 5500,
      baseWeeks: 3,
      desc: 'Rapid production launch for startups validating market fit.',
    },
    {
      id: 'saas',
      name: 'Full-Scale SaaS Platform',
      basePrice: 12500,
      baseWeeks: 6,
      desc: 'Robust multi-tenant web application with billing, state, and dashboard.',
    },
    {
      id: 'ai',
      name: 'Generative AI & Agent Workspace',
      basePrice: 16000,
      baseWeeks: 8,
      desc: 'Streaming RAG, vector embeddings, autonomous agent tools.',
    },
    {
      id: 'audit',
      name: 'Architecture & Latency Audit',
      basePrice: 4800,
      baseWeeks: 2,
      desc: 'In-depth code profiling, p99 tuning, security assessment.',
    },
  ];

  const featuresList = [
    { id: 'auth', name: 'Auth & Role-Based Access Control', price: 1200 },
    { id: 'vector', name: 'RAG Knowledge Pipeline & pgvector', price: 3400 },
    { id: 'stripe', name: 'Stripe Billing & Tiered Subscriptions', price: 1800 },
    { id: 'realtime', name: 'Real-Time WebSockets & Live Presence', price: 2200 },
    { id: 'cloud', name: 'Automated CI/CD & AWS Infrastructure', price: 1600 },
    { id: 'testing', name: 'Playwright E2E & Vitest Test Coverage', price: 1400 },
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const currentTypeConfig = projectTypes.find((p) => p.id === projectType)!;
  const featuresTotal = selectedFeatures.reduce((sum, fId) => {
    const f = featuresList.find((item) => item.id === fId);
    return sum + (f ? f.price : 0);
  }, 0);

  const speedMultiplier = timeline === 'expedited' ? 1.25 : timeline === 'flexible' ? 0.95 : 1.0;
  const rawTotal = (currentTypeConfig.basePrice + featuresTotal) * speedMultiplier;
  const minEstimate = Math.round(rawTotal * 0.9 / 500) * 500;
  const maxEstimate = Math.round(rawTotal * 1.15 / 500) * 500;

  const estimatedWeeks = timeline === 'expedited' 
    ? Math.max(2, Math.round(currentTypeConfig.baseWeeks * 0.7)) 
    : currentTypeConfig.baseWeeks;

  const handleTransferToContact = () => {
    const featureNames = selectedFeatures
      .map((f) => featuresList.find((i) => i.id === f)?.name)
      .filter(Boolean)
      .join(', ');

    const summary = `Hi Alex, I used your Project Scope Estimator for a ${currentTypeConfig.name}. Selected Features: [${featureNames}]. Target Timeline: ${timeline.toUpperCase()} (~${estimatedWeeks} weeks). Estimated budget range: $${minEstimate.toLocaleString()} - $${maxEstimate.toLocaleString()}. Let's discuss details!`;

    onSelectScopeForContact({
      serviceType: currentTypeConfig.name,
      budget: `$${minEstimate.toLocaleString()} - $${maxEstimate.toLocaleString()}`,
      messageSummary: summary,
    });

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-400">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE SCOPE ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Estimate Your Project Scope & Investment
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Transparent, modular estimates for MVPs, SaaS platforms, and enterprise AI integrations.
          </p>
        </div>

        {/* Main Tool Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scope & Feature Selectors */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Project Type */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                Step 1: Select Engagement Model
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setProjectType(type.id as any)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      projectType === type.id
                        ? 'bg-indigo-950/30 border-indigo-500/60 ring-1 ring-indigo-500/40'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{type.name}</h4>
                      {projectType === type.id && (
                        <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{type.desc}</p>
                    <p className="text-xs font-mono font-semibold text-slate-300 mt-2">
                      Base ~ ${type.basePrice.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Modular Features */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                  Step 2: Add Architecture & Capability Modules
                </span>
                <span className="text-xs text-slate-400">
                  {selectedFeatures.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featuresList.map((feature) => {
                  const isChecked = selectedFeatures.includes(feature.id);
                  return (
                    <div
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-slate-800/90 border-indigo-500/40 text-white'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-indigo-600 text-white' : 'border border-slate-700'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-medium">{feature.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-indigo-300">
                        +${feature.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timeline Preference */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                Step 3: Preferred Velocity
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'flexible', label: 'Flexible', desc: 'Relaxed schedule' },
                  { id: 'standard', label: 'Standard', desc: 'Balanced sprints' },
                  { id: 'expedited', label: 'Expedited', desc: 'Fast-track rush' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setTimeline(s.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      timeline === s.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold">{s.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Estimate Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/90 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono uppercase text-slate-400">Estimated Investment</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Real-time
                </span>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-xs text-slate-400">Project Range:</p>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1">
                  ${minEstimate.toLocaleString()} — ${maxEstimate.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  *Final quote provided after formal scoping & tech specification.
                </p>
              </div>

              {/* Key Deliverables Summary */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    Target Timeline:
                  </span>
                  <span className="font-mono font-bold text-white">~{estimatedWeeks} Weeks</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Selected Modules:
                  </span>
                  <span className="font-mono font-bold text-white">{selectedFeatures.length} Add-ons</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Clean Code Guarantee:
                  </span>
                  <span className="font-mono text-emerald-400">Included</span>
                </div>
              </div>

              {/* Action Button: Transfer to Contact Form */}
              <button
                onClick={handleTransferToContact}
                className={`w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl font-semibold text-sm transition-all cursor-pointer ${currentTheme.primary} shadow-lg shadow-indigo-950/40`}
              >
                <span>Transfer Scope to Contact Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Pre-fills the message below with your selections</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
