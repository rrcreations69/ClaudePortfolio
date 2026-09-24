import { DELIVERY_STAGES } from '../content/schema.ts';

/**
 * The Delivery Thread — the site's signature element and its navigation spine.
 *
 * Case study sections follow PRD Sheet 06 exactly, and each maps to a delivery
 * stage. That mapping is the whole argument the portfolio makes: that this is
 * someone who spans requirement to support, not someone who only writes code.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ✅ RESOLVED 2026-09-24 (D24) — the spine is SEVEN stages. Design is not one.
 *
 * Raymund confirmed he does not own design work. His CV describes
 * collaborating *with* UI/UX and resolving UI inconsistencies through
 * engineering review — working alongside designers, not owning the design.
 *
 * `design` was removed from DELIVERY_STAGES entirely rather than merely
 * filtered out of the home page strip. Leaving it in the enum would have left
 * a stage that no project could honestly claim but every project could still
 * select — a trap for a future edit. Removing it makes the false claim
 * unrepresentable: the type system now rejects `stages: ['design']`.
 *
 * "Technical Challenge" therefore maps to `analysis` — technical constraint
 * analysis, which is what that section actually documents.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type DeliveryStage = (typeof DELIVERY_STAGES)[number];

/** Human labels for the stages. Title case — these are shown to readers. */
export const STAGE_LABEL: Record<DeliveryStage, string> = {
  requirement: 'Requirement',
  analysis: 'Analysis',
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
  'technical challenge': 'analysis', // was 'design' until D24 — see the note above
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

/**
 * The stages shown on the home page strip.
 *
 * ⚠️ THIS IS A PUBLIC CLAIM, not a diagram. The strip says "these are the
 * stages I work across", so every stage listed here must be one Raymund
 * actually owns. It matters more on the home page than on a case study, where
 * stages are per project and an unclaimed one simply goes unlit.
 *
 * Confirmed at seven stages 2026-09-24 (D24). Derived from DELIVERY_STAGES so
 * there is one list, not two.
 */
export const HOME_THREAD_STAGES: readonly DeliveryStage[] = DELIVERY_STAGES;
