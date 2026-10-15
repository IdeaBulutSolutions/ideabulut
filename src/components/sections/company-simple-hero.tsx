import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { companyNavigation, type CompanyIntro } from '@/content/pages/company';

export function CompanySimpleHero({ page }: { page: CompanyIntro }) {
  return <header className="cp-simple-hero"><div className="container">
    <Breadcrumbs items={[{ label: companyNavigation.home, href: '/' }]} current={page.breadcrumb} />
    <p className="eyebrow">{page.eyebrow}</p><h1>{page.heading}</h1><p className="cp-hero-sub">{page.sub}</p>
  </div></header>;
}
