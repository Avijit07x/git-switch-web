import Link from "next/link";

import { siteConfig } from "@/lib/utils";

import { GithubIcon } from "./icons/GithubIcon";
import { Logo } from "./Logo";

// Editorial footer: compact brand + links row at the top, embossed
// letterpress wordmark bleeding off the bottom edge as the visual climax.
export function Footer() {
  const links = [
    { label: "GitHub", href: siteConfig.github },
    { label: "Releases", href: `${siteConfig.github}/releases` },
    { label: "Issues", href: `${siteConfig.github}/issues` },
    {
      label: "License",
      href: `${siteConfig.github}/blob/main/LICENSE`,
    },
  ];

  return (
    <footer className="relative isolate overflow-hidden border-t border-[color:var(--hairline)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(80% 60% at 20% 0%, oklch(0.86 0.10 70 / 0.18), transparent 70%), radial-gradient(60% 50% at 90% 30%, oklch(0.7 0.19 45 / 0.10), transparent 70%)",
        }}
      />
      <div className="paper-grain pointer-events-none absolute inset-0 -z-10 opacity-50" />

      <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={32} />
              <span className="text-[18px] font-semibold tracking-[-0.01em]">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-[color:var(--ink-soft)]">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group relative inline-flex items-center text-[color:var(--foreground)] transition-colors hover:text-[color:var(--primary)]"
                  >
                    <span>{link.label}</span>
                    <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 origin-left bg-[color:var(--primary)] transition-transform duration-200 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <Link
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--ink-soft)] transition-colors hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)]"
              >
                <GithubIcon className="size-4" />
              </Link>
              <Link
                href={`https://twitter.com/${siteConfig.twitter.replace("@", "")}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Twitter / X"
                className="inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--ink-soft)] transition-colors hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="size-3.5"
                >
                  <path d="M18.244 2H21l-6.55 7.49L22 22h-6.83l-4.74-6.21L4.8 22H2.04l7.01-8.02L2 2h6.91l4.28 5.66L18.244 2Zm-2.39 18.21h1.62L7.27 3.7H5.5l10.354 16.51Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none relative mt-12 select-none"
        >
          <p
            className="font-serif italic leading-[0.85] tracking-[-0.04em]"
            style={{
              fontSize: "clamp(120px, 22vw, 320px)",
              marginBottom: "-0.15em",
              color: "oklch(0.93 0.022 75)",
              filter:
                "drop-shadow(0 1px 0 oklch(1 0 0 / 0.9)) drop-shadow(0 -1px 0 oklch(0.22 0.03 250 / 0.08)) drop-shadow(0 3px 6px oklch(0.22 0.03 250 / 0.06))",
            }}
          >
            {siteConfig.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
