# Security Headers Documentation

This theme includes production-grade security headers configured for multiple hosting platforms.

## Included Security Headers

### Content Security Policy (CSP)
Prevents XSS attacks by controlling which resources can be loaded.

**Current Policy:**
- `default-src 'self'` - Only load resources from same origin
- `script-src` - Allows inline scripts and analytics (Google Analytics, Plausible)
- `style-src 'self' 'unsafe-inline'` - Allows inline styles
- `img-src 'self' data: https:` - Allows images from same origin, data URIs, and HTTPS
- `frame-ancestors 'none'` - Prevents the site from being embedded in iframes
- `base-uri 'self'` - Restricts base URL
- `form-action 'self'` - Restricts form submissions

**Customization:** Update the CSP in `_headers` or `vercel.json` to match your specific needs. If you add third-party scripts, add their domains to the appropriate directives.

### X-Frame-Options
**Value:** `DENY`

Prevents clickjacking attacks by preventing the site from being embedded in iframes.

### X-Content-Type-Options
**Value:** `nosniff`

Prevents MIME type sniffing, forcing browsers to respect the declared content type.

### X-XSS-Protection
**Value:** `1; mode=block`

Enables browser's built-in XSS protection (legacy browsers).

### Referrer-Policy
**Value:** `strict-origin-when-cross-origin`

Controls how much referrer information is sent with requests:
- Same origin: Full URL
- Cross-origin HTTPS: Origin only
- HTTPS to HTTP: No referrer

### Permissions-Policy
**Value:** `camera=(), microphone=(), geolocation=(), interest-cohort=()`

Disables unnecessary browser features and opts out of Google's FLoC.

### Strict-Transport-Security (HSTS)
**Status:** Commented out by default

**Recommended value:** `max-age=31536000; includeSubDomains; preload`

**Important:** Only enable HSTS after:
1. Confirming HTTPS works correctly
2. All subdomains support HTTPS (if using `includeSubDomains`)
3. Testing thoroughly

## Platform-Specific Configuration

### Netlify
Security headers are configured in `static/_headers`.

No additional configuration needed - Netlify automatically reads this file.

### Vercel
Security headers are configured in `static/vercel.json`.

No additional configuration needed - Vercel automatically reads this file.

### Other Platforms

#### Apache (.htaccess)
```apache
<IfModule mod_headers.c>
    Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
    Header always set X-Frame-Options "DENY"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()"
</IfModule>

# Cache static assets
<FilesMatch "\.(css|js|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
```

#### Nginx
```nginx
# Add to server block
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;

# Cache static assets
location ~* \.(css|js|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot)$ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

## Cache Headers

Static assets (CSS, JS, images, fonts) are cached for 1 year with `immutable` flag for optimal performance.

When you update assets:
- Use versioned filenames (e.g., `style-v2.css`)
- Or use Hugo's fingerprinting: `{{ $css := resources.Get "css/main.css" | fingerprint }}`

## Testing Security Headers

### Online Tools
1. [SecurityHeaders.com](https://securityheaders.com)
2. [Mozilla Observatory](https://observatory.mozilla.org)
3. [CSP Evaluator](https://csp-evaluator.withgoogle.com)

### Browser DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Reload the page
4. Click on the document request
5. Check the "Headers" section for Response Headers

### Command Line
```bash
curl -I https://yourdomain.com
```

## Common Issues

### CSP Blocking Resources
If legitimate resources are blocked:
1. Check browser console for CSP violations
2. Add the domain to the appropriate CSP directive
3. Test thoroughly before deploying

### Analytics Not Working
If Google Analytics or Plausible doesn't work:
1. Verify their domains are in `script-src` and `connect-src`
2. Check browser console for CSP violations
3. Ensure analytics configuration in `hugo.toml` is correct

### HTTPS Redirect Loop
If you experience redirect loops after enabling HSTS:
1. Disable HSTS temporarily
2. Verify HTTPS is working correctly
3. Check your hosting platform's SSL configuration
4. Re-enable HSTS only after confirming HTTPS works

## Best Practices

1. **Test Before Production:** Test all security headers in a staging environment first
2. **Monitor Errors:** Check browser console for CSP violations during testing
3. **Gradual Rollout:** Enable headers one at a time to identify issues
4. **Keep Updated:** Review and update headers as security best practices evolve
5. **Document Changes:** Document any CSP modifications for your specific needs

## Additional Resources

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)
