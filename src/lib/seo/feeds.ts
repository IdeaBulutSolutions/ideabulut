import { absoluteUrl, siteConfig } from '@/config/site';
import { getAllPosts } from '@/lib/content/blog';

export const xmlEscape = (text: string): string => text.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);

export function buildRss(): string {
  const posts = getAllPosts();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${xmlEscape(siteConfig.name)} Blog</title><link>${absoluteUrl('/blog')}</link>
<description>${xmlEscape(siteConfig.defaultDescription)}</description><language>en</language>
<atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml"/>
${posts.map(post => `<item><title>${xmlEscape(post.title)}</title><link>${absoluteUrl(`/blog/${post.slug}`)}</link><guid isPermaLink="true">${absoluteUrl(`/blog/${post.slug}`)}</guid><description>${xmlEscape(post.excerpt)}</description><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>${post.tags.map(tag => `<category>${xmlEscape(tag)}</category>`).join('')}</item>`).join('\n')}
</channel></rss>`;
}
