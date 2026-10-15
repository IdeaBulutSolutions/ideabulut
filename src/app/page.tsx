import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroVisual } from '@/components/sections/hero-visual';
import { PipelineDiagram } from '@/components/sections/pipeline-diagram';
import { Icon, type IconName } from '@/components/ui/icons';
import { BrandButton } from '@/components/ui/brand-button';
import { ProductCarousel } from '@/components/products/product-carousel';
import Image from 'next/image';
import { getAllProducts } from '@/lib/content/products';
import { createPageMetadata, getSeoPage } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(getSeoPage('/'));

const brandWords = [
  ['Intelligent.', 'Think before building.'], ['Delivery.', 'Turn strategy into working systems.'],
  ['Engineered.', 'Build with technical precision.'], ['At scale.', 'Design for what comes next.'],
];
const pills: { title: string; icon: IconName; color?: string }[] = [
  { title: 'Integrations and APIs', icon: 'link' },
  { title: 'Internal tools and portals', icon: 'window', color: 'blue' },
  { title: 'Automation and data pipelines', icon: 'swap' },
  { title: 'Developer and release tooling', icon: 'code', color: 'navy' },
  { title: 'AI agents and skills', icon: 'chip' },
  { title: 'Custom products', icon: 'cube', color: 'tint' },
];
const practices: { name: string; description: string; href: string; icon: IconName }[] = [
  { name: 'Marketing Cloud Migration', description: 'Already on ExactTarget? We move you to Marketing Cloud Next. Migration only, no new Engagement builds.', href: '/services/marketing-cloud-migration', icon: 'swap' },
  { name: 'AI', description: 'Custom Claude skills, agents and automation for delivery teams and internal processes.', href: '/services/ai', icon: 'chip' },
  { name: 'Custom Software', description: 'Integrations, internal tools and custom products, built around how your team works and maintained for the long term.', href: '/services/custom-software', icon: 'cube' },
];
const reasons: { name: string; description: string; icon: IconName; color: string }[] = [
  { name: 'Senior hands', description: '12+ years of Salesforce delivery at founder level.', icon: 'person', color: '' },
  { name: 'Engineering first', description: 'We build our own products, like Toolbelt for Copado.', icon: 'code', color: 'navy' },
  { name: 'Recognised', description: 'Salesforce Select Partner and Copado Technical Partner.', icon: 'award', color: 'orange' },
];

