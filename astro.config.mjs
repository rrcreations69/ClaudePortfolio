// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

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

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Force every script to be emitted as an external file.
      //
      // By default Astro inlines small island scripts straight into the HTML
      // as <script type="module">…</script>. That is faster, but our CSP sets
      // `script-src 'self'` with no 'unsafe-inline', so the browser refuses to
      // run them — the island dies silently in production while working
      // perfectly on localhost, where vercel.json's headers never apply.
      //
      // Emitting real files keeps the strict CSP honest. The alternative was
      // adding per-script hashes to the policy, which would need updating on
      // every build and would rot the first time someone forgot.
      assetsInlineLimit: 0,
    },
  },

  // Fonts are downloaded at build time and served from our own origin, so the
  // browser never contacts a third party. That keeps `font-src 'self'` honest
  // and preserves the zero-third-party-origin rule.
  //
  // Two variable font files total, well inside the 3-file cap. Weights are
  // restricted to 400/500/700 — no other weight is permitted to appear.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-geist-sans',
      weights: [400, 500, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  markdown: {
    // Dual-theme syntax highlighting. `defaultColor: false` makes Shiki emit
    // BOTH themes as CSS custom properties rather than baking one in, so code
    // follows the site's light/dark switch instead of being stuck in whichever
    // theme was chosen at build time. The switching rule lives in global.css.
    shikiConfig: {
      themes: {
        light: 'github-light-high-contrast',
        dark: 'github-dark-high-contrast',
      },
      defaultColor: false,
      wrap: false,
    },
  },

  integrations: [mdx()],
});
