# Hugo Baseline

A clean, minimal, and highly accessible Hugo theme with modern design principles.

## Features

- **Clean & Minimal Design** - Focused on content readability with a distraction-free layout
- **Fully Responsive** - Mobile-first design that works beautifully on all screen sizes
- **Accessibility First** - WCAG compliant with skip links, focus indicators, and semantic HTML
- **Dark Mode Support** - Optional dark mode for comfortable reading in low-light environments
- **SEO Optimized** - Complete meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **RSS Feed Support** - Built-in RSS feed generation for content syndication
- **Microformats** - h-entry support for better semantic web compatibility
- **Fast & Lightweight** - No JavaScript frameworks, minimal CSS, optimized performance
- **Code Syntax Highlighting** - Beautiful code blocks with copy-to-clipboard functionality
- **Table of Contents** - Automatic TOC generation for long articles
- **Related Posts** - Smart related content suggestions
- **Breadcrumbs** - Hierarchical navigation for better UX
- **Taxonomies** - Full support for tags and categories
- **Pagination** - SEO-friendly pagination with prev/next links
- **Print-Friendly** - Optimized print stylesheet included
- **Web Manifest** - PWA-ready with web app manifest support
- **Analytics Ready** - Easy integration with analytics services

## Requirements

- Hugo version 0.148.2 or higher

## Installation

### As a Hugo Module (Recommended)

1. Initialize your Hugo site as a module (if not already done):

```bash
hugo mod init github.com/yourusername/yoursite
```

2. Add the theme to your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/imsky/hugo-baseline"
```

3. Download the theme:

```bash
hugo mod get
```

### As a Git Submodule

```bash
git submodule add https://github.com/imsky/hugo-baseline.git themes/hugo-baseline
```

Then add to your `hugo.toml`:

```toml
theme = "hugo-baseline"
```

## Configuration

Here's a comprehensive example configuration for `hugo.toml`:

```toml
baseURL = "https://example.com/"
languageCode = "en-us"
title = "My Blog"
theme = "hugo-baseline"

[params]
  description = "A blog about technology and creativity"
  author = "Your Name"
  
  # Enable dark mode support
  darkMode = true
  
  # Twitter username (without @)
  twitter = "yourusername"
  
  # Enable/disable features
  showRelated = true
  showToc = true
  showBreadcrumbs = true
```

## Customization

### Analytics

Configure analytics in `hugo.toml`:

```toml
[params]
  # Google Analytics
  googleAnalytics = "G-XXXXXXXXXX"
  
  # Plausible Analytics
  plausible = true
  plausibleDomain = "yourdomain.com"
  
  # Or add custom analytics code in layouts/partials/analytics.html
```

### Favicon

Place your favicon files in the `static/icons/` directory:
- `favicon.ico` (required)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`

### Social Images

To set a default social media image, place it in your `static/` directory and reference it in your config:

```toml
[params]
  ogImage = "/images/social-card.png"
```

Per-page images can be set in front matter:

```yaml
images:
  - /images/post-specific-image.png
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This theme is released under the MIT License. See [LICENSE](LICENSE) for details.

Copyright (c) 2026 Ivan Malopinsky

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/imsky/hugo-baseline).
