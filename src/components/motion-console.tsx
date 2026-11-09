'use client';
import { supabase } from '@/lib/supabase';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import {
  CheckCircle2,
  Loader2,
  Sparkles,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  Briefcase,
  Layers,
  Code2,
  Cpu,
  Database,
  Cloud,
  X,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// DATA: SALESFORCE SCENARIOS
// ============================================================================
interface SalesforceScenario {
  id: string;
  tabLabel: string;
  title: string;
  prompt: string;
  steps: {
    text: string;
    status: 'passed' | 'loading';
  }[];
  result: string;
}

const SF_SCENARIOS: SalesforceScenario[] = [
  {
    id: 'it-asset',
    tabLabel: '01 · IT Asset Lifecycle',
    title: 'IT Asset Lifecycle Management',
    prompt: 'Scenario: IT Asset Lifecycle Management',
    steps: [
      {
        text: 'Engineered Custom Asset Data Models & Relationships',
        status: 'passed',
      },
      {
        text: 'Automated Asset Lifecycle Using Apex & Triggers',
        status: 'passed',
      },
      {
        text: 'Need to develop LWC-Based Inventory & Operations Dashboards',
        status: 'loading',
      },
      {
        text: 'Need to implement Role-Based Access & Approval Workflows',
        status: 'loading',
      },
    ],
    result: "Deployed to 'force-app/main/default/classes/AssetLifecycleController.cls' in 14ms",
  },
  {
    id: 'source-to-pay',
    tabLabel: '02 · Source-to-Pay',
    title: 'Source-to-Pay & Supplier Lifecycle Management',
    prompt: 'Scenario: Source-to-Pay & Supplier Lifecycle Management',
    steps: [
      {
        text: 'Designed Supplier & Procurement Data Architecture',
        status: 'passed',
      },
      {
        text: 'Automated Purchase Workflows Using Apex & SOQL',
        status: 'passed',
      },
      {
        text: 'Need to develop LWC-Based Procurement Management Interfaces',
        status: 'loading',
      },
      {
        text: 'Need to implement Multi-Level Approvals & Financial Governance',
        status: 'loading',
      },
    ],
    result: "Validated SOQL governor bounds & Trigger execution: 0 DML exceptions",
  },
  {
    id: 'icso',
    tabLabel: '03 · Claims & ICSO',
    title: 'Insurance Claims & Settlement Operations (ICSO)',
    prompt: 'Scenario: Insurance Claims & Settlement Operations (ICSO)',
    steps: [
      {
        text: 'Architected Policy, Claims & Settlement Data Models',
        status: 'passed',
      },
      {
        text: 'Engineered Claims Processing Logic Using Apex',
        status: 'passed',
      },
      {
        text: 'Need to develop LWC-Based Claims Assessment & Tracking Systems',
        status: 'loading',
      },
      {
        text: 'Need to implement Approval Hierarchies & Secure Access Controls',
        status: 'loading',
      },
    ],
    result: "Integrated ICSO Claims Engine with Real-Time Apex Event Bus",
  },
];

// ============================================================================
// DATA: TOP NAVIGATION TABS (Salesforce, SDE, Gen AI, Data Structures)
// ============================================================================
interface MainTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
  steps: {
    text: string;
    status: 'passed' | 'loading';
  }[];
  result: string;
}

