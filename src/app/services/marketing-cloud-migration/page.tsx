import { ServiceDetail } from '@/components/sections/service-detail';
import { servicePages } from '@/content/pages/services';
import { createPageMetadata, getSeoPage } from '@/lib/seo';
import Image from 'next/image';

const content = servicePages['/services/marketing-cloud-migration'];
export const metadata = createPageMetadata(getSeoPage(content.path));

export default function MarketingCloudMigrationPage() {
  return <ServiceDetail content={content} heroGraphic={
    <div className="sp-hero-logo">
      <Image src="/images/brand/marketing-cloud-next-icon.png" alt="Marketing Cloud Next" width={1620} height={1620} sizes="(max-width: 850px) 180px, 240px" priority />
    </div>
  } />;
}