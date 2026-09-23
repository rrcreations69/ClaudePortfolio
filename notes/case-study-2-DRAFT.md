# Case study 2 — DRAFT SKELETON (current role)

> ⚠️ **RAW DRAFT. NOT PUBLISHABLE. NOT BUILT.** Outside `src/`. Clearance is a **pre-commit** gate (D23).

- **Created:** 2026-09-23 · **Blocks:** CHUNK 07 · **Tracker rows:** CG-02, CG-12, CG-14
- **Proposed tier: `sectoral`** — sector, scale and geography, no client name. Permitted because
  Raymund's own CV already names the employer (GDS Link Asia), the tool (CASE Center) and the
  sector (fintech / credit decisioning) — **D18**. The *client* remains restricted.
- **Source:** the CV (`cv-extract.txt`) and [`CV-FINDINGS.md`](CV-FINDINGS.md).

---

## Why this case study exists

Case study 1 is Android security maintenance from the **previous** role (Junior Android Developer,
Jul 2022 – Dec 2023). The positioning is now **Solutions Analyst & Enterprise Systems Developer**
(D15), which is the **current** role (Jan 2024 – present).

**A recruiter who reads "Enterprise Systems Developer", clicks Work, and finds only an Android case
study has found a gap between the claim and the evidence.** This case study closes it.

Together the pair should say: *I deliver enterprise systems end to end, and I have the engineering
depth underneath it.* That is a materially stronger story than two backward-looking Android pieces.

---

## ⛔ Decision 1 — which engagement?

The CV describes the current role's *capabilities*. A case study needs **one specific engagement
with a problem and an outcome**. Three candidates, drawn from the CV:

### Candidate A — a CASECenter policy system delivery *(recommended)*

> **CV:** "Drive delivery of CASE Center policy systems for credit risk and decision automation
> across fintech clients." · "Lead end-to-end implementation of enterprise decisioning systems,
> aligning technical architecture with business analytics requirements."

**Why this one.** It is the positioning, stated as work. It plausibly spans requirement → analysis →
development → testing → UAT → release → support, which lights almost the whole Delivery Thread — and
the Thread is the site's central argument. It also demonstrates the business-requirements
understanding that case study 1 does not touch at all.

### Candidate B — Retool internal tooling

> **CV:** "Build and maintain internal operational tools using Retool, improving workflow
> efficiency and reducing manual overhead."

**Why it is weaker:** internal tooling has no external client, so it is easy to publish — but the
CV's claim is unquantified, and without a real before/after it risks reading as "I built some
internal tools." Good as a *third*, shorter entry (**CG-14**).

### Candidate C — a REST API integration across teams

> **CV:** "Manage REST API integrations and coordinate delivery milestones across Product, QA, and
> Backend Engineering teams."

**Why it is weaker:** coordination stories are hard to make concrete without naming systems, and the
technical substance may be thin once sanitised.

**`[CONTENT REQUIRED]` — Raymund picks. Recommendation: A.**

---

## Decision 2 — is this the same as the register's "SBC security work"?

Still open from case study 1. Sheet 15 CG-02 lists *SBC security/troubleshooting work* as a separate
item, but the VAPT described for case study 1 was on the **mobile** application.

- If the VAPT **is** the SBC work → CG-02 is already spoken for by case study 1, and this document
  becomes case study 2 outright.
- If they are **different** → SBC security work is a third candidate, and would publish at
  `abstracted` like all security content (D17).

`[CONTENT REQUIRED]`

---

## The ten sections (PRD Sheet 06) — assuming Candidate A

**Nothing below is drafted prose.** Unlike case study 1, there is no sourced material here beyond
CV bullets, and **CV bullets are not case study content** — they are capability claims, written in
a register this site deliberately avoids. Each section therefore carries the question that would
fill it.

