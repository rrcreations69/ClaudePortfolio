/**
 * Site configuration — typed, not YAML, not a CMS.
 *
 * Per CLAUDE.md, site config lives as typed TypeScript in src/data/ so that a
 * typo is a build error rather than a silently missing string.
 */

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly shortName: string;
  readonly role: string;
  /**
   * The positioning line (CG-09). NULL until Raymund picks one — the hero
   * renders a visible [CONTENT REQUIRED] marker rather than inventing copy or
   * quietly omitting the one sentence it exists to deliver.
   */
  readonly positioning: string | null;
  /** Location and availability (CG-08). Sourced from his CV. */
  readonly availability: string | null;
  readonly url: string;
  readonly nav: readonly NavItem[];
  readonly resumeHref: string;
  readonly resumeFile: string;
  readonly contact: ContactDetails;
}

export interface ContactDetails {
  /**
   * NULL until question B5 is answered. D7 chose "a new dedicated address",
   * but his CV already circulates raymund.bermudes21@gmail.com, which weakens
   * that argument. Publishing an address is irreversible — it will be
   * harvested — so nothing is published until he says which.
   */
  readonly email: string | null;
  /** Public on his CV already. */
  readonly linkedin: string | null;
  /**
   * NULL. His CV lists no GitHub, and this portfolio's repo is private (D14),
   * so a profile link may show very little. An empty profile is worse than no
   * link — see question B6.
   */
  readonly github: string | null;
}

export const site: SiteConfig = {
  name: 'Raymund Ryan Bermudes',
  shortName: 'Raymund Bermudes',
  role: 'Solutions Analyst & Enterprise Systems Developer',

  // [CONTENT REQUIRED] CG-09. Three drafts in notes/ANSWERS-NEEDED.md §B2.
  // The originals in PHASE-1-DISCOVERY.md all led with Android and are stale
  // after D15. Stays null until Raymund chooses; nothing is invented here.
  positioning: null,

  // Sourced verbatim in substance from his CV: "Cavite, Philippines" and
  // "Open to full relocation to Europe, UK, or the US." Not paraphrased into
  // anything stronger than he wrote, and no visa claim is made beyond his own
  // wording — the CV says he is available for sponsorship DISCUSSIONS.
  availability:
    'Cavite, Philippines — open to relocation to Europe, the UK or the US.',

  // Per D9 the site stays on *.vercel.app permanently. Must match
  // `site` in astro.config.mjs.
  url: 'https://raymundbermudes.vercel.app',

  // Three items and one action. No dropdowns, no "Home" link — the site
  // name is the home link, which is the convention every visitor already
  // knows.
  nav: [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  // The action. The file does not exist yet (content register CG-04), so the
  // header renders the button only when the PDF is actually present — see
  // BaseLayout. That prevents shipping a Resume button that 404s, which would
  // fail the recruiter test at the last step.
  resumeHref: '/raymund-bermudes-cv.pdf',
  resumeFile: 'public/raymund-bermudes-cv.pdf',

  contact: {
    // [CONTENT REQUIRED] B5. Deliberately null — see the type above.
    email: null,
    // Sourced from his CV, where it is already public.
    linkedin: 'https://www.linkedin.com/in/raymundbermudes',
    // [CONTENT REQUIRED] B6.
    github: null,
  },
} as const;

/**
 * Is `href` the current page? Used for aria-current in the nav.
 *
 * `/work` must also match `/work/some-project`, so sections match on prefix.
 * The root path is special-cased — otherwise it would match everything.
 */
export function isCurrentPath(href: string, pathname: string): boolean {
  const normalise = (p: string) => (p.length > 1 ? p.replace(/\/$/, '') : p);
  const target = normalise(href);
  const current = normalise(pathname);

  if (target === '/') return current === '/';
  return current === target || current.startsWith(`${target}/`);
}
