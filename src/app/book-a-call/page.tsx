import type { Metadata } from 'next';
import { BrandButton } from '@/components/ui/brand-button';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { InnerCta } from '@/components/sections/inner-cta';
import { BookingCalendar } from '@/components/sections/booking-calendar';
import { createPageMetadata, getSeoPage } from '@/lib/seo';
import '@/styles/booking-page.css';

export const metadata: Metadata = createPageMetadata(getSeoPage('/book-a-call'));

const steps = [
  { title: 'You pick a time.', description: 'Choose a slot that works for you.' },
  { title: 'We talk it through.', description: '15 minutes by video, free.' },
  { title: 'You get clear next steps.', description: 'Whether or not we work together.' },
];

export default function BookACallPage() {
  return <main className="contact-page">
    <section className="contact-hero" aria-labelledby="book-title">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="Book a call" />
        <p className="eyebrow">FREE DISCOVERY CALL</p>
        <h1 id="book-title">Let&apos;s start with a 15-minute call.</h1>
        <p className="contact-hero-sub">Tell us what you&apos;re working on. You&apos;ll leave with clear next steps.</p>
      </div>
    </section>
    <section className="contact-content" aria-labelledby="book-heading">
      <div className="container contact-layout">
        <div className="contact-form-panel booking-panel" id="book">
          <h2 id="book-heading">Pick a time that suits you.</h2>
          <p className="booking-note">Times are shown in your local time zone.</p>
          <BookingCalendar />
        </div>
        <aside className="contact-next" aria-labelledby="book-next-heading">
          <p className="eyebrow">NEXT STEPS</p>
          <h2 id="book-next-heading">What happens next</h2>
          <ol>{steps.map((step, index) => <li key={step.title}>
            <span className="contact-step-number">0{index + 1}</span>
            <div><h3>{step.title}</h3><p>{step.description}</p></div>
          </li>)}</ol>
          <div className="contact-region booking-message">
            <strong>Prefer to write?</strong>
            <span>That works too.</span>
            <BrandButton href="/contact" arrow>Send us a message</BrandButton>
          </div>
        </aside>
      </div>
    </section>
    <InnerCta heading="Ready when you are." sub="Pick a time and tell us what you have in mind." buttonLabel="Pick a time" buttonHref="#book" />
  </main>;
}
