# Case study 1 — DRAFT SKELETON

> ⚠️ **RAW DRAFT. NOT PUBLISHABLE. NOT BUILT.** Outside `src/`, so Astro never reads it.
> Nothing moves from here into `src/content/work/` until Raymund has signed off the substance
> **and** it has been rewritten to the cleared tier. Clearance is a **pre-commit** gate (D23).

- **Created:** 2026-09-23 · **Blocks:** CHUNK 07 · **Tracker rows:** CG-01, CG-12
- **Disclosure tier: `abstracted` (D17)** — the engagement is `sectoral`, but security content is
  tiered by the stricter rule. **No client. No sector. No geography.**
- **Source:** [`CHUNK-00-content.md`](CHUNK-00-content.md). Every ✅ line below traces to something
  Raymund actually said, quoted inline. Everything else is marked `[CONTENT REQUIRED]`.

**How to use this:** read the drafted prose and correct it. You do not need to answer questions in
order — tell me what is wrong and what is missing, in any order, in whatever words. Wrong drafts are
easier to fix than blank pages, which is the point of writing it this way.

---

## ⛔ Four decisions needed before this can be drafted properly

### 1. The crux — still unanswered

**Were the VAPT findings in the third-party libraries, or in how the app's own code was written?**

This determines what the case study *is*:

- **Findings in your own code** → refactoring is the direct fix. The library constraint is context,
  and the story is a competent security cleanup.
- **Findings in the libraries you could not upgrade** → then refactoring your own code so it no
  longer *relies* on the vulnerable code paths is genuinely resourceful, and **that is the story.**
  Working around an un-upgradable dependency is a much harder problem than patching your own bugs.

**I will not assume the second just because it makes a better case study.**

### 2. Is this the same engagement as the register's "SBC security work"?

The register (CG-02, sheet 15) lists *SBC security/troubleshooting work* as a separate item. But the
VAPT you described was on **the mobile appraisal application**, which is the CTBC engagement.

- If they are the **same thing** → the register has one security item, not two, and case study 2
  must come from somewhere else entirely.
- If they are **different** → SBC security work is still untouched and is the natural case study 2.

`[CONTENT REQUIRED]`

### 3. How much functional context may survive the abstracted tier?

At `abstracted` the reader gets the class of problem only. The question is whether the *purpose* of
the app can be described at all. Two options, and I need your call:

| Option | Reads as | Trade |
|---|---|---|
| **A — keep the function** | "a mobile application used by field staff to carry out **appraisals**, often in areas with no connectivity" | Concrete and easy to picture. "Appraisal" narrows the industry — banks, insurers, valuers — though it names nobody. |
| **B — drop to the mechanism** | "a mobile application used by **field staff collecting data offline**, often in areas with no connectivity" | Fully generic. Costs a little colour, discloses nothing. |

**My recommendation: B.** The offline constraint is what makes the engineering interesting, and it
survives intact. "Appraisal" adds texture but buys nothing the security story needs.

### 4. Title — names the problem, not the app (Sheet 06)

Drafts, all pending the answer to decision 1:

1. *Closing security findings without upgrading a single dependency*
2. *Remediating a security assessment under a hard no-upgrade constraint*
3. *When you cannot patch the library: remediating findings in legacy Android*

**Recommendation: 2.** States the constraint in the title, which is the whole point.
`[VERIFY INFORMATION]` — none is written until decision 1 lands.

---

## The ten sections (PRD Sheet 06)

### 1. Title
`[CONTENT REQUIRED]` — see decision 4.

---

### 2. Context — ✅ partly sourced

> **Source (Raymund, 2026-09-22):** "the CASECenter Appraisal system (Website) is an appraisal
> system used by CTBC and it has mobile version.. but for mobile version it has offline
> functionality so the appraiser can still use it without internet because sometimes they go to
> isolated area without any internet."
>
> "Mobile App was built using Android Studio (Kotlin, ~~MySQL~~, CASECenter API)" → corrected by
> Raymund to **SQLite via Room**.

**Drafted at `abstracted` tier (option B wording):**

