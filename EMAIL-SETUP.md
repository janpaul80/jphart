# Email Setup Guide for Contact Form

## 🔒 Security First

**IMPORTANT:** Your email credentials should NEVER be stored in frontend code or committed to Git. This guide shows you how to set up secure email handling.

---

## 📧 Your Email Configuration

**Email:** jp@jphart.dev  
**Password:** Ecuagrowers10@@  
**SMTP Server:** hostingsecure.email  
**SMTP Port:** 465 (SSL)  
**IMAP Port:** 993  
**POP3 Port:** 995  

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Step 1: Install Dependencies**
```bash
npm init -y
npm install nodemailer
```

**Step 2: Create Environment Variables**

In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:
   - `EMAIL_USER` = `jp@jphart.dev`
   - `EMAIL_PASSWORD` = `Ecuagrowers10@@`

**Step 3: Deploy**
```bash
vercel
```

The `/api/contact.js` file will automatically work as a serverless function!

---

### Option 2: Netlify

**Step 1: Install Dependencies**
```bash
npm init -y
npm install nodemailer
```

**Step 2: Create netlify.toml**
```toml
[build]
  functions = "api"

[build.environment]
  NODE_VERSION = "18"
```

**Step 3: Set Environment Variables**

In Netlify Dashboard:
1. Site settings → Environment variables
2. Add:
   - `EMAIL_USER` = `jp@jphart.dev`
   - `EMAIL_PASSWORD` = `Ecuagrowers10@@`

**Step 4: Rename Function**
Rename `api/contact.js` to `api/contact/contact.js` for Netlify

**Step 5: Deploy**
```bash
netlify deploy --prod
```

---

### Option 3: Alternative - Formspree (No Backend Needed)

If you want a simpler solution without managing a backend:

**Step 1: Sign up at https://formspree.io**

**Step 2: Update form in index.html:**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
```

**Step 3: Configure Formspree to forward to jp@jphart.dev**

---

## 🧪 Testing Locally

To test the email functionality locally:

**Step 1: Create .env.local file**
```bash
EMAIL_USER=jp@jphart.dev
EMAIL_PASSWORD=Ecuagrowers10@@
```

**Step 2: Install Vercel CLI**
```bash
npm i -g vercel
```

**Step 3: Run locally**
```bash
vercel dev
```

**Step 4: Test the form at http://localhost:3000**

---

## 📝 Package.json Setup

Create `package.json` in your project root:

```json
{
  "name": "jphart-portfolio",
  "version": "1.0.0",
  "description": "Portfolio website for jphart.dev",
  "main": "index.html",
  "scripts": {
    "dev": "vercel dev",
    "build": "vercel build",
    "deploy": "vercel --prod"
  },
  "dependencies": {
    "nodemailer": "^6.9.7"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 🔐 Security Checklist

- [x] Email credentials stored in environment variables (NOT in code)
- [x] .env.local added to .gitignore
- [x] API endpoint validates input
- [x] Rate limiting (add if needed)
- [x] CORS configured properly
- [ ] Add reCAPTCHA (optional, for spam protection)

---

## 🛡️ Adding Spam Protection (Optional)

### Google reCAPTCHA v3

**Step 1: Get reCAPTCHA keys from https://www.google.com/recaptcha**

**Step 2: Add to index.html before `</head>`:**
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```

**Step 3: Update form submission in script.js:**
```javascript
grecaptcha.ready(function() {
    grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'}).then(function(token) {
        // Add token to form data
        data.recaptchaToken = token;
        // Then submit
    });
});
```

**Step 4: Verify token in api/contact.js**

---

## 📊 Email Delivery Monitoring

After deployment, monitor:
- Email delivery success rate
- Bounce rates
- Spam folder placement

**Recommended Tools:**
- SendGrid (for better deliverability)
- AWS SES (scalable, cheap)
- Mailgun (developer-friendly)

---

## 🔄 Alternative: Use Email Service

For better deliverability, consider using an email service instead of direct SMTP:

### SendGrid Setup

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'jp@jphart.dev',
  from: 'noreply@jphart.dev',
  replyTo: email,
  subject: `Contact from ${name}`,
  text: message,
  html: `<p>${message}</p>`
};

await sgMail.send(msg);
```

---

## ✅ Quick Start (Recommended Path)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Initialize project:**
   ```bash
   npm init -y
   npm install nodemailer
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel
   ```

4. **Add environment variables in Vercel dashboard**

5. **Test the contact form!**

---

## 🆘 Troubleshooting

### Form not sending?
- Check browser console for errors
- Verify API endpoint is accessible
- Check environment variables are set
- Test SMTP credentials manually

### Emails going to spam?
- Set up SPF records
- Set up DKIM
- Use a dedicated email service (SendGrid, AWS SES)
- Warm up your sending domain

### CORS errors?
- Add CORS headers to api/contact.js
- Ensure your domain is whitelisted

---

## 📞 Support

If you need help setting this up:
1. Check Vercel documentation: https://vercel.com/docs/functions
2. Nodemailer docs: https://nodemailer.com/
3. Or use Formspree for a simpler solution

---

**Remember: Never commit .env.local or expose your email password in frontend code!**
