import fs from 'node:fs';
import path from 'node:path';
import { slugifyHeading } from '../src/lib/content/blog-format';

const [folder, ...words] = process.argv.slice(2);
const title = words.join(' ').trim();
if (!['blog', 'products'].includes(folder) || !title) throw new Error('Usage: npm run new:post "Post title" or npm run new:product "Product name"');
const slug = slugifyHeading(title);
if (!slug) throw new Error('Use a name containing letters or numbers.');
const directory = path.join(process.cwd(), 'content', folder);
const destination = path.join(directory, `${slug}.md`);
if (fs.existsSync(destination)) throw new Error(`${destination} already exists; it was not overwritten.`);
const date = new Date().toISOString().slice(0, 10);
let template = fs.readFileSync(path.join(directory, '_template.md'), 'utf8');
if (folder === 'blog') {
  template = template.replace('title: "Your post title"', `title: ${JSON.stringify(title)}`)
    .replace('date: "2026-01-01"', `date: "${date}"`).replaceAll('your-post', slug);
} else {
  template = template.replace('name: "Your product"', `name: ${JSON.stringify(title)}`).replaceAll('your-product', slug);
}
fs.writeFileSync(destination, template, { flag: 'wx' });
process.stdout.write(`Created content/${folder}/${slug}.md. Add the images before publishing.\n`);
