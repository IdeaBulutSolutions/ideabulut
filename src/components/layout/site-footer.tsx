import Link from 'next/link';
import { BrandLogo } from '@/components/layout/brand-logo';
import { CookieSettingsButton } from '@/components/layout/cookie-consent';
import { footerGroups as groups } from '@/config/navigation';
import Image from 'next/image';


export function SiteFooter() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div className="footer-brand"><BrandLogo /><p>Salesforce consultancy and software engineering. Release pipelines, platforms and products built to scale.</p></div>
      <nav className="footer-nav" aria-label="Footer navigation">{groups.map(group => <div className="footer-group" key={group.title}><h2>{group.title}</h2>{group.links.map(([label, href]) => href.startsWith('/')
        ? <Link href={href} key={href}>{label}</Link>
        : <a href={href} key={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}</a>)}</div>)}</nav>
    </div>
    <div className="footer-bottom">
      <div className="footer-meta"><span>© 2026 Idea Bulut Solutions</span><CookieSettingsButton /></div>
      <div className="footer-partners" aria-label="Our partners">
        <Link href="/" className="footer-partner" aria-label="Salesforce Partner — Home"><Image src="/images/brand/salesforce-partner-logo.png" alt="Salesforce Partner" width={1545} height={663} sizes="110px" /></Link>
        <Link href="/" className="footer-partner" aria-label="Copado Technical Partner — Home"><Image src="/images/brand/copado-partner-logo-white.png" alt="Copado Technical Partner" width={1620} height={512} sizes="145px" /></Link>
      </div>
    </div>
  </div></footer>;
}