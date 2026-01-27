# Google reCAPTCHA Setup Guide

## ✅ What's Been Added

I've added Google reCAPTCHA v2 to your contact form to prevent spam and bot submissions.

---

## 🔑 Get Your reCAPTCHA Keys

### Step 1: Register Your Site

1. **Go to:** https://www.google.com/recaptcha/admin/create
2. **Sign in** with your Google account
3. **Fill in the form:**
   - **Label:** jphart.dev Contact Form
   - **reCAPTCHA type:** Select "reCAPTCHA v2" → "I'm not a robot" Checkbox
   - **Domains:** Add `jphart.dev` (and `www.jphart.dev` if needed)
   - **Accept terms** and click Submit

### Step 2: Get Your Keys

After registration, you'll receive:
- **Site Key** (public key - goes in HTML)
- **Secret Key** (private key - goes in backend API)

---

## 📝 Update Your Website

### In `index.html`:

Find this line (around line 780):
```html
<div class="g-recaptcha" data-sitekey="6LfYourSiteKeyHere" data-theme="dark"></div>
```

**Replace** `6LfYourSiteKeyHere` with your actual Site Key:
```html
<div class="g-recaptcha" data-sitekey="YOUR_ACTUAL_SITE_KEY_HERE" data-theme="dark"></div>
```

### In `api/contact.js` (Backend):

You need to verify the reCAPTCHA token on the server side. Update your contact API:

```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, recaptchaToken } = req.body;

  // Verify reCAPTCHA
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;

  try {
    const recaptchaResponse = await fetch(recaptchaVerifyUrl, {
      method: 'POST'
    });
    
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }

    // Continue with email sending...
    // Your existing email logic here

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
```

---

## 🔒 Store Secret Key Securely

### For GitHub Pages (Static Site):

Since GitHub Pages doesn't support server-side code, you have two options:

#### Option 1: Use a Serverless Function (Recommended)

Deploy your contact form handler to:
- **Vercel Functions** (easiest)
- **Netlify Functions**
- **AWS Lambda**

Then add your secret key as an environment variable.

#### Option 2: Use a Third-Party Service

- **Formspree** (supports reCAPTCHA)
- **Getform**
- **FormSubmit**

---

## 🚀 Quick Setup with Vercel Functions

1. **Create** `api/contact.js` in your project
2. **Add** the verification code above
3. **Deploy** to Vercel:
   ```bash
   npm i -g vercel
   vercel
   ```
4. **Add environment variable** in Vercel dashboard:
   - Key: `RECAPTCHA_SECRET_KEY`
   - Value: Your secret key from Google

---

## 🎨 Customizing reCAPTCHA Appearance

The reCAPTCHA is already set to dark theme to match your website:

```html
<div class="g-recaptcha" data-sitekey="YOUR_KEY" data-theme="dark"></div>
```

### Other Options:

**Size:**
```html
data-size="compact"  <!-- Smaller version -->
data-size="normal"   <!-- Default -->
```

**Language:**
```html
<script src="https://www.google.com/recaptcha/api.js?hl=es"></script>
<!-- Change 'es' to your language code -->
```

---

## ✅ Testing reCAPTCHA

### Test Keys (For Development Only):

Google provides test keys that always pass:

**Site Key:**
```
6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
```

**Secret Key:**
```
6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

Use these for local testing, then replace with your real keys for production.

---

## 🐛 Troubleshooting

### reCAPTCHA Not Showing?

1. **Check console** for errors (F12 → Console)
2. **Verify domain** is registered in Google reCAPTCHA admin
3. **Check site key** is correct in HTML
4. **Clear cache** and hard refresh (Ctrl+Shift+R)

### "Invalid site key" Error?

- Double-check you copied the Site Key correctly
- Ensure domain matches exactly (jphart.dev)
- Wait a few minutes after registration

### reCAPTCHA Shows but Form Won't Submit?

- Check browser console for JavaScript errors
- Verify `grecaptcha` object is available
- Ensure backend is verifying the token

---

## 📊 Monitoring

View reCAPTCHA analytics:
- https://www.google.com/recaptcha/admin
- Select your site
- View statistics and blocked attempts

---

## 🔄 Current Implementation Status

✅ reCAPTCHA HTML added to form
✅ reCAPTCHA script loaded
✅ Dark theme configured
✅ JavaScript validation added
✅ CSS styling added
⏳ **ACTION REQUIRED:** Replace `6LfYourSiteKeyHere` with your actual Site Key
⏳ **ACTION REQUIRED:** Add backend verification in `/api/contact.js`

---

## 📞 Next Steps

1. Register at https://www.google.com/recaptcha/admin/create
2. Get your Site Key
3. Replace `6LfYourSiteKeyHere` in `index.html` with your Site Key
4. Add Secret Key to your backend environment variables
5. Update `/api/contact.js` to verify reCAPTCHA token
6. Test the form!

---

Need help with any of these steps? Let me know!
