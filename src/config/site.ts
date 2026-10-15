export type SiteConfig = {
  name: string;
  shortName: string;
  siteUrl: string;
  defaultDescription: string;
  logo: string;
  defaultSocialImage: string;
  areaServed: readonly string[];
  socialProfiles: { linkedin: string; github: string };
  contactEmail: string;
  legalName: string;
  registeredAddress: string;
  telephone: string;
  /** Google Apps Script Web App that stores contact-form leads (see apps-script/README.md). */
  appsScriptUrl: string;
  /** Cloudflare Turnstile site key; the matching secret lives only in the Apps Script. */
  turnstileSiteKey: string;
  /** Google Analytics 4 Measurement ID. Loaded only after the visitor accepts the cookie banner; empty disables both. */
  ga4Id: string;
};

function siteOrigin(value: string): string {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTP(S) URL.');
  url.protocol = 'https:';
  return url.origin;
}

export const siteConfig: SiteConfig = {
  name: 'Idea Bulut Solutions',
  shortName: 'Idea Bulut',
  siteUrl: siteOrigin(process.env.NEXT_PUBLIC_SITE_URL || 'https://ideabulut.com'),
  defaultDescription: 'Salesforce DevOps, Marketing Cloud migration, Claude AI and custom software, delivered ready to run. Book a free 15-minute call.',
  logo: '/images/brand/logo-mark.svg',
  defaultSocialImage: '/opengraph-image.png',
  areaServed: ['Spain', 'Türkiye', 'United Kingdom', 'United States'],
  socialProfiles: { linkedin: 'https://www.linkedin.com/company/idea-bulut-solutions', github: 'https://github.com/IdeaBulutSolutions' },
  contactEmail: 'info@ideabulut.com',
  legalName: 'Idea Bulut Solutions SL',
  registeredAddress: 'Madrid, Spain',
  telephone: '',
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbwOlN3zIC57nIYIDac4EZt7bwk_2Lv9K1UueuwRA9ExABqB9QKKsQZMzB39xbkryaAO5A/exec',
  turnstileSiteKey: '0x4AAAAAADgYhvLDHRAXaskw',
  ga4Id: 'G-QZS1P19693',
};

// Pages are exported as `about/index.html` and served at `/about/`, so page URLs end in a slash.
// Files (`/feed.xml`, `/images/x.png`) and external URLs are returned unchanged.
export function absoluteUrl(path = ''): string {
  const url = new URL(path, `${siteConfig.siteUrl}/`);
  if (url.origin === siteConfig.siteUrl && !url.pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(url.pathname)) url.pathname += '/';
  return url.href;
}
