import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { getAllPosts } from '@/lib/content/blog';
import { getAllProducts } from '@/lib/content/products';
import { pagePaths } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pagePaths.map(path => ({ url: absoluteUrl(path) })),
    ...getAllPosts().map(post => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: post.updated ?? post.date })),
    ...getAllProducts().filter(product => product.hasPage).map(product => ({
      url: absoluteUrl(`/products/${product.slug}`),
      ...(product.updated || product.date ? { lastModified: product.updated ?? product.date } : {}),
    })),
  ];
}
