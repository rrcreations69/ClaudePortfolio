# What still needs you — 2026-09-24, after Parts A, B(Q10, Q11) and D

**Twelve of the eighteen open items closed today.** Three remain, and only one
of them is a question — the other two are things only you can supply.

---

## 🔴 1. Case study 2 — the CASECenter delivery

**The single biggest gap on the site.** Your headline says *Solutions Analyst &
Enterprise Systems Developer*. Every piece of evidence is still Android
security work from your **previous** role. A recruiter reads the headline,
clicks Work, and finds one Android case study.

`/about` already names CASECenter and credit decisioning (cleared under D18).
The Work section does not back it up yet.

Pick **one** engagement and answer these — rough notes, I write the prose:

| | |
|---|---|
| Q13 | Which engagement, and what was the system meant to do? |
| Q14 | What was the business problem? |
| Q15 | Your role precisely. Your CV says "lead" and "drive delivery" — requirements from the client directly? Policy logic yourself? |
| Q16 | Where did other people's work begin — QA, backend, UX, other developers? |
| Q17 | What was technically *hard* — the part needing judgement, that could have been done worse |
| Q18 | How you solved it. What you tried, what you rejected |
| Q19 | How it was validated. UAT? Client sign-off? Who confirmed it — you, or someone else? |
| Q20 | What happened in the end, and what it taught you |
| Q21 | Roughly when? A year is enough. **Dates are never approximated here** — if unsure, say so |

---

## 🟡 2. The About story (Q12)

`/about` renders a visible `[CONTENT REQUIRED]` where your professional story
should be. Rough notes are fine.

- How you got from Junior Android Developer to Solutions Analyst
- What kind of problem you enjoy most
- What you do differently from someone who only writes code

---

## 🟡 3. The CV PDF (Q3 — approved, file not supplied)

You said yes. The file has not arrived. Until it does, the Resume button does
not render anywhere — header or contact page — because shipping a button that
404s fails the recruiter test at the last step.

Drop it in as `public/raymund-bermudes-cv.pdf` and both appear on the next
build. **No code change needed.**

---

## ⚪ Optional, skipped on your instruction (`D: skip`)

Six one-liners that would enrich case study 1: codebase age · finding count and
severities · why the other upgrades would break · one repeated fix or several ·
UAT beyond the re-scan · whether findings blocked a release. Each was **cut
rather than invented**. Say the word if you want any of them back.

---

## ✅ Closed 2026-09-24

**Part A (all defaults):** 7 delivery stages, Design dropped (D24) · email
published from the CV (D26) · CV PDF approved (D29) · all 24 skills confirmed
(D28) · GitHub omitted (D27) · no headshot (D30) · `stack` stays generic ·
4-of-8 stages on case study 1 stands · SBC stays out as a third case study.

**Q10:** positioning line chosen (D25) — home page now indexable.
**Q11:** on-device storage finding restated in his own words — provenance
closed, see [`case-study-1-PROVENANCE.md`](case-study-1-PROVENANCE.md). The
published sentence deliberately did **not** change.

---

## Still not a question

**The push.** 22 commits local. The live site predates CHUNK 08 and shows none
of this — including everything landed today. It blocks production verification
of CHUNKS 14, 15 and 16.

    git push origin main
