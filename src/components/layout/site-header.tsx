'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/icons';
import { BrandButton } from '@/components/ui/brand-button';
import { servicesNavigation } from '@/config/navigation';
import { BrandLogo } from '@/components/layout/brand-logo';
import { ServiceMenuCards } from '@/components/layout/service-menu-cards';
import { companyLinks as navigation } from '@/config/navigation';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const closeMobile = () => {
    setOpen(false);
    setMobileServicesOpen(true);
  };
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    headerRef.current?.querySelector<HTMLElement>('.mobile-menu button, .mobile-menu a')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === 'Tab') {
        const items = headerRef.current?.querySelectorAll<HTMLElement>('.brand, .menu-toggle, .mobile-menu button, .mobile-menu a');
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const desktop = window.matchMedia('(min-width: 851px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        servicesTriggerRef.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 851px)');
    const closeOnMobile = () => { if (!desktop.matches) setServicesOpen(false); };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', closeOnMobile);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', closeOnMobile);
    };
  }, [servicesOpen]);
  return <header className="site-header" ref={headerRef} onMouseLeave={() => setServicesOpen(false)}>
    <div className="container header-inner">
      <BrandLogo onClick={() => { closeMobile(); setServicesOpen(false); }} />
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="nav-services" ref={servicesRef} onMouseEnter={() => setServicesOpen(true)}>
          <div className="services-trigger" data-open={servicesOpen}>
            <Link className="services-label" href="/services" onClick={() => setServicesOpen(false)}>Services</Link>
            <button ref={servicesTriggerRef} className="services-menu-toggle" type="button" aria-label="Toggle Services menu" aria-expanded={servicesOpen} aria-controls="services-mega" onClick={() => setServicesOpen(!servicesOpen)}>
              <svg className="services-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div id="services-mega" className="services-mega" hidden={!servicesOpen}>
            <div className="container services-mega-inner">
              <div className="services-mega-heading">
                <div className="services-mega-heading-main">
                  <p className="eyebrow">{servicesNavigation.eyebrow}</p>
                  <p className="services-mega-title">{servicesNavigation.heading}</p>
                </div>
                <p className="services-mega-description">{servicesNavigation.description}</p>
              </div>
              <div className="services-mega-grid">
                <ServiceMenuCards onNavigate={() => setServicesOpen(false)} />
              </div>
              <Link href="/services" className="services-mega-explore" onClick={() => setServicesOpen(false)}>{servicesNavigation.allLabel} <Icon name="arrow" /></Link>
            </div>
          </div>
        </div>
        {navigation.map(([label, href]) => <Link key={href} href={href} onMouseEnter={() => setServicesOpen(false)} onClick={() => setServicesOpen(false)}>{label}</Link>)}
        <BrandButton href="/book-a-call" className="header-talk">Let&apos;s Talk</BrandButton>
      </nav>
      <div className="mobile-actions">
        <button className="menu-toggle" ref={toggleRef} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => { setOpen(!open); setMobileServicesOpen(true); }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">{open ? <path d="M5 5 17 17M17 5 5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}</svg>
        </button>
      </div>
    </div>
    <nav id="mobile-navigation" className="mobile-menu" hidden={!open} aria-label="Mobile navigation">
      <div className="mobile-menu-links">
        <div className="mobile-services">
          <div className="mobile-services-toggle">
            <Link className="mobile-services-label" href="/services" onClick={closeMobile}>Services</Link>
            <button className="mobile-services-menu-toggle" type="button" aria-label="Toggle Services menu" aria-controls="mobile-service-links" aria-expanded={mobileServicesOpen} onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
              <svg className="services-chevron" width="16" height="10" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div id="mobile-service-links" className="mobile-service-links" hidden={!mobileServicesOpen}>
            {servicesNavigation.links.map(service => <Link className="mobile-service-link" href={service.href} key={service.href} onClick={closeMobile}>
              <Icon name={service.icon} className="mobile-service-icon" />
              <span>{service.name}</span>
            </Link>)}
          </div>
        </div>
        {navigation.map(([label, href]) => <Link key={href} href={href} onClick={closeMobile}><span>{label}</span><Icon name="external" className="mobile-menu-arrow" /></Link>)}
      </div>
      <Link className="brand-button mobile-menu-cta" href="/book-a-call" onClick={closeMobile}>Let&apos;s Talk <Icon name="external" className="mobile-menu-arrow" /></Link>
    </nav>
  </header>;
}

export default SiteHeader;