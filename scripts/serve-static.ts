// Local preview of the static export in out/, mimicking GitHub Pages:
// `/about` redirects to `/about/`, directories serve index.html, and unknown paths get 404.html
// with a real 404 status. Usage: `npm run build && npm start` (PORT overrides 3000).
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const root = path.join(process.cwd(), 'out');
const port = Number(process.env.PORT) || 3000;
const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
};

if (!fs.existsSync(root)) throw new Error('No out/ folder. Run `npm run build` first.');

http.createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost');
  let pathname: string;
  try { pathname = decodeURIComponent(url.pathname); } catch { pathname = '/'; }
  let file = path.join(root, pathname);
  if (!file.startsWith(root)) file = root;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) {
      response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
      return;
    }
    file = path.join(file, 'index.html');
  }
  let status = 200;
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { status = 404; file = path.join(root, '404.html'); }
  response.writeHead(status, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(response);
}).listen(port, () => process.stdout.write(`Serving out/ like GitHub Pages at http://localhost:${port}\n`));
