# Portfolio Improvement Specification

**Status:** Implementing
**Owner:** Sergey Dushevski
**Target:** `sergeydus.github.io/SergeyPortfolio`
**Version:** 1.2
**Last updated:** 2026-09-12

## 1. Executive summary

The portfolio should be repositioned from a visually polished but generic developer profile into a fast, accessible, evidence-led portfolio for a senior full-stack and mobile engineer. The strongest differentiators are not currently visible: React Native delivery, accessibility leadership, test-automation ownership, mobile performance work, and the most recent 2026 experience.

The first release must do three things before adding more visual polish:

1. Make the public content accurate and current.
2. Make the WebGL hero safe, optional, and measurably performant.
3. Make builds and deployments reproducible behind a blocking quality gate.

The recommended implementation keeps Next.js static export and GitHub Pages. A CMS, backend, contact form, and broad redesign are intentionally out of scope until the content, accessibility, performance, and release foundations are sound.

### Priority and release model

- **P0 - Launch MVP:** required before the improved site is promoted to production.
- **P1 - Hardening:** valuable follow-on work; not a launch blocker unless it fixes a regression in a P0 journey.
- **P2 - Post-launch operation:** optional measurement and optimization after privacy approval and a traffic baseline.

Phase numbers describe dependency order; priorities describe release criticality. “Launch MVP” means the first production release governed by this specification.

The Launch MVP includes approved/current public facts and three evidence-backed proof points; a readable WebGL-disabled and reduced-motion fallback; accessible navigation, contact, and conditionally approved résumé journeys; repository-owned media used by those journeys; a pinned and patched runtime with reproducible export; and a required PR gate covering install, dependency-risk policy, lint, typecheck, build, base-path checks, a minimal browser smoke test, and axe on the primary page. Deployment must use that exact verified artifact.

Full case-study redesign, comprehensive social/structured metadata, broader hydration reduction, visual regression, multi-mode Lighthouse automation, scheduled external-link checks, analytics, and operational service targets are P1 or P2.

## 2. Inputs and evidence policy

This specification is based on:

- The current repository. The existing ignored `out/` directory was treated only as a stale structural reference, not as a current performance baseline.
- An independent product/UX review.
- An independent Next.js/architecture review.
- An independent quality, performance, accessibility, and release review.
- `SergeyDushevskiCV.pdf`, supplied by the owner as the proposed public career source of truth.
- `shimua-leavebehind.pdf`, supplied as private background context.

The leave-behind is not a public-content source. It contains employment-process context, internal identifiers, counts, and implementation details. None of those details may be published, paraphrased into claims, or added to metadata without separate, explicit approval. It may only inform high-level themes already supported by the public CV, such as accessibility ownership, root-cause analysis, automation infrastructure, and engineering rigor.

### 2.1 Owner decision register

Resolve each decision before the affected content or behavior ships and record it in the owner-approved content worksheet. If a decision is still open at its gate, use the privacy-preserving default below; unrelated work may continue.

| ID | Decision | Owner | Decision gate | Default if not approved | Status |
| --- | --- | --- | --- | --- | --- |
| D1 | Publish the completed Matrix role, including title and confirmed dates of April 2026 through August 11, 2026 | Sergey Dushevski | Before R1 content ships | Omit employer-specific Matrix content | Dates confirmed; publication open |
| D2 | Publish a phone number | Sergey Dushevski | Before contact or metadata changes ship | Do not publish a phone number | Open |
| D3 | Add the supplied CV as a downloadable public asset | Sergey Dushevski | Before the PDF enters the repository or export | Do not add the PDF or a download action | Open |
| D4 | Use the LinkedIn URL from the CV or current site | Sergey Dushevski | Before external-profile links ship | Publish neither URL until the canonical URL is approved | Open |
| D5 | Publish each quantified achievement or named confidential client | Sergey Dushevski | Before proof points or case studies ship | Use qualitative, anonymized wording from an approved public source | Open |
| D6 | Retain WebGL after its implementation time box | Sergey Dushevski | At the Phase 2 performance review | Ship a non-WebGL fallback | Approved September 12, 2026; implement a deferred instanced Three.js scene and keep the fallback path |

When sources disagree, the affected fact, claim, or link must not ship until approval is recorded. Unaffected work may continue, and unresolved items use the defaults above. Do not silently merge dates, titles, employers, contact links, or quantified claims.

Recorded owner correction: the Matrix engagement ended on August 11, 2026. This direct correction supersedes the CV's “Present” label. Any downloadable CV must be corrected before publication.

## 3. Current-state findings

### 3.1 Content integrity

The site is materially behind the supplied CV:

- The completed Matrix role, from April 2026 through August 11, 2026, is absent from `src/components/Experience.tsx`.
- The supplied CV still labels Matrix as “Present” and must be corrected before it can become a public download.
- Freelance is shown as January 2025 to current on the site, while the CV shows December 2025 to March 2026.
- The site says “6+ years” in both the hero and About section; the CV says “7+ years.”
- The site positions Sergey as a generic “Fullstack Developer.” The CV supports the more differentiated “Senior Full-Stack & Mobile Developer” positioning.
- React Native, mobile performance, accessibility leadership, testing, certifications, and languages are missing or understated.
- The LinkedIn path in `Contact.tsx` differs from the one in the CV and must be verified before release.
- There is no résumé download action.

