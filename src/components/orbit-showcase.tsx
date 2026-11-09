'use client';

import React, { useState, useEffect, useRef, createContext, use, useCallback, useLayoutEffect, useSyncExternalStore } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import {
  Activity,
  ShieldCheck,
  Check,
  Play,
  Cloud,
  Brain,
  BrainCircuit,
  CodeXml,
  Network,
  ChartNoAxesCombined,
  Database,
  Cuboid,
  ArrowUpRight,
  ArrowRight,
  RefreshCw,
  Sparkles,
  GitBranch,
  Send,
  Lock,
  Box,
  Sliders,
  X,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// CONSTANTS & GEOMETRY
// ============================================================================
const STAGE = { width: 1240, height: 860 };
const CARD = { width: 356, height: 232 };
const GAP = 18;
const RADIUS = { x: 440, y: 250 };

const columnsOf = (count: number) => (count === 4 ? 2 : 3);
const rowLength = (count: number, columns: number, row: number) =>
  Math.min(columns, count - row * columns);

const LAST_ROW_START = ['', 'md:col-start-3', 'md:col-start-2'];

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (t: number) => Math.min(1, Math.max(0, t));
const round = (value: number, digits: number) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

function subscribeToWide(callback: () => void) {
  const query = window.matchMedia('(min-width: 768px)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function useWide() {
  return useSyncExternalStore(
    subscribeToWide,
    () => window.matchMedia('(min-width: 768px)').matches,
    () => true,
  );
}

function useStageScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () =>
      setScale(
        Math.min(
          1,
          window.innerWidth / STAGE.width,
          (window.innerHeight - 80) / STAGE.height,
        ),
      );
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return scale;
}

const OnScreenContext = createContext(true);
const ActiveLogoContext = createContext<{
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);
const ExploreCardContext = createContext<{
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

// ============================================================================
// TITLE-RELATED INTERACTIVE VIGNETTES (APPLE HIG & FLUID INTERFACE SPEC)
// ============================================================================

// 1. Salesforce Ecosystem Vignette
function SalesforceEcosystemVignette({ isHovered }: { isHovered: boolean }) {
  const [activeCloud, setActiveCloud] = useState<'sales' | 'service' | 'agentforce'>('agentforce');
  const [syncing, setSyncing] = useState(false);
  const [syncedCount, setSyncedCount] = useState(14820);

  const clouds = [
    { id: 'sales', label: 'Sales', stat: '$4.8M', metric: 'Pipeline' },
    { id: 'service', label: 'Service', stat: '99.8%', metric: 'SLA Speed' },
    { id: 'agentforce', label: 'Agentforce', stat: '28 Active', metric: 'AI Agents' },
  ] as const;

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveCloud((prev) =>
        prev === 'sales' ? 'service' : prev === 'service' ? 'agentforce' : 'sales'
      );
    }, 3200);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleSync = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (syncing) return;
    setSyncing(true);
    setTimeout(() => {
      setSyncedCount((c) => c + 14);
      setSyncing(false);
    }, 850);
  };

  const current = clouds.find((c) => c.id === activeCloud)!;

  return (
    <div className="flex h-full w-full flex-col justify-between p-1.5 select-none font-sans">
      {/* Apple-style Segmented Control */}
      <div className="flex items-center justify-between rounded-xl bg-black/40 p-1 border border-white/[0.06] shadow-inner">
        {clouds.map((cloud) => {
          const isActive = activeCloud === cloud.id;
          return (
            <button
              key={cloud.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveCloud(cloud.id);
              }}
              className={cn(
                'relative flex-1 py-1 text-[11px] font-medium transition-all duration-200 rounded-lg text-center cursor-pointer active:scale-[0.96]',
                isActive
                  ? 'text-white font-semibold bg-white/[0.14] shadow-[0_1px_3px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2)] border border-white/10'
                  : 'text-neutral-400 hover:text-neutral-200'
              )}
            >
              {cloud.label}
            </button>
          );
        })}
      </div>

      {/* Main Metric & Live Flow */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium tracking-wide uppercase text-neutral-400">
            {current.metric}
          </span>
          <span className="text-[15px] font-semibold text-white font-mono tracking-tight flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            {current.stat}
          </span>
        </div>

        {/* Sync Trigger Button */}
        <button
          type="button"
          onClick={handleSync}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all duration-150 cursor-pointer active:scale-[0.94]',
            syncing
              ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
              : 'bg-white/[0.08] text-neutral-200 border-white/10 hover:bg-white/[0.14] hover:text-white shadow-sm'
          )}
        >
          <RefreshCw className={cn('size-3', syncing && 'animate-spin text-cyan-400')} />
          <span>{syncing ? 'Syncing...' : 'Sync CRM'}</span>
        </button>
      </div>

      {/* Micro-telemetry footer */}
      <div className="flex items-center justify-between px-1 text-[9.5px] font-medium text-neutral-400 tracking-tight">
        <span className="flex items-center gap-1.5">
          <Cloud className="size-3 text-cyan-400/90" />
          <span>{syncedCount.toLocaleString()} records synced</span>
        </span>
        <span className="text-neutral-500 font-mono">12ms</span>
      </div>
    </div>
  );
}

