# Core Theme for Hugo

A production-grade, feature-rich Hugo theme with comprehensive SEO, accessibility, performance optimization, and modern web standards.

## Features

### SEO & Meta

- **Canonical URLs** - Prevent duplicate content issues
- **Enhanced Meta Descriptions** - Smart fallback chain (front matter → summary → site default)
- **Open Graph Tags** - Complete social media integration
- **Twitter Cards** - Rich previews on Twitter
- **JSON-LD Structured Data** - Schema.org markup for articles and pages
- **Sitemap** - Auto-generated XML sitemap
- **Robots.txt** - Search engine crawling control
- **Breadcrumbs** - Schema.org compliant navigation
- **Pagination SEO** - Proper rel="prev/next" tags

### Performance

- **Responsive Images** - Automatic srcset generation with lazy loading
- **Image Processing** - Hugo's built-in image optimization
- **Minification** - HTML, CSS, JS minification ready
- **Cache Headers** - Long-term caching for static assets
- **Print Styles** - Optimized for printing
- **Web Manifest** - PWA basics with app manifest

### Accessibility (WCAG 2.1 Level AA)

- **Semantic HTML** - Proper landmarks (header, nav, main, footer)
- **ARIA Labels** - Screen reader support throughout
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Visible focus indicators with :focus-visible
- **Skip Links** - Jump to main content
- **Reduced Motion** - Respects prefers-reduced-motion
- **High Contrast** - Supports prefers-contrast: high
- **Screen Reader Only** - .sr-only utility class

### Content Features

- **Table of Contents** - Auto-generated for long articles (>400 words)
- **Reading Time** - Automatic calculation
- **Post Metadata** - Publication dates, author, tags, categories
- **Related Posts** - Smart content recommendations
- **Taxonomies** - Full support for tags and categories
- **Pagination** - Configurable post listing pagination
- **404 Error Page** - User-friendly error handling

### Security

- **Content Security Policy** - XSS protection
- **Security Headers** - X-Frame-Options, X-Content-Type-Options, etc.
- **External Links** - Automatic rel="noopener noreferrer"
- **HTTPS Ready** - Secure by default

### Developer Experience

- **Clean Templates** - Well-organized, commented code
- **Partials** - Reusable components
- **Shortcodes** - Custom content elements
- **Platform Support** - Netlify, Vercel, GitHub Pages, Cloudflare Pages
- **Documentation** - Comprehensive guides

## Installation

### As a Git Submodule (Recommended)

```bash
cd your-hugo-site
git submodule add https://github.com/yourusername/hugo-core-theme.git themes/core
```

### Manual Installation

1. Download the theme
2. Extract to `themes/core` in your Hugo site
3. Update `hugo.toml`:

```toml
theme = 'core'
```

## Configuration

### Basic Setup

Copy this configuration to your `hugo.toml`:

```toml
baseURL = 'https://yourdomain.com/'
languageCode = 'en-us'
title = 'My Hugo Site'
theme = 'core'

# URL consistency
canonifyURLs = false
relativeURLs = false
uglyURLs = false

# Sitemap
[sitemap]
  changefreq = 'weekly'
  filename = 'sitemap.xml'
  priority = 0.5

# Output formats
[outputs]
  home = ['HTML', 'RSS', 'JSON', 'WebAppManifest']
  section = ['HTML', 'RSS']

[mediaTypes."application/manifest+json"]
  suffixes = ["webmanifest"]

[outputFormats.WebAppManifest]
  mediaType = "application/manifest+json"
  rel = "manifest"

# Markup
[markup]
  [markup.goldmark.renderer]
    unsafe = false
  [markup.tableOfContents]
    endLevel = 3
    ordered = false
    startLevel = 2
  [markup.highlight]
    style = 'monokai'
    lineNos = true

# Related content
[related]
  includeNewer = false
  threshold = 80
  toLower = false
  [[related.indices]]
    name = "tags"
    weight = 100
  [[related.indices]]
    name = "categories"
    weight = 80
  [[related.indices]]
    name = "date"
    weight = 10

# Pagination
[pagination]
  pagerSize = 10

# Taxonomies
[taxonomies]
  tag = 'tags'
  category = 'categories'

# Imaging
[imaging]
  quality = 85
  resampleFilter = "Lanczos"

# Site parameters
[params]
  description = 'A production-grade Hugo site'
  author = 'Your Name'
  twitter = 'yourusername'
  themeColor = '#ffffff'
  backgroundColor = '#ffffff'
  shortTitle = 'Hugo'

# Privacy
[privacy]
  [privacy.googleAnalytics]
    anonymizeIP = true
    respectDoNotTrack = true

# RSS
[services.rss]
  limit = 20

# Minification
[minify]
  minifyOutput = true
```

