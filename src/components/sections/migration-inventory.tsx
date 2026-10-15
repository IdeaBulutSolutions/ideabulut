import type { CopySection } from '@/content/pages/services';
import '@/styles/migration-inventory.css';

type Decision = 'Move' | 'Rebuild' | 'Retire';

const rows: readonly { asset: string; decision: Decision }[] = [
  { asset: 'Customer data extension', decision: 'Move' },
  { asset: 'Welcome journey', decision: 'Rebuild' },
  { asset: 'Legacy automation', decision: 'Retire' },
  { asset: 'Newsletter template', decision: 'Move' },
  { asset: 'Preference segment', decision: 'Rebuild' },
];

export function MigrationInventory({ section }: { section: CopySection }) {
  return <section className="sp-section sp-white mi-section" aria-labelledby="sp-migration-inventory">
    <div className="container sp-statement">
      <div><p className="sp-kicker">{section.eyebrow}</p><h2 id="sp-migration-inventory">{section.heading}</h2><p className="sp-body mi-subtitle">{section.body}</p></div>
      <figure className="mi-card" aria-labelledby="mi-card-title">
        <figcaption className="mi-head">
          <span id="mi-card-title" className="mi-title">Migration inventory</span>
          <span className="mi-example">Example</span>
        </figcaption>
        <div className="mi-cols" aria-hidden="true"><span>Asset</span><span>Decision</span></div>
        <ul className="mi-rows">
          {rows.map(row => <li className="mi-row" key={row.asset}>
            <span className="mi-asset">{row.asset}</span>
            <span className={`mi-chip mi-${row.decision.toLowerCase()}`}><span className="mi-dot" aria-hidden="true" />{row.decision}</span>
          </li>)}
        </ul>
        <div className="mi-foot">
          <span className="mi-foot-label">Validated before cut-over</span>
          <span className="mi-bar" aria-hidden="true"><span /></span>
        </div>
      </figure>
    </div>
  </section>;
}