This is the highest-impact product problem because recruiter trust depends on consistency across the site, CV, LinkedIn, and GitHub.

### 3.2 Experience and project storytelling

The portfolio has useful facts but presents most work as long descriptive cards. It does not consistently answer the recruiter’s core questions: what was difficult, what Sergey owned, what changed, and how the result was measured.

The current content already contains credible outcomes that should be elevated:

- Up to 80% improvement in backend load times at FirstOffer.
- Up to 60% improvement in application boot time on Mekome.
- Migration ownership from Vue 2 to Vue 3.
- Accessibility-first mobile and set-top-box work for older adults.

The CV adds public-safe evidence around enterprise mobile delivery, accessibility standards, reusable accessible components, CI enforcement, and VoiceOver/TalkBack testing. These should become first-class capabilities rather than another list of skills.

### 3.3 Performance and resilience

`src/components/Hero2.tsx` creates 800 separate geometries, materials, and meshes plus 800 clones. Each animation frame renders, raycasts across scene children, and updates every box. The effect runs continuously and has no offscreen pause, document-visibility pause, reduced-motion mode, resize handling, WebGL fallback, or complete resource disposal.

The full Three.js package is eagerly imported into a client component. This makes a decorative effect compete with the name, positioning, and calls to action that form the page’s actual primary content.

Experience media is loaded from hashed build artifacts owned by an older `/Portfolio/` deployment. Four raw `<img>` elements produce lint warnings, and the experience images have fragile cross-repository URLs.

### 3.4 Accessibility and interaction

The page has reasonable semantic headings and link text, but important gaps remain:

- No skip link.
- The site header is rendered inside `<main>`.
- The mobile-menu button lacks `aria-expanded` and `aria-controls`.
- No documented Escape behavior, focus return, or focus treatment for the mobile menu.
- JavaScript smooth-scroll handlers prevent native fragment behavior and URL hash updates.
- Fixed-header destinations have no explicit scroll margin.
- Continuous WebGL and CSS animations do not honor `prefers-reduced-motion`.
- Decorative canvas/SVG content is not consistently hidden from assistive technology.
- The paired animated Sparko images expose weak, redundant alternatives.
- Hover-centric treatments lack a consistent `focus-visible` system, and bright DitherIT green (`#00FF00`) on a light card is a specific contrast risk.
- Fixed `text-5xl` section headings, a long mobile wordmark, and single-row experience title/date headers need validation at narrow widths and high zoom.

### 3.5 Architecture and maintainability

Portfolio data is embedded directly in large render components: `Experience.tsx` is 258 lines and `Projects.tsx` is 199 lines. `Projects.tsx` uses an explicit `any`, optional flags implicitly define incompatible card variants, and several mapped entities use array indexes as keys.

Several client boundaries are broader than necessary. `Education.tsx` is a client component without client behavior. The experience section hydrates entirely for one image transition, and the hero stays client-side partly because of an unreachable “lens” branch.

Metadata includes only a title and generic description. Canonical metadata, Open Graph/Twitter data, sitemap, robots output, and Person/Profile structured data are absent.

### 3.6 Tooling, security, and release quality

Verified locally on 2026-09-11:

- TypeScript check passes.
- Lint exits successfully with four `@next/next/no-img-element` warnings.
- `npm audit --omit=dev --audit-level=high` reports four high/critical advisories in the non-development dependency tree: three high and one critical, through Next.js dependencies including `nanoid`/PostCSS and `sharp`. Dependency-tree placement does not by itself establish exposure in the browser-served static artifact; R8 requires reachability and build-pipeline triage.
- React runtime packages are major version 18 while React type packages are major version 19.
- `next lint` is deprecated and scheduled for removal in Next.js 16.
- There are no project-owned automated tests, accessibility checks, Lighthouse budgets, or link checks.
- The GitHub Actions workflow deploys direct pushes but does not validate pull requests.
- Pages and OIDC write permissions are granted at workflow scope rather than only to deployment.
- Node 20 is selected in CI but no local runtime is pinned through `engines`, `.nvmrc`, or `.node-version`.
- Local production-build attempts were not reproducible in the shared review environment: one reached page-data collection before a missing generated manifest, while independent attempts on Node 25 exhausted the local V8 heap. This is evidence of an environment/reproducibility gap, not proof of a source-level or GitHub Actions failure.

The README also claims Next.js 14, documents `/` as the development URL despite the fixed base path, and recommends `next start` even though the application is configured for static export.

## 4. Product goals

### Primary goals

1. A recruiter can understand Sergey’s seniority, specialization, strongest evidence, and availability in under 30 seconds.
2. Every public career fact matches an owner-approved source of truth.
3. The first viewport remains useful with JavaScript disabled, WebGL unavailable, or reduced motion enabled.
4. The experience meets WCAG 2.2 AA for the implemented journeys and has automated regression coverage.
5. The site consistently achieves a mobile Lighthouse performance score of at least 90 under the agreed test profile.
6. Every production deployment is built from a pinned environment and the exact verified artifact.

### Secondary goals

- Improve search and social-share presentation.
- Make content edits safe, typed, and independent of component layout.
- Turn project and experience sections into evidence-led case studies.
- Detect broken deployments, assets, and important external links.

### Non-goals