### Site Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `description` | string | Site-wide meta description | - |
| `author` | string | Default author name | - |
| `twitter` | string | Twitter username (without @) | - |
| `themeColor` | string | PWA theme color | #ffffff |
| `backgroundColor` | string | PWA background color | #ffffff |
| `shortTitle` | string | Short title for PWA | Site title |
| `googleAnalytics` | string | GA4 measurement ID | - |
| `plausible` | bool | Enable Plausible Analytics | false |
| `plausibleDomain` | string | Domain for Plausible | - |

## Front Matter

### Post Front Matter

```yaml
---
title: "My Blog Post"
description: "A brief description for SEO"
date: 2024-01-15
lastmod: 2024-01-20
author: "Author Name"
tags: ["hugo", "web development"]
categories: ["tutorials"]
image: "images/featured.jpg"
---
```

### Page Front Matter

```yaml
---
title: "About"
description: "About this site"
---
```

## Content Organization

### Standard Structure

```
content/
├── _index.md           # Homepage content
├── about.md            # About page
├── posts/
│   ├── _index.md       # Posts section page
│   ├── first-post.md
│   └── second-post.md
└── projects/
    ├── _index.md
    └── project-one.md
```

### Page Bundles (for images)

```
content/
└── posts/
    └── my-post/
        ├── index.md
        ├── featured.jpg
        └── diagram.png
```

In your markdown:
```markdown
{{< img src="featured.jpg" alt="Description" >}}
```

## Shortcodes

### Image Shortcode

Generate responsive images with srcset:

```markdown
{{< img src="images/photo.jpg" alt="Photo description" class="custom-class" >}}
```

Parameters:
- `src` (required): Image path
- `alt`: Alt text for accessibility
- `class`: CSS class
- `loading`: "lazy" (default) or "eager"

## Navigation

Configure main navigation in `hugo.toml`:

```toml
[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 1
  [[menu.main]]
    name = "Blog"
    url = "/posts/"
    weight = 2
  [[menu.main]]
    name = "About"
    url = "/about/"
    weight = 3
```

## Analytics

### Google Analytics

```toml
[params]
  googleAnalytics = 'G-XXXXXXXXXX'

[privacy.googleAnalytics]
  anonymizeIP = true
  respectDoNotTrack = true
```

### Plausible Analytics

```toml
[params]
  plausible = true
  plausibleDomain = 'yourdomain.com'
```

## Icons & Favicons

Replace these placeholder files with your actual icons:

- `themes/core/static/favicon.ico`
- `themes/core/static/favicon-16x16.png`
- `themes/core/static/favicon-32x32.png`
- `themes/core/static/apple-touch-icon.png` (180x180)
- `themes/core/static/icon-192.png`
- `themes/core/static/icon-512.png`

