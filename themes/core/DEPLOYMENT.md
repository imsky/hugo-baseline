# Deployment Guide

This guide covers deploying your Hugo site with the Core theme to various hosting platforms.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Platform-Specific Guides](#platform-specific-guides)
  - [Netlify](#netlify)
  - [Vercel](#vercel)
  - [GitHub Pages](#github-pages)
  - [Cloudflare Pages](#cloudflare-pages)
  - [Traditional Hosting](#traditional-hosting)
- [HTTPS Configuration](#https-configuration)
- [CDN Configuration](#cdn-configuration)
- [Performance Optimization](#performance-optimization)
- [Security Headers](#security-headers)

## Pre-Deployment Checklist

Before deploying to production:

1. **Update Configuration**
   ```toml
   # hugo.toml
   baseURL = 'https://yourdomain.com/'  # Update with your actual domain
   ```

2. **Generate Favicon Files**
   - Replace placeholder favicon files in `themes/core/static/`
   - Required files:
     - `favicon.ico`
     - `favicon-16x16.png`
     - `favicon-32x32.png`
     - `apple-touch-icon.png` (180x180)
     - `icon-192.png`
     - `icon-512.png`

3. **Configure Site Parameters**
   ```toml
   [params]
     description = 'Your site description'
     author = 'Your Name'
     themeColor = '#ffffff'
     backgroundColor = '#ffffff'
   ```

4. **Test Build Locally**
   ```bash
   hugo --minify
   # Check public/ directory for output
   ```

5. **Validate Content**
   - Check all pages render correctly
   - Verify images load
   - Test navigation
   - Validate forms (if any)

## Platform-Specific Guides

### Netlify

**Automatic Setup:**

1. Connect your Git repository to Netlify
2. Netlify will auto-detect Hugo
3. Build settings (auto-configured):
   - Build command: `hugo --gc --minify`
   - Publish directory: `public`
   - Hugo version: Set via `netlify.toml`

**Create `netlify.toml` in project root:**

```toml
[build]
  publish = "public"
  command = "hugo --gc --minify"

[build.environment]
  HUGO_VERSION = "0.154.5"  # Match your Hugo version
  HUGO_ENV = "production"
  HUGO_ENABLEGITINFO = "true"

[context.production.environment]
  HUGO_ENV = "production"

[context.deploy-preview.environment]
  HUGO_ENV = "staging"

[[redirects]]
  from = "https://www.yourdomain.com/*"
  to = "https://yourdomain.com/:splat"
  status = 301
  force = true

# Security headers configured in themes/core/static/_headers
```

**Custom Domain:**
1. Go to Domain settings in Netlify
2. Add your custom domain
3. Configure DNS (use Netlify DNS for easiest setup)
4. HTTPS is automatic via Let's Encrypt

### Vercel

**Automatic Setup:**

1. Connect your Git repository to Vercel
2. Vercel will auto-detect Hugo
3. Build settings (auto-configured):
   - Framework preset: Hugo
   - Build command: `hugo --gc --minify`
   - Output directory: `public`

**Create `vercel.json` in project root** (optional overrides):

```json
{
  "build": {
    "env": {
      "HUGO_VERSION": "0.154.5"
    }
  },
  "redirects": [
    {
      "source": "https://www.yourdomain.com/:path*",
      "destination": "https://yourdomain.com/:path*",
      "permanent": true
    }
  ]
}
```

Note: Security headers are already configured in `themes/core/static/vercel.json`

**Custom Domain:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS (add A/CNAME records)
4. HTTPS is automatic

### GitHub Pages

**Setup:**

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Hugo site to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.154.5'
          extended: false

      - name: Build
        run: hugo --minify

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Save

3. Update `hugo.toml`:
   ```toml
   baseURL = 'https://username.github.io/repository-name/'
   ```

**Custom Domain:**
1. Add `CNAME` file to `static/` with your domain
2. Configure DNS (add CNAME record pointing to username.github.io)
3. Enable HTTPS in GitHub Pages settings

### Cloudflare Pages

**Setup:**

1. Connect your Git repository
2. Build configuration:
   - Framework preset: Hugo
   - Build command: `hugo --gc --minify`
   - Build output directory: `public`
   - Environment variable: `HUGO_VERSION = 0.154.5`

3. Deploy

**Custom Domain:**
1. Go to Custom domains
2. Add your domain
3. Cloudflare will configure DNS automatically
4. HTTPS is automatic

**Add Security Headers:**

Create `_headers` file (already included in `themes/core/static/_headers`).

### Traditional Hosting

For VPS, shared hosting, or dedicated servers:

1. **Build the site locally:**
   ```bash
   hugo --minify
   ```

2. **Upload `public/` directory** via:
   - FTP/SFTP
   - rsync: `rsync -avz --delete public/ user@server:/var/www/html/`
   - Git deployment hook

3. **Configure Web Server:**

**Apache** (`.htaccess` in public root):
```apache
# HTTPS Redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# WWW Redirect (optional)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Security Headers
<IfModule mod_headers.c>
    Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
    Header always set X-Frame-Options "DENY"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()"
</IfModule>

# Cache Control
<FilesMatch "\.(css|js|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
```

**Nginx** (server block configuration):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://yourdomain.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.yourdomain.com;
    return 301 https://yourdomain.com$request_uri;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Cache Control
    location ~* \.(css|js|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Serve files
    location / {
        try_files $uri $uri/ =404;
    }
}
```

## HTTPS Configuration

HTTPS is **required** for production sites. All modern hosting platforms provide automatic HTTPS.

### Automatic HTTPS (Recommended)
- **Netlify**: Automatic via Let's Encrypt
- **Vercel**: Automatic
- **GitHub Pages**: Automatic for custom domains
- **Cloudflare Pages**: Automatic

### Manual HTTPS Setup
For traditional hosting:

1. **Get SSL Certificate:**
   - Let's Encrypt (free): Use Certbot
     ```bash
     sudo certbot --nginx  # for Nginx
     sudo certbot --apache # for Apache
     ```
   - Commercial certificate: Purchase from CA

2. **Configure Web Server** (see Nginx/Apache examples above)

3. **Test Configuration:**
   - [SSL Labs](https://www.ssllabs.com/ssltest/)
   - Aim for A+ rating

4. **Enable HSTS** (after confirming HTTPS works):
   ```
   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
   ```

## CDN Configuration

### Cloudflare (Free CDN)

1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Add your site
3. Update your domain's nameservers
4. Configure settings:
   - SSL/TLS: Full (strict)
   - Auto Minify: HTML, CSS, JS
   - Brotli: On
   - HTTP/2: On
   - HTTP/3: On
   - Cache Level: Standard

### Built-in CDN
Most modern platforms include CDN:
- **Netlify**: Built-in CDN
- **Vercel**: Built-in Edge Network
- **Cloudflare Pages**: Built-in CDN
- **GitHub Pages**: Uses Fastly CDN

## Performance Optimization

### Build Optimization

1. **Enable Minification:**
   ```bash
   hugo --minify
   ```

2. **Configure hugo.toml:**
   ```toml
   [minify]
     minifyOutput = true
     [minify.tdewolff.html]
       keepWhitespace = false
   ```

### Image Optimization

1. **Use Hugo's Image Processing:**
   ```markdown
   {{< img src="images/photo.jpg" alt="Description" >}}
   ```

2. **Compress Images Before Upload:**
   - Use tools like ImageOptim, TinyPNG
   - Target: < 200KB per image

### Asset Optimization

1. **Fingerprint Assets** (cache busting):
   ```go
   {{ $css := resources.Get "css/main.css" | fingerprint }}
   <link rel="stylesheet" href="{{ $css.RelPermalink }}">
   ```

2. **Combine CSS/JS:**
   ```go
   {{ $css := resources.Get "css/main.css" | resources.Concat "style.css" | minify | fingerprint }}
   ```

## Security Headers

Security headers are pre-configured for:
- **Netlify**: `themes/core/static/_headers`
- **Vercel**: `themes/core/static/vercel.json`
- **Apache/Nginx**: See examples above

See [SECURITY.md](SECURITY.md) for detailed security header documentation.

## Monitoring & Analytics

### Add Analytics

Configure in `hugo.toml`:

```toml
[params]
  # Google Analytics
  googleAnalytics = 'G-XXXXXXXXXX'

  # Or Plausible (privacy-focused)
  plausible = true
  plausibleDomain = 'yourdomain.com'
```

### Performance Monitoring

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### Uptime Monitoring

Free options:
- [UptimeRobot](https://uptimerobot.com/)
- [StatusCake](https://www.statuscake.com/)
- [Pingdom](https://www.pingdom.com/)

## Post-Deployment Checklist

After deploying:

- [ ] HTTPS is working and forced
- [ ] Custom domain is configured (if applicable)
- [ ] Security headers are present (check with curl -I or online tools)
- [ ] Analytics is tracking (check in dashboard)
- [ ] Favicon appears correctly
- [ ] Images load properly
- [ ] Navigation works
- [ ] Mobile responsive (test on real devices)
- [ ] Forms work (if applicable)
- [ ] Search engines can crawl (check robots.txt, sitemap.xml)
- [ ] Performance score > 90 (PageSpeed Insights)
- [ ] Security headers score A+ (SecurityHeaders.com)

## Troubleshooting

### Build Failures

- Check Hugo version matches between local and hosting platform
- Verify all theme files are present
- Check for syntax errors in templates
- Review build logs for specific errors

### CSS/JS Not Loading

- Check file paths in baseof.html
- Verify files exist in `themes/core/static/`
- Clear browser cache
- Check CDN/cache settings

### Images Not Displaying

- Verify image paths are correct
- Check file permissions
- Ensure images are in `static/` or page bundles
- Check Content Security Policy isn't blocking images

### 404 Errors

- Verify `baseURL` in hugo.toml is correct
- Check relative vs absolute URLs
- Ensure clean URLs are configured correctly
- Check server configuration (Nginx try_files, Apache mod_rewrite)

## Additional Resources

- [Hugo Hosting & Deployment](https://gohugo.io/hosting-and-deployment/)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
