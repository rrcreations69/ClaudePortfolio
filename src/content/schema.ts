// Imported from `zod` directly rather than from `astro:content` so that this
// schema can be exercised outside an Astro build — see scripts/check-schema.ts.
// Astro's defineCollection accepts any zod schema, and `zod` is declared as a
// direct dependency pinned to the version Astro itself uses.
import { z } from 'zod';
import { containsRestrictedName, findRestrictedNames } from '../lib/confidentiality.ts';

/**
 * The work collection schema.
 *
 * Exported separately from the collection definition so that the forcing
 * functions below can be tested directly — see scripts/check-schema.ts. A
 * guard nobody has watched fail is a guard nobody knows works.
 *
 * WHAT THIS BUYS, AND WHAT IT DOES NOT
 * ------------------------------------
 * Three of the PRD's Critical requirements — personal contribution (REQ-002),
 * no confidential data (REQ-010), no fabrication (REQ-011) — otherwise depend
 * on remembering them at the moment of writing, months apart. This schema
 * moves what it can out of memory and into the build: an empty `myRole` fails
 * the build instead of shipping blank; a client name cannot reach a public
 * URL for a project whose tier forbids it; the confidentiality review is a
 * dated event with a named reviewer rather than a boolean.
 *
 * It is a forcing function, NOT verification. Nothing here can tell whether
 * `myRole` is truthful, whether `outcome` is accurate, or whether the review
 * genuinely happened — that last one is still self-attestation, just
 * self-attestation with a date on it. It raises the floor and makes omission
 * loud. It cannot make a false statement true.
 */

export const DISCLOSURE_TIERS = ['named', 'sectoral', 'abstracted'] as const;

export const DELIVERY_STAGES = [
  'requirement',
  'analysis',
  'design',
  'development',
  'testing',
  'uat',
  'release',
  'support',
] as const;

export const WORK_TYPES = [
  'requirements-analysis',
  'android-development',
  'maintenance',
  'integration',
  'troubleshooting',
  'security',
  'uat-support',
  'release',
  'reporting',
] as const;

/** Fields that become public strings and must respect the disclosure tier. */
const PUBLIC_TEXT_FIELDS = [
  'slug',
  'title',
  'description',
  'clientDescriptor',
  'problem',
  'myRole',
  'outcome',
] as const;

const workBase = z.object({
  // --- identity ---
  /** Names the problem or the solution, not just the application (Sheet 06). */
  title: z.string().min(1),
  slug: z.string().min(1),
  /** Manual curation beats reverse-chronological ordering. */
  order: z.number(),
  featured: z.boolean().default(false),

  // --- confidentiality: required, no default, cannot be forgotten ---
  disclosure: z.enum(DISCLOSURE_TIERS),
  /** Permitted ONLY when disclosure === 'named'. */
  client: z.string().min(1).optional(),
  /** The public wording, written at the cleared tier. */
  clientDescriptor: z.string().min(1),
  /** An event, not a checkbox. */
  confidentialityReview: z.object({
    reviewedBy: z.string().min(1),
    reviewedOn: z.date(),
    tierConfirmed: z.enum(DISCLOSURE_TIERS),
  }),

  // --- the evidence block on every card ---
  problem: z.string().min(1).max(200),
  /** REQ-002. Personal contribution. Empty fails the build. */
  myRole: z.string().min(1),
  /** Verified. Qualitative is allowed; invention is not. */
  outcome: z.string().min(1),

  // --- metadata ---
  stack: z.array(z.string()).default([]),
  domain: z.array(z.string()).default([]),
  workType: z.array(z.enum(WORK_TYPES)).default([]),
  period: z.object({ start: z.string(), end: z.string().optional() }),

  /**
   * Drives the Delivery Thread rail. Self-reported, and the schema cannot
   * verify it — but it is *specific* self-reporting, per project, shown side
   * by side, which is harder to inflate than a paragraph. A project where
   * only development was owned lights fewer stages than one taken end to end.
   */
  stages: z.array(z.enum(DELIVERY_STAGES)).default([]),

  // --- seo ---
  description: z.string().min(1).max(160),
  updated: z.date(),
});

export const workSchema = workBase
  .refine((d) => d.disclosure !== 'named' || !!d.client, {
    message: 'A "named" project must specify `client`.',
    path: ['client'],
  })
  .refine((d) => d.disclosure === 'named' || !d.client, {
    message:
      'Only a "named" project may specify `client`. Remove it, or raise the disclosure tier deliberately.',
    path: ['client'],
  })
  .refine((d) => d.confidentialityReview.tierConfirmed === d.disclosure, {
    message:
      'confidentialityReview.tierConfirmed does not match `disclosure`. The tier that was reviewed must be the tier that publishes.',
    path: ['confidentialityReview', 'tierConfirmed'],
  })
  .superRefine((d, ctx) => {
    // A `named` project is allowed to say the client's name — that is what the
    // tier means. Every other tier must not, in ANY public string.
    if (d.disclosure === 'named') return;

    for (const field of PUBLIC_TEXT_FIELDS) {
      const value = d[field];
      if (typeof value !== 'string' || !containsRestrictedName(value)) continue;

      ctx.addIssue({
        code: 'custom',
        path: [field],
        message:
          `\`${field}\` contains a restricted client name (${findRestrictedNames(value).join(', ')}) ` +
          `but this project publishes at "${d.disclosure}", which forbids naming the client. ` +
          `Rewrite the field at the cleared tier. Do not weaken the guard.`,
      });
    }
  });

export type WorkEntry = z.infer<typeof workBase>;
