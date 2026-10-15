import fs from 'node:fs';
import path from 'node:path';
import { contentFiles, publicRoot, readContent } from '@/lib/content/files';
import { productSchema, type ProductContent } from '@/lib/content/schemas';

function dimensions(source: string): { visualWidth: number; visualHeight: number } {
  if (!source.startsWith('/')) return { visualWidth: 1200, visualHeight: 675 };
  const filename = path.join(publicRoot, source);
  if (fs.existsSync(filename) && source.endsWith('.png')) {
    const buffer = fs.readFileSync(filename);
    return { visualWidth: buffer.readUInt32BE(16), visualHeight: buffer.readUInt32BE(20) };
  }
  return { visualWidth: 1200, visualHeight: 675 };
}

export function getAllProducts(includeHidden = false): ProductContent[] {
  return contentFiles('products').map(file => {
    const { data, content, slug } = readContent('products', file, productSchema);
    return { ...data, slug, content, ...dimensions(data.visual) };
  }).filter(product => includeHidden || product.status === 'live').sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export function getProductBySlug(slug: string): ProductContent | undefined {
  return getAllProducts().find(product => product.hasPage && product.slug === slug);
}