const MAIN_TABS: MainTab[] = [
  {
    id: 'salesforce',
    label: 'Salesforce',
    icon: Cloud,
    prompt:
      'Make my save button show a fluid spring press, loading state, then "Saved" for enterprise Salesforce operations.',
    steps: SF_SCENARIOS[0]!.steps,
    result: "Optimized 'components/save-button.tsx' with spring stiffness: 240, damping: 20",
  },
  {
    id: 'sde',
    label: 'SDE',
    icon: Code2,
    prompt:
      'Architect resilient distributed microservices, event-driven streaming queues, and zero-downtime containerized CI/CD.',
    steps: [
      {
        text: 'Distributed consensus caching via Redis cluster & Raft engine',
        status: 'passed',
      },
      {
        text: 'Zero-downtime canary deployment pipeline via Docker & Kubernetes',
        status: 'passed',
      },
      {
        text: 'Multi-region latency optimization & gRPC binary stream buffering',
        status: 'loading',
      },
      {
        text: 'Auto-scaling policy & circuit breaker fault-tolerance matrix',
        status: 'loading',
      },
    ],
    result: 'Distributed mesh active: 99.999% uptime, p99 latency < 8ms',
  },
  {
    id: 'gen-ai',
    label: 'Gen AI',
    icon: Sparkles,
    prompt:
      'Deploy multi-agent RAG reasoning pipeline with semantic caching, hybrid vector retrieval, and automated guardrails.',
    steps: [
      {
        text: 'Hybrid dense/sparse vector embedding index with HNSW cosine search',
        status: 'passed',
      },
      {
        text: 'Dynamic chunking with AST-aware context metadata enrichment',
        status: 'passed',
      },
      {
        text: 'Grounded citation verification & semantic hallucination filters',
        status: 'loading',
      },
      {
        text: 'Streaming token inference via WebSocket with sub-80ms TTFT',
        status: 'loading',
      },
    ],
    result: 'Multi-Agent RAG initialized: 100% citation grounding verified',
  },
  {
    id: 'data-structures',
    label: 'Data Structures',
    icon: Database,
    prompt:
      'Calibrate cache-oblivious B-trees, lock-free concurrent ring buffers, and memory-compacted skip lists.',
    steps: [
      {
        text: 'Cache-locality aligned memory layout benchmarks (L1/L2 hits > 94%)',
        status: 'passed',
      },
      {
        text: 'Concurrent read/write synchronization with lock-free atomic CAS primitives',
        status: 'passed',
      },
      {
        text: 'Lock-free ring buffer queue throughput (12.4M ops/sec peak)',
        status: 'loading',
      },
      {
        text: 'Amortized O(1) dynamic resizing & non-blocking memory compaction',
        status: 'loading',
      },
    ],
    result: 'Zero memory leaks detected, CAS synchronization optimal (0 contention)',
  },
];

// ============================================================================
// SECOND COMPONENT: SALESFORCE CLI CARD DATA
// ============================================================================
interface CliTab {
  id: string;
  label: string;
  command: string;
}

const CLI_TABS: CliTab[] = [
  {
    id: 'bun',
    label: 'bun',
    command: 'bunx valoria@latest init --template salesforce-enterprise',
  },
  {
    id: 'npm',
    label: 'npm',
    command: 'npx valoria@latest init --template salesforce-enterprise',
  },
  {
    id: 'pnpm',
    label: 'pnpm',
    command: 'pnpm dlx valoria@latest init --template salesforce-enterprise',
  },
  {
    id: 'sf',
    label: 'sf cli',
    command: 'sf project deploy start --target-org valoria-sandbox',
  },
];

// ============================================================================
// SUB-SANDBOXES (FOR SDE, GEN AI, DATA STRUCTURES)
// ============================================================================
function DynamicIslandSandbox() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        layout
        onClick={() => setExpanded(!expanded)}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className={cn(
          'cursor-pointer border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl transition-colors hover:border-white/20 select-none overflow-hidden',
          expanded
            ? 'w-[280px] rounded-3xl p-4'
            : 'w-[180px] h-11 rounded-full px-4 flex items-center justify-between'
        )}
      >
        <motion.div layout className="flex items-center gap-2.5">
          <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-white tracking-tight">
            Valoria GenAI Agent
          </span>
        </motion.div>
        {expanded ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2"
          >
            <div className="flex justify-between text-[11px] text-neutral-400">
              <span>RAG Latency</span>
              <span className="text-emerald-400 font-mono">42ms TTFT</span>
            </div>
            <div className="flex justify-between text-[11px] text-neutral-400">
              <span>Embeddings</span>
              <span className="text-white font-mono">Cosine 0.96 Match</span>
            </div>
            <button
              type="button"
              className="mt-1 w-full rounded-lg bg-white/10 py-1.5 text-center text-[11px] font-medium text-white hover:bg-white/15 cursor-pointer"
            >
              Minimize Pill
            </button>
          </motion.div>
        ) : (
          <motion.span layout className="text-[11px] font-mono text-emerald-400 font-medium">
            Active
          </motion.span>
        )}
      </motion.div>
      <span className="text-[11px] text-neutral-400 font-mono">
        Click pill to expand / collapse agent metrics
      </span>
    </div>
  );
}