// 2. Autonomous Intelligence Vignette
function AutonomousIntelligenceVignette({ isHovered }: { isHovered: boolean }) {
  const [step, setStep] = useState(1);
  const [confidence, setConfidence] = useState(97);

  const steps = [
    { label: 'Perceive', detail: 'Inputs' },
    { label: 'Reason', detail: 'Chain' },
    { label: 'Execute', detail: 'Action' },
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovered]);

  const advanceStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStep((prev) => (prev + 1) % 3);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between p-1.5 select-none font-sans">
      {/* 3-Step Reasoning Cycle */}
      <div className="grid grid-cols-3 gap-1.5 relative">
        {steps.map((s, idx) => {
          const isActive = step === idx;
          return (
            <button
              key={s.label}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setStep(idx);
              }}
              className={cn(
                'relative flex flex-col items-center py-1.5 px-1 rounded-xl border text-center transition-all duration-200 cursor-pointer active:scale-[0.95]',
                isActive
                  ? 'bg-white/[0.14] border-white/20 text-white shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2)]'
                  : 'bg-white/[0.02] border-white/[0.05] text-neutral-400 hover:text-neutral-200 hover:border-white/10'
              )}
            >
              <span className="text-[11px] font-semibold tracking-tight">{s.label}</span>
              <span className="text-[9px] text-neutral-400 truncate max-w-full">
                {s.detail}
              </span>
              {isActive && (
                <motion.span
                  layoutId="agent-active-pill"
                  className="absolute -bottom-1 size-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Confidence Slider & Step Trigger */}
      <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-auto">
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px] font-medium">
            <span className="text-neutral-400">Certainty</span>
            <span className="text-emerald-400 font-mono font-semibold">{confidence}%</span>
          </div>
          <div
            className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden cursor-pointer p-0.5"
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
              setConfidence(Math.max(80, Math.min(99, pct)));
            }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"
              animate={{ width: `${confidence}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={advanceStep}
          className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/10 text-[10.5px] font-medium transition-all active:scale-[0.94] cursor-pointer shadow-sm"
        >
          <Play className="size-2.5 fill-current" />
          <span>Step</span>
        </button>
      </div>

      {/* Telemetry footer */}
      <div className="flex items-center justify-between px-1 text-[9.5px] font-medium text-neutral-400">
        <span className="flex items-center gap-1.5">
          <Brain className="size-3 text-neutral-300" />
          <span>Loop: active</span>
        </span>
        <span className="text-emerald-400 font-mono text-[9px] bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
          Autonomous
        </span>
      </div>
    </div>
  );
}

// 3. Cognitive AI System Vignette
function CognitiveAISystemVignette({ isHovered }: { isHovered: boolean }) {
  const [mode, setMode] = useState<'rag' | 'neural' | 'vector'>('rag');
  const [tokens, setTokens] = useState(128);
  const [querying, setQuerying] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setMode((prev) => (prev === 'rag' ? 'neural' : prev === 'neural' ? 'vector' : 'rag'));
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleQuery = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (querying) return;
    setQuerying(true);
    setTimeout(() => setQuerying(false), 800);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between p-1.5 select-none font-sans">
      {/* Mode Segmented Controls */}
      <div className="flex p-1 rounded-xl bg-black/40 border border-white/[0.06] shadow-inner">
        {(['rag', 'neural', 'vector'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMode(m);
            }}
            className={cn(
              'flex-1 py-1 text-[10.5px] font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 text-center cursor-pointer active:scale-[0.96]',
              mode === m
                ? 'bg-white/[0.14] text-white shadow-[0_1px_3px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2)] border border-white/10'
                : 'text-neutral-400 hover:text-neutral-200'
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Context Window Scrubber & Query Trigger */}
      <div className="flex flex-col gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-auto">
        <div className="flex items-center justify-between text-[10px] font-medium">
          <span className="text-neutral-400">Context Window</span>
          <span className="text-violet-300 font-mono font-semibold">{tokens}k tokens</span>
        </div>
        <div
          className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden cursor-pointer p-0.5"
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
            const val = pct < 33 ? 64 : pct < 66 ? 128 : 256;
            setTokens(val);
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-300 rounded-full shadow-[0_0_8px_rgba(167,139,250,0.5)]"
            animate={{ width: `${(tokens / 256) * 100}%` }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          />
        </div>
      </div>

      {/* Query button & telemetry */}
      <div className="flex items-center justify-between px-1 text-[9.5px]">
        <button
          type="button"
          onClick={handleQuery}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-150 text-[10.5px] font-medium cursor-pointer active:scale-[0.94]',
            querying
              ? 'bg-violet-500/20 text-violet-200 border-violet-500/40 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
              : 'bg-white/[0.08] text-neutral-200 border-white/10 hover:bg-white/[0.14] hover:text-white shadow-sm'
          )}
        >
          <Sparkles className={cn('size-3', querying && 'animate-spin text-violet-300')} />
          <span>{querying ? 'Cosine: 0.98' : 'Semantic Query'}</span>
        </button>
        <span className="text-neutral-400 font-mono text-[9px]">4 / 4 Chunks</span>
      </div>
    </div>
  );
}

// 4. Digital Product Engineering Vignette
function DigitalProductEngineeringVignette({ isHovered }: { isHovered: boolean }) {
  const [branch, setBranch] = useState<'main' | 'preview'>('main');
  const [deployState, setDeployState] = useState<'idle' | 'building' | 'deployed'>('idle');

  const triggerDeploy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (deployState !== 'idle') return;
    setDeployState('building');
    setTimeout(() => {
      setDeployState('deployed');
      setTimeout(() => setDeployState('idle'), 2200);
    }, 1000);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between p-1.5 select-none font-sans">
      {/* Branch selector & Terminal status */}
      <div className="flex items-center justify-between rounded-xl bg-black/40 p-1 border border-white/[0.06] shadow-inner">
        <div className="flex items-center gap-1 px-1">
          <GitBranch className="size-3 text-neutral-400 mr-1" />
          {(['main', 'preview'] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setBranch(b);
              }}
              className={cn(
                'px-2 py-0.5 text-[10px] font-medium rounded-md transition-all duration-200 cursor-pointer active:scale-[0.96]',
                branch === b
                  ? 'bg-white/[0.14] text-white font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2)] border border-white/10'
                  : 'text-neutral-400 hover:text-neutral-200'
              )}
            >
              {b}
            </button>
          ))}
        </div>
        <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 mr-1">
          Edge 2.4
        </span>
      </div>

      {/* Terminal prompt snippet & Deploy action */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-auto">
        <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-neutral-200 truncate">
          <span className="text-emerald-400">$</span>
          <span>pnpm build</span>
          <span className="animate-pulse text-neutral-500">_</span>
        </div>

        <button
          type="button"
          onClick={triggerDeploy}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-medium border transition-all duration-150 shrink-0 cursor-pointer active:scale-[0.94]',
            deployState === 'deployed'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
              : deployState === 'building'
              ? 'bg-white/[0.12] text-neutral-200 border-white/20'
              : 'bg-white/[0.08] text-neutral-200 border-white/10 hover:bg-white/[0.14] hover:text-white shadow-sm'
          )}
        >
          {deployState === 'building' ? (
            <div className="size-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : deployState === 'deployed' ? (
            <Check className="size-3 text-emerald-400" />
          ) : (
            <Play className="size-2.5 fill-current" />
          )}
          <span>{deployState === 'building' ? 'Building' : deployState === 'deployed' ? 'Deployed' : 'Deploy'}</span>
        </button>
      </div>

      {/* Telemetry footer */}
      <div className="flex items-center justify-between px-1 text-[9.5px] font-medium text-neutral-400">
        <span>Latency: 14ms</span>
        <span className="text-emerald-400 font-mono text-[9px]">0 test failures</span>
      </div>
    </div>
  );
}

// 5. Connected Operations Vignette
function ConnectedOperationsVignette({ isHovered }: { isHovered: boolean }) {
  const [packetKey, setPacketKey] = useState(0);
  const [eventCount, setEventCount] = useState(1420);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setPacketKey((k) => k + 1);
      setEventCount((c) => c + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const dispatchEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPacketKey((k) => k + 1);
    setEventCount((c) => c + 1);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between p-1.5 select-none font-sans">
      {/* Node Route Pipeline */}
      <div className="relative flex items-center justify-between px-4 py-2 rounded-xl bg-black/40 border border-white/[0.06] shadow-inner">
        <div className="flex flex-col items-center z-10">
          <div className="px-2 py-0.5 rounded-md bg-white/[0.08] border border-white/15 text-[10px] font-semibold text-white shadow-sm">
            Slack
          </div>
        </div>

        <div className="relative flex-1 mx-3 h-0.5 bg-neutral-800 rounded-full">
          <motion.div
            key={packetKey}
            initial={{ left: '0%', opacity: 1, scale: 1.2 }}
            animate={{ left: '100%', opacity: [1, 1, 0] }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-1 size-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
          />
        </div>

        <div className="flex flex-col items-center z-10">
          <div className="px-2 py-0.5 rounded-md bg-white/[0.08] border border-white/15 text-[10px] font-semibold text-white shadow-sm">
            CRM
          </div>
        </div>
      </div>

      {/* Trigger & Event Stats */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-auto">
        <span className="text-[10.5px] font-medium text-neutral-300">
          Events: <span className="text-cyan-400 font-mono font-semibold">{eventCount.toLocaleString()}/s</span>
        </span>
        <button
          type="button"
          onClick={dispatchEvent}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-neutral-200 hover:text-white border border-white/10 text-[10.5px] font-medium transition-all active:scale-[0.94] cursor-pointer shadow-sm"
        >
          <Send className="size-2.5" />
          <span>Dispatch</span>
        </button>
      </div>

      {/* Telemetry footer */}
      <div className="flex items-center justify-between px-1 text-[9.5px] font-medium text-neutral-400">
        <span>Webhook: ACK 200</span>
        <span className="text-emerald-400 font-mono text-[9px] bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
          Zero drop
        </span>
      </div>
    </div>
  );
}

// 6. Decision Intelligence Vignette
function DecisionIntelligenceVignette({ isHovered }: { isHovered: boolean }) {
  const [range, setRange] = useState<'1D' | '1W' | '1M'>('1W');
  const [activeBar, setActiveBar] = useState<number | null>(null);

  const dataMap = {
    '1D': [35, 60, 45, 80, 65, 90, 75],
    '1W': [40, 55, 70, 85, 60, 95, 80],
    '1M': [50, 65, 80, 70, 88, 92, 100],
  };

  const values = dataMap[range];

  return (
    <div className="flex h-full w-full flex-col justify-between p-1.5 select-none font-sans">
      {/* KPI header & range tabs */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-white tracking-tight font-mono">$2.84M</span>
          <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
            +24.6%
          </span>
        </div>
        <div className="flex rounded-lg bg-black/40 p-0.5 border border-white/[0.06] shadow-inner">
          {(['1D', '1W', '1M'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setRange(r);
              }}
              className={cn(
                'px-2 py-0.5 text-[10px] font-medium rounded-md transition-all duration-200 cursor-pointer active:scale-[0.96]',
                range === r
                  ? 'bg-white/[0.14] text-white font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2)] border border-white/10'
                  : 'text-neutral-400 hover:text-neutral-200'
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-12 px-3 py-1.5 bg-white/[0.03] rounded-xl border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-auto">
        {values.map((v, i) => {
          const isSelected = activeBar === i;
          return (
            <div
              key={i}
              className="relative flex-1 flex flex-col items-center h-full justify-end cursor-pointer"
              onMouseEnter={() => setActiveBar(i)}
              onMouseLeave={() => setActiveBar(null)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveBar(i);
              }}
            >
              {isSelected && (
                <div className="absolute -top-6 text-[9px] font-mono bg-[#1c1c20] border border-white/20 px-1.5 py-0.5 rounded-md text-white shadow-lg z-20 pointer-events-none whitespace-nowrap">
                  {v}%
                </div>
              )}
              <motion.div
                className={cn(
                  'w-full rounded-t-md transition-colors duration-150',
                  isSelected
                    ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                    : 'bg-white/20 hover:bg-white/35'
                )}
                animate={{ height: `${v}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            </div>
          );
        })}
      </div>

      {/* Telemetry footer */}
      <div className="flex items-center justify-between px-1 text-[9.5px] font-medium text-neutral-400">
        <span>Tableau live feed</span>
        <span className="text-neutral-300 font-mono text-[9px]">Target: 100%</span>
      </div>
    </div>
  );
}

