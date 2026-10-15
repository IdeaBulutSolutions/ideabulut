import { ServiceDetail } from '@/components/sections/service-detail';
import { servicePages } from '@/content/pages/services';
import { createPageMetadata, getSeoPage } from '@/lib/seo';
import Image from 'next/image';

const content = servicePages['/services/salesforce-devops'];
export const metadata = createPageMetadata(getSeoPage(content.path));

export default function SalesforceDevopsPage() {
  return <ServiceDetail content={content} heroGraphic={
    <div className="sp-hero-logo">
      <Image src="/images/brand/salesforce-logo.png" alt="Salesforce" width={1547} height={1085} sizes="(max-width: 850px) 180px, 240px" priority />
    </div>
  } />;
}