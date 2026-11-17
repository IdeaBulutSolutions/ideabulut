'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { cookieConsent as copy } from '@/content/pages/shared';

declare global {
  interface Window {
    dataLayer?: unknown[];
    piAId?: string;
    piCId?: string;
    piHostname?: string;
    /** Defined by Pardot's pd.js; records a page view for the given URL. */
    piTracker?: (url?: string) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

type Category = 'analytics' | 'marketing';
type Consent = Record<Category, boolean>;

const storageKey = 'ib-cookie-consent';
// Analytics-only choice saved by the earlier banner (and the Jekyll site). It keeps GA running for
// visitors who accepted it, but the banner asks again because marketing is a new purpose.
const legacyKey = 'ib-analytics-consent';
const openEvent = 'ib:cookie-settings';
// Ask again after 12 months (the AEPD recommends renewing cookie consent at least every 24).
const consentMaxAge = 365 * 24 * 60 * 60 * 1000;
const { ga4Id, pardot } = siteConfig;
const categories = ([['analytics', ga4Id], ['marketing', pardot.accountId]] as const).filter(([, id]) => id).map(([category]) => category);
const none: Consent = { analytics: false, marketing: false };
const all: Consent = { analytics: true, marketing: true };

function readConsent(): { consent: Consent; answered: boolean } {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    if (saved && typeof saved === 'object') {
      const record = saved as Partial<Record<Category | 'savedAt', unknown>>;
      // Expired consent counts as none. A category added after the visitor answered counts as
      // unanswered, so the banner asks about it.
      const current = typeof record.savedAt === 'number' && Date.now() - record.savedAt < consentMaxAge;
      if (!current) return { consent: none, answered: false };
      return { consent: { analytics: record.analytics === true, marketing: record.marketing === true }, answered: categories.every(category => typeof record[category] === 'boolean') };
    }
    return { consent: { ...none, analytics: localStorage.getItem(legacyKey) === 'granted' }, answered: false };
  } catch {
    return { consent: none, answered: false };
  }
}
function saveConsent(consent: Consent) {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ ...consent, savedAt: Date.now() }));
    localStorage.removeItem(legacyKey);
  } catch { /* storage blocked: ask again next visit */ }
}

function readCookie(name: string): string {
  const match = document.cookie.split('; ').find(cookie => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : '';
}
function deleteCookies(matches: (name: string) => boolean) {
  const domain = location.hostname.replace(/^www\./, '');
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!name || !matches(name)) continue;
    for (const scope of ['', `; domain=${domain}`, `; domain=.${domain}`]) document.cookie = `${name}=; Max-Age=0; path=/${scope}`;
  }
}

// GA4. Enhanced measurement records client-side navigations as page views.
function loadAnalytics() {
  window[`ga-disable-${ga4Id}`] = false;
  if (window.dataLayer) return;
  window.dataLayer = [];
  // gtag.js expects the `arguments` object itself, not an array.
  // eslint-disable-next-line prefer-rest-params
  const gtag: (...args: unknown[]) => void = function () { window.dataLayer!.push(arguments); };
  gtag('js', new Date());
  gtag('config', ga4Id, { anonymize_ip: true });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
  document.head.appendChild(script);
}
// Withdrawing consent stops further hits and removes the analytics cookies already set.
function stopAnalytics() {
  window[`ga-disable-${ga4Id}`] = true;
  deleteCookies(name => name === '_ga' || name.startsWith('_ga_'));
}

// Salesforce Account Engagement (Pardot): the vendor snippet, loaded on consent instead of on page load.
// pd.js records the page it loads on; later client-side navigations are sent from CookieConsent.
const pardotScriptId = 'pardot-tracking';
// pd.js names its cookies after the account ID minus 1000 (visitor_id…, pi_opt_in…).
const pardotCookieSuffix = Number(pardot.accountId) - 1000;
let pardotActive = false;
function loadPardot() {
  // The visitor has just opted in through our banner. Recording that in Pardot's own opt-in cookie
  // stops Account Engagement from showing its "May we use cookies…" bar as a second question.
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `pi_opt_in${pardotCookieSuffix}=true; Max-Age=${consentMaxAge / 1000}; path=/; SameSite=Lax${secure}`;
  // Consent given again after being withdrawn on this page: pd.js is already loaded, so record the page here.
  if (document.getElementById(pardotScriptId)) { if (!pardotActive) window.piTracker?.(location.href); pardotActive = true; return; }
  pardotActive = true;
  window.piAId = pardot.accountId;
  window.piCId = pardot.campaignId;
  window.piHostname = pardot.trackerHost;
  const script = document.createElement('script');
  script.id = pardotScriptId;
  script.async = true;
  script.src = `https://${pardot.trackerHost}/pd.js`;
  document.head.appendChild(script);
}
// pd.js only sends a hit when it loads or when piTracker is called, and piTracker is gated on consent,
// so removing its first-party cookies is enough to stop tracking.
function stopPardot() {
  pardotActive = false;
  deleteCookies(name => /^(visitor_id|pi_opt_in|lpv|pardot)/.test(name));
}

