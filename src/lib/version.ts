import { siteConfig } from "./utils";

const RELEASES_URL = `https://api.github.com/repos/${siteConfig.github
  .replace(/^https?:\/\/github\.com\//, "")
  .replace(/\.git$/, "")}/releases/latest`;

const RELEASES_PAGE_URL = `${siteConfig.github}/releases/latest`;

type Asset = { name: string; browser_download_url: string };
type Release = { tag_name?: string; assets?: Asset[] };

export type DownloadLinks = {
  mac?: string;
  windows?: string;
  linux?: string;
  /** Fallback when platform detection fails or no matching asset exists. */
  page: string;
};

// One fetch per build cycle, shared by callers. Next.js dedupes identical
// fetch() calls within a request, and ISR caches the response for an hour.
// Falls back gracefully on any failure so the site never breaks on a
// transient API error.
async function getLatestRelease(): Promise<Release | null> {
  try {
    const res = await fetch(RELEASES_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as Release;
  } catch {
    return null;
  }
}

export async function getLatestVersion(): Promise<string> {
  const release = await getLatestRelease();
  return (
    release?.tag_name?.replace(/^v/, "") ?? siteConfig.fallbackVersion
  );
}

// Picks the first asset whose filename matches the given regex. Order in
// the GitHub asset list is preserved, so if you want a specific variant
// (e.g. universal .dmg over arm64), upload it first.
function findAsset(assets: Asset[] | undefined, pattern: RegExp) {
  return assets?.find((a) => pattern.test(a.name))?.browser_download_url;
}

export async function getDownloadLinks(): Promise<DownloadLinks> {
  const release = await getLatestRelease();
  const assets = release?.assets;
  return {
    mac: findAsset(assets, /\.dmg$/i),
    windows: findAsset(assets, /\.(msi|exe)$/i),
    linux: findAsset(assets, /\.(appimage|deb)$/i),
    page: RELEASES_PAGE_URL,
  };
}
