"use client";

import { motion } from "motion/react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  GitBranch,
  History,
  Layers,
  Sparkles,
  TerminalSquare,
  Undo2,
} from "lucide-react";

import { Card as UICard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Single-responsibility: editorial bento grid. Mixed card sizes break the
// rhythm so the page doesn't read like a SaaS template. Big cards show
// visual content, small cards keep type-only beats.
export function Features() {
  return (
    <section
      id="features"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-28 md:py-36"
    >
      <SectionHeading
        eyebrow="Features"
        title="Everything you need."
        accent="Nothing you don't."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
        <AdaptiveSyncCard />
        <UndoCard />
        <DiffCard />
        <KeyboardCard />
        <HistoryCard />
        <BranchCard />
        <RunCard />
        <AICard />
        <GroupsCard />
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
        <span className="block size-1 rounded-full bg-[color:var(--primary)]" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-[34px] font-medium leading-[1.05] tracking-[-0.02em] md:text-[52px]">
        {title}{" "}
        <span className="font-serif italic text-[color:var(--ink-soft)]">
          {accent}
        </span>
      </h2>
    </div>
  );
}

interface CardProps {
  span?: string;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

function Card({ span = "md:col-span-3", delay = 0, children, className }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className={cn(span)}
    >
      <UICard
        className={cn(
          "group relative h-full overflow-hidden py-0",
          className,
        )}
      >
        {children}
      </UICard>
    </motion.div>
  );
}

// ── Big featured card: adaptive sync ───────────────────────────────────

function AdaptiveSyncCard() {
  return (
    <Card span="md:col-span-4 md:row-span-2">
      <div className="grid h-full grid-rows-[1fr_auto]">
        <div className="flex items-center justify-center p-10">
          <SyncButtonShowcase />
        </div>
        <div className="border-t border-[color:var(--border)] bg-[oklch(0.985_0.005_70)] p-7">
          <h3 className="text-[22px] font-medium tracking-tight">
            One button. The right action, always.
          </h3>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[color:var(--ink-soft)]">
            The primary action follows your branch state. Pull when behind,
            Push when ahead, Publish on a fresh local branch, Fetch when
            you&apos;re even. No more guessing which button to click.
          </p>
        </div>
      </div>
    </Card>
  );
}

function SyncButtonShowcase() {
  const states: Array<{
    icon: typeof ArrowDownToLine;
    label: string;
    sub: string;
    active?: boolean;
  }> = [
    { icon: ArrowDownToLine, label: "Pull (3)", sub: "behind" },
    { icon: ArrowUpFromLine, label: "Push (2)", sub: "ahead", active: true },
    { icon: ArrowUpFromLine, label: "Publish", sub: "no upstream" },
  ];
  return (
    <div className="grid w-full max-w-md gap-2.5">
      {states.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3 transition-colors",
              s.active
                ? "border-[color:var(--primary)]/30 bg-[color:var(--orange-soft)]"
                : "border-[color:var(--border)] bg-white",
            )}
          >
            <span
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-md",
                s.active
                  ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                  : "bg-[color:var(--muted)] text-[color:var(--ink-soft)]",
              )}
            >
              <Icon className="size-3.5" />
            </span>
            <span className="flex-1 text-[13px] font-medium">{s.label}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[color:var(--muted-foreground)]">
              {s.sub}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Undo ───────────────────────────────────────────────────────────────

function UndoCard() {
  return (
    <Card span="md:col-span-2" delay={0.05}>
      <div className="flex h-full flex-col p-6">
        <Undo2 className="size-5 text-[color:var(--primary)]" />
        <h3 className="mt-4 text-[18px] font-medium tracking-tight">
          Safe undo
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
          <code className="rounded bg-[color:var(--muted)] px-1 py-0.5 font-mono text-[11px]">
            git reset --soft HEAD~1
          </code>{" "}
          for local commits only. Pushed history is never rewritten.
        </p>
        <div className="mt-auto pt-6">
          <span className="text-[11px] text-[color:var(--muted-foreground)]">
            Never{" "}
            <code className="font-mono text-[color:var(--destructive)]">--hard</code>.
            Ever.
          </span>
        </div>
      </div>
    </Card>
  );
}

// ── Diff preview ───────────────────────────────────────────────────────

function DiffCard() {
  return (
    <Card span="md:col-span-2" delay={0.1}>
      <div className="flex h-full flex-col">
        <div className="overflow-hidden border-b border-[color:var(--border)] bg-[oklch(0.99_0.005_70)] font-mono text-[10px] leading-relaxed">
          <pre className="m-0 p-3">
            <span className="text-[color:var(--ink-soft)]">@@ -12,3 +12,4 @@</span>
            {"\n"}
            <span className="text-[color:var(--ink-soft)]">  cwd: PathBuf,</span>
            {"\n"}
            <span className="bg-[oklch(0.7_0.2_25_/_0.08)] text-[oklch(0.45_0.18_25)]">
              -    last_event: Mutex&lt;Option&lt;Instant&gt;&gt;,
            </span>
            {"\n"}
            <span className="bg-[oklch(0.72_0.16_162_/_0.10)] text-[oklch(0.42_0.14_162)]">
              +    signal: Arc&lt;(Mutex, Condvar)&gt;,
            </span>
            {"\n"}
            <span className="bg-[oklch(0.72_0.16_162_/_0.10)] text-[oklch(0.42_0.14_162)]">
              +    alive: bool,
            </span>
          </pre>
        </div>
        <div className="p-6">
          <h3 className="text-[18px] font-medium tracking-tight">
            Inline diff viewer
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
            Click any changed file. Read it. Move on. Sticky gutter,
            horizontal scroll, no Monaco bloat.
          </p>
        </div>
      </div>
    </Card>
  );
}

