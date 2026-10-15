import type { NextConfig } from "next";

// Static export for GitHub Pages: `npm run build` writes plain HTML/CSS/JS to `out/`,
// which .github/workflows/deploy.yml publishes. There is no Next.js server in production, so:
// - `redirects()`/`headers()` are unsupported. Retired URLs are served by hidden alias pages
//   (see src/app/copado, src/app/privacy-policy, ...) whose canonical points at the live page.
// - Image optimization is off; images in public/ are served as-is.
// - `trailingSlash` emits `about/index.html`, so URLs are `/about/` — matching GitHub Pages
//   directory serving and the URLs the previous Jekyll site had indexed.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  poweredByHeader: false,
};

export default nextConfig;
