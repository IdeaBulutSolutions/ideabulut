// Keep supplied legal drafts intact, but never publish unresolved company details.
// An intro paragraph before the first `##` heading is kept as-is. This is not legal review.
export function withoutLegalPlaceholders(body: string): string {
  return body.split(/(?=^## )/m).map(section => {
    const [heading, ...lines] = section.startsWith('## ') ? section.split('\n') : ['', ...section.split('\n')];
    const clean = lines.join('\n').split(/\n\s*\n/)
      .map(block => block.startsWith('- ') ? block.split('\n').filter(line => !/\[[A-Z][A-Z ]+\]/.test(line)).join('\n') : block)
      .filter(block => !/\[[A-Z][A-Z ]+\]/.test(block))
      .join('\n\n').trim();
    return clean ? [heading, clean].filter(Boolean).join('\n') : '';
  }).filter(Boolean).join('\n\n');
}
