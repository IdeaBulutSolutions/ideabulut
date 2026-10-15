import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogImage } from '@/components/blog/blog-image';
import Image from 'next/image';
import { BlogMarkdown } from '@/components/blog/blog-markdown';
import { BlogShare } from '@/components/blog/blog-share';
import { BlogToc } from '@/components/blog/blog-toc';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { InnerCta } from '@/components/sections/inner-cta';
import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/config/site';
import { getAllPosts, getPostBySlug, getRelatedPosts, type BlogPost } from '@/lib/content/blog';
import { formatBlogDate, truncateWords } from '@/lib/content/blog-format';
import { blogPostingSchema, breadcrumbSchema } from '@/lib/seo/structured-data';
import { absoluteUrl } from '@/config/site';
import '@/styles/blog.css';

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function origin() {
  return siteConfig.siteUrl;
}

function absoluteImage(post: BlogPost): string | null {
  return absoluteUrl(post.featuredImage);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const base = origin();
  const canonicalUrl = base ? `${base}/blog/${post.slug}` : undefined;
  const image = absoluteImage(post);
  const description = truncateWords(post.excerpt, 160);
  const images = image ? [{ url: image, width: 1200, height: 675, alt: post.imageAlt }] : undefined;
  // Mirror createPageMetadata: never index previews without a verified production domain.
  const robotsAllowed = Boolean(base);
  return {
    title: { absolute: `${post.title} | Idea Bulut` },
    description,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    robots: { index: robotsAllowed, follow: robotsAllowed, googleBot: { index: robotsAllowed, follow: robotsAllowed, 'max-image-preview': 'large' } },
    openGraph: {
      type: 'article',
      siteName: 'Idea Bulut Solutions',
      title: post.title,
      description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(images ? { images } : {}),
    },
    twitter: { card: 'summary_large_image', title: post.title, description, ...(image ? { images: [image] } : {}) },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const base = origin();
  const path = `/blog/${post.slug}`;
  const canonicalUrl = base ? `${base}${path}` : undefined;
  const related = getRelatedPosts(post, 3);
  const crumbTitle = truncateWords(post.title, 42);

  return <main className="blog-post-page">
    <ReadingProgress />
    <JsonLd data={blogPostingSchema(post)} />
    <JsonLd data={breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title, href: path }])} />
    <article>
      <header className="blog-post-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="blog-breadcrumb">
            <ol>
              <li><Link href="/">Home</Link><span aria-hidden="true">/</span></li>
              <li><Link href="/blog">Blog</Link><span aria-hidden="true">/</span></li>
              <li aria-current="page" title={post.title}>{crumbTitle}</li>
            </ol>
          </nav>
          <p className="blog-kicker blog-post-kicker">
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            {post.updated && <><span aria-hidden="true"> · </span><span>Updated <time dateTime={post.updated}>{formatBlogDate(post.updated)}</time></span></>}
            <span aria-hidden="true"> · </span>
            <span>{post.readingTime} MIN READ</span>
          </p>
          <h1 className="blog-post-title">{post.title}</h1>
          {post.excerpt && <p className="blog-post-sub">{post.excerpt}</p>}
          <div className="blog-author">
            <span className="blog-author-avatar">
              <Image src="/images/brand/negative-favicon.png" alt="" width={32} height={32} sizes="32px" />
            </span>
            <span>{post.author}</span>
          </div>
          <div className="blog-post-figure">
            <BlogImage post={post} priority sizes="(min-width: 1280px) 1200px, 100vw" />
          </div>
        </div>
      </header>

      <div className="container blog-post-layout">
        <aside className="blog-post-aside"><BlogToc headings={post.headings} /></aside>
        <div className="blog-post-main">
          <BlogMarkdown content={post.content} />
          <BlogShare path={path} canonicalUrl={canonicalUrl} />
        </div>
      </div>
    </article>

    {related.length > 0 && <section className="blog-related" aria-labelledby="blog-related-heading">
      <div className="container">
        <h2 id="blog-related-heading" className="blog-related-title">Keep reading</h2>
        <div className="blog-grid">{related.map((p) => <BlogCard key={p.slug} post={p} headingLevel="h3" />)}</div>
      </div>
    </section>}
    <InnerCta
      heading="Have a project in mind?"
      sub="Tell us what you need and we'll work out the architecture behind it."
      buttonLabel="Book a free 15-minute call"
      buttonHref="/book-a-call"
    />
  </main>;
}
