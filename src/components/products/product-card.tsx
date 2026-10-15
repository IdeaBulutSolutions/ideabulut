import Image from 'next/image';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';
import { BrandButton } from '@/components/ui/brand-button';
import type { ProductContent } from '@/lib/content/schemas';

type Props = HTMLAttributes<HTMLElement> & { product: ProductContent; variant?: 'full' | 'compact'; inert?: boolean };

export function ProductCard({ product, variant = 'full', className = '', ...props }: Props) {
  const compact = variant === 'compact';
  const identity = <div className={compact ? 'product-identity' : 'cp-product-top'}>
    <span className="product-symbol"><Image src={product.icon} alt="" width={compact ? 60 : 54} height={compact ? 60 : 54} sizes="60px" /></span>
    <div><h3>{product.hasPage ? <Link href={`/products/${product.slug}`}>{product.name}</Link> : product.name}</h3><p>by {product.brand}</p></div>
  </div>;
  const button = <BrandButton href={product.cta.href} external={product.cta.external} arrow>{product.cta.label}</BrandButton>;

  if (compact) return <article className={`product-card ${className}`} {...props}>
    <div className="product-top">{identity}{product.tags[0] && <span className="free-tag">{product.tags[0]}</span>}</div>
    <div><p className="product-category">{product.tags.slice(1).join(' · ')}</p><p className="product-description">{product.description}</p></div>
    {button}
  </article>;

  return <article className={`cp-product-card ${className}`} {...props}>
    <div className="cp-product-body">
      <div>{identity}<p className="cp-product-description">{product.description}</p></div>
      <div><div className="cp-product-meta">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div style={{ marginTop: 22 }}>{button}</div></div>
    </div>
    <div className="cp-product-graphic" style={product.visualBackground === 'soft' ? undefined : { background: product.visualBackground === 'navy' ? '#090045' : '#fff' }}>
      <Image className={product.visualWidth > product.visualHeight * 2 ? 'cp-product-wordmark-image' : undefined}
        src={product.visual} alt={product.visualAlt} width={product.visualWidth} height={product.visualHeight}
        sizes="(min-width: 850px) 400px, 80vw" />
    </div>
  </article>;
}
