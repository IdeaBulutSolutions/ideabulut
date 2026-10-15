import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/blog/code-block';
import { slugifyHeading } from '@/lib/content/blog-format';
import { uniqueId } from '@/lib/content/blog';

type HastNode = { type: string; value?: string; tagName?: string; properties?: Record<string, unknown>; children?: HastNode[] };

function hastText(node?: HastNode): string {
  if (!node) return '';
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(hastText).join('');
}

const TAKEAWAY_RE = /^\s*key takeaway:\s*/i;

function stripTakeawayLabel(children: ReactNode): ReactNode {
  // Remove the "Key takeaway:" lead-in from the first text node of the first paragraph.
  let done = false;
  const walk = (node: ReactNode): ReactNode => {
    if (done) return node;
    if (typeof node === 'string') {
      if (TAKEAWAY_RE.test(node)) { done = true; return node.replace(TAKEAWAY_RE, ''); }
      return node;
    }
    if (Array.isArray(node)) return node.map(walk);
    if (node && typeof node === 'object' && 'props' in node) {
      const el = node as { props: { children?: ReactNode } } & object;
      return { ...el, props: { ...el.props, children: walk(el.props.children) } } as ReactNode;
    }
    return node;
  };
  return walk(children);
}

export function BlogMarkdown({ content }: { content: string }) {
  const seen = new Map<string, number>();
  const components: Components = {
    h1: ({ children }) => <h2>{children}</h2>,
    h2: ({ node, children }) => <h2 id={uniqueId(slugifyHeading(hastText(node as HastNode)), seen)}>{children}</h2>,
    a: ({ href = '', children }) => {
      if (/^https?:\/\//.test(href)) return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
      if (href.startsWith('/')) return <Link href={href}>{children}</Link>;
      return <a href={href}>{children}</a>;
    },
    pre: ({ node }) => {
      const codeNode = (node as HastNode | undefined)?.children?.find((c) => c.tagName === 'code');
      const className = codeNode?.properties?.className;
      const classes = Array.isArray(className) ? className.map(String) : [];
      const language = classes.find((c) => c.startsWith('language-'))?.replace('language-', '');
      const code = hastText(codeNode).replace(/\n$/, '');
      return <CodeBlock language={language} code={code}><code>{code}</code></CodeBlock>;
    },
    code: ({ children }) => <code className="blog-inline-code">{children}</code>,
    blockquote: ({ node, children }) => {
      if (TAKEAWAY_RE.test(hastText(node as HastNode))) {
        return <aside className="blog-takeaway" aria-label="Key takeaway">
          <span className="blog-takeaway-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3Z" /></svg>
          </span>
          <div><p className="blog-takeaway-label">Key takeaway</p>{stripTakeawayLabel(children)}</div>
        </aside>;
      }
      return <blockquote>{children}</blockquote>;
    },
    img: ({ src, alt, title }) => <span className="blog-figure">
      <Image src={typeof src === 'string' ? src : ''} alt={alt ?? ''} width={1200} height={675} sizes="(min-width: 1000px) 800px, 90vw" />
      {(title || alt) && <span className="blog-figcaption">{title || alt}</span>}
    </span>,
    table: ({ children }) => <div className="blog-table-wrap"><table>{children}</table></div>,
  };
  return <div className="blog-prose"><ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>{content}</ReactMarkdown></div>;
}
