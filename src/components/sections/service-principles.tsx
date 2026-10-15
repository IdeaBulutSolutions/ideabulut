import { Icon } from '@/components/ui/icons';
import type { ServiceContent } from '@/content/pages/services';

export function ServicePrinciples({ data, soft = false }: { data: NonNullable<ServiceContent['principles']>; soft?: boolean }) {
  return <section className={`sp-section ${soft ? 'sp-soft' : 'sp-white'}`} aria-labelledby="sp-principles"><div className="container">
    <p className="sp-kicker">{data.eyebrow}</p><h2 id="sp-principles">{data.heading}</h2>
    <div className="sp-principles">{data.items.map(item => <div className="sp-principle" key={item.title}>{item.icon && <span className="sp-capability-icon sp-principle-icon"><Icon name={item.icon} /></span>}<h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
  </div></section>;
}
