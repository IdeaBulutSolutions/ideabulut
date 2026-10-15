import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { absoluteUrl, siteConfig } from '@/config/site';
import { servicesNavigation } from '@/config/navigation';
import { getAllPosts } from '@/lib/content/blog';
import { getAllProducts } from '@/lib/content/products';
import { seoPages } from '@/lib/seo';
import { servicePages, servicesIndex } from '@/content/pages/services';
import { aboutContent, companyPages, productsContent } from '@/content/pages/company';

const link = (title: string, href: string, description: string) => `- [${title}](${absoluteUrl(href)}): ${description}`;
const intro = `# ${siteConfig.name}\n\n> ${siteConfig.defaultDescription} We work with teams across Spain, Türkiye, the UK and the US.\n`;

export function buildLlms(): string {
  const services = servicesNavigation.links.filter(service => service.href in servicePages);
  return [
    intro, '## Services', link('All services', '/services', servicesIndex.sub),
    ...services.map(service => link(service.name, service.href, servicePages[service.href as keyof typeof servicePages].sub)),
    '\n## Products', ...getAllProducts().map(product => link(`${product.name} by ${product.brand}`, product.hasPage ? `/products/${product.slug}` : product.cta.href, product.description)),
    '\n## Blog', link('Blog', '/blog', 'Practical guides from the Idea Bulut team.'),
    ...getAllPosts().map(post => link(post.title, `/blog/${post.slug}`, post.excerpt)),
    '\n## Company', ...seoPages.filter(page => ['/', '/about', '/contact', '/book-a-call'].includes(page.path)).map(page => link(page.breadcrumbLabel, page.path, page.description)),
    '\nFull page and article text: ' + absoluteUrl('/llms-full.txt'),
  ].join('\n');
}

function copyText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(copyText).filter(Boolean).join('\n\n');
  if (value && typeof value === 'object') return Object.entries(value).filter(([key]) => !['icon', 'path', 'href', 'metaDescription', 'breadcrumb', 'eyebrow'].includes(key)).map(([, child]) => copyText(child)).filter(Boolean).join('\n\n');
  return '';
}

function homepageCopy(): string {
  const source = fs.readFileSync(path.join(process.cwd(), 'src/app/page.tsx'), 'utf8');
  const file = ts.createSourceFile('home.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const text: string[] = [];
  function visit(node: ts.Node) {
    if (ts.isJsxText(node) && node.text.trim()) text.push(node.text.trim().replace(/&apos;/g, "'").replace(/&amp;/g, '&'));
    if (ts.isPropertyAssignment(node) && ['name', 'description', 'title'].includes(node.name.getText(file)) && ts.isStringLiteral(node.initializer)) text.push(node.initializer.text);
    if (ts.isArrayLiteralExpression(node) && node.elements.every(ts.isStringLiteral)) text.push(node.elements.map(element => (element as ts.StringLiteral).text).join(' '));
    ts.forEachChild(node, visit);
  }
  visit(file);
  return text.join('\n\n');
}

export function buildLlmsFull(): string {
  return [
    intro, '## Home\n\n' + homepageCopy(),
    '## Services\n\n' + copyText(servicesIndex),
    ...Object.values(servicePages).map(service => `## ${service.breadcrumb}\n\nURL: ${absoluteUrl(service.path)}\n\n${copyText(service)}`),
    '## About\n\n' + copyText(companyPages.about) + '\n\n' + copyText(aboutContent),
    '## Products\n\n' + copyText(productsContent),
    ...getAllProducts().map(product => `### ${product.name} by ${product.brand}\n\n${product.description}\n\n${product.tags.join(', ')}\n\n[${product.cta.label}](${absoluteUrl(product.hasPage ? `/products/${product.slug}` : product.cta.href)})\n\n${product.content}\n\n${copyText(product.features)}\n\n${copyText(product.faq)}`),
    '## Blog', ...getAllPosts().map(post => `### ${post.title}\n\nURL: ${absoluteUrl(`/blog/${post.slug}`)}\n\nPublished: ${post.date}${post.updated ? `; Updated: ${post.updated}` : ''}\n\nAuthor: ${post.author}\n\n${post.content}`),
  ].join('\n\n');
}
