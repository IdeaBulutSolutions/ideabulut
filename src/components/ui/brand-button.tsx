import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/icons';

// External links open in a new tab with `noopener` but without `noreferrer`, so the destination sees
// the visit came from this site (browsers send the origin only, not the page path).
export function BrandButton({ href, children, arrow = false, external = false, className = '' }: { href: string; children: ReactNode; arrow?: boolean; external?: boolean; className?: string }) {
  return <Link href={href} className={`brand-button ${className}`} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>{children}{arrow && <Icon name={external ? 'external' : 'arrow'} className="arrow-svg" />}</Link>;
}