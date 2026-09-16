# Release checklist

Use this checklist against the exact commit and exported artifact intended for production. Automated checks are necessary, but they do not replace the manual accessibility pass.

## Release record

- Commit SHA: pending release commit
- Artifact/run URL: local staged export
- Tester: Sergey Dushevski (project-owner verification)
- Date: 2026-09-16
- Windows version: not recorded
- Chrome version: not recorded
- Firefox version: not recorded
- NVDA version: not recorded
- Result: manual accessibility gate passed; environment versions were not captured
- Linked issues/exceptions: none

## Automated gate

- [x] `npm ci` completes on Node 24 and npm 11.
- [x] `npm run verify` passes.
- [ ] The GitHub Actions build job passes for the release commit.
- [ ] The deployment job uses the artifact produced by that build.
- [ ] The post-deployment page and `telhai-logo.svg` checks pass.
- [ ] Branch protection requires the build job before merge.

## Manual accessibility gate

- [x] Keyboard-only journey passes in current Chrome at 100% and 200% zoom.
- [x] Keyboard-only journey passes in current Firefox at 100% and 200% zoom.
- [x] Skip link moves focus to the single primary `main` landmark.
- [x] Header links, selected work, external links, and email contact are reachable with visible focus.
- [x] Mobile navigation announces its state, closes with Escape, and restores focus to its trigger.
- [x] Reflow passes at 1280 CSS pixels with 400% zoom and at 320, 375, and 390 CSS-pixel widths.
- [x] NVDA with Chrome announces landmarks, headings, the current role, dates, proof points, link purposes, and menu state correctly.
- [x] Reduced-motion reload has no continuous animation and disables nonessential smooth motion.
- [x] Windows High Contrast preserves text, controls, focus indicators, and boundaries.
- [x] WCAG text-spacing overrides cause no clipping, overlap, or lost controls.
- [x] There are no open severity-1 or severity-2 accessibility defects.

## Content and privacy gate

- [x] The latest engagement is anonymized unless explicit employer-name approval is recorded.
- [x] Its public dates read `Apr 2026 - Aug 11, 2026`.
- [x] No phone number, unverified LinkedIn URL, internal identifier, or downloadable CV is published.
- [x] Claims remain qualitative unless their measurements and publication approval are recorded.
- [x] Every public project and package link has been checked manually.

## Rollback

If the deployed smoke check or a critical manual journey fails:

1. Stop promotion and record the failing workflow, commit, URL, and reproduction.
2. Re-run the last known-good GitHub Pages deployment from its successful workflow run, or revert the failing commit and let the normal verified workflow deploy the revert.
3. Confirm the canonical page and `telhai-logo.svg` return successful responses.
4. Repeat the affected automated and manual checklist rows before closing the incident.