// 7. Cybersecurity Engineering Vignette
function CybersecurityEngineeringVignette({ isHovered }: { isHovered: boolean }) {
  const [scanning, setScanning] = useState(false);

  const handleScan = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scanning) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 1000);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between p-1.5 select-none font-sans">
      {/* Zero Trust Status Banner */}
      <div className="flex items-center justify-between px-3 py-1 rounded-xl bg-black/40 border border-white/[0.06] shadow-inner">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-emerald-400" />
          <span className="text-[10.5px] font-medium text-neutral-200">Zero Trust Shield</span>
        </div>
        <span className="text-[9.5px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          Enforced
        </span>
      </div>

      {/* Verification ring & Scan Button */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-auto">
        <div className="flex flex-col">
          <span className="text-[9.5px] font-medium uppercase text-neutral-400">Cryptographic Auth</span>
          <span className="text-[11px] font-mono text-white flex items-center gap-1 mt-0.5">
            <Lock className="size-2.5 text-neutral-300" />
            <span>JWT: 0x8f...21c</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleScan}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-medium border transition-all duration-150 cursor-pointer active:scale-[0.94]',
            scanning
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
              : 'bg-white/[0.08] text-neutral-200 border-white/10 hover:bg-white/[0.14] hover:text-white shadow-sm'
          )}
        >
          <Activity className={cn('size-3', scanning && 'animate-spin text-emerald-400')} />
          <span>{scanning ? 'Scanning...' : 'Verify Hash'}</span>
        </button>
      </div>

      {/* Telemetry footer */}
      <div className="flex items-center justify-between px-1 text-[9.5px] font-medium text-neutral-400">
        <span className="font-mono">AES-256-GCM</span>
        <span className="text-emerald-400 font-mono text-[9px]">0 Threats Detected</span>
      </div>
    </div>
  );
}

// 8. Data Platform Engineering Vignette
function DataPlatformEngineeringVignette({ isHovered }: { isHovered: boolean }) {
  const [pipelineState, setPipelineState] = useState<'Ingest' | 'Delta' | 'Warehouse'>('Delta');
  const [throughput, setThroughput] = useState(1.8);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setPipelineState((prev) => (prev === 'Ingest' ? 'Delta' : prev === 'Delta' ? 'Warehouse' : 'Ingest'));
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleStream = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStreaming(true);
    setThroughput((prev) => +(prev + 0.2).toFixed(1));
    setTimeout(() => setStreaming(false), 800);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between p-1.5 select-none font-sans">
      {/* Lakehouse Stages */}
      <div className="flex p-1 rounded-xl bg-black/40 border border-white/[0.06] shadow-inner">
        {(['Ingest', 'Delta', 'Warehouse'] as const).map((stage) => (
          <button
            key={stage}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPipelineState(stage);
            }}
            className={cn(
              'flex-1 py-1 text-[10.5px] font-medium rounded-lg transition-all duration-200 text-center cursor-pointer active:scale-[0.96]',
              pipelineState === stage
                ? 'bg-white/[0.14] text-white font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2)] border border-white/10'
                : 'text-neutral-400 hover:text-neutral-200'
            )}
          >
            {stage}
          </button>
        ))}
      </div>

      {/* Throughput & Stream trigger */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-auto">
        <div className="flex flex-col">
          <span className="text-[9.5px] font-medium uppercase text-neutral-400">Throughput Rate</span>
          <span className="text-[14px] font-mono text-white font-semibold">
            {throughput}M <span className="text-neutral-400 text-[10px] font-normal">rows/sec</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleStream}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-medium border transition-all duration-150 cursor-pointer active:scale-[0.94]',
            streaming
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
              : 'bg-white/[0.08] text-neutral-200 border-white/10 hover:bg-white/[0.14] hover:text-white shadow-sm'
          )}
        >
          <Database className={cn('size-3', streaming && 'animate-pulse text-amber-400')} />
          <span>{streaming ? 'Pumping...' : 'Stream Rows'}</span>
        </button>
      </div>

      {/* Telemetry footer */}
      <div className="flex items-center justify-between px-1 text-[9.5px] font-medium text-neutral-400">
        <span>Databricks & Snowflake</span>
        <span className="text-neutral-300 font-mono text-[9px]">Sync: 4ms</span>
      </div>
    </div>
  );
}

// 9. Digital Twin Systems Vignette
function DigitalTwinSystemsVignette({ isHovered }: { isHovered: boolean }) {
  const [load, setLoad] = useState(42);
  const [calibrating, setCalibrating] = useState(false);

  const handleCalibrate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calibrating) return;
    setCalibrating(true);
    setTimeout(() => setCalibrating(false), 900);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between p-1.5 select-none font-sans">
      {/* Sensor readings header */}
      <div className="flex items-center justify-between px-3 py-1 rounded-xl bg-black/40 border border-white/[0.06] shadow-inner">
        <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-neutral-200">
          <Box className="size-3 text-neutral-400" />
          <span>Physical Twin</span>
        </div>
        <span className="text-[9.5px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
          38.4°C Optimal
        </span>
      </div>

      {/* Simulated Load Scrubber & Calibrate */}
      <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-auto">
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px] font-medium">
            <span className="text-neutral-400">Dynamic Load</span>
            <span className="text-neutral-200 font-mono font-semibold">{load}%</span>
          </div>
          <div
            className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden cursor-pointer p-0.5"
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
              setLoad(Math.max(10, Math.min(95, pct)));
            }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              animate={{ width: `${load}%` }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleCalibrate}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-medium border transition-all duration-150 shrink-0 cursor-pointer active:scale-[0.94]',
            calibrating
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
              : 'bg-white/[0.08] text-neutral-200 border-white/10 hover:bg-white/[0.14] hover:text-white shadow-sm'
          )}
        >
          <Sliders className={cn('size-3', calibrating && 'animate-spin text-cyan-400')} />
          <span>{calibrating ? 'Syncing...' : 'Calibrate'}</span>
        </button>
      </div>

      {/* Telemetry footer */}
      <div className="flex items-center justify-between px-1 text-[9.5px] font-medium text-neutral-400">
        <span>Telemetry: 60Hz</span>
        <span className="text-emerald-400 font-mono text-[9px]">0.02g drift</span>
      </div>
    </div>
  );
}

// ============================================================================
// CARDS REGISTRY & ENTERPRISE BUSINESS VALUES
// ============================================================================
export interface BusinessValueMetric {
  label: string;
  value: string;
  sublabel: string;
  trend: string;
  trendPositive?: boolean;
}

export interface CapabilityPillar {
  title: string;
  impact: string;
  tech: string[];
}

export interface BusinessValues {
  category: string;
  tagline: string;
  headline: string;
  summary: string;
  metrics: [BusinessValueMetric, BusinessValueMetric, BusinessValueMetric];
  pillars: CapabilityPillar[];
}

interface CardMeta {
  id: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  renderVignette: (isHovered: boolean) => React.ReactNode;
  offerings: { name: string; description: string }[];
  highlight?: string;
  businessValues: BusinessValues;
}

