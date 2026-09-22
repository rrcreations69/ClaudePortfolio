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

## 1. Case study 1 — `[CONTENT REQUIRED]`

**Engagement:** `[CONTENT REQUIRED]`
**Disclosure tier:** `[CONTENT REQUIRED]`

| # | Section | Notes |
|---|---|---|
| 1 | Title | `[CONTENT REQUIRED]` |
| 2 | Context | `[CONTENT REQUIRED]` |
| 3 | Problem | `[CONTENT REQUIRED]` |
| 4 | My Role | `[CONTENT REQUIRED]` |
| 5 | Investigation | `[CONTENT REQUIRED]` |
| 6 | Technical Challenge | `[CONTENT REQUIRED]` |
| 7 | Solution | `[CONTENT REQUIRED]` |
| 8 | Validation | `[CONTENT REQUIRED]` |
| 9 | Result | `[CONTENT REQUIRED]` |
| 10 | Lessons | `[CONTENT REQUIRED]` |

**Architecture / flow detail for the diagram (CG-12):** `[CONTENT REQUIRED]`
**Screenshots clearable? (CG-13):** default assumption — **none**

---

## 2. Case study 2 — `[CONTENT REQUIRED]`

Same ten sections. Not started.

---

## 3. Third project (CG-14) — `[CONTENT REQUIRED]`

Does the remaining engagement warrant a full case study, or a shorter entry? Determines whether
project filtering could ever be justified (it cannot at two or three projects).

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