export default function HomePage() {
  const featuredProducts = getAllProducts().filter(product => product.featured)
    .sort((a, b) => Number(b.slug === 'retarget') - Number(a.slug === 'retarget'));
  return <main className="home-page">
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero-main">
        <div className="hero-copy">
          <p className="eyebrow">IDEA BULUT SOLUTIONS</p>
          <h1 id="hero-heading">If you can imagine the software, we can <span>engineer it.</span></h1>
          <p className="hero-sub">Custom software and Salesforce delivery for teams that need it built right, and handed over ready to run.</p>
          <BrandButton href="/book-a-call" arrow>Book a free 15-min call</BrandButton>
          <div className="partner-badges"><span className="partner-badge"><Image className="partner-logo" src="/images/brand/salesforce-logo.png" alt="" width={28} height={20} sizes="28px" />Salesforce Select Partner</span><span className="partner-badge"><Image className="partner-logo" src="/images/products/copado-logo.png" alt="" width={22} height={22} sizes="22px" />Copado Technical Partner</span></div>
        </div>
        <HeroVisual />
      </div>
      <div className="brand-strip"><div className="container brand-strip-inner">{brandWords.map(([word, line]) => <div className="brand-item" key={word}><div className="brand-word">{word}</div><p>{line}</p></div>)}</div></div>
    </section>

    <section className="section soft" id="build" aria-labelledby="build-heading"><div className="container">
      <div className="section-heading"><div><p className="eyebrow">CUSTOM SOFTWARE</p><h2 id="build-heading" className="section-title">When the platform isn&apos;t enough, we build the rest.</h2></div><p className="section-intro">Salesforce and Copado teams hit the limits of off-the-shelf tools. We build the custom software around them, and beyond them.</p></div>
      <div className="software-pills">{pills.map(pill => <div className={`software-pill ${pill.color ?? ''}`} key={pill.title}><span className="pill-icon"><Icon name={pill.icon} /></span>{pill.title}</div>)}</div>
      <div className="software-bottom"><p>Have a problem no tool solves? Describe it and we will scope what to build.</p><Link className="text-link" href="/contact">Tell us what you need <Icon name="arrow" className="arrow-svg" /></Link></div>
    </div></section>

    <section className="section practices" id="services" aria-labelledby="practices-heading"><div className="container">
      <div className="section-heading"><div><p className="eyebrow">SPECIALIST PRACTICES</p><h2 id="practices-heading" className="section-title">Where we go deepest.</h2></div><p className="section-intro">Beyond custom software, we run specialist practices in Salesforce delivery, migration and applied AI.</p></div>
      <Link className="practice-feature" href="/services/salesforce-devops"><span className="feature-icon"><Icon name="cloud" /></span><div className="feature-copy"><h3>Salesforce DevOps</h3><p>Release pipelines, environment strategy and CI/CD with Copado and GitHub Actions. We implement or optimise your Copado setup.</p><div className="feature-tags">{['Copado', 'GitHub Actions', 'CI/CD', 'Environment strategy'].map(tag => <span key={tag}>{tag}</span>)}</div></div><span className="feature-arrow"><Icon name="arrow" /></span></Link>
      <div className="practice-grid">{practices.map(practice => <Link className="practice-card" href={practice.href} key={practice.name}><div><span className="practice-icon"><Icon name={practice.icon} /></span><h3>{practice.name}</h3><p>{practice.description}</p></div><span className="text-link">Learn more <Icon name="arrow" className="arrow-svg" /></span></Link>)}</div>
    </div></section>

    <section className="section soft" id="why" aria-labelledby="why-heading"><div className="container"><div className="why-heading"><p className="eyebrow">WHY IDEA BULUT</p><h2 id="why-heading" className="section-title">Specialist depth, with the range to build anything.</h2></div><div className="why-grid">{reasons.map(reason => <div key={reason.name}><span className={`why-icon ${reason.color}`}><Icon name={reason.icon} /></span><h3>{reason.name}</h3><p>{reason.description}</p></div>)}</div></div></section>

    <section className="section devops-section" id="devops" aria-labelledby="devops-heading"><div className="container"><div className="section-heading"><div><p className="eyebrow">SALESFORCE DEVOPS</p><h2 id="devops-heading" className="section-title">Deployments that<br />just work.</h2></div><div className="devops-right"><p className="section-intro">We design the pipeline from commit to production, and set up Copado and GitHub Actions so releases stop depending on one person.</p><Link className="text-link" href="/services/salesforce-devops">Explore Salesforce DevOps <Icon name="arrow" className="arrow-svg" /></Link></div></div><PipelineDiagram /></div></section>

    <section className="section soft" id="products" aria-labelledby="products-heading"><div className="container products-layout"><div className="products-copy"><p className="eyebrow">PRODUCTS</p><h2 id="products-heading" className="section-title">We don&apos;t just implement. We build.</h2><p>Every Idea Bulut product is built by the same team that delivers Salesforce projects.</p><div className="product-lines"><div><Icon name="cube" />Built by the team that delivers</div></div></div><ProductCarousel products={featuredProducts} /></div></section>

    <section className="cta-section" id="contact" aria-labelledby="contact-heading"><div className="container"><div className="cta-panel"><div><h2 id="contact-heading">Got something you need built?</h2><p>Tell us the problem. We&apos;ll work out the architecture behind it.</p><BrandButton href="/book-a-call" arrow>Scope your project</BrandButton></div><div className="cta-flow" aria-hidden="true"><span><Icon name="branch" /></span><i /><span><Icon name="layers" /></span><i /><span><Icon name="upload" /></span></div></div></div></section>
  </main>;
}