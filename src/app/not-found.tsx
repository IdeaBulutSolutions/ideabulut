import type { Metadata } from 'next';
import Link from 'next/link';
import { companyNavigation, notFoundContent } from '@/content/pages/company';

export const metadata: Metadata = {
  title: { absolute: notFoundContent.heading },
  description: notFoundContent.sub,
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <main className="company-page cp-not-found">
    <div className="container cp-not-found-inner">
      <div>
        <h1>{notFoundContent.heading}</h1>
        <p>{notFoundContent.sub}</p>
        <nav aria-label={companyNavigation.helpfulPages} className="cp-not-found-links">
          {notFoundContent.links.map(link => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </nav>
      </div>
      <div className="cp-not-found-mark" aria-hidden="true">?</div>
    </div>
  </main>;
}