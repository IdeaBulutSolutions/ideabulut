import assert from 'node:assert/strict';
import { getAllPosts } from '../src/lib/content/blog';
import { getAllProducts } from '../src/lib/content/products';
import { seoPages } from '../src/lib/seo';
import { servicePages } from '../src/content/pages/services';
import { siteConfig, absoluteUrl } from '../src/config/site';

const base = process.env.SITE_CHECK_URL || 'http://127.0.0.1:3000';
// Pages are served with a trailing slash (`/about/`); compare routes without it.
const trimSlash = (pathname: string) => pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
// Hidden aliases for retired URLs: they must load (no 404/redirect) and point their canonical at the live page.
const aliases: Record<string, string> = {
  '/copado': '/services/salesforce-devops', '/privacy-policy': '/privacy', '/cookies': '/privacy', '/insights': '/blog',
  '/products/toolbelt-for-copado': '/products',
};
const paths = [...seoPages.map(page => page.path), ...getAllPosts().map(post => `/blog/${post.slug}`),
  ...getAllProducts().filter(product => product.hasPage).map(product => `/products/${product.slug}`)];
const known = new Set(paths);
const titles = new Set<string>();
const descriptions = new Set<string>();
const sources = new Map<string, string>();
const decode = (text: string) => text.replace(/&amp;/g, '&').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attributes = (tag: string) => Object.fromEntries([...tag.matchAll(/([:\w-]+)="([^"]*)"/g)].map(match => [match[1], decode(match[2])]));
const tags = (html: string, tag: string) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'g'))].map(match => match[0]);
const graphs = new Map<string, Record<string, unknown>[]>();
const links = new Set<string>();
const pageLinks = new Map<string, Set<string>>();

function validateGraph(node: Record<string, unknown>, page: string) {
  assert.equal(node['@context'], 'https://schema.org', `${page}: JSON-LD context`);
  const type = node['@type'];
  const required: Record<string, string[]> = {
    Organization: ['name', 'url', 'logo', 'areaServed'], WebSite: ['name', 'url'],
    BreadcrumbList: ['itemListElement'], Service: ['name', 'description', 'provider', 'areaServed', 'serviceType'],
    FAQPage: ['mainEntity'], BlogPosting: ['headline', 'description', 'image', 'datePublished', 'dateModified', 'author', 'publisher', 'mainEntityOfPage'],
    ItemList: ['itemListElement'], ContactPage: ['name', 'url'], SoftwareApplication: ['name', 'description', 'applicationCategory', 'publisher', 'url'],
  };
  assert.equal(typeof type, 'string', `${page}: JSON-LD type`);
  assert(type as string in required, `${page}: known schema type ${type}`);
  for (const field of required[type as string]) assert(node[field] !== undefined, `${page}: ${type}.${field}`);
  function inspect(value: unknown) {
    if (Array.isArray(value)) value.forEach(inspect);
    else if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) {
        assert.notEqual(child, '', `${page}: empty structured-data ${key}`);
        if (['url', 'image', 'logo'].includes(key) && typeof child === 'string') assert(child.startsWith('https://'), `${page}: absolute HTTPS ${key}`);
        inspect(child);
      }
    }
  }
  inspect(node);
}

