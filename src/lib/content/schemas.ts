import { z } from 'zod';

const text = z.string().trim().min(1);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD').refine(
  value => !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value,
  'Use a real calendar date',
);
const image = text.refine(value => value.startsWith('/') || /^https:\/\//.test(value), 'Use a public image path or HTTPS URL');
export const faqSchema = z.object({ question: text, answer: text });
export type FaqItem = z.infer<typeof faqSchema>;

export const blogSchema = z.object({
  title: text.max(70),
  excerpt: text.max(160).optional(),
  date,
  updated: date.optional(),
  featuredImage: image,
  imageAlt: text,
  author: text.default('Idea Bulut team'),
  tags: z.array(text).default([]),
  draft: z.boolean().default(false),
}).strict().refine(value => !value.updated || value.updated >= value.date, { path: ['updated'], message: 'Cannot precede publication date' });

export const productSchema = z.object({
  name: text,
  brand: text.default('Idea Bulut'),
  description: text.max(160),
  tags: z.array(text.max(40)).default([]),
  icon: image,
  visual: image,
  visualAlt: text,
  visualBackground: z.enum(['soft', 'white', 'navy']).default('soft'),
  cta: z.object({
    label: text,
    href: text.refine(value => /^https:\/\//.test(value) || /^\/(?!\/)/.test(value), 'Use an HTTPS URL or internal path'),
    external: z.boolean().default(false),
  }),
  order: z.number().finite().default(100),
  featured: z.boolean().default(false),
  status: z.enum(['live', 'coming-soon']).default('live'),
  hasPage: z.boolean().default(false),
  date: date.optional(),
  updated: date.optional(),
  features: z.array(z.object({ title: text, description: text })).default([]),
  faq: z.array(faqSchema).default([]),
  seoTitle: text.max(70).optional(),
  seoDescription: text.max(160).optional(),
}).strict().superRefine((product, context) => {
  if (/^https:\/\//.test(product.cta.href) !== product.cta.external) context.addIssue({ code: 'custom', path: ['cta', 'external'], message: 'External HTTPS links must use external: true; internal links must use false.' });
});

export type ProductContent = z.infer<typeof productSchema> & {
  slug: string;
  content: string;
  visualWidth: number;
  visualHeight: number;
};
