import { ImageResponse } from 'next/og';
import { OgPageImage } from '@/components/seo/og-page-image';
import { getSeoPage } from '@/lib/seo';

export const dynamic = 'force-static';
export const alt = 'Idea Bulut Solutions — Salesforce DevOps, custom software and AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
  return new ImageResponse(<OgPageImage title={getSeoPage('/').heading} />, size);
}
