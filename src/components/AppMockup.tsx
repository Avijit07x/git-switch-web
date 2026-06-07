"use client";

import { motion } from "motion/react";
import {
  ChevronDown,
  Download,
  FolderGit2,
  FolderPlus,
  GitBranch,
  Info,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Settings2,
  Sparkles,
  Square,
  Sun,
  Trash2,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn, siteConfig } from "@/lib/utils";

import { Logo } from "./Logo";

// Faux-app window: pixel-faithful recreation of the actual Git Switch UI.
export function AppMockup({
  className,
  version = siteConfig.fallbackVersion,
}: {
  className?: string;
  version?: string;
}) {
  return (
    <Card
      className={cn(
        "relative mx-auto w-full max-w-5xl overflow-hidden py-0",
        "shadow-[0_1px_2px_oklch(0_0_0_/_0.04),0_24px_60px_-24px_oklch(0_0_0_/_0.18)]",
        className,
      )}
    >      <div className="flex items-center gap-2 border-b border-[color:var(--border)] bg-[oklch(0.97_0.005_70)] px-3.5 py-2.5">
        <span className="size-3 rounded-full bg-[oklch(0.7_0.18_25)]" />
        <span className="size-3 rounded-full bg-[oklch(0.82_0.16_80)]" />
        <span className="size-3 rounded-full bg-[oklch(0.65_0.15_140)]" />
        <span className="ml-2 text-[11px] font-medium tracking-tight text-[color:var(--ink-soft)]">
          Git Switch
        </span>
      </div>

      <div className="grid grid-cols-[212px_1fr_252px]">        <aside className="flex flex-col gap-2 border-r border-[color:var(--border)] bg-[oklch(0.985_0.005_70)] p-3 text-[color:var(--foreground)]">          <div className="flex items-center gap-1.5">
            <Logo size={16} />
            <span className="text-[13px] font-semibold leading-none tracking-tight">
              Git Switch
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[color:var(--muted-foreground)]">
              v{version}
            </span>
            <div className="ml-auto flex items-center gap-0.5">
              <SidebarIconBtn>
                <Download className="size-3" />
              </SidebarIconBtn>
              <SidebarIconBtn>
                <Sun className="size-3" />
              </SidebarIconBtn>
            </div>
          </div>          <button className="mt-1 flex w-full items-center gap-1.5 rounded-md border border-[color:var(--border)] bg-white px-2 py-1.5 text-[11px] font-medium text-[color:var(--foreground)]">
            <FolderPlus className="size-3" />
            Add local repository
          </button>
          <p className="text-[9.5px] leading-snug text-[color:var(--muted-foreground)]">
            Pick a folder on your computer. ⌘ +click in the dialog to add
            several at once.
          </p>          <div className="mt-1 flex items-center justify-between">
            <SidebarHeading>Groups</SidebarHeading>
            <SidebarIconBtn>
              <Plus className="size-3" />
            </SidebarIconBtn>
          </div>
          <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[11.5px]">
            <span className="inline-flex size-3 items-center justify-center rounded-[3px] bg-[color:var(--orange-soft)] text-[8px]">
              <FolderGit2 className="size-2.5 text-[color:var(--primary)]" />
            </span>
            <span className="font-medium text-[color:var(--primary)]">
              acme
            </span>
            <span className="ml-auto text-[10px] text-[color:var(--muted-foreground)]">
              5
            </span>
          </div>          <div className="mt-1 flex items-center justify-between">
            <SidebarHeading>Repositories</SidebarHeading>
            <Info className="size-3 text-[color:var(--muted-foreground)]" />
          </div>
          <div className="flex flex-col gap-0.5">
            <RepoRow
              name="monorepo"
              branch="workspace-issues"
              live
              active
            />
            <RepoRow name="api-server" branch="master" count={2} />
            <RepoRow name="web-app" branch="master" live />
            <RepoRow
              name="marketing-site"
              branch="main"
              live
              port="3007"
            />
            <RepoRow name="admin-dashboard" branch="main" live />
            <RepoRow name="git-switch" branch="main" selected />
            <RepoRow name="animateicons" branch="main" />
          </div>          <div className="mt-auto flex items-center gap-1.5 border-t border-[color:var(--border)] pt-2 text-[10px]">
            <span className="inline-flex size-5 items-center justify-center rounded-full border border-[color:var(--border)] bg-white">
              <FolderGit2 className="size-2.5 text-[color:var(--ink-soft)]" />
            </span>
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="font-medium text-[color:var(--foreground)]">
                No profile
              </span>
              <span className="flex items-center gap-1 text-[8.5px] text-[color:var(--muted-foreground)]">
                <span className="inline-flex items-center gap-0.5">
                  <span className="size-1 rounded-full bg-[color:var(--muted-foreground)]" />
                  System SSH
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-sm bg-[oklch(0.7_0.19_45_/_0.14)] px-1 py-px font-semibold text-[color:var(--primary)]">
                  <Sparkles className="size-2" />
                  AI
                </span>
              </span>
            </div>
            <Settings2 className="ml-auto size-3 text-[color:var(--muted-foreground)]" />
          </div>
        </aside>        <main className="flex min-w-0 flex-col gap-3 bg-[color:var(--background)] p-3.5">          <motion.header
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-1.5 text-[11.5px]"
          >
            <FolderGit2 className="size-3.5 text-[color:var(--ink-soft)]" />
            <span className="font-semibold">monorepo</span>
            <span className="text-[color:var(--muted-foreground)]">
              /Users/avi/Code/monorepo
            </span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-[color:var(--border)] bg-white px-1.5 py-0.5 text-[10.5px]">
              <GitBranch className="size-2.5" /> workspace-issues
            </span>
            <span className="inline-flex items-center rounded-md bg-[oklch(0.72_0.16_162_/_0.18)] px-1.5 py-0.5 text-[10.5px] font-medium text-[oklch(0.42_0.14_162)]">
              clean
            </span>
          </motion.header>          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-md border border-[color:var(--border)] bg-white p-3"
          >
            <div className="grid grid-cols-[1fr_auto_1fr_auto] items-end gap-2">
              <div>
                <p className="mb-1 text-[10px] font-medium text-[color:var(--ink-soft)]">
                  Local branch
                </p>
                <FauxSelect value="workspace-issues" icon />
              </div>
              <PrimaryButton>Switch</PrimaryButton>
              <div>
                <p className="mb-1 text-[10px] font-medium text-[color:var(--ink-soft)]">
                  Remote branch (check out as local)
                </p>
                <FauxSelect value="Select remote branch" muted icon />
              </div>
              <OutlineButton>Check out</OutlineButton>
            </div>

            <div className="my-3 h-px bg-[color:var(--border)]" />

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--primary)] px-3 py-1.5 text-[11px] font-semibold text-[color:var(--primary-foreground)] shadow-[0_1px_2px_oklch(0_0_0_/_0.06),0_6px_16px_-6px_oklch(0.68_0.18_48_/_0.45)]"
              >
                <Download className="size-3" />
                Fetch
              </motion.button>
              <button className="inline-flex size-7 items-center justify-center rounded-md border border-[color:var(--border)] bg-white text-[color:var(--ink-soft)]">
                <MoreHorizontal className="size-3" />
              </button>
            </div>
            <p className="mt-2 font-mono text-[10px] text-[color:var(--muted-foreground)]">
              4803247 · feat(ChatSurface): resolve threadId for typing
              indicators
            </p>
          </motion.div>          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-md border border-[color:var(--border)] bg-white"
          >
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="text-[12px] font-semibold">Changes</span>
              <div className="ml-auto flex items-center gap-1">
                <SmallOutlineBtn>Stage selected</SmallOutlineBtn>
                <SmallOutlineBtn>Stage all</SmallOutlineBtn>
                <SmallOutlineBtn>Unstage selected</SmallOutlineBtn>
                <button className="px-2 py-1 text-[10px] font-medium text-[color:var(--ink-soft)]">
                  Refresh
                </button>
              </div>
            </div>
            <div className="flex h-[90px] items-center justify-center border-y border-[color:var(--border)] text-[11.5px] text-[color:var(--muted-foreground)]">
              Working tree clean.
            </div>
            <p className="px-3 py-1.5 text-[10px] text-[color:var(--muted-foreground)]">
              Tip: hold{" "}
              <kbd className="inline-flex items-center rounded-sm border border-[color:var(--border)] bg-[color:var(--muted)] px-1 font-mono text-[9px] font-medium text-[color:var(--foreground)]">
                Shift
              </kbd>{" "}
              to select a range.
            </p>
          </motion.div>          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-md border border-[color:var(--border)] bg-white p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold">Commit message</span>
              <span className="text-[10px] text-[color:var(--muted-foreground)]">
                0 files staged
              </span>
            </div>
            <div className="relative h-[52px] rounded-md border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-2">
              <p className="text-[10.5px] text-[color:var(--muted-foreground)]">
                Describe your change… ⌘↵ to commit
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="ml-0.5 inline-block h-[1em] w-[1.5px] align-middle bg-[color:var(--foreground)]"
                />
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <button className="inline-flex items-center gap-1 rounded-md border border-[color:var(--border)] bg-white px-2 py-1 text-[10px] font-medium text-[color:var(--ink-soft)]">
                <Sparkles className="size-2.5 text-[color:var(--primary)]" />
                Generate with Gemini
              </button>
              <button className="inline-flex items-center gap-1 rounded-md bg-[oklch(0.7_0.19_45_/_0.35)] px-3 py-1 text-[10px] font-semibold text-white">
                <GitBranch className="size-2.5 rotate-90" />
                Commit
              </button>
            </div>
            <p className="mt-1.5 text-[9.5px] text-[color:var(--muted-foreground)]">
              Stage at least one file to enable commit.
            </p>
          </motion.div>
        </main>        <aside className="flex flex-col gap-3 border-l border-[color:var(--border)] bg-[oklch(0.985_0.005_70)] p-3 text-[color:var(--foreground)]">          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[color:var(--ink-soft)]">
                Command output
              </span>
              <button className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] text-[color:var(--ink-soft)]">
                <Trash2 className="size-2.5" />
                Clear
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              <CommandEntry
                time="8:34:57 PM"
                cmd="git switch workspace-issues"
                lines={[
                  "Your branch is up to date with",
                  "'origin/workspace-issues'.",
                  "Switched to branch 'workspace-issues'",
                ]}
              />
              <CommandEntry
                time="8:34:49 PM"
                cmd="git fetch --all --prune"
              />
              <CommandEntry
                time="8:34:45 PM"
                cmd="git switch main"
                lines={[
                  "Your branch is up to date with",
                  "'origin/main'.",
                  "Switched to branch 'main'",
                ]}
              />
            </div>
          </motion.section>          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1 rounded-md bg-[color:var(--primary)] px-2 py-1 text-[10px] font-semibold text-[color:var(--primary-foreground)] shadow-[0_1px_2px_oklch(0_0_0_/_0.06),0_6px_16px_-6px_oklch(0.68_0.18_48_/_0.45)]"
              >
                <Play className="size-2.5 fill-current" />
                Run all
              </motion.button>
              <RunIconBtn>
                <Square className="size-2.5" />
              </RunIconBtn>
              <RunIconBtn>
                <RefreshCw className="size-2.5" />
              </RunIconBtn>
              <Settings2 className="ml-auto size-3 text-[color:var(--ink-soft)]" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="inline-flex items-center gap-0.5 rounded-md border border-[color:var(--border)] bg-white px-1.5 py-0.5">
                <GitBranch className="size-2.5" /> workspace-issues
              </span>
              <span className="text-[color:var(--muted-foreground)]">
                1 target
              </span>
            </div>

            <div className="mt-1 flex items-center gap-1">
              <button className="inline-flex items-center gap-1 rounded-md bg-[oklch(0.7_0.19_45_/_0.35)] px-2 py-1 text-[10px] font-semibold text-white">
                <Play className="size-2.5 fill-current" />
                Run
              </button>
              <RunIconBtn>
                <Square className="size-2.5" />
              </RunIconBtn>
              <RunIconBtn>
                <RefreshCw className="size-2.5" />
              </RunIconBtn>
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-[oklch(0.42_0.14_162)]">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="size-1.5 rounded-full bg-[oklch(0.72_0.16_162)]"
                />
                RUNNING
              </span>
              <span className="font-mono text-[10px] text-[color:var(--ink-soft)]">
                y dev
              </span>
            </div>
          </motion.section>          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[color:var(--ink-soft)]">
                Terminal
              </span>
              <span className="inline-flex items-center rounded-sm bg-[oklch(0.72_0.16_162_/_0.2)] px-1 py-px text-[8.5px] font-semibold text-[oklch(0.42_0.14_162)]">
                RUNNING
              </span>
              <button className="ml-auto text-[10px] text-[color:var(--ink-soft)]">
                Clear
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex-1 rounded-md border border-[color:var(--border)] bg-white p-2"
            >
              <p className="font-mono text-[10px] leading-snug">
                <span className="text-[color:var(--muted-foreground)]">
                  8:34:57 PM
                </span>{" "}
                <span className="text-[oklch(0.55_0.18_260)]">[vite]</span> hmr
                update onnections.tsx
              </p>
            </motion.div>
          </motion.section>
        </aside>
      </div>
    </Card>
  );
}

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[color:var(--muted-foreground)]">
      {children}
    </span>
  );
}

