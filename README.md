# Sergey Dushevski — Portfolio

A fast, accessible, single-page portfolio for a senior full-stack and mobile developer. The site is built as a static Next.js export and deployed to GitHub Pages.

## What is implemented

- Evidence-led hero, project, experience, skills, education, and contact sections
- Keyboard-friendly navigation, visible focus states, skip link, reduced-motion support, and semantic landmarks
- Centralized, typed portfolio content in `src/content/portfolio.ts`
- Privacy-conscious public profile: no phone number, unverified social links, or downloadable CV
- Anonymized enterprise banking engagement ending August 11, 2026
- Deferred Three.js hero built from one instanced mesh, with reduced-motion, offscreen pause, and WebGL-loss fallbacks
- First-party project captures for recent live work, including Deadlock Draft Oracle, Domino Fill, GreenPark, and DitherIT
- Canonical, Open Graph, robots, and sitemap metadata
- Static export configured for the `/SergeyPortfolio` GitHub Pages base path

## Requirements

- Node.js 24 LTS (see `.node-version` and `.nvmrc`)
- npm 11

## Local development

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. Development uses the site root; production automatically uses the `/SergeyPortfolio` base path.

The local smoke suite uses an installed Google Chrome. CI installs the Chromium revision pinned by Playwright before running the same suite. Before a production promotion, complete `docs/RELEASE_CHECKLIST.md` against the exact deployment artifact.

## Verification

```bash
npm run verify
npm audit --omit=dev --audit-level=high
```

`npm run verify` runs the dependency policy, ESLint, TypeScript, production build, and browser smoke suite. The generated static site is written to `out/`.

## Content updates

Edit `src/content/portfolio.ts` for profile, proof points, experience, projects, skills, education, certifications, and languages. Components render from that typed source instead of duplicating content.

Contact and deployment settings live in:

- `src/components/Contact.tsx`
- `src/lib/site.ts`
- `next.config.js`
- `.github/workflows/deploy.yml`

Only publish personal details, employer names, metrics, links, or documents after they have been explicitly verified and approved for public use.

## Project structure

```text
src/
  app/          App Router entry points, metadata, and global styles
  components/   Page sections and navigation
  content/      Canonical portfolio content
  lib/          Site URL and base-path helpers
  types/        Portfolio data contracts
docs/           Product and implementation specification
public/         First-party static assets
```

## Deployment

The GitHub Actions workflow validates pull requests and deploys pushes to `main` or `master` to GitHub Pages. Repository Pages settings must use GitHub Actions as the source.

## License

MIT
