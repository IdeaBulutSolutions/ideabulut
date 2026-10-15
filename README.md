# Idea Bulut Solutions website

Source for [ideabulut.com](https://ideabulut.com), built with Next.js.

## Development

Requires Node.js 24 (see `.nvmrc`).

```sh
npm ci
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm start          # preview out/
```

## Content

- Blog posts: `content/blog/` (start from `_template.md`, or `npm run new:post "Title"`)
- Products: `content/products/` (start from `_template.md`, or `npm run new:product "Name"`)
- Images: `public/images/`
- Site settings and navigation: `src/config/`

Run `npm run check:content` before committing. Pushing to `main` publishes the site.