function TaskStreamSandbox() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Apex Trigger: AssetStatusAudit' },
    { id: '2', title: 'LWC: ProcurementApprovalTable' },
    { id: '3', title: 'gRPC Stream: TelemetryIngest' },
  ]);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-[300px]">
      <ul className="flex flex-col gap-2 w-full">
        <AnimatePresence mode="popLayout" initial={false}>
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
              transition={{
                layout: { type: 'spring', stiffness: 280, damping: 25 },
                duration: 0.25,
              }}
              onClick={() => setTasks((prev) => prev.filter((t) => t.id !== task.id))}
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-xs text-white transition-all hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div className="flex items-center gap-2.5">
                <span className="size-3.5 rounded-[4px] border border-neutral-500 group-hover:border-white transition-colors" />
                <span className="truncate">{task.title}</span>
              </div>
              <span className="text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                dismiss
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {tasks.length < 3 && (
        <button
          type="button"
          onClick={() =>
            setTasks([
              { id: '1', title: 'Apex Trigger: AssetStatusAudit' },
              { id: '2', title: 'LWC: ProcurementApprovalTable' },
              { id: '3', title: 'gRPC Stream: TelemetryIngest' },
            ])
          }
          className="text-[11px] font-mono text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer"
        >
          Reset list items
        </button>
      )}
      <span className="text-[11px] text-neutral-400 font-mono">
        Click any task to see shared layout reflow
      </span>
    </div>
  );
}

