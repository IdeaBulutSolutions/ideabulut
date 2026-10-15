'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { copyBlogText } from '@/lib/blog-clipboard';

export function CodeBlock({ language, code, children }: { language?: string; code: string; children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const copy = async () => {
    try {
      await copyBlogText(code);
      setCopied(true);
      setFailed(false);
    } catch {
      setCopied(false);
      setFailed(true);
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { setCopied(false); setFailed(false); }, 3000);
  };
  return <div className="blog-code">
    <div className="blog-code-bar">
      <span className="blog-code-lang">{language ?? 'code'}</span>
      <button type="button" className="blog-code-copy" onClick={copy} aria-label={failed ? 'Copy failed. Select the code to copy manually.' : copied ? 'Code copied' : 'Copy code'} data-testid="button-copy-code">
        <span aria-live="polite">{failed ? 'Copy failed' : copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
    <pre>{children}</pre>
  </div>;
}