- Adding a CMS or database.
- Adding authentication or a private admin area.
- Adding a server-backed contact form.
- Publishing internal employer evidence from the leave-behind.
- Replacing GitHub Pages unless required security headers or hosting capabilities become an explicit requirement.
- Maximizing animation complexity or keeping WebGL at the expense of accessibility and performance budgets.

## 5. Target audience and critical journeys

### Audience

- Engineering managers hiring senior React Native, frontend, or full-stack developers.
- Recruiters scanning experience, location, role fit, and contact details.
- Senior engineers assessing architecture, performance, accessibility, and code quality.

### Critical journeys

1. **Thirty-second scan:** Land, understand positioning, see three proof points, and reach experience, contact, or the résumé when publication is approved.
2. **Evidence review:** Follow a proof point to supporting experience/project evidence and understand context, ownership, and outcome. P1 deepens this journey with full case studies and technical decisions.
3. **Credibility check:** Compare publicly presented dates, employer history, skills, profile links, and any published CV against the approved source without contradictions.
4. **Contact:** Reach the preferred contact channel without confusion or unnecessary exposure of personal data.
5. **Accessible navigation:** Use keyboard, screen reader, zoom, high contrast, or reduced motion to complete the same journeys.

## 6. Proposed information architecture

1. Header: short wordmark, section navigation, theme control if retained, and a résumé action when approved; otherwise a contact action.
2. Hero: senior positioning, concise specialty statement, location/availability, two primary actions, optional decorative background.
3. Proof strip: three to four outcome-oriented facts, each linked to supporting experience.
4. Selected work: two or three detailed case studies rather than four visually equal generic cards.
5. Experience: the most recent role first when its public wording is approved; otherwise use approved anonymized wording or omit it. Follow with FirstOffer, ABRA, and freelance using approved dates and wording.
6. Capabilities: grouped around Mobile, Accessibility & Quality, Frontend, Backend & Data, and Engineering Leadership.
7. Side projects/open source: demos, repositories, npm packages, status, and screenshots.
8. Education, certifications, and languages.
9. Contact and compact footer.

“About Me” may be reduced to a short narrative near the hero or experience. Repeating the same tenure and technology list in multiple sections should be avoided.

## 7. Functional and content requirements

### R1 — Establish a public content source of truth (P0)

Create typed content modules for identity, contact details, employment, case studies, projects, skills, education, certifications, and languages. Use stable IDs and ISO dates. Derived display values such as tenure must come from one canonical field or carry an explicit review date.

The initial content update follows the decisions in §2.1:

- Add the completed Matrix role with the confirmed end date of August 11, 2026 only if D1 publication is approved; otherwise apply its documented default.
- Correct freelance dates and status.
- Change positioning to “Senior Full-Stack & Mobile Developer.”
- Add the React Native, accessibility, test automation, and mobile-performance focus.
- Add certifications and spoken languages.
- Verify the candidate LinkedIn URLs and render only the exact URL approved under D4.
- If D3 is approved, add a downloadable, base-path-safe résumé PDF and a visible “Download résumé” action; otherwise do not add the PDF to the repository or export.
- Apply D2 and D4 before rendering public contact/profile links. Email should remain the default contact option unless the owner records another preference.
- Add three compact proof points using only claims approved through D5. The complete case-study redesign remains P1 under R2.

**Acceptance criteria**

- Site, any published downloadable CV, rendered external-profile links, and the approved content worksheet contain no known contradictions.
- No published surface describes the Matrix engagement as current or “Present.”
- No identity, tenure, employer, or contact fact is duplicated as unrelated string literals across components.
- No internal ticket number, commit count, employment-process statement, client-confidential detail, or unsupported regulatory claim from the leave-behind appears in the repository or exported site.
- Every quantified achievement has an owner-approved public source.
- If résumé publication is approved, its download succeeds from the production base path with an accessible filename and link label; otherwise the repository and exported site contain no public résumé asset or action.

### R2 — Replace generic cards with evidence-led case studies (P1)

Each featured case study must use the same compact structure:

- Context and user/problem.
- Sergey’s role and scope.
- Constraints or key technical decision.
- What was built or changed.
- Measurable result or a clearly labeled qualitative outcome.
- Technology tags and an optional live/repository link.

Use the strongest current stories: FirstOffer migration/query performance, Mekome startup performance, and accessibility-first mobile work. Do not invent metrics for work where public numbers are not approved.

**Acceptance criteria**

- The first viewport after the hero contains at least three evidence-backed proof points.
- Each featured case study distinguishes team context from Sergey’s individual ownership.
- A reader can scan context, action, and outcome without reading a paragraph longer than roughly four lines at desktop width.
- Confidential work can use an anonymized client description and does not require a public link.
- Every external demo/repository link has a clear label, keyboard focus state, and verified destination.

### R3 — Make the WebGL hero optional, bounded, and resilient (P0)

Keep the effect only if D6 is approved after it passes the R10.1 lab protocol. Implement it as a small client island loaded after primary content. Replace individual box meshes with shared geometry/material and `THREE.InstancedMesh`; if the time box or budgets are missed, ship the static/CSS fallback.

Required lifecycle behavior:

- Cap renderer pixel ratio.
- Respond to container resize/orientation changes.
- Pause when the hero is offscreen or the document is hidden.
- Do not run continuous animation for reduced-motion users.
- Raycast only after relevant pointer movement and only against relevant objects.
- Handle WebGL initialization failure and context loss.
- Dispose all owned resources, listeners, observers, and animation frames on unmount.
- Mark the canvas decorative and keep all content/links outside it.
- Remove the dead lens branch and rename `Hero2` to describe its purpose.

