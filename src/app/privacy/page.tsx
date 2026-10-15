import type { Metadata } from 'next';
import { LegalDocument } from '@/components/sections/legal-document';
import { privacyPolicy } from '@/content/pages/legal';
import { createPageMetadata, getSeoPage } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(getSeoPage('/privacy'));

export default function PrivacyPage() {
  return <LegalDocument document={privacyPolicy} />;
}