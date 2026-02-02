---
title: "Introducing Hugo Baseline"
date: 2026-02-02
description: "A simple, production-grade Hugo theme with essential features built-in, designed to be the foundation for any type of website."
tags: ["hugo", "theme", "baseline"]
categories: ["announcements"]
---

Building a new Hugo site often starts with the same challenge: finding a theme that's both simple and production-ready. Many themes are either too opinionated with specific designs, or too minimal and require extensive manual configuration to add essential functionality like SEO metadata, RSS feeds, and accessibility features.

**Hugo Baseline** exists to solve this problem. It's a foundational theme that provides all the essential features you need for a production website, while remaining simple and highly customizable. Instead of starting from scratch or wrestling with complicated theme configurations, you can use Baseline as a solid foundation for building many types of sites.

## Key Features

Baseline comes packed with features that most websites need, configured and ready to use:

### SEO & Social Media

The theme includes comprehensive SEO metadata out of the box:
- **OpenGraph tags** for rich social media previews on Facebook, LinkedIn, and other platforms
- **Twitter Card support** for optimized Twitter sharing
- **JSON-LD structured data** for enhanced search engine understanding
- **Automatic social media images** using the first image in your post, so every share looks professional

### Content Discovery

Help your readers find more content they'll love:
- **Related posts** automatically suggested based on tags, categories, and publish date
- **RSS feed generation** with proper reader discovery tags
- **Search index** generation (JSON format) that works with Fuse.js or Lunr.js for client-side search

### User Experience

- **Dark mode support** - enable with `darkMode = true` in your config
- **Table of contents** automatically generated for posts (disable per-post with `toc: false`)
- **Breadcrumbs** for better navigation and SEO
- **Read time estimates** for posts
- **Click-to-copy functionality** for code blocks
- **Responsive and mobile-ready** design that works on all devices

### Accessibility

Baseline takes accessibility seriously:
- **ARIA attributes** throughout for screen reader compatibility
- **Skip-to-content link** for keyboard navigation
- **Focus indicators** for keyboard users
- **Semantic HTML** structure

### Performance & Modern Web

- **Image shortcode** optimized for performance with Hugo's image processing
- **PWA ready** with web manifest support
- **Favicon setup** with multiple sizes for different platforms
- **Print styles** for clean printed pages
- **Minified output** for faster page loads

### Developer Features

- **External link tracking** with configurable UTM parameters
- **Analytics integration** supporting both Google Analytics 4 and Plausible
- **Microformats** for semantic markup
- **Custom 404 page** for better error handling

## Getting Started

### Prerequisites

Hugo Baseline requires **Hugo version 0.148.2 or higher**. Check your version with:

```bash
hugo version
```

### Installation with Git Submodules

The recommended way to install Baseline is using Git submodules:

```bash
# Create a new Hugo site
hugo new site my-site
cd my-site

# Initialize git repository
git init

# Add Baseline as a submodule
git submodule add https://github.com/imsky/hugo-baseline.git themes/baseline

# Update your config
echo 'theme = "baseline"' >> hugo.toml
```

## Configuration

Baseline is highly configurable through `hugo.toml`. Here are all the available theme parameters:

### Basic Settings

```toml
baseURL = 'https://example.com'  # Your site URL
languageCode = 'en-us'           # Content language
title = 'My Site'                # Site title
theme = 'baseline'               # Theme name
```

### Site Parameters

```toml
[params]
  description = 'My site description'    # Site description for SEO
  author = 'Your Name'                   # Author name
  darkMode = true                        # Enable/disable dark mode
  twitter = 'yourusername'               # Twitter username (without @)
  themeColor = '#ffffff'                 # Browser chrome color (light mode)
  backgroundColor = '#ffffff'            # Background color for splash screen
  shortTitle = 'My Site'                 # Short title for PWA
  images = ["images/og-image.jpg"]       # Default social share image
```

### Analytics

```toml
[params]
  googleAnalytics = 'G-XXXXXXXXXX'       # Google Analytics measurement ID
  plausible = false                      # Enable Plausible analytics
  plausibleDomain = 'example.com'        # Domain for Plausible tracking
```

### UTM Parameters

Track external link clicks with automatic UTM parameters:

```toml
[params.utm]
  enabled = true                         # Enable UTM tracking
  source = "my-site"                     # UTM source
  medium = "referral"                    # UTM medium
  campaign = ""                          # UTM campaign (optional)
  content = ""                           # UTM content (optional)
  term = ""                              # UTM term (optional)
  excludeDomains = []                    # Domains to exclude from tracking
  preserveExistingUtm = true             # Keep existing UTM params
```

### Related Content

Configure how related posts are found:

```toml
[related]
  includeNewer = false                   # Include newer posts in related
  threshold = 80                         # Minimum match score (0-100)
  toLower = false                        # Case-sensitive matching

  [[related.indices]]
    name = "tags"
    weight = 100                         # Tags are most important

  [[related.indices]]
    name = "categories"
    weight = 80                          # Categories are second

  [[related.indices]]
    name = "date"
    weight = 10                          # Date proximity matters least
```

### Table of Contents

```toml
[markup.tableOfContents]
  startLevel = 2                         # Start TOC at h2
  endLevel = 3                           # End TOC at h3
  ordered = false                        # Use unordered list
```

### Pagination

```toml
[pagination]
  pagerSize = 10                         # Items per page
```

### RSS Feed

```toml
[services.rss]
  limit = 20                             # Maximum items in feed
```

### Privacy Settings

```toml
[privacy.googleAnalytics]
  anonymizeIP = true                     # Anonymize IPs
  respectDoNotTrack = true               # Honor Do Not Track
```

### Output Formats

```toml
[outputs]
  home = ['HTML', 'RSS', 'JSON', 'WebAppManifest']
  section = ['HTML', 'RSS']
```

### PWA Manifest

```toml
[mediaTypes."application/manifest+json"]
  suffixes = ["webmanifest"]

[outputFormats.WebAppManifest]
  mediaType = "application/manifest+json"
  rel = "manifest"
```

## Next Steps

Once you have Baseline installed and configured:

1. Create your first post: `hugo new content/posts/my-first-post.md`
2. Start the development server: `hugo server -D`
3. Customize the theme by overriding layouts in your site's `layouts/` directory
4. Add your logo and favicon to `static/images/`
5. Configure your menu items in `hugo.toml`

Hugo Baseline gives you a solid, production-ready foundation so you can focus on your content and unique features, not reinventing the basics.

Happy building!
