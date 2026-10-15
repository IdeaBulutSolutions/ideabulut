import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/lib/content/products';
import { createPageMetadata } from '@/lib/seo';
import { ProductPage } from '@/components/products/product-page';
import ProductsPage, { metadata as productsMetadata } from '@/app/products/page';

// Every live product gets a URL. Products with `hasPage: true` render their own page; the
// rest render the Products listing (canonical /products/) so old product links such as
// /products/toolbelt-for-copado/ still load. A static export also needs at least one param.
export const dynamicParams = false;
export function generateStaticParams() {
  return getAllProducts().map(product => ({ slug: product.slug }));
}
type Params = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return productsMetadata;
  return createPageMetadata({ path: `/products/${slug}`, title: `${product.seoTitle ?? product.name} | Idea Bulut`,
    description: product.seoDescription ?? product.description, heading: product.name, breadcrumbLabel: product.name }, product.visual);
}
export default async function ProductDetailPage({ params }: Params) {
  const { slug } = await params;
  if (!getAllProducts().some(product => product.slug === slug)) notFound();
  const product = getProductBySlug(slug);
  return product ? <ProductPage product={product} /> : <ProductsPage />;
}
