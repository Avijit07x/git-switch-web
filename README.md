<div align="center">
  <img src="public/logo.svg" alt="Git Switch" width="64" />
  <h1>Git Switch</h1>
  <p><em>The Git client for people who ship.</em></p>
  <p>
    <a href="https://git-switch.dev">git-switch.dev</a> ·
    <a href="https://github.com/Avijit07x/git-switch/releases/latest">Download</a> ·
    <a href="https://github.com/Avijit07x/git-switch">Source</a>
  </p>
</div>

A fast, native Git client for **macOS, Windows, and Linux** that runs your
dev servers too. Built around a multi-repo workflow — group projects,
switch branches, run dev servers, and watch git output without leaving the
keyboard.

## What's inside

- **Multi-repo sidebar** with live status indicators and a filesystem
  watcher, so the UI stays honest while you're in the terminal.
- **Adaptive sync button** that picks the right action — Pull when behind,
  Push when ahead, Publish on a fresh branch, Fetch when even.
- **Inline diff viewer** and commit-history popup. No Monaco bloat.
- **Safe undo** via `git reset --soft` for local commits. Pushed history
  is never rewritten.
- **AI commits** — Conventional-Commits messages from the staged diff via
  Gemini, with graceful fallback.
- **Dev-server launcher** with per-repo xterm tabs, ANSI colors, login-shell
  PATH, and process-group kills.
- **Repo groups** — bundle related repos and start them in parallel.
- **Menu-bar tray** with branch and ahead/behind at a glance.

## Download

Signed `.dmg`, `.msi`, and `.AppImage` builds in every
[release](https://github.com/Avijit07x/git-switch/releases/latest).

**macOS / Linux**

```bash
curl -fsSL https://raw.githubusercontent.com/Avijit07x/git-switch/main/install.sh | bash
```

**Windows**

```powershell
irm https://raw.githubusercontent.com/Avijit07x/git-switch/main/install.ps1 | iex
```

Or grab the installer directly from the latest release.

## Requirements

macOS 10.15+ · Windows 10+ · Linux (`webkit2gtk 4.1+`)

## License

MIT © [Avijit Dey](https://github.com/Avijit07x)
