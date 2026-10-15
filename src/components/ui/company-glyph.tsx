export function CompanyGlyph({ variant = 'product' }: { variant?: 'product' | 'about' | 'empty' }) {
  if (variant === 'about') return <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
    <path d="M30 188 120 32l90 156H30Z" stroke="#5A8DFE" strokeWidth="2" />
    <path d="M65 188 120 93l55 95H65Z" stroke="#F2A03C" strokeWidth="2" />
    <path d="M120 32v156M30 188h180" stroke="#5A8DFE" strokeWidth="1" strokeDasharray="5 7" />
    <circle cx="120" cy="32" r="7" fill="#F2A03C" /><circle cx="30" cy="188" r="5" fill="#5A8DFE" /><circle cx="210" cy="188" r="5" fill="#5A8DFE" />
  </svg>;
  if (variant === 'empty') return <svg viewBox="0 0 240 200" fill="none" aria-hidden="true">
    <path d="M39 32h117l43 43v111H39V32Z" fill="#fff" stroke="#2266DE" strokeWidth="2"/>
    <path d="M156 32v43h43M64 97h111M64 122h92M64 147h63" stroke="#DCE3F6" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="176" cy="154" r="29" fill="#E4ECFF" stroke="#2266DE" strokeWidth="2"/>
    <path d="m164 154 8 8 16-18" stroke="#2266DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="38" cy="23" r="6" fill="#F2A03C"/>
  </svg>;
  return <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
    <rect x="35" y="44" width="170" height="152" rx="19" stroke="#5A8DFE" strokeWidth="2"/>
    <path d="M35 92h170M69 119h102M69 145h64" stroke="#5A8DFE" strokeWidth="2"/>
    <rect x="148" y="134" width="38" height="38" rx="9" fill="#F2A03C"/>
    <path d="m158 153 8 8 12-16" stroke="#090045" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="59" cy="68" r="5" fill="#F2A03C"/><circle cx="76" cy="68" r="5" fill="#5A8DFE"/>
  </svg>;
}
