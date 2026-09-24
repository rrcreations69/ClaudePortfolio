# Case study 1 — PROSE DRAFT

> ⚠️ **NOT PUBLISHED.** Lives in `notes/`, outside `src/`. Nothing moves to
> `src/content/work/` until you have signed off the substance **and** it has been
> checked at its tier. Clearance is a pre-commit gate (D23).

**Tier: `abstracted` (D17).** No client, no sector, no geography. No specific
vulnerabilities, library names, versions or attack paths — ever.

**How to use this:** read it as if you were a recruiter. Where a line is wrong,
strike it. Where you see a **❓ question**, answer it in a sentence. You do not
need to write prose — I will.

Everything not marked ❓ traces to something you actually said. Nothing is invented.

---

## Title — ✅ DECIDED 2026-09-24

> **Which upgrades are safe: remediating security findings without breaking the build**

Leads with the judgement rather than the constraint, which is the part that
reflects well on you.

**Slug:** `remediating-security-findings-without-breaking-the-build`
Checked against the restricted-name guard — clean. No client name in the URL.

---

## Context

> A production Android application used by field staff who regularly work in
> areas with no network connectivity. Data is captured on the device, stored
> locally in SQLite via Room, and synchronised with a server-side workflow
> platform through its API when a connection returns.
>
> It is a long-lived enterprise application, not a greenfield build — which
> turns out to be the whole story.

*Sourced: your description of the offline requirement, the Kotlin/Room/API
stack, and that you maintain rather than authored it.*

❓ **Roughly how long had it been in production, or how old was the codebase?**
One sentence. This is what makes the dependency situation credible rather than
sounding like an excuse. If you do not know, say so and I will cut it.

✅ **DECIDED 2026-09-24 — keep it generic.** Raymund: *"keep it generic"*.
The word "appraisal" and the business function it implies do **not** appear
anywhere in the published case study. "Field staff collecting data offline"
carries the whole engineering story and identifies nobody. Do not reintroduce
the function in a later edit — at `abstracted` tier it is exactly the kind of
detail that narrows an industry.

---

## Problem

> The client commissioned a vulnerability assessment and penetration test
> against the mobile application. It returned findings that had to be
> remediated.

*Sourced: "it was the VAPT security scanned by the client".*

⚠️ **Edited for provenance 2026-09-24.** The earlier draft read "had to be
closed **before the application could continue in production**". That framing
was Claude's, not Raymund's — he never said the findings blocked a release or
gated production. It has been removed rather than left in as a plausible
assumption. ❓ If there WAS such a gate, say so and it goes back in.

❓ **Roughly how many findings, and at what severities?** Counts and severities
are safe at this tier — they describe scale, not attack paths. If you would
rather not say, I will write it without numbers and it still works.

❓ **Was there a deadline, or a release it was blocking?**

---

## My role

> Sole developer on the mobile application. A separate team owned the web
> platform. I did not build the original application — I maintain it — and the
> remediation described here was mine end to end.

*Sourced: "We have CASECenter developer team but in mobile development im solo
but i just maintin existing application."*

**Three things this wording does deliberately:** it never implies you built the
app, it never claims the web team's work, and it drops your word *"just"*. Sole
ownership of a production application that field staff depend on is not a
"just" — the copy states the scope plainly, neither inflated nor diminished.

✅ **CONFIRMED ACCURATE by Raymund 2026-09-24.** This wording is signed off and
should not be re-edited without asking him again — it is the line recruiters
read most closely, and it is now his.

---

## Investigation — ✅ NOW SOURCED

> I started by upgrading the flagged libraries and seeing what broke. In a
> long-lived codebase that is the quickest way to find out what it can actually
> absorb: some upgrades moved cleanly, others failed outright or broke
> behaviour that other parts of the application depended on.
>
> That split the findings into two groups — the ones a version bump could
> close, and the ones that would have to be closed in the application's own
> code instead. For the second group I worked through what each finding meant
> in context and how to address it without moving the dependency, researching
> each one as I went.

*Sourced: "I tried updating the libraries first and checked what broke. Tried to
search stackoverflow cause theres no AI/LLM before. Fix VAPT findings by
refactoring codes and updating some libraries."*

**Why this is good material.** It is an empirical method, not a guess: change
one thing, observe the consequence, let the result decide the approach. That is
exactly the judgement the Technical Challenge section claims, now evidenced
rather than asserted.

### ✅ DECIDED 2026-09-24 — the "no AI" detail stays OUT

Raymund: *"yes leave out the AI part"*.

The absence of AI tooling is therefore **not mentioned anywhere** in the
published case study. The method is described plainly, which is stronger. Do
not reintroduce it in a later edit.

---

## Technical challenge

