import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: "Git Switch",
  headline: "The Git client for people who ship.",
  tagline:
    "A fast, native Git client for macOS, Windows, and Linux that runs your dev servers too.",
  description:
    "Cross-platform multi-repo Git GUI for macOS, Windows, and Linux with adaptive sync, inline diff viewer, AI commit messages, and PTY-backed dev-server launcher.",
  url: "https://git-switch-web.vercel.app",
  github: "https://github.com/Avijit07x/git-switch",
  twitter: "@avijit07x",
  fallbackVersion: "0.5.3",
} as const;
