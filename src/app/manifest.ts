import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
export const dynamic = 'force-static';
export default function manifest(): MetadataRoute.Manifest {
  return { name: siteConfig.name, short_name: siteConfig.shortName, description: siteConfig.defaultDescription,
    start_url: '/', display: 'standalone', background_color: '#090045', theme_color: '#090045',
    icons: [{ src: '/images/brand/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/images/brand/icon-512.png', sizes: '512x512', type: 'image/png' }] };
}
