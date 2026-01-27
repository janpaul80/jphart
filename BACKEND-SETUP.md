# Backend Email Setup Guide

Complete guide to configure the contact form email backend for jphart.dev.

## 📋 Overview

Your contact form backend is already coded and ready! You just need to configure environment variables in GitHub Pages or deploy to Vercel/Netlify.

---

## ⚠️ Important: GitHub Pages Limitation

**GitHub Pages does NOT support serverless functions or backend APIs.**

You have **two options**:

### Option 1: Deploy to Vercel (Recommended - FREE)
### Option 2: Use Formspree (Simpler, but less control)

---

## 🚀 Option 1: Deploy to Vercel (Recommended)

Vercel supports serverless functions and is perfect for your setup.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy Your Site

```bash
cd c:/Users/hartm/jp
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No
- **Project name?** jphart (or your choice)
- **Directory?** ./ (current directory)
- **Override settings?** No

### Step 4: Add Environment Variables

Go to your Vercel dashboard: https://vercel.com/dashboard

1. Select your project (jphart)
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

```
EMAIL_USER = jp@jphart.dev
EMAIL_PASSWORD = Ecuagrowers10@@
RECAPTCHA_SECRET_KEY = 6LfK51csAAAAAHB9uLFGPwuMRLShLI96yeDjcna4
```

### Step 5: Redeploy

```bash
vercel --prod
```

### Step 6: Update DNS

Point your domain `jphart.dev` to Vercel:

1. In Vercel dashboard, go to your project → **Settings** → **Domains**
2. Add `jphart.dev` and `www.jphart.dev`
3. Vercel will show you DNS records to add

**In your domain registrar (where you bought jphart.dev):**

Add these DNS records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Done!** Your contact form will now work at jphart.dev

---

## 📧 Option 2: Use Formspree (Simpler Alternative)

If you want to keep GitHub Pages and avoid backend setup:

### Step 1: Sign up at Formspree

Go to https://formspree.io and create a free account.

### Step 2: Create a Form

1. Click "New Form"
2. Name it "Contact Form"
3. Copy your form endpoint (looks like: `https://formspree.io/f/YOUR_FORM_ID`)

### Step 3: Update Your HTML

Edit `index.html` and change the form:

```html
<!-- BEFORE -->
<form class="contact-form" id="contactForm">

<!-- AFTER -->
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Step 4: Update JavaScript

Edit `script.js` and replace the contact form section with:

```javascript
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            e.preventDefault();
            showFormStatus('Please complete the reCAPTCHA verification.', 'error');
            return;
        }
        
        // Let form submit naturally to Formspree
        const btn = contactForm.querySelector('button');
        btn.textContent = 'Sending...';
    });
}
```

**Done!** Formspree will handle email delivery.

---

## 🔐 Security Notes

### For Vercel Deployment:

✅ **GOOD**: Environment variables are secure on Vercel
✅ **GOOD**: reCAPTCHA Secret Key is server-side only
✅ **GOOD**: Email credentials never exposed to browser

### For Formspree:

✅ **GOOD**: No backend code needed
✅ **GOOD**: Formspree handles spam protection
⚠️ **NOTE**: Less customization than Vercel

---

## 🧪 Testing Your Setup

### After Vercel Deployment:

1. Go to https://jphart.dev
2. Fill out the contact form
3. Complete reCAPTCHA
4. Click "Send Message"
5. Check your email at `jp@jphart.dev`

### After Formspree Setup:

1. Go to https://jphart.dev
2. Fill out the contact form
3. Complete reCAPTCHA
4. Click "Send Message"
5. Check Formspree dashboard for submissions

---

## 🐛 Troubleshooting

### "Failed to send message" Error

**Vercel:**
- Check environment variables are set correctly
- Check email credentials are correct
- Check Vercel function logs in dashboard

**Formspree:**
- Verify form action URL is correct
- Check Formspree dashboard for errors

### reCAPTCHA Not Working

- Verify Site Key in `index.html` is correct
- Verify Secret Key in environment variables
- Check browser console for errors

### Email Not Arriving

**Vercel:**
- Check spam folder
- Verify EMAIL_USER is `jp@jphart.dev`
- Test email credentials with mail client

**Formspree:**
- Check Formspree dashboard
- Verify email in Formspree settings

---

## 📊 Current Configuration

Your backend is configured for:

- **Email Host**: hostingsecure.email
- **Port**: 465 (SSL)
- **From Email**: jp@jphart.dev
- **To Email**: jp@jphart.dev (you receive the messages)
- **Reply-To**: Sender's email (so you can reply directly)

---

## 🎯 Recommendation

**Use Vercel** if you want:
- Full control over email delivery
- Custom email templates
- Server-side validation
- Professional setup

**Use Formspree** if you want:
- Quick and easy setup
- No backend management
- Simple solution

---

## 📞 Next Steps

1. Choose Option 1 (Vercel) or Option 2 (Formspree)
2. Follow the setup steps above
3. Test the contact form
4. Verify emails are being received

**Need help?** Let me know which option you choose and I'll guide you through it!
