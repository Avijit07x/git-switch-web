"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn, siteConfig } from "@/lib/utils";
import type { DownloadLinks } from "@/lib/version";

import { DownloadButton } from "./DownloadButton";

// Single-responsibility: install CTA. Big paper card with a primary
// download button + a copy-the-clone-command secondary path. The orange
// is concentrated here so it lands as a clear conversion moment, not just
// decoration.
export function Install({
  links,
  version,
}: {
  links: DownloadLinks;
  version: string;
}) {
  return (
    <section
      id="install"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-28 md:py-36"
    >
      <Card className="paper-grain relative overflow-hidden rounded-2xl p-8 md:p-16">
        {/* Soft orange wash in the corner. Subtle, not a "bg gradient". */}
        <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-[color:var(--orange-soft)] blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              <span className="block size-1 rounded-full bg-current" />
              Install
            </p>
            <h2 className="mt-4 text-balance text-[38px] font-medium leading-[1.02] tracking-[-0.02em] md:text-[60px]">
              Get it running{" "}
              <span className="font-serif italic">in under a minute.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[color:var(--ink-soft)]">
              Signed{" "}
              <code className="rounded bg-[color:var(--muted)] px-1.5 py-0.5 font-mono text-[12px]">
                .dmg
              </code>
              ,{" "}
              <code className="rounded bg-[color:var(--muted)] px-1.5 py-0.5 font-mono text-[12px]">
                .msi
              </code>
              , and{" "}
              <code className="rounded bg-[color:var(--muted)] px-1.5 py-0.5 font-mono text-[12px]">
                .AppImage
              </code>{" "}
              builds in every release. macOS, Windows, and Linux.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <DownloadButton links={links} version={version} size="lg" />
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[14px] font-medium text-[color:var(--ink-soft)] underline underline-offset-4 transition-colors hover:text-[color:var(--foreground)]"
              >
                Or build from source →
              </a>
            </div>
          </div>

          <CloneBlock />
        </div>
      </Card>
    </section>
  );
}

function CloneBlock() {
  const cmd = "git clone https://github.com/Avijit07x/git-switch.git";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked, silent no-op */
    }
  };

  return (
    <div className="min-w-0 space-y-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--ink-soft)]">
        Or via terminal
      </p>
      <button
        onClick={handleCopy}
        className="group flex w-full items-center gap-3 rounded-lg border border-[color:var(--border)] bg-white p-4 text-left transition-colors hover:bg-[oklch(0.985_0.005_70)]"
      >
        <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-[color:var(--foreground)]">
          <span className="select-none text-[color:var(--primary)]">$ </span>
          {cmd}
        </span>
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md transition-colors",
            copied
              ? "bg-[color:var(--primary)] text-white"
              : "bg-[color:var(--muted)] text-[color:var(--ink-soft)] group-hover:bg-[color:var(--accent)]",
          )}
          aria-label="Copy"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </span>
      </button>
      <p className="px-1 text-[11px] text-[color:var(--muted-foreground)]">
        Then{" "}
        <code className="font-mono text-[color:var(--ink-soft)]">
          yarn install && yarn tauri:dev
        </code>
      </p>
    </div>
  );
}