**Acceptance criteria**

**Common P0 criteria for either outcome**

- Hero name, positioning, and both primary actions remain readable and usable when JavaScript or WebGL fails.
- Reduced-motion mode has no continuous decorative animation.
- The fallback preserves layout across supported viewport/orientation changes.

**Additional criteria if WebGL is retained**

- One instanced draw path replaces 800 separate mesh draw calls.
- Repeated mount/unmount does not increase retained geometry, material, RAF, or listener counts.
- No animation frame is scheduled while offscreen, hidden, or in reduced-motion mode.
- Under R10.1, median p95 animation-frame interval is below 33.3 ms across three runs.
- Under R10.1, no long task overlapping WebGL initialization exceeds 100 ms and median initialization blocking time is at most 200 ms.
- Resize/orientation and synthetic context-loss scenarios complete without a console error and show the fallback when appropriate.

If D6 selects a non-WebGL fallback, the WebGL-specific criteria are recorded as not applicable and the release evidence confirms that the home-page load requests no Three.js chunk and creates no WebGL context. A Canvas 2D enhancement may animate only while visible and while the document is active, must stop under reduced motion, and must leave the hero fully readable when JavaScript or Canvas is unavailable.

### R4 — Complete the accessible navigation and motion model (P0)

- Move the header outside the main landmark and add a visible-on-focus skip link.
- Use native fragment links and CSS `scroll-behavior`; add section `scroll-margin-top` for the fixed header.
- Add `aria-expanded`, `aria-controls`, Escape-to-close, focus return, and an intentional focus order to the mobile menu.
- Provide consistent `:focus-visible` treatments with sufficient contrast.
- Respect `prefers-reduced-motion` for CSS and WebGL animation.
- Hide decorative icons/canvas elements and improve or suppress redundant image alternatives.
- Use responsive type sizes so section headings do not dominate narrow screens.
- Verify text, gradient text, muted labels, and controls against WCAG AA contrast requirements in light and dark modes.
- Replace or darken the DitherIT green treatment and verify default, hover, and focus states rather than checking static text alone.
- Stack experience title/date content when needed and shorten the mobile wordmark without changing the accessible site name.

**Acceptance criteria**

- Keyboard-only users can access every action and always see focus.
- Skip navigation lands on the primary page content.
- Fragment navigation updates the URL and positions headings below the fixed header with JavaScript disabled.
- The mobile menu exposes accurate state, closes on Escape and selection, and returns focus to its trigger.
- The P0 axe smoke check reports zero serious or critical violations on the primary page; R10 expands the automated state matrix during P1.
- Automated tools do not replace the R10.2 manual accessibility protocol, which passes with no blocking failures before Launch MVP.
- No horizontal scrolling or clipped content occurs at 320, 375, 390, or 768 CSS pixels or at 200% zoom.
- Primary mobile tap targets are at least 44 by 44 CSS pixels, and focus indicators meet a 3:1 contrast ratio against adjacent colors.

### R5a — Own and optimize media used by Launch MVP (P0)

The Launch MVP must own and correctly deliver every image used by a P0 journey.

- Keep versioned source images in `assets/images-src/`.
- Add a pinned Sharp-based `scripts/generate-images.mjs` that writes publishable variants to `public/media/` and a typed manifest containing intrinsic dimensions, aspect ratio, source SHA-256, output paths, and alt-text key.
- For content images, generate AVIF and WebP at 480, 768, 1200, and 1600 pixel widths, omitting widths larger than the source, plus a JPEG or PNG fallback. Normalize orientation, convert to sRGB, strip metadata, and document fixed encoder settings (initial defaults: AVIF 50, WebP 75, JPEG 82).
- Commit generated variants. `npm run images:check` verifies source hashes, settings, files, and dimensions so stale variants fail CI; it does not compare encoded bytes across operating systems.
- Render through one base-path-aware `<ResponsiveImage>` abstraction. A `<picture>` supplies AVIF/WebP `srcset`; `next/image` with `unoptimized` supplies the fallback image, intrinsic dimensions, `sizes`, and alternative-text behavior.
- Only a genuine above-the-fold LCP image may be eager/high priority. Below-the-fold media uses lazy loading and asynchronous decoding.

**Acceptance criteria**

- No first-party URL points to another repository or generated build hash.
- `npm run images:check` passes and lint has no unexplained raw-image warning.
- Every image reserves its aspect ratio; image-attributable CLS is zero in the R10.1 runs.
- Every non-decorative image has approved concise alternative text; decorative images use an empty alternative and do not duplicate adjacent text.
- At 390 CSS pixels and DPR 3, the browser chooses the smallest available candidate that satisfies rendered slot width times DPR; desktop cards likewise avoid loading the original by default.
- Mobile content-image candidates are at most 150 KiB and desktop candidates at most 300 KiB unless a documented visual-quality exception is approved.
- Below-the-fold image requests do not begin before the browser's lazy-load proximity window, and at most one image is high priority.
- A post-export check validates every first-party `src`, `srcset`, and preload candidate under `/SergeyPortfolio/` and receives HTTP 200.

### R5b — Add enriched project and social media (P1)

