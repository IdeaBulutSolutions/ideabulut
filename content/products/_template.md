---
# Required product name. The filename is the URL slug.
name: "Your product"
# Optional; rendered as "by Idea Bulut".
brand: "Idea Bulut"
# Required card and metadata copy, under 160 characters.
description: "Explain what your product does."
# Optional short chip labels.
tags: ["Free", "DevOps tool"]
# Required small icon and larger visual, inside public/images/products.
icon: "/images/products/your-product-icon.png"
visual: "/images/products/your-product.png"
# Required accessible description of the large visual.
visualAlt: "Your product interface"
# Optional approved colour token: soft, white, or navy.
visualBackground: soft
# Required button label and destination; external HTTPS links use true.
cta:
  label: "Discover your product"
  href: "https://example.com"
  external: true
# Optional order: use 10, 20, 30 so 15 can go between 10 and 20.
order: 30
# Optional; include in homepage carousel when true.
featured: false
# live is visible; coming-soon hides it from public listings.
status: coming-soon
# Only true for a product with a page on this website.
hasPage: false
# Optional dates used in the sitemap.
# date: "2026-01-01"
# updated: "2026-01-02"
# Optional product-page sections.
features: []
faq: []
# Optional metadata overrides (otherwise name and description).
# seoTitle: "Your product"
# seoDescription: "Explain what your product does."
---

Optional long-form product description, shown only when hasPage is true.
