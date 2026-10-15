// Pure helpers shared by server and client blog components (no fs access).
export type BlogPostSummary = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  excerpt: string; // full excerpt / first paragraph (plain text)
  preview: string; // ~140 chars, word boundary, ellipsis
  featuredImage: string;
  imageAlt: string;
  author: string;
  readingTime: number;
  tags: string[];
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function formatBlogDate(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function truncateWords(text: string, max = 140): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(' ');
  const base = (lastSpace > 0 ? cut.slice(0, lastSpace) : clean.slice(0, max)).replace(/[\s,;:.\-–—]+$/, '');
  return `${base}…`;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