const CARDS: CardMeta[] = [
  {
    id: 'switch',
    badge: 'Salesforce Ecosystem',
    icon: Cloud,
    title: 'Autonomic Gate',
    renderVignette: (hovered) => <SalesforceEcosystemVignette isHovered={hovered} />,
    offerings: [
      { name: 'Sales Cloud', description: 'Pipeline optimization, sales automation, revenue intelligence' },
      { name: 'Service Cloud', description: 'Omnichannel support, case automation, AI-powered service' },
      { name: 'Marketing Cloud', description: 'Personalized campaigns, marketing automation, campaign intelligence' },
      { name: 'Commerce Cloud', description: 'Digital commerce experiences, conversion optimization, unified commerce operations' },
    ],
    highlight: 'Agentforce — AI agents across every cloud',
    businessValues: {
      category: 'Enterprise CRM & Agentic Clouds',
      tagline: 'Unified Revenue Architecture',
      headline: 'Capitalize on Every Enterprise Customer Interaction',
      summary:
        'Transform disjointed CRM instances into an autonomous revenue engine. We architect and implement unified Salesforce multi-cloud ecosystems (Sales, Service, Marketing, Commerce, Data Cloud) integrated with Agentforce to slash deal cycle times, streamline customer journeys, and unlock predictable enterprise growth.',
      metrics: [
        { label: 'Pipeline Velocity', value: '+42%', sublabel: 'Average deal cycle acceleration', trend: '+42%', trendPositive: true },
        { label: 'Case Deflection', value: '68%', sublabel: 'Autonomous Agentforce tier-1 resolution', trend: '68%', trendPositive: true },
        { label: 'Data Unification', value: '99.9%', sublabel: 'Cross-cloud customer graph fidelity', trend: '99.9%', trendPositive: true },
      ],
      pillars: [
        {
          title: 'Agentforce & Autonomous Teammates',
          impact: 'Deploy 24/7 autonomous agents handling tier-1 inquiries, quote modifications, and scheduling natively within CRM.',
          tech: ['Agentforce', 'Atlas Reasoning', 'Prompt Studio'],
        },
        {
          title: 'Multi-Cloud Synchronization',
          impact: 'Consolidate Sales, Service, and Marketing Clouds into an unbroken, real-time customer journey graph.',
          tech: ['Sales Cloud', 'Service Cloud', 'Marketing Cloud'],
        },
        {
          title: 'Data Cloud Real-Time Telemetry',
          impact: 'Harmonize petabytes of enterprise telemetry into unified customer profiles for instant personalization.',
          tech: ['Data Cloud', 'Data 360', 'Zero Copy'],
        },
        {
          title: 'Governed Integrations & APIs',
          impact: 'Bi-directional zero-latency synchronization bridging ERPs, data lakes, and custom microservices.',
          tech: ['MuleSoft', 'REST / GraphQL', 'Pub/Sub API'],
        },
      ],
    },
  },
  {
    id: 'slider',
    badge: 'Autonomous Intelligence',
    icon: Brain,
    title: 'Stiffness Dynamic',
    renderVignette: (hovered) => <AutonomousIntelligenceVignette isHovered={hovered} />,
    offerings: [
      { name: 'AI Agent Development', description: 'Custom agents, tool-enabled intelligence, multi-agent systems' },
      { name: 'Intelligent Workflow Orchestration', description: 'Autonomous workflows, cross-platform orchestration, human-in-the-loop control' },
      { name: 'Enterprise AI Agents', description: 'Knowledge-driven agents, operational assistants, secure deployment' },
      { name: 'Agent Intelligence & Optimization', description: 'Evaluation, performance monitoring, continuous optimization' },
    ],
    businessValues: {
      category: 'Multi-Agent Systems & Autonomy',
      tagline: 'Self-Directing Enterprise Agents',
      headline: 'Shift From Manual Execution to Goal-Directed Autonomous Agents',
      summary:
        'Bridge the chasm between static LLMs and autonomous business operations. We build, benchmark, and orchestrate goal-directed multi-agent architectures that independently perceive inputs, reason through multi-step plans, invoke enterprise tools, and execute verified workflows with deterministic safety guardrails.',
      metrics: [
        { label: 'Workflow Autonomy', value: '84%', sublabel: 'End-to-end tasks executed without human touch', trend: '84%', trendPositive: true },
        { label: 'Cycle Time Reduction', value: '12x', sublabel: 'Faster complex task completion', trend: '12x', trendPositive: true },
        { label: 'Execution Accuracy', value: '99.4%', sublabel: 'Strict compliance & policy adherence', trend: '99.4%', trendPositive: true },
      ],
      pillars: [
        {
          title: 'Goal-Directed Agent Swarms',
          impact: 'Hierarchical supervisor-worker networks executing distributed computational workflows with sub-task delegation.',
          tech: ['LangGraph', 'CrewAI', 'LlamaIndex'],
        },
        {
          title: 'Deterministic Tool Calling',
          impact: 'Zero-hallucination structured API calling with runtime schema validation and automated rollback safeguards.',
          tech: ['Tool Calling', 'Pydantic AI', 'OpenAPI'],
        },
        {
          title: 'Human-in-the-Loop Safeguards',
          impact: 'Continuous policy evaluation with selective escalation gates for high-consequence business actions.',
          tech: ['Safety Guardrails', 'Approval Gates', 'Audit Trails'],
        },
        {
          title: 'Continuous Agent Optimization',
          impact: 'Automated trajectory evaluations and prompt optimization loops preventing agent drift and latency degradation.',
          tech: ['DSPy', 'LangSmith', 'Trajectory Eval'],
        },
      ],
    },
  },
  {
    id: 'tabs',
    badge: 'Cognitive AI System',
    icon: BrainCircuit,
    title: 'Shared LayoutId',
    renderVignette: (hovered) => <CognitiveAISystemVignette isHovered={hovered} />,
    offerings: [
      { name: 'Generative AI Engineering', description: 'Custom LLM solutions, domain-specific and multimodal AI' },
      { name: 'Retrieval-Augmented Generation (RAG)', description: 'Enterprise knowledge retrieval, context-aware generation, semantic search' },
      { name: 'Enterprise Knowledge Intelligence', description: 'Knowledge assistants, document intelligence, knowledge integration' },
      { name: 'AI Evaluation & Optimization', description: 'Response quality, guardrails, model optimization' },
    ],
    businessValues: {
      category: 'Generative AI & Enterprise Knowledge',
      tagline: 'Enterprise Cognitive Infrastructure',
      headline: 'Ground Generative AI in Your Private Enterprise Knowledge',
      summary:
        'Empower decision-makers with private, context-rich reasoning systems. Valoria builds production-ready RAG architectures, domain-adapted foundation models, and hybrid vector-graph knowledge retrievers that eliminate hallucinations and convert unstructured documents into instant strategic advantage.',
      metrics: [
        { label: 'Retrieval Precision', value: '98.7%', sublabel: 'Contextual accuracy across millions of documents', trend: '98.7%', trendPositive: true },
        { label: 'Query Latency', value: '<45ms', sublabel: 'P95 hybrid search and retrieval response', trend: '<45ms', trendPositive: true },
        { label: 'Search Overhead', value: '-80%', sublabel: 'Reduction in time spent locating internal intelligence', trend: '-80%', trendPositive: true },
      ],
      pillars: [
        {
          title: 'Hybrid Graph-Vector RAG',
          impact: 'Combine dense vector embeddings with knowledge graph traversals for deep structural and contextual understanding.',
          tech: ['Pinecone', 'Neo4j', 'Qdrant', 'Milvus'],
        },
        {
          title: 'Private Domain Adaptation',
          impact: 'Custom parameter-efficient fine-tuning (LoRA/QLoRA) completely isolated within your VPC boundary.',
          tech: ['vLLM', 'Ollama', 'Hugging Face', 'DeepSpeed'],
        },
        {
          title: 'Document Intelligence at Scale',
          impact: 'Extract structured tables, contracts, and filings from multi-modal documents with verified provenance.',
          tech: ['Vision Transformers', 'LayoutLM', 'Parser Pipelines'],
        },
        {
          title: 'Hallucination Defense Layer',
          impact: 'Multi-stage output verifiers and citation anchors ensuring source truth in every generated token.',
          tech: ['NeMo Guardrails', 'Ragas', 'TruLens'],
        },
      ],
    },
  },
  {
    id: 'button',
    badge: 'Digital Product Engineering',
    icon: CodeXml,
    title: 'Press Morph',
    renderVignette: (hovered) => <DigitalProductEngineeringVignette isHovered={hovered} />,
    offerings: [
      { name: 'SaaS Product Development', description: 'End-to-end engineering, multi-tenant architecture, subscription infrastructure' },
      { name: 'Full-Stack Engineering', description: 'Modern frontend, backend and API engineering, system integration' },
      { name: 'Cloud-Native Engineering', description: 'Cloud architecture, DevOps and CI/CD, performance and reliability' },
      { name: 'Product Modernization', description: 'Legacy modernization, re-engineering, AI-enabled products' },
    ],
    businessValues: {
      category: 'Full-Stack & Cloud Architecture',
      tagline: 'Resilient Product Systems',
      headline: 'Engineer High-Consequence Digital Products That Never Falter',
      summary:
        'From zero to hyperscale. We architect, build, and operate resilient SaaS platforms, cloud-native applications, and high-performance user interfaces. Built with modern micro-frontend topologies, atomic design systems, and distributed backends that effortlessly handle peak global demand.',
      metrics: [
        { label: 'Deployment Cadence', value: '45x', sublabel: 'Faster release cycles with automated CI/CD', trend: '45x', trendPositive: true },
        { label: 'Platform Availability', value: '99.99%', sublabel: 'SLA-guaranteed multi-region uptime', trend: '99.99%', trendPositive: true },
        { label: 'P99 Edge Latency', value: '<28ms', sublabel: 'Global CDN and server response time', trend: '<28ms', trendPositive: true },
      ],
      pillars: [
        {
          title: 'Cloud-Native Distributed Core',
          impact: 'Fault-tolerant microservices running on elastic Kubernetes clusters with zero single points of failure.',
          tech: ['Go', 'TypeScript', 'Kubernetes', 'Docker'],
        },
        {
          title: 'Next-Gen Frontend Systems',
          impact: 'Fluid 60fps web experiences built with Apple HIG precision, spring physics, and instant reactivity.',
          tech: ['Next.js 16', 'React 19', 'Tailwind', 'Motion'],
        },
        {
          title: 'Multi-Tenant SaaS Infrastructure',
          impact: 'Bank-grade tenant data isolation, dynamic resource quotas, and automated global billing rails.',
          tech: ['PostgreSQL', 'Stripe', 'Redis', 'Auth0'],
        },
        {
          title: 'Continuous Reliability & QA',
          impact: 'Shift-left security testing, synthetic canary deployments, and automated end-to-end test suites.',
          tech: ['Playwright', 'GitHub Actions', 'ArgoCD'],
        },
      ],
    },
  },
  {
    id: 'elastic',
    badge: 'Connected Operations',
    icon: Network,
    title: 'Elastic Momentum',
    renderVignette: (hovered) => <ConnectedOperationsVignette isHovered={hovered} />,
    offerings: [
      { name: 'Slack Ecosystems', description: 'Workspace engineering, Slack apps, workflow automation' },
      { name: 'Enterprise Integration Engineering', description: 'API and webhook integration, Salesforce–Slack integration, iPaaS and middleware' },
      { name: 'Intelligent Workflow Orchestration', description: 'Process automation, event-driven workflows, AI-driven orchestration' },
      { name: 'Enterprise Operations & Observability', description: 'Workflow monitoring, integration reliability, identity and access controls' },
    ],
    businessValues: {
      category: 'Workflow Orchestration & Ecosystems',
      tagline: 'Real-Time Event Choreography',
      headline: 'Unify Distributed Enterprise Systems Into One Living Nervous System',
      summary:
        'Break down cross-departmental silos. We engineer event-driven middleware, Slack bot ecosystems, and automated integration meshes connecting ERPs, CRMs, customer support, and operational pipelines into a unified, self-orchestrating enterprise workspace.',
      metrics: [
        { label: 'Process Throughput', value: '3.4M', sublabel: 'Daily events dispatched with zero packet loss', trend: '3.4M/d', trendPositive: true },
        { label: 'Incident Resolution', value: '-72%', sublabel: 'Faster cross-functional incident mitigation', trend: '-72%', trendPositive: true },
        { label: 'Delivery Reliability', value: '99.99%', sublabel: 'Guaranteed at-least-once message delivery', trend: '99.99%', trendPositive: true },
      ],
      pillars: [
        {
          title: 'Conversational Enterprise Bots',
          impact: 'Execute complex approvals, infrastructure rollouts, and CRM updates directly inside Slack & Teams channels.',
          tech: ['Slack Bolt SDK', 'Teams SDK', 'Socket Mode'],
        },
        {
          title: 'Event-Driven Mesh Architecture',
          impact: 'Decoupled asynchronous event brokers ensuring continuous, non-blocking data exchange.',
          tech: ['Apache Kafka', 'RabbitMQ', 'AWS EventBridge'],
        },
        {
          title: 'iPaaS & Hybrid Integrations',
          impact: 'Enterprise connectors bridging legacy on-prem databases with cloud services and SaaS APIs.',
          tech: ['MuleSoft', 'Workato', 'Custom Connectors'],
        },
        {
          title: 'End-to-End Observability',
          impact: 'Distributed tracing and anomaly detection diagnosing pipeline bottlenecks before users notice.',
          tech: ['OpenTelemetry', 'Datadog', 'Prometheus'],
        },
      ],
    },
  },
  {
    id: 'telemetry',
    badge: 'Decision Intelligence',
    icon: ChartNoAxesCombined,
    title: '60 FPS Budget',
    renderVignette: (hovered) => <DecisionIntelligenceVignette isHovered={hovered} />,
    offerings: [
      { name: 'Tableau Analytics', description: 'Interactive BI dashboards, advanced visualization, self-service analytics' },
      { name: 'Data Engineering & Integration', description: 'ETL/ELT pipelines, warehouse integration, data quality and governance' },
      { name: 'Real-Time Business Intelligence', description: 'Live monitoring, automated reporting, predictive analytics' },
      { name: 'Decision & Performance Intelligence', description: 'Executive KPIs, performance analytics, data-driven optimization' },
    ],
    businessValues: {
      category: 'Real-Time Analytics & BI',
      tagline: 'Predictive Decision Engines',
      headline: 'Transform Raw Telemetry Into Defensible Strategic Actions',
      summary:
        'Eliminate operational blindspots. We design executive-grade Tableau dashboards, predictive forecasting models, and real-time streaming analytics that equip leadership with forward-looking clarity rather than retrospective summaries.',
      metrics: [
        { label: 'Decision Velocity', value: '3.8x', sublabel: 'Faster insight-to-action implementation', trend: '3.8x', trendPositive: true },
        { label: 'Forecast Precision', value: '94.2%', sublabel: 'Variance reduction in financial & demand forecasts', trend: '94.2%', trendPositive: true },
        { label: 'Analyst Hours Saved', value: '95%', sublabel: 'Manual spreadsheet manipulation eliminated', trend: '-95%', trendPositive: true },
      ],
      pillars: [
        {
          title: 'Executive Tableau Cockpits',
          impact: 'High-density, interactive visual narratives engineered for immediate pattern recognition and decision-making.',
          tech: ['Tableau Server', 'Tableau Pulse', 'Prep Builder'],
        },
        {
          title: 'Predictive Scenario Simulation',
          impact: 'What-if sensitivity modeling simulating financial outcomes under volatile market conditions.',
          tech: ['Python Stats', 'Prophet', 'Monte Carlo'],
        },
        {
          title: 'Sub-Second Streaming Metrics',
          impact: 'In-memory analytical aggregation serving instant operational alerts on critical metric anomalies.',
          tech: ['ClickHouse', 'Apache Pinot', 'DuckDB'],
        },
        {
          title: 'Certified Semantic Data Layer',
          impact: 'Governed single source of truth ensuring every business unit computes KPIs with identical logic.',
          tech: ['dbt Core', 'Cube.js', 'LookML'],
        },
      ],
    },
  },
  {
    id: 'auth',
    badge: 'Cybersecurity Engineering',
    icon: ShieldCheck,
    title: 'Security Token',
    renderVignette: (hovered) => <CybersecurityEngineeringVignette isHovered={hovered} />,
    offerings: [
      { name: 'Zero Trust Architecture', description: 'Continuous verification, identity-centric security, access policy engineering' },
      { name: 'Cloud Security Engineering', description: 'Cloud security architecture, infrastructure security, DevSecOps' },
      { name: 'Identity & Access Management', description: 'Identity lifecycle automation, SSO and MFA, privileged access security' },
      { name: 'Application Security & Threat Defense', description: 'Security testing, threat detection and monitoring, risk assessment' },
    ],
    businessValues: {
      category: 'Zero Trust & DevSecOps',
      tagline: 'Uncompromised Cyber Resilience',
      headline: 'Fortify Cloud Architectures With Military-Grade Zero Trust Defenses',
      summary:
        'Build security as an intrinsic capability, not an afterthought. We implement cryptographic identity verification, least-privilege Zero Trust perimeters, automated DevSecOps pipelines, and active threat hunting to insulate your enterprise from sophisticated cyber adversaries.',
      metrics: [
        { label: 'Mean Time to Detect (MTTD)', value: '<3min', sublabel: 'Real-time threat detection across all environments', trend: '<3m', trendPositive: true },
        { label: 'Vulnerability Elimination', value: '99.8%', sublabel: 'Pre-production CVE neutralization in CI/CD', trend: '99.8%', trendPositive: true },
        { label: 'Compliance Posture', value: '100%', sublabel: 'Continuous SOC2 Type II, HIPAA & ISO27001 readiness', trend: '100%', trendPositive: true },
      ],
      pillars: [
        {
          title: 'Zero Trust Network Architecture',
          impact: 'Micro-segmented perimeter-less infrastructure enforcing strict cryptographic mutual TLS for every service call.',
          tech: ['SPIFFE/SPIRE', 'mTLS', 'Envoy Proxy'],
        },
        {
          title: 'Automated DevSecOps Pipeline',
          impact: 'Continuous SAST/DAST, software bill of materials (SBOM), and container scanning baked into deployment gates.',
          tech: ['Snyk', 'Trivy', 'SonarQube', 'Cosign'],
        },
        {
          title: 'Privileged Access & Cloud IAM',
          impact: 'Ephemeral just-in-time credential vending and multi-factor biometric authentication eliminating permanent keys.',
          tech: ['Okta', 'HashiCorp Vault', 'AWS IAM'],
        },
        {
          title: 'Threat Intelligence & Response',
          impact: '24/7 automated SIEM telemetry with rapid automated containment playbooks stopping lateral movement.',
          tech: ['Wazuh', 'Splunk', 'AWS GuardDuty'],
        },
      ],
    },
  },
  {
    id: 'island',
    badge: 'Data Platform Engineering',
    icon: Database,
    title: 'FLIP Dynamic Morph',
    renderVignette: (hovered) => <DataPlatformEngineeringVignette isHovered={hovered} />,
    offerings: [
      { name: 'Modern Data Architecture', description: 'Lakes and lakehouses, enterprise warehousing, cloud data architecture' },
      { name: 'Data Pipeline Engineering', description: 'ETL/ELT, real-time streaming, data integration' },
      { name: 'Lakehouse & Analytics Platforms', description: 'Databricks, Snowflake, analytics enablement for Tableau and BI' },
      { name: 'Data Governance & Reliability', description: 'Data quality, lineage and governance, platform observability' },
    ],
    highlight: 'AI-Ready Data Infrastructure',
    businessValues: {
      category: 'Lakehouse & Modern Data Stack',
      tagline: 'Scalable Data Foundations',
      headline: 'Power High-Velocity Analytics and AI on High-Throughput Data Rails',
      summary:
        'Clean, govern, and activate your enterprise data assets. We architect modern lakehouses on Databricks and Snowflake, real-time streaming pipelines, and automated data quality checks that turn chaotic data swamps into high-octane fuel for predictive analytics and generative AI.',
      metrics: [
        { label: 'Ingestion Throughput', value: '10M+', sublabel: 'Streaming records processed per second', trend: '10M/s', trendPositive: true },
        { label: 'Compute Cost Reduction', value: '44%', sublabel: 'Warehouse optimization via smart data clustering', trend: '-44%', trendPositive: true },
        { label: 'Data Freshness SLA', value: '<5s', sublabel: 'End-to-end latency from event generation to lakehouse', trend: '<5s', trendPositive: true },
      ],
      pillars: [
        {
          title: 'Modern Lakehouse Architecture',
          impact: 'Unified ACID transaction tables combining the cost efficiency of object storage with data warehouse speed.',
          tech: ['Delta Lake', 'Apache Iceberg', 'Databricks'],
        },
        {
          title: 'High-Throughput Streaming',
          impact: 'Zero-loss streaming data ingestion processing billions of events with exactly-once delivery guarantees.',
          tech: ['Apache Kafka', 'Apache Flink', 'Spark Streaming'],
        },
        {
          title: 'Snowflake Enterprise Warehousing',
          impact: 'Elastic multi-cluster compute architecture powering concurrent analytical workloads without contention.',
          tech: ['Snowflake', 'Snowpark', 'dbt'],
        },
        {
          title: 'Automated Lineage & Quality',
          impact: 'Circuit-breaker tests halting corrupted data before it ever reaches production reporting layers.',
          tech: ['Great Expectations', 'Monte Carlo', 'OpenLineage'],
        },
      ],
    },
  },
  {
    id: 'palette',
    badge: 'Digital Twin Systems',
    icon: Cuboid,
    title: 'Perceptual Harmony',
    renderVignette: (hovered) => <DigitalTwinSystemsVignette isHovered={hovered} />,
    offerings: [
      { name: 'Digital Twin Engineering', description: 'Asset twins, process twins, 3D visualization and simulation' },
      { name: 'IoT & Real-Time Intelligence', description: 'Sensor integration, real-time streaming, edge computing' },
      { name: 'Predictive Maintenance', description: 'Condition monitoring, failure prediction, maintenance intelligence' },
      { name: 'Simulation & Performance Optimization', description: 'Scenario simulation, performance optimization, decision support' },
    ],
    businessValues: {
      category: 'Cyber-Physical & IoT Simulation',
      tagline: 'High-Fidelity Virtual Replicas',
      headline: 'Simulate Physical Reality in Real Time to Preempt Downtime and Maximize Output',
      summary:
        'Bridge the physical and digital divide. We engineer real-time digital twin environments that ingest high-frequency IoT sensor telemetry, run physics-informed predictive failure simulations, and provide immersive 3D spatial twins for industrial machinery, facilities, and complex supply chains.',
      metrics: [
        { label: 'Unplanned Downtime', value: '-65%', sublabel: 'Equipment failures preempted via sensor telemetry', trend: '-65%', trendPositive: true },
        { label: 'Asset Lifecycle Extension', value: '+30%', sublabel: 'Optimized operating stress and scheduled maintenance', trend: '+30%', trendPositive: true },
        { label: 'Telemetry Stream Latency', value: '<18ms', sublabel: 'Edge sensor to digital twin synchronization delay', trend: '<18ms', trendPositive: true },
      ],
      pillars: [
        {
          title: 'Industrial IoT Edge Ingestion',
          impact: 'Low-latency edge gateways translating legacy Modbus, OPC-UA, and MQTT sensor signals into cloud event streams.',
          tech: ['OPC-UA', 'MQTT', 'AWS IoT Greengrass'],
        },
        {
          title: 'Physics-Informed ML Simulation',
          impact: 'Predict thermal runaway, vibration fatigue, and structural stress before physical degradation manifests.',
          tech: ['TensorFlow', 'PyTorch Physics', 'SciPy'],
        },
        {
          title: 'Interactive Spatial Twins',
          impact: 'High-fidelity WebGL/WebGPU 3D visualizations rendering live asset telemetry in full operational context.',
          tech: ['Three.js', 'WebGPU', 'USD / glTF'],
        },
        {
          title: 'Closed-Loop Actuation',
          impact: 'Automated edge setpoint adjustments in response to predicted anomalies without human latency.',
          tech: ['Edge Run-times', 'Safe-Fail Interlocks', 'SCADA APIs'],
        },
      ],
    },
  },
];

