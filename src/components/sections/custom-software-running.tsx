'use client';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import type { CopySection } from '@/content/pages/services';
import '@/styles/custom-software-running.css';

const svg = (children: ReactNode) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
const icons = {
  size: svg(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><path d="M14 6.5h4a2 2 0 0 1 2 2V11M10 17.5H6a2 2 0 0 1-2-2V13" /></>),
  system: svg(<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8.5 6h7M7.3 8.2l3.4 7.6M16.7 8.2l-3.4 7.6" /></>),
  last: svg(<><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>),
  run: svg(<><path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17v3h3l5.2-5.2a4 4 0 0 0 5.3-5.3l-2.6 2.6-2.3-.5-.5-2.3z" /></>),
  cloud: svg(<path d="M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z" />),
  database: svg(<><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>),
  window: svg(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></>),
  gear: svg(<><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" /></>),
};

const points = [
  { title: 'Any size', text: 'From a single integration to a complete product.', icon: icons.size },
  { title: 'Any system', text: 'Salesforce, other platforms and the tools around them, working as one.', icon: icons.system },
  { title: 'Built to last', text: 'Documented from day one, monitored and visible.', icon: icons.last },
  { title: 'Yours to run', text: 'Owned by your team and maintained like a product.', icon: icons.run },
];
const rows = [
  { name: 'Salesforce → finance system', time: '2 min ago', status: 'Synced', tone: 'synced', icon: icons.cloud },
  { name: 'Student portal → Salesforce', time: 'Today, 09:40', status: 'Recovered automatically', tone: 'recovered', icon: icons.window },
  { name: 'Nightly data pipeline', time: 'Last night, 02:00', status: 'Completed', tone: 'completed', icon: icons.database },
  { name: 'Internal approvals tool', time: 'Running now', status: 'Live', tone: 'live', icon: icons.gear },
];
const bars = [58, 72, 64, 80, 70, 76, 62, 84, 74, 68, 90, 66, 78, 44, 72, 82, 70, 86, 76, 92];
const ORANGE = 13;

export function CustomSoftwareRunning({ section }: { section: CopySection }) {
  const cardRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!card || typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    card.classList.add('csr-armed');
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { card.classList.add('csr-in'); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);
  return <section className="sp-section sp-soft csr-section" aria-labelledby="sp-experience">
    <div className="container csr-grid">
      <div>
        <p className="sp-kicker">{section.eyebrow}</p>
        <h2 id="sp-experience">{section.heading}</h2>
        <ul className="csr-points">{points.map(p => <li key={p.title}>
          <span className="csr-point-icon">{p.icon}</span>
          <strong>{p.title}</strong><span className="csr-point-text">{p.text}</span>
        </li>)}</ul>
      </div>
      <figure className="csr-card" ref={cardRef} aria-labelledby="csr-card-title">
        <figcaption className="csr-head"><span id="csr-card-title" className="csr-title">Everything running</span><span className="csr-example">Example</span></figcaption>
        <div className="csr-activity" aria-hidden="true">
          <span className="csr-bars">{bars.map((h, i) => <span key={i} className={i === ORANGE ? 'csr-orange' : undefined} style={{ height: `${h}%` }} />)}</span>
          <span className="csr-activity-label">Last 30 days</span>
        </div>
        <ul className="csr-rows">{rows.map((r, i) => <li className="csr-row" key={r.name} style={{ '--csr-row-delay': `${i * 140}ms` } as CSSProperties}>
          <span className="csr-row-icon">{r.icon}</span>
          <span className="csr-row-main"><span className="csr-name">{r.name}</span><span className="csr-time">{r.time}</span></span>
          <span className={`csr-chip csr-${r.tone}`}>{r.tone === 'live' && <span className="csr-pulse" aria-hidden="true" />}{r.status}</span>
        </li>)}</ul>
      </figure>
    </div>
  </section>;
}