- Add representative project screenshots where they improve case-study comprehension.
- Generate the Open Graph/social image separately as a 1200 by 630 JPEG or PNG using the same source-control and metadata-stripping policy.
- Extend the R5a manifest, alt-text review, responsive-delivery checks, and base-path validation to every P1 image.

**Acceptance criteria**

- Each screenshot has a content purpose and approved concise alternative; purely decorative media is hidden from assistive technology.
- Project images meet the R5a candidate-size budgets, and the social image is at most 300 KiB.
- The exact exported social-image URL returns HTTP 200 and appears in approved Open Graph/Twitter metadata.

### R6 — Strengthen metadata and discoverability (P1)

Add:

- A specific title and description aligned to the senior mobile/full-stack positioning.
- `metadataBase`, canonical URL, Open Graph, and Twitter metadata.
- `robots.ts` and `sitemap.ts` compatible with static export and the production base path.
- Valid `Person` or `ProfilePage` JSON-LD with only approved public information.
- Theme/color metadata and the existing icon in the final metadata strategy.

**Acceptance criteria**

- Exported HTML contains the correct canonical production URL.
- Social validators show the intended title, summary, and image.
- Exported `robots.txt` and `sitemap.xml` resolve from the production deployment.
- Structured data passes a schema validator without errors.
- No private phone number or leave-behind-derived detail leaks through metadata or structured data.

### R7 — Separate content from presentation and minimize hydration (P1)

- Build on the canonical content modules established by R1; R7 covers presentation boundaries, discriminated view variants, and hydration reduction.
- Model project/card variants as a discriminated union and validate arrays with `satisfies`.
- Remove explicit `any` and index-based entity keys.
- Make static sections server components.
- Isolate menu, observer, and WebGL behaviors into the smallest practical client components.
- Centralize repeated section/container/heading styles only where doing so preserves readability.

**Acceptance criteria**

- `rg` finds no explicit `any` in application code.
- Content entities use stable IDs/slugs as React keys.
- Invalid content variants fail TypeScript compilation.
- Education and static experience/project content do not hydrate.
- Client JavaScript for the home route is measured before and after and is materially smaller; initial JavaScript must be at most 200 KB gzip, with Three.js deferred.

### R8 — Restore dependency and runtime health (P0)

- Select and pin one supported Node LTS version locally and in CI.
- Upgrade Next.js and its dependency graph to patched versions.
- Align React, React DOM, and their type packages to compatible majors.
- Replace `next lint` with ESLint CLI and a maintained configuration.
- Classify every high/critical advisory as browser/runtime, build/CI, or development-only, and document whether its vulnerable path is reachable in this static-export pipeline. `npm audit` dependency placement alone is not an exposure classification.
- Upgrade, remove, or replace an affected dependency when a compatible remediation exists.
- When no compatible remediation exists, permit a temporary exception only when evidence shows the path is not reachable in the served artifact or relevant build flow. Record advisory, package/path, exposure classification, evidence, mitigation, owner, tracking issue, approval date, and expiry.
- Add a machine-enforced `audit:policy` check. New, unreviewed, reachable, or expired high/critical findings fail CI. Critical exceptions expire within 30 days and high-severity exceptions within 90 days.
- Add explicit audit-policy, lint, typecheck, build/export, and cumulative `verify` scripts. `verify` gains browser/accessibility checks when the R9 Launch MVP gate is complete.
- Regenerate and commit the lockfile using the pinned runtime.

**Acceptance criteria**

- In a clean clone, `npm ci` followed by `npm run verify` passes on the documented Windows development environment and Ubuntu CI using the pinned Node version.
- `npm audit --omit=dev --json` contains no unreviewed high/critical advisory.
- No high/critical advisory is reachable in browser-delivered code or the relevant CI/build path.
- Every remaining build-only exception contains the required evidence and mitigation, is owner-approved, is unexpired, and is enforced by CI.
- React runtime and type majors match.
- Lint, typecheck, the P0 tests required by R9, and production export all exit zero.
- Build succeeds twice from clean generated-output directories and produces equivalent route/asset structure.

### R9 — Add a blocking PR and deployment quality gate (P0)

Split validation from deployment:

- Introduce the gate in two steps. During Build Foundation, run install, generate the dependency-audit report, enforce `audit:policy`, lint, typecheck, and static build. Before Launch MVP, add minimal Playwright checks for the canonical/base-path load, primary navigation/contact/conditionally approved résumé journeys, console/first-party request failures, and axe on the primary page.
- Build once and deploy the exact verified artifact.
- Scope build permissions to `contents: read`; grant Pages/OIDC write only to deploy.
- Add job timeouts and cancel superseded runs where safe.
- Pin third-party actions to full commit SHAs and maintain them with Dependabot or Renovate.
- Add a post-deployment smoke check for the canonical base path and critical first-party assets.
- Document rollback to the last known-good artifact/version.

**Acceptance criteria**

- Branch protection requires the verification job.
- Deployment cannot run for an unverified commit.
- Static-export smoke tests load `/SergeyPortfolio/` with zero console errors and zero failed first-party requests.
- New, unreviewed, reachable, or expired high/critical dependency findings block verification.
- A failed post-deploy smoke check visibly fails the release workflow.
- Workflow-level write permissions are removed.

### R10 — Add focused automated coverage and budgets (P1)

