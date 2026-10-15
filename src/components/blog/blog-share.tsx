'use client';

import { useEffect, useRef, useState } from 'react';
import { copyBlogText } from '@/lib/blog-clipboard';
import { absoluteUrl } from '@/config/site';

export function BlogShare({ path, canonicalUrl }: { path: string; canonicalUrl?: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const url = canonicalUrl ?? absoluteUrl(path);
  const copy = async () => {
    try { await copyBlogText(url); setCopied(true); setFailed(false); }
    catch { setCopied(false); setFailed(true); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { setCopied(false); setFailed(false); }, 3000);
  };
  return <div className="blog-share">
    <span>Share</span>
    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share this article on LinkedIn (opens in a new tab)" data-testid="button-share-linkedin">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4V9.75Z" /></svg>
      LinkedIn
    </a>
    <button type="button" onClick={copy} data-testid="button-copy-link">
      <svg viewBox="0 0 32 32" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="m13 19 6-6M11 15l-3 3a4.2 4.2 0 0 0 6 6l3-3M21 17l3-3a4.2 4.2 0 0 0-6-6l-3 3" /></svg>
      <span aria-live="polite">{failed ? 'Copy failed' : copied ? 'Link copied' : 'Copy link'}</span>
    </button>
  </div>;
}
