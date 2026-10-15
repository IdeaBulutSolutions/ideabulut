import { CompanyBlogList } from '@/components/sections/company-blog-list';
import { BlogGrid } from '@/components/blog/blog-grid';
import { getPostSummaries } from '@/lib/content/blog';
import { itemListSchema } from '@/lib/seo/structured-data';
import { JsonLd } from '@/components/seo/json-ld';
import '@/styles/blog.css';

export function BlogList() {
  const posts = getPostSummaries();
  if (!posts.length) return <CompanyBlogList />;
  return <section className="blog-list-section" aria-label="Latest articles">
    <JsonLd data={itemListSchema(posts.map(post => ({ name: post.title, url: `/blog/${post.slug}` })))} />
    <div className="container"><BlogGrid posts={posts} /></div>
  </section>;
}