function SidebarIconBtn({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex size-4 items-center justify-center rounded-sm text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)]">
      {children}
    </span>
  );
}

function RepoRow({
  name,
  branch,
  live = false,
  port,
  count,
  active = false,
  selected = false,
}: {
  name: string;
  branch: string;
  live?: boolean;
  port?: string;
  count?: number;
  active?: boolean;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[11.5px]",
        active && "bg-[oklch(0.97_0.04_70)]",
        selected && "bg-[oklch(0.96_0.05_85)]",
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col leading-tight">
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "truncate font-medium",
              active && "text-[color:var(--foreground)]",
            )}
          >
            {name}
          </span>
          {live && <LiveBadge port={port} />}
          {count !== undefined && (
            <span className="inline-flex items-center gap-0.5 rounded-sm bg-[oklch(0.72_0.16_162_/_0.18)] px-1 py-px text-[8.5px] font-semibold text-[oklch(0.42_0.14_162)]">
              <span className="size-1 rounded-full bg-[oklch(0.42_0.14_162)]" />
              {count}
            </span>
          )}
        </div>
        <span className="truncate text-[9.5px] text-[color:var(--muted-foreground)]">
          {branch}
        </span>
      </div>
    </div>
  );
}

function LiveBadge({ port }: { port?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-sm bg-[oklch(0.72_0.16_162_/_0.18)] px-1 py-px text-[8.5px] font-semibold text-[oklch(0.42_0.14_162)]">
      <span className="size-1 rounded-full bg-[oklch(0.55_0.16_162)]" />
      live{port ? ` :${port}` : ""}
    </span>
  );
}

