import { contentFiles, readContent } from '@/lib/content/files';
import { blogSchema } from '@/lib/content/schemas';
import { slugifyHeading, truncateWords, type BlogPostSummary } from '@/lib/content/blog-format';

export type BlogHeading = { id: string; text: string };
export type BlogPost = BlogPostSummary & { content: string; headings: BlogHeading[]; draft: boolean };

export function stripMarkdown(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1').replace(/(\*\*|__|\*|_|~~)(.+?)\1/g, '$2')
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '').replace(/\s+/g, ' ').trim();
}

export function uniqueId(base: string, seen: Map<string, number>): string {
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count ? `${base}-${count}` : base;
}

function parsePost(file: string): BlogPost {
  const { data, content, slug } = readContent('blog', file, blogSchema);
  const firstParagraph = content.replace(/```[\s\S]*?```/g, '').split(/\n\s*\n/).find(block => {
    const text = block.trim();
    return text && !/^(#{1,6}\s|[-*+]\s|\d+\.\s|\||!\[)/.test(text);
  }) ?? '';
  const excerpt = data.excerpt ?? truncateWords(stripMarkdown(firstParagraph), 140);
  const seen = new Map<string, number>();
  const headings = [...content.replace(/```[\s\S]*?```/g, '').matchAll(/^##\s+(.+?)\s*#*\s*$/gm)]
    .map(match => {
      const text = stripMarkdown(match[1]);
      return { id: uniqueId(slugifyHeading(text), seen), text };
    });
  return { ...data, slug, excerpt, preview: truncateWords(excerpt, 140), content, headings,
    readingTime: Math.max(1, Math.ceil(stripMarkdown(content).split(/\s+/).length / 225)) };
}

export function getAllPosts(includeDrafts = false): BlogPost[] {
  return contentFiles('blog').map(parsePost).filter(post => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function toSummary(post: BlogPost): BlogPostSummary {
  return { slug: post.slug, title: post.title, excerpt: post.excerpt, preview: post.preview, date: post.date,
    updated: post.updated, featuredImage: post.featuredImage, imageAlt: post.imageAlt, author: post.author,
    readingTime: post.readingTime, tags: post.tags };
}

export function getPostSummaries(): BlogPostSummary[] { return getAllPosts().map(toSummary); }
export function getPostBySlug(slug: string): BlogPost | undefined { return getAllPosts().find(post => post.slug === slug); }
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPostSummary[] {
  const score = (other: BlogPost) => other.tags.filter(tag => post.tags.includes(tag)).length;
  return getAllPosts().filter(other => other.slug !== post.slug)
    .sort((a, b) => score(b) - score(a) || b.date.localeCompare(a.date)).slice(0, limit).map(toSummary);
}
