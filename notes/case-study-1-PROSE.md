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

## Title

**Recommended:** *Which upgrades are safe: remediating security findings without breaking the build*

It leads with the judgement rather than the constraint, which is the part that
reflects well on you. ❓ **Accept, or pick another?**

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

❓ **Decision 3 — may I say the app is for "appraisals"?** My recommendation is
**no**: "field staff collecting data offline" says everything the engineering
story needs and identifies nobody. Confirm and I will leave it as drafted.

---

## Problem

> The client commissioned a vulnerability assessment and penetration test
> against the mobile application. It returned findings that had to be closed
> before the application could continue in production.

*Sourced: "it was the VAPT security scanned by the client".*

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

❓ **Does this read as accurate to you?** This is the line recruiters read most
closely, so it should be yours.

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

### ❓ One decision for you — the "no AI" detail

You have mentioned twice that there was no AI or LLM available at the time. It
is true, and the dates make it obvious to any reader anyway.

**My recommendation: leave it out.** Two reasons. It centres the wrong thing —
the story is your method, not the tools you lacked. And in 2026 it can read as
slightly defensive, which undercuts an otherwise confident piece. The work is
more impressive described plainly.

**Keep it if you disagree** — it is your work and your call. Say the word and
I will add a line.

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

**That structure is the spine of the section. What is missing is what sits
inside each track.**

⚠️ **I am not going to hand you a list of standard Android hardening measures to
tick.** If I suggest them and you agree, you will be defending invented
specifics in an interview. This has to come from you.

❓ **Pick one finding and walk me through it.** What did the scan flag, and what
did you change? Rough words are fine — "it complained about X, so I changed Y".

❓ **Were the code-side fixes mostly one kind of change repeated, or genuinely
different problems needing different approaches?**

---

## Validation

**🔴 Nothing sourced yet.** Both clearance gates are already passed — the work is
complete, released and closed off — so this section is safe to write.

❓ **How did you verify each fix actually worked, rather than just looked right?**

❓ **Did the client re-scan and confirm closure?** *A clean re-scan is the
strongest evidence in the whole case study. If it happened, it belongs here.*

❓ **Was there a UAT cycle or a controlled release?**

---

## Outcome

**🔴 Nothing sourced yet.** Schema-enforced: an empty `outcome` fails the build.

❓ **What changed once it was done?**

"The findings were closed and the application stayed in production" is already a
real outcome and is enough. **If there is no number, we publish no number** —
there is no metric slot anywhere in this design system, precisely so an empty
box never invites one.

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
| 11 | One concrete finding and fix | **the last big one** |

**Investigation is now written.** One substantial answer remains — item 11 —
plus eight one-liners.
