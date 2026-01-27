# Deployment Guide for jphart.dev

This guide covers multiple deployment options for your portfolio website.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Free hosting for static sites
- Automatic HTTPS
- Global CDN
- Easy custom domain setup
- Zero configuration needed

**Steps:**
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd c:/Users/hartm/jp
   vercel
   ```

3. Follow prompts and your site will be live!

4. Add custom domain:
   - Go to Vercel dashboard
   - Add `jphart.dev` as custom domain
   - Update DNS records as instructed

**DNS Configuration for jphart.dev:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

### Option 2: Netlify

**Steps:**
1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Deploy:
   ```bash
   cd c:/Users/hartm/jp
   netlify deploy --prod
   ```

3. Set custom domain in Netlify dashboard

**DNS Configuration:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [your-site].netlify.app
```

---

### Option 3: GitHub Pages

**Steps:**
1. Create a new GitHub repository

2. Initialize and push:
   ```bash
   cd c:/Users/hartm/jp
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git branch -M main
   git remote add origin https://github.com/[username]/jphart.dev.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages
   - Select `main` branch
   - Save

4. Custom domain:
   - Add `jphart.dev` in custom domain field
   - Create CNAME file in root with content: `jphart.dev`

**DNS Configuration:**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

Type: CNAME
Name: www
Value: [username].github.io
```

---

### Option 4: Cloudflare Pages

**Steps:**
1. Push code to GitHub (see Option 3)

2. Go to Cloudflare Pages dashboard

3. Connect your GitHub repository

4. Deploy settings:
   - Build command: (leave empty)
   - Build output directory: `/`

5. Custom domain is automatic if using Cloudflare DNS

---

## 🔧 Pre-Deployment Checklist

- [ ] Test website locally
- [ ] Verify all links work
- [ ] Check responsive design on mobile
- [ ] Test contact form
- [ ] Update meta tags for SEO
- [ ] Add favicon
- [ ] Optimize images (if added)
- [ ] Test on multiple browsers
- [ ] Check accessibility
- [ ] Verify HTTPS works after deployment

---

## 🎨 Adding a Favicon

Create a `favicon.ico` and add to `<head>` in `index.html`:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
```

Generate favicons at: https://realfavicongenerator.net/

---

## 📊 Adding Analytics

### Google Analytics
Add before closing `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Privacy-Friendly Alternative: Plausible
```html
<script defer data-domain="jphart.dev" src="https://plausible.io/js/script.js"></script>
```

---

## 🔒 Security Headers

Add these headers in your hosting platform:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:;
```

**For Vercel**, create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 📧 Contact Form Backend

### Option 1: Formspree
1. Sign up at https://formspree.io
2. Update form action in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms
Add `netlify` attribute to form:
```html
<form name="contact" method="POST" data-netlify="true">
```

### Option 3: Custom Backend
Deploy a serverless function (Vercel/Netlify):

**Example: Vercel Serverless Function**
Create `/api/contact.js`:
```javascript
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    
    // Send email using SendGrid, AWS SES, etc.
    
    res.status(200).json({ success: true });
  }
}
```

---

## 🌐 Domain Setup for jphart.dev

1. **Purchase domain** (if not already owned):
   - Namecheap, Google Domains, Cloudflare Registrar

2. **Point DNS to hosting**:
   - Use DNS records from your chosen hosting platform above

3. **Wait for propagation** (can take up to 48 hours)

4. **Verify HTTPS** is working

---

## 📈 Performance Optimization

### Before Deployment:
1. Minify CSS and JS (optional for this size)
2. Optimize images
3. Enable compression (handled by hosting)
4. Use CDN (automatic with Vercel/Netlify)

### After Deployment:
- Test with Google PageSpeed Insights
- Check with GTmetrix
- Verify mobile performance

---

## 🔄 Continuous Deployment

Once connected to GitHub:
1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. Site automatically rebuilds and deploys!

---

## 📞 Support

If you encounter issues:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- GitHub Pages: https://docs.github.com/pages

---

**Recommended: Start with Vercel for the easiest deployment experience.**
