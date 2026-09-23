/**
 * Confidentiality guards — BUILD TIME ONLY.
 *
 * ⚠️ NEVER import this module into a component, a page template or anything
 * that could reach the browser. It contains the restricted-name list, and
 * shipping that list to the client would publish exactly what it exists to
 * keep private. It is imported by the content schema and by scripts only.
 *
 * What this does and does not do
 * ------------------------------
 * This is a FORCING FUNCTION, not verification. It can catch a client name
 * that reaches a public string. It cannot tell whether a sentence is true,
 * whether an outcome is real, or whether a confidentiality review actually
 * happened. It raises the floor and makes one specific class of mistake loud.
 * Nothing here substitutes for the CHUNK 16 review.
 */

/**
 * Names that must not appear in any public string for a project published at
 * `sectoral` or `abstracted`.
 *
 * Add a name here the moment a new engagement is discussed, not the moment it
 * is written up — the cost of adding one is nothing, and the cost of omitting
 * one is a permanent disclosure.
 *
 * `CASECenter` is deliberately NOT listed. It is a build tool used across many
 * clients rather than a client itself, so naming it identifies nobody. Whether
 * it may be named at all is an open question about employer tooling, not about
 * client confidentiality — see HANDOFF.md §3.1.
 */
const RESTRICTED_NAMES: readonly string[] = ['ctbc', 'sbc'];

/**
 * Reduce a string to lowercase alphanumerics so that separators, casing and
 * punctuation cannot be used to slip a name past the check: `C-T-B-C`,
 * `C.T.B.C`, `ctbc` and `CTBC` all normalise to the same thing.
 */
function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Does `value` contain a restricted client name?
 *
 * DELIBERATELY OVER-STRICT: this is a substring test on the normalised string,
 * so an innocent word that happens to contain a restricted name as a substring
 * will also be flagged. That is the correct trade. A false positive costs one
 * rename and an irritated developer; a false negative costs a permanent,
 * irreversible client disclosure. When it fires on something innocuous, rename
 * the field — do not weaken this function.
 */
export function containsRestrictedName(value: string): boolean {
  const haystack = normalise(value);
  return RESTRICTED_NAMES.some((name) => haystack.includes(normalise(name)));
}

/** Which restricted names matched — used to write a useful error message. */
export function findRestrictedNames(value: string): string[] {
  const haystack = normalise(value);
  return RESTRICTED_NAMES.filter((name) => haystack.includes(normalise(name)));
}
