import { JsonLd } from '@/components/seo/json-ld';
import { serviceSchema } from '@/lib/seo/structured-data';

export function ServiceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return <JsonLd data={serviceSchema(name, description, path)} />;
}
