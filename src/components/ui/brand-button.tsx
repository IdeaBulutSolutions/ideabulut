import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/icons';

export function BrandButton({ href, children, arrow = false, external = false, className = '' }: { href: string; children: ReactNode; arrow?: boolean; external?: boolean; className?: string }) {
  return <Link href={href} className={`brand-button ${className}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}{arrow && <Icon name={external ? 'external' : 'arrow'} className="arrow-svg" />}</Link>;
}