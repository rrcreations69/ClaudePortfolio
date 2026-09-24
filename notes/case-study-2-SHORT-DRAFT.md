# Case study 2 — SHORT ENTRY, draft for sign-off

> ⚠️ **NOT PUBLISHED. Lives in `notes/`, outside `src/`.** Clearance is a
> pre-commit gate (D23). Tier `abstracted` (D31). Short entry (D32).

**Every line traces to an answer he gave.** Where he did not supply something,
the line is cut, not filled in. Three items are flagged 🔴 below.

---

## 🔴 BLOCKER 1 — "appraisal" collides with case study 1

**S1: "IT WAS APPRAISAL SYSTEM."**

Case study 1 is the Android side of what appears to be **the same product**.
His Q11 answer was: *"SQLite on android device that holds the appraisal data
and sync it in CASECenter after the appraiser finished his/her work."*

So: field staff capture on Android → syncs to CASECenter. **Case study 1 and
case study 2 are two halves of one system.**

### Why this is a problem, not a coincidence

Case study 1 publishes at `abstracted` and the word "appraisal" was
**deliberately removed** from it on 2026-09-24 — his own instruction was *"keep
it generic"*. Its Context section now says only "field staff who regularly work
in areas with no network connectivity".

If case study 2 says "appraisal system", a reader who has read both pages
reassembles what case study 1 deliberately withheld. **Neither page leaks on
its own; together they do.** That is a mosaic disclosure, and it is exactly
what a tier is supposed to prevent.

### Recommendation

**Describe it as a decisioning and workflow system, not an appraisal system.**
The delivery story — BRD/PRD in, policy logic built, tested, released,
supported — does not need the business function at all. It is the same call he
already made for case study 1, applied consistently.

**If he overrides this**, the honest consequence is that case study 1's
Context section must be re-checked too, because the pair would then be
identifiable as one system for one client.

---

## 🔴 BLOCKER 2 — "MAYBE A YEAR" is not a date

**S5 asked *roughly when*. "Maybe a year" answers *how long*.**

`period.start` is schema-required — **the build fails without it.** His current
role began Jan 2024, so it is 2024 or 2025, but **dates are never approximated
on this site** and it will not be inferred.

Needs one word: **2024** or **2025**. Separately, if the build genuinely ran
about a year, that is a usable detail — but only once the start year is known.

---

## 🟡 BLOCKER 3 — S3 is a complaint, not a method

**S3: "HARDEST PART IS IF THE DOCUMENT IS NOT SOLID BEFORE STARTING THE
PROJECT."**

This is the best material in the answers — it is a genuine analyst's insight
and it is the half of his title case study 1 does not evidence at all.

But as stated it says only *that* thin requirements are hard. It does not say
**what he does about it**, which is the part that makes it a skill rather than
a grievance. An interviewer will ask the follow-up immediately.

**One sentence closes it:** when a BRD or PRD arrives incomplete, what does he
actually do — go back to the client, build to an assumption and confirm later,
prototype something to react to, hold the start? Without it, the section still
publishes, but weaker.

---

# THE DRAFT

## Proposed title

> **[NEEDS BLOCKER 3] — placeholder:** *Owning delivery from requirements
> document to production support*

Case study 1's title leads with the judgement (*"Which upgrades are safe…"*).
The equivalent here depends on his answer to Blocker 3 — if the method is
"push back on the document before building", the title becomes something like
*"Building from a requirements document that isn't finished"*, which is far
stronger than the placeholder.

## Context

> An enterprise system built and delivered on CASECenter, a credit
> decisioning and policy automation platform.
>
> The work begins with the client's own BRD and PRD and ends in production
> support — the same person carrying it through requirements, build, testing,
> release and the life of the system afterwards.

*Sourced: S1, S2. Business function deliberately omitted — see Blocker 1.*

## Technical challenge

> The hardest part is not the build. It is starting one before the requirements
> document is solid.
>
> A BRD or PRD that is still moving means policy logic written against
> assumptions that have not been agreed yet, and the cost of that does not show
> up until testing.

*Sourced: S3. ⚠️ The second paragraph states the consequence of what he
described; if it overstates, cut it. The section is incomplete until Blocker 3
is answered.*

