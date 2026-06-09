"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  GitCommitHorizontal,
  Plus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// Editorial proof section: animated workflow loop, stats row, pull-quote.
const STEPS: Array<{ label: string; sub: string; icon: LucideIcon }> = [
  {
    label: "Stage",
    sub: "Optimistic UI flips the list before git even returns.",
    icon: Plus,
  },
  {
    label: "Commit",
    sub: "⌘/Ctrl + Return. Or generate a message with one click.",
    icon: GitCommitHorizontal,
  },
  {
    label: "Push",
    sub: "Async backend, never freezes the UI mid-network.",
    icon: ArrowUpFromLine,
  },
  {
    label: "Pull",
    sub: "Auto-refresh on focus, FS watcher keeps state honest.",
    icon: ArrowDownToLine,
  },
];

const DWELL_MS = 2400;

export function Preview() {
  const stripRef = useRef<HTMLOListElement>(null);
  const inView = useInView(stripRef, { amount: 0.4 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, DWELL_MS);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      id="preview"
      className="relative scroll-mt-20 border-y border-hairline bg-[oklch(0.985_0.005_70)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
          <span className="block size-1 rounded-full bg-[color:var(--primary)]" />
          The workflow
        </p>
        <h2 className="mt-4 max-w-2xl text-balance text-[34px] font-medium leading-[1.05] tracking-[-0.02em] md:text-[52px]">
          Built around the loop you{" "}
          <span className="font-serif italic text-[color:var(--ink-soft)]">
            already run a hundred times a day.
          </span>
        </h2>

        <ol
          ref={stripRef}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--border)] md:grid-cols-4"
        >
          {STEPS.map((step, i) => (
            <Step
              key={step.label}
              n={`0${i + 1}`}
              label={step.label}
              sub={step.sub}
              icon={step.icon}
              index={i}
              active={active === i}
            />
          ))}
        </ol>

        <div className="mt-20 grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-x-8">
          <Stat number="0ms" label="UI block during fetch, pull, or push" />
          <Stat number="1×" label="IPC call for the entire sidebar refresh" />
          <Stat number="200kb" label="JS saved by lazy-loading xterm" />
          <Stat number="100%" label="Native. No Electron, no web shell." />
        </div>

        <div className="mt-20">
          <div className="hr-ink" />
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-3xl text-balance text-center"
        >
          <p className="font-serif text-[28px] italic leading-[1.25] text-[color:var(--foreground)] md:text-[42px]">
            “A Git GUI that feels like an{" "}
            <span className="text-[color:var(--primary)]">extension</span> of
            your terminal, not a replacement for it.”
          </p>
          <footer className="mt-6 text-[13px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
            The point of the whole thing
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}

function Step({
  n,
  label,
  sub,
  icon: Icon,
  index,
  active,
}: {
  n: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  index: number;
  active: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "relative bg-[color:var(--card)] p-7 transition-colors duration-500",
        active && "bg-[oklch(0.99_0.018_72)]",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "font-mono text-[11px] tracking-wider transition-colors duration-500",
            active
              ? "text-[color:var(--foreground)]"
              : "text-[color:var(--muted-foreground)]",
          )}
        >
          {n}
        </span>
        <motion.span
          animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={cn(
            "inline-flex size-7 items-center justify-center rounded-md transition-[background-color,color,box-shadow] duration-500",
            active
              ? "bg-[color:var(--primary)] text-white shadow-[0_4px_14px_oklch(0.7_0.19_45/0.4)]"
              : "bg-[color:var(--orange-soft)] text-[color:var(--primary)]",
          )}
        >
          <Icon className="size-3.5" />
        </motion.span>
      </div>
      <p
        className={cn(
          "mt-4 text-[18px] font-medium tracking-tight transition-colors duration-500",
          active
            ? "text-[color:var(--foreground)]"
            : "text-[color:var(--foreground)]",
        )}
      >
        {label}
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
        {sub}
      </p>

      {active ? (
        <motion.div
          key={`progress-${index}`}
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[color:var(--primary)]"
        />
      ) : null}
    </motion.li>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="border-l border-[color:var(--border)] pl-5"
    >
      <p className="font-serif text-[44px] leading-none tracking-[-0.02em] md:text-[56px]">
        {number}
      </p>
      <p className="mt-3 max-w-[200px] text-[13px] leading-snug text-[color:var(--ink-soft)]">
        {label}
      </p>
    </motion.div>
  );
}
