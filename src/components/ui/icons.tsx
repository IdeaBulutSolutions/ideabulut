import type { SVGProps } from 'react';

export type IconName = 'arrow' | 'external' | 'shield' | 'link' | 'window' | 'swap' | 'code' | 'chip' | 'cube' | 'branch' | 'cloud' | 'cloud-outline' | 'person' | 'person-check' | 'wrench' | 'award' | 'commit' | 'layers' | 'check' | 'upload' | 'tool' | 'globe' | 'infinity' | 'question';

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M3 8h9M8.5 4 12.5 8l-4 4" />,
    external: <path d="M4 12 12 4M6 4h6v6" />,
    shield: <><path d="M16 4 26 8v8c0 6-4 10-10 12C10 26 6 22 6 16V8z" /><path d="m11 16 4 4 6-7" /></>,
    link: <><path d="m13 19 6-6M11 15l-3 3a4.2 4.2 0 0 0 6 6l3-3M21 17l3-3a4.2 4.2 0 0 0-6-6l-3 3" /></>,
    window: <><rect x="3" y="6" width="26" height="20" rx="3" /><path d="M3 12h26M8 9h.01M12 9h.01" /></>,
    swap: <><path d="M5 11h20m-5-5 5 5-5 5M27 21H7m5-5-5 5 5 5" /></>,
    infinity: <path d="M16 16c-3-4-5-7-8-7a7 7 0 0 0 0 14c3 0 5-3 8-7s5-7 8-7a7 7 0 0 1 0 14c-3 0-5-3-8-7Z" />,
    code: <path d="m11 9-7 7 7 7m10-14 7 7-7 7M18 6l-4 20" />,
    chip: <><rect x="9" y="9" width="14" height="14" rx="3" /><path d="M13 5v4m6-4v4m-6 14v4m6-4v4M5 13h4m-4 6h4m14-6h4m-4 6h4" /></>,
    cube: <><path d="m16 4 11 6v12l-11 6-11-6V10zM5 10l11 6 11-6M16 16v12" /></>,
    branch: <><circle cx="9" cy="7" r="3" /><circle cx="9" cy="25" r="3" /><circle cx="23" cy="12" r="3" /><path d="M9 10v12m14-7c0 6-14 3-14 7" /></>,
    cloud: <path d="M25 25H8a6 6 0 0 1-.9-11.93A9 9 0 0 1 24.5 10a7.5 7.5 0 0 1 .5 15Z" fill="currentColor" stroke="none" />,
    'cloud-outline': <path d="M23 25H8a6 6 0 0 1-.9-11.93A8 8 0 0 1 22.5 11a7 7 0 0 1 .5 14Z" />,
    person: <><circle cx="16" cy="11" r="5" /><path d="M6 27c0-6 4-9 10-9s10 3 10 9" /></>,
    'person-check': <><circle cx="12" cy="10" r="5" /><path d="M3 27c0-6 3-10 9-10 3 0 5 1 7 3m1 4 4 4 6-8" /></>,
    wrench: <path d="m28 7-5 5-4-4 5-5a9 9 0 0 0-11 11L4 25a3 3 0 0 0 4 4l11-11A9 9 0 0 0 28 7Z" />,
    award: <><circle cx="16" cy="13" r="8" /><path d="m11 20-2 9 7-4 7 4-2-9" /></>,
    commit: <><circle cx="16" cy="16" r="5" /><path d="M3 16h8m10 0h8" /></>,
    layers: <><path d="m16 5 12 6-12 6-12-6zM4 17l12 6 12-6M4 23l12 6 12-6" /></>,
    check: <><circle cx="16" cy="16" r="11" /><path d="m11 16 4 4 6-8" /></>,
    question: <><path d="M10.5 12.5a5.5 5.5 0 1 1 9.7 3.5c-1.8 1.7-4.2 2.2-4.2 5" /><circle cx="16" cy="26" r="1" fill="currentColor" stroke="none" /></>,
    upload: <><path d="M8 22a6 6 0 0 1 0-12 8 8 0 0 1 15 2 5 5 0 0 1 0 10zM16 26V15m-4 3 4-4 4 4" /></>,
    tool: <><rect x="3" y="10" width="22" height="8" rx="2.5" /><rect x="11" y="8" width="6" height="12" rx="1.5" fill="var(--orange)" stroke="var(--orange)" /></>,
    globe: <><circle cx="16" cy="16" r="11" /><path d="M5 16h22M16 5c4 4 4 18 0 22M16 5c-4 4-4 18 0 22" /></>,
  };
  return <svg viewBox={name === 'arrow' || name === 'external' ? '0 0 16 16' : '0 0 32 32'} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}