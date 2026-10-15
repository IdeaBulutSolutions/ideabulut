import type { Metadata } from 'next';
import { LegalDocument } from '@/components/sections/legal-document';
import { termsOfService } from '@/content/pages/legal';
import { createPageMetadata, getSeoPage } from '@/lib/seo';

export const metadata: Metadata = {
  ...createPageMetadata(getSeoPage('/terms-of-service')),
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function TermsOfServicePage() {
  return <LegalDocument document={termsOfService} />;
}
