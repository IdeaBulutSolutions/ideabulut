'use client';

import { useEffect, useState } from 'react';

export function BlogToc({ headings }: { headings: { id: string; text: string }[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? '');
  useEffect(() => {
    const elements = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = elements[0].id;
      for (const el of elements) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [headings]);
  if (!headings.length) return null;
  return <nav className="blog-toc" aria-label="Table of contents">
    <p className="blog-toc-title">On this page</p>
    <ol>
      {headings.map((h) => <li key={h.id}>
        <a href={`#${h.id}`} className={active === h.id ? 'is-active' : undefined} aria-current={active === h.id ? 'location' : undefined} data-testid={`link-toc-${h.id}`}>{h.text}</a>
      </li>)}
    </ol>
  </nav>;
}