Tools for generating favicons:
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Favicon.io](https://favicon.io/)

## Customization

### CSS

The theme includes three CSS files:

1. **main.css** - Core styles
2. **accessibility.css** - Focus indicators, reduced motion, etc.
3. **print.css** - Print-specific styles

To customize:

1. Copy CSS files to your site's `static/css/` directory
2. Modify as needed
3. Hugo will use your versions instead of theme versions

### Templates

To override any template:

1. Copy from `themes/core/layouts/` to `layouts/` in your site
2. Modify the copy
3. Hugo will use your version

Example:
```bash
# Override the single post template
cp themes/core/layouts/_default/single.html layouts/_default/single.html
# Edit layouts/_default/single.html
```

## Performance

### Build for Production

```bash
hugo --minify
```

### Image Optimization

Use the image shortcode for automatic responsive images:

```markdown
{{< img src="photo.jpg" alt="Description" >}}
```

Generates:
- 400w, 800w, 1200w sizes
- Proper srcset and sizes attributes
- Lazy loading by default

### Performance Targets

- **Lighthouse Performance**: 95+
- **Lighthouse Accessibility**: 100
- **Lighthouse Best Practices**: 100
- **Lighthouse SEO**: 100

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for platform-specific deployment guides:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Traditional hosting (Apache/Nginx)

## Security

See [SECURITY.md](SECURITY.md) for security headers documentation.

Security features included:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Accessibility

This theme meets WCAG 2.1 Level AA standards.

Testing:
```bash
# Install pa11y
npm install -g pa11y

# Test your site
hugo server
pa11y http://localhost:1313
```

## Development

### Local Development

```bash
# Start Hugo server
hugo server -D

# Build for production
hugo --minify
```

### Testing

1. **HTML Validation**: [W3C Validator](https://validator.w3.org/)
2. **Accessibility**: [pa11y](https://pa11y.org/)
3. **Performance**: [Lighthouse](https://developers.google.com/web/tools/lighthouse)
4. **SEO**: [Google Search Console](https://search.google.com/search-console)

## Troubleshooting

### Images Not Processing

Ensure images are either:
- In `static/` folder (for static images)
- In page bundles (for processed images)

### CSS Not Loading

Check that files exist in `themes/core/static/css/`:
- main.css
- accessibility.css
- print.css

### Taxonomy Pages Not Generating

Verify taxonomy configuration in `hugo.toml`:
```toml
[taxonomies]
  tag = 'tags'
  category = 'categories'
```

## File Structure

```
themes/core/
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── single.html
│   │   ├── list.html
│   │   ├── taxonomy.html
│   │   ├── terms.html
│   │   └── _markup/
│   │       └── render-link.html
│   ├── partials/
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── navigation.html
│   │   ├── breadcrumbs.html
│   │   ├── pagination.html
│   │   ├── post-meta.html
│   │   ├── toc.html
│   │   ├── related.html
│   │   ├── taxonomy-list.html
│   │   ├── image.html
│   │   ├── favicon.html
│   │   └── analytics.html
│   ├── shortcodes/
│   │   └── img.html
│   ├── 404.html
│   └── index.webmanifest
├── static/
│   ├── css/
│   │   ├── main.css
│   │   ├── accessibility.css
│   │   └── print.css
│   ├── _headers
│   ├── vercel.json
│   └── [icon files]
├── SECURITY.md
├── DEPLOYMENT.md
└── README.md
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use for personal or commercial projects.

## Credits

Created with Hugo - the world's fastest framework for building websites.

## Support

- **Documentation**: This README, DEPLOYMENT.md, SECURITY.md
- **Issues**: [GitHub Issues](https://github.com/yourusername/hugo-core-theme/issues)
- **Hugo Docs**: [gohugo.io/documentation](https://gohugo.io/documentation/)

## Changelog

### Version 1.0.0

- Initial release
- Complete SEO implementation
- Full accessibility support (WCAG 2.1 AA)
- Responsive image processing
- Table of contents
- Related posts
- Breadcrumb navigation
- Pagination
- Security headers
- Analytics integration
- PWA basics
- Multiple deployment platform support
