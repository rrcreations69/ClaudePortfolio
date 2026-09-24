/**
 * Theme initialisation — runs BEFORE first paint.
 *
 * WHY THIS IS A FILE AND NOT AN INLINE SCRIPT
 * -------------------------------------------
 * The usual way to stop a theme flash is a small inline <script> in <head>.
 * That is not available here: vercel.json sets `script-src 'self'` with no
 * 'unsafe-inline', so the browser would refuse to run it — silently, and only
 * in production, because vercel.json headers never apply to the dev server.
 * That is the same trap that nearly killed the Delivery Thread island.
 *
 * Served from our own origin, this satisfies 'self' and still runs before
 * paint because it is loaded without defer or async. It costs one tiny
 * request, which is the correct price for a strict CSP.
 *
 * WHY IT MUST RUN BEFORE PAINT
 * ----------------------------
 * tokens.css already resolves the right theme from prefers-color-scheme. This
 * file only matters when the visitor has OVERRIDDEN that. Without it, someone
 * who chose light on a dark-mode machine sees a dark flash on every single
 * navigation — worse than having no toggle at all.
 *
 * Deliberately tiny, dependency-free, and wrapped in try/catch: localStorage
 * throws in some privacy modes, and a theme preference is never worth breaking
 * a page over.
 */
(function () {
  try {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch {
    // No storage available. The OS preference still applies via CSS, so the
    // page is correct — just not overridable. Failing silently is right here.
  }
})();