R10 expands the P0 smoke coverage in R9; it does not redefine the Launch MVP gate. Prefer high-value browser journeys over broad component snapshots. Add:

- A broader desktop/mobile and light/dark/reduced-motion state matrix.
- Project, social-link, theme, and WebGL-disabled/error journeys beyond the primary P0 path.
- Stable visual smoke snapshots at desktop and mobile widths.
- Lighthouse CI under R10.1.
- Scheduled external-link checks; transient third-party failures do not block every pull request.

**Acceptance criteria**

- The expanded Playwright matrix passes on its pinned browser revision.
- Under R10.1, median mobile Lighthouse performance is at least 90, median TBT is at most 200 ms, median CLS is at most 0.10, and no individual performance score is below 85.
- No serious or critical axe violations.
- Scheduled checks identify broken external links with an owner and actionable output.

### R10.1 — Shared lab performance protocol (P0 WebGL/media / P1 full-site)

This protocol is shared rather than inheriting R10's P1 priority. P0 uses it for R5a media checks and, when WebGL is retained, the R3 benchmark/lifecycle checks. P1 adds the full-site Lighthouse and initial-JavaScript budgets. All gates run against the production static export, never `next dev` or the public network deployment.

1. **Shared:** CI stages `out/` beneath a `/SergeyPortfolio/` directory and serves its parent at `127.0.0.1:4173`. The audited URL is `http://127.0.0.1:4173/SergeyPortfolio/`.
2. **Shared:** Pin Node, `@lhci/cli`, Playwright, and Playwright-bundled Chromium through the repository configuration and lockfile. Pin the CI runner to `ubuntu-24.04`.
3. **Shared:** Use a fresh browser profile and cold HTTP/browser cache for every run. Record the commit SHA and archive failed traces/reports.
4. **P0 media:** At 390 by 844 CSS pixels and DPR 3, assert zero image-attributable layout shift, correct responsive candidate selection, loading priority, and successful base-path asset responses as defined by R5a.
5. **P1 full-site:** Store the Lighthouse configuration in the repository: mobile form factor, 390 by 844 viewport, DPR 3, simulated 150 ms RTT, 1,638.4 Kbit/s throughput, and 4 times CPU slowdown.
6. **P1 full-site:** Run Lighthouse three times per commit. Gate on the median values in R10 and archive all reports. Baseline and comparison runs must use the same configuration, Chromium revision, runner OS, route, and cache state.
7. **P1 full-site:** Measure initial JavaScript as the gzip-compressed sum of scripts requested by the cold home-page load before interaction. Exclude a correctly deferred Three.js chunk and record both the initial and deferred totals. The initial total must be at most 200 KiB.

If D6 proposes retaining WebGL, the following is a P0 gate: run a separate Playwright/CDP benchmark using the same Chromium revision, viewport, and 4 times CPU throttle with the hero fully visible. After a two-second warm-up, execute a deterministic six-second pointer sweep followed by four idle seconds. Collect animation-frame intervals for those ten seconds. Install a `PerformanceObserver` for `longtask` before the deferred import, and mark `portfolio:webgl:init:start` immediately before import/initialization and `portfolio:webgl:init:end` after two rendered frames. Repeat three times and use the median; retain traces on failure.

The WebGL test also asserts that animation stops within two frames after the hero becomes offscreen, after the document becomes hidden, and from first render under reduced motion; resize updates renderer/camera without a console error; synthetic context loss produces the fallback; and three mount/unmount cycles leave no owned listeners, observers, RAF handles, or increase in renderer-reported geometries/textures. Test-only counters may be exposed behind a build flag, but production behavior must be identical.

### R10.2 — Manual accessibility release protocol (P0)

Automated axe and Lighthouse checks are regression tools, not WCAG sign-off. Before Launch MVP, execute and retain a manual checklist against the exact built artifact. Record commit SHA, URL, tester, date, operating system, browser/assistive-technology versions, result, and issue links. Re-run any affected row after a fix. A failure that prevents a critical journey is release-blocking.

Required matrix:

1. **Keyboard:** Current Chrome and Firefox on Windows at 100% and 200% zoom. Exercise skip link, header/fragment navigation, theme control when present, mobile menu, selected work, conditional résumé action, external links, and contact. Verify logical order, visible focus, no trap, Escape close, trigger focus return, and fixed-header destinations.
2. **Reflow:** A 1280 CSS-pixel window at 400% browser zoom, plus 320, 375, and 390 CSS-pixel mobile widths. Verify no loss, overlap, clipping, or two-dimensional page scrolling except for intrinsically two-dimensional content.
3. **Screen reader, P0:** NVDA with Chrome on Windows. Navigate landmarks/headings, operate the mobile menu, identify the most recent role and proof points, open selected work, use any approved résumé action, and reach email/profile links. Verify names, states, reading order, alternatives, and absence of duplicate decorative announcements.
4. **Screen reader, P1 compatibility:** Repeat the same journey with VoiceOver and Safari on macOS or an approved cloud-device lab before P1 hardening is declared complete.
5. **Motion:** With OS reduced motion enabled in Chrome for P0 and Safari during P1 compatibility, reload from a clean profile. WebGL is static or unscheduled, smooth scrolling and nonessential CSS motion are removed, and no content disappears.
6. **Color modes:** In Windows High Contrast/forced colors plus site light/dark modes, text, controls, focus indicators, selected/menu states, and links remain perceivable without relying on gradients or color alone.
7. **Text spacing:** Apply line height 1.5, paragraph spacing 2em, letter spacing 0.12em, and word spacing 0.16em. Content and controls remain usable without clipping.

