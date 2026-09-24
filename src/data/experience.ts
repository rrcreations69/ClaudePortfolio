/**
 * Employment history.
 *
 * Typed TypeScript rather than MDX because this is structured and repetitive:
 * the same shape repeated per role, rendered as a timeline. Adding a role is
 * one array entry.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * SOURCE: transcribed 2026-09-24 from Raymund's own CV
 * (`Raymund_Ryan_Bermudes_CV Latest.pdf`; extract in `notes/cv-extract.txt`).
 *
 * **Nothing here is inferred, rephrased upward, or estimated.** Employers,
 * titles and dates are exactly as the CV states them. Where the CV gives a
 * year but not a month, the year is published as a year — it is NOT guessed
 * into a month.
 *
 * `/about` is generated from this array, which is also what keeps the page and
 * the resume PDF from drifting apart: one source, two outputs. If the CV is
 * updated, update this file in the same sitting.
 *
 * The responsibility bullets are condensed from the CV's own wording, with the
 * CV register deliberately flattened — "Results-driven", "Adept at", "driving
 * full lifecycle delivery" are CV language and do not belong on a plain,
 * evidence-led site. The claims are unchanged; only the salesmanship is gone.
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface Role {
  /** Employer name, exactly as it should appear publicly. */
  readonly org: string;
  /** Job title, exactly as held. Not a rewritten or upgraded version. */
  readonly title: string;
  /** As precise as the CV states. Exact — never estimated. */
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
  {
    org: 'GDS Link Asia',
    title: 'Solutions Analyst',
    start: 'Jan 2024',
    location: 'Makati, Philippines',
    responsibilities: [
      'Implement enterprise decisioning systems end to end, aligning technical architecture with business requirements.',
      'Deliver CASECenter policy systems for credit risk and decision automation.',
      'Build and maintain internal operational tools in Retool.',
      'Manage REST API integrations and coordinate delivery across Product, QA and Backend Engineering.',
      'Identify and resolve UI inconsistencies through structured engineering review.',
    ],
    // [CONTENT REQUIRED] CG-02 — links here once the CASECenter case study exists.
    relatedWork: [],
  },
  {
    org: 'GDS Link Asia',
    title: 'Junior Android Developer',
    start: 'Jul 2022',
    end: 'Dec 2023',
    location: 'Makati, Philippines',
    responsibilities: [
      'Developed and maintained production Android applications in Java and Kotlin.',
      'Implemented features in complex legacy systems while preserving stability and backward compatibility.',
      'Worked with UI/UX, QA and Backend teams in Agile sprints.',
      'Improved application stability through systematic debugging and edge-case handling.',
      'Supported regular release cycles and hotfix deployments.',
    ],
    // [CONTENT REQUIRED] CG-01 — links here once the VAPT case study exists.
    relatedWork: [],
  },
  {
    org: 'MCS Ventures',
    title: 'System Specialist',
    // CV gives years only for this role. Published as years, not guessed
    // into months.
    start: '2019',
    end: '2021',
    location: 'Bacoor, Cavite, Philippines',
    responsibilities: [
      'Enterprise systems development across the full SDLC using C#, Java and Oracle PL/SQL.',
      'On-site client technical support: installation, troubleshooting and live issue resolution.',
      'Led production deployments and system updates, focused on zero-downtime releases.',
      'Ran system demonstrations and training sessions for clients and end users.',
      'Acted as escalation point for critical incidents, and mentored junior staff.',
    ],
  },
  {
    org: 'Pipol Broadband & Telecommunication Corp.',
    title: 'IT Field Technician (Internship)',
    start: '2018',
    end: '2019',
    location: 'Bacoor, Cavite, Philippines',
    responsibilities: [
      'Technical support across multiple sites: installation, troubleshooting and preventive maintenance of IT infrastructure.',
    ],
  },
];

export interface Education {
  readonly institution: string;
  readonly qualification: string;
  readonly start: string;
  readonly end: string;
}

/** Also from the CV, and equally unembellished. */
export const education: readonly Education[] = [
  {
    institution: 'Cavite State University',
    qualification: 'BSc Information Technology',
    start: '2015',
    end: '2019',
  },
];
