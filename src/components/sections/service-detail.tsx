import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ServiceSchema } from '@/components/seo/service-schema';
import { InnerCta } from '@/components/sections/inner-cta';
import { DevopsPlatformComparison } from '@/components/sections/devops-platform-comparison';
import { CustomSoftwareRunning } from '@/components/sections/custom-software-running';
import { MigrationInventory } from '@/components/sections/migration-inventory';
import { ServiceIntro } from '@/components/sections/service-intro';
import { ServiceCapabilities } from '@/components/sections/service-capabilities';
import { ServicePrinciples } from '@/components/sections/service-principles';
import { ServiceProcess } from '@/components/sections/service-process';
import { ServiceExperience } from '@/components/sections/service-experience';
import { RelatedReading } from '@/components/blog/related-reading';
import { Faq } from '@/components/sections/faq';
import { servicesIndex, type ServiceContent } from '@/content/pages/services';
import { getSeoPage } from '@/lib/seo';

export function ServiceDetail({ content, heroGraphic }: { content: ServiceContent; heroGraphic?: ReactNode }) {
  const isMigration = content.path === '/services/marketing-cloud-migration';
  const isAi = content.path === '/services/ai';
  const isDevops = content.path === '/services/salesforce-devops';
  return <main className={`service-page sp-${isMigration ? 'migration' : isAi ? 'ai' : isDevops ? 'devops' : 'custom'}`}>
    <ServiceSchema name={content.breadcrumb} description={content.metaDescription} path={content.path} />
    <section className="sp-hero" aria-labelledby="sp-title"><div className="container">
      <Breadcrumbs items={[{ label: getSeoPage('/').breadcrumbLabel, href: '/' }, { label: servicesIndex.breadcrumb, href: servicesIndex.path }]} current={content.breadcrumb} />
      <div className="sp-hero-grid"><div><p className="eyebrow">{content.eyebrow}</p><h1 id="sp-title">{content.heading}</h1></div>{heroGraphic ?? <p className="sp-hero-sub">{content.sub}</p>}</div>
    </div></section>
    {content.notice && <div className="container"><div className="sp-notice"><strong>{content.notice.label}</strong><p>{content.notice.body}</p></div></div>}
    <ServiceIntro section={content.intro} checks={content.checks} soft={isMigration || isAi} />
    <ServiceCapabilities data={content.capabilities} body={isMigration ? content.statement?.body : undefined} soft={!isAi && !isMigration} />
    {isAi && content.principles && <ServicePrinciples data={content.principles} soft />}
    {isDevops && content.statement && <DevopsPlatformComparison section={content.statement} />}
    <ServiceProcess data={content.process} soft={isDevops || isMigration} />
    {isMigration ? <MigrationInventory section={content.experience} /> : content.path === '/services/custom-software' ? <CustomSoftwareRunning section={content.experience} /> : <ServiceExperience data={content.experience} product={content.product} soft={!isDevops && !isMigration} />}
    <Faq items={content.faq.items} soft={isDevops || isMigration} />
    <RelatedReading path={content.path} />
    <InnerCta buttonLabel={content.ctaLabel} />
  </main>;
}