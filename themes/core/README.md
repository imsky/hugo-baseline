# Core Theme for Hugo

Production-grade Hugo theme with SEO, accessibility (WCAG 2.1 AA), performance optimization, and security.

## Features

- **SEO**: Canonical URLs, Open Graph, Twitter Cards, JSON-LD structured data, sitemap, breadcrumbs
- **Performance**: Responsive images with srcset, lazy loading, minification, cache headers, PWA manifest
- **Accessibility**: WCAG 2.1 AA compliant, semantic HTML, ARIA labels, keyboard navigation, reduced motion support
- **Content**: Auto table of contents, reading time, related posts, taxonomies, pagination
- **Security**: CSP headers, automatic rel="noopener" for external links
- **Analytics**: Google Analytics and Plausible support

## Installation

```bash
cd your-hugo-site
git submodule add https://github.com/yourusername/hugo-core-theme.git themes/core
```

Add to `hugo.toml`:
```toml
theme = 'core'
```

## Quick Start

Configure `hugo.toml`:
```toml
baseURL = 'https://yourdomain.com/'
title = 'My Site'
theme = 'core'

[params]
  description = 'Site description'
  author = 'Your Name'
```

Create content with front matter:
```yaml
---
title: "My Post"
description: "SEO description"
date: 2024-01-15
tags: ["hugo"]
---
```

Run: `hugo server -D` | Build: `hugo --minify`

## Navigation

```toml
[[menu.main]]
  name = "Home"
  url = "/"
  weight = 1
[[menu.main]]
  name = "Blog"
  url = "/posts/"
  weight = 2
```

## Responsive Images

Use the img shortcode for automatic optimization:
```markdown
{{< img src="photo.jpg" alt="Description" >}}
```

Generates 400w, 800w, 1200w sizes with lazy loading.

## Analytics

```toml
[params]
  googleAnalytics = 'G-XXXXXXXXXX'  # Google Analytics
  plausible = true                   # Plausible Analytics
  plausibleDomain = 'yourdomain.com'
```

## Customization

Override CSS by copying to your site's `static/css/` directory. Override templates by copying from `themes/core/layouts/` to your site's `layouts/` directory.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for Netlify, Vercel, GitHub Pages, and Cloudflare Pages guides.

## Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Platform-specific deployment guides
- [SECURITY.md](SECURITY.md) - Security headers configuration

## License

MIT License
