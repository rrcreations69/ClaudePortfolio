# CLAUDE.md — Raymund Bermudes Portfolio

Operating instructions for Claude Code on this repository. Read this before doing anything.

## What this is

A production portfolio website for **Raymund Ryan Bermudes, Jr.**, positioned as a **Solution Analyst & Android Developer** — specifically, someone who spans *Requirement → Analysis → Design → Development → Testing → UAT → Release → Support*, not someone who only writes Android code.

Audience: recruiters, hiring managers, technical leads, potential clients. It is a real professional artefact, not a template exercise.

## Source of truth

| Document | Role |
|---|---|
| `docs/PRD-Progress-Tracker.xlsx` | The PRD, roadmap, QA checklist, risk register, decision log and progress tracker. 19 sheets. **Update it as work completes.** |
| `docs/PHASE-1-DISCOVERY.md` | The full architecture, IA, UX strategy, design system and chunk plan. Every decision below is argued there. |
| This file | The short version Claude Code needs every session. |

If this file and `PHASE-1-DISCOVERY.md` disagree, the discovery report wins and this file is wrong — fix it.

## Current status

**Phase 1 (discovery & architecture): COMPLETE.**
**Next: CHUNK 00 (content, no code) and CHUNK 01 (project foundation).**

Nothing has been built. There is no `package.json` yet.

### Blocking before CHUNK 01

1. Decisions **D1–D13** in `PHASE-1-DISCOVERY.md` §10.1 approved or amended by Raymund. **D5 (confidentiality tiers) is the one that matters and must not be assumed.**
2. `node -v` ≥ 22 and `npm -v` working. `git --version`. A GitHub repo. Verify before scaffolding, not during.
3. This may be a corporate-managed machine — npm registry access behind a proxy is a live possibility. If install fails, say so and stop; do not work around it silently.

## The stack (decided, Phase 1)

- **Astro** (latest stable) — content site, not an application. Zero client JS by default.
- **TypeScript**, `strict`
- **Tailwind CSS 4** — tokens live as real CSS custom properties in `src/styles/tokens.css`
- **MDX + Astro content collections** with Zod schemas
- **Vercel**, deployed from GitHub, from CHUNK 01 onward (not at launch)
- **npm**
- No React. No CSS-in-JS. No animation library. No UI kit. No CMS. No analytics. No form backend.

**Hard cap: four JavaScript islands in the entire site** — `MobileNav`, `deliveryThread`, `ThemeToggle`, and (only if ever built) `ProjectFilters`. A fifth needs a written justification.

## Non-negotiable rules

### 1. Never fabricate anything

No invented metrics, clients, revenue, user counts, performance improvements, awards, certifications, technologies, responsibilities, testimonials or outcomes. If information is missing, write `[CONTENT REQUIRED]` or `[VERIFY INFORMATION]` and stop. Do not guess, do not approximate dates, do not infer a client's industry.

Raymund's actual experience — nothing may be attributed to him beyond this list without asking:
enterprise Android development and maintenance · Java / Kotlin · REST API integration · database integration · application troubleshooting · production issue investigation · UAT support · application releases · client requirements analysis · technical problem solving · business application development · security remediation · enterprise system support · Retool / business applications · CASECenter / enterprise workflow systems · XSLT / report development.

### 2. Confidentiality — three-tier disclosure

Every project publishes at exactly one tier, recorded in frontmatter:

| Tier | Publishes |
|---|---|
| `named` | Client name + public detail only |
| `sectoral` | Sector/scale/geography, no name |
| `abstracted` | Class of problem only — no client, no sector, sanitised architecture |

**The tier applies to everything public, not just body copy: URLs, slugs, file names, image names and metadata, page titles, commit messages, and preview deployments.** A slug may contain a client name only when `disclosure === 'named'`.

