import Image from 'next/image';
import { Icon } from '@/components/ui/icons';
import { BrandButton } from '@/components/ui/brand-button';
import type { ServiceContent } from '@/content/pages/services';

export function ServiceExperience({ data, product, soft = false }: { data: ServiceContent['experience']; product?: ServiceContent['product']; soft?: boolean }) {
  return <section className={`sp-section ${soft ? 'sp-soft' : 'sp-white'}`} aria-labelledby="sp-experience"><div className="container">
    {product ? <div className="sp-callout">
      <div><Image className="sp-callout-logo" src="/images/products/copado-logo.png" alt="" width={72} height={72} sizes="72px" /><p className="sp-kicker">{data.eyebrow}</p><h2 id="sp-experience">{data.heading}</h2><p className="sp-body">{data.body}</p></div>
      <BrandButton href={product.href} arrow>{product.linkLabel}</BrandButton>
    </div> : <div className="sp-statement"><div><p className="sp-kicker">{data.eyebrow}</p><h2 id="sp-experience">{data.heading}</h2></div>{data.chips?.length ? <div><p className="sp-body">{data.body}</p><ul className="sp-experience-chips" aria-label="AI delivery safeguards">{data.chips.map(chip => <li className="sp-outcome-chip" key={chip.label}><Icon name={chip.icon} /><span>{chip.label}</span></li>)}</ul></div> : <p className="sp-body">{data.body}</p>}</div>}
  </div></section>;
}
