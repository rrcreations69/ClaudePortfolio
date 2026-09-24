# Case study 1 — COMPLETE DRAFT, for sign-off

> ⚠️ **STILL IN `notes/`. NOT PUBLISHED.** Nothing moves to `src/content/work/`
> until Raymund signs this off and the one blocking field below is supplied.
> Clearance is a pre-commit gate (D23).

**Tier: `abstracted` (D17).** No client, no sector, no geography, no specific
vulnerabilities, no library names, no versions, no attack paths.

**Every sentence below traces to something Raymund said.** Where he did not
supply something, the line was cut rather than filled in. Five questions went
unanswered and five lines are therefore absent — that is the draft working as
intended, not a draft with holes.

---

# Which upgrades are safe: remediating security findings without breaking the build

## Context

A production Android application used by field staff who regularly work in
areas with no network connectivity. Data is captured on the device, stored
locally in SQLite via Room, and synchronised with a server-side workflow
platform through its API when a connection returns.

It is a long-lived enterprise application, not a greenfield build — which turns
out to be the whole story.

## Problem

The client commissioned a vulnerability assessment and penetration test against
the mobile application. It returned findings that had to be remediated.

## My role

Sole developer on the mobile application. A separate team owned the web
platform. I did not build the original application — I maintain it — and the
remediation described here was mine end to end.

## Investigation

I started by upgrading the flagged libraries and seeing what broke. In a
long-lived codebase that is the quickest way to find out what it can actually
absorb: some upgrades moved cleanly, others failed outright or broke behaviour
that other parts of the application depended on.

That split the findings into two groups — the ones a version bump could close,
and the ones that would have to be closed in the application's own code
instead. For the second group I worked through what each finding meant in
context and how to address it without moving the dependency, researching each
one as I went.

## Technical challenge

The ordinary remedy for a flagged dependency is to upgrade it. In a long-lived
application that remedy is not uniformly available: some upgrades would have
broken the existing codebase.

So the findings could not all be closed the same way. Each one had to be
assessed on its own terms — was this dependency safe to move, and if not, what
could change in the application's own code to close the finding without moving
it?

## Solution

The findings were closed along two tracks. Where a library could be moved
without breaking the existing codebase, it was upgraded. Where it could not,
the application's own code was changed instead, so the finding was closed
without touching the dependency.

One finding concerned data held on the device without adequate protection. An
application built to work offline necessarily keeps more on the device than one
that does not, so this is the kind of finding that design invites. It was
closed by changing how that data was written.

## Validation

The client re-ran the assessment against the updated build. It passed.

## Outcome

Every finding was closed, and closure was confirmed by the client's own re-scan
rather than by my say-so. The remediated build was released.

## Lessons

Not to treat a dependency upgrade as the whole answer. This was a legacy
codebase — written before I took it on, and not by me — and in that situation
upgrading is often the option you cannot take. Closing a finding then means
changing your own code rather than reaching for a newer version of someone
else's.

---

# 🔴 ONE BLOCKING FIELD

The schema requires `period.start`, and **it will fail the build without it.**

❓ **Roughly when did the VAPT happen?** A year is enough — `"2023"`. Your
Junior Android Developer role ran Jul 2022 – Dec 2023, so it falls in there
somewhere, but **I will not narrow that down by inference.** Dates are not
approximated on this site.

---

# Proposed frontmatter

```yaml
title: 'Which upgrades are safe: remediating security findings without breaking the build'
slug: 'remediating-security-findings-without-breaking-the-build'
order: 1
featured: true

disclosure: 'abstracted'
clientDescriptor: 'A production enterprise mobile application'
confidentialityReview:
  reviewedBy: 'Raymund Ryan Bermudes'
  reviewedOn: 2026-09-24        # ❓ the date you actually sign this off
  tierConfirmed: 'abstracted'

problem: 'A client security assessment returned findings against a long-lived Android application, in a codebase where not every dependency could safely be upgraded.'
myRole: 'Sole developer on the mobile application, maintaining an application I did not originally build. The remediation was mine end to end.'
outcome: "Every finding was closed, and closure was confirmed by the client's own re-scan rather than by my say-so. The remediated build was released."

stack: ['Kotlin', 'Room', 'SQLite', 'REST']
domain: ['enterprise-mobility']
workType: ['security', 'maintenance', 'android-development']

period:
  start: '[BLOCKING — see above]'

stages: ['analysis', 'development', 'testing', 'release']

description: 'Closing client security findings in a legacy Android codebase where not every dependency could safely be upgraded.'
updated: 2026-09-24
```

## Two frontmatter choices to confirm

❓ **`stack` deliberately says `REST`, not `CASECenter`.** CASECenter *is*
nameable (D18) and appears on your CV — but this case study publishes at
`abstracted`, and naming the specific platform adds identifying detail to a
*security* story for no engineering benefit. **Recommendation: leave it
generic.** It costs nothing.

❓ **`stages` — I have proposed `analysis, development, testing, release`**,
derived from your own account: you investigated, you changed code, the build
was re-scanned, it was released. I have deliberately NOT claimed `requirement`,
`design`, `uat` or `support`, because you did not describe them.

**These light 4 of 8 stages on the Delivery Thread, and that is the honest
number.** A case study that lit all eight would be less credible, not more.
Correct me if you owned more of it than you described.

---

# What was cut, and why

Five lines are absent because the answers never came. **None was invented.**

| Cut | Would have said |
|---|---|
| Codebase age | how long it had been in production |
| Finding count | roughly how many findings, at what severities |
| Why other upgrades broke | major-version changes, cascades, or something else |
| Fix variety | whether the code-side fixes were one repeated change or several different ones |
| UAT / controlled release | whether there was one beyond the re-scan |

Any of these can be added later in one line each. The case study stands without
them.

---

# Before this publishes

1. 🔴 **Supply `period.start`.** Blocking — the build fails without it.
2. ⚠️ **Restate the on-device storage finding in your own words.** Claude
   supplied that sentence as an example of the right vagueness and you
   confirmed it was real. It is very probably fine, but an interviewer will ask
   *what* was stored and *what changed* — you need that from memory, not from
   this page.
3. Confirm the two frontmatter choices above.
4. Read it once as a recruiter. If any sentence overstates what you did, strike
   it — that is the whole point of this step.
