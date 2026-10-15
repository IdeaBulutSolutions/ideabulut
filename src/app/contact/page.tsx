import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ContactForm } from '@/components/sections/contact-form';
import { InnerCta } from '@/components/sections/inner-cta';
import { BrandButton } from '@/components/ui/brand-button';
import { siteConfig } from '@/config/site';
import { contactPage as copy } from '@/content/pages/contact';
import { createPageMetadata, getSeoPage } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { contactPageSchema } from '@/lib/seo/structured-data';

const path = '/contact';

export const metadata: Metadata = createPageMetadata(getSeoPage(path));

export default function ContactPage() {
  return <main className="contact-page">
    <JsonLd data={contactPageSchema()} />
    <section className="contact-hero" aria-labelledby="contact-title">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="Contact" />
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="contact-title">{copy.title}</h1>
        <p className="contact-hero-sub">{copy.sub}</p>
      </div>
    </section>
    <section className="contact-content" id="contact-form" aria-labelledby="contact-form-heading">
      <div className="container contact-layout">
        <div className="contact-form-panel">
          <h2 id="contact-form-heading">{copy.formHeading}</h2>
          <ContactForm />
          <p className="contact-privacy">{copy.privacy}</p>
        </div>
        <aside className="contact-next" aria-labelledby="contact-next-heading">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="contact-next-heading">{copy.nextHeading}</h2>
          <ol>{copy.steps.map((step, index) => <li key={step.title}>
            <span className="contact-step-number">0{index + 1}</span>
            <div><h3>{step.title}</h3><p>{step.description}</p></div>
          </li>)}</ol>
          <div className="contact-region contact-call">
            <strong>Prefer to talk it through?</strong>
            <span>Book a free 15-minute call.</span>
            <BrandButton href="/book-a-call" arrow>Book a 15-min call</BrandButton>
          </div>
          <div className="contact-region contact-email">
            <strong>{copy.emailHeading}</strong>
            <span>{copy.emailBody}</span>
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            <a href={siteConfig.socialProfiles.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </aside>
      </div>
    </section>
    <InnerCta />
  </main>;
}