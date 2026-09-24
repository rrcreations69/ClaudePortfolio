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
   * Published address. Nullable because publishing one is irreversible — it
   * will be harvested — so the type forces the decision to be explicit rather
   * than letting an empty string ship by accident.
   */
  readonly email: string | null;
  /** Public on his CV already. */
  readonly linkedin: string | null;
  /** Null by decision (D27), not by omission. See the value below. */
  readonly github: string | null;
}

export const site: SiteConfig = {
  name: 'Raymund Ryan Bermudes',
  shortName: 'Raymund Bermudes',
  role: 'Solutions Analyst & Enterprise Systems Developer',

  // CHOSEN by Raymund 2026-09-24 (D25), closing CG-09. Drafted from D15's
  // positioning and his own CV — it claims the span, which is the one thing
  // that distinguishes him from a developer who only writes code, and it
  // claims nothing his experience list does not already support.
  //
  // Note what it does NOT say: no seniority label, no years, no metric, no
  // technology. Those all date, and every one of them would need sourcing.
  positioning:
    'I turn business requirements into enterprise systems — and stay with them through testing, UAT, release and production support.',

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
    // CONFIRMED 2026-09-24 (D26). D7 had chosen "a new dedicated address", but
    // this one is already on the CV he circulates, so it is already public and
    // already the address recruiters will use. Setting one up purely to avoid
    // reusing a public address would have protected nothing.
    email: 'raymund.bermudes21@gmail.com',
    // Sourced from his CV, where it is already public.
    linkedin: 'https://www.linkedin.com/in/raymundbermudes',
    // DELIBERATELY NULL 2026-09-24 (D27), closing B6 — not pending.
    // His CV lists no GitHub and this portfolio's repo is private (D14), so a
    // profile link would send a recruiter somewhere that shows less than the
    // page they are already on. Set this only if there is public work worth
    // arriving at.
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
