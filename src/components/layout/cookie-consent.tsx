'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import { cookieConsent as copy } from '@/content/pages/shared';

declare global {
  interface Window {
    dataLayer?: unknown[];
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

// Same storage key as the previous site, so returning visitors keep the choice they made there.
const storageKey = 'ib-analytics-consent';
const openEvent = 'ib:cookie-settings';
const id = siteConfig.ga4Id;

function readChoice(): string | null {
  try { return localStorage.getItem(storageKey); } catch { return null; }
}
function saveChoice(choice: 'granted' | 'denied') {
  try { localStorage.setItem(storageKey, choice); } catch { /* storage blocked: ask again next visit */ }
}

// GA4 loads only after consent. Enhanced measurement records client-side navigations as page views.
function loadAnalytics() {
  window[`ga-disable-${id}`] = false;
  if (window.dataLayer) return;
  window.dataLayer = [];
  // gtag.js expects the `arguments` object itself, not an array.
  // eslint-disable-next-line prefer-rest-params
  const gtag: (...args: unknown[]) => void = function () { window.dataLayer!.push(arguments); };
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
}

// Withdrawing consent stops further hits and removes the analytics cookies already set.
function stopAnalytics() {
  window[`ga-disable-${id}`] = true;
  const domain = location.hostname.replace(/^www\./, '');
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_')) {
      for (const scope of ['', `; domain=${domain}`, `; domain=.${domain}`]) document.cookie = `${name}=; Max-Age=0; path=/${scope}`;
    }
  }
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const choice = readChoice();
    if (choice === 'granted') loadAnalytics();
    else if (choice !== 'denied') setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(openEvent, reopen);
    return () => window.removeEventListener(openEvent, reopen);
  }, []);

  if (!open) return null;
  const choose = (choice: 'granted' | 'denied') => {
    saveChoice(choice);
    if (choice === 'granted') loadAnalytics(); else stopAnalytics();
    setOpen(false);
  };
  return <div className="cookie-banner" role="dialog" aria-label={copy.label} aria-live="polite">
    <p>{copy.text} <Link href="/privacy">{copy.privacyLink}</Link></p>
    <div className="cookie-banner-actions">
      <button type="button" className="cookie-banner-decline" onClick={() => choose('denied')}>{copy.decline}</button>
      <button type="button" className="brand-button" onClick={() => choose('granted')}>{copy.accept}</button>
    </div>
  </div>;
}

export function CookieSettingsButton() {
  if (!id) return null;
  return <button type="button" className="footer-cookie-settings" onClick={() => window.dispatchEvent(new Event(openEvent))}>{copy.settings}</button>;
}