> The ordinary remedy for a flagged dependency is to upgrade it. In a
> long-lived application that remedy is not uniformly available: some upgrades
> would have broken the existing codebase.
>
> So the findings could not all be closed the same way. Each one had to be
> assessed on its own terms — was this dependency safe to move, and if not,
> what could change in the application's own code to close the finding without
> moving it?

*Sourced: your first account ("cannot update any library … it will break all the
codes") as refined by your second ("I updated some on library that can update
that wont affect the base codes").*

⚠️ **Note on accuracy.** The earlier blanket version — *no dependency could be
upgraded* — is **not true** and is not used. You did upgrade some. That
distinction matters: the blanket version is the kind of simplification that
collapses under one interview question.

❓ **Why would the other upgrades have broken things?** Major-version API
changes? One upgrade forcing a cascade? Something about how the app was
originally built?

---

## Solution

> The findings were closed along two tracks. Where a library could be moved
> without breaking the existing codebase, it was upgraded. Where it could not,
> the application's own code was changed instead, so the finding was closed
> without touching the dependency.

*Sourced: "VAPT fixes touch build.gradle and .kt files. I updated some on
library that can update that wont affect the base codes." — the two-track shape
is yours.*

### The concrete example — ✅ SOURCED 2026-09-24

> One finding concerned data held on the device without adequate protection.
> An application built to work offline necessarily keeps more on the device
> than one that does not, so this is the kind of finding that design invites.
> It was closed by changing how that data was written.

*Sourced: "One said the app was storing something on the device without
protecting it properly, so I changed how that data was written." Confirmed by
Raymund as something that actually happened.*

The middle sentence is **framing, not a claim about Raymund's work** — it is a
general property of offline-first applications, included so the finding reads
as a consequence of the design rather than as carelessness. Cut it if it feels
like editorialising.

### ⚠️ PROVENANCE WARNING — read before this publishes

**Claude supplied that sentence as an EXAMPLE of the right level of vagueness,
and Raymund returned it and confirmed it was real.** That is the exact pattern
this project has spent the whole of CHUNK 00 avoiding: offering plausible
wording and collecting a yes.

It is very probably fine — it is consistent with everything else he has said
(an offline app storing data locally via Room would plausibly attract exactly
this finding), and he volunteered the confirmation unprompted. But the words
originated with Claude, not with him.

**Before this goes live, Raymund must confirm it in his own words**, because an
interviewer will ask the obvious follow-up: *what was stored, and what did you
change about how it was written?* He needs to be able to answer that from
memory, not from this page.

❓ **Still open:** were the code-side fixes mostly one kind of change repeated,
or genuinely different problems needing different approaches?

---

## Validation — ✅ SOURCED 2026-09-24

> The client re-ran the assessment against the updated build. It passed.

*Sourced: "Yes they re-scanned and it passed."*

**This is the strongest sentence in the case study and it should stay short.**
It is external verification: the findings were confirmed closed by the party
who raised them, not by the person who fixed them. Padding it would weaken it.

❓ **Was there a UAT cycle or a controlled release as well?** Only if it
happened — the re-scan already carries this section.

---

## Outcome — ✅ SOURCED 2026-09-24

> Every finding was closed, and closure was confirmed by the client's own
> re-scan rather than by my say-so. The remediated build was released.

*Sourced: the re-scan passing, plus his earlier confirmation that the
remediation is complete, released and closed off.*

**No number appears here, and none is needed.** "Closed and confirmed by the
client's re-scan" is a stronger claim than any percentage, because it is
verifiable by someone other than the author. There is no metric slot anywhere
in this design system precisely so an empty box never invites one.

---

## Lessons

**🔴 Nothing sourced yet.**

❓ **What did this demonstrate professionally?**

Something like *"the usual fix is not always available, and the constraint
forces you to understand the finding rather than bump a version"* — but only if
you actually believe it, and in your words.

---

## What is still needed, shortest first

| | Question | Effort |
|---|---|---|
| 1 | Title — accept the recommendation? | one word |
| 2 | "Appraisal" or "field data collection"? | one word |
| 3 | My role wording — accurate? | one word |
| 4 | Codebase age | one line |
| 5 | Finding count / severities | one line |
| 6 | Why the other upgrades would break | one line |
| 7 | Outcome | one line |
| 8 | Lessons | one line |
| 9 | Validation — re-scan, UAT? | two lines |
| 10 | ~~How you decided which upgrades were safe~~ | ✅ **ANSWERED** |
| 11 | ~~One concrete finding and fix~~ | ✅ **ANSWERED** (see provenance warning) |

**All ten sections now have drafted prose or a sourced shape.** Six one-line
answers remain, plus one confirmation: the concrete finding must be restated in
Raymund's own words before publication.
