import { Icon } from '@/components/ui/icons';
import { BrandButton } from '@/components/ui/brand-button';
import { innerCta } from '@/content/pages/shared';

type InnerCtaProps = {
  heading?: string;
  sub?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export function InnerCta({ heading = innerCta.heading, sub = innerCta.sub, buttonLabel = innerCta.button, buttonHref = innerCta.href }: InnerCtaProps) {
  return <section className="cta-section" aria-labelledby="inner-cta-heading">
    <div className="container"><div className="cta-panel">
      <div>
        <h2 id="inner-cta-heading">{heading}</h2>
        <p>{sub}</p>
        <BrandButton href={buttonHref} arrow>{buttonLabel}</BrandButton>
      </div>
      <div className="cta-flow" aria-hidden="true"><span><Icon name="branch" /></span><i /><span><Icon name="layers" /></span><i /><span><Icon name="upload" /></span></div>
    </div></div>
  </section>;
}