// ── Keyboard shortcuts (NEW) ───────────────────────────────────────────

function KeyboardCard() {
  const shortcuts: Array<{ keys: string[]; label: string }> = [
    { keys: ["⌘", "↵"], label: "Commit" },
    { keys: ["⌘", "R"], label: "Refresh" },
    { keys: ["⌘", "P"], label: "Pull" },
    { keys: ["⌘", "⇧", "P"], label: "Push" },
  ];
  return (
    <Card span="md:col-span-2" delay={0.05}>
      <div className="flex h-full flex-col p-6">
        <h3 className="text-[18px] font-medium tracking-tight">
          Keyboard-first
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
          The mouse is optional. Every common operation has a shortcut you
          can keep in muscle memory. Use{" "}
          <kbd className="rounded border border-[color:var(--border)] bg-white px-1 font-mono text-[10px]">
            Ctrl
          </kbd>{" "}
          on Windows and Linux.
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-2.5">
          {shortcuts.map((s) => (
            <li
              key={s.label}
              className="flex items-center justify-between gap-2 rounded-md border border-[color:var(--border)] bg-[oklch(0.985_0.005_70)] px-2.5 py-1.5"
            >
              <span className="text-[11px] font-medium text-[color:var(--ink-soft)]">
                {s.label}
              </span>
              <span className="flex items-center gap-1">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="inline-flex min-w-[20px] items-center justify-center rounded border border-[color:var(--border)] bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-[color:var(--foreground)] shadow-[0_1px_0_oklch(0_0_0_/_0.06)]"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

// ── History ────────────────────────────────────────────────────────────

function HistoryCard() {
  const commits = [
    { hash: "c4718eb", subject: "perf: block AI scrapers" },
    { hash: "c24a6c9", subject: "feat: sponsors page" },
    { hash: "8f6baae", subject: "feat: QR-code UPI flow" },
  ];
  return (
    <Card span="md:col-span-2" delay={0.15}>
      <div className="flex h-full flex-col">
        <div className="border-b border-[color:var(--border)] p-4">
          <div className="space-y-2">
            {commits.map((c, i) => (
              <div
                key={c.hash}
                className="relative flex items-center gap-2 pl-4"
              >
                {/* Connector — drawn first so the dot's ring masks the
                    intersection. Anchored on the same x as the dot and
                    stretched from this row's middle to the next row's
                    middle (row height + space-y gap = 100% + 0.5rem). */}
                {i < commits.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute left-[5px] top-1/2 h-[calc(100%+0.5rem)] w-px -translate-x-1/2 bg-[color:var(--border)]"
                  />
                ) : null}
                <span className="absolute left-[5px] top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--primary)] ring-2 ring-[color:var(--card)]" />
                <span className="font-mono text-[10px] text-[color:var(--muted-foreground)]">
                  {c.hash}
                </span>
                <span className="truncate text-[11px]">{c.subject}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6">
          <History className="size-5 text-[color:var(--primary)]" />
          <h3 className="mt-3 text-[18px] font-medium tracking-tight">
            Commit history
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
            Last 50 commits with author, hash, and relative time. One
            keystroke from anywhere.
          </p>
        </div>
      </div>
    </Card>
  );
}

// ── Branch tools ───────────────────────────────────────────────────────

function BranchCard() {
  return (
    <Card span="md:col-span-2" delay={0.05}>
      <div className="p-6">
        <GitBranch className="size-5 text-[color:var(--primary)]" />
        <h3 className="mt-3 text-[18px] font-medium tracking-tight">
          Branch tools
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
          Create from scratch, check out remote as local, publish. Every
          path has a dirty-tree guard.
        </p>
      </div>
    </Card>
  );
}

function RunCard() {
  return (
    <Card span="md:col-span-2" delay={0.1}>
      <div className="p-6">
        <TerminalSquare className="size-5 text-[color:var(--primary)]" />
        <h3 className="mt-3 text-[18px] font-medium tracking-tight">
          Real PTY terminals
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
          Per-repo run targets in xterm.js. ANSI colors, login-shell PATH,
          process-group kills.
        </p>
      </div>
    </Card>
  );
}

function AICard() {
  return (
    <Card span="md:col-span-2" delay={0.15}>
      <div className="p-6">
        <Sparkles className="size-5 text-[color:var(--primary)]" />
        <h3 className="mt-3 text-[18px] font-medium tracking-tight">
          AI commits
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
          Conventional-Commits from the staged diff via Gemini. Auto-falls
          back when the model is rate-limited.
        </p>
      </div>
    </Card>
  );
}

function GroupsCard() {
  return (
    <Card span="md:col-span-2" delay={0.2}>
      <div className="p-6">
        <Layers className="size-5 text-[color:var(--primary)]" />
        <h3 className="mt-3 text-[18px] font-medium tracking-tight">
          Repo groups
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
          Bundle related repos. Run, stop, restart in parallel from one
          group button.
        </p>
      </div>
    </Card>
  );
}
