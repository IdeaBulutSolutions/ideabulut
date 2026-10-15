import { ImageResponse } from 'next/og';
import { OgPageImage } from '@/components/seo/og-page-image';
import { getSeoPage } from '@/lib/seo';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
const title = getSeoPage('/contact').heading;
export const alt = `${title} - Idea Bulut Solutions`;

export default function OpenGraphImage() {
  return new ImageResponse(<OgPageImage title={title} />, size);
}