import { ServiceDetail } from '@/components/sections/service-detail';
import { servicePages } from '@/content/pages/services';
import { createPageMetadata, getSeoPage } from '@/lib/seo';
import Image from 'next/image';

const content = servicePages['/services/ai'];
export const metadata = createPageMetadata(getSeoPage(content.path));

export default function AiPage() {
  return <ServiceDetail content={content} heroGraphic={
    <div className="sp-hero-logo">
      <Image src="/images/brand/claude-logo-white.png" alt="Claude" width={1547} height={397} sizes="(max-width: 850px) 220px, 300px" priority />
    </div>
  } />;
}