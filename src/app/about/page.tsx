import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui/icons';
import { CompanyGlyph } from '@/components/ui/company-glyph';
import { CompanyHero } from '@/components/sections/company-hero';
import { InnerCta } from '@/components/sections/inner-cta';
import { aboutContent, companyPages } from '@/content/pages/company';
import { createPageMetadata, getSeoPage } from '@/lib/seo';

const page = companyPages.about;
export const metadata: Metadata = createPageMetadata(getSeoPage('/about'));
const experienceIcons: IconName[] = ['person', 'award', 'shield', 'branch'];

export default function AboutPage() {
  return <main className="company-page cp-about">
    <CompanyHero page={page} graphic={<CompanyGlyph variant="about" />} />
    <section className="cp-section cp-about-intro" aria-labelledby="company-who">
      <div className="container cp-split">
        <div><p className="eyebrow">{aboutContent.whoEyebrow}</p><h2 id="company-who">{aboutContent.whoHeading}</h2></div>
        <p>{aboutContent.whoBody}</p>
      </div>
    </section>
    <section className="cp-section cp-soft" aria-labelledby="company-beliefs">
      <div className="container">
        <p className="eyebrow">{aboutContent.beliefEyebrow}</p>
        <h2 id="company-beliefs">{aboutContent.beliefHeading}</h2>
        <div className="cp-beliefs">{aboutContent.beliefs.map((belief, index) => <div className="cp-belief" key={belief.title}>
          <span className="cp-belief-number">0{index + 1}</span><h3>{belief.title}</h3><p>{belief.body}</p>
        </div>)}</div>
      </div>
    </section>
    <section className="cp-section" aria-labelledby="company-work">
      <div className="container cp-split">
        <div><p className="eyebrow">{aboutContent.workEyebrow}</p><h2 id="company-work">{aboutContent.workHeading}</h2></div>
        <p className="cp-lead">{aboutContent.workBody}</p>
      </div>
    </section>
    <section className="cp-section cp-soft" aria-labelledby="company-experience">
      <div className="container">
        <h2 id="company-experience">{aboutContent.experienceHeading}</h2>
        <div className="cp-experience">{aboutContent.experience.map((item, index) => <div className="cp-experience-item" key={item.title}>
          <Icon name={experienceIcons[index]} /><div><h3>{item.title}</h3><p>{item.body}</p></div>
        </div>)}</div>
      </div>
    </section>
    <section className="cp-section" aria-labelledby="company-about-products">
      <div className="container cp-split cp-about-product">
        <div><p className="eyebrow">{aboutContent.productEyebrow}</p><h2 id="company-about-products">{aboutContent.productHeading}</h2></div>
        <div><p>{aboutContent.productBody}</p><Link href="/products" className="text-link">{aboutContent.productLink} <Icon name="arrow" className="arrow-svg" /></Link></div>
      </div>
    </section>
    <InnerCta buttonLabel="Book an intro call" />
  </main>;
}