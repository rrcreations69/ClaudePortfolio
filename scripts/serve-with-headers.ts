/**
 * Serve dist/ with the REAL production headers from vercel.json.
 *
 *   npm run serve:headers      → http://localhost:4323
 *
 * WHY THIS EXISTS
 * ---------------
 * `astro preview` serves the production build but NOT vercel.json's headers,
 * so the CSP is absent locally. That gap has already produced two
 * would-be-production-only bugs in this project: Astro inlining the Delivery
 * Thread island (CHUNK 06) and the theme-init script (CHUNK 12), both of which
 * `script-src 'self'` would have silently refused while localhost looked fine.
 *
 * Testing against the deployed site is the other option, but that only works
 * when the deployment is current — and it has repeatedly not been.
 *
 * This closes the gap: the real build, served with the real headers, before
 * anything is pushed.
 *
 * Deliberately minimal — no dependencies, no framework. It is a test harness,
 * not infrastructure, and it never serves anything outside dist/.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';

const PORT = 4323;
const ROOT = 'dist';

interface VercelHeaderRule {
  source: string;
  headers: { key: string; value: string }[];
}

const config = JSON.parse(await readFile('vercel.json', 'utf8')) as {
  headers: VercelHeaderRule[];
};

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

/** Apply every vercel.json rule whose source pattern matches. */
function headersFor(pathname: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const rule of config.headers) {
    // vercel.json sources are path patterns; "/(.*)" means everything.
    const pattern = '^' + rule.source.replace(/\/\(\.\*\)$/, '/.*') + '$';
    if (new RegExp(pattern).test(pathname)) {
      for (const h of rule.headers) out[h.key] = h.value;
    }
  }
  return out;
}

/** Resolve a URL path to a file inside dist/, or null. Never escapes ROOT. */
function resolveFile(pathname: string): string | null {
  const safe = normalize(decodeURIComponent(pathname)).replace(
    /^(\.\.[/\\])+/,
    '',
  );
  const base = join(ROOT, safe);
  if (!base.startsWith(ROOT)) return null;

  if (existsSync(base) && statSync(base).isFile()) return base;
  const asIndex = join(base, 'index.html');
  if (existsSync(asIndex)) return asIndex;
  const asHtml = base + '.html';
  if (existsSync(asHtml)) return asHtml;
  return null;
}

const server = createServer(async (req, res) => {
  const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
  const file = resolveFile(pathname);

  const applied = headersFor(pathname);
  for (const [k, v] of Object.entries(applied)) res.setHeader(k, v);

  if (!file) {
    const notFound = join(ROOT, '404.html');
    res.writeHead(404, { 'Content-Type': MIME['.html'] });
    res.end(existsSync(notFound) ? await readFile(notFound) : 'Not found');
    return;
  }

  res.writeHead(200, {
    'Content-Type': MIME[extname(file)] ?? 'application/octet-stream',
  });
  res.end(await readFile(file));
});

server.listen(PORT, () => {
  console.log(
    `dist/ served WITH vercel.json headers on http://localhost:${PORT}`,
  );
  console.log(`Applying ${config.headers.length} header rule(s).`);
});
