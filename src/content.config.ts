import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { workSchema } from './content/schema.ts';

/**
 * One collection. A project IS its case study (D11) — the card is the summary
 * and the page is the depth, both read from the same file.
 *
 * Adding a project is one new `.mdx` file and nothing else: no component edit,
 * no index to update, no list to keep in sync. That was the explicit
 * requirement, and it is what stops the card and the page ever disagreeing.
 *
 * The collection is empty right now, and deliberately so. Real case study
 * content is CHUNK 07, blocked on CHUNK 00 (content and confidentiality
 * clearance). No placeholder or example project is committed here: a fabricated
 * project would violate the first rule in CLAUDE.md, and a half-real one is
 * worse because it looks trustworthy.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: workSchema,
});

export const collections = { work };
