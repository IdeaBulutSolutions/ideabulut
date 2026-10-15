import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { CompanyGlyph } from '@/components/ui/company-glyph';
import { companyNavigation, type CompanyIntro } from '@/content/pages/company';

export function CompanyHero({ page, graphic }: { page: CompanyIntro; graphic?: ReactNode }) {
  return <header className="cp-hero">
    <div className="container cp-hero-inner">
      <div>
        <Breadcrumbs items={[{ label: companyNavigation.home, href: '/' }]} current={page.breadcrumb} />
        <p className="eyebrow">{page.eyebrow}</p><h1>{page.heading}</h1><p className="cp-hero-sub">{page.sub}</p>
      </div>
      <div className="cp-hero-mark" aria-hidden="true">{graphic ?? <CompanyGlyph />}</div>
    </div>
  </header>;
}
