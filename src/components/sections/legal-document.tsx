import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { InnerCta } from '@/components/sections/inner-cta';
import { companyNavigation } from '@/content/pages/company';
import type { LegalDocumentContent } from '@/content/pages/legal';
import { withoutLegalPlaceholders } from '@/lib/content/legal';

export function LegalDocument({ document }: { document: LegalDocumentContent }) {
  return <main className="company-page">
    <div className="cp-legal"><div className="container">
      <Breadcrumbs items={[{ label: companyNavigation.home, href: '/' }]} current={document.title} />
      <article className="cp-legal-content">
        <p className="eyebrow">LEGAL</p>
        <h1>{document.title}</h1>
        {/^\d{4}-\d{2}-\d{2}$/.test(document.lastUpdated) && <p className="cp-legal-updated">Last updated: {document.lastUpdated}</p>}
        <div className="cp-legal-body">
          <ReactMarkdown skipHtml components={{
            a: ({ href, children }) => href?.startsWith('/')
              ? <Link href={href}>{children}</Link>
              : href?.startsWith('mailto:') ? <a href={href}>{children}</a>
              : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
          }}>{withoutLegalPlaceholders(document.body)}</ReactMarkdown>
        </div>
      </article>
    </div></div>
    <InnerCta />
  </main>;
}
