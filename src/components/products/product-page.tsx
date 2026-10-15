import Image from 'next/image';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { InnerCta } from '@/components/sections/inner-cta';
import { BrandButton } from '@/components/ui/brand-button';
import { Faq } from '@/components/sections/faq';
import { BlogMarkdown } from '@/components/blog/blog-markdown';
import { softwareSchema } from '@/lib/seo/structured-data';
import type { ProductContent } from '@/lib/content/schemas';

export function ProductPage({ product }: { product: ProductContent }) {
  return <main className="company-page">
    <JsonLd data={softwareSchema(product)} />
    <header className="cp-hero"><div className="container cp-hero-inner">
      <div><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }]} current={product.name} />
        <h1>{product.name}</h1><p>by {product.brand}</p><p className="cp-hero-sub">{product.description}</p>
        <div className="cp-product-meta">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <BrandButton href={product.cta.href} external={product.cta.external} arrow>{product.cta.label}</BrandButton>
      </div>
      <Image src={product.visual} alt={product.visualAlt} width={product.visualWidth} height={product.visualHeight} priority sizes="(min-width: 850px) 450px, 90vw" style={{ maxWidth: '100%', height: 'auto' }} />
    </div></header>
    {product.features.length > 0 && <section className="cp-section"><div className="container"><h2>Features</h2><div className="cp-principles">{product.features.map(feature => <div className="cp-principle" key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></div>)}</div></div></section>}
    {product.content && <section className="cp-section"><div className="container"><BlogMarkdown content={product.content} /></div></section>}
    {product.faq.length > 0 && <Faq items={product.faq} />}
    <InnerCta />
  </main>;
}
