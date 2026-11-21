'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { hasMarketingConsent } from '@/components/layout/cookie-consent';
import { siteConfig } from '@/config/site';
import { contactPage as copy } from '@/content/pages/contact';
import { innerCta } from '@/content/pages/shared';

type Turnstile = { render: (element: HTMLElement, options: { sitekey: string }) => string; reset: (id: string) => void; remove: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile } }

// The Form Handler's external field names. Best-effort: what the visitor is told never depends on it.
// A no-cors request must follow redirects, so the Form Handler's redirect back to this page is fetched too.
// keepalive lets the post finish if the visitor leaves right after the confirmation.
function postToPardot(data: FormData) {
  const field = (name: string) => String(data.get(name) ?? '');
  const body = new URLSearchParams({
    email: field('email'),
    first_name: field('first_name'),
    last_name: field('last_name'),
    company: field('company'),
    area_of_interest: field('service'),
    comments: field('message'),
  });
  // Same as the Apps Script forward: opt-in is only ever set, never cleared by an unticked box.
  if (data.get('marketing_opt_in') === 'yes') body.set('marketing_opt_in', 'true');
  fetch(siteConfig.pardotFormHandlerUrl, { method: 'POST', mode: 'no-cors', credentials: 'include', keepalive: true, body }).catch(() => {});
}

// Posts to the Google Apps Script Web App (apps-script/Code.gs). Field names must match its
// ALLOWED list: first_name, last_name, email, company, service, message, consent, marketing_opt_in. `website` is a
// honeypot and Turnstile adds `cf-turnstile-response` inside its container.
// With marketing consent the form also posts to the Pardot Form Handler from the browser: only a post
// that carries the visitor's Pardot cookie links the lead to the pages they viewed, and Apps Script's
// own forward runs on its server. `pardot=browser` tells Apps Script to skip that forward.
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const [sentTo, setSentTo] = useState('');

  function renderTurnstile() {
    if (widget.current && window.turnstile && !widgetId.current) widgetId.current = window.turnstile.render(widget.current, { sitekey: siteConfig.turnstileSiteKey });
  }

  // After "Send another message" the form mounts again with an empty Turnstile container.
  useEffect(() => { if (status === 'idle') renderTurnstile(); }, [status]);
  // Move focus to the confirmation heading (screen readers announce it) and scroll it into view,
  // smoothly unless the visitor prefers reduced motion.
  useEffect(() => {
    if (status !== 'sent') return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    successHeading.current?.focus({ preventScroll: true });
    successHeading.current?.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' });
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      // Apps Script replies through a redirect without CORS headers, so the request must be
      // no-cors and the response is opaque: a resolved request counts as sent. A server-side
      // rejection (e.g. Turnstile secret mismatch) is invisible here and drops the lead.
      const data = new FormData(form);
      // A filled honeypot is a bot: Apps Script drops it, and so does the Pardot post.
      const toPardot = Boolean(siteConfig.pardotFormHandlerUrl) && !data.get('website') && hasMarketingConsent();
      if (toPardot) data.set('pardot', 'browser');
      await fetch(siteConfig.appsScriptUrl, { method: 'POST', mode: 'no-cors', body: data });
      if (toPardot) postToPardot(data);
      // The form (and the Turnstile container inside it) is replaced by the confirmation.
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
      setSentTo(String(data.get('email') ?? ''));
      setStatus('sent');
    } catch {
      setStatus('error');
      if (widgetId.current) window.turnstile?.reset(widgetId.current); // tokens are single-use
    }
  }

  if (status === 'sent') return <div className="contact-success">
    <span className="contact-success-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
    </span>
    <h3 ref={successHeading} tabIndex={-1}>{copy.successTitle}</h3>
    <p>{sentTo ? <>{copy.successReplyTo} <strong>{sentTo}</strong>.</> : copy.successReply}</p>
    <p className="contact-success-next">{copy.successNext}</p>
    <div className="contact-success-actions">
      <Link href={innerCta.href} className="brand-button">{innerCta.button}</Link>
      <button type="button" className="contact-success-again" onClick={() => setStatus('idle')}>{copy.sendAnother}</button>
    </div>
  </div>;

  return <>
    {siteConfig.turnstileSiteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={renderTurnstile} />}
    <form onSubmit={submit}>
      <div className="contact-hp" aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="contact-field-grid">
        {/* Lengths match the Salesforce Lead fields the leads sync to (FirstName 40, LastName and Email 80). */}
        <label>{copy.fields.firstName}<input type="text" name="first_name" autoComplete="given-name" maxLength={40} required /></label>
        <label>{copy.fields.lastName}<input type="text" name="last_name" autoComplete="family-name" maxLength={80} required /></label>
        <label>{copy.fields.email}<input type="email" name="email" autoComplete="email" maxLength={80} required /></label>
        <label>{copy.fields.company}<input type="text" name="company" autoComplete="organization" maxLength={120} /></label>
        <label className="contact-field-wide">{copy.fields.interest}<select name="service" defaultValue="" required>
          <option value="" disabled>{copy.fields.interest}</option>
          {copy.interests.map((interest) => <option value={interest} key={interest}>{interest}</option>)}
        </select></label>
      </div>
      <label className="contact-message-field">{copy.fields.message}<textarea name="message" placeholder={copy.fields.messagePlaceholder} rows={6} maxLength={2000} required /></label>
      {siteConfig.turnstileSiteKey && <div className="contact-turnstile" ref={widget} />}
      <label className="contact-consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>{copy.consent} <Link href="/privacy">{copy.privacyLink}</Link>.</span>
      </label>
      <label className="contact-consent contact-opt-in">
        <input type="checkbox" name="marketing_opt_in" value="yes" />
        <span>{copy.marketingOptIn}</span>
      </label>
      <button type="submit" className="brand-button" disabled={status === 'sending'}>{status === 'sending' ? copy.sending : copy.button}</button>
      <p className={`contact-status${status === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite">
        {status === 'error' && <>{copy.error} <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></>}
      </p>
    </form>
  </>;
}
