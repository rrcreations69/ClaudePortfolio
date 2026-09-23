/**
 * Employment history.
 *
 * Typed TypeScript rather than MDX because this is structured and repetitive:
 * the same shape repeated per role, rendered as a timeline. Adding a role is
 * one array entry.
 *
 * ⚠️ EMPTY BY DESIGN — this is content register CG-05, and it blocks CHUNK 10.
 *
 * Employers, exact titles and exact start/end dates must come from Raymund's
 * own records. **Dates will not be approximated and titles will not be
 * paraphrased.** A portfolio timeline that disagrees with a CV or a LinkedIn
 * profile is worse than no timeline: it is the first thing a recruiter can
 * check, and the first thing that costs trust when it does not match.
 *
 * `/about` is generated from this array, which is also what keeps the page and
 * the resume PDF from drifting apart — one source, two outputs.
 */

export interface Role {
  /** Employer name, exactly as it should appear publicly. */
  readonly org: string;
  /** Job title, exactly as held. Not a rewritten or upgraded version. */
  readonly title: string;
  /** ISO-ish, e.g. '2022-03'. Exact — never estimated. */
  readonly start: string;
  /** Omit while the role is current. */
  readonly end?: string;
  readonly location: string;
  /**
   * Three to five bullets. Each must map to something Raymund would defend in
   * an interview, and to the experience list in CLAUDE.md.
   */
  readonly responsibilities: readonly string[];
  /** Slugs from the work collection, linking a role to its evidence. */
  readonly relatedWork?: readonly string[];
}

export const experience: readonly Role[] = [
  // [CONTENT REQUIRED] CG-05 — blocks CHUNK 10.
  // Nothing is added here until Raymund supplies employers, exact titles and
  // exact dates. Do not populate from inference, from an email domain, or from
  // anything found online.
];
