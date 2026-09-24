/**
 * Skills, grouped by category.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * SOURCE: transcribed 2026-09-24 from Raymund's CV. Publishing what his own CV
 * already claims is not fabrication — it is his attestation, and the same
 * reasoning that widened the CLAUDE.md experience list (D16) applies here.
 *
 * ⚠️ STILL PENDING HIS FILTER — content register CG-06, question B3.
 * A CV keyword list and a defensible skills list are NOT the same thing.
 * **Only technologies he would defend in an interview belong here**, and he
 * has not yet struck anything. Until he does, this is CV-accurate but
 * unfiltered. Remove, do not add.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * NO PROFICIENCY LEVELS. No percentages, no star ratings, no "advanced /
 * intermediate" labels, no bars. Sheet 05 C09 bans them and they are
 * unverifiable by definition — nobody can check what a bar at 80% means.
 * **Evidence links replace them**: each skill points at the case studies where
 * it was actually used, so the claim is checkable by clicking.
 *
 * Every `evidence` array is empty right now because no case study exists
 * (CHUNK 07). That is honest, not a bug: a skill with no published evidence is
 * a claim with no support, and the page says so rather than implying otherwise.
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

export const skills: readonly SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java', evidence: noEvidenceYet },
      { name: 'Kotlin', evidence: noEvidenceYet },
      { name: 'C#', evidence: noEvidenceYet },
      { name: 'JavaScript', evidence: noEvidenceYet },
      { name: 'PHP', evidence: noEvidenceYet },
      { name: 'Oracle PL/SQL', evidence: noEvidenceYet },
    ],
  },
  {
    category: 'Mobile',
    skills: [
      { name: 'Android (Java / Kotlin)', evidence: noEvidenceYet },
      { name: 'Legacy application maintenance', evidence: noEvidenceYet },
      { name: 'SQLite via Room', evidence: noEvidenceYet },
      { name: 'Offline-capable data capture', evidence: noEvidenceYet },
    ],
  },
  {
    category: 'Enterprise systems',
    skills: [
      { name: 'CASECenter', evidence: noEvidenceYet },
      { name: 'Credit decisioning platforms', evidence: noEvidenceYet },
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
      { name: 'UAT support', evidence: noEvidenceYet },
      { name: 'Releases and hotfixes', evidence: noEvidenceYet },
      { name: 'Production issue investigation', evidence: noEvidenceYet },
      { name: 'Security remediation', evidence: noEvidenceYet },
    ],
  },
  {
    category: 'Practices',
    skills: [
      { name: 'Requirements analysis', evidence: noEvidenceYet },
      { name: 'Agile / Scrum', evidence: noEvidenceYet },
      { name: 'Cross-team coordination', evidence: noEvidenceYet },
    ],
  },
];

/**
 * Has Raymund confirmed this list? While false, `/about` renders a visible
 * note saying the list is CV-accurate but not yet filtered. Set to true once
 * he has struck anything he would not want to be questioned on (CG-06).
 */
export const SKILLS_CONFIRMED = false;
