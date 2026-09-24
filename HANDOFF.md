# HANDOFF.md — Raymund Bermudes Portfolio

Living session-state file. **Read this immediately after `CLAUDE.md`, at the start of every session.**
Its job is to answer, in under a minute: what is true right now, what is blocked, what is next.

**Update rule:** whoever ends a session updates this file. A chunk's status changes here *and* in the
PRD workbook, or it did not change. Do not let this file drift — a stale handoff is worse than none.

- **Last updated:** 2026-09-23
- **Updated by:** Claude Code (session 3 — alignment review, tracker reconciliation, CHUNK 00 draft)
- **Phase:** Per the tracker (source of truth): **CHUNKS 01–06 Complete** · **07
  blocked on content** · **CHUNK 00 In Progress**, and the
  critical path.
- **Build state:** 6 routes building. `astro check` 0/0/0, build clean.
  Output is **zero JavaScript, 102.3 KB** total including both fonts.
- **Live:** https://raymundbermudes.vercel.app — deployed, security headers verified.
- **Repo:** `rrcreations69/ClaudePortfolio` (private), branch `main`.

---

## 1. Blockers — all clear

| # | Blocker | Status | Owner | Detail |
|---|---|---|---|---|
| ~~B1~~ | ~~Node.js >=22 + npm not installed~~ | **CLOSED 2026-09-22** | — | Node **v24.19.0** + npm **11.17.0** at `C:\Program Files\nodejs`, on the machine PATH. `npm ping` → `PONG`. |
| ~~B2~~ | ~~Git repository rooted at `C:\Users\RaymundBermudes`~~ | **CLOSED 2026-09-22** | — | Stray home-level `.git` no longer exists. Repo re-rooted to the project folder. See §4. |
| ~~B5~~ | ~~Project lives inside OneDrive~~ | **DECIDED 2026-09-22** | — | Staying at `Documents\Rr`. Relocation declined. Mitigations in §5.1 apply at CHUNK 01. |
| ~~B6~~ | ~~git commit identity not set~~ | **CLOSED 2026-09-22** | — | Repo-local `user.email` set to the GitHub noreply address. Global config untouched. See §5.2. |
| ~~B3~~ | ~~Decisions D1–D4 unconfirmed~~ | **CLOSED 2026-09-22** | — | D1–D14 all settled. See §3. |
| ~~B4~~ | ~~D5 — confidentiality tiers unconfirmed~~ | **CLOSED 2026-09-22** | — | Confirmed by Raymund as proposed. See §3 and §3.1. |

**No blockers remain. The site is deployed and live at https://raymundbermudes.vercel.app.**

Outstanding inputs are things Raymund supplies when the relevant chunk arrives: the dedicated email
address (CHUNK 11) and the CHUNK 00 content register (§7). Neither blocks anything today.

**Note on pushing:** this session's auto-approval blocks `git push` and `git remote add` as outbound
publication. Claude can commit, but **Raymund runs the pushes**, or adds a Bash permission rule.

---

## 2. Environment gate — result: **PASS (re-run 2026-09-22)**

Run on `gds2054` (Windows 11 Pro 26200). First run failed on Node; Node was installed and the gate
re-run clean.

| Check | Required | Found | Verdict |
|---|---|---|---|
| `node -v` | >= 22 | **v24.19.0** | PASS |
| `npm -v` | present | **11.17.0** | PASS |
| `git --version` | present | `2.35.1.windows.2` | PASS |
| npm registry reachable | yes | `npm ping` → `PONG` (1623ms) | PASS |

`npm ping` is the meaningful check — it exercises the actual npm client, its TLS stack and its
registry config, not merely HTTPS reachability.

**Corporate-restriction check — clear.** This was the live risk named in `PHASE-1-DISCOVERY.md` §1.3
and it did not materialise:

