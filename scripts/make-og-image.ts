/**
 * Generate public/og-default.png — the social sharing card.
 *
 *   npm run build            (first, so the fonts exist in dist/)
 *   npm run make:og
 *
 * WHY HEADLESS CHROME AND NOT A LIBRARY
 * -------------------------------------
 * The usual choices are satori + resvg, or sharp. All are native binaries and
 * all would become permanent build dependencies for one 40 KB image that
 * changes perhaps twice a year. Chrome is already installed on this machine
 * and already used for Lighthouse, so it costs nothing and adds no dependency
 * to the project at all.
 *
 * The PNG is COMMITTED. Nothing at build or request time depends on this
 * script — it is a design tool, run by hand when the card needs to change.
 *
 * ⚠️ REGENERATE THIS IMAGE IF:
 *   - the positioning or role changes (D15 changed it once already), or
 *   - the delivery stage list changes — the card lists all eight stages, and
 *     question B1 may drop "Design" to seven. The card would then be a public
 *     claim that disagrees with the site.
 *
 * ⚠️ CONFIDENTIALITY: this card is public. It carries Raymund's name, role and
 * the stage list only. No client name, no case study title, nothing tiered.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import {
  readdir,
  writeFile,
  copyFile,
  mkdtemp,
  readFile,
} from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const run = promisify(execFile);

const OUT = 'public/og-default.png';
const FONT_DIR = 'dist/_astro/fonts';

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean) as string[];

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error('Chrome not found. Set CHROME_PATH and retry.');
  process.exit(1);
}

if (!existsSync(FONT_DIR)) {
  console.error(
    `${FONT_DIR} not found. Run \`npm run build\` first — the card`,
  );
  console.error('uses the same self-hosted Geist files the site ships.');
  process.exit(1);
}

// Largest woff2 is Geist Sans, smallest is Geist Mono.
const fontFiles = await readdir(FONT_DIR);
const withSizes = await Promise.all(
  fontFiles
    .filter((f) => f.endsWith('.woff2'))
    .map(async (f) => {
      const buf = await readFile(join(FONT_DIR, f));
      return { f, size: buf.byteLength };
    }),
);
withSizes.sort((a, b) => b.size - a.size);
if (withSizes.length < 2) {
  console.error('Expected two woff2 files in dist. Found', withSizes.length);
  process.exit(1);
}

const fileUrl = (p: string) =>
  'file:///' + join(process.cwd(), p).replace(/\\/g, '/');

const STAGES = [
  'Requirement',
  'Analysis',
  'Design',
  'Development',
  'Testing',
  'UAT',
  'Release',
  'Support',
];

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
@font-face{font-family:GS;src:url('${fileUrl(join(FONT_DIR, withSizes[0].f))}') format('woff2');font-weight:100 900}
@font-face{font-family:GM;src:url('${fileUrl(join(FONT_DIR, withSizes[1].f))}') format('woff2');font-weight:400}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
body{background:#ffffff;color:#14140f;font-family:GS,system-ui,sans-serif;display:flex;flex-direction:column;justify-content:space-between;padding:80px;border-bottom:10px solid #1a43bd}
.name{font-size:76px;font-weight:700;letter-spacing:-.02em;line-height:1.1}
.role{margin-top:24px;font-size:36px;color:#535349;line-height:1.3}
.stages{display:flex;flex-wrap:wrap;gap:12px}
.stage{font-family:GM,ui-monospace,monospace;font-size:19px;color:#535349;border:1px solid #e4e4de;background:#f6f6f3;border-radius:4px;padding:8px 14px}
</style></head><body>
<div><p class="name">Raymund Ryan Bermudes</p><p class="role">Solutions Analyst &amp; Enterprise Systems Developer</p></div>
<div class="stages">${STAGES.map((s) => `<span class="stage">${s}</span>`).join('')}</div>
</body></html>`;

const dir = await mkdtemp(join(tmpdir(), 'og-'));
const page = join(dir, 'og.html');
const shot = join(dir, 'og.png');
await writeFile(page, html, 'utf8');

await run(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1200,630',
  '--allow-file-access-from-files',
  `--screenshot=${shot}`,
  'file:///' + page.replace(/\\/g, '/'),
]);

await copyFile(shot, OUT);
console.log(`Wrote ${OUT} (1200x630) using ${chrome}`);
