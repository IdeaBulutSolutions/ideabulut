import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui/icons';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { InnerCta } from '@/components/sections/inner-cta';
import { servicesIndex } from '@/content/pages/services';
import { getSeoPage } from '@/lib/seo';

export function ServiceIndex() {
  const content = servicesIndex;
  return <main className="service-page sp-index">
    <section className="sp-hero sp-hero-index" aria-labelledby="sp-title"><div className="container">
      <Breadcrumbs items={[{ label: getSeoPage('/').breadcrumbLabel, href: '/' }]} current={content.breadcrumb} />
      <div className="sp-hero-grid">
        <div><p className="eyebrow">{content.eyebrow}</p><h1 id="sp-title">{content.heading}</h1></div>
        <div className="sp-hero-logo">
          <Image src="/images/brand/new-release-icon.png" alt="New release" width={1620} height={1620} sizes="(max-width: 850px) 180px, 240px" priority />
        </div>
      </div>
    </div></section>
    <section className="sp-section sp-white" aria-labelledby="sp-goals"><div className="container">
      <div className="sp-goals-head"><h2 id="sp-goals">{content.goalsHeading}</h2><p className="sp-body">{content.goalsIntro}</p></div>
      <div className="sp-goal-list">{content.goals.map((item, index) => <Link href={item.href} key={item.href} className="sp-goal">
        <span className="sp-goal-number">{String(index + 1).padStart(2, '0')}</span><strong>{item.practice}</strong><span className="sp-goal-practice">{item.goal}</span><Icon name="arrow" />
      </Link>)}</div>
    </div></section>
    <section className="sp-section sp-soft" aria-labelledby="sp-standards"><div className="container">
      <h2 id="sp-standards">{content.principlesHeading}</h2>
      <div className="sp-principles">{content.principles.map(item => <div className="sp-principle" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
    </div></section>
    <InnerCta buttonLabel={content.ctaLabel} />
  </main>;
}