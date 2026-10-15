import type { Metadata } from 'next';
import { BlogList } from '@/components/blog/blog-list';
import { CompanySimpleHero } from '@/components/sections/company-simple-hero';
import { companyPages } from '@/content/pages/company';
import { createPageMetadata, getSeoPage } from '@/lib/seo';

const page = companyPages.blog;
export const metadata: Metadata = createPageMetadata(getSeoPage('/blog'));

export default function BlogPage() {
  return <main className="company-page cp-blog">
    <CompanySimpleHero page={page} />
    <BlogList />
  </main>;
}