---

## Frontmatter

```yaml
title: '[BLOCKED ON 3]'
slug: '[derive from title — no client name; schema blocks it]'
order: 2
featured: true

disclosure: 'abstracted'
clientDescriptor: 'An enterprise system delivered on the CASECenter decisioning platform'
confidentialityReview:
  reviewedBy: 'Raymund Ryan Bermudes'
  reviewedOn: '[the date he signs off]'
  tierConfirmed: 'abstracted'

problem: 'Delivering an enterprise decisioning system from a client requirements document, where the document is rarely finished before the build has to start.'
myRole: 'End to end. I developed the requirements from the client BRD and PRD, built the policy logic, tested it, released it, and supported the client afterwards.'
outcome: 'The system went live and is still in production use by the client.'

stack: ['CASECenter']
domain: ['credit-decisioning', 'fintech']
workType: ['requirements-analysis', 'integration']

period:
  start: '[BLOCKED ON 2]'

stages: ['requirement', 'analysis', 'development', 'testing', 'release', 'support']

description: '[max 160 chars — derive from title]'
updated: 2026-09-24
```

### Notes on the frontmatter

**`stages` claims SIX of seven.** Sourced directly from S2 — requirements from
BRD/PRD, policy logic, testing, release, client support. **`uat` is NOT
claimed**: he said "testing" and "client support", never UAT, and UAT is a
formal client activity that must not be inferred from either. If he ran UAT
sessions, say so and it becomes seven of seven.

**`outcome` deliberately does not claim sign-off.** He said "deployed, used by
client, went live and still running" — that is production longevity, which is
real and checkable by the client. It is **not** the same as formal acceptance,
and case study 1's strongest line ("the client re-ran the assessment and it
passed") has no equivalent here unless he supplies one.

**`stack` lists CASECenter alone.** Unlike case study 1 this is not a security
story, so naming the platform costs nothing and D18 permits it — his CV names
it. Add SQL, XSLT or REST only if he confirms he used them *on this engagement*.

**No number appears anywhere**, and none is needed.

---

## Against case study 1

| | Case study 1 | Case study 2 |
|---|---|---|
| Role | Sole maintainer, previous role | End-to-end delivery, current role |
| Stages | 4 of 7 | **6 of 7** |
| Proof | External — the client's own re-scan | Production longevity |
| Covers | Technical judgement under constraint | **Requirements and delivery ownership** |

**This is the Delivery Thread doing its job**: six stages against four, shown
per project, without either page having to claim span in prose.

---

# ✅ UPDATE 2026-09-24 — UAT and sign-off confirmed

> **Source (Raymund):** *"ofcourse, DEV -> UAT -> Prod after that sign off"*

Two corrections to the draft above. Both make the entry stronger.

## 1. `stages` becomes SEVEN of seven

```yaml
stages: ['requirement', 'analysis', 'development', 'testing', 'uat', 'release', 'support']
```

He runs a DEV → UAT → Prod promotion path. **UAT is now sourced, not inferred**
— the earlier draft deliberately withheld it because he had said only "testing".

**This is the full Delivery Thread, lit by one project.** Against case study
1's four stages, the pair now demonstrates exactly what the Thread was designed
to show: depth on one, span on the other, neither claimed in prose.

## 2. `outcome` gains external verification

```yaml
outcome: 'The system went live and is still in production use. The client signed off on it after release.'
```

**Why this matters more than it looks.** Case study 1's strongest sentence is
*"the client re-ran the assessment and it passed"* — the party who raised the
findings confirmed they were closed, rather than the person who fixed them.

Client sign-off is the same shape of proof: acceptance by someone other than
the author. The earlier draft had no equivalent and said so. It does now.

**Still not claimed:** any statement about *what* was signed off against, or
how long UAT ran. He did not say, so it is not written.

## Revised comparison

| | Case study 1 | Case study 2 |
|---|---|---|
| Stages | 4 of 7 | **7 of 7** |
| Proof | The client's own re-scan | **Client sign-off after release** |
| Covers | Technical judgement under constraint | Requirements through support |
