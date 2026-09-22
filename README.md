# Raymund Bermudes — Portfolio

Portfolio site for **Raymund Ryan Bermudes, Jr.** — Solution Analyst & Android Developer.

> **This repository is private, and must stay private.** See decision **D14** in
> [`HANDOFF.md`](HANDOFF.md). The planning documents name client engagements that publish at
> `sectoral` or `abstracted` disclosure tiers. Making this repository public would publish what
> those tiers forbid, and git history is permanent. "Make it public" is not a settings change —
> it re-opens D5 and requires history to be rewritten first.

## Start here

| File | What it is |
|---|---|
| [`HANDOFF.md`](HANDOFF.md) | **Read first.** Current state, blockers, decisions, what's next. |
| [`CLAUDE.md`](CLAUDE.md) | Operating rules — confidentiality, chunk discipline, definition of done. |
| [`PHASE-1-DISCOVERY.md`](PHASE-1-DISCOVERY.md) | Architecture, IA, UX strategy, design system, chunk plan. |
| `Raymund_Portfolio_PRD_Progress_Tracker.xlsx` | PRD, roadmap, decision log, QA checklist, risk register. |

## Stack

Astro 7 · TypeScript (strict) · Tailwind CSS 4 *(from CHUNK 02)* · MDX content collections
*(from CHUNK 04)* · deployed to Vercel (Hobby) · npm.

No React. No CSS-in-JS. No animation library. No UI kit. No CMS. No analytics. No form backend.
**Hard cap of four JavaScript islands in the entire site.**

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server at localhost:4321
npm run check    # astro check — type checking
npm run build    # production build to dist/
npm run verify   # check + build — must be clean before any chunk counts as done
npm run preview  # serve the production build locally
```

## Notes for anyone working here

- **Security headers live in `vercel.json`** and only apply to deployed builds — the dev server
  does not serve them. Verify headers against a real deployment, never against `localhost`.
- **This folder is inside OneDrive.** If `npm install` fails with `EPERM` or `EBUSY`, suspect the
  sync client before suspecting npm: pause syncing, re-run, resume.
- Astro's anonymous build telemetry has been disabled, consistent with the project's zero
  third-party posture.
- `src/pages/index.astro` is a CHUNK 01 placeholder carrying `noindex`. It proves the toolchain and
  the deploy pipeline. The real home page is CHUNK 08–09; the design system is CHUNK 02. Do not
  build on the placeholder's styles.
