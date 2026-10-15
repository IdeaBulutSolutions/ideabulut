import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { getAllPosts } from '../src/lib/content/blog';
import { getAllProducts } from '../src/lib/content/products';
import { buildLlms, buildLlmsFull } from '../src/lib/seo/llms';
import { buildRss } from '../src/lib/seo/feeds';
import sitemap from '../src/app/sitemap';
import { blogSchema, productSchema } from '../src/lib/content/schemas';
import { readContent } from '../src/lib/content/files';

const postFile = path.join(process.cwd(), 'content/blog/content-check-fixture.md');
const productFile = path.join(process.cwd(), 'content/products/content-check-fixture.md');
assert(!fs.existsSync(postFile) && !fs.existsSync(productFile), 'Fixture names must be unused.');
try {
  execFileSync(process.execPath, ['--import', 'tsx', 'scripts/new-content.ts', 'blog', 'Content check fixture']);
  execFileSync(process.execPath, ['--import', 'tsx', 'scripts/new-content.ts', 'products', 'Content check fixture']);
  assert(readContent('blog', 'content-check-fixture.md', blogSchema).data.draft);
  assert.equal(readContent('products', 'content-check-fixture.md', productSchema).data.status, 'coming-soon');
  assert(!getAllPosts().some(post => post.slug === 'content-check-fixture'));
  assert(!getAllProducts().some(product => product.slug === 'content-check-fixture'));
  fs.writeFileSync(postFile, `---\ntitle: Content check fixture\ndate: \"2026-01-01\"\nfeaturedImage: /images/blog/api-versions.png\nimageAlt: Test fixture\ntags: [salesforce-devops]\ndraft: false\n---\n\nA temporary test article.\n\n## Test heading\n\nFixture body.`);
  fs.writeFileSync(productFile, `---\nname: Content check fixture\ndescription: A temporary test product.\nicon: /images/products/retarget-logo.png\nvisual: /images/products/retarget-logo.png\nvisualAlt: Test fixture\ncta:\n  label: Discover fixture\n  href: /contact\n  external: false\nfeatured: true\nstatus: live\nhasPage: true\n---\n\nTemporary product body.`);
  assert(getAllPosts().some(post => post.slug === 'content-check-fixture'));
  assert(getAllProducts().some(product => product.slug === 'content-check-fixture'));
  assert(buildRss().includes('/blog/content-check-fixture'));
  assert(buildLlms().includes('/blog/content-check-fixture') && buildLlms().includes('/products/content-check-fixture'));
  assert(buildLlmsFull().includes('Temporary product body.'));
  const urls = sitemap().map(item => item.url);
  assert(urls.some(url => url.endsWith('/blog/content-check-fixture/')));
  assert(urls.some(url => url.endsWith('/products/content-check-fixture/')));
  assert(!blogSchema.safeParse({ title: 'No image' }).success);
  assert(!blogSchema.safeParse({ title: 'x'.repeat(71), date: '2026-01-01', featuredImage: '/a.png', imageAlt: 'Test' }).success);
  execFileSync(process.execPath, ['--import', 'tsx', 'scripts/check-content.ts'], { stdio: 'pipe' });
  const preview = process.env.CONTENT_TEST_URL;
  if (preview) {
    for (const [route, expected] of [
      ['/blog', 'Content check fixture'], ['/products', 'Content check fixture'],
      ['/blog/content-check-fixture', 'Fixture body.'], ['/products/content-check-fixture', 'Temporary product body.'],
      ['/sitemap.xml', '/products/content-check-fixture'], ['/feed.xml', '/blog/content-check-fixture'],
      ['/llms.txt', '/products/content-check-fixture'], ['/llms-full.txt', 'Temporary product body.'],
    ]) {
      const response: Response = await fetch(`${preview}${route}`);
      const body: string = await response.text();
      assert.equal(response.status, 200, `Fixture ${route} HTTP status`);
      assert(body.includes(expected), `Fixture visible in ${route}`);
    }
  }
  process.stdout.write('PASS: creation commands, defaults, draft/hidden exclusion, published loaders, sitemap, RSS, llms files and validation. Fixtures removed.\n');
} finally {
  fs.rmSync(postFile, { force: true });
  fs.rmSync(productFile, { force: true });
}
