/**
 * Skills, grouped by category.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * SOURCE: transcribed 2026-09-24 from Raymund's CV. Publishing what his own CV
 * already claims is not fabrication — it is his attestation, and the same
 * reasoning that widened the CLAUDE.md experience list (D16) applies here.
 *
 * ✅ FILTERED AND CONFIRMED 2026-09-24 (D28, closing CG-06). He reviewed the
 * list against the standard "only what you would defend in an interview" and
 * struck nothing. A CV keyword list and a defensible skills list are not the
 * same thing — this one has now been checked as both. Remove, do not add.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * NO PROFICIENCY LEVELS. No percentages, no star ratings, no "advanced /
 * intermediate" labels, no bars. Sheet 05 C09 bans them and they are
 * unverifiable by definition — nobody can check what a bar at 80% means.
 * **Evidence links replace them**: each skill points at the case studies where
 * it was actually used, so the claim is checkable by clicking.
 *
 * ✅ WIRED UP 2026-09-24. Until then every `evidence` array was empty, because
 * no case study existed — which meant the page promised checkable claims and
 * delivered none. The Sheet 13 recruiter re-run caught it.
 *
 * 11 of 24 skills now link to a case study. The other 13 stay plain text, and
 * that is honest rather than a bug: a skill with no published evidence is a
 * claim with no support, and the page says so rather than dressing it up.
 *
 * DELIBERATELY ABSENT: n8n, Claude Code, Codex. Raymund described these as
 * things he is learning, not delivering with. They must not appear here, and
 * nothing may imply he has shipped with them.
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

const noEvidenceYet: readonly string[] = [];

/**
 * Published case study slugs, so an evidence link is a constant rather than a
 * string typed by hand in twenty places. A typo here is a 404 on /about.
 *
 * ⚠️ AN EVIDENCE LINK IS A CLAIM: it says this skill was demonstrably used on
 * that project. Each one below was checked against what the case study
 * actually says, not against what the CV claims. Where a case study does not
 * evidence a skill, the skill stays plain text — 13 of the 24 do, and that
 * absence is the honest part.
 *
 * Deliberately NOT linked, though it would have been easy:
 *   'REST API design and integration' → CS1 lists REST in its stack and its
 *     Context mentions syncing through an API, but the case study never
 *     discusses API *design*. Linking it would overclaim on the strength of a
 *     tag.
 *   'Java' → CS1 is Kotlin. The Java work is a different application that has
 *     no case study.
 *   'Production issue investigation' → neither case study is an incident.
 *   'Cross-team coordination' / 'Agile / Scrum' → CS2 was written at short
 *     scope and the question about other people's work was never asked, so
 *     there is nothing to point at.
 */
const CS1 = 'remediating-security-findings-without-breaking-the-build';
const CS2 = 'delivering-from-an-unfinished-requirements-document';

export const skills: readonly SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java', evidence: noEvidenceYet },
      { name: 'Kotlin', evidence: [CS1] },
      { name: 'C#', evidence: noEvidenceYet },
      { name: 'JavaScript', evidence: noEvidenceYet },
      { name: 'PHP', evidence: noEvidenceYet },
      { name: 'Oracle PL/SQL', evidence: noEvidenceYet },
    ],
  },
  {
    category: 'Mobile',
    skills: [
      { name: 'Android (Java / Kotlin)', evidence: [CS1] },
      { name: 'Legacy application maintenance', evidence: [CS1] },
      { name: 'SQLite via Room', evidence: [CS1] },
      { name: 'Offline-capable data capture', evidence: [CS1] },
    ],
  },
  {
    category: 'Enterprise systems',
    skills: [
      { name: 'CASECenter', evidence: [CS2] },
      { name: 'Credit decisioning platforms', evidence: [CS2] },
      { name: 'XSLT / report development', evidence: noEvidenceYet },
      { name: 'Retool', evidence: noEvidenceYet },
    ],
  },
  {
    category: 'Integration & data',
    skills: [
      { name: 'REST API design and integration', evidence: noEvidenceYet },
      { name: 'Postman', evidence: noEvidenceYet },
      { name: 'Database integration', evidence: noEvidenceYet },
    ],
  },
  {
    category: 'Delivery',
    skills: [
      { name: 'UAT support', evidence: [CS2] },
      { name: 'Releases and hotfixes', evidence: [CS1, CS2] },
      { name: 'Production issue investigation', evidence: noEvidenceYet },
      { name: 'Security remediation', evidence: [CS1] },
    ],
  },
  {
    category: 'Practices',
    skills: [
      { name: 'Requirements analysis', evidence: [CS2] },
      { name: 'Agile / Scrum', evidence: noEvidenceYet },
      { name: 'Cross-team coordination', evidence: noEvidenceYet },
    ],
  },
];

/**
 * Has Raymund confirmed this list?
 *
 * TRUE as of 2026-09-24 (D28, closing CG-06). He reviewed the list and struck
 * nothing — every entry is one he is willing to be questioned on.
 *
 * That confirmation covers exactly the entries present at that date. **Adding
 * a skill here later is a new claim and needs his word again** — this flag is
 * not a standing licence to extend the list.
 */
export const SKILLS_CONFIRMED = true;