**Manual acceptance criteria**

- All five critical journeys in §5 complete without a pointer in every applicable keyboard or screen-reader profile.
- There is exactly one `main`, one discoverable header/navigation structure, a logical heading outline, and a skip link that moves focus to primary content.
- There is no keyboard trap or unexpected focus reset; menu state and control names are announced correctly in the required screen-reader profile, and later in the P1 compatibility profile.
- There is no content loss or horizontal page scroll at 400%/320 CSS pixels, and controls remain operable with the text-spacing overrides.
- Reduced-motion reload schedules no continuous animation, and forced-colors mode preserves focus and control boundaries.
- There are zero open severity-1 or severity-2 manual accessibility defects. Lower-severity exceptions require an owner, rationale, workaround, and expiry/review date.

### R11 — Add proportionate observability and privacy controls (P2)

For a static portfolio, avoid full tracing. If analytics are added, use a privacy-conscious option to collect only the information needed to assess reach and Core Web Vitals. Capture deployment SHA, uncaught JavaScript errors, and WebGL fallback/context-loss events without collecting unnecessary personal data.

**Acceptance criteria**

- Analytics and error collection are documented, privacy-reviewed, and disabled until configured.
- Events include release and device class without collecting unnecessary personal data.
- A test event and a synthetic failure verify the configured pipeline end to end.
- Synthetic checks alert only after two consecutive failures to reduce transient noise.

## 8. Visual and copy direction

The visual system should communicate precision and seniority. Keep the dark navy/blue/cyan family, but reduce the number of competing gradients, oversized headings, rounded cards, and hover-only flourishes. Use one consistent section-heading treatment, one card language, and one accent system.

Recommended hero content hierarchy:

1. Sergey Dushevski.
2. Senior Full-Stack & Mobile Developer.
3. React Native, React, Vue, Node.js; accessibility and performance focus.
4. Location/availability line using owner-approved wording.
5. “View selected work” and, when D3 is approved, “Download résumé” as primary actions; otherwise use “Contact” as the second action.

Copy should lead with outcomes and ownership. Avoid generic claims such as “modern,” “exceptional,” or “cutting-edge” unless the adjacent content proves them. Technology tags support a story; they should not replace it.

## 9. Delivery plan

Estimates are engineering effort, not calendar promises. They exclude owner-approval latency, asset licensing/sourcing, and third-party outages. Re-estimate after the dependency/build spike and allow one to three extra days if the framework upgrade requires a major migration.

### Phase 0 — Decisions and baseline (0.5-1 engineering day, plus owner review)

- Resolve and record every §2.1 decision; unresolved items adopt the documented default.
- Approve the remaining public content worksheet derived from the CV.
- Record current-state build, performance, and accessibility observations, including failures and environment details; these are diagnostic and need not be reproducible yet.

**Exit:** No unresolved decision blocks public content because it is either approved or has an applied default; current-state observations are retained.

### Phase 1 — Build foundation (2-4 engineering days)

- Pin Node; align framework/runtime/type versions; regenerate the lockfile; migrate to ESLint CLI.
- Triage all high/critical advisories, remediate reachable findings, and record only policy-compliant temporary exceptions.
- Add baseline verification scripts and a repeatable clean export on the supported Windows environment and Ubuntu CI.
- Capture the reproducible build, R10.1 lab, and R10.2 accessibility baseline after the runtime and browser versions are pinned.
- Add read-only PR validation and produce the deployable artifact once.

**Exit:** The reproducible build and dependency-risk policy pass under the pinned environment.

### Phase 2 — Launch MVP (5-8 engineering days)

- Implement canonical typed content, current approved positioning, and three proof points.
- Own and generate all media required by P0 journeys.
- Rebuild the hero or apply D6's static/CSS fallback.
- Complete P0 navigation, accessibility, reduced-motion, and manual-test work.
- Add the minimal Playwright, axe, base-path, and artifact checks in R9.
- Deploy the exact verified artifact and run the post-deployment smoke check.

**Exit:** Every P0 acceptance criterion passes. This is the production cutline.

### Phase 3 — P1 hardening and proof depth (4-7 engineering days)

- Complete case studies and richer screenshots.
- Add canonical/social/structured metadata, sitemap, and robots output.
- Reduce client boundaries and hydration.
- Add the expanded browser modes, visual snapshots, Lighthouse CI, and scheduled external-link checks.
- Correct README commands, versions, URLs, test profiles, and hosting documentation.

**Exit:** R2, R5b, R6, R7, and R10 acceptance criteria pass.

### Phase 4 — P2 measurement (2-3 setup days plus at least 30 calendar days)

- Complete privacy review and enable approved field, error, and synthetic instrumentation.
- Collect a baseline before proposing owner-approved service targets.
- Iterate copy and section order using field data and recruiter/user feedback.

**Exit:** Data quality is sufficient to assess targets; the targets are not applied retroactively to block Launch MVP.

Dependency order: owner decisions → runtime/dependency/build stability → canonical content and owned assets → hero/accessibility work → launch browser/accessibility checks → exact-artifact deployment → P1 architecture/SEO/proof depth → P2 field measurement.

