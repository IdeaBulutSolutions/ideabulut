# Idea Bulut Solutions website

Source for [ideabulut.com](https://ideabulut.com). Built with Next.js and exported as a static site that GitHub Pages hosts. Every push to `main` publishes automatically.

## Run it locally

Install **Node.js 24 LTS** (see `.nvmrc`; Node.js 22 or later works), then:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` to preview the website while you edit.

To preview exactly what will be published:

```sh
npm run build   # checks content, builds the static site into out/
npm start       # serves out/ the way GitHub Pages does, on http://localhost:3000
```

The first install and build need internet access to download packages and the site's Google fonts. You do not need API keys or environment variables.

## Publish

1. Run the checks:

   ```sh
   npm run check:content
   npm run lint
   npm run typecheck
   npm run build
   ```

2. Commit and push to `main`.
3. The **Deploy to GitHub Pages** workflow (`.github/workflows/deploy.yml`) runs the same checks, builds `out/` and publishes it. Follow its progress in the repository's **Actions** tab.

One-time setup: in the repository on GitHub, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. The custom domain `ideabulut.com` is kept in `public/CNAME`.

Never commit `out/` or `.next/`; they are build output.

## Add a blog post

1. Run `npm run new:post "Your post title"` or copy `content/blog/_template.md` to a new kebab-case filename, such as `my-new-article.md`.
2. Write the article below the second `---`. Use `##` for sections and `###` for subsections. Code blocks get a copy button automatically.
3. Put the featured image in `public/images/blog/`. In the article file, use a path such as `/images/blog/my-new-article.jpg` and write a useful `imageAlt` description.
4. Keep the title at 70 characters or fewer and the optional excerpt at 160 or fewer. Use quoted dates in `YYYY-MM-DD` format.
5. Leave `draft: true` while preparing the article. Change it to `draft: false` when ready.
6. Run `npm run check:content`, fix any errors, then commit and push.

The filename becomes the page address. Reading time, the contents menu, related articles, the blog listing, sitemap, RSS and AI-readable files update automatically when the site is rebuilt.

When revising an existing post, keep its filename and add `updated: "YYYY-MM-DD"` with a date on or after the publication date.

## Add a product card

1. Run `npm run new:product "Your product name"` or copy `content/products/_template.md`.
2. Add the small icon and large visual to `public/images/products/`. Update `icon`, `visual` and `visualAlt` in the product file.
3. Fill in the name, description, tag chips and button. The description must be 160 characters or fewer.
4. For an external HTTPS button, use `cta.external: true`. For a real internal path, use `false`.
5. Change `status: coming-soon` to `status: live` when ready. A live product with `featured: true` also appears in the homepage carousel.
6. Run the content check, then commit and push.

Use `order` values of 10, 20, 30 and so on. A product set to 15 appears between 10 and 20 on the Products page. The homepage intentionally keeps **re:target first**.

For a product page on this website, set `hasPage: true` and use the template's optional features, FAQ and Markdown body. Products without a page still have a `/products/<filename>/` address, which shows the Products page.

## Hide or remove content

- Hide an article: `draft: true`.
- Hide a product: `status: coming-soon`.
- Remove one permanently: delete its file and update links pointing to it.
- Push to `main` to make any of these changes live.

Avoid renaming published files, because their filenames determine their URLs. GitHub Pages cannot redirect, so keep an old URL working with a hidden alias page instead. See `src/app/copado/page.tsx` for the pattern.

## Contact form

The form on `/contact/` posts to a Google Apps Script Web App that writes each enquiry to a Google Sheet. It is protected by a honeypot field, a consent checkbox and Cloudflare Turnstile.

- The Web App URL and Turnstile **site** key are in `src/config/site.ts` (`appsScriptUrl`, `turnstileSiteKey`).
- The Apps Script source and the Turnstile **secret** key live only in `apps-script/`, which is kept out of Git.
- The browser cannot read the Apps Script response, so the form always reports success. After changing either side, send a test enquiry from the live site and check that a row arrives in the Sheet.

## Where things live

```text
├── .github/workflows/deploy.yml   Build and publish to GitHub Pages
├── content/
│   ├── blog/                      Blog posts and the article template
│   └── products/                  Product cards and the product template
├── docs/                          Illustrated client guide
├── public/                        Images, favicon and CNAME, copied as-is
├── scripts/                       Content checks, site check, export helpers
└── src/
    ├── app/                       Pages (one folder per URL)
    ├── components/
    ├── config/                    site.ts (site details), navigation.ts (menus)
    ├── content/pages/             Page copy, including Privacy and Terms (legal.ts)
    ├── data/faqs/                 Service FAQs
    ├── lib/
    └── styles/
```

## SEO and site settings

The canonical origin is `https://ideabulut.com`. If the domain changes, update `siteUrl` in `src/config/site.ts` (or set `NEXT_PUBLIC_SITE_URL` when building) and `public/CNAME`.

The sitemap, crawler rules, RSS, AI-readable files, metadata and structured data are generated from the site settings and published content.

Addresses from earlier versions of the site load hidden copies of their replacement pages. These copies point search engines to the replacement (canonical) and are left out of the sitemap:

| Old address | Shows |
| --- | --- |
| `/copado/` | `/services/salesforce-devops/` |
| `/privacy-policy/`, `/cookies/` | `/privacy/` |
| `/insights/` | `/blog/` |
| `/products/toolbelt-for-copado/` | `/products/` |

GitHub Pages cannot send custom HTTP security headers, so the site has none beyond GitHub's defaults.

## Current status

- The contact form is live and sends enquiries to the Apps Script.
- The Privacy Policy is published. Terms of Service is a draft and excluded from search indexing until approved: remove `noindex: true` for `/terms-of-service` in `src/lib/seo/index.ts` and the `robots` override in `src/app/terms-of-service/page.tsx`.
- Google Analytics 4 (`ga4Id` in `src/config/site.ts`) loads only after a visitor accepts the cookie banner. Visitors can change their choice with **Cookie settings** in the footer. If you add other tracking, update the banner and the Privacy Policy too.

## Extra checks for a developer

```sh
npm run test:content
```

This tests temporary blog/product creation, visibility and generated content, then removes the fixtures. Do not run it while making concurrent edits to the same content files.

With `npm start` running in another terminal:

```sh
npm run check:site
```

This checks every page, the old-address aliases, metadata, links, structured data and the 404 page. The default address is `http://127.0.0.1:3000`; set `SITE_CHECK_URL` to check another one.
