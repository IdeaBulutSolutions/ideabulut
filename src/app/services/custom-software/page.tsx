import { ServiceDetail } from '@/components/sections/service-detail';
import { servicePages } from '@/content/pages/services';
import { createPageMetadata, getSeoPage } from '@/lib/seo';
import Image from 'next/image';

const content = servicePages['/services/custom-software'];
export const metadata = createPageMetadata(getSeoPage(content.path));

export default function CustomSoftwarePage() {
  return <ServiceDetail content={content} heroGraphic={
    <div className="sp-hero-logo">
      <Image src="/images/brand/deploy-icon.png" alt="Custom software deployment" width={1620} height={1620} sizes="(max-width: 850px) 180px, 240px" priority />
    </div>
  } />;
}