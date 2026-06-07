"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine } from "lucide-react";

import { cn, siteConfig } from "@/lib/utils";
import type { DownloadLinks } from "@/lib/version";

type Platform = "mac" | "windows" | "linux";

const PLATFORM_LABEL: Record<Platform, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
};

function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform ?? "").toLowerCase();
  if (ua.includes("mac") || platform.includes("mac")) return "mac";
  if (ua.includes("win") || platform.includes("win")) return "windows";
  if (ua.includes("linux") || platform.includes("linux")) return "linux";
  return null;
}

// Download CTA: typography-first pill with platform-aware label + version chip.
export function DownloadButton({
  links,
  version,
  size = "default",
  className,
}: {
  links: DownloadLinks;
  version?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const directUrl = platform ? links[platform] : undefined;
  const href = directUrl ?? links.page;
  const isDirect = Boolean(directUrl);
  const platformLabel = platform ? PLATFORM_LABEL[platform] : null;
  const resolvedVersion = version ?? siteConfig.fallbackVersion;

  const isCompact = size === "sm";

  const sizing =
    size === "lg"
      ? "h-12 pl-5 pr-1.5 text-[15px] gap-2.5"
      : isCompact
        ? "h-9 px-4 text-[12.5px] gap-1.5"
        : "h-10 pl-4 pr-1.5 text-[13.5px] gap-2";

  const chipSize =
    size === "lg" ? "h-9 px-2.5 text-[11px]" : "h-7 px-2 text-[10px]";

  return (
    <a
      href={href}
      {...(isDirect
        ? { rel: "noreferrer noopener" }
        : { target: "_blank", rel: "noreferrer noopener" })}
      className={cn(
        "group/dl inline-flex items-center rounded-full bg-[color:var(--ink-strong)] text-white",
        "ring-1 ring-inset ring-white/10",
        "transition-[transform,background-color] duration-200 ease-out",
        "hover:bg-[oklch(0.22_0.04_45)] active:scale-[0.985]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
        sizing,
        className,
      )}
    >
      <ArrowDownToLine
        className={cn(
          "shrink-0 text-[color:var(--primary)] transition-transform duration-300 ease-out",
          "group-hover/dl:translate-y-0.5",
          size === "lg" ? "size-[18px]" : size === "sm" ? "size-[14px]" : "size-4",
        )}
        strokeWidth={2.25}
      />      <span className="font-medium leading-none tracking-tight">
        Download
      </span>      {!isCompact && platformLabel ? (
        <span className="font-medium leading-none text-white/70">
          for <span className="text-white">{platformLabel}</span>
        </span>
      ) : null}      {!isCompact ? (
        <span
          className={cn(
            "ml-auto inline-flex items-center rounded-full bg-[color:var(--primary)] font-mono font-medium leading-none text-white shadow-[inset_0_1px_0_oklch(1_0_0/0.18)]",
            chipSize,
          )}
        >
          v{resolvedVersion}
        </span>
      ) : null}
    </a>
  );
}
