import { absoluteUrl, siteConfig } from '@/config/site';
import type { BlogPost } from '@/lib/content/blog';
import type { FaqItem, ProductContent } from '@/lib/content/schemas';

export type JsonLdNode = { '@type': string; [key: string]: unknown };
const context = { '@context': 'https://schema.org' } as const;

export const organizationSchema: JsonLdNode = {
  ...context, '@type': 'Organization', '@id': `${siteConfig.siteUrl}/#organization`,
  name: siteConfig.name, url: siteConfig.siteUrl, logo: absoluteUrl(siteConfig.logo),
  description: siteConfig.defaultDescription, areaServed: siteConfig.areaServed,
  sameAs: Object.values(siteConfig.socialProfiles).filter(Boolean),
  ...(siteConfig.legalName ? { legalName: siteConfig.legalName } : {}),
  ...(siteConfig.registeredAddress ? { address: siteConfig.registeredAddress } : {}),
  ...(siteConfig.telephone ? { telephone: siteConfig.telephone } : {}),
  ...(siteConfig.contactEmail ? { contactPoint: { '@type': 'ContactPoint', contactType: 'customer enquiries', email: siteConfig.contactEmail } } : {}),
};
export const organizationReference = { '@id': `${siteConfig.siteUrl}/#organization` };
export const websiteSchema: JsonLdNode = {
  ...context, '@type': 'WebSite', '@id': `${siteConfig.siteUrl}/#website`,
  name: siteConfig.name, url: siteConfig.siteUrl, publisher: organizationReference, inLanguage: 'en',
};

export function breadcrumbSchema(items: { label: string; href: string }[]): JsonLdNode {
  return { ...context, '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({
    '@type': 'ListItem', position: index + 1, name: item.label,
    ...(item.href ? { item: absoluteUrl(item.href) } : {}),
  })) };
}
export function faqSchema(items: readonly FaqItem[]): JsonLdNode {
  return { ...context, '@type': 'FAQPage', mainEntity: items.map(item => ({
    '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })) };
}
export function serviceSchema(name: string, description: string, path: string): JsonLdNode {
  return { ...context, '@type': 'Service', name, description, url: absoluteUrl(path),
    serviceType: name, areaServed: siteConfig.areaServed, provider: organizationReference };
}
export function blogPostingSchema(post: BlogPost): JsonLdNode {
  return { ...context, '@type': 'BlogPosting', headline: post.title, description: post.excerpt,
    image: absoluteUrl(post.featuredImage), datePublished: `${post.date}T00:00:00Z`,
    dateModified: `${post.updated ?? post.date}T00:00:00Z`, author: organizationReference,
    publisher: organizationReference, mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`) };
}
export function itemListSchema(items: { name: string; url: string }[]): JsonLdNode {
  return { ...context, '@type': 'ItemList', itemListElement: items.map((item, index) => ({
    '@type': 'ListItem', position: index + 1, name: item.name, url: absoluteUrl(item.url),
  })) };
}
export function softwareSchema(product: ProductContent): JsonLdNode {
  return { ...context, '@type': 'SoftwareApplication', name: product.name,
    description: product.description, applicationCategory: 'DeveloperApplication',
    publisher: organizationReference, url: absoluteUrl(`/products/${product.slug}`),
    ...(product.tags.some(tag => tag.toLowerCase() === 'free') ? { offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' } } : {}),
  };
}
export function contactPageSchema(): JsonLdNode {
  return { ...context, '@type': 'ContactPage', name: 'Contact Idea Bulut Solutions', url: absoluteUrl('/contact'), about: organizationReference };
}
