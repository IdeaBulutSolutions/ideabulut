import { ServiceIndex } from '@/components/sections/service-index';
import { servicesIndex } from '@/content/pages/services';
import { createPageMetadata, getSeoPage } from '@/lib/seo';

export const metadata = createPageMetadata({
  ...getSeoPage(servicesIndex.path),
  title: servicesIndex.title,
  description: servicesIndex.metaDescription,
  heading: servicesIndex.heading,
});

export default function ServicesPage() {
  return <ServiceIndex />;
}