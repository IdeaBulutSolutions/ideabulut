import Link from 'next/link';
import Image from 'next/image';

export function BrandLogo({ onClick }: { onClick?: () => void } = {}) {
  return <Link className="brand" href="/" onClick={onClick} aria-label="Idea Bulut — Home">
    <Image className="brand-logo" src="/images/brand/idea-bulut-logo-negative.png" alt="Idea Bulut" width={2414} height={1898} sizes="(max-width: 850px) 100px, 115px" />
  </Link>;
}