| # | Section | What is needed |
|---|---|---|
| 1 | Title | Names the problem, not the system. `[CONTENT REQUIRED]` |
| 2 | Context | Which client type, what the system does, roughly what scale. At `sectoral`: sector and scale, never the name. `[CONTENT REQUIRED]` |
| 3 | Problem | What could the client not do before? A new policy they could not express? A manual process? A system being replaced? `[CONTENT REQUIRED]` |
| 4 | **My role** | **The critical one.** You "lead" and "drive" delivery per the CV — what does that mean concretely? Did you gather requirements directly from the client? Configure or build the policy logic yourself? Run the UAT? Own the release? Where did other people's work begin? `[CONTENT REQUIRED]` |
| 5 | Investigation | How did you turn a business requirement into a technical design? What did you have to find out first? `[CONTENT REQUIRED]` |
| 6 | Technical challenge | What made it hard — ambiguous requirements, a constraint in the platform, integration with something awkward, a deadline, conflicting stakeholders? `[CONTENT REQUIRED]` |
| 7 | Solution | What you actually built or configured, at useful technical depth. `[CONTENT REQUIRED]` |
| 8 | Validation | Testing, UAT with the client, sign-off, release. **This is the section case study 1 is weakest on — if you owned UAT here, it is strong material.** `[CONTENT REQUIRED]` |
| 9 | Outcome | What changed for the client. **A verified outcome, qualitative if there is no number. No number will be invented.** `[CONTENT REQUIRED]` |
| 10 | Lessons | What it demonstrated professionally. `[CONTENT REQUIRED]` |

---

## ⚠️ Two warnings for whoever drafts this

**1. Do not lift the CV's register.** Phrases like *"Results-driven"*, *"Adept at translating complex
business requirements into scalable technical solutions"*, *"driving full system lifecycle delivery"*
are standard CV language. This site is plain and evidence-led. The CV tells us *where the story is*;
it does not supply the prose.

**2. The CV's claims are unquantified — they must stay that way.** *"improving workflow efficiency
and reducing manual overhead"* and *"improving system reliability and user experience"* are
acceptable as qualitative statements. **They must not acquire numbers on the site to look stronger.**
There is no metric slot anywhere in the design system for exactly this reason.

---

## Frontmatter this will need

```yaml
title: "[CONTENT REQUIRED]"
slug: "[CONTENT REQUIRED — no client name; the schema blocks it]"
order: 2
featured: true
disclosure: "sectoral"                    # client unnamed; sector nameable per D18
clientDescriptor: "[CONTENT REQUIRED — e.g. 'a fintech client'; confirm the wording]"
confidentialityReview:
  reviewedBy: "Raymund Ryan Bermudes"
  reviewedOn: "[CONTENT REQUIRED — the date he actually reviews it]"
  tierConfirmed: "sectoral"
problem: "[CONTENT REQUIRED — max 200 chars]"
myRole: "[CONTENT REQUIRED]"
outcome: "[CONTENT REQUIRED]"
stack: ["CASECenter", "[CONTENT REQUIRED — SQL? XSLT? REST?]"]
domain: ["credit-decisioning", "fintech"]
workType: ["requirements-analysis", "integration", "uat-support", "release"]
period:
  start: "[CONTENT REQUIRED]"
period_note: "Current role began Jan 2024 — within that window"
stages: ["[CONTENT REQUIRED — likely requirement, analysis, development, testing, uat, release, support]"]
description: "[CONTENT REQUIRED — max 160 chars]"
updated: 2026-09-23
```

**If this engagement really did run requirement → support, it lights seven or eight stages against
case study 1's four or five.** Side by side, that is the Delivery Thread doing exactly the job it
was designed for: showing span, per project, without anyone having to claim it in prose.

---

## Summary

| | |
|---|---|
| Sourced material | **None yet** — CV bullets only, which are not case study content |
| Blocking | Decision 1 (which engagement) and Decision 2 (SBC overlap) |
| Strength if filled | **High** — it is the positioning, and it covers requirements and UAT, which case study 1 does not |
