# ANSWER SHEET — fill this in and the project finishes

**How to use:** answer inline in chat by number (`Q1: yes`, `Q4: skip Retool, skip PHP`).
Anything you do not answer keeps the **default** shown in bold — all defaults are
safe and honest. You can reply **"Part A: all defaults"** and move straight to Part C.

Nothing here is a trick question. Where I have a recommendation it is in bold.

---

# PART A — nine one-word answers (≈2 minutes)

These unblock three pages. Every one has a default.

| # | Question | Default if you say nothing |
|---|---|---|
| **Q1** | Delivery Thread: **8 stages or 7?** "Design" is the only stage not in your stated experience — your CV has you collaborating *with* UI/UX, not owning design. | **7 (drop Design)** |
| **Q2** | Published email: use `raymund.bermudes21@gmail.com` from your CV, or set up a new dedicated address? | **Use the CV address** |
| **Q3** | Publish the CV PDF? The Resume button does not render at all until one exists. If yes, send the file you are happy to have public. | **Yes** — but I cannot proceed without the file |
| **Q4** | Skills: 24 are live on /about, taken straight from your CV. **Strike anything you would not defend in an interview.** (Name them, or say "all fine".) | **All 24 stay** |
| **Q5** | GitHub URL on the site? Your CV lists none and this repo is private. | **Omit** |
| **Q6** | Headshot — yes or no? | **No** (completely normal) |
| **Q7** | Case study 1 `stack` says `REST`, not `CASECenter`. Naming the platform adds identifying detail to a *security* story for no benefit. OK? | **Leave generic** |
| **Q8** | Case study 1 claims **4 of 8 stages** (analysis, development, testing, release). I did not claim requirement, design, UAT or support because you did not describe them. Did you own more? | **Keep 4** |
| **Q9** | SBC — you said it was maintenance, not separate security work. Confirm it does **not** become a third case study. | **No third case study** |

---

# PART B — three that need your own words

### Q10 — Positioning line 🔴 *blocks the whole home page*

Pick a number, or write your own:

1. **"I turn business requirements into enterprise systems — and stay with them through testing, UAT, release and production support."** ← recommended
2. "Solutions Analyst and Enterprise Systems Developer. Credit decisioning platforms, enterprise Android, and the delivery work in between."
3. "Requirements to release, and everything after."

**Answer: ____**

### Q11 — The on-device storage sentence ⚠️ *already published*

Currently live: *"One finding concerned data held on the device without adequate
protection… It was closed by changing how that data was written."*

**I wrote that sentence, not you.** I offered it as an example of the right
vagueness and you confirmed it was real. It is very probably fine — but an
interviewer will ask *what was stored* and *what changed*, and you need that
from memory.

**Say it once in your own words. Two sentences. Keep it vague — no library
names, no versions.**

**Answer: ____**

### Q12 — The About page story

Your professional story and how you work. Nobody but you can write this; a
generated version reads exactly like one.

Three prompts if a blank page is hard:
- How did you get from Junior Android Developer to Solutions Analyst?
- What kind of problem do you enjoy most?
- What do you do differently from someone who only writes code?

**Answer (rough notes are fine — I will write the prose): ____**

---

# PART C — case study 2 🔴 *the biggest gap on the site*

**Why this one matters most.** Your headline says *Solutions Analyst &
Enterprise Systems Developer*. Every piece of evidence on the site is Android
security work from your **previous** role. A recruiter reads the headline,
clicks Work, and finds the gap.

**Pick ONE specific CASECenter engagement and answer these eight.** Rough notes
are fine — I write the prose. Tier will be `sectoral` or `abstracted`, so no
client name appears anywhere.

| # | Question |
|---|---|
| **Q13** | **Which engagement?** One specific piece of delivered work. What was the system meant to do, in one line? |
| **Q14** | **What was the business problem?** What was the client trying to achieve or fix? |
| **Q15** | **What was your role, precisely?** Your CV says you "lead" and "drive delivery" — what did that mean here? Did you gather requirements from the client directly? Build the policy logic yourself? |
| **Q16** | **Where did other people's work begin?** Who else was on it — QA, backend, UX, other developers — and what did they own rather than you? |
| **Q17** | **What was technically hard about it?** The part that needed judgement, not just effort. Something that could have been done a worse way. |
| **Q18** | **How did you solve it?** Your approach. What you tried, what you rejected. |
| **Q19** | **How was it validated?** UAT? Client sign-off? A test cycle? Who confirmed it worked — you, or someone else? |
| **Q20** | **What happened in the end**, and **what did it teach you?** |
| **Q21** | **Roughly when?** A year is enough. **Dates are never approximated on this site** — if you are unsure, say so. |

---

# PART D — optional. Case study 1 is complete without these

Each was asked, went unanswered, and the line was **cut rather than invented**.
One line each if you want them; skip the whole part with "D: skip".

| # | Would add |
|---|---|
| **Q22** | How old the codebase was / how long in production |
| **Q23** | Roughly how many findings, at what severities |
| **Q24** | Why the other upgrades would have broken things |
| **Q25** | Whether the code-side fixes were one repeated change or several different problems |
| **Q26** | Whether there was a UAT cycle or controlled release beyond the re-scan |
| **Q27** | Whether the findings blocked a release — I removed my own unsourced claim that they did |

---

# PART E — not a question, but it is blocking

**Q28 — the push.** 21 commits sit locally. The live site predates CHUNK 08 and
shows none of this work. It blocks production verification of CHUNKS 14, 15 and
16.

Run it in the terminal panel beside the chat so the error is visible:

    git push origin main

Or tell me to add a Bash permission rule and I will run it myself.

---

# The fastest path

> **Part A: all defaults. Q10: 1. Q11: <your two sentences>. D: skip.**

That is four lines and it closes everything except case study 2 (Part C) and
the About story (Q12) — which are the two things only you can supply.

---
---

# ✅ ANSWERED 2026-09-24

Raymund's reply, verbatim:

> **Part A: all defaults. Q10: 1. Q11: SQLite on android device that holds the
> appraisal data and sync it in CASECenter after the appraiser finished his/her
> work. D: skip.**

| # | Answer | Result |
|---|---|---|
| Q1 | 7 stages | `design` removed from `DELIVERY_STAGES` **entirely**, not just hidden — the type system now rejects it. "Technical Challenge" → `analysis`. (D24) |
| Q2 | CV address | `raymund.bermudes21@gmail.com` published on /contact (D26) |
| Q3 | Yes | Approved (D29) — **file still not supplied**, so the Resume button still does not render |
| Q4 | All 24 stay | `SKILLS_CONFIRMED = true`, /about note removed (D28) |
| Q5 | Omit | `github: null` by decision, pending note removed (D27) |
| Q6 | No | Nothing referenced a headshot; no change needed (D30) |
| Q7 | Leave generic | No change — `stack` stays `REST` |
| Q8 | Keep 4 | No change |
| Q9 | No third case study | No change |
| Q10 | Option 1 | Positioning line live; **home page noindex lifted** (D25) |
| Q11 | — | Provenance closed. ⚠️ His words contain "appraisal" and "CASECenter", both of which must stay private — **the published sentence deliberately did not change.** See [`case-study-1-PROVENANCE.md`](case-study-1-PROVENANCE.md) |
| D (Q22–Q27) | Skip | Six lines stay cut rather than invented |

**Still open:** Part C (case study 2), Q12 (About story), Q3's actual file.
