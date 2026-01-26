---
title: "Using Hugo Baseline"
date: 2026-01-26T11:00:00-05:00
draft: false
description: "A concise guide to using and configuring all the production-ready features built into Hugo Baseline."
tags: ["hugo", "baseline", "theme", "guide"]
categories: ["Hugo Themes"]
---

Hugo Baseline comes packed with production-ready features that work out of the box. Here's how to use and configure everything the theme offers.

## Essential Features

**Search Index**: Automatically generates a JSON search index compatible with Fuse.js and Lunr.js at `/index.json`. Just add your preferred search library to provide instant client-side search.

**Dark Mode**: Enable with `darkMode = true` in your config. Uses CSS `prefers-color-scheme` for automatic, flicker-free theme switching based on user's system preference.

**JSON-LD Structured Data**: Comprehensive structured data (Article, Organization, BreadcrumbList, WebSite schemas) is generated automatically on every page to help search engines understand your content.

**SEO**: Complete OpenGraph and Twitter Card metadata on every page. Set site-wide defaults in your config (`description`, `author`, `twitter`, `images`) and override per-page in front matter.

**Social Media Images**: Automatically falls back to the first image in your post if no featured image is specified, ensuring social shares always look good.

**Related Posts**: Automatically displays related content based on shared tags and categories at the bottom of each post.

## Content Features

**Table of Contents**: Long articles automatically include a TOC. Configure heading levels in your markup settings or disable per-page with `toc: false` in front matter.

**404 Page**: Friendly custom error page included automatically and matches your site design.

**External Link Tracking**: Enable UTM parameter tracking with `[params.utm]` config to automatically append tracking parameters to external links. Set your source, medium, and domains to exclude.

**Code Blocks**: Click-to-copy buttons appear automatically on all code blocks with visual feedback. Works seamlessly with syntax highlighting.

**Pagination**: Configure page size in your config, and pagination controls appear automatically on list pages when needed.

## Analytics and Optimization

**Analytics**: Supports both Google Analytics 4 and Plausible with privacy-respecting defaults (IP anonymization, DoNotTrack respect). Just add your measurement ID.

**RSS Feeds**: Generated automatically for home and section pages with proper `<link>` tags for feed reader discovery. Configure the number of items with `[services.rss] limit`.

**Print Styles**: Pages are optimized for printing with clean layouts and hidden navigation elements.

**Microformats**: Includes h-entry, h-card, and other semantic markup for IndieWeb compatibility and better machine readability.

Learn more about [what Baseline is and why it exists](../introducing-hugo-baseline/) or get started with [Hugo basics](../getting-started-with-hugo/).