> A production Android application used by field staff who routinely work in areas with no network
> connectivity. The application stores data locally on the device using SQLite via Room and
> synchronises with a server-side workflow platform through its API. It is a long-lived enterprise
> application, not a greenfield build.

**Gaps:**
- `[CONTENT REQUIRED]` Roughly how many users, or what scale of operation? Only if it is not
  sensitive and you actually know it — **this will not be estimated.**
- `[CONTENT REQUIRED]` Roughly how old is the codebase, or how long had it been in production?
  Relevant because it explains why the dependencies were stuck.

---

### 3. Problem — ✅ partly sourced

> **Source:** "it was the VAPT security scanned by the client"

**Drafted:**

> The client commissioned a vulnerability assessment and penetration test against the mobile
> application. The assessment returned findings that had to be closed before the application could
> continue in production.

**Gaps:**
- `[CONTENT REQUIRED]` Roughly how many findings, and at what severities? Counts and severities are
  safe at this tier — they describe scale, not attack paths. If you would rather not say, we write
  it without numbers.
- `[CONTENT REQUIRED]` Was there a deadline, or a release gate the findings blocked?

---

### 4. My role — ✅ SOURCED, and the boundary is clear

> **Source:** "We have CASECenter developer team but in mobile development im solo but i just
> maintin existing application."

**Drafted:**

> Sole developer on the mobile application. A separate team owned the web platform. I did not build
> the original application — I maintain it — and the remediation work described here was mine.

**Three rules this wording exists to satisfy, none negotiable:**
- Never implies you built the app.
- Never claims the web team's work.
- Drops your word *"just"*. That is self-deprecation, not a fact. Sole ownership of a production
  application that field staff depend on is substantial responsibility, and the copy states the
  scope neutrally — neither inflated nor diminished.

**Gap:**
- `[VERIFY INFORMATION]` Does this wording feel accurate to you? This is the single line recruiters
  read most closely, so it should be yours, not mine.

---

### 5. Investigation — ❌ `[CONTENT REQUIRED]`

Nothing sourced yet. This section answers *"how did I reason through it?"* and is one of the two
that decide whether the case study demonstrates problem-solving or just reports an outcome.

**Gaps:**
- How did you work out what each finding actually meant in your codebase? A scan report names a
  problem; it does not tell you where your code touches it.
- Did you have to reproduce anything, or was the report enough?
- How did you establish that upgrading was not viable — did you try it and watch it break, or was
  it already known?
- Did you have to decide which findings were real risks and which were noise in your context?

---

### 6. Technical challenge — ✅ partly sourced

> **Source:** "it almost makes me crazy since i cannot update any library for the mobile app because
> it will break all the codes."

**Drafted:**

> The ordinary remedy for a flagged dependency is to upgrade it. That was not available: upgrading
> the libraries would have broken the existing codebase. Every finding therefore had to be addressed
> without changing a single dependency version.

**Gaps:**
- `[CONTENT REQUIRED]` **Why** would upgrading have broken everything? Major-version API changes?
  One upgrade forcing a cascade of others? Something in how the app was originally built? This is
  the detail that makes the constraint credible rather than an excuse.
- `[CONTENT REQUIRED]` You said it "almost makes me crazy" — what was the hard part: the constraint
  itself, the number of findings, or working out where each one applied? The honest human detail is
  usually what makes a case study read like a person wrote it.

---

### 7. Solution — ❌ the headline is sourced, the substance is not

> **Source:** "I refactor the codes"

**This is the correct headline and it is not yet a case study.** "Refactored the code" is what a CV
bullet says. A technical reader wants to know *what* you changed and *why that closed the finding*.

⚠️ **Note on method.** It would be easy for me to list the standard Android hardening measures here
and ask you to tick the ones you did. **I am not going to do that.** Offering a plausible list and
collecting a "yes" manufactures detail you did not recall, and you would then be defending invented
specifics in an interview. Whatever goes here has to come from you unprompted.

**Gaps:**
- `[CONTENT REQUIRED]` Pick **one** finding. What did the scan flag, and what did you change in the
  code? In your own words, however rough.
