"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn, siteConfig } from "@/lib/utils";
import type { DownloadLinks } from "@/lib/version";

import { DownloadButton } from "./DownloadButton";
import { GithubIcon } from "./icons/GithubIcon";
import { Logo } from "./Logo";

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#preview" },
  { label: "Install", href: "#install" },
];

// Top navigation: brand, section links, GitHub, download.
export function Nav({
  links: downloadLinks,
  version,
}: {
  links: DownloadLinks;
  version: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer if the viewport grows past md.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Smooth-scroll to a section without writing the hash to the URL.
  // Updates active state immediately so the underline doesn't lag behind
  // the IntersectionObserver while the scroll animation finishes.
  const scrollToSection = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveHref(href);
  };

  // Track which section is currently in view. Updates the active nav link.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visibility = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestId = id;
            bestRatio = ratio;
          }
        }
        setActiveHref(bestId && bestRatio > 0 ? `#${bestId}` : null);
      },
      {
        // Treat a section as "in view" when its middle band crosses the
        // viewport. Offsets ignore the fixed 64px header at the top.
        rootMargin: "-64px 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-[color:var(--hairline)] bg-[color:var(--background)]/75 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center gap-2.5"
          aria-label={siteConfig.name}
        >
          <Logo size={28} />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            {siteConfig.name}
          </span>
        </Link>

        {/* Center links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const active = activeHref === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    scroll={false}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(l.href);
                    }}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "group relative inline-flex items-center px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                      active
                        ? "text-[color:var(--foreground)]"
                        : "text-[color:var(--ink-soft)] hover:text-[color:var(--foreground)]",
                    )}
                  >
                    <span>{l.label}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 -bottom-px h-px bg-[color:var(--foreground)] transition-transform duration-200 ease-out",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden h-9 rounded-full px-4 text-[13.5px] sm:inline-flex"
          >
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubIcon className="size-4" />
              GitHub
              <ArrowUpRight className="size-3 opacity-60" />
            </Link>
          </Button>
          <DownloadButton links={downloadLinks} version={version} size="sm" />

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-1 inline-flex size-9 items-center justify-center rounded-md border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--ink-soft)] transition-colors hover:bg-[color:var(--muted)] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="border-t border-[color:var(--hairline)] bg-[color:var(--background)]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto max-w-6xl space-y-1 px-6 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    scroll={false}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      scrollToSection(l.href);
                    }}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-medium text-[color:var(--ink-soft)] transition-colors hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                  >
                    {l.label}
                    <ArrowUpRight className="size-3.5 text-[color:var(--muted-foreground)]" />
                  </Link>
                </li>
              ))}
              <li className="border-t border-[color:var(--hairline)] pt-3">
                <Link
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[14px] font-medium text-[color:var(--ink-soft)] transition-colors hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
