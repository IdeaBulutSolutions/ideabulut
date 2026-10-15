// Runs after `next build` (npm "postbuild"). Next.js exports Open Graph images as extensionless
// `opengraph-image` files, which GitHub Pages would serve as application/octet-stream and social
// networks may then reject. Rename them to `.png` and update every reference in the export.
import fs from 'node:fs';
import path from 'node:path';

const out = path.join(process.cwd(), 'out');
if (!fs.existsSync(out)) throw new Error('No out/ folder. Run `npm run build` first.');

const files = (fs.readdirSync(out, { recursive: true }) as string[]).map(file => path.join(out, file));
let images = 0;
for (const file of files) {
  if (path.basename(file) === 'opengraph-image' && fs.statSync(file).isFile()) {
    fs.renameSync(file, `${file}.png`);
    images++;
  }
}
const reference = /\/opengraph-image(?![.\w-])/g;
for (const file of files.filter(file => /\.(html|txt)$/.test(file))) {
  const text = fs.readFileSync(file, 'utf8');
  if (reference.test(text)) fs.writeFileSync(file, text.replace(reference, '/opengraph-image.png'));
  reference.lastIndex = 0;
}
process.stdout.write(`Static export ready in out/ (${images} Open Graph images renamed to .png).\n`);