const VignettesContext = createContext<CardMeta[]>(CARDS);

// ============================================================================
// CARD COMPONENT
// ============================================================================
function Card({ card }: { card: CardMeta }) {
  const [isHovered, setIsHovered] = useState(false);
  const exploreCard = use(ExploreCardContext);
  if (!exploreCard) {
    throw new Error('Card must be rendered inside ExploreCardContext.');
  }

  const Icon = card.icon;

  return (
    <div
      data-slot="orbit-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative flex size-full flex-col rounded-[22px] bg-[#141417]/85 backdrop-blur-2xl border p-1 shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.15)] transition-all duration-300 ease-out overflow-hidden cursor-default pointer-events-auto',
        isHovered
          ? '-translate-y-1.5 scale-[1.02] border-white/20 shadow-[0_28px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.25)]'
          : 'border-white/[0.08]'
      )}
    >
      {/* Specular sheen catch across the top rim */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.08] to-transparent rounded-t-[22px] transition-opacity duration-300 z-10',
          isHovered ? 'opacity-100' : 'opacity-40'
        )}
      />

      {/* Inner dark glass bezel */}
      <div className="relative flex flex-1 flex-col rounded-[18px] bg-black/40 backdrop-blur-xl overflow-hidden border border-white/[0.04] z-20">
        {/* Card Header: Service Icon + Title + Status Beacon + Explore Glass Pill */}
        <div
          onClick={() => exploreCard.setSelectedId(card.id)}
          className="relative z-20 flex items-center justify-between w-full px-3.5 pt-2.5 pb-2 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent cursor-pointer select-none"
        >
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <div className="relative flex size-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] border border-white/10 text-white shadow-sm">
              <Icon className="size-3.5 stroke-[1.8]" />
              <span
                className={cn(
                  'absolute -bottom-0.5 -right-0.5 size-1.5 rounded-full ring-2 ring-black transition-all duration-300',
                  isHovered ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-white/40'
                )}
              />
            </div>
            <h3 className="font-sans font-semibold tracking-[-0.015em] text-[13.5px] text-white truncate">
              {card.badge}
            </h3>
          </div>

          {/* Explore Button: Apple Luminous White Capsule */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              exploreCard.setSelectedId(card.id);
            }}
            aria-label={`Explore ${card.badge}`}
            className={cn(
              'group/btn relative flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-300 ease-out cursor-pointer active:scale-[0.93]',
              isHovered
                ? 'bg-white text-neutral-950 shadow-[0_2px_14px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2)] scale-100 opacity-100'
                : 'bg-white/10 text-white/80 border border-white/15 backdrop-blur-md opacity-75 hover:opacity-100 scale-95'
            )}
          >
            <span>Explore</span>
            <div
              className={cn(
                'flex size-3.5 items-center justify-center rounded-full transition-all duration-200',
                isHovered ? 'bg-neutral-950/10 text-neutral-950' : 'text-white/80'
              )}
            >
              <ArrowUpRight className="size-3 stroke-[2.4] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </div>
          </button>
        </div>

        {/* Interactive Vignette Body */}
        <div className="relative flex flex-1 items-center justify-center p-2 min-h-0 w-full">
          {card.renderVignette(isHovered)}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// APPLE-DESIGNED SERVICE MODAL (BUSINESS VALUES & SYSTEM TELEMETRY)
