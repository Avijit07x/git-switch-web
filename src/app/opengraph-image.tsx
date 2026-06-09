import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/utils";

export const alt = `${siteConfig.name} · ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

// Built with Satori's default fonts so the OG route never breaks on a
// font-fetch failure (Google Fonts serves WOFF2 to modern UAs, which
// Satori can't decompress).
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(60% 50% at 50% 38%, rgba(251,191,36,0.22), rgba(249,115,22,0.06) 55%, transparent 80%), #fcfbf8",
          color: "#0b1220",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #1e293b, #0b1220)",
              display: "flex",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 18,
                top: 8,
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#ffffff",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 21,
                top: 18,
                width: 4,
                height: 16,
                background: "#ffffff",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 21,
                bottom: 18,
                width: 4,
                height: 16,
                background: "linear-gradient(180deg, #fbbf24, #f97316)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 18,
                bottom: 8,
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "linear-gradient(135deg, #fbbf24, #f97316)",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "-0.5px",
              color: "#0b1220",
            }}
          >
            Git Switch
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontSize: 108,
              fontWeight: 500,
              letterSpacing: "-3px",
              color: "#0b1220",
            }}
          >
            The Git client
          </span>
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 108,
              letterSpacing: "-2px",
              backgroundImage: "linear-gradient(90deg, #fbbf24, #f97316)",
              backgroundClip: "text",
              color: "transparent",
              marginTop: 8,
            }}
          >
            for people who ship.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
          }}
        >
          <span
            style={{
              color: "rgba(11,18,32,0.55)",
              fontWeight: 500,
            }}
          >
            Multi-repo  ·  Adaptive sync  ·  Inline diff  ·  AI commits
          </span>
          <span
            style={{
              fontSize: 19,
              color: "rgba(11,18,32,0.45)",
              letterSpacing: "0.5px",
            }}
          >
            git-switch.dev
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