## 10. Measurement plan

Record diagnostic observations during Phase 0, then capture the reproducible baseline at the end of Phase 1 on the pinned runtime. Deterministic release gates, P1 product/quality validation, and post-launch field targets are intentionally separate.

### Launch MVP release gates

| Area | Metric | Gate |
| --- | --- | --- |
| Content | Approved-source contradictions or unapplied §2.1 defaults | Zero |
| Build | Clean export under pinned Windows/Ubuntu environments | Pass twice with equivalent route/asset structure |
| Security | High/critical dependency findings | Zero unreviewed, reachable, or expired findings; every build-only exception meets R8 policy |
| Accessibility automation | P0 axe smoke | Zero serious/critical violations |
| Accessibility manual | R10.2 protocol | Zero open severity-1/2 defects |
| WebGL, if retained | R10.1 frame/init/lifecycle test | Meets every R3 threshold |
| Reliability | First-party requests | Zero failures in export and post-deploy smoke tests |
| Release | Required P0 PR verification | 100% of production commits |

### P1 product and quality validation

| Area | Metric | Target |
| --- | --- | --- |
| Recruiter comprehension | Scripted, unmoderated 30-second test with five target-role participants | At least 4/5 identify seniority, mobile focus, and one evidence-backed outcome |
| Performance | R10.1 Lighthouse mobile | Median at least 90; no run below 85 |
| Performance | R10.1 TBT / CLS | Median at most 200 ms / 0.10 |
| JavaScript | R10.1 initial home-route JS, gzip | At most 200 KiB; Three.js measured separately and deferred |
| Accessibility automation | Expanded axe / Lighthouse | Zero serious/critical axe violations; Lighthouse accessibility 100 |
| Visual stability | Approved visual smoke snapshots | Pass at desktop and mobile widths |

### Post-launch targets (non-blocking until baseline)

Evaluate these after at least 30 calendar days and only when the sample is sufficient for a meaningful result. Missing or insufficient field data cannot fail a release. A target becomes an operational objective only after owner approval.

| Area | Metric | Initial target |
| --- | --- | --- |
| Field performance | p75 LCP / INP / CLS | At most 2.5 s / 200 ms / 0.1 |
| Availability | Monthly synthetic availability | At least 99.9% |
| Reliability | JavaScript-error session rate | Below 0.1% |

Analytics conversion targets must not be invented without a traffic baseline. If privacy-conscious analytics are approved and enabled, observe résumé clicks when applicable, selected-work clicks, and preferred contact-channel clicks for at least four weeks before proposing conversion goals.

## 11. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Public résumé or recent-employer wording exposes unwanted detail | Require explicit owner approval for contact details, employer naming, client wording, and downloadable CV |
| Internal leave-behind material leaks into public copy | Treat it as private context; add a content review checklist and repository search for internal IDs before release |
| WebGL work consumes schedule without user value | Time-box optimization; ship the CSS/static fallback if budgets are missed |
| Dependency upgrade creates a larger migration | Classify exposure first, remediate reachable findings before release, keep upgrades independently releasable, and time-limit evidence-backed build-only exceptions |
| GitHub Pages base path causes asset failures | Test the exported artifact under the real `/SergeyPortfolio/` prefix in CI and after deployment |
| External demos become unavailable | Scheduled link checks; show repository links independently and avoid blocking PRs on transient external failures |
| Metrics encourage visual regressions | Use deterministic launch gates, assess product quality during P1, and keep traffic-dependent targets non-blocking until a valid baseline exists |

## 12. Definition of done

### Launch MVP

The Launch MVP is complete when:

- Every §2.1 decision is recorded or its documented default is applied consistently.
- Public content is current, internally consistent, and contains no private leave-behind details.
- The site communicates senior mobile/full-stack positioning and three approved, evidence-backed proof points in the initial scan path.
- Critical journeys work on mobile and desktop with keyboard, reduced motion, and WebGL disabled.
- All P0 lint, type, dependency-risk-policy, clean-export, minimal browser, axe, base-path, manual-accessibility, and artifact checks pass under the documented profiles.
- If WebGL is retained, every R3/R10.1 performance and lifecycle gate passes; otherwise the static/CSS fallback ships.
- Every production commit is verified, and deployment uses the exact verified artifact with least-privilege permissions.

### P1 hardening

P1 hardening is complete when R2, R5b, R6, R7, and R10 acceptance criteria pass, production base-path metadata/assets are verified, and the README describes the actual runtime, development path, test workflow, static preview, profiles, and deployment model.

P2 measurement has no release definition of done. It begins only after privacy approval and is evaluated under the post-launch rules in §10.

## 13. Implementation decision log

- **Keep static export and GitHub Pages:** sufficient for a portfolio and minimizes operational surface.
- **Use typed TypeScript content, not a CMS:** current content volume does not justify CMS complexity.
- **Treat WebGL as enhancement:** identity, evidence, navigation, and calls to action must never depend on it.
- **Use only owner-approved CV facts as the public baseline:** the current site is stale; private employment documentation is excluded.
- **Prefer end-to-end and accessibility tests:** the highest risks are navigation, base paths, rendering modes, external destinations, and deployment integrity rather than isolated component arithmetic.
- **Defer analytics until privacy and baseline questions are resolved:** correctness and experience come first.