const pardotVisitorCookie = `visitor_id${pardotCookieSuffix}`;
/** Pardot visitor cookie values, sent with the contact form so the lead is linked to the pages they viewed. Empty without marketing consent. */
export function pardotVisitorFields(): Record<string, string> {
  if (!pardot.accountId || !readConsent().consent.marketing) return {};
  const id = readCookie(pardotVisitorCookie);
  const hash = readCookie(`${pardotVisitorCookie}-hash`);
  return id && hash ? { pi_visitor_id: id, pi_visitor_id_hash: hash } : {};
}

function applyConsent(consent: Consent) {
  if (ga4Id) { if (consent.analytics) loadAnalytics(); else stopAnalytics(); }
  if (pardot.accountId) { if (consent.marketing) loadPardot(); else stopPardot(); }
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState<Consent>(none);
  const banner = useRef<HTMLElement>(null);
  const focusOnOpen = useRef(false);
  const focusFirstSwitch = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const lastTrackedUrl = useRef<string | null>(null);
  const lastTitle = useRef('');
  const pathname = usePathname();
  const titleId = useId();
  const textId = useId();

  useEffect(() => {
    if (!categories.length) return;
    const { consent, answered } = readConsent();
    applyConsent(consent);
    if (!answered) { setDraft(consent); setOpen(true); }
    const reopen = () => {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setDraft(readConsent().consent);
      setExpanded(true);
      focusOnOpen.current = true;
      setOpen(true);
    };
    window.addEventListener(openEvent, reopen);
    return () => window.removeEventListener(openEvent, reopen);
  }, []);

  // Opened from the footer's Cookie settings: move focus into the banner. A first-visit banner leaves focus alone.
  useEffect(() => {
    if (open && focusOnOpen.current) { focusOnOpen.current = false; banner.current?.focus(); }
  }, [open]);

  // "Manage preferences" opens the switches above the buttons: move focus to the first one.
  useEffect(() => {
    if (expanded && focusFirstSwitch.current) { focusFirstSwitch.current = false; banner.current?.querySelector<HTMLInputElement>('input[role="switch"]')?.focus(); }
  }, [expanded]);

  // Pardot page views for client-side navigations (GA4 records these itself). piTracker reads
  // document.title, which Next.js updates shortly after the route changes, so wait until the title
  // differs from the previous page's (up to 2s) before sending.
  useEffect(() => {
    const url = location.href;
    const previous = lastTrackedUrl.current;
    const previousTitle = lastTitle.current;
    lastTrackedUrl.current = url;
    const navigated = previous !== null && previous !== url;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    const settle = () => {
      const title = document.title;
      if (navigated && (!title || title === previousTitle) && attempts++ < 20) { timer = setTimeout(settle, 100); return; }
      lastTitle.current = title;
      if (navigated && readConsent().consent.marketing && typeof window.piTracker === 'function') window.piTracker(url);
    };
    timer = setTimeout(settle, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!open) return null;
  const choose = (consent: Consent) => {
    saveConsent(consent);
    applyConsent(consent);
    setOpen(false);
    setExpanded(false);
    // Opened from Cookie settings: return focus there instead of losing it when the banner closes.
    returnFocus.current?.focus();
    returnFocus.current = null;
  };

  return <section ref={banner} className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby={titleId} aria-describedby={textId} tabIndex={-1}>
    <div className="cookie-banner-intro">
      <span className="cookie-banner-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.4A9 9 0 1 1 11.6 3a3 3 0 0 0 3.9 3.9 3 3 0 0 0 5.5 5.5Z" />
          <path d="M8.5 9h.01M15.5 15h.01M10 15.5h.01M12.5 11.5h.01" strokeWidth="2.6" />
        </svg>
      </span>
      <div>
        <h2 id={titleId}>{copy.title}</h2>
        <p id={textId}>{copy.text} <Link href="/privacy">{copy.privacyLink}</Link>.</p>
      </div>
    </div>
    {expanded && <ul className="cookie-banner-options">
      <li>
        <span className="cookie-banner-option-text"><strong>{copy.necessary.name}</strong><span>{copy.necessary.description}</span></span>
        <span className="cookie-banner-always">{copy.alwaysOn}</span>
      </li>
      {categories.map(category => <li key={category}>
        <label className="cookie-banner-option-text" htmlFor={`${titleId}-${category}`}><strong>{copy.categories[category].name}</strong><span>{copy.categories[category].description}</span></label>
        <input id={`${titleId}-${category}`} className="cookie-banner-switch" type="checkbox" role="switch" checked={draft[category]} onChange={event => setDraft({ ...draft, [category]: event.target.checked })} />
      </li>)}
    </ul>}
    <div className="cookie-banner-actions">
      {expanded
        ? <button key="save" type="button" className="cookie-banner-secondary" onClick={() => choose(draft)}>{copy.save}</button>
        : <button key="customize" type="button" className="cookie-banner-link" onClick={() => { focusFirstSwitch.current = true; setExpanded(true); }}>{copy.customize}</button>}
      <button type="button" className="cookie-banner-secondary" onClick={() => choose(none)}>{copy.rejectAll}</button>
      <button type="button" className="brand-button" onClick={() => choose(all)}>{copy.acceptAll}</button>
    </div>
  </section>;
}

export function CookieSettingsButton() {
  if (!categories.length) return null;
  return <button type="button" className="footer-cookie-settings" onClick={() => window.dispatchEvent(new Event(openEvent))}>{copy.settings}</button>;
}
