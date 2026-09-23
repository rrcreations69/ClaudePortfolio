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
  readonly url: string;
  readonly nav: readonly NavItem[];
  readonly resumeHref: string;
  readonly resumeFile: string;
}

export const site: SiteConfig = {
  name: 'Raymund Ryan Bermudes',
  shortName: 'Raymund Bermudes',
  role: 'Solutions Analyst & Enterprise Systems Developer',

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
