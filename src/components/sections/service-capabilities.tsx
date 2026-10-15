import Link from 'next/link';
import { Icon } from '@/components/ui/icons';
import type { ServiceContent } from '@/content/pages/services';

export function ServiceCapabilities({ data, soft = false, body }: { data: ServiceContent['capabilities']; soft?: boolean; body?: string }) {
  return <section className={`sp-section ${soft ? 'sp-soft' : 'sp-white'}`} aria-labelledby="sp-capabilities"><div className="container">
    <div className="sp-heading-intro"><p className="sp-kicker">{data.eyebrow}</p><h2 id="sp-capabilities">{data.heading}</h2>{body && <p className="sp-body">{body}</p>}</div>
    <div className="sp-capabilities">{data.items.map(item => <article className="sp-capability" key={item.title}>
      <span className="sp-capability-icon"><Icon name={item.icon} /></span>
      <div><h3>{item.title}</h3><p>{item.description}</p>{item.link && <Link className="text-link" href={item.link.href}>{item.link.label}<Icon name="arrow" className="arrow-svg" /></Link>}</div>
    </article>)}</div>
  </div></section>;
}
