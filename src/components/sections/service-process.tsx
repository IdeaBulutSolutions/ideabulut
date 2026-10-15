import { Icon } from '@/components/ui/icons';
import { serviceUi, type ServiceContent } from '@/content/pages/services';

export function ServiceProcess({ data, soft = false }: { data: ServiceContent['process']; soft?: boolean }) {
  return <section className={`sp-section ${soft ? 'sp-soft' : 'sp-white'}`} aria-labelledby="sp-process"><div className="container">
    <div className="sp-process-head"><p className="sp-kicker">{data.eyebrow}</p><h2 id="sp-process">{data.heading}</h2></div>
    <ol className="sp-steps">{data.steps.map((step, index) => <li key={step.title}>
      <span className="sp-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3>
      <div className="sp-step-copy"><p>{step.description}</p><strong className="sp-outcome-chip"><Icon name="check" /><span>{serviceUi.youGet} {step.outcome}</span></strong></div>
    </li>)}</ol>
  </div></section>;
}
