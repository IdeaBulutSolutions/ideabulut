import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/config/site';
export { organizationSchema, websiteSchema } from '@/lib/seo/structured-data';

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  heading: string;
  breadcrumbLabel: string;
  noindex?: boolean;
};

export const seoPages: SeoPage[] = [
  { path: '/', title: 'Salesforce DevOps, Custom Software and AI | Idea Bulut', description: siteConfig.defaultDescription, heading: 'If you can imagine the software, we can engineer it.', breadcrumbLabel: 'Home' },
  { path: '/services', title: 'Salesforce and Software Consulting Services | Idea Bulut', description: 'Salesforce DevOps, Marketing Cloud migration, Claude AI and custom software. Explore four practices, built right and handed over ready to run.', heading: 'Built right. Ready to run.', breadcrumbLabel: 'Services' },
  { path: '/services/salesforce-devops', title: 'Salesforce DevOps Consulting | Copado & GitHub Actions | Idea Bulut', description: 'Predictable Salesforce releases, from commit to production. We design your pipeline and set up Copado and GitHub Actions. Book a free 15-minute call.', heading: 'Salesforce releases your team can run without heroics.', breadcrumbLabel: 'Salesforce DevOps' },
  { path: '/services/marketing-cloud-migration', title: 'Marketing Cloud Migration: ExactTarget to Marketing Cloud Next | Idea Bulut', description: 'Move from ExactTarget to Marketing Cloud Next, keeping everything that works. We audit, map, rebuild and validate before cut-over. Book a free 15-minute call.', heading: 'Move from ExactTarget to Marketing Cloud Next, keeping everything that works.', breadcrumbLabel: 'Marketing Cloud Migration' },
  { path: '/services/ai', title: 'Claude AI Solutions: Custom Skills, Agents and Automation | Idea Bulut', description: 'Custom Claude skills, AI agents and automation built around your process, with people in control. Book a free 15-minute discovery call.', heading: 'AI that does real work in your process, built around Claude.', breadcrumbLabel: 'AI' },
  { path: '/services/custom-software', title: 'Custom Software Development and Integrations | Idea Bulut', description: 'Integrations, internal tools, automation, AI and custom products built around your business and handed over ready to run. Book a free 15-minute call.', heading: 'Custom software, built right and handed over ready to run.', breadcrumbLabel: 'Custom Software' },
  { path: '/products', title: 'Software Products: Toolbelt and re:target | Idea Bulut', description: 'Explore Toolbelt for Copado and re:target by Idea Bulut. Practical software built from real Salesforce delivery and Marketing Cloud migration work.', heading: 'Products by Idea Bulut.', breadcrumbLabel: 'Products' },
  { path: '/about', title: 'Salesforce and Software Engineering Team | Idea Bulut', description: 'Meet Idea Bulut Solutions: Salesforce specialists and software engineers working with teams across Spain, Türkiye, the UK and the US.', heading: 'We build things that hold up.', breadcrumbLabel: 'About' },
  { path: '/blog', title: 'Salesforce DevOps, API and AI Guides | Idea Bulut Blog', description: 'Practical Salesforce DevOps, API, Copado, Marketing Cloud and AI guides from the Idea Bulut team. Insights from real software delivery work.', heading: 'The Idea Bulut Blog.', breadcrumbLabel: 'Blog' },
  { path: '/contact', title: 'Contact Our Salesforce and Software Team | Idea Bulut', description: 'Contact Idea Bulut Solutions about Salesforce DevOps, Marketing Cloud migration, Claude AI, custom software or product partnerships.', heading: "Let's build something that works.", breadcrumbLabel: 'Contact' },
  { path: '/book-a-call', title: 'Book a Free 15-Minute Discovery Call | Idea Bulut', description: 'Book a free 15-minute call with Idea Bulut to talk through your Salesforce, DevOps, AI or software project.', heading: "Let's start with a 15-minute call.", breadcrumbLabel: 'Book a call' },
  { path: '/privacy', title: 'Privacy Policy | Idea Bulut', description: 'Read the privacy information for the Idea Bulut Solutions website, enquiries and discovery-call bookings.', heading: 'Privacy Policy', breadcrumbLabel: 'Privacy' },
  { path: '/terms-of-service', title: 'Website Terms of Service | Idea Bulut', description: 'Read the terms for using the Idea Bulut Solutions website and information about our software products and consulting services.', heading: 'Terms of Service', breadcrumbLabel: 'Terms of Service', noindex: true },
];

export const pagePaths = seoPages.filter(page => !page.noindex).map(page => page.path);
export function getSeoPage(path: string): SeoPage {
  const page = seoPages.find(item => item.path === path);
  if (!page) throw new Error(`SEO metadata is not configured for route: ${path}`);
  return page;
}

export function createPageMetadata(page: SeoPage, image = siteConfig.defaultSocialImage): Metadata {
  const canonical = absoluteUrl(page.path);
  const socialImage = absoluteUrl(image);
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical },
    robots: { index: !page.noindex, follow: true, googleBot: { index: !page.noindex, follow: true, 'max-image-preview': 'large' } },
    openGraph: { type: 'website', siteName: siteConfig.name, title: page.title, description: page.description, url: canonical, images: [{ url: socialImage, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [socialImage] },
  };
}
