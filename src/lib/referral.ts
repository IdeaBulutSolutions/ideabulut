import { siteConfig } from '@/config/site';

export type ReferralPlacement = 'home' | 'products' | 'product-page';

/**
 * Adds UTM parameters to an outbound link so the destination's analytics attribute the visit to
 * this site (e.g. re:target's GA/Pardot). Internal links are returned unchanged. Only used for
 * clickable links; structured data and llms.txt keep the clean URL from the product's Markdown.
 */
export function withReferral(href: string, placement: ReferralPlacement): string {
  if (!/^https:\/\//.test(href)) return href;
  const url = new URL(href);
  url.searchParams.set('utm_source', new URL(siteConfig.siteUrl).hostname);
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'website');
  url.searchParams.set('utm_content', placement);
  return url.toString();
}