function DataStructuresSandbox() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[320px]">
      <div className="flex items-center justify-between text-xs text-neutral-400 pb-1 px-1">
        <span>Hardware Memory Diagnostics</span>
        <span className="text-emerald-400 font-mono">100% Score</span>
      </div>
      {[
        { name: 'Cache-oblivious B-Tree', value: '0 Misses · O(log_B N)' },
        { name: 'Lock-Free Concurrent Queue', value: 'Atomic CAS Active' },
        { name: 'Zero-Copy Ring Buffer', value: '12.4M ops/sec' },
        { name: 'Memory Compaction GC', value: '0 Pauses Detected' },
      ].map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs"
        >
          <span className="font-medium text-neutral-200">{item.name}</span>
          <span className="font-mono text-[11px] text-emerald-400">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// MAIN LAUNCH PAGE COMPONENT (CONTAINING BOTH COMPONENTS 1 & 2)
// ============================================================================
function InternshipApplicationSheet({
  onClose,
}: {
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

 
const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  setSaveMessage('Submitting your application...');

  const formData = new FormData(event.currentTarget);

  const firstName = String(formData.get('firstName') || '').trim();
  const lastName = String(formData.get('lastName') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const degree = String(formData.get('degree') || '').trim();
  const course = String(formData.get('course') || '');
  const graduationYear = Number(formData.get('graduationYear'));

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !degree ||
    !course ||
    !graduationYear
  ) {
    setSaveMessage('Please complete all required fields.');
    return;
  }

  const { error } = await supabase
    .from('Students')
    .insert([
      {
        Firstname: firstName,
        Lastname: lastName,
        email: email,
        Phone: phone,
        Degree: degree,
        Course: course,
        YOG: graduationYear,
      },
    ]);

  if (error) {
    console.error('Supabase submission error:', error);
    setSaveMessage(`Submission failed: ${error.message}`);
    return;
  }

  setSaveMessage('Application submitted successfully!');

  event.currentTarget.reset();
};


  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.2 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        aria-hidden="true"
        className="internship-application-scrim absolute inset-0 bg-black/35 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="internship-application-title"
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 24, scale: 0.98 }
        }
        animate={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        exit={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 16, scale: 0.98 }
        }
        transition={
          reduceMotion
            ? { duration: 0.12 }
            : { type: 'spring', stiffness: 300, damping: 30 }
        }
        onClick={(event) => event.stopPropagation()}
        className="internship-application-surface relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/20 text-white shadow-[0_32px_120px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.18)] sm:max-h-[min(88vh,820px)] sm:max-w-3xl sm:rounded-3xl"
      >
            <header className="relative shrink-0 border-b border-white/10 bg-white/[0.025] px-5 py-5 pr-16 sm:px-8 sm:py-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-sky-200/75">
                Valoria internship
              </div>
              <h2
                id="internship-application-title"
                className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl"
              >
                Apply for an internship
              </h2>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-neutral-300">
                Share a little about yourself and your experience.
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close application form"
                className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-neutral-300 transition hover:bg-white/[0.14] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:right-6 sm:top-5"
              >
                <X className="size-4" />
              </button>
            </header>

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-medium text-neutral-300">
                    First name
                    <input
                      name="firstName"
                      autoComplete="given-name"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                      placeholder="Alex"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    Last name
                    <input
                      name="lastName"
                      autoComplete="family-name"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                      placeholder="Morgan"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    Phone
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                      placeholder="+1 (555) 000-0000"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    Email
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                      placeholder="alex@example.com"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    Password
                    <input
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      minLength={8}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                      placeholder="At least 8 characters"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    Degree
                    <input
                      name="degree"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                      placeholder="B.S. Computer Science"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    Course
                    <select
                      name="course"
                      defaultValue=""
                      className="mt-1.5 w-full appearance-none rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                    >
                      <option value="" disabled>
                        Select a course
                      </option>
                      <option value="SDE">SDE</option>
                      <option value="Salesforce">Salesforce</option>
                      <option value="AI Product Engineer">AI Product Engineer</option>
                    </select>
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    Year of graduation
                    <input
                      name="graduationYear"
                      type="number"
                      min="1950"
                      max="2100"
                      step="1"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                      placeholder="2027"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300 sm:col-span-2">
                    Skills
                    <textarea
                      name="skills"
                      rows={2}
                      className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                      placeholder="Languages, tools, and areas of interest"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300 sm:col-span-2">
                    Resume
                    <span className="mt-1.5 flex min-h-11 items-center gap-2 rounded-xl border border-dashed border-white/15 bg-black/25 px-3.5 py-2 text-sm text-neutral-300">
                      <Upload className="size-4 shrink-0 text-sky-200" />
                      <input
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="min-w-0 flex-1 text-xs file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-white/10 file:px-2.5 file:py-1.5 file:text-xs file:text-white hover:file:bg-white/15"
                      />
                    </span>
                    <span className="mt-1 block text-[11px] text-neutral-500">
                      PDF or Word document
                    </span>
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    GitHub
                    <input
                      name="github"
                      type="url"
                      autoComplete="url"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                      placeholder="https://github.com/username"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    LinkedIn <span aria-hidden="true" className="text-sky-200">*</span>
                    <span className="sr-only"> required</span>
                    <input
                      name="linkedin"
                      type="url"
                      autoComplete="url"
                      required
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </label>
                </div>
                {saveMessage && (
                  <p
                    role="status"
                    className="rounded-xl border border-amber-300/20 bg-amber-300/[0.07] px-3.5 py-3 text-xs leading-relaxed text-amber-100"
                  >
                    {saveMessage}
                  </p>
                )}
              </div>

              <footer className="flex shrink-0 flex-col gap-3 border-t border-white/10 bg-[#111318]/80 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <p className="text-[11px] leading-relaxed text-neutral-400">
                  Your information is not sent or stored yet.
                </p>
                <button
                  type="submit"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-sky-100 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  Save application
                  <ArrowRight className="size-4" />
                </button>
              </footer>
        </form>
      </motion.div>
    </motion.div>
  );
}

