import { ImageResponse } from "next/og";

import { getLatestVersion } from "@/lib/version";

export const alt = "Git Switch · the Git client for people who ship";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Single-responsibility: dynamic OG image. Editorial light surface with a
// serif headline plus a single orange accent. Mirrors the site itself.
export default async function OG() {
  const version = await getLatestVersion();
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
            "radial-gradient(60% 50% at 95% 5%, rgba(248,140,80,0.16), transparent 70%), #fcfbf8",
          color: "#181814",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(24,24,20,0.55)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#ed7a3a",
            }}
          />
          GIT SWITCH · v{version}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontSize: 104,
              fontWeight: 500,
              letterSpacing: "-3px",
              lineHeight: 1.0,
              margin: 0,
              maxWidth: 1000,
            }}
          >
            The Git client
          </h1>
          <h1
            style={{
              fontSize: 104,
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-3px",
              lineHeight: 1.0,
              margin: 0,
              color: "#ed7a3a",
            }}
          >
            for people who ship.
          </h1>
        </div>

        <p
          style={{
            fontSize: 28,
            lineHeight: 1.3,
            color: "rgba(24,24,20,0.6)",
            maxWidth: 720,
            margin: 0,
          }}
        >
          Multi-repo · Adaptive sync · Inline diff · AI commits · PTY-backed
          dev servers.
        </p>
      </div>
    ),
    { ...size },
  );
}
