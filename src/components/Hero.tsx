"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/utils";
import type { DownloadLinks } from "@/lib/version";

import { AppMockup } from "./AppMockup";
import { DownloadButton } from "./DownloadButton";
import { GithubIcon } from "./icons/GithubIcon";

// Above-the-fold hero: eyebrow, headline, sub, two CTAs, mockup.
export function Hero({
  version,
  links,
}: {
  version: string;
  links: DownloadLinks;
}) {
  return (
    <section className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden pb-16 pt-24 md:pb-20 md:pt-32 min-[1200px]:block min-[1200px]:min-h-0 min-[1200px]:pb-28 min-[1200px]:pt-40">
      <div className="paper-grain pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div
        className="pointer-events-none absolute left-1/2 top-32 -z-10 size-[680px] -translate-x-1/2 rounded-full opacity-55 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.83 0.16 85 / 0.55), oklch(0.7 0.19 45 / 0.25) 55%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.a
          href={`${siteConfig.github}/releases/latest`}
          target="_blank"
          rel="noreferrer noopener"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="group mx-auto inline-flex items-center gap-1.5 text-[12px] font-medium text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--foreground)]"
        >
          <Sparkles className="size-3 text-[color:var(--primary)]" />
          <span>Now shipping v{version}</span>
          <ArrowRight className="size-3 opacity-60 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.2, 0.7, 0.2, 1] }}
          className="mx-auto mt-5 max-w-4xl text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.025em] md:text-[80px]"
        >
          The Git client{" "}
          <span className="font-serif italic text-brand-gradient">
            for people who ship.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-balance text-[16px] leading-relaxed text-[color:var(--ink-soft)] md:text-[17px]"
        >
          A native workspace for every repo you own. Switch branches, run
          dev servers, and push without leaving the keyboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          <DownloadButton links={links} version={version} />
          <Button
            asChild
            variant="ghost"
            className="h-9 rounded-full px-4 text-[13px] text-[color:var(--ink-soft)]"
          >
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubIcon className="size-3.5" />
              View source
            </a>
          </Button>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 hidden max-w-6xl px-6 md:mt-20 min-[1200px]:block">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative"
        >
          <div className="pointer-events-none absolute inset-x-12 bottom-[-30px] h-12 rounded-[100%] bg-[oklch(0.12_0.005_60_/_0.10)] blur-2xl" />
          <AppMockup version={version} />
        </motion.div>
      </div>
    </section>
  );
}