Proposed tiers (pending Raymund's confirmation — **do not write case-study content until confirmed**): CTBC → `sectoral`, SBC security work → `abstracted`, CASECenter → `sectoral`.

Never commit secrets, tokens, internal URLs, client credentials, unsanitised screenshots or private source.

### 3. Chunk discipline

Work one chunk at a time. For each request:

1. Read the PRD workbook and this file.
2. Read the current project state.
3. Identify the requested chunk.
4. Implement **only** that chunk.
5. Test it.
6. Review UX, responsive behaviour, accessibility, code quality.
7. Update `docs/PRD-Progress-Tracker.xlsx` (Progress Log, Decision Log, chunk status).
8. Report what changed, what was decided, what broke, and the next recommended step.

Do not touch unrelated sections. Do not make a major architectural change without explaining the issue, the alternative, the trade-off, a recommendation — and waiting for approval.

### 4. Definition of done

A chunk is complete only when: it works · `npm run build` and `astro check` are clean · no unexpected console output · checked at 375px and 1440px minimum · keyboard-operable with visible focus · nothing previously working is broken · the code is readable in six months · the PRD requirement is satisfied · the workbook is updated.

**Code existing is not done. Untested is `Review`, not `Complete`.**

Status values: `Not Started` · `In Progress` · `Blocked` · `Review` · `Complete`.

### 5. Every interactive element must pass all five

1. Works with keyboard alone, visible focus.
2. Works with JavaScript disabled, or is genuinely non-essential.
3. Works under `prefers-reduced-motion: reduce`.
4. Works at 320px with ≥44×44px touch targets.
5. **Makes content easier to reach, not harder.** Fails this → deleted, regardless of the other four.

## Design system (build in CHUNK 02)

**Colour** — all eight text pairs clear WCAG AAA (7:1) against both `--bg` and `--surface`. Do not change these values without recomputing contrast.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FFFFFF` | `#0E0E0D` |
| `--surface` | `#F6F6F3` | `#191917` |
| `--text` | `#14140F` | `#F4F4EF` |
| `--text-muted` | `#535349` | `#A8A8A0` |
| `--accent` | `#1A43BD` | `#8FA8FF` |
| `--border` | `#E4E4DE` | `#2C2C28` |
| `--border-strong` | `#8E8E87` | `#6B6B61` |

Accent is used **only** for links, focus rings, active states and the Delivery Thread marker. Never decoration, never gradients, never large fills.

**Type** — Geist Sans + Geist Mono, self-hosted via Astro's Fonts API. Weights 400/500/700 only. Max 3 font files. Body 17→18px, line-height 1.65, prose measure capped at **68ch**.

**Spacing** — strict 4px scale: `4 8 12 16 24 32 48 64 96 128`. No arbitrary values. Shell 1200px, wide 1040px, prose 68ch.

**Motion** — 150ms fast / 250ms standard, `cubic-bezier(0.2, 0, 0, 1)`. Animate `opacity` and `transform` only. Entry animations once, below the fold, never on hero or nav. **No content is ever invisible pending an animation** — the server-rendered state is fully visible. Global `prefers-reduced-motion` kill switch.

**Forbidden:** gradients, glassmorphism, neon, gaming aesthetics, animated backgrounds, 3D, particles, cursor effects, fake terminals, fake loading screens, skill percentage bars, stock photography, logo walls, testimonial bands, stat counters.

## Architecture

**Routes:** `/` · `/work` · `/work/[slug]` · `/about` · `/contact` · `/404`. Plus `/raymund-bermudes-cv.pdf`, sitemap, robots, generated OG images.

**Nav:** Work · About · Contact, plus Resume as a button. Three items and one action. No dropdowns.

**Content:** one collection, `src/content/work/*.mdx`. A project *is* its case study; the card is its summary. Adding a project = adding one file and editing nothing else. Experience, skills and site config are typed TS in `src/data/`.

**Schema rules:** `myRole`, `problem`, `outcome`, `clientDescriptor` are `.min(1)` — empty fails the build. `confidentialityReview` is a dated record with a named reviewer, and its `tierConfirmed` must match `disclosure`. The slug refinement blocks client names on non-`named` projects. These are forcing functions, not verification — they make omission loud, they cannot make a false statement true.

**The signature element — the Delivery Thread.** The 8 delivery stages are the site's navigation spine: a compact CSS-only strip on the home page, and on a case study a sticky rail where each section maps to a stage. It is a `<nav>` of anchor links with `aria-current`; with JS off it degrades to a plain table of contents. **`[VERIFY INFORMATION]` — "Design" is not in Raymund's stated experience. Confirm he owns design work or drop the spine to seven stages.**

**Security (CHUNK 01, not QA):** CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` in `vercel.json`. `rel="noopener noreferrer"` enforced in the `Link` component. `npm audit` + Dependabot in CI. `.env*` git-ignored from the first commit. Zero third-party origins.

## Chunk order

```
00  Content & confidentiality clearance (no code) ──────────────► 07
01  Project foundation + deploy + security headers
02  Design system
03  Global shell
04  Content layer
05  Work index + ProjectCard
06  Case study system + Delivery Thread
07  Real case study content        (blocked by 00)
08  Home — hero
09  Home — thread, selected work, experience teaser
10  About — story, timeline, skills
11  Contact + resume
12  Responsive + dark mode
13  Accessibility
14  Performance
15  SEO + custom domain
16  Security, confidentiality & recruiter review
```

CHUNK 00 blocks **only** CHUNK 07 — build 01–06 in parallel with the writing. 07, 09 and 11 must all land before the QA track (12–16) starts.

## Targets

LCP ≤1.5s · CLS ≤0.02 · INP ≤100ms · home-page JS ≤20KB gz · page weight ≤350KB · Lighthouse ≥98 · WCAG 2.2 AA with zero axe violations · usable at 200% zoom and 320px · navigable with JS disabled · browsers: last 2 of Chrome/Edge/Firefox/Safari incl. iOS · widths 320/375/414/768/1024/1280/1440/1920.

## The recruiter test

Run it against every chunk. Can a recruiter, in one short visit: tell who Raymund is · tell what he does · see what he built · see what *he personally* contributed · see how he solves technical problems · see that he understands business requirements · verify his skills · scan his experience · contact him · get his resume? Any "no" is a defect.

**The architecture will not make or break this portfolio. The case studies will.** Everything here exists to get out of the way of two well-written technical stories.