// ============================================================================
function AppleServiceModal({
  card,
  onClose,
}: {
  card: CardMeta;
  onClose: () => void;
}) {
  const Icon = card.icon;
  const bv = card.businessValues;

  // Fluid Keyboard & Body Scroll locks
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleScheduleBriefing = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('connect');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`service-modal-${card.id}`}
    >
      {/* Deep Frosted Scrim: Blurs everything behind the modal into luxury dark glass */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
        aria-hidden="true"
      />

      {/* Apple Dialog Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ type: 'spring', stiffness: 290, damping: 28, mass: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-5xl max-h-[88vh] rounded-[28px] sm:rounded-[36px] bg-[#121216]/95 border border-white/[0.12] shadow-[0_32px_120px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.22)] overflow-hidden text-neutral-100 z-10 font-sans"
      >
        {/* Specular Rim Light across top border */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.09] via-white/[0.02] to-transparent rounded-t-[28px] sm:rounded-t-[36px] z-20" />

        {/* Header: Service Identity, Live Status Badge, and Frosted Close Pill */}
        <div className="relative z-20 flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b border-white/[0.08] bg-black/40 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="relative flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] border border-white/15 text-white shadow-[0_2px_12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2)]">
              <Icon className="size-5 stroke-[1.8]" />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-black shadow-[0_0_8px_#34d399]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  {bv.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[9.5px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Production Ready
                </span>
              </div>
              <h2
                id={`service-modal-${card.id}`}
                className="text-lg sm:text-2xl font-semibold tracking-[-0.02em] text-white truncate mt-0.5"
              >
                {card.badge}
              </h2>
            </div>
          </div>

          {/* Frosted Circular Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="group flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.18] active:scale-[0.92] text-white/70 hover:text-white border border-white/10 transition-all duration-150 cursor-pointer shadow-sm"
          >
            <X className="size-4 sm:size-4.5 stroke-[2] transition-transform duration-150 group-hover:scale-110" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8 space-y-8 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.15)_transparent]">
          {/* 1. Hero Executive Value Statement */}
          <div className="flex flex-col gap-2">
            <span className="text-xs sm:text-[13px] font-medium tracking-wide uppercase text-neutral-400">
              {bv.tagline}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-[-0.03em] leading-tight text-balance">
              {bv.headline}
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-3xl pt-1">
              {bv.summary}
            </p>
          </div>

          {/* 2. Key Business Impact Metrics (3-tile Apple frosted glass grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {bv.metrics.map((m, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.12)] overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-neutral-400">{m.label}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <TrendingUp className="size-3 stroke-[2]" />
                    {m.trend}
                  </span>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
                    {m.value}
                  </div>
                  <div className="text-[11.5px] text-neutral-400 mt-1 leading-snug">
                    {m.sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Live System Telemetry Vignette (Interactive Apple HIG Sandbox) */}
          <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/[0.08] p-4 sm:p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Zap className="size-3.5 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Interactive Subsystem Sandbox & Architecture
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                Real-Time Telemetry Simulation
              </span>
            </div>
            <div className="h-44 sm:h-48 w-full flex items-center justify-center p-2 rounded-xl bg-black/40 border border-white/[0.04]">
              {card.renderVignette(true)}
            </div>
          </div>

          {/* 4. Strategic Capability Pillars (4 structured cards) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-semibold tracking-[-0.01em] text-white">
                Enterprise Strategic Capabilities
              </h4>
              <span className="text-xs text-neutral-400 font-mono">4 Core Architecture Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {bv.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/15 transition-all duration-200"
                >
                  <div>
                    <h5 className="text-[14.5px] font-semibold text-white tracking-tight">
                      {pillar.title}
                    </h5>
                    <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed mt-1.5 font-normal">
                      {pillar.impact}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/[0.05]">
                    {pillar.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] text-neutral-300 border border-white/[0.08]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-8 py-4 sm:py-5 border-t border-white/[0.08] bg-black/50 backdrop-blur-xl shrink-0">
          <div className="text-[11.5px] text-neutral-400 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>99.99% Availability SLA • SOC2 Type II Aligned • Dedicated Architecture Pod</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] active:scale-[0.96] border border-white/10 transition-all cursor-pointer"
            >
              Done
            </button>
            <button
              type="button"
              onClick={handleScheduleBriefing}
              className="group/briefing px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-100 active:scale-[0.96] shadow-[0_2px_16px_rgba(255,255,255,0.4),0_0_24px_rgba(255,255,255,0.2)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Architecture Briefing</span>
              <ArrowRight className="size-3.5 stroke-[2.2] transition-transform duration-200 group-hover/briefing:translate-x-1" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

type Placement = {
  x: number;
  y: number;
  scale: number;
  blur: number;
  opacity: number;
  rotateY: number;
  z: number;
};

function OrbitCard({
  index,
  enter,
  settle,
  turn,
  drift,
  onHoverChange,
}: {
  index: number;
  enter: MotionValue<number>;
  settle: MotionValue<number>;
  turn: MotionValue<number>;
  drift: MotionValue<number>;
  onHoverChange?: (index: number, hovered: boolean) => void;
}) {
  const vignettes = use(VignettesContext);
  const card = vignettes[index]!;
  const count = vignettes.length;
  const columns = columnsOf(count);
  const column = index % columns;
  const row = Math.floor(index / columns);
  const rows = Math.ceil(count / columns);
  const slot = {
    x: (column - (rowLength(count, columns, row) - 1) / 2) * (CARD.width + GAP),
    y: (row - (rows - 1) / 2) * (CARD.height + GAP) + 48,
  };

  const place = useTransform(
    [enter, settle, turn, drift] as MotionValue<number>[],
    ([e, s, t, d]: number[]) => {
      const angle = (index / count) * Math.PI * 2 + t! + d! * (1 - s!);
      const depth = (Math.sin(angle) + 1) / 2;
      const reach = 0.3 + 0.7 * e!;
      const orbit = {
        x: Math.cos(angle) * RADIUS.x * reach,
        y: Math.sin(angle) * RADIUS.y * reach + 30,
        scale: 0.7 + 0.3 * depth,
        blur: (1 - depth) * 1.6 + (1 - e!) * 8,
        opacity: (0.55 + 0.45 * depth) * e!,
        rotateY: -Math.cos(angle) * 24,
      };
      const k = smooth(s!);
      return {
        x: orbit.x + (slot.x - orbit.x) * k,
        y: orbit.y + (slot.y - orbit.y) * k,
        scale: orbit.scale + (1 - orbit.scale) * k,
        blur: orbit.blur * (1 - k),
        opacity: orbit.opacity + (1 - orbit.opacity) * k,
        rotateY: orbit.rotateY * (1 - k),
        z: k > 0.5 ? 30 : depth > 0.5 ? 20 : 5,
      };
    },
  );

  const ref = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  const apply = useCallback((p: Placement) => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = `perspective(900px) translate(${round(p.x, 1)}px, ${round(p.y, 1)}px) scale(${round(p.scale, 3)}) rotateY(${round(p.rotateY, 2)}deg)`;
    element.style.opacity = isHoveredRef.current ? '1' : String(round(p.opacity, 3));
    element.style.filter =
      !isHoveredRef.current && p.blur > 0.05 ? `blur(${round(p.blur, 1)}px)` : 'none';
    element.style.zIndex = isHoveredRef.current ? '50' : String(p.z);
  }, []);

  useMotionValueEvent(place, 'change', apply);
  useLayoutEffect(() => apply(place.get()), [apply, place]);

  useEffect(() => {
    return () => {
      if (isHoveredRef.current) {
        onHoverChange?.(index, false);
      }
    };
  }, [index, onHoverChange]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        isHoveredRef.current = true;
        onHoverChange?.(index, true);
        apply(place.get());
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        onHoverChange?.(index, false);
        apply(place.get());
      }}
      className="absolute top-1/2 left-1/2 pointer-events-auto select-auto"
      style={{
        width: CARD.width,
        height: CARD.height,
        marginLeft: -CARD.width / 2,
        marginTop: -CARD.height / 2,
        opacity: 0,
        transformStyle: 'preserve-3d',
      }}
    >
      <Card card={card} />
    </div>
  );
}

function Headline({
  progress,
  range,
  children,
  className,
  top = 'top-2 sm:top-3 md:top-4',
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  children: React.ReactNode;
  className?: string;
  top?: string;
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [16, 0, 0, -16]);
  const filter = useTransform(progress, range, [
    'blur(8px)',
    'blur(0px)',
    'blur(0px)',
    'blur(8px)',
  ]);
  return (
    <motion.h2
      style={{ opacity, y, filter }}
      className={cn(
        'absolute inset-x-0 text-center font-semibold tracking-[-0.025em] text-balance md:text-5xl text-3xl sm:text-4xl text-neutral-100 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] pointer-events-none z-10 font-sans',
        top,
        className,
      )}
    >
      {children}
    </motion.h2>
  );
}

function OrbitStage() {
  const vignettes = use(VignettesContext);
  const ref = useRef<HTMLElement>(null);
  const onScreen = useInView(ref);
  const scale = useStageScale();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 190,
    damping: 27,
    mass: 0.35,
  });
  const drift = useMotionValue(0);

  const enter = useTransform(progress, (p) => smooth(clamp((p - 0.1) / 0.22)));
  const [entered, setEntered] = useState(false);
  useMotionValueEvent(enter, 'change', (value) => setEntered(value > 0.001));

  const settle = useTransform(progress, (p) => clamp((p - 0.74) / 0.12));
  const turn = useTransform(progress, (p) => clamp(p / 0.74) * Math.PI * 1.1);

  const hoveredCardIndexRef = useRef<number | null>(null);
  const handleCardHover = useCallback((index: number, hovered: boolean) => {
    if (hovered) {
      hoveredCardIndexRef.current = index;
    } else if (hoveredCardIndexRef.current === index) {
      hoveredCardIndexRef.current = null;
    }
  }, []);

  const targetSpeedRef = useRef(0.00008);
  const currentSpeedRef = useRef(0.00008);

  useAnimationFrame((_, delta) => {
    const isPaused = settle.get() > 0 || hoveredCardIndexRef.current !== null;
    targetSpeedRef.current = isPaused ? 0 : 0.00008;

    // Smooth continuous physical velocity blend (no brick-wall stops)
    const blendFactor = Math.min(1, delta * 0.007);
    currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * blendFactor;

    if (Math.abs(currentSpeedRef.current) > 0.000001) {
      drift.set(drift.get() + delta * currentSpeedRef.current);
    }
  });

  const logoScale = useTransform(
    progress,
    [0, 0.3, 0.74, 0.84],
    [0.8, 1, 1, 0.3],
  );
  const logoOpacity = useTransform(progress, [0, 0.72, 0.82], [1, 1, 0]);
  const logoRotate = useTransform(progress, [0, 0.84], [-60, 240]);
  const logoTilt = useTransform(progress, [0, 0.42, 0.84], [24, -12, 24]);
  const glow = useTransform(progress, [0, 0.3, 0.74, 0.84], [0.5, 1, 1, 0]);

  return (
    <OnScreenContext value={onScreen && entered}>
      <section
        ref={ref}
        id="build"
        data-slot="home-orbit"
        className="relative mt-24 h-[350vh] bg-black"
      >
        <div className="sticky top-20 flex h-[calc(100dvh-5rem)] items-center justify-center overflow-hidden">
          <div
            className="relative shrink-0"
            style={{
              width: STAGE.width,
              height: STAGE.height,
              transform: `scale(${scale})`,
            }}
          >
            <Headline progress={progress} range={[-0.01, 0, 0.68, 0.76]} top="top-2 sm:top-3 md:top-4">
              Intelligent systems in motion.
            </Headline>
            <Headline progress={progress} range={[0.8, 0.88, 1, 1.01]} top="top-2 sm:top-3 md:top-4">
              Engineered to scale. Explore our services.
            </Headline>

            <motion.div
              aria-hidden="true"
              style={{ opacity: glow }}
              className="pointer-events-none absolute top-1/2 left-1/2 -mt-[240px] -ml-[240px] size-[480px] rounded-full bg-foreground/10 blur-3xl"
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 z-10 -mt-[130px] -ml-[130px]"
              style={{
                scale: logoScale,
                opacity: logoOpacity,
                rotate: logoRotate,
                rotateX: logoTilt,
                transformPerspective: 1200,
              }}
            >
              <Image
                src="/logos/valoria-orbit-mark.png"
                alt=""
                aria-hidden="true"
                width={260}
                height={260}
                className="h-[260px] w-[260px] object-contain drop-shadow-[0_30px_60px_rgb(0_0_0/0.25)]"
              />
            </motion.div>

            {vignettes.map(({ badge }, index) => (
              <OrbitCard
                key={badge}
                index={index}
                enter={enter}
                settle={settle}
                turn={turn}
                drift={drift}
                onHoverChange={handleCardHover}
              />
            ))}
          </div>
        </div>
      </section>
    </OnScreenContext>
  );
}

function StaticGrid({ heading = 'Engineered to scale. Explore our services.' }: { heading?: string }) {
  const vignettes = use(VignettesContext);
  const columns = columnsOf(vignettes.length);
  const ref = useRef<HTMLElement>(null);
  const onScreen = useInView(ref);
  return (
    <OnScreenContext value={onScreen}>
      <section
        ref={ref}
        id="build"
        data-slot="home-orbit"
        className="mx-auto mt-24 flex w-full max-w-[1140px] flex-col gap-10 px-5 bg-black"
      >
        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center text-3xl font-semibold tracking-[-0.025em] text-balance md:text-5xl text-neutral-100 font-sans"
        >
          {heading}
        </motion.h2>
        <div
          className={cn(
            'grid gap-4',
            columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-6',
          )}
        >
          {vignettes.map((card, index) => (
            <motion.div
              key={card.badge}
              className={cn(
                columns === 3 && 'md:col-span-2',
                columns === 3 &&
                  index === vignettes.length - (vignettes.length % 3) &&
                  LAST_ROW_START[vignettes.length % 3],
              )}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: (index % columns) * 0.06,
              }}
              style={{ height: CARD.height + 16 }}
            >
              <Card card={card} />
            </motion.div>
          ))}
        </div>
      </section>
    </OnScreenContext>
  );
}

export function Orbit({ only }: { only?: string[] }) {
  const wide = useWide();
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const vignettes = only
    ? CARDS.filter(({ title }) => only.includes(title))
    : CARDS;
  const selectedCard = vignettes.find(({ id }) => id === selectedId) ?? null;
  return (
    <ExploreCardContext value={{ selectedId, setSelectedId }}>
      <ActiveLogoContext value={{ activeId, setActiveId }}>
        <VignettesContext value={vignettes}>
          {wide && !reduce ? <OrbitStage /> : <StaticGrid />}
          <AnimatePresence>
            {selectedCard && (
              <AppleServiceModal
                card={selectedCard}
                onClose={() => setSelectedId(null)}
              />
            )}
          </AnimatePresence>
        </VignettesContext>
      </ActiveLogoContext>
    </ExploreCardContext>
  );
}

export function OrbitShowcase() {
  return <Orbit />;
}

export function OrbitGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCard = CARDS.find(({ id }) => id === selectedId) ?? null;
  return (
    <ExploreCardContext value={{ selectedId, setSelectedId }}>
      <ActiveLogoContext value={{ activeId, setActiveId }}>
        <VignettesContext value={CARDS}>
          <StaticGrid heading="Engineered to scale. Explore our services." />
          <AnimatePresence>
            {selectedCard && (
              <AppleServiceModal
                card={selectedCard}
                onClose={() => setSelectedId(null)}
              />
            )}
          </AnimatePresence>
        </VignettesContext>
      </ActiveLogoContext>
    </ExploreCardContext>
  );
}
