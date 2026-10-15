import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/seo/structured-data';

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function Breadcrumbs({
  items,
  current,
}: {
  items: BreadcrumbItem[];
  current: string;
}) {
  const trail = [...items, { label: current, href: '' }];
  const schema = breadcrumbSchema(trail);

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {items.map(({ label, href }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
              <span aria-hidden="true">/</span>
            </li>
          ))}
          <li aria-current="page">{current}</li>
        </ol>
      </nav>
      <JsonLd data={schema} />
    </>
  );
}