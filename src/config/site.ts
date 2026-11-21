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
  /** Spanish tax ID (NIF, formerly CIF). With the address and registry entry, required on the site by LSSI-CE art. 10. */
  taxId: string;
  registeredAddress: { streetAddress: string; postalCode: string; addressLocality: string; addressCountry: string };
  /** Registro Mercantil entry, shown in the Terms of Service (LSSI-CE art. 10). */
  registryEntry: string;
  telephone: string;
  /** Google Apps Script Web App that stores contact-form leads (see apps-script/README.md). */
  appsScriptUrl: string;
  /** Cloudflare Turnstile site key; the matching secret lives only in the Apps Script. */
  turnstileSiteKey: string;
  /** Google Analytics 4 Measurement ID. Loaded only after the visitor accepts analytics cookies; empty disables it. */
  ga4Id: string;
  /** Salesforce Account Engagement (Pardot) tracking. Loaded only after the visitor accepts marketing cookies; empty accountId disables it. */
  pardot: { accountId: string; campaignId: string; trackerHost: string };
  /** Pardot Form Handler "Idea Bulut Website - Contact Us". With marketing consent the contact form also posts here from the browser, so the lead is linked to the pages they viewed; empty disables that. */
  pardotFormHandlerUrl: string;
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
  legalName: 'Idea Bulut Solutions, S.L.',
  taxId: 'B72917412',
  registeredAddress: { streetAddress: 'Paseo de la Castellana 194, Baja B', postalCode: '28046', addressLocality: 'Madrid', addressCountry: 'ES' },
  registryEntry: 'Registro Mercantil de Madrid, Tomo 44472, Folio 120, Sección 8, Hoja M-783612, Inscripción 1ª',
  telephone: '',
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbziFYAJ5YKRL3lR1aReH1uNxvq6MH7DWzKTEB447B7bCLQ93OJvTKdcwrMFvBJNBH1Q0w/exec',
  turnstileSiteKey: '0x4AAAAAADgYhvLDHRAXaskw',
  ga4Id: 'G-QZS1P19693',
  pardot: { accountId: '1135371', campaignId: '130455', trackerHost: 'go.ideabulut.com' },
  pardotFormHandlerUrl: 'https://go.ideabulut.com/l/1134371/2026-11-17/3hjvgp',
};

/** One-line registered address, e.g. for legal pages. Pass `withCountry: false` for a shorter form. */
export function formatAddress({ withCountry = true } = {}): string {
  const { streetAddress, postalCode, addressLocality, addressCountry } = siteConfig.registeredAddress;
  const country = withCountry ? `, ${new Intl.DisplayNames(['en'], { type: 'region' }).of(addressCountry)}` : '';
  return `${streetAddress}, ${postalCode} ${addressLocality}${country}`;
}

// Pages are exported as `about/index.html` and served at `/about/`, so page URLs end in a slash.
// Files (`/feed.xml`, `/images/x.png`) and external URLs are returned unchanged.
export function absoluteUrl(path = ''): string {
  const url = new URL(path, `${siteConfig.siteUrl}/`);
  if (url.origin === siteConfig.siteUrl && !url.pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(url.pathname)) url.pathname += '/';
  return url.href;
}