export function LaunchSection() {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const applicationButtonRef = useRef<HTMLButtonElement>(null);
  const closeApplicationSheet = useCallback(() => {
    setIsApplicationOpen(false);
    window.requestAnimationFrame(() => applicationButtonRef.current?.focus());
  }, []);

  // Top Navigation Tabs: Salesforce, SDE, Gen AI, Data Structures
  const [activeTab, setActiveTab] = useState<string>('salesforce');
  // Salesforce Scenarios: 01 IT Asset, 02 Source-to-Pay, 03 ICSO
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  // CLI Package Manager Tab
  const [activeCliTab, setActiveCliTab] = useState<string>('bun');
  const [copied, setCopied] = useState<boolean>(false);

  // Mouse tracking inside the "Apply for Internship" sandbox area
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springX = useSpring(rawMouseX, { stiffness: 320, damping: 28 });
  const springY = useSpring(rawMouseY, { stiffness: 320, damping: 28 });
  const rotateX = useSpring(0, { stiffness: 320, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 320, damping: 25 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rawMouseX.set(x);
    rawMouseY.set(y);

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    rotateX.set(-normY * 8.5);
    rotateY.set(normX * 10);
    setCoords({ x: Math.round(x), y: Math.round(y) });
  };

  const handleStageMouseEnter = () => {
    setIsHoveringStage(true);
  };

  const handleStageMouseLeave = () => {
    setIsHoveringStage(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const currentTab = MAIN_TABS.find((t) => t.id === activeTab) || MAIN_TABS[0]!;
  const currentScenario = SF_SCENARIOS[activeScenarioIdx] || SF_SCENARIOS[0]!;

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentCli = CLI_TABS.find((c) => c.id === activeCliTab) || CLI_TABS[0]!;

  return (
    <>
      <section
      id="launch"
      className="relative w-full bg-black text-white py-20 sm:py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Anchor for nav compatibility */}
      <div id="platform" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background glow matching Apple-grade luxury dark palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-white/[0.03] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 size-[450px] rounded-full bg-emerald-500/[0.02] blur-[100px]"
      />

      <div className="relative w-full max-w-[1360px] mx-auto flex flex-col items-center">
        {/* ================================================================ */}
        {/* 1. TOP NAVIGATION PILLS (Salesforce, SDE, Gen AI, Data Structures) */}
        {/* ================================================================ */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 select-none">
          {MAIN_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all select-none focus:outline-none cursor-pointer flex items-center gap-2',
                  isActive
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-console-tab"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                  />
                )}
                <TabIcon className="size-3.5 relative z-10 shrink-0 text-current" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================================================================ */}
        {/* COMPONENT 1: macOS ORCHESTRATOR TERMINAL WINDOW (IMAGE 1)         */}
        {/* ================================================================ */}
        <div className="w-full relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#0c0c11]/95 shadow-[0_24px_80px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
          {/* macOS Title Bar */}
          <div className="flex h-12 items-center justify-between border-b border-white/[0.08] bg-black/50 px-4 sm:px-6 select-none">
            {/* Traffic Lights */}
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-sm" />
              <span className="size-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-sm" />
              <span className="size-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-sm" />
            </div>

            {/* Center Prompt Title matching Image 1: >_ ~/valoria-orchestrator */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono text-neutral-300">
              <span className="text-neutral-500">&gt;_</span>
              <Terminal className="size-3.5 text-neutral-400" />
              <span className="text-neutral-200">~/valoria-orchestrator</span>
            </div>

            {/* Right Status Dot: CRM */}
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-[11px] font-mono text-neutral-300 font-semibold uppercase tracking-widest hidden sm:inline">
                CRM
              </span>
            </div>
          </div>

          {/* Console Body 2-Column Grid */}
          <div className="grid lg:grid-cols-[1.18fr_1fr] min-h-[460px] divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            {/* LEFT COLUMN: Prompt & Steps List */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-black/40">
              <div>
                {/* For Salesforce: 3-Scenario Segmented Switcher */}
                {activeTab === 'salesforce' && (
                  <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-4">
                    {SF_SCENARIOS.map((scen, idx) => {
                      const isScenActive = activeScenarioIdx === idx;
                      return (
                        <button
                          key={scen.id}
                          type="button"
                          onClick={() => setActiveScenarioIdx(idx)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer active:scale-95 whitespace-nowrap',
                            isScenActive
                              ? 'bg-white/15 text-white font-semibold border border-white/20 shadow-xs'
                              : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                          )}
                        >
                          {scen.tabLabel}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Prompt Box (Image 1 style) */}
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-4.5 mb-6 shadow-inner">
                  <span className="text-neutral-400 font-mono text-sm select-none">
                    &gt;
                  </span>
                  {activeTab === 'salesforce' ? (
                    <p className="text-xs sm:text-sm font-mono font-medium text-emerald-400 leading-relaxed">
                      Scenario: {currentScenario.title}
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                      {currentTab.prompt}
                    </p>
                  )}
                </div>

                {/* Steps List with Green Ticks and Rotating Yellow Circle Loading */}
                <ol className="space-y-3.5">
                  {(activeTab === 'salesforce'
                    ? currentScenario.steps
                    : currentTab.steps
                  ).map((step, idx) => {
                    const isPassed = step.status === 'passed';
                    return (
                      <motion.li
                        key={step.text}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.08 }}
                        className="flex items-start justify-between gap-3 text-xs sm:text-[13px] leading-relaxed group"
                      >
                        {/* Left: Status Icon + Step Text */}
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 shrink-0">
                            {isPassed ? (
                              /* Green Tick */
                              <CheckCircle2 className="size-4 text-emerald-400" />
                            ) : (
                              /* 3 and 4: Rotating Yellow Circle Loading */
                              <Loader2 className="size-4 text-amber-400 animate-spin" />
                            )}
                          </span>
                          <span
                            className={cn(
                              'font-sans transition-colors',
                              isPassed ? 'text-neutral-200' : 'text-neutral-300'
                            )}
                          >
                            {step.text}
                          </span>
                        </div>

                        {/* Right: Loading Tick Like Feature Badge */}
                        <div className="shrink-0 pl-2">
                          {isPassed ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              <Check className="size-2.5 stroke-[2.5]" />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                              <span className="size-1.5 rounded-full bg-amber-400 animate-ping" />
                              <span>Help Wanted</span>
                            </span>
                          )}
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>

              {/* Bottom Result Pill (Image 1 style) */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono text-[11px] sm:text-xs text-neutral-300 truncate max-w-[280px] sm:max-w-md">
                    {activeTab === 'salesforce'
                      ? currentScenario.result
                      : currentTab.result}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  VERIFIED
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Live Interactive Sandbox with "Apply for Internship" */}
            <div className="relative p-6 sm:p-8 flex flex-col justify-between bg-grid-dots bg-black/25">
              {/* Header Badges: • localhost:3000 & CRM SANDBOX */}
              <div className="flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-black/60 px-2.5 py-1 font-mono text-[11px] text-neutral-300 shadow-xs">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  localhost:3000
                </span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  CRM SANDBOX
                </span>
              </div>

              {/* Center Component Stage with Mouse Tracking in this Area */}
              <div
                onMouseMove={handleStageMouseMove}
                onMouseEnter={handleStageMouseEnter}
                onMouseLeave={handleStageMouseLeave}
                className="relative my-auto py-12 sm:py-16 flex flex-col items-center justify-center gap-4 rounded-2xl overflow-hidden cursor-default select-none"
              >
                {/* Dynamic Mouse Tracking Radial Spotlight */}
                <motion.div
                  className="pointer-events-none absolute size-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-300"
                  style={{
                    left: springX,
                    top: springY,
                    background:
                      'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(147,197,253,0.09) 45%, transparent 75%)',
                    opacity: isHoveringStage ? 1 : 0,
                  }}
                />

                {activeTab === 'salesforce' && (
                  <motion.div
                    style={{
                      perspective: 800,
                      rotateX,
                      rotateY,
                      transformStyle: 'preserve-3d',
                    }}
                    className="relative z-10 flex flex-col items-center gap-3.5 transition-transform duration-75"
                  >
                    {/* The Smart Save Button customized to "Apply for Internship" */}
                    <motion.button
                      ref={applicationButtonRef}
                      type="button"
                      onClick={() => setIsApplicationOpen(true)}
                      whileHover={{ scale: 1.045, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      aria-haspopup="dialog"
                      aria-expanded={isApplicationOpen}
                      className="group flex min-h-[58px] min-w-[270px] items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.08] px-7 text-base font-medium tracking-tight text-white shadow-[0_18px_48px_-18px_rgba(96,165,250,0.7),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl transition-colors hover:bg-white/[0.13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
                    >
                      <span className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.1]">
                        <ArrowRight className="size-4 stroke-[2.2] transition-transform group-hover:translate-x-0.5" />
                      </span>
                      Apply for Internship
                    </motion.button>

                    {/* Non-touchable label: Work on Enterprise Projects */}
                    <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-400 text-xs font-mono tracking-wide select-none pointer-events-none">
                      <Sparkles className="size-3 text-amber-400/80 shrink-0" />
                      <span>Work on Enterprise Projects</span>
                    </div>
                  </motion.div>
                )}
                {activeTab === 'sde' && <TaskStreamSandbox />}
                {activeTab === 'gen-ai' && <DynamicIslandSandbox />}
                {activeTab === 'data-structures' && <DataStructuresSandbox />}
              </div>

              {/* Bottom Telemetry Bar matching Image 1 */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-3 border-t border-white/[0.06] font-mono z-10">
                <span>Spring Mass: 0.9 · Damping: 24</span>
                <span className="text-emerald-400/90">
                  {isHoveringStage
                    ? `Tracking: [${coords.x}px, ${coords.y}px]`
                    : '100% GPU Rendered'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* COMPONENT 2: SALESFORCE CLI TERMINAL CARD & BUTTONS (IMAGE 2)     */}
        {/* ================================================================ */}
        <div className="w-full max-w-[860px] mx-auto mt-10 sm:mt-14 flex flex-col items-center">
          {/* Card Shell */}
          <div className="w-full rounded-2xl border border-white/[0.1] bg-[#121216]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
            {/* Header: Package Manager Tabs & CLI label */}
            <div className="flex items-center justify-between px-5 pt-3.5 pb-2.5 border-b border-white/[0.06] bg-black/30">
              {/* Left Tabs: npm, pnpm, bun, sf cli */}
              <div className="flex items-center gap-1.5 select-none">
                {CLI_TABS.map((tab) => {
                  const isSelected = activeCliTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCliTab(tab.id)}
                      className={cn(
                        'px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer select-none',
                        isSelected
                          ? 'bg-white/12 text-white font-semibold border border-white/15 shadow-xs'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Right Label matching Image 2 */}
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                CLI
              </span>
            </div>

            {/* Command Line Row */}
            <div className="flex items-center justify-between px-5 py-4 bg-black/40">
              <div className="flex items-center gap-3 overflow-x-auto [scrollbar-width:none]">
                <span className="text-neutral-400 font-mono text-sm sm:text-base select-none">
                  $
                </span>
                <code className="text-xs sm:text-sm font-mono text-neutral-100 whitespace-nowrap">
                  {currentCli.command}
                </code>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={() => handleCopyCommand(currentCli.command)}
                className="ml-3 shrink-0 p-2 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                title="Copy command to clipboard"
                aria-label="Copy command"
              >
                {copied ? (
                  <Check className="size-4 text-emerald-400" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons Below the Card (Matching Image 2) */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
            {/* 1. Explore Playground Button (Primary White Pill) */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => {
                document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 rounded-full bg-white text-black hover:bg-neutral-100 font-semibold px-7 py-3 text-sm shadow-[0_0_24px_rgba(255,255,255,0.2)] transition-all cursor-pointer"
            >
              <span>Explore Playground</span>
              <ArrowRight className="size-4 stroke-[2.2]" />
            </motion.button>

            {/* 2. Browse Primitives Button (Secondary Translucent Glass Pill) */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => {
                document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 px-7 py-3 text-sm font-medium transition-all cursor-pointer"
            >
              <span>Browse Primitives</span>
            </motion.button>
          </div>
        </div>
      </div>
      </section>
      <AnimatePresence>
        {isApplicationOpen && (
          <InternshipApplicationSheet onClose={closeApplicationSheet} />
        )}
      </AnimatePresence>
    </>
  );
}

export default LaunchSection;
