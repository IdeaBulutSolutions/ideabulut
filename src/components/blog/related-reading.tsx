import Link from 'next/link';
import { Icon } from '@/components/ui/icons';
import { getAllPosts } from '@/lib/content/blog';
import { serviceUi, type ServicePath } from '@/content/pages/services';

export function RelatedReading({ path }: { path: ServicePath }) {
  const posts = getAllPosts().filter(post => post.tags.includes(path.split('/').at(-1)!)).slice(0, 3);
  if (!posts.length) return null;
  return <section className="sp-section sp-white sp-related" aria-labelledby="sp-related"><div className="container">
    <h2 id="sp-related">{serviceUi.relatedReading}</h2>
    <div className="sp-reading">{posts.map(post => <Link href={`/blog/${post.slug}`} key={post.slug}>
      <small>{post.tags[0]}</small><h3>{post.title}</h3><p>{post.excerpt}</p><span>{serviceUi.readingLink} <Icon name="arrow" className="arrow-svg" /></span>
    </Link>)}</div>
  </div></section>;
}
