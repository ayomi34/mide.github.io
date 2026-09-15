import React, { useState } from 'react';
import { Terminal, Copy, Check, CornerDownLeft } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface TerminalWidgetProps {
  profile: ProfileData;
}

export const TerminalWidget: React.FC<TerminalWidgetProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'config' | 'skills' | 'status'>('config');
  const [copied, setCopied] = useState(false);
  const [cliInput, setCliInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<
    { command: string; output: string | React.ReactNode }[]
  >([
    {
      command: 'alex --version',
      output: 'alex-rivera-core v8.4.2 (x86_64-node-production)',
    },
    {
      command: 'alex ping',
      output: '⚡ Status: 200 OK | Latency: 12ms | Availability: Open for select projects',
    },
  ]);

  const configContent = `// ${profile.name.toLowerCase().replace(/\s+/g, '_')}.config.ts
export const engineer = {
  name: "${profile.name}",
  title: "${profile.title}",
  location: "${profile.location}",
  status: "${profile.statusText}",
  yearsExperience: ${profile.yearsExperience},
  coreStack: ["TypeScript", "React 19", "FastAPI", "PostgreSQL", "Docker"],
  architecturalPriorities: [
    "Sub-100ms p99 latency",
    "Zero-trust API security",
    "Observable distributed telemetry",
    "Ergonomic design systems"
  ],
  currentlyReading: "Designing Data-Intensive Applications",
  coffeeConsumedToday: 3.5,
  isAvailableForHire: true
};`;

  const skillsContent = `// skills_manifest.json
{
  "frontend": ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Zustand"],
  "backend": ["Python / FastAPI", "Node.js / Bun", "PostgreSQL", "Redis", "Go"],
  "ai_infra": ["LangChain", "pgvector", "Pinecone", "RAG Pipelines", "OpenAI / Claude API"],
  "cloud": ["AWS (ECS, Lambda, RDS)", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  "metrics": {
    "projectsDelivered": ${profile.completedProjects},
    "satisfactionRate": "99.8%",
    "openSourceCommits": ${profile.openSourceContributions}
  }
}`;

  const statusContent = `[SYSTEM TELEMETRY]
● Core Services: ONLINE (100% HEALTHY)
● Available Capacity: 25% (Ready for 1 High-Impact Q2 Project)
● Primary Timezone: ${profile.timezone}
● Response Time: < 4 hours
● GitHub Stars Collected: 2,400+
● Automated Tests Passing: 99.4%
● Type Check: STRICT (0 Errors)
`;

  const handleCopy = () => {
    const textToCopy =
      activeTab === 'config'
        ? configContent
        : activeTab === 'skills'
        ? skillsContent
        : statusContent;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    let reply: string | React.ReactNode = '';

    if (cmd === 'help') {
      reply = 'Available commands: whoami, skills, projects, contact, clear, hire, quote, ping';
    } else if (cmd === 'whoami' || cmd === 'bio') {
      reply = `${profile.name} — ${profile.title}. ${profile.bio}`;
    } else if (cmd === 'skills') {
      reply = 'Full-Stack: React 19, TypeScript, Next.js, Node.js, Python, PostgreSQL, AWS, Docker, AI Agents.';
    } else if (cmd === 'clear') {
      setCommandHistory([]);
      setCliInput('');
      return;
    } else if (cmd === 'hire' || cmd === 'sudo hire') {
      reply = '🎉 Access Granted! Email ' + profile.email + ' or scroll down to the Contact section!';
    } else if (cmd === 'contact') {
      reply = `Reach out via email: ${profile.email} or GitHub: ${profile.github}`;
    } else if (cmd === 'quote' || cmd === 'inspire') {
      reply = '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra';
    } else if (cmd === 'ping') {
      reply = 'pong! Latency: 14ms (Healthy)';
    } else {
      reply = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setCommandHistory((prev) => [...prev, { command: cliInput, output: reply }]);
    setCliInput('');
  };

  const runSampleCommand = (cmd: string) => {
    setCliInput(cmd);
    setTimeout(() => {
      setCliInput(cmd);
      // Trigger execution directly
      let reply: string | React.ReactNode = '';
      if (cmd === 'whoami') reply = `${profile.name} — ${profile.title}.`;
      else if (cmd === 'skills') reply = 'React 19, Next.js, Python, FastAPI, PostgreSQL, Docker, AWS, AI.';
      else if (cmd === 'hire') reply = `Let's build something epic! Mail: ${profile.email}`;
      else if (cmd === 'clear') {
        setCommandHistory([]);
        setCliInput('');
        return;
      }
      setCommandHistory((prev) => [...prev, { command: cmd, output: reply }]);
      setCliInput('');
    }, 50);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl shadow-black/60 overflow-hidden font-mono text-xs">
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/40" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
          <span className="ml-2 text-slate-400 text-[11px] font-sans flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            terminal ~ zsh
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'config'
                ? 'bg-slate-800 text-indigo-300 font-semibold border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            alex.config.ts
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'skills'
                ? 'bg-slate-800 text-indigo-300 font-semibold border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            skills.json
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'status'
                ? 'bg-slate-800 text-emerald-300 font-semibold border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            status.log
          </button>

          <button
            onClick={handleCopy}
            title="Copy snippet"
            className="ml-2 p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-4 sm:p-5 max-h-72 overflow-y-auto text-slate-300 bg-slate-950/60 leading-relaxed">
        {activeTab === 'config' && (
          <pre className="text-slate-300 whitespace-pre-wrap">
            <code>
              {configContent.split('\n').map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-6 text-slate-600 select-none text-right mr-3 text-[10px] pt-0.5">
                    {i + 1}
                  </span>
                  <span>
                    {line.includes('//') ? (
                      <span className="text-slate-500 italic">{line}</span>
                    ) : line.includes('export') || line.includes('const') ? (
                      <span className="text-purple-400">{line}</span>
                    ) : line.includes('true') || line.includes('false') ? (
                      <span className="text-amber-400">{line}</span>
                    ) : line.includes('"') ? (
                      <span className="text-emerald-300">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}

        {activeTab === 'skills' && (
          <pre className="text-cyan-300 whitespace-pre-wrap">
            <code>{skillsContent}</code>
          </pre>
        )}

        {activeTab === 'status' && (
          <div className="space-y-1 text-emerald-400">
            {statusContent.split('\n').map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        )}

        {/* Command history */}
        {commandHistory.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
            {commandHistory.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center text-indigo-400">
                  <span className="text-slate-500 mr-2">❯</span>
                  <span className="font-semibold text-slate-200">{item.command}</span>
                </div>
                <div className="text-slate-400 pl-4">{item.output}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Command Input Prompt */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800">
        <form onSubmit={handleExecute} className="flex items-center space-x-2">
          <span className="text-emerald-400 font-bold">visitor@rivera-cli:~$</span>
          <input
            type="text"
            value={cliInput}
            onChange={(e) => setCliInput(e.target.value)}
            placeholder="Type 'help', 'whoami', 'hire', or 'clear'..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none text-xs font-mono"
          />
          <button
            type="submit"
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick click chips */}
        <div className="flex items-center space-x-1.5 mt-2 pt-2 border-t border-slate-800/50">
          <span className="text-[10px] text-slate-500">Quick run:</span>
          {['whoami', 'skills', 'hire', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runSampleCommand(cmd)}
              className="px-2 py-0.5 text-[10px] text-slate-400 bg-slate-800/80 hover:bg-slate-700 hover:text-slate-200 rounded border border-slate-700/50 transition-colors cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
