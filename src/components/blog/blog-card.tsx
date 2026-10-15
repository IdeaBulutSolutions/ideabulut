import Link from 'next/link';
import { formatBlogDate, type BlogPostSummary } from '@/lib/content/blog-format';
import { BlogImage } from '@/components/blog/blog-image';
import '@/styles/blog.css';

export function BlogCard({ post, headingLevel = 'h2' }: { post: BlogPostSummary; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return <article className="blog-card" data-testid={`card-post-${post.slug}`}>
    <div className="blog-card-media">
      <BlogImage post={post} sizes="(min-width: 1100px) 380px, (min-width: 768px) 46vw, 100vw" />
    </div>
    <div className="blog-card-body">
      <time className="blog-kicker" dateTime={post.date}>{formatBlogDate(post.date)}</time>
      <Heading className="blog-card-title">
        <Link href={`/blog/${post.slug}`} className="blog-card-link" data-testid={`link-post-${post.slug}`}>{post.title}</Link>
      </Heading>
      <p className="blog-card-excerpt">{post.preview}</p>
      <span className="blog-card-more" aria-hidden="true">
        Read full article
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h9M8.5 4 12.5 8l-4 4" /></svg>
      </span>
    </div>
  </article>;
}
