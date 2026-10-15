'use client';

import { useState } from 'react';
import type { BlogPostSummary } from '@/lib/content/blog-format';
import { BlogCard } from '@/components/blog/blog-card';

const PAGE_SIZE = 9;

export function BlogGrid({ posts }: { posts: BlogPostSummary[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = posts.slice(0, visible);
  return <>
    <div className="blog-grid">
      {shown.map((post) => <BlogCard key={post.slug} post={post} />)}
    </div>
    {posts.length > visible && <div className="blog-more">
      <button type="button" className="blog-more-button" onClick={() => setVisible((v) => v + PAGE_SIZE)} data-testid="button-load-more">
        Load more articles
      </button>
    </div>}
  </>;
}
