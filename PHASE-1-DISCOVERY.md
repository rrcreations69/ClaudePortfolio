# Phase 1 — Discovery & Architecture Report

**Project:** Professional Portfolio Website
**Owner:** Raymund Ryan Bermudes
**Positioning:** Solution Analyst & Android Developer
**Report date:** 22 September 2026
**Source of truth:** `Raymund_Portfolio_PRD_Progress_Tracker.xlsx` (15 sheets, read in full)
**Phase status:** see [Section 11](#11-phase-1-status) — read Section 10 first; it contains blocking decisions.

> **No files scaffolded. No dependencies installed. Nothing written to your machine or to a repository.**
> The code fragments in §6 and §8 are *specification* — token values and a schema contract to be reviewed and argued with now, then implemented in CHUNKs 02 and 04. They are here because "we'll decide the type scale later" is how design systems end up incoherent. Nothing in this document is runnable and nothing has been built.

---

## Table of contents

1. [Repository assessment](#1-repository-assessment)
2. [PRD assessment](#2-prd-assessment)
3. [Recommended technology stack](#3-recommended-technology-stack)
4. [Information architecture](#4-information-architecture)
5. [UX strategy](#5-ux-strategy)
6. [Design direction](#6-design-direction)
7. [Component architecture](#7-component-architecture)
8. [Content architecture](#8-content-architecture)
9. [Development roadmap](#9-development-roadmap)
10. [Open decisions & content requests](#10-open-decisions--content-requests)
11. [Phase 1 status](#11-phase-1-status)
12. [Sources](#12-sources)

---

## 1. Repository assessment

### 1.1 What was inspected

| Location | Method | Result |
|---|---|---|
| Cloud session workspace (`/home/claude`) | `ls -la`, git check | Empty. Only shell dotfiles (`.gitconfig`, `.ssh`, `.npm`, caches). **Not a git repository.** |
| Linked computer `gds2054` | `get_device_info` | Windows x64. Claude desktop app 2.2553.1. **Zero folders connected to this session.** |
| Home directory of `gds2054` | Names-only listing | `.android`, `.git`, `.gradle`, `.jdks`, `.m2`, `.vscode`, `Documents`, `Downloads`, `OneDrive`, `Postman`, `coursera-html5`, `ansel`, and others. |
| Existence of a portfolio repo | Confirmed with you | **None exists.** Greenfield. |

### 1.2 Findings

**The project is greenfield.** There is no framework, no `package.json`, no dependency tree, no build system, no TypeScript config, no styling system, no routing, no assets, no deployment config, no environment variables, no documentation and no git history to inherit or reuse. Every technology decision in Section 3 is therefore unconstrained by legacy — which is the good case, but it also means there is no existing code to fall back on if a decision turns out wrong.

**Nothing is reusable, with three exceptions:**

1. The PRD workbook itself. It is genuinely well-structured and becomes the project's governance artefact (see 2.1).
2. Your existing toolchain on `gds2054` — `.jdks`, `.gradle`, `.m2`, `.vscode`, `Postman` confirm a working JVM/Android development setup. It does **not** confirm a working Node.js toolchain. **This is a real gate, not a formality** (see 1.3).
3. `coursera-html5` in your home directory suggests prior front-end exposure. Not assessed — it was not connected, and I am not assuming its contents.

**Observation, not a finding:** there is a `.git` directory directly inside your Windows home folder. That is unusual and, if it is a real repository rooted at `C:\Users\<you>`, it means git may be tracking your entire user profile. I have not inspected it and cannot from here. Worth checking on your side — an accidentally-initialised repo at home-directory level is a well-known way to leak credentials, SSH keys and `.m2` settings into a commit. Unrelated to this project, but I saw it, so I am telling you.

### 1.3 Environment gate before CHUNK 01

You chose to build **on your computer, in a connected folder**. Before CHUNK 01 can start, two things must be true:

| Requirement | Why | How to satisfy |
|---|---|---|
| **A folder connected to this session** | I cannot read or write anything on `gds2054` until you attach one. Use "Add folder" in the Claude desktop app. Recommend creating an empty folder first, e.g. `Documents\dev\portfolio`, and connecting that — not `Documents` itself. | You |
| **Node.js 22 LTS or newer + npm, on PATH** | Astro 6 raised its floor to Node 22 (per the Astro 6 release notes); `[VERIFY INFORMATION]` the Astro 7 floor at install time — I have not confirmed it and will not assume it. The Electron runtime inside the Claude app reports Node 24, but **that is the app's bundled runtime, not your system Node** — it proves nothing about your PATH. | Verify with `node -v` and `npm -v` in a terminal. If missing, install Node 22 LTS. |

If Node is absent or older than 22, CHUNK 01 stops there. I would rather name that now than discover it mid-scaffold.

**Also to confirm at CHUNK 01:** `git --version`, a GitHub account with an empty repo ready, and whether `gds2054` is a corporate-managed machine with restrictions on npm registry access or local dev servers. Corporate proxy/registry policy is the single most common reason a Node scaffold fails on a work laptop — and given your GDS Link email, this is a live possibility rather than a hypothetical.

---

## 2. PRD assessment

### 2.1 What the PRD gets right

This is a better-than-average PRD and I am not going to replace it. Specifically worth preserving:

- **Sheet 03 (UX Principles)** is the strongest artefact in the workbook. Each principle has a rule, an application and a named anti-pattern. That is how design principles should be written — most are unfalsifiable slogans; these are testable.
- **Sheet 06 (Case Study Template)** already separates "My Role" from project outcome and already instructs "use real measurable evidence if available; otherwise describe verified outcome." That is the correct framing and it is rare.
- **REQ-011 (no fabricated claims)** and **R03 (confidential information)** being listed as Critical shows the right instincts about the risks that actually kill professional portfolios.
- **Sheet 13 (Recruiter Review)** is effectively an acceptance test suite written from the reader's perspective rather than the builder's.

The PRD is adopted as the foundation. Everything below is either a closure of something the PRD deliberately left open, or a flagged recommendation — never a silent change.

### 2.2 Requirements understood

All twelve REQ items in Sheet 02 are clear, testable and accepted as-is. No requirement is being dropped. Mapping of each requirement to the chunk that satisfies it appears in Section 9.4.

### 2.3 Gaps — information that does not exist yet

| # | Gap | Impact | Severity |
|---|---|---|---|
| G1 | **No case study source material exists.** Sheet 05 lists C06 (CTBC), C07 (SBC), C08 (CASECenter) and C10 (case studies) all as `Not Started`. REQ-003 demands at least two strong case studies. | The portfolio cannot ship. Code is not the critical path — **content is**. | **Blocking** |
| G2 | **No resume file exists** (C11 `Not Started`). REQ-012 and the Recruiter Review sheet both depend on it. | Recruiter journey is broken at its most important exit point. | High |
| G3 | **No hero statement written** (C03 `Not Started`, explicitly "do not use generic filler"). | The single highest-value 10 seconds of the site has no content, and I am forbidden from inventing it. | High |
| G4 | **No confidentiality disclosure policy.** See 2.4 — this is the most serious issue in the document. | Legal/employment risk, plus it blocks all case study writing. | **Blocking** |
| G5 | **No measurable performance targets.** QA-011/012/013 read "Images optimized", "Fonts optimized and limited", "No unnecessary heavy dependency" — none is pass/fail testable by a third party. | "Performance as UX" (Sheet 03) cannot be enforced. | Medium |
| G6 | **No accessibility conformance target named.** Sheet 03 and REQ-007 describe behaviours, not a standard. | QA-007/008/009/010 become matters of opinion. | Medium |
| G7 | **No browser/device support matrix.** | Responsive QA (QA-004/005/006) has no defined widths or browsers to test against. | Medium |
| G8 | **No project count known.** Three client engagements are named; whether each yields one project, several, or one combined case study is undecided. | Directly determines whether filtering/explorer UI is justified at all (see 5.4). | Medium |
| G9 | **No dates, no effort estimates, no target launch date** anywhere in the roadmap or progress log. | "Chunk by chunk" has no schedule to fall behind, which sounds fine until month four. | Low |
| G10 | **No asset inventory** — screenshots, diagrams, OG image, favicon, headshot (or the decision not to have one). | These surface late and stall QA chunks. | Low |

### 2.4 Conflict C1 — the confidentiality conflict (most important finding)

**This is the one thing in the PRD that can genuinely harm you, and it is not currently resolved.**

The workbook simultaneously requires:

- **REQ-002 (Critical):** "Show real professional projects and personal contribution" — *"Every featured project identifies role and contribution."*
- **REQ-010 (Critical):** "No client secrets or confidential information."
- **R03 (Critical impact):** "Confidential client information exposed" — mitigation: *"Anonymize screenshots/data."*
- **Sheet 05:** names three engagements by name — **CTBC**, **SBC**, **CASECenter** — with notes saying "anonymize confidential information."

You cannot both name a client and anonymise the engagement. "Anonymise the data but name the bank" is not anonymisation; it is attribution with redacted detail. And your strongest material is the hardest case: C07 is described as *"security/troubleshooting"* work. **A publicly readable narrative describing security remediation on a named client's production application is the highest-risk sentence this portfolio could contain** — regardless of how carefully it is worded, and regardless of whether the vulnerability is long since fixed.

Separately: work performed as an employee or contractor is generally governed by an employment agreement, an NDA, or a client MSA, and describing it publicly is usually restricted by default rather than permitted by default. I am not a lawyer and this is not legal advice — but the decision belongs to you, made deliberately, before a single word of case study copy is written, and not discovered at QA-018.

**Recommendation — a three-tier disclosure model, decided per project, recorded in the content schema:**

| Tier | What is published | Use when |
|---|---|---|
| **T1 — Named** | Client name, project name, public detail only | The client is publicly associated with you already (e.g. it is on your CV/LinkedIn and was cleared), and the work described is non-sensitive |
| **T2 — Sectoral** | Sector, scale and geography, but no name — e.g. *"an enterprise client in [sector]"*. `[VERIFY INFORMATION]` the sector wording per engagement; I have not been told what industry any of these clients are in and will not guess. Technical detail can go deeper because the subject is unidentified | Default for most enterprise work |
| **T3 — Abstracted** | The *class* of problem only, no client, no sector, sanitised architecture. *"A production Android app serving an enterprise workflow"* | Anything touching security, incidents, credentials, or internal architecture |

**My recommendation for your three engagements, subject to your confirmation and your employer's:** CTBC → T2, SBC (security work) → T3, CASECenter → T2. Note that under T2 and T3 the client name must also disappear from URLs, file names, image names, page titles and commit messages — not only from body copy. That is handled in §7.1 and §8.2.

**This does not weaken the portfolio.** A recruiter cannot verify a client name anyway; what they can evaluate is the *reasoning*. A T3 case study that shows how you reproduced an intermittent production failure, isolated it, and validated the fix through UAT is more persuasive than a T1 case study that name-drops and says nothing. The same screening accounts make this point directly: depth on one problem, including its edge cases, reads as engineering maturity, while breadth signals little (source in §12).

**Mechanism:** the disclosure tier becomes a required field in every project's frontmatter (Section 8.2). It is impossible to publish a project without having made the decision. QA-018 then has something concrete to check.

### 2.5 Conflict C2 — signature interactions vs. the anti-distraction principle

Sheet 04 lists nine UI/UX concepts: seven marked `Evaluate`, one `Use sparingly`, one `Recommended`. Sheet 03 states: *"Distinctive, Not Distracting — use one or two signature interactions and repeat a coherent language,"* anti-pattern *"Random effects everywhere."*

If the nine concepts are treated as a backlog, the PRD violates its own principle. **Section 5 closes this.** Two concepts become *signature* elements carrying the site's identity; three more are adopted in a reduced, static form; two are deferred against a growth threshold; four are rejected outright.

### 2.6 Conflict C3 — "Selected Work" and "Case Studies" as separate things

Sheet 01 has P11 (Selected Work) and P12 (Case study system) as separate deliverables; Sheet 08 has both `ProjectCard` and `CaseStudyLayout`; your prompt lists `Work` and `Case Studies` as separate IA candidates.

With roughly three engagements, maintaining "projects" and "case studies" as two distinct content types means a project that has no case study is a dead end, and a case study without a project record is orphaned. **Recommendation:** one content type, two depths — a project *is* its case study; the card is its summary. Section 4 and Section 8 implement this. P11 and P12 remain as separate build chunks, which is correct; they just operate on one collection.

### 2.7 Ambiguities requiring your decision

| # | Ambiguity | Options | My recommendation |
|---|---|---|---|
| A1 | C02: *"Solution Analyst / Android Developer — final wording to be decided"* | Several orderings and framings | See 10.1 — three drafted options, none fabricated, your pick |
| A2 | Is "Experience" a page, a section, or both? | Page / section of About / both | Section of `/about` (Section 4) |
| A3 | Contact — links only, or a working form? | mailto+links / form+serverless | Links only for v1 (Section 3.5) |
| A4 | Dark mode — in scope? Not mentioned anywhere in the PRD. | Yes / no / later | Tokens dual-valued from CHUNK 02; ship in CHUNK 12 (Section 6.2) |
| A5 | Blog/writing section? | Yes / no | No for v1 — you declined it; noted as a clean future extension |
| A6 | Analytics (Sheet 07: "Only if useful") | None / privacy-conscious | None at launch; revisit after 4 weeks (Section 3.5) |

### 2.8 Recommended PRD improvements

Not silent changes — proposals, each written into the updated workbook as a *recommendation* with your approval pending:

1. **Add a Content Production workstream to Sheet 01.** The roadmap builds a case study *system* (P12) but never schedules the *writing*. G1 is the project's real critical path and it is currently invisible in the plan. Proposed new rows P02a–P02c.
2. **Make QA-011/012/013 numeric.** Proposed targets in Section 3.6.
3. **Name WCAG 2.2 Level AA** as the accessibility target in REQ-007 and Sheet 09.
4. **Add a support matrix** to Sheet 09 (Section 3.6).
5. **Re-rate R03's likelihood from Low to Medium.** Sheet 12 rates confidential-information exposure as Critical impact / Low likelihood. I think Low is optimistic: three of the four content items in the inventory are client engagements, one of them security work, and the exposure paths are not just body copy — they include URLs, file names, image metadata, page titles, commit messages and preview deployments. Calling it Low invites treating it as a final check rather than a gate. **This is a recommendation, flagged rather than applied** — the rating is yours.
6. **Add five risks** to Sheet 12: content-production stall (the highest-likelihood risk in the project and currently unlisted), confidentiality review having no gate, dependency/framework churn over a multi-year site life, contact-address harvesting, and the absence of shareable metrics colliding with an evidence-led design.
7. **Add a `15 Content Gaps` sheet** tracking every `[CONTENT REQUIRED]` item to closure.
8. **Amend Sheet 04** with the decisions from Section 5 so the concept list stops being nine open questions.
9. **Move Security review earlier.** P22 currently sits in QA. Confidentiality clearance must gate content writing, not follow it — you cannot un-publish a preview deployment from someone's memory. Security *headers* likewise belong in CHUNK 01 with the scaffold (§3.7), not in a QA sweep.
10. **Give R06 a cadence and an owner.** "Schedule periodic review" without a date is a wish. Proposed: a 30-minute content review every six months and after any role change (§9.6).

---

## 3. Recommended technology stack

### 3.1 The decision

**Astro 7 + TypeScript (strict) + Tailwind CSS 4 + MDX content collections, deployed to Vercel from GitHub.**

### 3.2 Reasoning, stated plainly

The instruction was *"choose the simplest architecture that satisfies the requirements"* and R05 names unnecessary complexity as a risk. So the honest question is: **what does this site actually need to do?**

It needs to render roughly 10–15 pages of mostly static, mostly textual content, fast, with correct metadata and semantics. It has no authentication, no database, no user-generated content, no mutations, no real-time anything. The interactive surface is: a mobile navigation toggle, a theme toggle, some collapsible detail sections, and possibly a filter list. That is it.

That is a **content site**, and a content site that ships a React runtime to every visitor is paying a permanent tax for capability it does not use. Astro renders to HTML with zero client JavaScript by default and hydrates only the components explicitly marked interactive. Next.js is the better tool when a project will grow into an application — this one will not; it will grow more *pages*, which is precisely what Astro is built for.

**The counter-argument, stated fairly:** for a candidate targeting React/Next.js roles, the portfolio's own stack is itself a work sample, and Next.js would be the signal-maximising choice. That argument does not apply to you. You are positioning as a Solution Analyst and Android developer; a hiring manager for those roles is unlikely to evaluate you on whether your personal site uses RSC — and if one does, an Astro site that scores 100 on Core Web Vitals is not the weaker answer. What they *will* notice is a site that loads instantly on a phone on mobile data. Published accounts of how developer portfolios are screened describe reviewers going to the live URL first and reading code only briefly, and note that stack choice signals most when it matches the target job description — which neither option does here (source in §12). **Optimise for maintainability and speed, not framework fashion.** If your target roles shift toward React, revisit this; the content layer (MDX + frontmatter) ports to Next.js with the UI rewritten and the content untouched.

**The maintainability argument is the strongest one.** You are the sole maintainer, your day job is JVM/Android, and you will return to this codebase at unpredictable intervals — possibly a year apart. Astro's mental model is "HTML files with a frontmatter script block, plus components." Next.js App Router requires holding server components vs. client components, the caching model, and route segment config in your head. Six months from now, at 11pm, wanting to add one project, the first model wins decisively.

### 3.3 Stack table

| Technology | Purpose | Reason | Alternative considered |
|---|---|---|---|
| **Astro 7** (`7.3.x`, current stable line as of Sept 2026) | Site framework, routing, build | Zero client JS by default; islands for the few interactive parts; content collections with schema validation; file-based routing; built-in sitemap/RSS/image optimisation; first-class MDX | **Next.js 16 LTS** — rejected: ships React runtime for an almost entirely static site; heavier mental model for a solo non-React maintainer; more churn between majors. **Plain HTML/CSS** — rejected: no component reuse, no content schema, every new project means hand-editing markup |
| **TypeScript**, `strict` | Type safety across content, components, data | Catches content-shape errors at build time rather than in production; `astro check` in CI. You already work in a statically typed language daily — this is the familiar direction, not the exotic one | Plain JS — rejected: gives up the main benefit of a schema-validated content layer |
| **Tailwind CSS 4** (`4.3.x`) | Styling | v4 is CSS-native (`@theme`), so design tokens live as real CSS custom properties usable outside Tailwind too; no runtime cost; no naming debates; unused styles never ship | **CSS Modules** — genuinely close second, and defensible if you dislike utility classes; rejected mainly because token→utility flow keeps a single design system honest. **Vanilla CSS** — viable but more discipline required to stay consistent |
| **MDX + Astro Content Collections** | Case study content | Case studies need prose *and* embedded components (diagrams, callouts, figures). Zod schemas make required fields (including disclosure tier) **impossible to omit** — the build fails. Adding a project = adding one file | **JSON/TS data** — rejected: hostile for long prose. **Headless CMS** — rejected: monthly cost, external dependency, auth, network at build time, for a site that changes a few times a year |
| **Astro Fonts API** (built-in, Astro 6+) | Font loading | Self-hosts, generates fallback metrics to prevent layout shift, emits preloads. No third-party font CDN request — which is both a performance and a privacy/GDPR win | Google Fonts CDN — rejected: extra origin, third-party request, CLS risk |
| **Native CSS + View Transitions** | Motion | Every motion requirement in the PRD (hover, focus, entry, page transition, reduced-motion) is achievable in CSS. A JS animation library would force a React/JS island purely for decoration | **Framer Motion / GSAP** — rejected: would violate "do not introduce a library solely for a visual effect," and forces hydration |
| **Hand-authored inline SVG** + `lucide` icons (subset, inlined) | Icons, architecture diagrams | Inlined SVG = no icon font, no sprite request, fully styleable and accessible. Sheet 07 asks for one consistent icon system | Icon fonts — rejected: accessibility and FOUT issues. Full icon library import — rejected: unnecessary bytes |
| **Vercel** (GitHub integration) | Hosting, CI, preview deploys | You confirmed Vercel + GitHub. Per-branch preview URLs make every chunk independently reviewable on a real device — directly enabling the chunk-by-chunk method. Edge CDN, automatic HTTPS. **Plan caveat:** Vercel's Hobby tier is for non-commercial use, and Sheet 00 lists "Potential Clients" as a primary audience — if the site solicits client work, Pro is the correct plan. Raised as decision D13 | Cloudflare Pages / Netlify / GitHub Pages — all workable; Vercel chosen because you already have it |
| **ESLint + Prettier + `astro check`** | Code quality gate | Runs in CI; keeps a solo project from drifting | None — non-negotiable for maintainability |
| **npm** | Package manager | Ships with Node, so there is nothing extra to install or get approved on a managed machine | pnpm — faster and disk-efficient, but one more global install. Note registry-proxy policy (§1.3) affects both equally; npm does not mitigate it |
| **No analytics at launch** | — | Sheet 07: *"Do not add tracking just because it exists."* Adding none means no cookie banner, no consent UI, no privacy policy obligation, no third-party script | Vercel Web Analytics — cookieless, ~1KB, add later if you actually want the data |

### 3.4 Deliberately excluded

React, Vue, Svelte (no island needs them — `<script>` on an Astro component is enough for a nav toggle); any CSS-in-JS; any animation library; any UI component kit (shadcn, MUI — they impose a visual identity, which is the opposite of the "distinctive" requirement); any CMS; any state management; any form backend at launch; any 3D/canvas/particle library; jQuery-era anything.

### 3.5 Two calls worth your attention

**Contact form → links only for v1.** A form means a serverless function, a third-party email API, an API key in environment variables (REQ-010 surface area), spam and bot handling, and a CAPTCHA question. It exists to save a recruiter four seconds. Recommend: prominent `mailto:` link, LinkedIn, GitHub, plus a stated response expectation and location/availability. Zero JS, zero secrets, zero maintenance. Add a form later only if the links demonstrably underperform.

**Email exposure.** A plain `mailto:` on a public page will be harvested. Options: accept it (most professionals do), use a dedicated address for the site, or obfuscate lightly. Recommend a dedicated forwarding address. Flagged as decision D7 and added to the risk register — the PRD does not currently mention it.

### 3.6 Proposed measurable targets (closing G5, G6, G7)

These replace the unmeasurable QA rows. Verified in CHUNKs 13–14.

**Performance** (Lighthouse mobile, throttled, on the production deploy):

| Metric | Target | Hard fail |
|---|---|---|
| Largest Contentful Paint | ≤ 1.5 s | > 2.5 s |
| Cumulative Layout Shift | ≤ 0.02 | > 0.1 |
| Interaction to Next Paint | ≤ 100 ms | > 200 ms |
| Total JS shipped, home page | ≤ 20 KB gzipped | > 50 KB |
| Total page weight, home page | ≤ 350 KB | > 700 KB |
| Lighthouse Performance | ≥ 98 | < 90 |
| Web font files | ≤ 3 (incl. mono) | > 4 |

**Accessibility:** WCAG 2.2 Level AA. Zero axe-core violations on every route. Full keyboard traversal of every journey. Visible focus on every interactive element. Usable at 200% zoom and at 320px width. `prefers-reduced-motion` honoured globally.

**Support matrix:** last 2 versions of Chrome, Edge, Firefox, Safari (desktop + iOS). Widths tested: 320, 375, 414, 768, 1024, 1280, 1440, 1920. No IE, no legacy Edge. Site must remain readable and navigable with JavaScript disabled — a real target here, not an aspiration, because with this stack it is nearly free.

### 3.7 Security posture

REQ-010 and QA-017/018 are written entirely about *content* — secrets and confidential data. That is the biggest risk and the PRD is right to lead with it, but it is not the whole surface. A static site still has a security configuration, and omitting one is a decision whether or not anyone makes it deliberately. Adding these now costs a single config file; adding them after an audit costs an argument.

| Control | Setting | Where |
|---|---|---|
| `Content-Security-Policy` | Restrictive: `default-src 'self'`; no `unsafe-inline` for scripts. Astro 6+ ships CSP support with automatic script/style hashing, so this is configuration rather than hand-maintained hashes | `vercel.json` / Astro config — CHUNK 01, tightened CHUNK 16 |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | `vercel.json` — CHUNK 01 |
| `X-Content-Type-Options` | `nosniff` | `vercel.json` — CHUNK 01 |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | `vercel.json` — CHUNK 01 |
| `Permissions-Policy` | Deny camera, microphone, geolocation, payment — none are used | `vercel.json` — CHUNK 01 |
| External links | `rel="noopener noreferrer"` enforced in the `Link` component, not left to authors | CHUNK 02 |
| Dependency vulnerabilities | `npm audit` in CI; Dependabot or Renovate on the GitHub repo | CHUNK 01 |
| Secret scanning | GitHub secret scanning enabled; `.env*` git-ignored from the first commit; built bundle grepped before launch | CHUNK 01, verified CHUNK 16 |
| Third-party scripts | None. There is no analytics, no font CDN, no embed — so there is no third-party origin to trust | By design |
| Attack surface | No forms, no server routes, no database, no auth at launch (§3.5). The smallest surface available | By design |

The last two rows are the real security story: **the most effective control here is that almost nothing is running.** The headers exist to make that explicit rather than accidental.

---

## 4. Information architecture

### 4.1 Decision: hybrid — a curated single-scroll home, with dedicated pages for depth

**Not a one-page site.** A single page fails three PRD requirements outright:

- **REQ-009 (SEO):** one page = one `<title>`, one meta description, one canonical URL, one OG image. Case studies become invisible to search and unshareable individually.
- **REQ-003 + R04:** two or more deep case studies plus experience plus skills on one page produces exactly the *"portfolio becomes too long"* risk the PRD already names.
- **Recruiter behaviour:** a hiring manager who wants to forward *one* piece of work to a technical lead needs a URL for that one piece. On a single-page site they can only send the whole thing.

**Not fully fragmented either.** Splitting Home / Work / Case Studies / Experience / Skills / About / Contact / Resume into eight destinations makes the site feel larger than its content and forces a recruiter to navigate to learn what could have been shown.

### 4.2 Route map

```
/                        Home — the 60-second answer
/work                    All work, one card per engagement
/work/[slug]             Case study (this IS the project page — see 2.6)
/about                   Story · how I work · experience timeline · skills
/contact                 Ways to reach me + resume
/404                     Not found

/raymund-bermudes-cv.pdf Resume (static asset, direct download)
/sitemap-index.xml       Generated
/robots.txt              Generated
/og/[slug].png           Generated OG images (CHUNK 15)
```

Six routes. Every one earns its place.

**Why no `/resume` page:** the PDF is the artefact recruiters want, and `/about` already carries the same information as HTML (which is better for SEO and for anyone who cannot open a PDF comfortably). A third representation would be a third thing to keep synchronised — and C11's note already warns *"keep synchronized with site."* One HTML source of truth, one PDF export.

**Why no `/skills` page:** in my judgement a standalone skills page is the easiest place on a portfolio to slide into unevidenced claims — it is a list with nothing anchoring it, and it competes with the resume for the same reader without adding anything the resume lacks. Skills live on `/about`, grouped by category, and — critically — each skill links to the case studies that demonstrate it. That turns a list into evidence, satisfying REQ-011 and Sheet 01's acceptance criterion for P14, *"Skills are evidence-oriented."*

**Why `/experience` is a section of `/about`, not a page:** experience and personal story answer the same recruiter question ("who is this person professionally?") and are read in one sitting. Two pages would make each feel thin. Reassess if the timeline exceeds ~6 roles.

### 4.3 Home page section order, and why

| # | Section | Answers | Design constraint |
|---|---|---|---|
| 1 | **Hero** | Who is he? What does he do? | Name, positioning line, one-sentence proof, two CTAs (View work / Resume). Must be legible without scrolling at 375×667. No animation gate on this content. |
| 2 | **The Delivery Thread** (compact) | How does he work? | The signature element (5.2). Horizontal 8-stage strip. Immediately after the hero because this *is* the differentiated positioning — business-to-technical bridge — and burying it wastes it. |
| 3 | **Selected work** (2–3 cards) | What has he built? What did *he* do? | Each card states problem, his role, stack, disclosure-safe outcome. Links to full case study. |
| 4 | **Experience** (condensed) | Where has he worked, for how long? | 3–4 lines, links to `/about`. |
| 5 | **Contact** | How do I reach him? | Always reachable; also in the footer on every page. |

Five sections. The recruiter's entire question list from Sheet 13 is answerable without leaving this page, with depth one click away everywhere.

### 4.4 Navigation

- **Header (all pages):** wordmark → `/` · **Work** · **About** · **Contact** · **Resume** (visually a button, links to the PDF). Three nav items plus a primary action (Resume *is* the action). Sticky on desktop, static on mobile (sticky headers cost vertical space where it is scarcest).
- **Mobile:** disclosure toggle → full-height panel. Native `<button aria-expanded>`, focus trapped while open, `Esc` closes, focus returns to the toggle. roughly 1KB (est.) of vanilla JS in one island.
- **Skip link** as the first focusable element on every page.
- **Footer (all pages):** contact block, resume link, social links, copyright, "last updated" date. The footer is a real navigation surface — it is where people look after finishing a page.
- **Case study pages:** breadcrumb (`Work / [title]`), the Delivery Thread rail as in-page navigation (5.2), and prev/next case study at the end.
- **No dropdown menus. No mega-menu. No hamburger on desktop.** The site is not big enough to hide anything.

### 4.5 User flows

**Flow A — Recruiter, ~45 seconds, likely on mobile.**
`/` → reads hero (10s: name, role, positioning) → glances at Delivery Thread (10s: "he does requirements-to-support, not just code") → scans two work cards (15s) → clicks **Resume** (10s). Exit satisfied.
*Design consequence:* hero, thread and first work card must all be reachable within two thumb-scrolls at 375px. Resume must be reachable from the fold without scrolling — hence its place in the header.

**Flow B — Hiring manager, 3–5 minutes.**
`/` → `/work` → opens the most relevant case study → reads Problem / My Role / Investigation → skims Solution → `/about` for experience → `/contact`.
*Design consequence:* "My Role" must appear high in every case study, not buried after the architecture section. Sheet 06 lists it fourth — I am recommending it be visually elevated into the case study header block rather than waiting its turn in the prose.

**Flow C — Technical lead, 10+ minutes.**
Arrives via a direct case study link someone forwarded → reads the full delivery thread → expands technical detail sections → inspects architecture diagram → checks stack tags → may check GitHub.
*Design consequence:* every case study must be a valid, self-explaining entry point — full context in its header, no reliance on having read the home page. And the deep technical material must be *present*, just progressively disclosed — not absent.

**Flow D — Potential client.**
`/` → Delivery Thread (can he take something end to end?) → `/about` (how he works) → `/contact`.
*Design consequence:* the About page needs a "how I work" section, not just a biography. Sheet 01 P15 already anticipates this.

---

## 5. UX strategy

### 5.1 The strategy in one paragraph

The portfolio's distinctiveness comes from **one structural idea, applied consistently**, not from a collection of effects. The idea: *the delivery lifecycle is the site's organising structure.* Raymund's differentiator is that he spans Requirement → Analysis → Design → Development → Testing → UAT → Release → Support, so the site uses that lifecycle as its actual navigation and narrative spine — not as a decorative graphic. A visitor navigates a case study *by stage*, which means the thing that makes the site memorable is the same thing that makes it easier to read. That is the test every candidate interaction has to pass, and most of them fail it.

### 5.2 Signature concept 1 — The Delivery Thread

| Field | Detail |
|---|---|
| **Concept** | The 8-stage delivery lifecycle rendered as a persistent, interactive rail. On the home page: a compact horizontal strip, each stage a short label + one line of what Raymund actually does at that stage. `[VERIFY INFORMATION]` **the 8 stages are taken from your own framing of your work, but "Design" is not in the experience list you gave me** — confirm you own design work on these projects, or the stage is dropped to seven. A lit stage you do not own is exactly the fabrication the rest of this architecture is built to prevent. On a case study page: a sticky vertical rail (desktop) / collapsible progress strip (mobile) where **the case study's own sections map onto the stages** — Problem sits at *Requirement*, Investigation at *Analysis*, Solution at *Development*, Validation at *Testing/UAT*, Result at *Release*, Lessons at *Support*. Scrolling moves the active marker. Clicking a stage jumps to that section. |
| **Purpose** | Encode the professional positioning structurally instead of asserting it in a sentence. Show that the same person handled requirement gathering *and* the production incident. |
| **User benefit** | It is wayfinding. On a 2,000-word case study, a reader can see where they are, how much is left, and jump straight to the part they care about — a technical lead goes to *Development*, a manager goes to *Requirement* and *Result*. It replaces a generic table of contents with one that carries meaning. |
| **Content benefit** | It forces every case study into the same skeleton, which makes case studies comparable and makes writing them easier (the template becomes a form to fill in). It makes the Sheet 06 template visible to the reader rather than invisible scaffolding. |
| **Implementation complexity** | **Low–medium.** Static markup (an ordered list of anchor links) + a small island (est. ~1.5KB) using `IntersectionObserver` for the active state. Home strip is pure CSS, zero JS. |
| **Performance risk** | **Very low.** One small observer, no layout thrash, no animation library. |
| **Accessibility risk** | **Low, if built correctly.** It is a `<nav aria-label="Case study sections">` containing an ordered list of in-page links — a standard, well-understood pattern. Active stage marked with `aria-current="true"`. Fully keyboard operable because links are links. With JS disabled it degrades to a plain, working table of contents. Motion limited to a 150ms marker transition, disabled under `prefers-reduced-motion`. |
| **Recommendation** | **Adopt.** This is the portfolio's signature. It is the only candidate that makes the site simultaneously more distinctive *and* easier to read, which is the standard Sheet 03 sets. |

*PRD mapping:* this supersedes Sheet 04's "Case-study scrollytelling" row, delivering its content benefit without tying comprehension to scroll position. Sheet 04's "Interactive system diagram" is **not** superseded — it is adopted separately in a static form (§5.4) and complements the Thread.

### 5.3 Signature concept 2 — Evidence-first cards with two-depth disclosure

| Field | Detail |
|---|---|
| **Concept** | Every project card carries a fixed evidence structure — **Problem** (one sentence) · **My role** (explicit, separated from team) · **Stack** (tags) · **Outcome** (verified, qualitative if no metric exists). No hero image required, no marketing blurb, no "view project" mystery link. Inside case studies, deeper technical material sits in native `<details>` disclosures labelled e.g. "Technical detail — dependency resolution". |
| **Purpose** | Answer Sheet 13's questions *on the card*, before the click. Directly implement Sheet 03's "Progressive Disclosure" and "Scannability". |
| **User benefit** | A recruiter comparing candidates gets the same four facts in the same place on every card. A technical reader can expand exactly the depth they want without a wall of text for everyone else. |
| **Content benefit** | The card template makes it structurally awkward to write vague copy — there is a labelled slot for "my role" and it looks wrong when empty. The slot is labelled **Outcome**, not *Impact* or *Results* — a deliberately quieter word that a sentence can fill honestly. There is no dedicated number field, no stat band, no large-numeral treatment anywhere in the design system. That does not eliminate the temptation behind REQ-011, but it removes the empty box that invites it. |
| **Implementation complexity** | **Low.** `<details>`/`<summary>` is native HTML — zero JS, accessible by default, works with search-in-page in modern browsers. |
| **Performance risk** | **None.** |
| **Accessibility risk** | **Very low.** Native disclosure semantics. Only requirement: never hide *essential* content behind a disclosure — summaries must stand alone. |
| **Recommendation** | **Adopt.** |

### 5.4 Every other concept, evaluated

Each is assessed in the eight fields the brief requires. **Where a concept is adopted in a modified form, the ratings describe the form being adopted, not the form being rejected** — the rejected variant's risk is noted in the recommendation.

| Concept | Purpose | User benefit | Content benefit | Complexity | Perf risk | A11y risk | Recommendation |
|---|---|---|---|---|---|---|---|
| **Typography-driven interface** (PRD: `Recommended`) | Establish a premium, considered identity without imagery | Hierarchy and whitespace make a dense page scannable rather than intimidating | It is the only visual strategy that works under confidentiality constraints — no screenshots needed | Low | **Positive** — type is the cheapest visual asset there is | Low — larger sizes and generous measure help, provided contrast holds | **ADOPT.** Primary visual strategy (CHUNK 02) |
| **Static experience timeline** (PRD: "Interactive project timeline", reduced) | Show career progression at a glance | Answers "how long, where, doing what" in one scan, without reading prose | Gives roles a shape and links each to the work that evidences it | Low — a styled `<ol>` | None | Low — semantic ordered list, reads correctly in a screen reader | **ADOPT the content, REJECT the interaction.** The PRD's own note ("can become decorative") is right; an interactive timeline adds state and motion to information that is already scannable as a list (CHUNK 10) |
| **Static architecture diagrams** (PRD: "Interactive system diagram", reduced) | Show system shape, integrations and data flow | One diagram replaces three paragraphs for a technical reader, and lets a non-technical reader skip cleanly | Highest-signal content a Solution Analyst can publish, and it survives abstraction — the shape is shareable when the detail is not | Medium — hand-authored SVG per case study; the cost is drawing, not coding | None — inline SVG, no runtime | Low **as adopted**: `<figure>` + `<figcaption>` + a text alternative describing the flow in words. (The *interactive* variant rates High — canvas or unlabelled SVG is opaque to assistive tech) | **ADOPT AS STATIC SVG.** Interactivity adds nothing a good static diagram does not already convey (CHUNK 06/07) |
| **Authentic monospace detail** (PRD: "Code/terminal motif", reduced) | Technical texture that is real rather than themed | Real code and sanitised log excerpts are legible evidence; a decorative terminal is not | Lets a case study show the actual artefact of investigation | Low — Shiki highlighting, already in the stack | Low | Low — code blocks need a language label and must not rely on colour alone | **ADOPT NARROWLY, REJECT THE MOTIF.** Fake terminals are on your avoid-list, and a terminal costume argues against the Solution Analyst positioning. Real mono for real code only (CHUNK 06) |
| **Project explorer / filters** | Help a recruiter find work relevant to their role | Real only above a content threshold — with three projects, filtering hides one card | Could surface the breadth of `workType` (analysis vs. development vs. support) | Medium — state, URL sync, empty state, announcements | Low | Medium — filtered-out content must stay reachable, results need a live region, and filter controls need labels | **DEFER until ≥ 6 projects exist** (Gap G8). Tech tags are still *displayed* on every card meanwhile — the metadata is visible, just not clickable |
| **Command palette (⌘K)** | Fast navigation; signals developer literacy | Low here — it duplicates a three-item nav that is already one click away | None. It surfaces no content that navigation does not | Medium — focus trap, live results, index maintenance | Low (est. ~4KB island) | Medium — focus management, result announcements, no touch equivalent, and the shortcut is undiscoverable without a visible hint | **DEFER post-launch.** Published guidance on the pattern names this exact case as one not to use it: a small surface where the plain path is already strong (source in §12) |
| **Progressive project cards** (expand in place) | Depth without navigation | Negative on mobile — expansion pushes content and loses scroll position | Creates a second, divergent copy of the case study summary | Medium | Low | Medium — expanded state, scroll jumps, duplicate headings | **REJECT** in favour of card → page (§5.3). Two sources of truth for the same content is a maintenance trap, not a feature |
| **Case-study scrollytelling** | Narrative reveal of problem → solution | Negative — comprehension becomes a function of scroll position and speed | None that the Delivery Thread does not deliver | High | Medium–high — scroll listeners, pinned sections, layout work | **High** — collides head-on with Sheet 03's "Accessible Motion" principle and its named anti-pattern, *"Content only visible after animation"* | **REJECT.** The one concept on this list that the PRD's own principles rule out |
| **Cursor / micro-interaction effects** | Visual identity, polish | None — a custom cursor replaces a system affordance the user already understands | None | Low | Low | Medium — meaningless on touch, can obscure the real pointer, interferes with some assistive setups | **REJECT custom cursors.** Adopt only conventional hover/focus/active state changes, which Sheet 03 already requires under "Immediate Feedback" |

**Tally:** 2 adopted as signature elements (§5.2, §5.3), 3 adopted in reduced form, 2 deferred against a growth threshold, 4 rejected. That satisfies Sheet 03's "one or two signature interactions" while keeping the content benefit of the concepts worth keeping.

### 5.5 The non-negotiable rule for every interaction

Every interactive element in this site must satisfy all five:

1. It works with a keyboard alone, with a visible focus indicator.
2. It works with JavaScript disabled, or it is genuinely non-essential.
3. It works under `prefers-reduced-motion: reduce`.
4. It works at 320px width and with a touch target of at least 44×44 CSS px.
5. **It makes content easier to reach, not harder.** If it fails this one, it is deleted regardless of how the other four went.

---

## 6. Design direction

### 6.1 Typography

Editorial, not decorative. Type does the work that imagery would otherwise do — this is the deliberate answer to having no stock photography, no fabricated screenshots and confidentiality constraints on real ones.

| Role | Recommendation | Reason |
|---|---|---|
| **Primary (UI + headings)** | **Geist Sans** | Neutral, engineered, excellent at large display sizes and small UI sizes; self-hosted via Astro Fonts API. Sheet 14 already flags Geist for study — note it is a *reference*, not a requirement, and I am recommending it on merit, not deference |
| **Long-form prose (case studies only)** | **Newsreader** *or* keep Geist Sans | A serif gives the case studies a distinct "reading" register versus the "interface" register of the rest of the site. I am not going to claim a measured legibility advantage — the evidence on serif-vs-sans reading speed on screens is genuinely mixed. **However** — recommend shipping v1 with Geist Sans only and evaluating the serif in CHUNK 12 against real copy. Do not add a third font family on a hunch |
| **Code / metadata** | **Geist Mono** | Real code, log excerpts, stack tags, dates, file paths |

Two families at launch (one sans + one mono), maximum three ever. Weights: 400, 500, 700 only — every extra weight is another file against the ≤3 budget.

**Scale** — fluid, `clamp()`-based, ~1.25 ratio at mobile widening to ~1.333 at desktop:

```
display   clamp(2.5rem, 1.6rem + 4.5vw, 4.5rem)    /* hero name only */
h1        clamp(2rem,   1.4rem + 3vw,   3.25rem)
h2        clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)
h3        clamp(1.25rem,1.1rem + 0.8vw, 1.5rem)
body      1.0625rem → 1.125rem            /* 17→18px; 16px is a UI default, not a reading size */
small     0.875rem
mono      0.9375rem
```

Line height: 1.15 display, 1.25 headings, **1.65 body**. Measure capped at **68ch** for prose. Line length is the constraint most often lost on wide screens, and a 2,000-word case study at full viewport width is unreadable regardless of how good the type is — this is the direct implementation of REQ-005.

### 6.2 Colour

Near-monochrome ink-on-paper with exactly one accent, reserved for interactive affordances. Restraint here is what prevents the "excessive gradients / neon" failure mode on the avoid-list, and it is also what makes the site cheap to keep accessible.

**All ratios below are computed, not estimated.**

| Token | Light | Ratio vs bg | Dark | Ratio vs bg |
|---|---|---|---|---|
| `--bg` | `#FFFFFF` | — | `#0E0E0D` | — |
| `--surface` | `#F6F6F3` | — | `#191917` | — |
| `--text` | `#14140F` | **18.47:1** ✅ AAA | `#F4F4EF` | **17.51:1** ✅ AAA |
| `--text-muted` | `#535349` | **7.77:1** ✅ AAA | `#A8A8A0` | **8.07:1** ✅ AAA |
| `--accent` | `#1A43BD` | **8.13:1** ✅ AAA | `#8FA8FF` | **8.47:1** ✅ AAA |
| `--border` (decorative) | `#E4E4DE` | 1.28:1 (non-text) | `#2C2C28` | 1.38:1 (non-text) |
| `--border-strong` (UI boundaries) | `#8E8E87` | **3.30:1** ✅ ≥3:1 | `#6B6B61` | **3.59:1** ✅ ≥3:1 |

Cards use `--surface`, so those pairs matter too and were computed separately: muted on surface **7.18:1** light / **7.36:1** dark; accent on surface **7.51:1** light / **7.72:1** dark; body text on surface **17.06:1** light / **15.96:1** dark.

**All eight text pairs clear AAA (7:1) against both background and surface.** The muted and accent values were darkened from a first draft specifically to reach that line — at `#5A5A52` and `#1F4DD8` they were 6.96:1 and 6.75:1, which is AA but not AAA, and "nearly AAA" is not a thing. The headroom is deliberate: later design tweaks are then unlikely to break contrast. Borders are non-text, so `--border` is exempt from the 3:1 rule and `--border-strong` (which marks real UI boundaries) meets it.

**Dark mode:** not mentioned anywhere in the PRD (gap A4). Recommendation: **define both value sets in CHUNK 02 but ship light-only until CHUNK 12.** Retrofitting dark mode into a single-valued token system is a rewrite; carrying a second value per token from day one costs almost nothing. Default to `prefers-color-scheme` with a manual toggle persisted in `localStorage`.

**Accent discipline:** `--accent` is used *only* for links, focus rings, active states and the Delivery Thread's active marker. It is never used for decoration, never for large fills, never for gradients. One accent, used consistently, reads as deliberate; three accents read as a template.

### 6.3 Layout & spacing

```
Page shell max-width     1200px
Prose max-width          68ch      (case study body)
Wide content             1040px    (cards, grids)
Gutters                  20px mobile · 32px tablet · 48px+ desktop
Grid                     12 col desktop · 6 col tablet · 4 col mobile · 24px gutter
```

Spacing scale, 4px base — a strict scale, no arbitrary values:
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

Section rhythm: `96px` mobile / `128px` desktop between major sections; `48px` between subsections. Vertical space is what separates typography-led design from sparse design: with no imagery to carry the page, rhythm has to. It also costs nothing, which matters when confidentiality limits what can be shown.

### 6.4 Components — visual rules

- **Buttons:** two variants only. Primary (solid ink, inverse text) and secondary (1px `--border-strong` outline). Radius `6px`. Min height `44px`. No third variant, no icon-only buttons without an accessible name.
- **Links:** in prose, underlined with `text-underline-offset: 0.2em` — always underlined, never colour-only (WCAG 1.4.1). In UI, accent colour plus a hover underline.
- **Cards:** `--surface` background, `1px --border`, radius `10px`, padding `24px`/`32px`. Hover raises border to `--border-strong` and shifts `translateY(-2px)`. **The whole card is a link** with the title as the accessible name — not a separate "read more" link, which creates a redundant tab stop.
- **Tags (tech/metadata):** mono, `0.8125rem`, uppercase off, `--surface` fill, `--border` outline, radius `4px`. Non-interactive at launch (see 5.4).
- **Focus ring:** `2px solid var(--accent)` with `2px` offset, on **every** focusable element, via `:focus-visible`. Never removed. This is checked in QA and is a hard fail.
- **Inputs:** deferred with the contact form (3.5).
- **No shadows** beyond a single subtle elevation token, if any. No glassmorphism. No gradients.

### 6.5 Motion

| Property | Value |
|---|---|
| Fast (hover, focus, colour) | `150ms` |
| Standard (disclosure, marker, page transition) | `250ms` |
| Easing | `cubic-bezier(0.2, 0, 0, 1)` — standard "decelerate" |
| Permitted properties | `opacity`, `transform` only (compositor-only; never animate layout properties) |
| Entry animation | Fade + `translateY(8px)`, **once**, only on below-fold sections, never on hero or nav |
| Page transition | CSS View Transitions — a `120ms` cross-fade, nothing directional |
| Reduced motion | A global rule setting `animation-duration: 0.01ms` and `transition-duration: 0.01ms` with `!important`, plus disabling view transitions. All content remains fully visible in final state |

**Hard rule:** no content is ever invisible pending an animation. Entry animations start from `opacity: 0.001` only when JS and motion are both confirmed available; the default server-rendered state is fully visible. This closes the Sheet 03 anti-pattern *"Content only visible after animation"* and protects against the JS-disabled case.

All of this lives in one place — `MotionWrapper` / a motion token file — so R02 ("too much animation") is mitigated structurally rather than by willpower.

### 6.6 Visual identity

No logo. The wordmark is **"Raymund Bermudes"** set in Geist Sans Medium with tight tracking — for an individual, a name *is* the brand, and an abstract logo would imply an organisation that does not exist. Favicon: a simple monogram mark or a solid-accent glyph, generated in CHUNK 15.

Imagery policy, given confidentiality constraints: **no stock photography, ever** (on your avoid-list and correctly so). Permitted visuals are (a) hand-authored architecture/flow SVGs, (b) sanitised screenshots *only* after disclosure-tier clearance, (c) type and whitespace. A professional headshot on `/about` is optional — recommended, humanising, and it must be a real photo of you or nothing. `[VERIFY INFORMATION: do you want a headshot?]`

---

## 7. Component architecture

### 7.1 Tree

```
src/
├── layouts/
│   ├── BaseLayout.astro          html/head/body, SEO head, skip link, header, footer
│   ├── PageLayout.astro          BaseLayout + page title block + shell width
│   └── CaseStudyLayout.astro     PageLayout + DeliveryThreadRail + prose container + prev/next
│
├── components/
│   ├── seo/
│   │   ├── SEOHead.astro         title, description, canonical, OG, Twitter, JSON-LD
│   │   └── StructuredData.astro  Person / WebSite / CreativeWork schema
│   │
│   ├── layout/
│   │   ├── SiteHeader.astro
│   │   ├── MobileNav.astro       ← island (~1KB): aria-expanded, focus trap, Esc
│   │   ├── SiteFooter.astro
│   │   ├── SkipLink.astro
│   │   ├── Container.astro       shell / wide / prose width variants
│   │   └── ThemeToggle.astro     ← island (CHUNK 12)
│   │
│   ├── ui/
│   │   ├── Button.astro          primary | secondary; renders <a> or <button>
│   │   ├── Link.astro            internal/external, external marked accessibly
│   │   ├── Card.astro            surface + border + hover primitive
│   │   ├── Tag.astro             tech / metadata chip
│   │   ├── SectionHeader.astro   eyebrow + h2 + optional lede — one hierarchy, everywhere
│   │   ├── Disclosure.astro      wraps native <details>/<summary>
│   │   └── Prose.astro           typographic defaults for MDX body
│   │
│   ├── delivery/                 ← the signature element
│   │   ├── DeliveryThreadStrip.astro   home: horizontal, CSS-only, zero JS
│   │   ├── DeliveryThreadRail.astro    case study: sticky rail, anchor links
│   │   ├── deliveryThread.client.ts    ← island: IntersectionObserver active state
│   │   └── stages.ts                   the 8 stages, single source of truth
│   │
│   ├── work/
│   │   ├── ProjectCard.astro     problem · my role · stack · outcome
│   │   ├── ProjectGrid.astro
│   │   ├── ProjectMeta.astro     dates, org type, disclosure tier badge
│   │   └── ProjectFilters.astro  ← DEFERRED (see 5.4); not built in v1
│   │
│   ├── casestudy/
│   │   ├── CaseStudyHeader.astro title, context, MY ROLE (elevated — see 4.5 Flow B)
│   │   ├── CaseStudySection.astro  maps a Sheet 06 section to a delivery stage
│   │   ├── ArchitectureFigure.astro inline SVG + figcaption + text alternative
│   │   ├── Callout.astro         note / constraint / lesson
│   │   ├── CodeBlock.astro       Shiki-highlighted, with optional caption
│   │   └── CaseStudyNav.astro    prev / next
│   │
│   ├── about/
│   │   ├── ExperienceTimeline.astro   semantic <ol>, static
│   │   ├── ExperienceItem.astro
│   │   ├── SkillGroup.astro           category → skills
│   │   └── SkillItem.astro            links to case studies that evidence it
│   │
│   └── contact/
│       ├── ContactBlock.astro    reused on /, /contact, footer
│       └── ResumeLink.astro      single source for the resume URL + label
│
├── content/
│   ├── config.ts                 Zod schemas — the contract
│   └── work/
│       ├── enterprise-android-delivery.mdx     ← slugs are tier-neutral by rule:
│       ├── production-security-remediation.mdx    a slug may contain a client name
│       └── workflow-system-integration.mdx        ONLY when disclosure === 'named'
│
├── data/
│   ├── site.ts                   name, positioning, URLs, contact, resume path
│   ├── experience.ts
│   ├── skills.ts
│   └── nav.ts
│
├── styles/
│   ├── tokens.css                colour, type, space, motion — light + dark values
│   ├── base.css                  reset, element defaults, focus-visible, reduced-motion
│   └── prose.css
│
├── pages/
│   ├── index.astro
│   ├── work/index.astro
│   ├── work/[...slug].astro
│   ├── about.astro
│   ├── contact.astro
│   ├── 404.astro
│   └── og/[...slug].png.ts       generated OG images (CHUNK 15)
│
└── lib/
    ├── seo.ts
    └── format.ts
```

### 7.2 What changed versus PRD Sheet 08, and why

**Kept, renamed or split:** `SiteHeader`, `MobileNavigation` → `MobileNav`, `Hero` (becomes a page section rather than a global component — it appears once), `SectionHeader`, `ProjectCard`, `ProjectGrid`, `CaseStudyLayout`, `TechTag` → `Tag`, `Timeline` → `ExperienceTimeline`, `ContactBlock`, `Footer` → `SiteFooter`.

**`MotionWrapper` — recommended for removal as a component.** Sheet 08's intent (centralise motion behaviour) is right, but in this stack it is better served by CSS custom properties in `tokens.css` plus a single global `prefers-reduced-motion` rule. A wrapper component would mean a JS island around static content — the exact cost we are avoiding. *The requirement is honoured; the implementation differs.* Flagged as a recommendation, not a silent change.

**Added, absent from Sheet 08 but required by the PRD's own requirements:** `SEOHead` + `StructuredData` (REQ-009 has no component today), `SkipLink` (REQ-007), `Disclosure` (Sheet 03 progressive disclosure), `Prose` (REQ-005), `Container`, `Button`, `Link`, `Card`, `CodeBlock`, `Callout`, `ArchitectureFigure`, `CaseStudyHeader`/`Section`/`Nav`, `SkillGroup`/`SkillItem`, `ResumeLink`, `ThemeToggle`, `404`, and the whole `delivery/` group.

**Deferred:** `ProjectFilters` (see 5.4), contact form inputs (see 3.5).

**Design rule:** exactly four islands in the entire site — `MobileNav`, `deliveryThread`, `ThemeToggle`, and (later, if ever) `ProjectFilters`. Everything else is static HTML. If a fifth island is proposed, it needs a written justification against the 5.5 rules.

---

## 8. Content architecture

### 8.1 Principle

**Content is data with a validated shape; components render that shape. Adding a project must never mean editing a component.**

```
content/work/*.mdx  ──►  Zod schema validation (build fails on violation)
        │
        ├──►  ProjectCard        (frontmatter only)
        ├──►  /work index        (frontmatter only)
        ├──►  /work/[slug]       (frontmatter + MDX body)  — slug is public; see the naming rule below
        └──►  skill → evidence links  (derived from frontmatter.stack)
```

One file in, four surfaces out. A new project is one new `.mdx` file and nothing else.

### 8.2 The work collection schema (proposed)

```ts
// src/content/config.ts
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    // identity
    title:        z.string(),           // names the problem, not the app (Sheet 06)
    slug:         z.string(),
    order:        z.number(),           // manual curation beats reverse-chronological
    featured:     z.boolean().default(false),   // appears on home

    // CONFIDENTIALITY — required, no default. Cannot be forgotten. (see 2.4)
    disclosure:   z.enum(['named', 'sectoral', 'abstracted']),
    client:       z.string().min(1).optional(), // permitted ONLY when disclosure === 'named'
    clientDescriptor: z.string().min(1),        // the public wording, at the cleared tier
    confidentialityReview: z.object({           // an event, not a checkbox
      reviewedBy: z.string().min(1),
      reviewedOn: z.date(),
      tierConfirmed: z.enum(['named','sectoral','abstracted']),
    }),

    // the evidence block rendered on every card (see 5.3)
    problem:      z.string().min(1).max(200),
    myRole:       z.string().min(1),    // REQ-002 — personal contribution, required
    outcome:      z.string().min(1),    // verified; qualitative allowed, invention not

    // metadata
    stack:        z.array(z.string()),
    domain:       z.array(z.string()),  // e.g. ['banking','enterprise-mobility']
    workType:     z.array(z.enum([
                    'requirements-analysis','android-development','maintenance',
                    'integration','troubleshooting','security','uat-support',
                    'release','reporting'
                  ])),
    period:       z.object({ start: z.string(), end: z.string().optional() }),

    // delivery-stage coverage — drives the Delivery Thread rail
    stages:       z.array(z.enum([
                    'requirement','analysis','design','development',
                    'testing','uat','release','support'
                  ])),

    // seo
    description:  z.string().max(160),
    updated:      z.date(),
  })
  .refine(d => d.disclosure !== 'named' || !!d.client,
          'A "named" project must specify client')
  .refine(d => d.disclosure === 'named' || !d.client,
          'Only a "named" project may specify client')
  .refine(d => d.confidentialityReview.tierConfirmed === d.disclosure,
          'Reviewed tier does not match the tier this project publishes at')
  .refine(d => d.disclosure === 'named' || !containsClientName(d.slug),
          'Slug leaks a client name for a non-named project'),
});
```

**Why this matters more than it looks.** Three of the PRD's Critical requirements — REQ-002 (personal contribution), REQ-010 (no confidential data), REQ-011 (no fabrication) — currently depend on you remembering them at the moment of writing, months apart, probably late at night. The schema moves what it can out of memory and into the build: `.min(1)` means an empty `myRole` fails the build rather than shipping as blank; the slug refinement means a client name cannot reach a public URL for a project published at a tier that forbids it; `confidentialityReview` is recorded as a dated event with a named reviewer rather than a boolean you can tick without thinking.

**Be clear about the limit, though.** This is a *forcing function*, not verification. Nothing here can tell whether what you wrote in `myRole` is true, whether `outcome` is accurate, or whether the review actually happened — the last is still self-attestation, just self-attestation with a date on it. The schema raises the floor and makes omission loud. It does not make fabrication impossible. Only CHUNK 16 and your own judgement do that.

The `stages` array is what keeps the Delivery Thread honest: a project where you only did development shows fewer lit stages than one you took end to end. It is still self-reported — the schema cannot verify it, and nothing here can — but it is at least *specific* self-reporting, per project, visible side by side, which is harder to inflate than a paragraph.

### 8.3 Case study body structure (MDX)

Body sections follow Sheet 06 exactly, each mapped to a delivery stage:

| Sheet 06 section | Delivery stage | Notes |
|---|---|---|
| Context | Requirement | System, scale, constraints — at the disclosure tier |
| Problem | Requirement | Concrete symptoms or business need |
| My Role | *(elevated to header)* | Rendered in `CaseStudyHeader`, not buried mid-page (Flow B) |
| Investigation | Analysis | Logs, reproduction, dependency checks, requirement clarification |
| Technical Challenge | Design | What made it hard |
| Solution | Development | Architecture and implementation depth; `ArchitectureFigure` lives here |
| Validation | Testing / UAT | Unit, manual, UAT, release validation |
| Result | Release | Verified outcome; **no metric invented** to fill the slot |
| Lessons | Support | What it demonstrates professionally |

### 8.4 Non-MDX content

- **`data/experience.ts`** — typed array: org, title, start/end, location, 3–5 responsibility bullets, `relatedWork: string[]` linking to case study slugs. Typed, not MDX, because it is structured and repetitive.
- **`data/skills.ts`** — categories (Languages · Android · Integration · Data · Enterprise Systems · Practices) with `{ name, evidence: slug[] }`. **No proficiency levels, no percentages, no star ratings** — Sheet 05 C09 bans them and they are unverifiable by definition. Evidence links replace them.
- **`data/site.ts`** — name, positioning line, email, LinkedIn, GitHub, resume path, location, availability. Single source of truth so the resume link, footer and contact page can never drift apart.
- **Resume PDF** — `public/raymund-bermudes-cv.pdf`, referenced only through `ResumeLink`. C11's synchronisation note is handled by `/about` being generated from `experience.ts`, the same data you would use to update the PDF.

### 8.5 Scaling properties

Adding a project: one MDX file. Adding a role: one array entry. Adding a skill: one entry plus evidence slugs. Adding a blog later: a second collection and two routes, with zero change to existing content. Changing the design system: token file only. **No UI component is ever edited to add content** — which was the explicit requirement.

---

## 9. Development roadmap

### 9.1 Two changes to the PRD's sequence, and why

**1. Content production is scheduled, not assumed.** The PRD roadmap (P01–P25) has no task for *writing the case studies*; P12 builds the system. G1 is the project's real critical path and it is currently invisible. CHUNK 00 and CHUNK 07 fix that.

**2. Deploy on day one, not at P23.** The PRD deploys at the end. Recommend deploying an effectively blank site in CHUNK 01 so that: every subsequent chunk gets a real preview URL reviewable on your actual phone; deployment problems surface when the site is trivial instead of at launch; and the "walking skeleton" (build → CI → deploy) is proven before anything depends on it. This costs an hour and removes a whole class of end-of-project failure.

Everything else follows the PRD's ordering.

### 9.2 Chunks

Each is independently testable and independently deployable.

| # | Chunk | Deliverable | Done when | PRD |
|---|---|---|---|---|
| **00** | **Content & confidentiality clearance** *(no code)* | Disclosure tier per engagement; raw notes for 2+ case studies; resume PDF; hero positioning decided; contact details confirmed | Sheet 06 template filled in rough prose for ≥2 projects; every `[CONTENT REQUIRED]` in §10.2 answered or consciously deferred | P02, R03, REQ-003/010/011 |
| **01** | **Project foundation** | Astro + TS strict + Tailwind + ESLint/Prettier + `astro check`; git repo; GitHub; Vercel connected; blank page live | `npm run build` clean, CI green, production URL loads, preview deploys work on a branch | P04, P08 |
| **02** | **Design system** | `tokens.css` (light+dark values), `base.css`, type scale, spacing, focus-visible, reduced-motion, `Button`/`Link`/`Card`/`Tag`/`Container`/`SectionHeader`/`Prose` on a `/styleguide` dev route | Every token renders; contrast values verified against §6.2; styleguide passes axe | P06 |
| **03** | **Global shell** | `BaseLayout`, `SiteHeader`, `MobileNav` island, `SiteFooter`, `SkipLink`, `SEOHead` scaffold, `404` | Nav works at all 8 widths; keyboard-only traversal complete; skip link works; mobile panel traps focus and closes on Esc | P09, REQ-007/008 |
| **04** | **Content layer** | `content/config.ts` schemas, `data/*.ts`, one placeholder MDX project proving the pipeline | Build fails on an invalid project; succeeds on a valid one; types flow to components | P02, REQ-002/010 |
| **05** | **Work index + ProjectCard** | `/work`, `ProjectCard`, `ProjectGrid`, `ProjectMeta` | Cards show problem/role/stack/outcome; whole card is one link with a correct accessible name; responsive at all widths | P11, REQ-002 |
| **06** | **Case study system + Delivery Thread** | `CaseStudyLayout`, header with elevated My Role, section components, `DeliveryThreadRail` + island, prev/next, `Disclosure`, `CodeBlock`, `Callout`, `ArchitectureFigure` | Rail tracks scroll; works with JS off as a plain TOC; `aria-current` correct; motion respects reduced-motion; 68ch measure holds | P12, P07, REQ-003/004/005 |
| **07** | **Case study content — real** | 2+ real case studies written from CHUNK 00 material, at cleared disclosure tiers, with architecture figures | Recruiter Review questions 3–6 answerable from these pages alone; zero unverified claims; confidentiality re-checked | P02, REQ-003/011, R03 |
| **08** | **Home — hero** | Hero section, positioning, CTAs | Role understood in ≤10s by someone who has not seen the site; legible without scroll at 375×667; no animation gating | P10, REQ-001 |
| **09** | **Home — thread + selected work + experience teaser** | `DeliveryThreadStrip`, featured cards, condensed experience | Home answers all Sheet 13 questions or links directly to the answer | P10/P11/P13 |
| **10** | **About** | Story, how-I-work, `ExperienceTimeline`, skills with evidence links | Timeline semantic and static; every skill links to evidence or is explicitly unlinked; no proficiency bars | P13/P14/P15, REQ-011 |
| **11** | **Contact + resume** | `/contact`, `ContactBlock`, `ResumeLink`, footer contact | Contact reachable in ≤2 clicks from every page; resume downloads; mailto works on mobile | P16/P17, REQ-012 |
| **12** | **Responsive + dark mode** | Full pass at 8 widths; `ThemeToggle`; dark token values shipped | No horizontal scroll anywhere; touch targets ≥44px; dark mode contrast verified; toggle persists and respects system default | P18, REQ-008 |
| **13** | **Accessibility** | Axe on every route; manual keyboard pass; screen reader pass; 200% zoom; reduced-motion verification | WCAG 2.2 AA, zero axe violations, full keyboard journeys, JS-disabled site still navigable | P19, REQ-007 |
| **14** | **Performance** | Image pipeline, font subsetting, JS audit, Lighthouse | All §3.6 targets met on the production URL, mobile throttled | P20, REQ-006 |
| **15** | **SEO** | Metadata per route, OG image generation, JSON-LD (Person/CreativeWork), sitemap, robots, canonical, favicon | Rich-results test passes; every route has unique title/description/OG; sitemap submitted | P21, REQ-009 |
| **16** | **Security, confidentiality & recruiter review** | Repo secret scan, bundle inspection, disclosure-tier re-audit on published copy, full Sheet 13 walkthrough, Sheet 09 QA run | No secrets, no confidential data, no fabricated claims; all 10 recruiter questions answered; QA-001→023 all Pass | P22/P25, REQ-010/011 |

**Post-launch backlog (not v1):** project filters (if project count ≥6), command palette (if the surface grows), serif prose face, writing/blog section, contact form, analytics.

### 9.3 Dependencies

```
CONTENT TRACK
  00 ─────────────────────────────────────────────► 07
                                                     ▲
BUILD TRACK                                          │
  01 ──► 02 ──► 03 ──► 04 ──► 05 ──► 06 ─────────────┤
                       │       │                     │
                       │       └──► 08 ──► 09 ───────┤
                       └──► 10 ──► 11 ───────────────┤
                                                     │
QA TRACK                                             ▼
                              12 ──► 13 ──► 14 ──► 15 ──► 16
```

**CHUNK 00 blocks only CHUNK 07.** It is deliberately not a predecessor of 01–06 — the system gets built while the content is being written, and neither waits on the other. That parallelism is the whole reason to schedule content as its own track rather than leaving it implicit. Everything (07, 09, 11) must land before the QA track starts, because responsive, accessibility, performance and SEO passes are meaningless against placeholder content.

### 9.4 Requirement → chunk coverage

| REQ | Satisfied in | Verified in |
|---|---|---|
| REQ-001 positioning | 08 | 16 |
| REQ-002 real projects + contribution | 04 (schema), 05, 07 | 16 |
| REQ-003 ≥2 case studies | 06, 07 | 16 |
| REQ-004 distinctive UX improves discovery | 06, 09 | 13, 16 |
| REQ-005 readability preserved | 02, 06 | 13, 16 |
| REQ-006 performance | 01, 14 | 14 |
| REQ-007 keyboard + focus | 02, 03 | 13 |
| REQ-008 responsive | 03, 12 | 12 |
| REQ-009 SEO | 03, 15 | 15 |
| REQ-010 no secrets/confidential | 00, 04 (schema), 16 | 16 |
| REQ-011 no fabrication | 00, 07, 10 | 16 |
| REQ-012 resume + contact obvious | 03, 11 | 16 |

Every requirement has a build chunk and a verification chunk. None is orphaned.

### 9.5 Roadmap item coverage (P01–P25)

| PRD item | Covered by | Note |
|---|---|---|
| P01 Portfolio goals | This report §2, §10.1 | Complete — positioning options drafted, audience and success criteria confirmed |
| P02 Content inventory | §2.3, §10.2, CHUNK 00 | In progress — inventory analysed, source material outstanding |
| P03 UI/UX reference board | §9.7 below | **Complete in this report** — patterns extracted, nothing copied |
| P04 Technology decision | §3 | Complete, pending approval D1/D2 |
| P05 Information architecture | §4 | Complete, pending approval D3 |
| P06 Design system | §6, built CHUNK 02 | Direction complete |
| P07 Interaction model | §5, built CHUNK 06 | Complete, pending approval D4 |
| P08 Project scaffold | CHUNK 01 | |
| P09 Global shell | CHUNK 03 | |
| P10 Hero | CHUNK 08 | |
| P11 Selected Work | CHUNKs 05, 09 | |
| P12 Case study system | CHUNK 06 | |
| P13 Experience | CHUNKs 09, 10 | |
| P14 Skills | CHUNK 10 | |
| P15 About + workflow | CHUNK 10 | |
| P16 Contact | CHUNK 11 | |
| P17 Resume | CHUNK 11 | |
| P18 Responsive QA | CHUNK 12 | |
| P19 Accessibility QA | CHUNK 13 | |
| P20 Performance QA | CHUNK 14 | |
| P21 SEO QA | CHUNK 15 | |
| P22 Security review | §3.7, CHUNKs 01 + 16 | **Moved earlier** — clearance gates content (CHUNK 00), headers ship with the scaffold |
| P23 Production deployment | CHUNK 01 (first deploy), CHUNK 15 (domain), CHUNK 16 (launch) | **Moved earlier** — see §9.1. Custom domain configured in CHUNK 15 once D9 is settled |
| P24 Analytics/monitoring | CHUNK 16 | Analytics declined (D6). **Monitoring is not declined:** Vercel's built-in deployment and function logs, plus an uptime check on the production URL, cost nothing and require no third-party script |
| P25 Recruiter review | CHUNK 16, §10.3 | |

### 9.6 Risk coverage (R01–R06, plus six added)

| Risk | Addressed by |
|---|---|
| R01 Over-designed UI hides content | The §5.5 selection rule ("makes content easier to reach, not harder") is the direct control. Scrollytelling and in-place card expansion were rejected on exactly this ground. Verified at CHUNK 16's recruiter walkthrough |
| R02 Too much animation | Motion centralised in tokens with one global reduced-motion rule (§6.5); a hard cap of four JS islands site-wide (§7.2); no animation library in the stack |
| R03 Confidential information exposed | Three-tier disclosure model (§2.4), enforced in the content schema (§8.2) including the slug rule, gated at CHUNK 00, re-audited at CHUNK 16. **Recommend re-rating likelihood Low → Medium** — see §2.8 |
| R04 Portfolio becomes too long | Hybrid IA with summary→detail depth (§4); 68ch measure; progressive disclosure inside case studies |
| R05 Technology adds complexity | The entire §3.2 argument. Four runtime dependencies, no UI kit, no CMS, no animation library, no state management |
| R06 Content becomes outdated | `updated` is a required schema field and surfaces as "last updated" in the footer, so staleness is visible rather than silent. **Owner: Raymund. Cadence: a 30-minute content review every six months**, and after any role change — added to the workbook as a recurring item. This is the risk most likely to be quietly ignored, which is why it needs a date rather than an intention |
| R07–R12 (added in Phase 1) | Content-production stall, no confidentiality gate, dependency churn, email harvesting, absent metrics, corporate-laptop tooling block — see workbook sheet 12 |

### 9.7 Reference patterns extracted (delivers P03)

P03 asks for reference patterns documented *without copying*. From the Sheet 14 references and the wider survey, the patterns adopted — and what was deliberately left behind:

| Source of the pattern | Pattern extracted | What was not taken |
|---|---|---|
| Vercel portfolio templates / starter kit | MDX + frontmatter content model with schema validation; per-route metadata; a small, curated home page that links to depth rather than containing it | The visual identity, the component library, the blog-first structure, and the starter's unused features |
| Vercel Geist | Typography as the primary visual system; a sans + mono pair rather than a display face; restrained weight count | Any assumption that Geist itself is required — it is a recommendation on merit (§6.1), and a different well-drawn grotesque would serve |
| Magic Portfolio / modern developer portfolios | Project card → detail page as the standard depth pattern; restrained motion; responsive structure that reflows rather than shrinks | Gallery/blog scaffolding this site does not need; decorative motion; any branding |
| Premium SaaS and editorial sites | Generous vertical rhythm; capped measure; strong sectional hierarchy; an "eyebrow + heading + lede" pattern for section headers | Hero imagery, gradient treatments, testimonial bands, logo walls, stat counters — all either fabrication-shaped or on the avoid-list |
| Documentation sites | The sticky in-page navigation rail with an active marker — which is where the Delivery Thread's *mechanics* come from, even though its *content* is unique to this portfolio | Multi-level sidebar navigation, search, versioning |

The one element with no external referent is the Delivery Thread itself (§5.2). Its mechanics are borrowed and conventional on purpose; what makes it distinctive is that the stages are Raymund's actual delivery lifecycle rather than a generic table of contents.

### 9.8 Definition of done (per chunk)

A chunk is complete only when: it works; `npm run build` and `astro check` are clean; no unexpected console output; it has been checked at 375px and 1440px minimum; it is keyboard-operable with visible focus; nothing previously working has broken; the code is readable by you in six months; the relevant PRD requirement is satisfied; and the workbook's Progress Log, Decision Log and Status are updated. **Code existing is not done.** Untested is not Complete — it is Review.

---

## 10. Open decisions & content requests

### 10.1 Decisions needing your approval before CHUNK 01

| ID | Decision | Recommendation | Impact if changed later |
|---|---|---|---|
| **D1** | **Framework: Astro 7** | Approve | High — a rewrite |
| **D2** | **Styling: Tailwind CSS 4** | Approve (CSS Modules is a legitimate alternative if you dislike utilities) | Medium |
| **D3** | **IA: 6 routes, hybrid** (§4.2) | Approve | Medium — URL changes cost SEO |
| **D4** | **Signature UX: Delivery Thread + evidence cards only.** Defer filters and command palette | Approve | Low — additive later |
| **D5** | **Confidentiality tiers:** CTBC → sectoral, SBC/security → abstracted, CASECenter → sectoral | **Confirm with your employer/client obligations before CHUNK 07.** I cannot make this call for you | **Critical — irreversible once published** |
| **D6** | **Contact: links only, no form, no analytics at launch** | Approve | Low |
| **D7** | **Email address to publish** — personal, or a new dedicated forwarding address? | Dedicated address | Low |
| **D8** | **Dark mode:** tokens from CHUNK 02, ship in CHUNK 12 | Approve | High if deferred entirely |
| **D9** | **Domain:** `raymundbermudes.com` or similar vs. `*.vercel.app` | Custom domain — it is the cheapest credibility signal available | Medium — affects canonical URLs, so decide before CHUNK 15 |
| **D10** | **`MotionWrapper` replaced by CSS tokens** (§7.2) — honours Sheet 08's intent, different implementation | Approve | Low |
| **D11** | **Projects and case studies unified** into one content type, two depths (§2.6) | Approve | Medium |
| **D12** | **Deploy in CHUNK 01**, not at P23 (§9.1) | Approve | Low — improves every later chunk |
| **D13** | **Vercel plan.** Hobby is non-commercial; Sheet 00 names "Potential Clients" as a primary audience | If the site solicits client work, Pro. If it is purely job-seeking, Hobby | Low — switchable later, but worth a deliberate answer |

**Positioning line (A1) — three drafts, no invented claims. Pick one or redirect me:**

> **Option 1 (bridge-first):** "Solution Analyst and Android Developer. I turn business requirements into enterprise Android applications — and stay with them through testing, UAT, release and production support."
>
> **Option 2 (evidence-first):** "I build and maintain enterprise Android applications, and I analyse the requirements behind them. Java, Kotlin, REST integration, production troubleshooting."
>
> **Option 3 (shortest):** "Solution Analyst & Android Developer. Requirements to release, and everything after."

Every clause in all three maps to experience you listed. Nothing is embellished. Option 1 is my recommendation because it states the differentiator explicitly in the first fifteen words a recruiter reads.

### 10.2 `[CONTENT REQUIRED]` register

Nothing below can be invented. Each blocks the chunk named.

| # | Item | Blocks | Needed |
|---|---|---|---|
| 1 | `[CONTENT REQUIRED]` Case study 1 — raw notes against the Sheet 06 template | 07 | Context, problem, your role, how you investigated, what made it hard, what you changed, how it was validated, verified outcome |
| 2 | `[CONTENT REQUIRED]` Case study 2 — same | 07 | As above |
| 3 | `[VERIFY INFORMATION]` Disclosure tier per engagement (D5) | 00, 07 | Your decision, ideally checked against your contract |
| 4 | `[CONTENT REQUIRED]` Resume PDF, current | 11 | The file itself |
| 5 | `[VERIFY INFORMATION]` Employment history — employer names, exact titles, exact start/end dates | 10 | From your resume; I will not approximate dates |
| 6 | `[VERIFY INFORMATION]` Skills list — only technologies you would defend in an interview | 10 | Grouped by category |
| 7 | `[VERIFY INFORMATION]` Contact — public email, LinkedIn URL, GitHub URL | 11 | Confirm each is public and current |
| 8 | `[VERIFY INFORMATION]` Location and availability (e.g. "[city/country] · open to remote") | 08, 11 | Recruiters filter on this first |
| 9 | `[VERIFY INFORMATION]` Positioning line (A1) | 08 | Choose from 10.1 |
| 10 | `[VERIFY INFORMATION]` Headshot — yes or no | 10 | If yes, a real photo |
| 11 | `[VERIFY INFORMATION]` Domain (D9) | 15 | — |
| 12 | `[CONTENT REQUIRED]` Architecture/flow detail per case study, sanitised | 07 | Enough for me to draw an accurate SVG |
| 13 | `[VERIFY INFORMATION]` Whether any screenshots can be cleared and sanitised | 07, 16 | Default assumption: none |
| 14 | `[VERIFY INFORMATION]` Third project — does CASECenter warrant its own case study or a shorter entry? (G8) | 05, 07 | — |

### 10.3 Recruiter test — current standing

Run against the *plan*, since nothing is built. Predicted outcome if the plan is executed:

| Sheet 13 question | Answered by | Predicted |
|---|---|---|
| Who is Raymund? | Hero (CHUNK 08) | Pass — pending positioning line |
| What does he do? | Hero + Delivery Thread (08, 09) | Pass |
| What has he built? | Selected work + `/work` (05, 09) | Pass — pending content |
| What did he personally do? | `myRole` (schema-enforced, 04/05/06) | **Strong pass** — structurally enforced |
| Can he solve difficult problems? | Case studies (07) | **At risk** — depends entirely on content quality, not build quality |
| Does he understand business needs? | Delivery Thread + Requirement/Analysis sections (06, 07) | Pass — this is the site's whole thesis |
| Can I verify his skills? | Skills-with-evidence links (10) | Pass |
| Can I see experience quickly? | Timeline (10) | Pass |
| Can I contact him? | Header, footer, `/contact` (03, 11) | Pass |
| Can I get his resume? | Header button + footer + `/contact` (03, 11) | Pass — pending the file |

**The honest summary: the architecture will not be what makes or breaks this portfolio. The case studies will.** Everything in Sections 3–9 exists to get out of the way of two well-written technical stories. If CHUNK 00 goes well, this site will be genuinely strong. If CHUNK 00 is rushed, no amount of design rescues it.

---

## 11. Phase 1 status

**Deliverables produced:** repository assessment · PRD assessment with 10 gaps, 3 conflicts and 6 ambiguities · technology stack with reasoning and alternatives · information architecture with route map, navigation and four user flows · UX strategy — 11 concepts evaluated: 2 adopted as signature elements, 3 adopted in reduced form, 2 deferred, 4 rejected · design direction with computed contrast values · component architecture · content architecture with schema · 17-chunk roadmap with dependencies and requirement coverage · 9 open decisions · 14-item content register.

**Not produced, deliberately:** any code, any dependency, any scaffold, any page.

### PHASE 1 STATUS: READY FOR IMPLEMENTATION — SUBJECT TO TWO GATES

Discovery and architecture work is complete. Two gates stand between this report and CHUNK 01, and neither is something I can clear on your behalf:

1. **Approve or amend decisions D1–D9** (§10.1). D5 (confidentiality) is the one that matters most and the one I most want you to think about rather than wave through.
2. **Connect a project folder on `gds2054`, and confirm Node 22+** (§1.3).

**CHUNK 00 (content and confidentiality) can begin immediately** — it needs no repository, no tooling and no approval beyond your own. It is also the project's critical path, so starting it in parallel with the gates above is the best use of the next session.

When you are ready: *"Begin CHUNK 01"* — or *"Let's work on CHUNK 00"* if you would rather start where the real risk is.

---

## 12. Sources

Version numbers and framework facts in §3 were checked against current sources on the report date rather than recalled. Everything else in this report is analysis, and where it is my judgement rather than a sourced claim, it says so.

**Framework and tooling versions (checked 22 Sept 2026):**

- [Astro releases — GitHub](https://github.com/withastro/astro/releases) — current line at the time of writing is `astro@7.3.1` (3 Sept 2026)
- [Astro 6.0 release notes](https://astro.build/blog/astro-6/) — Node 22 floor, built-in Fonts API, built-in CSP support, stabilised content layer. `[VERIFY INFORMATION]` Astro 7's own Node floor at install
- [Next.js — endoflife.date](https://endoflife.date/nextjs) — Next.js 16 is the current release line and is where the "LTS" label used in §3.3 comes from; 15 leaves active security support in October 2026
- [Tailwind CSS — endoflife.date](https://endoflife.date/tailwind-css) — current stable `4.3.3` (July 2026); 3.4 supported to Feb 2027

**Pattern and practice references:**

- [Next.js vs Astro comparison — Vercel](https://vercel.com/i/astro-vs-next-js) — rendering models, client JS shipped, and the case for each. Notably, Vercel's own guidance puts portfolios in the Astro column
- [Command palette pattern — UX Patterns for Developers](https://uxpatterns.dev/patterns/advanced/command-palette) — accessibility requirements, and the explicit "when not to use" that §5.4 relies on
- [Keyboard navigation guide — Level Access](https://www.levelaccess.com/blog/keyboard-navigation-complete-web-accessibility-guide/) — keyboard and focus requirements behind §3.6
- [A portfolio project that survives a 2026 recruiter screen — Pickuma](https://pickuma.com/for-dev/portfolio-project-that-survives-2026-recruiter-screen/) — the screening-behaviour account cited in §3.2: live URL checked first, review measured in seconds not minutes, depth and edge-case handling read as maturity, stack matters mainly when it matches the target role. Treat it as one informed practitioner account, not as a study
- [Progressive disclosure — Interaction Design Foundation](https://ixdf.org/literature/topics/progressive-disclosure) — the principle behind §5.3
- PRD Sheet 14's own references (Vercel templates, Portfolio Starter Kit, Magic Portfolio, Geist) — patterns extracted in §9.7, nothing copied

**Contrast values in §6.2** were computed from the WCAG 2.x relative-luminance formula against the exact hex values listed, not estimated. All eight text pairs clear 7:1 against both `--bg` and `--surface`; the two values that only reached ~6.8–7.0 in a first draft were darkened until they cleared it.
