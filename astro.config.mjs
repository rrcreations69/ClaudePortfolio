// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Production origin. Per D9 the site stays on *.vercel.app permanently, so
  // this is the final canonical host — not a placeholder. Canonical URLs, OG
  // tags and the sitemap all derive from it.
  site: 'https://raymundbermudes.vercel.app',

  // Static output. No adapter: this is a content site with no server surface,
  // and Vercel detects Astro's static build automatically.
  output: 'static',

  build: {
    // Keep styles inlined for LCP. Note the trade-off: inlined <style> blocks
    // require `style-src 'unsafe-inline'` in the CSP (see vercel.json).
    // Revisit in CHUNK 16 — setting this to 'never' would allow a strict
    // `style-src 'self'` at the cost of an extra render-blocking request.
    inlineStylesheets: 'auto',
  },
});
