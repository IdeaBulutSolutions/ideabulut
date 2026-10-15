import { Icon } from '@/components/ui/icons';
import type { ServiceContent, CopySection } from '@/content/pages/services';

export function ServiceIntro({ section, checks, soft = false }: { section: CopySection; checks?: ServiceContent['checks']; soft?: boolean }) {
  return <section className={`sp-section ${soft ? 'sp-soft' : 'sp-white'}`} aria-labelledby="sp-intro">
    <div className={`container ${checks ? 'sp-split' : 'sp-statement'}`}>
      <div><p className="sp-kicker">{section.eyebrow}</p><h2 id="sp-intro">{section.heading}</h2></div>
      {checks ? <div><p className="sp-body">{section.body}</p><div className="sp-check-wrap"><p className="sp-list-label">{checks.label}</p><ul className="sp-checks">{checks.items.map(item => <li key={item}><Icon name="check" />{item}</li>)}</ul></div></div> : <p className="sp-body">{section.body}</p>}
    </div>
  </section>;
}
