import type { Metadata } from 'next';
import { Icon, type IconName } from '@/components/ui/icons';
import { CompanyHero } from '@/components/sections/company-hero';
import { InnerCta } from '@/components/sections/inner-cta';
import Image from 'next/image';
import { ProductCard } from '@/components/products/product-card';
import { getAllProducts } from '@/lib/content/products';
import { JsonLd } from '@/components/seo/json-ld';
import { itemListSchema } from '@/lib/seo/structured-data';
import { companyPages, productsContent } from '@/content/pages/company';
import { createPageMetadata, getSeoPage } from '@/lib/seo';

const page = companyPages.products;
export const metadata: Metadata = createPageMetadata(getSeoPage('/products'));
const icons: IconName[] = ['code', 'globe', 'cube'];

export default function ProductsPage() {
  const products = getAllProducts();
  return <main className="company-page cp-products">
    <JsonLd data={itemListSchema(products.map(product => ({ name: product.name, url: product.hasPage ? `/products/${product.slug}` : product.cta.href })))} />
    <CompanyHero page={page} graphic={<Image className="cp-hero-image" src="/images/brand/new-release-icon.png" alt="" width={220} height={220} priority />} />
    <section className="cp-section cp-soft" aria-labelledby="company-products">
      <div className="container">
        <p className="eyebrow">{page.eyebrow}</p>
        <h2 id="company-products">{productsContent.listHeading}</h2>
        <div style={{ marginTop: 42 }}>
          {products.map(product => <ProductCard product={product} key={product.slug} />)}
        </div>
      </div>
    </section>
    <section className="cp-section" aria-labelledby="company-why-products">
      <div className="container cp-split">
        <div><p className="eyebrow">{productsContent.whyEyebrow}</p><h2 id="company-why-products">{productsContent.whyHeading}</h2></div>
        <p className="cp-lead">{productsContent.whyBody}</p>
      </div>
    </section>
    <section className="cp-section cp-soft" aria-labelledby="company-how-products">
      <div className="container">
        <p className="eyebrow">{productsContent.howEyebrow}</p>
        <h2 id="company-how-products">{productsContent.howHeading}</h2>
        <div className="cp-principles">{productsContent.principles.map((item, index) => <div className="cp-principle" key={item.title}>
          <Icon name={icons[index]} /><h3>{item.title}</h3><p>{item.body}</p>
        </div>)}</div>
      </div>
    </section>
    <InnerCta heading={productsContent.cta} buttonLabel="Discuss a product idea" />
  </main>;
}