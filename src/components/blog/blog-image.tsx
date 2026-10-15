import Image from 'next/image';
import type { BlogPostSummary } from '@/lib/content/blog-format';

export function BlogImage({ post, priority = false, sizes, className = '' }: { post: BlogPostSummary; priority?: boolean; sizes: string; className?: string }) {
  return <picture className={className}>
    <Image src={post.featuredImage} alt={post.imageAlt} width={1200} height={675} sizes={sizes} priority={priority} />
  </picture>;
}