- `[CONTENT REQUIRED]` Were the fixes mostly one kind of change repeated, or genuinely different
  problems needing different approaches?
- `[CONTENT REQUIRED]` Did you have to change how the app stored anything, talked to the API, or
  handled anything on the device?
- `[CONTENT REQUIRED]` Architecture / flow detail for the diagram (**CG-12**) — enough, sanitised,
  for me to draw something accurate. Possibly just: device local store → API → platform.

---

### 8. Validation — ❌ `[CONTENT REQUIRED]`

> **Gate already cleared (2026-09-22):** remediation is complete, released and closed off.

**Gaps:**
- How did you verify each fix actually worked, rather than merely looked right?
- Did the client re-scan and confirm closure? A clean re-scan is the strongest possible validation
  and belongs in the case study if it happened.
- Was there a UAT cycle, or a controlled release?

---

### 9. Outcome — ❌ `[CONTENT REQUIRED]`

Schema-enforced: `outcome` is `.min(1)` and an empty value fails the build.

**Gap:**
- What changed once it was done? The findings closed and the app stayed in production is already a
  real outcome and is enough. **If there is no number, we publish no number** — there is no metric
  slot anywhere in this design system, precisely so that an empty box never invites one.

---

### 10. Lessons — ❌ `[CONTENT REQUIRED]`

**Gap:**
- What did this demonstrate professionally? Something like *"the usual fix is not always available,
  and the constraint forces you to understand the finding rather than bump a version"* — but in your
  words, and only if you actually believe it.

---

## Frontmatter this will need at CHUNK 07

Filled where known, so the remaining gaps are visible. **Not yet valid** — the schema will reject it
until every `[CONTENT REQUIRED]` is resolved.

```yaml
title: "[CONTENT REQUIRED — decision 4]"
slug: "[CONTENT REQUIRED — must not contain a client name; schema blocks it]"
order: 1
featured: true
disclosure: "abstracted"                  # D17 — stricter tier wins
clientDescriptor: "[CONTENT REQUIRED — decision 3, option A or B]"
confidentialityReview:
  reviewedBy: "Raymund Ryan Bermudes"
  reviewedOn: 2026-09-22                  # gates cleared: "Both cleared"
  tierConfirmed: "abstracted"             # must equal `disclosure` or the build fails
problem: "[CONTENT REQUIRED — max 200 chars]"
myRole: "[section 4 above, pending your sign-off]"
outcome: "[CONTENT REQUIRED]"
stack: ["Kotlin", "Room", "SQLite"]       # ✅ sourced
domain: ["[CONTENT REQUIRED — decision 3]"]
workType: ["security", "maintenance", "android-development"]
period:
  start: "[CONTENT REQUIRED — when did the VAPT happen?]"
  end: "[CONTENT REQUIRED]"
stages: ["[CONTENT REQUIRED — which did you own? see below]"]
description: "[CONTENT REQUIRED — max 160 chars]"
updated: 2026-09-23
```

**`stages` — and the open 8-vs-7 question.** This drives the Delivery Thread. Candidates from what
you have described: `analysis`, `development`, `testing`, `release`, possibly `support`. **`design`
is the open question** (`lib/caseStudy.ts`) — your CV says you collaborated *with* UI/UX teams and
resolved UI inconsistencies through engineering review, which reads as working alongside designers
rather than owning design. **Your call, not an inference.**

---

## Summary — what is actually blocking

| Section | State |
|---|---|
| Context | 🟡 Drafted, needs scale and codebase age |
| Problem | 🟡 Drafted, needs finding count / severities |
| My role | ✅ **Drafted and sourced** — needs your sign-off |
| Investigation | 🔴 **Nothing** |
| Technical challenge | 🟡 Drafted, needs *why* upgrading breaks things |
| Solution | 🔴 **The core gap** |
| Validation | 🔴 **Nothing** |
| Outcome | 🔴 **Nothing** |
| Lessons | 🔴 **Nothing** |

**One answer unlocks the most:** decision 1 — were the findings in the libraries, or in your own
code? Everything in Solution and Technical Challenge hangs off it.
