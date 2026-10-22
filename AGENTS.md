# AGENTS.md

Guidance for AI coding agents and contributors working in `revisited_labs`.

## Overview
**Revisited Labs** (`https://revisitedlabs.com`) is the master portal and software studio hub showcasing our suite of modern, zero-install remasters of classic desktop software:
- [Hodoku Revisited](https://hodokurevisited.com)
- [Logisim Revisited](https://logisimrevisited.com)
- [Kakuro Revisited](https://kakurorevisited.com)
- [Nonogram Revisited](https://nonogramrevisited.com)

## Architecture
- Zero-dependency static site generator in `src/build.mjs`.
- Outputs static HTML, assets, and `CNAME` directly to `dist/`.
- Automated GitHub Actions deployment via `.github/workflows/pages.yml`.

## Commands
```sh
npm run build      # Generates dist/
npm test           # Runs tests and verifies build integrity
```

## Guidelines
- Keep user-facing copy in **American spelling**.
- Keep dependencies at zero; the site is intentionally fast, pure, and lightweight.
- Ensure all four sister sites remain prominently linked.