for (const route of paths) {
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200, `${route}: HTTP status`);
  const raw = await response.text();
  sources.set(route, raw);
  const html = raw.replace(/<script\b[\s\S]*?<\/script>/g, '');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: exactly one server-rendered H1`);
  const title = decode(raw.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
  assert(title && !titles.has(title), `${route}: unique nonempty title`); titles.add(title);
  const metas = tags(raw, 'meta').map(attributes);
  const description = metas.find(meta => meta.name === 'description')?.content;
  assert(description && !descriptions.has(description), `${route}: unique nonempty meta description`); descriptions.add(description);
  const canonical = tags(raw, 'link').map(attributes).filter(tag => tag.rel === 'canonical');
  assert.equal(canonical.length, 1, `${route}: exactly one canonical`);
  assert.equal(canonical[0].href, absoluteUrl(route), `${route}: canonical URL`);
  assert(metas.some(meta => meta.property === 'og:image'), `${route}: Open Graph image`);
  let heading = 0;
  for (const match of html.matchAll(/<h([1-6])\b/g)) {
    const next = Number(match[1]); assert(next <= heading + 1, `${route}: heading order H${heading} to H${next}`); heading = next;
  }
  for (const tag of tags(html, 'img')) {
    const attrs = attributes(tag);
    assert('alt' in attrs && attrs.width && attrs.height, `${route}: image alt and dimensions`);
    if (attrs.src?.startsWith('/')) links.add(attrs.src);
  }
  for (const tag of tags(html, 'a')) {
    const attrs = attributes(tag);
    if (attrs.href?.startsWith('/') && !attrs.href.startsWith('//')) {
      const destination = trimSlash(attrs.href.split(/[?#]/)[0]) || route;
      links.add(destination);
      if (!pageLinks.has(route)) pageLinks.set(route, new Set());
      pageLinks.get(route)!.add(destination);
    }
    if (attrs.href?.startsWith('http') && !attrs.href.startsWith(siteConfig.siteUrl)) assert.equal(attrs.target, '_blank', `${route}: external link opens a new tab`);
  }
  const nodes = [...raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]) as Record<string, unknown>);
  assert(nodes.some(node => node['@type'] === 'Organization') && nodes.some(node => node['@type'] === 'WebSite'), `${route}: global entity data`);
  if (route !== '/') assert(nodes.some(node => node['@type'] === 'BreadcrumbList'), `${route}: breadcrumb data`);
  for (const node of nodes) validateGraph(node, route);
  graphs.set(route, nodes);
  assert(!/\[[A-Z][A-Z ]+\]/.test(html.replace(/<[^>]+>/g, '')), `${route}: no unresolved public placeholders`);
  const service = servicePages[route as keyof typeof servicePages];
  if (service) {
    const node = nodes.find(item => item['@type'] === 'FAQPage');
    assert(node, `${route}: FAQ structured data`);
    assert.equal((node.mainEntity as unknown[]).length, service.faq.items.length);
    for (const faq of service.faq.items) assert(decode(html.replace(/<[^>]+>/g, '')).includes(faq.answer), `${route}: FAQ answer present before JavaScript`);
  }
}
for (const href of links) {
  const response = await fetch(`${base}${href}`, { redirect: 'manual' });
  // Retired aliases intentionally redirect once to live destinations.
  if (response.status >= 300 && response.status < 400) {
    const destination = response.headers.get('location')!;
    const redirected = await fetch(new URL(destination, base), { redirect: 'manual' });
    assert.equal(redirected.status, 200, `${href}: no redirect chain`);
  } else assert.equal(response.status, 200, `${href}: linked page or asset exists`);
}
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
assert(sitemap.includes('<urlset'), 'Sitemap XML');
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) assert(known.has(trimSlash(new URL(match[1]).pathname)), `Sitemap lists live route: ${match[1]}`);
for (const [alias, target] of Object.entries(aliases)) {
  const response = await fetch(`${base}${alias}/`, { redirect: 'manual' });
  assert.equal(response.status, 200, `${alias}/: retired URL loads without a redirect`);
  const canonical = tags(await response.text(), 'link').map(attributes).find(tag => tag.rel === 'canonical');
  assert.equal(canonical?.href, absoluteUrl(target), `${alias}/: canonical points at ${target}/`);
  assert(!sitemap.includes(`<loc>${absoluteUrl(alias)}</loc>`), `${alias}/: hidden from the sitemap`);
}
for (const file of ['/opengraph-image.png', '/manifest.webmanifest', '/sitemap.xml']) {
  assert.equal((await fetch(`${base}${file}`)).status, 200, `${file}: exported`);
}
for (const file of ['/robots.txt', '/llms.txt', '/llms-full.txt', '/feed.xml']) {
  const response = await fetch(`${base}${file}`);
  assert.equal(response.status, 200, `${file}: HTTP status`);
  const text = await response.text();
  assert(!text.startsWith('<!DOCTYPE'), `${file}: not an HTML fallback`);
}
assert(graphs.get('/contact')!.some(node => node['@type'] === 'ContactPage'));
assert(graphs.get('/products')!.some(node => node['@type'] === 'ItemList'));
const distances = new Map<string, number>([['/', 0]]);
const queue = ['/'];
for (let index = 0; index < queue.length; index++) {
  for (const linked of pageLinks.get(queue[index]) ?? []) {
    if (known.has(linked) && !distances.has(linked)) {
      distances.set(linked, distances.get(queue[index])! + 1); queue.push(linked);
    }
  }
}
for (const route of paths) assert((distances.get(route) ?? Infinity) <= 3, `${route}: within three clicks of home`);
for (const post of getAllPosts()) assert(graphs.get(`/blog/${post.slug}`)!.some(node => node['@type'] === 'BlogPosting'));
const missing = await fetch(`${base}/definitely-not-a-real-page`);
assert.equal(missing.status, 404, 'Real 404 status');
process.stdout.write(`PASS: ${paths.length} raw-HTML pages and ${Object.keys(aliases).length} retired-URL aliases; unique metadata, canonicals, heading order, image attributes, links, FAQ parity, typed JSON-LD, crawling files and 404.\n`);
