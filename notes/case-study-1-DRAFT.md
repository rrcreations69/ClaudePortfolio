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

## ✅ Decision 1 — ANSWERED 2026-09-23, and the answer is better than either option

> **Source (Raymund):** "VAPT fixes touch build.gradke and .kt files. I updated some on library
> that can update that wont affect the base codes."

**It was neither of the two options I framed. It was triage — which is a stronger story than both.**

Both `build.gradle` and `.kt` files changed. He did not simply refuse to upgrade, and he did not
simply patch his own code. He **assessed each dependency and split them**:

- Libraries that could be upgraded **without breaking the existing codebase** → upgraded.
- Libraries that could not → left at their version, and the remediation was done in the
  application's own code instead.

**Why this is the better story.** "I couldn't upgrade anything so I refactored" is a constraint
story. "I worked out which upgrades were safe and which would break the build, upgraded the safe
ones, and solved the rest in code" is a **judgement** story — and judgement is what a Solutions
Analyst is hired for. It also quietly demonstrates that he understood each finding well enough to
know which tool applied, rather than reaching for one tool throughout.

### Refinement, not contradiction — worth noting so nobody "corrects" it later

His first account (2026-09-22) was:

> "i cannot update any library for the mobile app because it will break all the codes"

His second (2026-09-23) is that he *did* upgrade some. **These are consistent:** he could not
upgrade them *all*, and the blanket phrasing was shorthand. The accurate version is the second one,
and the case study must use it — *"no dependency could be upgraded"* would now be **false**, and it
is the kind of false simplification that collapses under one interview question.

⚠️ **Consequence: the drafted Technical Challenge and all three title drafts below are now wrong.**
They were built on the no-upgrade-at-all premise. Rewritten in §6 and §4.

### Still narrower, but still open

`[CONTENT REQUIRED]` **What did the `.kt` refactoring actually address?** Two possibilities remain,
and they are not the same story:

- Findings in the **app's own code** (how something was stored, logged, exposed, or configured), or
- Findings in the **un-upgradable libraries**, worked around by changing how the app used them.

Possibly both. This is the last structural gap in the Solution section.

## ✅ Decision 2 — ANSWERED: SBC is the same kind of work, not separate security work

> **Source (Raymund):** "in SBC its just the same as CTBC i just maintain old mobile app which is
> build differently using java"

**SBC is a third mobile maintenance engagement, not a separate security item.** An older application,
built in **Java** rather than Kotlin, maintained the same way.

**Consequences:**
- The register's CG-02 *"SBC security/troubleshooting work"* is **mis-scoped**. It is not a distinct
  security engagement; case study 2 must come from elsewhere — which it now does (CASECenter).
- **SBC is a strong candidate for CG-14**, the third, shorter entry: a second maintained mobile
  application, in a different language, for a different client. It supports the maintenance story
  without needing a full case study of its own.
- `[VERIFY INFORMATION]` Was the VAPT on the CTBC app, the SBC app, or both? It matters only for
  accuracy of the period and the stack, since the tier is `abstracted` either way and neither client
  is named.
- Note again: **"i just maintain"**. Same self-deprecation as before, and the copy will not repeat it.

### 3. How much functional context may survive the abstracted tier?

At `abstracted` the reader gets the class of problem only. The question is whether the *purpose* of
the app can be described at all. Two options, and I need your call:

| Option | Reads as | Trade |
|---|---|---|
| **A — keep the function** | "a mobile application used by field staff to carry out **appraisals**, often in areas with no connectivity" | Concrete and easy to picture. "Appraisal" narrows the industry — banks, insurers, valuers — though it names nobody. |
| **B — drop to the mechanism** | "a mobile application used by **field staff collecting data offline**, often in areas with no connectivity" | Fully generic. Costs a little colour, discloses nothing. |

**My recommendation: B.** The offline constraint is what makes the engineering interesting, and it
survives intact. "Appraisal" adds texture but buys nothing the security story needs.

### 4. Title — REDRAFTED 2026-09-23 (names the problem, not the app)

The earlier drafts all claimed no dependency could be upgraded. That is now known to be false, so
all three are discarded. New drafts, built on the triage premise:

1. *Closing security findings when only some dependencies can be upgraded*
2. *Triaging a security assessment against a legacy Android codebase*
3. *Which upgrades are safe: remediating VAPT findings without breaking the build*

**Recommendation: 3.** It leads with the judgement rather than the constraint, which is the part
that reflects well on the person doing it. `[VERIFY INFORMATION]` — Raymund picks.

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

### 6. Technical challenge — ✅ REDRAFTED 2026-09-23 on the corrected premise

> **Source:** "it almost makes me crazy since i cannot update any library ... because it will break
> all the codes" (2026-09-22) — refined by "I updated some on library that can update that wont
> affect the base codes" (2026-09-23).

**Drafted:**

> The ordinary remedy for a flagged dependency is to upgrade it. In a long-lived application that
> remedy is not uniformly available: some upgrades would have broken the existing codebase. The
> findings could not, therefore, all be closed the same way. Each one had to be assessed
> individually — was this dependency safe to move, and if not, what could be changed in the
> application's own code to close the finding without moving it?

**The previous draft said no dependency could be upgraded. That was wrong and has been replaced.**

**Gaps:**
- `[CONTENT REQUIRED]` **How did you decide which upgrades were safe?** This is now the most
  interesting question in the whole case study. Did you upgrade and see what broke? Read changelogs
  for breaking changes? Judge by how deeply the app used each library? Whatever it was, *that* is
  the judgement the story turns on.
- `[CONTENT REQUIRED]` **Why would the others have broken things?** Major-version API changes? One
  upgrade forcing a cascade? Something about how the app was originally built? This makes the
  constraint credible rather than an excuse.
- `[CONTENT REQUIRED]` You said it "almost makes me crazy" — the constraint, the number of findings,
  or working out where each applied? The honest human detail is what makes a case study read like a
  person wrote it.

---

### 7. Solution — ✅ the SHAPE is now sourced; the specifics are not

> **Source:** "I refactor the codes" (2026-09-22) + "VAPT fixes touch build.gradke and .kt files.
> I updated some on library that can update that wont affect the base codes." (2026-09-23)

**Drafted — the shape, which is now genuinely sourced:**

> The findings were closed two ways. Where a library could be moved without breaking the existing
> codebase, it was upgraded. Where it could not, the application's own code was changed instead, so
> the finding was closed without touching the dependency.

**That two-track structure is the spine of this section** and it is sourced. What is missing is what
sits inside each track.

⚠️ **Note on method.** It would be easy for me to list the standard Android hardening measures here
and ask you to tick the ones you did. **I am not going to do that.** Offering a plausible list and
collecting a "yes" manufactures detail you did not recall, and you would then be defending invented
specifics in an interview. Whatever goes here has to come from you unprompted.

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
| My role | ✅ **Drafted and sourced** — needs sign-off |
| Investigation | 🔴 **Nothing** |
| Technical challenge | ✅ **Redrafted on the corrected premise** — needs the *how did you decide* detail |
| Solution | 🟡 **Shape now sourced** (two-track: upgrade what is safe, refactor the rest); specifics missing |
| Validation | 🔴 **Nothing** |
| Outcome | 🔴 **Nothing** |
| Lessons | 🔴 **Nothing** |

**Decisions 1 and 2 are answered.** The case study now has a real spine: *assess each finding,
upgrade the dependencies that can move safely, close the rest in code.*

**The question that now unlocks the most: how did you decide which upgrades were safe?** That is the
judgement the whole story turns on, and it is the difference between "did the work" and "knew what
he was doing".
