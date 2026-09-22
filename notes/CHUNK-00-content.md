# CHUNK 00 — Content & confidentiality clearance

> ⚠️ **RAW NOTES. NOT PUBLISHABLE. NOT BUILT.**
>
> This directory sits outside `src/`, so Astro never reads it and nothing here can reach the site by
> accident. It may contain **unsanitised client names and detail** — that is its purpose. It is safe
> only because the repository is private (**D14**).
>
> **Nothing moves from this file into `src/content/work/` without being rewritten to its disclosure
> tier first.** Clearance is a **pre-commit** gate, not a pre-merge one: Vercel preview URLs are
> public (verified), so "it is only on a branch" protects nothing.

- **Started:** 2026-09-22
- **Blocks:** CHUNK 07 (case study content) — the project's critical path
- **Method:** Raymund talks, Claude structures. **Claude writes nothing Raymund has not said.**
  Anything missing stays `[CONTENT REQUIRED]` until he supplies it.

---

## Disclosure tiers — settled (D5, confirmed 2026-09-22)

| Engagement | Tier | What may be published |
|---|---|---|
| CTBC | `sectoral` | Sector, scale, geography. **Never the name.** |
| SBC / security remediation | `abstracted` | Class of problem only. No client, no sector, sanitised architecture. |
| CASECenter / workflow | `sectoral` | Sector, scale, geography. No client name. |

**Open:** may the literal string "CASECenter" be published at all? Unresolved — see §4.

---

## The template (PRD Sheet 06) — ten sections per case study

| # | Section | What it must answer | Guidance from the PRD |
|---|---|---|---|
| 1 | Title | — | Name the problem or solution, not just the application |
| 2 | Context | What system or project was involved? | Keep client-sensitive details anonymised |
| 3 | Problem | What was wrong or needed? | Concrete symptoms or business need |
| 4 | My Role | What did I personally own? | **Separate personal contribution from team effort** |
| 5 | Investigation | How did I reason through it? | Logs, reproduction, dependency checks, requirements |
| 6 | Technical Challenge | What made it difficult? | Constraints, legacy code, compatibility, security |
| 7 | Solution | What did I change? | Architecture and implementation at useful depth |
| 8 | Validation | How was it tested? | Unit, manual, UAT, release validation |
| 9 | Result | What changed? | **Real measurable evidence if available; otherwise a verified outcome. Never an invented number.** |
| 10 | Lessons | What did this demonstrate? | Professional and evidence-based |

Section 4 is the one recruiters actually need — the schema enforces it with `.min(1)`, so an empty
`myRole` fails the build. Section 9 is the one most likely to tempt invention; if there is no
verified number, it says what changed without one.

---

## 1. Case study 1 — the offline-capable appraisal mobile app

**Engagement:** the appraisal system for the client previously logged as CTBC.
**Disclosure tier:** `sectoral` — sector, scale and geography only, never the client name.

### 🔴 The CTBC / SBC / CASECenter relationship — corrected by Raymund 2026-09-22

Claude initially read the first answer as "CTBC and CASECenter are one engagement". **That was
wrong.** Raymund corrected it:

> CTBC and CASECenter are two engagements. CTBC is our client and CASECenter is proprietary tool
> that we use to create systems for SBC, CTBC and many more

**The actual structure:**

| Thing | What it is |
|---|---|
| **CTBC** | A **client**. |
| **SBC** | A **client**. |
| **CASECenter** | A **proprietary tool** Raymund's employer uses to build systems for many clients, CTBC and SBC among them. **Not a client. Not client-specific.** |

So the CTBC appraisal system is *a system built for the client CTBC, using CASECenter*. The tool
spans engagements; the clients are separate.

**This matters for disclosure, and it cuts the opposite way from Claude's first read.**

Because CASECenter serves **many** clients, naming the tool does **not** narrow anything down to one
client — the inference "CASECenter ⇒ CTBC" does not hold when the tool has many customers. Claude's
earlier recommendation not to name it was based on a false premise and is **withdrawn**.

**The remaining question is different, and is about the employer rather than the client:** is
CASECenter publicly marketed, or an internal tool? Naming an internal, unpublicised build tool
discloses the employer's tooling, which is a separate confidentiality question from D5's client
tiers. **Unresolved — ask Raymund. Do not assume, and do not research the employer to find out.**

**CG-14 remains genuinely open.** CTBC and SBC are separate engagements and could each carry a case
study. "CASECenter work" as listed in the original register is a category error — it names a tool,
not an engagement — and that row should be reframed around whichever *client* engagement it meant.

### Captured so far — Raymund's words, unedited

- **CASECenter Appraisal system (website)** — an appraisal system used by the client.
- Built using a **proprietary tool called CASECenter**.
- It **has a mobile version**.
- The mobile version has **offline functionality**, so the appraiser can still use it without
  internet — *"sometimes they go to isolated area without any internet."*