- No WinHTTP proxy, no user proxy, no PAC/`AutoConfigURL`, no `HTTP_PROXY`/`HTTPS_PROXY` env vars.
- TLS to the registry is **not** intercepted — cert issuer is `Google Trust Services, CN=WE1`, the
  genuine chain, not a corporate MITM root. npm's strict TLS does not need weakening.

**Nothing about this machine blocks npm.** Node 24 LTS clears the >=22 floor.

**Astro version — VERIFIED 2026-09-22, no longer an assumption.** Checked against the registry, not
recalled: `astro@latest` is **7.3.3** (so the discovery report's "Astro 7" was correct), and its
declared `engines.node` is **`>=22.12.0`** — a tighter floor than the ">=22" the report assumed.
Installed Node v24.19.0 clears it. Tailwind CSS 4 resolves to **4.3.3** for CHUNK 02.

---

## 3. Decision register — D1–D13 (`PHASE-1-DISCOVERY.md` §10.1)

**All thirteen settled with Raymund on 2026-09-22.** Eleven approved as recommended; **D9 and D13
were amended.** These are now project facts — do not re-open one without a written reason here.

| ID | Decision | Outcome | Settled |
|---|---|---|---|
| D1 | Framework | **Astro.** Version and its Node floor to be verified at install time, not assumed | 2026-09-22 |
| D2 | Styling | **Tailwind CSS 4**, tokens as real CSS custom properties in `src/styles/tokens.css` | 2026-09-22 |
| D3 | Information architecture | **6-route hybrid** per §4.2. Nav: Work · About · Contact + Resume button | 2026-09-22 |
| D4 | Signature UX | **Delivery Thread + evidence cards only.** `ProjectFilters` and command palette deferred | 2026-09-22 |
| D5 | Confidentiality tiers | **CTBC → `sectoral` · SBC → `abstracted` · CASECenter → `sectoral`.** See §3.1 | 2026-09-22 |
| D6 | Contact | **Links only.** No form, no form backend, no analytics at launch. Zero third-party origins | 2026-09-22 |
| D7 | Published email | **A new dedicated address.** Does not exist yet — Raymund to create before CHUNK 11 | 2026-09-22 |
| D8 | Dark mode | **Both token sets in CHUNK 02; `ThemeToggle` ships in CHUNK 12** | 2026-09-22 |
| D9 | Domain | **AMENDED — `*.vercel.app` permanently.** No custom domain. See §3.2 | 2026-09-22 |
| D10 | Motion | **CSS motion tokens + one global `prefers-reduced-motion` rule.** No `MotionWrapper` component | 2026-09-22 |
| D11 | Content model | **One collection, two depths.** A project *is* its case study; the card is its summary | 2026-09-22 |
| D12 | Deployment timing | **Deploy from CHUNK 01**, with security headers, not at P23 | 2026-09-22 |
| D13 | Vercel plan | **AMENDED — Hobby.** Site is job-seeking, not client-soliciting. See §3.3 | 2026-09-22 |
| **D14** | **GitHub repository visibility** | **PRIVATE.** New decision, not in §10.1 — raised when the first commit was prepared. See §3.4 | 2026-09-22 |
| **D15** | **Positioning** | **"Solutions Analyst & Enterprise Systems Developer"** — matches the CV. Was "Solution Analyst & Android Developer". See §3.6 | 2026-09-23 |
| **D16** | **Experience guardrail** | **Widened to match the CV.** `CLAUDE.md`'s attributable-experience list now reflects what Raymund already claims publicly. See §3.7 | 2026-09-23 |

### 3.1 D5 — confidentiality, as confirmed

Raymund confirmed the proposed tiers on **2026-09-22**. This date and reviewer populate the schema's
`confidentialityReview` record; `tierConfirmed` must match `disclosure` or the build fails.

| Engagement | Tier | Publishes |
|---|---|---|
| CTBC | `sectoral` | Sector, scale, geography. **Never the name "CTBC"** — not in body copy, slugs, file names, image metadata, page titles, commit messages or preview URLs |
| SBC / security remediation | `abstracted` | Class of problem only. No client, no sector, sanitised architecture |
| CASECenter / workflow | `sectoral` | Sector, scale, geography. No client name |

**Correction 2026-09-22 — the register mis-modelled this.** Raymund clarified during CHUNK 00:

> CTBC and CASECenter are two engagements. CTBC is our client and CASECenter is proprietary tool
> that we use to create systems for SBC, CTBC and many more

**CTBC and SBC are clients. CASECenter is a build tool spanning many clients — not a client, and not
client-specific.** The register's "CASECenter work" row names a tool rather than an engagement and
should be reframed around whichever client engagement it meant.

**Consequence for disclosure:** because the tool serves many clients, naming it does **not** identify
any one of them — "CASECenter ⇒ CTBC" does not follow. The client-identification concern is
withdrawn.

**The open question is now about the employer, not the client:** is CASECenter publicly marketed or
an internal tool? Naming an unpublicised internal build tool discloses employer tooling, which is a
separate matter from D5's client tiers. **Unresolved — ask Raymund. Do not research the employer to
settle it.**

### 3.2 D9 — consequences of staying on `*.vercel.app`

Recommendation was a custom domain; Raymund chose the Vercel subdomain. Settled. Knock-ons:

- **The Vercel project name becomes the public hostname, so it is subject to D5.** Resolved: the
  project is named **`raymundbermudes`**, giving **https://raymundbermudes.vercel.app**. Raymund's
  own name, no client name — compliant. Note the GitHub repo is separately named `ClaudePortfolio`;
  that name is private and never reaches the public URL.
- Canonical URLs, OG tags and the sitemap all target that host. `site` is set in `astro.config.mjs`.
- CHUNK 15 loses its DNS and domain-verification work. No registration cost, no renewal.

### 3.3 D13 — consequence of the Hobby plan

Hobby's terms are non-commercial. Choosing it means **the site must not solicit client work**: no
"hire me", no rates, no freelance or contract call-to-action. Sheet 00 names "Potential Clients" as a
primary audience — that framing is now out of scope for the copy. Constrains CHUNK 00, 08 and 11.
If the positioning ever changes, the plan must change with it.

### 3.4 D14 — the GitHub repository is PRIVATE

Raised 2026-09-22 while preparing the first commit; not anticipated in §10.1.

**The problem.** All four planning documents name the client engagements directly — verified by
scan, not assumption:

| File | CTBC | CASECenter | SBC |
|---|---|---|---|
| `CLAUDE.md` | 1 | 2 | 1 |
| `HANDOFF.md` | 3 | 6 | 2 |
| `PHASE-1-DISCOVERY.md` | 4 | 5 | 4 |
| PRD workbook | 4 | 4 | 4 |

`PHASE-1-DISCOVERY.md` also states plainly that the SBC engagement involved security remediation —
the exact association D5 puts at `abstracted` tier. In a public repository this would publish what
D5 forbids, and **git history is permanent**: deleting the files later does not remove them from
history, from existing clones, or from GitHub's cached views.

**Decision: the repository is private.** Vercel deploys from a private repo on the Hobby plan with
no change to the site, so this costs nothing except recruiters being unable to browse the source.

**Consequences to honour:**

- **Never make this repository public** without first rewriting history to remove the planning
  documents. Treat "make it public" as a request that re-opens D5, not a settings change.
- The site's *published output* is public regardless — D5 governs it exactly as before. Repository
  privacy is not a licence to relax slugs, page titles, file names or OG metadata.
- **Vercel preview deployments are PUBLIC — verified 2026-09-22, not assumed.** Both alternate
  deployment URLs (`raymundbermudes-git-main-rr-4c7a.vercel.app` and the per-deployment
  `raymundbermudes-2t7nbid3v-rr-4c7a.vercel.app`) returned **HTTP 200 to an unauthenticated
  request**. An unlisted URL is not a private one.

  **Why this matters at CHUNK 07, not now.** Today every deployment serves a placeholder, so there
  is nothing to leak. Once case-study drafts exist, pushing one to any branch publishes it at a
  public URL *before* it has been cleared under D5 — which is exactly the irreversible failure D5
  and D14 exist to prevent.

  **The mitigation that works on any plan: make confidentiality clearance a pre-commit gate, not a
  pre-merge one.** Content is sanitised to its tier *before* it is committed. Never rely on "it is
  only on a branch" as a confidentiality control — it is not one.

  Optionally also check *Vercel → Settings → Deployment Protection* for what the Hobby plan offers.
  Treat any protection found there as defence in depth, not as a substitute for the pre-commit gate.

### 3.6 D15 — positioning now matches the CV

Raymund supplied his CV on 2026-09-23. It says **"Solutions Analyst & Enterprise Systems
Developer"**; the project had been built around "Solution Analyst & Android Developer". **A
portfolio must not contradict the CV attached to it** — that is the first inconsistency a recruiter
can check, and the cheapest way to lose their trust.

The CV also showed the framing was off on the facts: **Android was the previous role.**

| Role | Dates |
|---|---|
| Solutions Analyst, GDS Link Asia | Jan 2024 – present |
| Junior Android Developer, GDS Link Asia | Jul 2022 – Dec 2023 |

Android is still genuine, current work — he remains the sole maintainer of a production mobile
application — but it is one strand, not the headline.

**Consequence: the three positioning-line drafts in `PHASE-1-DISCOVERY.md` §10.1 are now stale.**
All three lead with Android. CG-09 needs fresh drafts against the new positioning before CHUNK 08.

### 3.7 D16 — the experience guardrail now matches the CV

`CLAUDE.md`'s list of attributable experience was written before the CV existed and omitted things
Raymund has claimed publicly for years: C#, JavaScript, PHP, Oracle PL/SQL, Agile/Scrum,
client-facing demos and training, production deployments, incident escalation, mentoring.

The list was not wrong, merely incomplete — and an incomplete guardrail blocks accurate history,
which is the opposite of what it is for. It has been rewritten from the CV, grouped by category.

**What did NOT change:** the rule itself. Anything absent from the list is still unattributable
without asking. **n8n, Claude Code and Codex remain excluded** — Raymund described them as things he
is learning, not things he has delivered with, and they must not appear in Skills or be implied
anywhere.

**Also now public, per his own CV:** his employer (GDS Link Asia), the tool (CASECenter) and the
sector (fintech / credit decisioning). **Individual clients remain restricted.** D5 is untouched.

### 3.5 Still open — not part of D1–D13

- **Positioning line (A1).** Three drafts in `PHASE-1-DISCOVERY.md` §10.1; Option 1 recommended.
  Blocks CHUNK 08.
- **The Delivery Thread's 8th stage.** `CLAUDE.md` carries a standing `[VERIFY INFORMATION]`:
  *"Design"* is not in Raymund's stated experience. Confirm he owns design work, or the spine drops
  to seven stages. Blocks CHUNK 06.

---

## 4. B2 — the git repository, resolved

**History.** `PHASE-1-DISCOVERY.md` §1.2 flagged a `.git` directory at the top of the Windows user
profile, meaning the portfolio sat inside a repo spanning the whole home folder. Confirmed at the
start of 2026-09-22: `git rev-parse --show-toplevel` returned `C:/Users/RaymundBermudes`, with zero
commits, zero tracked files and no `.gitignore` — so no exposure had occurred, but a single
`git add -A` from the wrong directory would have staged `.m2`, `.claude.json`, `.gradle` and
`AppData` in one keystroke.

**Resolved 2026-09-22.** The stray home-level `.git` no longer exists — verified three ways: a
direct `Test-Path` including hidden/system attributes, a full ancestor-chain scan from the project
folder upward, and `git rev-parse` itself reporting no repository. **Claude did not delete it;** it
was already gone when re-checked. Raymund most likely removed it between sessions.

**Current state — correct.**

```
git rev-parse --show-toplevel
→ C:/Users/RaymundBermudes/OneDrive - GDS Link, LLC/Documents/Rr
```

- `git init -b main` run inside the project folder. Default branch is `main`.
- `.gitignore` written **before** any commit, with `.env*`, `*.pem`, `*.key`, keystores,
  `node_modules/`, `dist/`, `.astro/` and `.vercel/` covered — satisfying `CLAUDE.md` §Security's
  "`.env*` git-ignored from the first commit".
- `git status` shows exactly 5 files, all inside the project. Nothing from the user profile is visible.

**No commit has been made yet.** The first commit is still pending — see B6 below before making it.

---

## 5. Open questions before the first commit and CHUNK 01

### 5.1 B5 — the project lives inside OneDrive

Full path: `C:\Users\RaymundBermudes\OneDrive - GDS Link, LLC\Documents\Rr`. That is a **syncing
OneDrive folder, on a corporate tenant.** Once CHUNK 01 runs `npm install`, `node_modules/` appears
with tens of thousands of small files. Consequences:

- OneDrive tries to sync every one of them. Sync thrash, high CPU, and a slow or stalled client.
- OneDrive can hold file locks mid-install, producing `EPERM`/`EBUSY` failures that look like npm
  bugs but are not.
- Astro's dev-server file watching competes with the sync client; hot reload becomes unreliable.
- Files On-Demand can leave `node_modules` entries as cloud placeholders, which breaks builds.

`.gitignore` does not help — it governs git, not OneDrive.

`.gitignore` does not help — it governs git, not OneDrive.

**DECIDED 2026-09-22 — the project stays at `Documents\Rr`.** Relocation was offered and declined.
Claude proposed moving it out and misread the first answer as agreement; Raymund confirmed it stays.
Do not re-open this or propose moving it again.

**Mitigation to apply at CHUNK 01, once `node_modules` exists:**

- Add `node_modules` to OneDrive's sync exclusions: *OneDrive Settings → Sync and back up →
  Advanced → Exclude folders*. This is a manual UI step Raymund must perform; it cannot be set from
  the command line.
- Ensure the project folder is set to **Always keep on this device**, so Files On-Demand never leaves
  build inputs as cloud placeholders.
- If `npm install` fails with `EPERM` or `EBUSY`, **suspect OneDrive first, not npm.** Pause syncing,
  re-run the install, resume. Do not start debugging npm itself until sync has been ruled out.

### 5.2 B6 — git identity is a work email address

Global git config is:

```
user.name  = Raymund Bermudes
user.email = raymund.bermudes@gdslinkasia.com
```

Every commit carries the author email, and **commit metadata is permanent and public** once pushed
to a public GitHub repo. A personal, job-seeking portfolio whose entire history is authored by a
current employer's address is an odd signal, and it is effectively unfixable after the fact without
rewriting history.

**RESOLVED 2026-09-22.** Repo-local identity set to GitHub's noreply address — no real address is
published, and GitHub still attributes commits to Raymund's account.

```
user.name  = Raymund Bermudes                                      (inherited from global)
user.email = 28356582+rrcreations69@users.noreply.github.com       (repository-local)
```

Global config remains `raymund.bermudes@gdslinkasia.com`, so **work repositories are unaffected.**

**Still worth doing:** tick **"Block command line pushes that expose my email"** at
*GitHub → Settings → Emails*. It turns this from a local convention into an enforced guarantee, and
protects against a future clone that lacks the repo-local override.

#### Two GitHub accounts exist on this machine — know which one you are using

| Account | Role |
|---|---|
| **`rrcreations69`** | **Personal. Owns this portfolio** — the repo, the pushes and the commits. |
| `rrbermudesgdslink` | Work account. **Not to be used for this project.** |

**Confirmed 2026-09-22:** the portfolio belongs to `rrcreations69`.

**The trap.** Windows Credential Manager held a stored credential for **`rrbermudesgdslink`** under
`git:https://github.com` while the repo and the commit identity both pointed at `rrcreations69`.
Git would have authenticated as the work account against the personal account's repo and failed with
a permission error that looks like a broken auth setup rather than a wrong-account problem.

**If a push fails with a permission error, check the account before anything else:**

```powershell
cmdkey /list | Select-String github        # which account is stored?
cmdkey /delete:LegacyGeneric:target=git:https://github.com   # clear it
```

Then sign in again as `rrcreations69`. **Sign out of GitHub in the browser first**, or use a private
window — an active browser session for the work account will silently re-authenticate as that
account and the problem recurs.

**History is clean.** All commits to date are authored by
`28356582+rrcreations69@users.noreply.github.com`; no `gdslink` address appears anywhere in the
history, as author or committer. Verified, not assumed. No rewrite is needed.

### 5.3 The `docs/` path discrepancy

`CLAUDE.md` refers to `docs/PRD-Progress-Tracker.xlsx` and `docs/PHASE-1-DISCOVERY.md`.
Neither path exists. The actual files sit at the repository root:

| `CLAUDE.md` says | Actually |
|---|---|
| `docs/PHASE-1-DISCOVERY.md` | `PHASE-1-DISCOVERY.md` |
| `docs/PRD-Progress-Tracker.xlsx` | `Raymund_Portfolio_PRD_Progress_Tracker.xlsx` |

There is no `docs/` directory. **Decide once:** either create `docs/` and move both files (matching
what `CLAUDE.md` already claims), or correct the paths in `CLAUDE.md`. Settle it before CHUNK 01 so
the convention is fixed before any code or script references it. Not yet actioned.

---

### 5.4 CHUNK 01 — what is done, what is not

**Done and verified 2026-09-22:**

| Item | Detail |
|---|---|
| Astro | **7.3.3** — the current stable major, checked against the registry. `latest` dist-tag, not assumed |
| Node floor | Astro requires `>=22.12.0`; installed Node is **v24.19.0**. Recorded in `engines` |
| TypeScript | `astro/tsconfigs/strict`, plus `@astrojs/check` so `astro check` actually runs |
| Output | `output: 'static'`. **No adapter** — there is no server surface and Vercel detects Astro's static build |
| Security headers | `vercel.json`: CSP, HSTS (2yr, preload), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, COOP, CORP, `X-DNS-Prefetch-Control`, plus immutable caching for `/_astro/*` |
| Telemetry | Astro's anonymous build telemetry **disabled**, consistent with the zero third-party posture |
| Scripts | `dev`, `build`, `check`, `verify` (= check + build), `preview` |
| Verification | `astro check`: 0 errors, 0 warnings, 0 hints. `astro build`: clean. **Zero JS files in `dist/`.** 2,387 bytes total. Dev server runs; page renders at 375px and 1440px with no console errors |

**Deliberately NOT done in CHUNK 01** — these belong to later chunks and adding them here would
breach chunk discipline:

- **Tailwind CSS 4** and the design tokens → CHUNK 02.
- **MDX and content collections** → CHUNK 04.
- The real home page → CHUNK 08–09. `src/pages/index.astro` is a placeholder carrying `noindex`.

### Deployment — LIVE

| | |
|---|---|
| **Production URL** | **https://raymundbermudes.vercel.app** |
| Vercel project | `raymundbermudes` (team `rr-4c7a`) — no client name, satisfies D9/D5 |
| Plan | **Hobby** — satisfies D13 |
| GitHub repo | `rrcreations69/ClaudePortfolio` — **private**, satisfies D14 |
| Deployed by | `rrcreations69` — the correct account |
| First production deploy | commit `eb17185`, build time 12s |

**Security headers verified against the live deployment on 2026-09-22 — all nine present and
correct:** `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `Cross-Origin-Opener-Policy`,
`Cross-Origin-Resource-Policy`, `X-DNS-Prefetch-Control`. This was checked against a real HTTP
response, not against `vercel.json` — the dev server does not serve these headers, so localhost
proves nothing.

**One header we did not set: `Access-Control-Allow-Origin: *`.** Vercel adds it. On a public static
site with no credentials, no cookies and no API it grants nothing that a plain server-side fetch of
the public HTML does not already allow, so it is **not** a vulnerability here. Flagged for CHUNK 16
review rather than changed, and it must be re-examined if the site ever gains an endpoint.

**Remaining for CHUNK 01 to reach `Complete`:**

1. Push the `site` config commit and confirm the redeploy succeeds.

### Two CSP notes for CHUNK 16

- `style-src` currently allows `'unsafe-inline'`, because `build.inlineStylesheets: 'auto'` inlines
  small CSS for LCP. Setting it to `'never'` would permit a strict `style-src 'self'` at the cost of
  a render-blocking request. Deliberate trade-off, revisit at CHUNK 16.
- `script-src 'self'` is currently honest — the build ships **zero** JavaScript. It must be
  re-checked when the first island lands in CHUNK 03.

---

## 6. Chunk board

CHUNK 00 blocks **only** CHUNK 07. Build 01–06 in parallel with the writing.
07, 09 and 11 must all land before the QA track (12–16) starts.

| # | Chunk | Status | Blocked by |
|---|---|---|---|
| 00 | Content & confidentiality clearance (no code) | **In Progress** | Waiting on Raymund’s CTBC recollections |
| 01 | Project foundation + deploy + security headers | **Complete** | — |
| 02 | Design system | **Complete** | — |
| 03 | Global shell | **COMPLETE** | — |
| 04 | Content layer | **COMPLETE** | — |
| 05 | Work index + ProjectCard | **COMPLETE** | — |
| 06 | Case study system + Delivery Thread | **Complete** | — |
| 07 | Real case study content | Not Started | **00** |
| 08 | Home — hero | Not Started | 03, positioning line |
| 09 | Home — thread, selected work, experience teaser | Not Started | 05, 06 |
| 10 | About — story, timeline, skills | Not Started | 03, employment/skills content |
| 11 | Contact + resume | Not Started | 03, resume PDF, D6, D7 |
| 12 | Responsive + dark mode | **COMPLETE** | — |
| 13 | Accessibility | Not Started | 12 |
| 14 | Performance | Not Started | 12 |
| 15 | SEO + custom domain | Not Started | D9 |
| 16 | Security, confidentiality & recruiter review | Not Started | all |

Status values: `Not Started` · `In Progress` · `Blocked` · `Review` · `Complete`.
**Code existing is not done. Untested is `Review`, not `Complete`.**

---

## 7. Content register — what cannot be invented

Full detail in `PHASE-1-DISCOVERY.md` §10.2 (14 items). What is still missing:

- Case study 1 and 2 raw notes → blocks 07 *(critical path)*
- ~~Disclosure tier per engagement (D5)~~ → **RESOLVED 2026-09-22**, see §3.1
- Current resume PDF → blocks 11
- Employment history: employers, exact titles, exact dates → blocks 10
- Skills list, only what would be defended in an interview → blocks 10
- **The new dedicated email address (D7) — to be created** → blocks 11
- Public LinkedIn URL, GitHub URL — confirm each is public and current → blocks 11
- Location and availability → blocks 08, 11
- Positioning line (A1) → blocks 08
- Headshot: yes or no → blocks 10
- ~~Domain (D9)~~ → **RESOLVED 2026-09-22** — `*.vercel.app`, see §3.2
- Sanitised architecture/flow detail per case study → blocks 07
- Whether any screenshots can be cleared *(default assumption: none)* → blocks 07, 16
- Whether CASECenter warrants its own case study → blocks 05, 07
- Whether the string "CASECenter" may be published at all (§3.1) → blocks 07

Anything absent is written `[CONTENT REQUIRED]` or `[VERIFY INFORMATION]` and the work stops there.
Nothing is guessed, approximated or inferred.

---

## 8. Next actions

**Raymund**
1. Create an empty **private** GitHub repo (D14) — needed by D12, deploy-from-CHUNK-01.
2. Add `node_modules` to OneDrive's sync exclusions once CHUNK 01 creates it (§5.1).
4. Create the dedicated email address (D7) — needed by CHUNK 11, not before.
5. **CHUNK 00 is the critical path and needs none of the above.** D5 is settled, so case-study
   writing can begin at any time.

**Claude Code (next session)**
1. Re-verify `node -v` before scaffolding — do not trust this file's recorded value alone.
2. Verify the current stable Astro major and its actual Node floor — do not assume "7" or "22".
3. Propose the Vercel project name for confirmation (§3.2) before creating the deployment.
4. Confirm the GitHub repo is **private** before adding it as a remote (D14).
5. Check Vercel preview-deployment protection (§3.4).
6. Then CHUNK 01.

**Done 2026-09-22**
- Node v24.19.0 + npm 11.17.0 verified working; `npm ping` → `PONG`. B1 closed.
- `git init -b main` inside the project folder; `.gitignore` written before any commit. B2 closed.
- No commit made yet — deliberately held pending B6.

- PRD workbook updated: `11 Decision Log` H2:H14 statuses, with D5/D9/D13 outcomes and reasoning;
  `18 Disclosure Policy` owner-confirmation column; `10 Progress Log` row 5 (Build phase → `Blocked`,
  with both blockers recorded). Backup of the pre-edit workbook is in the session scratchpad.

**Deferred housekeeping (not yet done)**
- Resolve the `docs/` path discrepancy in §5.

---

## 9. Session log

| Date | Session | What happened |
|---|---|---|
| 2026-09-23 | 3 | **CHUNK 02 (design system) and CHUNK 03 (global shell) complete.** Tokens as real custom properties consumed by Tailwind via `@theme`; Geist self-hosted through Astro's Fonts API; `BaseLayout`, `SiteHeader`, `SiteFooter`, a `Link` component that enforces `rel="noopener noreferrer"`, typed site config, and placeholder pages so the shell is navigable end to end. **Deviation: no `MobileNav` island** — three nav items and one action have nothing to collapse, so the nav wraps instead; island budget drops 4 → 3. **Defect found and fixed in verification:** nav touch targets were 44px tall but 37px wide, failing the ≥44×44 rule. Hit the predicted OneDrive `EBUSY` lock on a build; a retry succeeded. 6 routes, zero JavaScript, 102.3 KB. |
| 2026-09-22 | 2 | **Cleared both blockers.** Node v24.19.0 + npm 11.17.0 confirmed working (`npm ping` → `PONG`); the earlier "not installed" result was correct at the time, and Node was installed since. Stray home-level `.git` confirmed already gone (not deleted by Claude). Ran `git init -b main` in the project folder and wrote `.gitignore` before any commit — `git status` now shows 5 files, none from the user profile. Raised two new items: **B5** (project sits in a syncing OneDrive folder) and **B6** (git identity is a work email, permanent in public commit history). B5 decided — **project stays at `Documents\Rr`**, relocation declined, mitigations recorded. B6 resolved — repo-local identity set to the GitHub noreply address. Scanned the planning docs before committing and found CTBC/SBC/CASECenter throughout, including the SBC security association that D5 puts at `abstracted` tier — raised it, and **D14** was decided: **the GitHub repo is private**. First commit made (`ad51196`), authored by the noreply address. No scaffolding, no dependency installed, no remote added. |
| 2026-09-22 | 1 | Read `CLAUDE.md` + `PHASE-1-DISCOVERY.md`. Ran environment gate: **FAIL** — Node/npm absent; git, registry reachability and corporate-restriction checks all pass. Confirmed B2 (home-directory git repo, 0 commits, no exposure yet). Flagged the `docs/` path discrepancy. Created this file. **Settled all of D1–D13** — 11 as recommended, D9 and D13 amended; B3 and B4 closed. Mirrored all outcomes into the PRD workbook (sheets 11, 18, 10). No code written, no dependency installed, no git operation run. |
