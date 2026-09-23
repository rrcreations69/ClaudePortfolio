import { DELIVERY_STAGES } from '../content/schema.ts';

/**
 * The Delivery Thread — the site's signature element and its navigation spine.
 *
 * Case study sections follow PRD Sheet 06 exactly, and each maps to a delivery
 * stage. That mapping is the whole argument the portfolio makes: that this is
 * someone who spans requirement to support, not someone who only writes code.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠️ OPEN QUESTION — "Design" (CLAUDE.md, unresolved)
 *
 * "Technical Challenge" is the ONLY section mapped to the Design stage, and
 * "Design" is not in Raymund's stated experience. His CV says he collaborated
 * *with* UI/UX teams and resolved UI inconsistencies through engineering
 * review, which reads as working alongside designers rather than owning
 * design.
 *
 * If he confirms he does not own design work, change that one entry below to
 * `'analysis'` (technical constraint analysis) and the spine becomes seven
 * stages. **Do not make that change on inference — it needs his answer.**
 *
 * Nothing else in the codebase hard-codes this. It is deliberately one line.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type DeliveryStage = (typeof DELIVERY_STAGES)[number];

/** Human labels for the stages. Title case — these are shown to readers. */
export const STAGE_LABEL: Record<DeliveryStage, string> = {
  requirement: 'Requirement',
  analysis: 'Analysis',
  design: 'Design',
  development: 'Development',
  testing: 'Testing',
  uat: 'UAT',
  release: 'Release',
  support: 'Support',
};

/**
 * Sheet 06 section → delivery stage.
 *
 * Keyed by the normalised heading text, so a case study author writes ordinary
 * markdown headings (`## Investigation`) and the rail labels them correctly.
 * A heading not listed here still appears in the rail — it simply carries no
 * stage label, which is better than guessing at one.
 *
 * "My Role" is absent on purpose: it is elevated into the page header rather
 * than buried mid-page, so it is never a rail destination.
 */
export const SECTION_STAGE: Record<string, DeliveryStage> = {
  context: 'requirement',
  problem: 'requirement',
  investigation: 'analysis',
  'technical challenge': 'design', // ← the single line the open question turns on
  solution: 'development',
  validation: 'testing',
  'validation and uat': 'uat',
  result: 'release',
  lessons: 'support',
};

/** Lowercase and collapse whitespace so heading text matches the map. */
export function normaliseHeading(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

export interface ThreadItem {
  /** The anchor id Astro generated for the heading. */
  readonly slug: string;
  readonly text: string;
  readonly stage: DeliveryStage | null;
  readonly stageLabel: string | null;
}

export interface MarkdownHeading {
  depth: number;
  slug: string;
  text: string;
}

/**
 * Build the thread from the headings Astro actually rendered.
 *
 * Deriving it from real headings rather than from frontmatter means the rail
 * can never link to a section that does not exist, and can never omit one that
 * does. Only `##` headings become rail entries; deeper ones are detail within
 * a section, and listing them would turn a spine into an outline.
 */
export function buildThread(
  headings: readonly MarkdownHeading[],
): ThreadItem[] {
  return headings
    .filter((h) => h.depth === 2)
    .map((h) => {
      const stage = SECTION_STAGE[normaliseHeading(h.text)] ?? null;
      return {
        slug: h.slug,
        text: h.text,
        stage,
        stageLabel: stage ? STAGE_LABEL[stage] : null,
      };
    });
}
