/**
 * Skills, grouped by category.
 *
 * ⚠️ EMPTY BY DESIGN — content register CG-06, blocks CHUNK 10.
 *
 * THE RULE THAT MATTERS: only technologies Raymund would defend in an
 * interview. Not things used once, not things currently being learned, not
 * things that look good in a keyword scan. A skills list is a list of
 * questions a recruiter is entitled to ask.
 *
 * NO PROFICIENCY LEVELS. No percentages, no star ratings, no "advanced /
 * intermediate" labels, no bars. Sheet 05 C09 bans them and they are
 * unverifiable by definition — nobody can check that a bar at 80% means
 * anything. **Evidence links replace them**: each skill points at the case
 * studies where it was actually used, so the claim is checkable by clicking.
 *
 * A skill with no evidence is a claim with no support. That is allowed — some
 * genuine skills have no publishable case study — but it should be a
 * deliberate choice, not an oversight.
 */

export interface Skill {
  readonly name: string;
  /**
   * Slugs from the work collection where this skill is demonstrated.
   * Empty means "no published evidence", which is honest, not a bug.
   */
  readonly evidence: readonly string[];
}

export interface SkillCategory {
  readonly category: string;
  readonly skills: readonly Skill[];
}

/**
 * Category names proposed in PHASE-1-DISCOVERY.md §8.4. Kept here as a comment
 * rather than as empty objects so that nothing renders as an empty heading:
 *
 *   Languages · Android · Integration · Data · Enterprise Systems · Practices
 *
 * Whether all six survive depends on what Raymund actually lists. Categories
 * are not padded to fill a grid.
 */
export const skills: readonly SkillCategory[] = [
  // [CONTENT REQUIRED] CG-06 — blocks CHUNK 10.
  // Do not seed this from CLAUDE.md's experience list. That list describes the
  // kinds of work Raymund has done and bounds what may be attributed to him;
  // it is not the same as a list of technologies he would choose to be
  // questioned on. He picks these himself.
];
