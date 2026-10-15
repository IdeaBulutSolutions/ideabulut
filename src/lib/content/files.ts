import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import type { ZodType, output } from 'zod';

export const contentRoot = path.join(process.cwd(), 'content');
export const publicRoot = path.join(process.cwd(), 'public');

export function contentFiles(folder: string): string[] {
  const directory = path.join(contentRoot, folder);
  return fs.existsSync(directory) ? fs.readdirSync(directory).filter(file => file.endsWith('.md') && !file.startsWith('_')).sort() : [];
}

export function readContent<Schema extends ZodType>(folder: string, file: string, schema: Schema): { data: output<Schema>; content: string; slug: string } {
  const filename = `content/${folder}/${file}`;
  const slug = file.replace(/\.md$/, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${filename}: filename must use lowercase kebab-case.`);
  const raw = fs.readFileSync(path.join(contentRoot, folder, file), 'utf8');
  const parsed = matter(raw, { engines: { yaml: source => yaml.load(source, { schema: yaml.JSON_SCHEMA }) as object } });
  const result = schema.safeParse(parsed.data);
  if (!result.success) throw new Error(`${filename}:\n${result.error.issues.map(issue => `  ${issue.path.join('.') || 'frontmatter'}: ${issue.message}`).join('\n')}`);
  return { data: result.data, content: parsed.content.trim(), slug };
}
