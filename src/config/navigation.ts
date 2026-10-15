import type { IconName } from '@/components/ui/icons';
import { siteConfig } from '@/config/site';

export const companyLinks = [
  ['Products', '/products'], ['About', '/about'], ['Blog', '/blog'], ['Contact', '/contact'],
] as const;

export const servicesNavigation: {
  eyebrow: string;
  heading: string;
  description: string;
  allLabel: string;
  links: { name: string; goal: string; href: string; icon: IconName; showInFooter?: boolean; showInDesktopMenu?: boolean }[];
} = {
  eyebrow: 'SERVICES',
  heading: 'Four practices. One standard.',
  description: 'Built right, handed over ready to run.',
  allLabel: 'Explore all services',
  links: [
    { name: 'Salesforce DevOps', goal: 'Release Salesforce changes with confidence.', href: '/services/salesforce-devops', icon: 'cloud-outline' },
    { name: 'Marketing Cloud Migration', goal: 'Move to Marketing Cloud Next, keeping what works.', href: '/services/marketing-cloud-migration', icon: 'swap' },
    { name: 'AI', goal: 'Put AI to work inside your processes.', href: '/services/ai', icon: 'chip' },
    { name: 'Custom Software', goal: "Build something that doesn't exist yet.", href: '/services/custom-software', icon: 'cube' },
  ],
};

export const footerGroups = [
  { title: 'SERVICES', links: servicesNavigation.links.filter(service => service.showInFooter !== false).map(service => [service.href === '/services/ai' ? 'Artificial Intelligence' : service.name, service.href]) },
  { title: 'COMPANY', links: companyLinks },
  { title: 'LEGAL', links: [['Privacy Policy', '/privacy'], ['Terms of Service', '/terms-of-service']] },
  { title: 'CONNECT', links: [
    ...(siteConfig.contactEmail ? [[siteConfig.contactEmail, `mailto:${siteConfig.contactEmail}`]] : []),
    ...(siteConfig.socialProfiles.linkedin ? [['LinkedIn', siteConfig.socialProfiles.linkedin]] : []),
    ...(siteConfig.socialProfiles.github ? [['GitHub', siteConfig.socialProfiles.github]] : []),
  ] },
];