- **Mobile app built with Android Studio — Kotlin, MySQL, CASECenter API.**

### Template progress

| # | Section | Notes |
|---|---|---|
| 1 | Title | `[CONTENT REQUIRED]` — draft once the technical story is clear |
| 2 | Context | **Partial.** An appraisal system with a website and an offline-capable Android client. Users are **appraisers working in the field, including areas without connectivity.** Sector/scale/geography still `[CONTENT REQUIRED]` |
| 3 | Problem | **Partial.** Field appraisers could not rely on connectivity. Whether the offline capability was the *original* requirement or a later fix is `[CONTENT REQUIRED]` |
| 4 | My Role | **Partial — and the boundary is now clear.** See "My Role, as stated" below. Sole mobile developer, **maintaining an existing app he did not originally build.** A separate CASECenter developer team owns the web side. The specific work he personally did is still `[CONTENT REQUIRED]` |
| 5 | Investigation | `[CONTENT REQUIRED]` |
| 6 | Technical Challenge | **Strong candidate: offline-first sync.** Unconfirmed — `[CONTENT REQUIRED]` |
| 7 | Solution | **Partial.** Kotlin, Android Studio, CASECenter API. Local storage mechanism needs confirming — see below |
| 8 | Validation | `[CONTENT REQUIRED]` |
| 9 | Result | `[CONTENT REQUIRED]` — no invented numbers |
| 10 | Lessons | `[CONTENT REQUIRED]` |

### Local storage — RESOLVED 2026-09-22

Raymund first said MySQL, then corrected it himself when asked:

> My bad, its SQLite via Room

**Confirmed: SQLite via Room** for on-device storage. Publishable.

This is the right shape for an offline-first Android app, and it strengthens the story rather than
weakening it — Room is the mechanism that makes the offline capability real. It was resolved by
**asking**, not by Claude silently substituting the expected answer.

`[VERIFY INFORMATION]` — what sits behind the CASECenter API server-side is still unstated. It may
not matter for the case study, and it may be more sensitive than the client-side detail. Do not
assume it was MySQL just because the word came up.

### My Role, as stated 2026-09-22 — the boundary that must not be blurred

> We have CASECenter developer team but in mobile development im solo but i just maintin existing
> application.

| Fact | Publishable as |
|---|---|
| A separate **CASECenter developer team** exists and owns the web side | Not his work. Must be attributed away from him. |
| He is **solo on mobile development** | **Sole responsibility for the mobile application.** Accurate and strong. |
| He **maintains an existing application** he did not originally build | Must be stated plainly. He did not author the original app. |

**Rules for the write-up — non-negotiable:**

1. **Never imply he built the app.** Not by omission, not by vague phrasing like "worked on" or
   "delivered". The honest frame is *ownership and maintenance of a production application*.
2. **Never claim the web/CASECenter side.** That belongs to the CASECenter developer team.
3. **Do not repeat his word "just".** "Just maintain" is his self-deprecation, not a factual
   qualifier. Sole ownership of a production Android app used by field staff is substantial
   professional responsibility, and the copy should state the scope neutrally — neither inflated nor
   diminished.

**This maps exactly onto the stated experience in `CLAUDE.md`:** *enterprise Android development and
maintenance · application troubleshooting · production issue investigation · UAT support ·
application releases*. Nothing here needs stretching to fit.

### What this means for the case study's shape

A case study cannot be "I maintained an app" — that has no narrative and fails the recruiter test
question *"can he solve difficult problems?"*.

**It must be ONE SPECIFIC INCIDENT**, which maps cleanly onto Sheet 06's template:

| Template section | What the incident supplies |
|---|---|
| Problem | The symptom that was reported |
| Investigation | How he found the cause |
| Technical Challenge | Why it was hard — legacy code he did not write, offline sync, no repro |
| Solution | What he changed |
| Validation | How it was tested, UAT |
| Result | What changed afterwards |

### THE INCIDENT — VAPT remediation under a no-upgrade constraint

Stated 2026-09-22:

> Oh, it was the VAPT security scanned by the client. I solved it without AI help before and it
> almost makes me crazy since i cannot update any library for the mobile app because it will break
> all the codes.

**What this is:** the client ran a Vulnerability Assessment and Penetration Test against the mobile
application. Findings came back. Raymund — sole mobile developer — had to remediate them **without
being able to upgrade any library**, because upgrading would break the existing codebase.

**Why this is strong material.** It is a genuine engineering problem with a hard constraint, and it
answers the recruiter question the plan flagged as *at risk* — "can he solve difficult problems?"
The ordinary answer to a vulnerable dependency is "upgrade it". He could not. Remediating under that
constraint requires actually understanding each finding rather than bumping a version number.

It also sits squarely inside the stated experience in `CLAUDE.md` — *security remediation ·
application troubleshooting · enterprise Android maintenance* — so nothing needs stretching.

---

