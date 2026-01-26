---
title: "Getting Started with Hugo"
date: 2026-01-26T09:00:00-05:00
draft: false
description: "New to Hugo? Learn the basics of this fast static site generator and how to get your first site running with Hugo Baseline."
tags: ["hugo", "baseline", "getting-started", "tutorial"]
categories: ["Hugo Themes"]
---

Hugo is one of the fastest and most popular static site generators, turning your content written in Markdown into a complete website in milliseconds. Here's what you need to know to get started.

## What Is Hugo?

Hugo is an open-source static site generator written in Go. Unlike dynamic platforms like WordPress, Hugo generates all your HTML pages at build time, resulting in incredibly fast websites that are secure, easy to host, and require no database.

Static sites are perfect for blogs, documentation, portfolios, and marketing sites. You write content in Markdown, configure your site with simple TOML/YAML files, and Hugo generates a complete website ready to deploy anywhere—GitHub Pages, Netlify, Vercel, or any web server.

Hugo is also fast. What takes other generators minutes, Hugo does in milliseconds. Sites with thousands of pages build in seconds.

## Getting Started

Install Hugo following the instructions at [gohugo.io](https://gohugo.io/installation/). Then create your first site:

```bash
hugo new site my-site
cd my-site
```

Add the Baseline theme:

```bash
git init
git submodule add https://github.com/imsky/hugo-baseline.git themes/baseline
echo "theme = 'baseline'" >> hugo.toml
```

Create your first post:

```bash
hugo new posts/hello-world.md
```

Edit the post in `content/posts/hello-world.md`, set `draft: false`, then preview your site:

```bash
hugo server
```

Visit `http://localhost:1313` to see your site. When you're ready to publish, run `hugo` to generate the static files in the `public/` directory.

## Why Hugo with Baseline?

Hugo gives you speed and simplicity. Baseline gives you production-ready features out of the box—search, SEO, analytics, dark mode, structured data, and more. Together, they let you focus on creating content instead of configuring infrastructure.

You get the flexibility of a static site generator with the polish of a complete theme. No database to maintain, no security vulnerabilities to patch, just fast, reliable websites.

Explore [what makes Baseline special](../introducing-hugo-baseline/) or dive into [using all its features](../using-baseline-features/).