function FauxSelect({
  value,
  muted = false,
  icon = false,
}: {
  value: string;
  muted?: boolean;
  icon?: boolean;
}) {
  return (
    <div className="flex h-7 items-center gap-1.5 rounded-md border border-[color:var(--border)] bg-white px-2 text-[10.5px]">
      {icon && (
        <GitBranch className="size-2.5 text-[color:var(--ink-soft)]" />
      )}
      <span
        className={cn(
          "flex-1 truncate",
          muted
            ? "text-[color:var(--muted-foreground)]"
            : "text-[color:var(--foreground)]",
        )}
      >
        {value}
      </span>
      <ChevronDown className="size-2.5 text-[color:var(--ink-soft)]" />
    </div>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-7 rounded-md bg-[color:var(--primary)] px-3 text-[10.5px] font-semibold text-[color:var(--primary-foreground)] shadow-[0_1px_2px_oklch(0_0_0_/_0.06)]">
      {children}
    </button>
  );
}

function OutlineButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-7 rounded-md border border-[color:var(--border)] bg-white px-3 text-[10.5px] font-medium text-[color:var(--foreground)]">
      {children}
    </button>
  );
}

function SmallOutlineBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-md border border-[color:var(--border)] bg-white px-1.5 py-0.5 text-[9.5px] font-medium text-[color:var(--ink-soft)]">
      {children}
    </button>
  );
}

function RunIconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex size-6 items-center justify-center rounded-md border border-[color:var(--border)] bg-white text-[color:var(--ink-soft)]">
      {children}
    </button>
  );
}

function CommandEntry({
  time,
  cmd,
  lines = [],
}: {
  time: string;
  cmd: string;
  lines?: string[];
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-[oklch(0.42_0.14_162)]">
          <span className="size-1.5 rounded-full bg-[oklch(0.55_0.16_162)]" />
          OK
        </span>
        <span className="font-mono text-[9.5px] text-[color:var(--muted-foreground)]">
          {time}
        </span>
      </div>
      <p className="font-mono text-[10px] text-[color:var(--foreground)]">
        <span className="text-[color:var(--muted-foreground)]">$</span> {cmd}
      </p>
      {lines.map((line) => (
        <p
          key={line}
          className="font-mono text-[10px] leading-snug text-[color:var(--ink-soft)]"
        >
          {line}
        </p>
      ))}
    </div>
  );
}
