import { Icon } from '@/components/ui/icons';
import Image from 'next/image';
import type { CopySection } from '@/content/pages/services';
import '@/styles/devops-platform-comparison.css';

const platforms = [
  {
    key: 'copado',
    name: 'Copado',
    role: 'Brings structure',
    summary: 'One governed path from sandbox to production.',
    tags: ['Pipelines', 'Promotion', 'Governance', 'Visibility'],
  },
  {
    key: 'gha',
    name: 'GitHub Actions',
    role: 'Brings flexibility',
    summary: 'Automation shaped to exactly what your team needs.',
    tags: ['Custom automation', 'CI checks'],
  },
] as const;

const factors = ["Your team's size", 'Your governance needs', 'The tools you already use'];

export function DevopsPlatformComparison({ section }: { section: CopySection }) {
  return <section className="sp-section sp-white dpc" aria-labelledby="sp-statement-platforms">
    <div className="container">
      <div className="dpc-head">
        <div><p className="sp-kicker">{section.eyebrow}</p><h2 id="sp-statement-platforms">{section.heading}</h2></div>
        <p className="dpc-lead">Many teams use both.</p>
      </div>
      <div className="dpc-grid">
        {platforms.map(p => <article key={p.key} className={`dpc-card dpc-${p.key}`}>
            <div className="dpc-mark">
              {p.key === 'copado'
                ? <Image src="/images/products/copado-logo.png" alt="" width={40} height={40} sizes="40px" />
                : <Icon name="code" />}
            </div>
            <h3>{p.name}</h3>
            <p className="dpc-role">{p.role}</p>
            <p className="dpc-summary">{p.summary}</p>
            <ul className="dpc-tags" aria-label={`${p.name} strengths`}>
              {p.tags.map(t => <li key={t}>{t}</li>)}
            </ul>
          </article>)}
      </div>
      <div className="dpc-foot">
        <p className="dpc-foot-label">We design the split around</p>
        <ul className="dpc-factors">{factors.map(f => <li key={f}><Icon name="check" />{f}</li>)}</ul>
        <p className="dpc-note">Built around your team, not a tool.</p>
      </div>
    </div>
  </section>;
}
