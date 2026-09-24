# Case study 1 — provenance record for the on-device storage finding

> 🔒 **PRIVATE. `notes/` is never published and never built.** This file exists
> so the sourcing of one published sentence is traceable. It contains detail
> that must NOT appear on the site.

## The problem this closes

The published Solution section contains this sentence:

> One finding concerned data held on the device without adequate protection.
> An application built to work offline necessarily keeps more on the device
> than one that does not, so this is the kind of finding that design invites.
> It was closed by changing how that data was written.

**Claude wrote that sentence, not Raymund.** It was offered as an example of
the right level of vagueness for `abstracted` tier, and Raymund returned it
with confirmation that it was real. That is the exact pattern CHUNK 00 was
built to avoid — proposing plausible wording and collecting a yes — so the
sentence was flagged and held open until he described it himself.

## His own words, 2026-09-24

> "SQLite on android device that holds the appraisal data and sync it in
> CASECenter after the appraiser finished his/her work."

**Provenance resolved.** The finding is his, the memory is his, and he can
answer an interviewer's follow-up without reading it off the page. That was
the entire purpose of the question.

## ⚠️ Why the published sentence did NOT change

His description contains two things that must never reach a public string:

| In his answer | Why it stays private |
|---|---|
| **"appraisal" / "appraiser"** | The business function. Decided 2026-09-24 — *"keep it generic"*. At `abstracted` tier the function narrows the industry, which narrows the client. "Field staff collecting data offline" carries the whole engineering story and identifies nobody. **Do not reintroduce it in a later edit.** |
| **"CASECenter"** | Nameable in general under D18, and it appears on `/about`. But this case study publishes at `abstracted` (D17), and naming the sync target in a *security* story adds identifying detail for no engineering benefit. Confirmed by Q7 — `stack` says `REST`. |

The published wording is therefore correct as written and **must not be
"improved" by adding his detail back in.** The detail's job is to live here, so
that the vague public sentence is known to be backed by a specific memory
rather than by a guess.

## What is still genuinely unstated

He described **what was stored** (local SQLite holding captured data pending
sync) but not **what he changed about how it was written**. The published text
says only "changing how that data was written", which is honest — it claims a
change without characterising it.

This is fine at `abstracted` tier: describing the remedy would describe the
weakness. **No follow-up is needed for publication.** It is noted only so that
a future edit does not mistake the vagueness for an omission to be filled.
