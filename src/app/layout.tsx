import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Manrope, Sora } from 'next/font/google';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CookieConsent } from '@/components/layout/cookie-consent';
import { JsonLd } from '@/components/seo/json-ld';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import '@/index.css';
import '@/styles/navigation.css';
import '@/styles/service-pages.css';
import '@/styles/company-pages.css';
import '@/styles/contact-page.css';
import '@/styles/cookie-consent.css';
import '@/styles/accessibility.css';

const sora = Sora({ variable: '--font-sora', subsets: ['latin'], display: 'swap' });
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: siteConfig.name, template: '%s | Idea Bulut' },
  description: siteConfig.defaultDescription,
  alternates: { types: { 'application/rss+xml': '/feed.xml' } },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/images/brand/negative-favicon.png', sizes: '64x64', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en">
    <body className={`${sora.variable} ${manrope.variable}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <div id="main-content" tabIndex={-1}>{children}</div>
      <SiteFooter />
      <CookieConsent />
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
    </body>
  </html>;
}
