import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/utils";

export const alt = `${siteConfig.name} · ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

async function loadGoogleFont(
  family: string,
  weight: number,
  italic = false,
): Promise<ArrayBuffer | null> {
  try {
    const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+",
    )}:${axis}&display=swap`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      },
    });
    if (!res.ok) return null;
    const css = await res.text();
    const match = css.match(
      /src:\s*url\(([^)]+)\)\s*format\(['"]?(?:opentype|truetype|woff2?)['"]?\)/,
    );
    if (!match || !match[1]) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OG() {
  const [interMedium, interSemibold, instrumentItalic, jetBrainsMono] =
    await Promise.all([
      loadGoogleFont("Inter", 500),
      loadGoogleFont("Inter", 600),
      loadGoogleFont("Instrument Serif", 400, true),
      loadGoogleFont("JetBrains Mono", 500),
    ]);

  const fonts: NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"] = [];
  if (interMedium) fonts.push({ name: "Inter", data: interMedium, weight: 500, style: "normal" });
  if (interSemibold) fonts.push({ name: "Inter", data: interSemibold, weight: 600, style: "normal" });
  if (instrumentItalic) fonts.push({ name: "Instrument Serif", data: instrumentItalic, weight: 400, style: "italic" });
  if (jetBrainsMono) fonts.push({ name: "JetBrains Mono", data: jetBrainsMono, weight: 500, style: "normal" });

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
          fontFamily: "Inter",
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
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 14,
                top: 10,
                width: 6,
                height: 18,
                borderRadius: 3,
                background: "#ffffff",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 14,
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
                right: 14,
                bottom: 10,
                width: 6,
                height: 18,
                borderRadius: 3,
                background:
                  "linear-gradient(180deg, #fbbf24, #f97316)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 14,
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
              fontSize: 110,
              fontWeight: 500,
              letterSpacing: "-3px",
              color: "#0b1220",
            }}
          >
            The Git client
          </span>
          <span
            style={{
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 110,
              letterSpacing: "-2px",
              backgroundImage: "linear-gradient(90deg, #fbbf24, #f97316)",
              backgroundClip: "text",
              color: "transparent",
              marginTop: 6,
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
              fontFamily: "JetBrains Mono",
              fontWeight: 500,
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
      fonts,
    },
  );
}
