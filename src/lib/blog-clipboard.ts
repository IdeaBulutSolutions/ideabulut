export async function copyBlogText(text: string): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    // Browsers can block the Clipboard API even when manual copying is allowed.
  }

  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const area = document.createElement('textarea');
  area.value = text;
  area.readOnly = true;
  area.style.position = 'fixed';
  area.style.left = '-9999px';
  document.body.appendChild(area);
  try {
    area.select();
    if (!document.execCommand('copy')) throw new Error('Copying is unavailable in this browser.');
  } finally {
    area.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}
