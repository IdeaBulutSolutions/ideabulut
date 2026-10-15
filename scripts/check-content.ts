import fs from 'node:fs';
import path from 'node:path';
import { getAllPosts } from '../src/lib/content/blog';
import { getAllProducts } from '../src/lib/content/products';
import { publicRoot } from '../src/lib/content/files';
import { seoPages } from '../src/lib/seo';
import { faqSchema } from '../src/lib/content/schemas';
import { servicePages } from '../src/content/pages/services';

export function checkContent(): void {
  const posts = getAllPosts(true);
  const products = getAllProducts(true);
  const publicPages = new Set([
    ...seoPages.map(page => page.path),
    ...posts.filter(post => !post.draft).map(post => `/blog/${post.slug}`),
    ...products.filter(product => product.hasPage && product.status === 'live').map(product => `/products/${product.slug}`),
  ]);
  const problems: string[] = [];
  const image = (source: string, file: string) => {
    if (source.startsWith('/') && !fs.existsSync(path.join(publicRoot, source))) problems.push(`${file}: image not found: ${source}`);
  };
  const internalLink = (href: string, file: string) => {
    const clean = href.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    if (href.startsWith('/') && !publicPages.has(clean) && !fs.existsSync(path.join(publicRoot, clean))) problems.push(`${file}: internal link points to a missing or hidden page: ${href}`);
  };
  for (const [folder, items] of [['blog', posts], ['products', products]] as const) {
    const slugs = new Set<string>();
    for (const item of items) {
      const file = `content/${folder}/${item.slug}.md`;
      if (slugs.has(item.slug)) problems.push(`${file}: duplicate slug ${item.slug}`);
      slugs.add(item.slug);
      {
        if ('featuredImage' in item) image(item.featuredImage, file);
        else { image(item.icon, file); image(item.visual, file); internalLink(item.cta.href, file); }
        const markdown = item.content.replace(/```[\s\S]*?```/g, '');
        for (const match of markdown.matchAll(/(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
          if (match[1]) {
            if (!match[2].trim()) problems.push(`${file}: image ${match[3]} needs alt text.`);
            image(match[3], file);
          } else internalLink(match[3], file);
        }
        let heading = 1;
        for (const match of markdown.matchAll(/^(#{1,6})\s+/gm)) {
          if (match[1].length === 1) problems.push(`${file}: use H2 (##), not an extra H1.`);
          if (match[1].length > heading + 1) problems.push(`${file}: heading level skips from H${heading} to H${match[1].length}.`);
          heading = match[1].length;
        }
      }
    }
  }
  for (const service of Object.values(servicePages)) {
    for (const faq of service.faq.items) {
      const result = faqSchema.safeParse(faq);
      if (!result.success || !faq.question.endsWith('?')) problems.push(`${service.path}: invalid FAQ question ${faq.question}`);
      const sentences = faq.answer.split(/(?<=[.!?])\s+/).length;
      if (sentences < 2 || sentences > 4) problems.push(`${service.path}: FAQ "${faq.question}" needs 2–4 sentences.`);
    }
  }
  if (problems.length) throw new Error(`Content validation failed:\n${problems.map(problem => `- ${problem}`).join('\n')}`);
  process.stdout.write(`Content valid: ${posts.length} posts, ${products.length} products; published images, links and FAQ data checked.\n`);
}

checkContent();
