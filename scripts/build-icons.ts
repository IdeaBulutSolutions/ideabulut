import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.join(process.cwd(), 'public');
const source = path.join(root, 'images/brand/negative-favicon.png');
await Promise.all([
  sharp(source).resize(180, 180).png().toFile(path.join(root, 'apple-touch-icon.png')),
  sharp(source).resize(192, 192).png().toFile(path.join(root, 'images/brand/icon-192.png')),
  sharp(source).resize(512, 512).png().toFile(path.join(root, 'images/brand/icon-512.png')),
]);
fs.writeFileSync(path.join(root, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><image width="64" height="64" href="data:image/png;base64,${fs.readFileSync(source).toString('base64')}"/></svg>`);
