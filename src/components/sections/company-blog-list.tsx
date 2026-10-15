import Link from 'next/link';
import { Icon } from '@/components/ui/icons';
import { CompanyGlyph } from '@/components/ui/company-glyph';
import { blogContent } from '@/content/pages/company';

export function CompanyBlogList() {
  return <section className="cp-section" aria-labelledby="company-latest">
    <div className="container">
      <div className="cp-blog-empty">
        <div className="cp-empty-visual"><CompanyGlyph variant="empty" /></div>
        <div>
          <p id="company-latest">{blogContent.empty}</p>
          <Link href="/contact" className="text-link">{blogContent.emptyLink} <Icon name="arrow" className="arrow-svg" /></Link>
        </div>
      </div>
    </div>
  </section>;
}