### 🔴 DISCLOSURE CONFLICT — must be resolved before a single line is written

**The engagement is tiered `sectoral`. The content is security remediation, which the policy tiers
`abstracted`.** These disagree, and the stricter one must win.

Workbook Sheet 18, T3 Abstracted — *"Use when: anything touching security, incidents, credentials or
internal architecture."*

`PHASE-1-DISCOVERY.md` is blunter: *a public narrative describing security remediation on a named
financial institution is the single highest-risk sentence this portfolio could contain.*

**Therefore this case study publishes at `abstracted`, not `sectoral`** — overriding the engagement's
default tier. Concretely:

- ❌ No client name. ❌ No sector. ❌ No geography. ❌ Nothing that identifies the organisation.
- ❌ **No specific vulnerability details, CVEs, library names, versions or attack paths.** Publishing
  what was wrong is a roadmap for anyone who finds an unpatched build.
- ❌ No scan reports, no screenshots, no finding counts tied to an identifiable party.
- ✅ The *class* of problem, the constraint, the reasoning, and how it was validated.

**Raymund must confirm this tier change before drafting.** It is a deviation from D5's per-engagement
mapping, made because the content type is more sensitive than the engagement. It should be recorded
as its own decision.

### Questions still needed — and two that gate everything

**GATING — answer before any drafting:**

1. **Is the remediation complete, released, and re-scanned/closed off?** If any finding is still
   open in a live build, **nothing about this publishes at any tier.** Describing a live weakness in
   a production app is not a portfolio piece.
2. **Is Raymund contractually free to say a VAPT happened at all?** Some engagements treat the
   existence of a security assessment as confidential.

**Then, for the story — recorded here in full, sanitised only on the way out:**

3. What *classes* of finding came back? (Categories only — not specifics.)
4. **How did he fix them without upgrading libraries?** This is the heart of the case study.
5. How did he verify each fix actually worked?
6. Did the client re-scan and confirm closure? Was there a UAT cycle?
7. How long did it take, roughly? Was he under deadline pressure?
8. What made it "almost crazy" — the constraint itself, the volume, the diagnosis?

`[CONTENT REQUIRED]`

**Architecture / flow detail for the diagram (CG-12):** `[CONTENT REQUIRED]`
**Screenshots clearable? (CG-13):** default assumption — **none**

---

## 2. Case study 2 — `[CONTENT REQUIRED]`

Same ten sections. Not started.

---

## 3. Third project (CG-14) — `[CONTENT REQUIRED]`

CTBC and SBC are separate client engagements; either could carry a case study. The register's
"CASECenter work" row names a tool, not an engagement, and needs reframing. Determines whether
project filtering could ever be justified (it cannot at two or three projects).

---

## 3a. No personal side projects — stated 2026-09-22

Raymund, unprompted:

> Right now, i still dont have personal project and im aware of that. Im studying automation rn like
> n8n and vibe coding using claude code which we are using right now also i have codex.

**This is not a gap the portfolio needs to fill.** The whole architecture is built on *professional*
work — the site's thesis is Requirement → Analysis → Design → Development → Testing → UAT → Release
→ Support, which is employment experience, not side projects. A Solution Analyst with real
enterprise delivery does not need a weekend app to be credible. **Do not manufacture a "Projects"
section to compensate, and do not treat this as a weakness in the copy.**

### Handling of the learning-in-progress items — IMPORTANT

**n8n, automation, Claude Code and Codex are NOT in Raymund's stated experience list** in
`CLAUDE.md`, and he described them as things he is *studying*, not things he has delivered with.

- **Do not list them under Skills** (CG-06 is explicit: only technologies he would defend in an
  interview).
- **Do not imply delivery experience with them anywhere.**
- If he wants them represented at all, the only honest framing is something like "currently
  learning", clearly separated from the skills he would defend — **and only if he asks for it.**
  Default: omit.

`[VERIFY INFORMATION]` — does Raymund want a "currently learning" line on the About page, or should
these be left off entirely? Default is off.

---

## 4. Other open content items

| ID | Item | Blocks | Status |
|---|---|---|---|
| CG-09 | Positioning line — three drafts in `PHASE-1-DISCOVERY.md` §10.1 | 08 | Open |
| — | May "CASECenter" be published at all? | 07 | Open |
| — | Delivery Thread: 8 stages or 7? "Design" is not in the stated experience | 06 | Open |
| CG-08 | Location and availability | 08, 11 | Open |
| CG-05 | Employment history — employers, exact titles, exact dates | 10 | Open |
| CG-06 | Skills — only what would be defended in an interview | 10 | Open |
| CG-10 | Headshot — yes or no | 10 | Open |
| CG-07 | Public LinkedIn and GitHub URLs | 11 | Open |
| CG-04 | Current resume PDF | 11 | Open |

---

## Session transcript

Raw answers captured as given. Structured into the table above, never paraphrased into claims
Raymund did not make.
