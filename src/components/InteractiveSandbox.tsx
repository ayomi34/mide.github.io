import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Cpu, 
  Activity, 
  Sliders, 
  Check, 
  Copy, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Database, 
  Server,
  CloudLightning,
  Sparkles
} from 'lucide-react';
import { ThemeColor } from '../types/portfolio';
import { colorThemeMap } from '../data/portfolioData';

interface InteractiveSandboxProps {
  activeTheme: ThemeColor;
}

export const InteractiveSandbox: React.FC<InteractiveSandboxProps> = ({ activeTheme }) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'topology' | 'tokens'>('ai');
  const currentTheme = colorThemeMap[activeTheme] || colorThemeMap.indigo;

  // --- TAB 1: AI Stream Simulator State ---
  const [promptTemplate, setPromptTemplate] = useState<'sql' | 'fastapi' | 'agent'>('fastapi');
  const [temperature, setTemperature] = useState(0.7);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [tokensPerSec, setTokensPerSec] = useState(0);
  const [timeToFirstToken, setTimeToFirstToken] = useState(135);
  const streamIntervalRef = useRef<number | null>(null);

  const sampleOutputs: Record<string, string> = {
    fastapi: `@app.post("/v1/chat/completions")
async def generate_completion(request: ChatRequest):
    # Verify cached semantic embeddings in Redis
    cached = await redis_client.get(request.prompt_hash)
    if cached:
        return Response(cached, media_type="text/event-stream")

    # Dispatch to pooled vLLM inference worker
    async def token_generator():
        async for chunk in vllm_engine.stream(request.messages):
            yield f"data: {chunk.json()}\\n\\n"

    return StreamingResponse(token_generator(), media_type="text/event-stream")`,

    sql: `-- High-Performance Window Function for Telemetry Ingestion
WITH RankedEvents AS (
  SELECT 
    user_id,
    event_type,
    created_at,
    latency_ms,
    ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY created_at DESC) as rank
  FROM telemetry_events
  WHERE created_at >= NOW() - INTERVAL '1 hour'
)
SELECT * FROM RankedEvents WHERE rank <= 5;`,

    agent: `// OmniSyn Multi-Agent Plan Resolution
export async function executePlan(goal: AgentGoal) {
  const context = await vectorStore.similaritySearch(goal.query, { k: 4 });
  const subtasks = await plannerLLM.decompose(goal, context);

  return Promise.all(
    subtasks.map(task => workerPool.assign(task, { timeoutMs: 4000 }))
  );
}`,
  };

  const startStream = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setStreamedText('');
    setTimeToFirstToken(Math.floor(Math.random() * 40) + 110);
    setTokensPerSec(Math.floor(Math.random() * 20) + 85);

    const fullText = sampleOutputs[promptTemplate];
    let index = 0;

    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

    streamIntervalRef.current = window.setInterval(() => {
      index += 3;
      setStreamedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
        setIsStreaming(false);
      }
    }, 28);
  };

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  // --- TAB 2: Topology Simulator State ---
  const [trafficSpike, setTrafficSpike] = useState(false);
  const [nodes, setNodes] = useState<{ id: string; name: string; type: string; status: 'healthy' | 'degraded' | 'rerouting'; rps: number }[]>([
    { id: 'gateway', name: 'API Gateway (Envoy)', type: 'edge', status: 'healthy', rps: 1200 },
    { id: 'auth', name: 'Auth & JWT Service', type: 'service', status: 'healthy', rps: 950 },
    { id: 'worker1', name: 'Worker Cluster A', type: 'compute', status: 'healthy', rps: 3400 },
    { id: 'worker2', name: 'Worker Cluster B (Failover)', type: 'compute', status: 'healthy', rps: 800 },
    { id: 'redis', name: 'Redis Cache (Cluster)', type: 'cache', status: 'healthy', rps: 8200 },
    { id: 'postgres', name: 'PostgreSQL Primary', type: 'db', status: 'healthy', rps: 1850 },
  ]);

  const toggleNodeHealth = (id: string) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextStatus = n.status === 'healthy' ? 'degraded' : 'healthy';
          return { ...n, status: nextStatus };
        }
        return n;
      })
    );
  };

  const triggerSpike = () => {
    setTrafficSpike(true);
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        rps: n.rps * 3.5,
      }))
    );
    setTimeout(() => {
      setTrafficSpike(false);
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          rps: Math.round(n.rps / 3.5),
        }))
      );
    }, 4500);
  };

  // --- TAB 3: Design Tokens State ---
  const [radius, setRadius] = useState(16);
  const [primaryHue, setPrimaryHue] = useState(245);
  const [copiedTokens, setCopiedTokens] = useState(false);

  const tokenSnippet = `// tailwind.config.js - Custom Dynamic Theme
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'brand': '${radius}px',
      },
      colors: {
        brand: {
          500: 'hsl(${primaryHue}, 85%, 60%)',
          600: 'hsl(${primaryHue}, 85%, 52%)',
        }
      }
    }
  }
};`;

  const copyTokens = () => {
    navigator.clipboard.writeText(tokenSnippet);
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  return (
    <section id="sandbox" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVE INTERACTIVE PLAYGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineering Sandbox
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Interact with live simulated systems right in your browser. Demonstrating token streaming, resilient topologies, and reactive token styling.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'ai'
                  ? `${currentTheme.primary} shadow-sm`
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>AI Token Stream Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('topology')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'topology'
                  ? `${currentTheme.primary} shadow-sm`
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Microservices Failover Visualizer</span>
            </button>

            <button
              onClick={() => setActiveTab('tokens')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'tokens'
                  ? `${currentTheme.primary} shadow-sm`
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Design Token Generator</span>
            </button>
          </div>
        </div>

        {/* TAB 1: AI Stream Simulator */}
        {activeTab === 'ai' && (
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Controls Column */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CloudLightning className="w-5 h-5 text-indigo-400" />
                    Token Streaming & Latency
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Simulates Server-Sent Events (SSE) token buffering and backpressure handling.
                  </p>
                </div>

                {/* Prompt Template Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">Prompt Blueprint</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'fastapi', label: 'FastAPI Stream' },
                      { id: 'sql', label: 'SQL Index' },
                      { id: 'agent', label: 'Multi-Agent' },
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => {
                          setPromptTemplate(tpl.id as any);
                          setStreamedText('');
                        }}
                        className={`py-2 px-1 text-xs font-medium rounded-xl border transition-all text-center ${
                          promptTemplate === tpl.id
                            ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50'
                            : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Temperature Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Temperature:</span>
                    <span className="text-indigo-400 font-bold">{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Deterministic</span>
                    <span>Creative</span>
                  </div>
                </div>

                {/* Metrics Readout */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[11px]">TTFT (p95):</span>
                    <p className="text-base font-bold text-emerald-400">{timeToFirstToken} ms</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Throughput:</span>
                    <p className="text-base font-bold text-indigo-400">{tokensPerSec || 94} tps</p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={startStream}
                  disabled={isStreaming}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    isStreaming
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                      : `${currentTheme.primary} shadow-lg shadow-indigo-950/30`
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>{isStreaming ? 'Streaming Tokens...' : 'Execute Stream Simulation'}</span>
                </button>
              </div>

              {/* Live Output Preview */}
              <div className="lg:col-span-8">
                <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px]">event: message | stream: chunk</span>
                    </div>
                    <span className="text-[10px] text-slate-500">SSE / 200 OK</span>
                  </div>
                  <div className="p-5 min-h-[320px] max-h-[380px] overflow-y-auto bg-slate-950 text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {streamedText ? (
                      <code>{streamedText}</code>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-500 py-16">
                        <Zap className="w-8 h-8 mb-2 text-slate-600 animate-bounce" />
                        <p>Click "Execute Stream Simulation" to run live token synthesis.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: Topology Visualizer */}
        {activeTab === 'topology' && (
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl animate-fadeIn space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  Distributed Service Health & Failover
                </h3>
                <p className="text-xs text-slate-400">
                  Click any node to toggle healthy/degraded status, or simulate a 10,000 RPS traffic surge.
                </p>
              </div>

              <button
                onClick={triggerSpike}
                disabled={trafficSpike}
                className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>{trafficSpike ? 'Surge in progress (10k RPS)...' : 'Simulate 10k Traffic Spike'}</span>
              </button>
            </div>

            {/* Nodes Visual Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => toggleNodeHealth(node.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    node.status === 'healthy'
                      ? 'bg-slate-950/70 border-slate-800 hover:border-emerald-500/40'
                      : 'bg-red-950/20 border-red-500/40 text-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {node.type === 'edge' && <Zap className="w-4 h-4 text-indigo-400" />}
                      {node.type === 'service' && <ShieldCheck className="w-4 h-4 text-cyan-400" />}
                      {node.type === 'compute' && <Server className="w-4 h-4 text-purple-400" />}
                      {node.type === 'cache' && <Activity className="w-4 h-4 text-amber-400" />}
                      {node.type === 'db' && <Database className="w-4 h-4 text-emerald-400" />}
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        node.status === 'healthy'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                      }`}
                    >
                      {node.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{node.name}</h4>
                  
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
                    <span>Load:</span>
                    <span className="font-bold text-white">{node.rps.toLocaleString()} RPS</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
              <span>💡 High-availability setup: Degraded nodes automatically trigger circuit-breakers and failover routing.</span>
              <button
                onClick={() =>
                  setNodes((prev) => prev.map((n) => ({ ...n, status: 'healthy', rps: 1200 })))
                }
                className="flex items-center space-x-1 text-indigo-400 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Nodes</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Design Token Generator */}
        {activeTab === 'tokens' && (
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Token Adjusters */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-indigo-400" />
                    Harmonic Theme Engine
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Dynamically calculate accessible brand tokens and export for Tailwind CSS.
                  </p>
                </div>

                {/* Primary Hue */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Primary Hue:</span>
                    <span className="text-white font-bold">{primaryHue}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={primaryHue}
                    onChange={(e) => setPrimaryHue(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800"
                  />
                </div>

                {/* Radius */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Border Radius:</span>
                    <span className="text-white font-bold">{radius}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    value={radius}
                    onChange={(e) => setRadius(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800"
                  />
                </div>

                {/* Live Preview Button */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <p className="text-[11px] font-mono text-slate-400">Live Component Preview:</p>
                  <button
                    style={{
                      backgroundColor: `hsl(${primaryHue}, 85%, 55%)`,
                      borderRadius: `${radius}px`,
                    }}
                    className="w-full py-3 px-4 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                  >
                    Custom Dynamic Action Button
                  </button>
                </div>
              </div>

              {/* Code Export Box */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                    <span className="text-slate-400 text-[11px]">tailwind.theme.config.js</span>
                    <button
                      onClick={copyTokens}
                      className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedTokens ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{copiedTokens ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-5 text-indigo-300 overflow-x-auto">
                    <code>{tokenSnippet}</code>
                  </pre>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
