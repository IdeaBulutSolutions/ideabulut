import { Icon } from '@/components/ui/icons';
import { JsonLd } from '@/components/seo/json-ld';
import { faqSchema } from '@/lib/seo/structured-data';
import type { FaqItem } from '@/lib/content/schemas';

export function Faq({ items, soft = false }: { items: readonly FaqItem[]; soft?: boolean }) {
  return <section className={`sp-section ${soft ? 'sp-soft' : 'sp-white'}`} aria-labelledby="sp-faq"><div className="container">
    <div className="sp-faq">
      <span className="sp-faq-icon" aria-hidden="true"><Icon name="question" /></span>
      <h2 id="sp-faq">Frequently Asked Questions</h2>
      {items.map(item => <details key={item.question}><summary><h3>{item.question}</h3></summary><p>{item.answer}</p></details>)}
    </div>
    <JsonLd data={faqSchema(items)} />
  </div></section>;
}
