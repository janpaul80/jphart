# Formspree Contact Form Setup Guide

Complete step-by-step guide to connect your jphart.dev contact form to Formspree.

---

## 📋 Step-by-Step Setup

### Step 1: Create Your Form in Formspree

1. **Click the "+" button** (Add New) in the left sidebar
2. **Create a new form** with these settings:
   - **Form Name:** "jphart.dev Contact Form"
   - **Form Type:** Contact Form
3. **Click "Create Form"**

---

### Step 2: Get Your Form Endpoint

After creating the form, Formspree will give you a unique endpoint URL that looks like:

```
https://formspree.io/f/YOUR_FORM_ID
```

**Example:** `https://formspree.io/f/xwpejrzk`

**Copy this URL** - you'll need it in the next step!

---

### Step 3: Configure Form Settings (Optional but Recommended)

In your Formspree dashboard, configure these settings:

#### Email Settings:
- ✅ **Send confirmation email to submitter** (recommended)
- ✅ **Email notifications** - Set your email address
- ✅ **Subject line:** "New Contact from jphart.dev"

#### Spam Protection:
- ✅ **Enable reCAPTCHA** (recommended)
- ✅ **Honeypot field** (already enabled by default)

#### After Submit:
- **Redirect URL:** `https://jphart.dev/?success=true`
- Or leave blank to show Formspree's default thank you page

---

### Step 4: Update Your Website

Once you have your Form ID, share it with me and I'll update the contact form code, OR you can do it yourself:

**Find this in `index.html`:**
```html
<form class="contact-form" id="contactForm">
```

**Replace with:**
```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Important:** Replace `YOUR_FORM_ID` with your actual Formspree form ID!

---

### Step 5: Update Form Fields

Make sure your form fields have the correct `name` attributes:

```html
<input type="text" id="name" name="name" required>
<input type="email" id="email" name="email" required>
<textarea id="message" name="message" rows="6" required></textarea>
```

✅ These are already correct in your form!

---

### Step 6: Test Your Form

1. **Push changes to GitHub** (if you updated the code)
2. **Wait 2-3 minutes** for GitHub Pages to deploy
3. **Visit** https://jphart.dev
4. **Fill out the contact form** with test data
5. **Submit the form**
6. **Check your email** - you should receive the submission!

---

## 🎯 Quick Setup (Share Your Form ID)

**The easiest way:**

1. Create your form in Formspree (Step 1-2 above)
2. Copy your Form ID (the part after `/f/` in the URL)
3. Share it with me in chat
4. I'll update your code and push it live!

**Example Form ID:** `xwpejrzk`

---

## 🔧 Advanced Configuration

### Custom Success Message

If you want to show a custom success message on your site instead of redirecting:

1. In Formspree settings, leave "Redirect URL" blank
2. The form will show Formspree's default thank you page
3. OR keep the current JavaScript handling (already in your code)

### Email Template Customization

In Formspree dashboard:
1. Go to **Settings** → **Email**
2. Customize the email template
3. Add your branding

### Spam Protection

Formspree includes:
- ✅ Honeypot fields (invisible to users)
- ✅ Rate limiting
- ✅ reCAPTCHA (optional, recommended)

---

## 📧 What Happens When Someone Submits?

1. **User fills out form** on jphart.dev
2. **Form submits to Formspree**
3. **Formspree processes** the submission
4. **You receive email** with:
   - Name
   - Email address
   - Message
   - Timestamp
   - IP address (for spam prevention)
5. **User sees** success message or redirect

---

## 🎨 Current Form Features (Already Built-In)

Your contact form already has:
- ✅ Client-side validation
- ✅ Email format checking
- ✅ Success/error messages
- ✅ Loading state ("Sending..." button)
- ✅ Responsive design
- ✅ Accessible labels

---

## 🚀 Formspree Free Plan Limits

- **50 submissions/month** (free plan)
- **Unlimited forms**
- **Email notifications**
- **Spam filtering**
- **File uploads** (up to 10MB)

**Need more?** Upgrade to paid plan for:
- 1,000+ submissions/month
- Custom branding
- Webhooks
- Integrations (Slack, Zapier, etc.)

---

## 🔐 Security & Privacy

Formspree handles:
- ✅ HTTPS encryption
- ✅ GDPR compliance
- ✅ Spam protection
- ✅ Data storage (30 days on free plan)

---

## 📊 Viewing Submissions

In your Formspree dashboard:
1. Click on your form name
2. View all submissions
3. Export to CSV
4. Search and filter
5. Mark as spam

---

## 🐛 Troubleshooting

### Form not submitting?
- Check that Form ID is correct
- Verify `action` URL in HTML
- Check browser console for errors
- Test in incognito mode

### Not receiving emails?
- Check spam folder
- Verify email in Formspree settings
- Confirm form is active in dashboard
- Check submission in Formspree dashboard

### Getting spam?
- Enable reCAPTCHA in Formspree
- Use honeypot fields (already enabled)
- Report spam in dashboard

---

## ✅ Checklist

- [ ] Created Formspree account
- [ ] Created new form in dashboard
- [ ] Copied Form ID
- [ ] Updated index.html with Form ID
- [ ] Pushed changes to GitHub
- [ ] Tested form submission
- [ ] Received test email
- [ ] Configured email settings
- [ ] Enabled spam protection

---

## 🎯 Next Steps After Setup

1. **Test thoroughly** - Submit multiple test forms
2. **Check email delivery** - Verify you receive all submissions
3. **Monitor submissions** - Check Formspree dashboard regularly
4. **Respond quickly** - Reply to inquiries within 24 hours
5. **Track conversions** - Monitor form submission rate

---

## 💡 Pro Tips

1. **Custom Email Template:**
   - Add your logo
   - Include project details
   - Add call-to-action

2. **Auto-Responder:**
   - Enable confirmation emails
   - Thank users for reaching out
   - Set expectations for response time

3. **Integration:**
   - Connect to Slack for instant notifications
   - Use Zapier to add to CRM
   - Export to Google Sheets

---

## 📞 Need Help?

**Option 1: Share Your Form ID**
Just paste your Formspree Form ID in chat and I'll update everything for you!

**Option 2: Formspree Support**
- Documentation: https://help.formspree.io
- Email: support@formspree.io

---

**Ready to connect your form? Share your Formspree Form ID and I'll handle the rest! 🚀**
