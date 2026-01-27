# GitHub Pages DNS Configuration for jphart.dev

## ⚠️ Current Status
You're seeing "DNS check unsuccessful" because your domain DNS isn't configured yet. This is normal!

## 🔧 DNS Configuration Steps

### Step 1: Log into Your Domain Registrar
Go to where you purchased jphart.dev (e.g., Namecheap, GoDaddy, Google Domains, Cloudflare, etc.)

### Step 2: Find DNS Settings
Look for:
- "DNS Management"
- "DNS Settings"
- "Nameservers"
- "Advanced DNS"

### Step 3: Add These DNS Records

#### For Apex Domain (jphart.dev):
Add **4 A Records** pointing to GitHub's servers:

**Record 1:**
```
Type: A
Name: @
Address: 185.199.108.153
TTL: Automatic or 3600
```

**Record 2:**
```
Type: A
Name: @
Address: 185.199.109.153
TTL: Automatic or 3600
```

**Record 3:**
```
Type: A
Name: @
Address: 185.199.110.153
TTL: Automatic or 3600
```

**Record 4:**
```
Type: A
Name: @
Address: 185.199.111.153
TTL: Automatic or 3600
```

**Important:** In the "Name" field, enter `@` (the @ symbol represents your root domain)

#### For WWW Subdomain (www.jphart.dev):
Add **1 CNAME Record**:

```
Type: CNAME
Host: www
Value: janpaul80.github.io
TTL: Automatic or 3600
```

### Step 4: Wait for DNS Propagation
- DNS changes can take **5 minutes to 48 hours** to propagate
- Usually takes 15-30 minutes
- Check status at: https://www.whatsmydns.net/#A/jphart.dev

### Step 5: Verify in GitHub
After DNS propagates:
1. Go back to GitHub Pages settings
2. Click "Check again" button
3. You should see a green checkmark ✅
4. GitHub will automatically enable HTTPS

## 📋 Example DNS Configuration

### If using Namecheap:
1. Login to Namecheap
2. Go to Domain List → Manage
3. Click "Advanced DNS"
4. Add the A and CNAME records above
5. Save changes

### If using Cloudflare:
1. Login to Cloudflare
2. Select your domain
3. Go to DNS → Records
4. Add the A and CNAME records above
5. Set Proxy status to "DNS only" (gray cloud)
6. Save

### If using GoDaddy:
1. Login to GoDaddy
2. Go to My Products → DNS
3. Add the A and CNAME records above
4. Save

## ✅ Verification Checklist

After configuring DNS:
- [ ] 4 A records added for apex domain
- [ ] 1 CNAME record added for www subdomain
- [ ] Waited 15-30 minutes for propagation
- [ ] Checked DNS propagation at whatsmydns.net
- [ ] Clicked "Check again" in GitHub Pages settings
- [ ] Green checkmark appears in GitHub
- [ ] HTTPS is enabled (may take additional time)

## 🌐 Your URLs After Setup

Once DNS is configured:
- **Primary:** https://jphart.dev
- **WWW:** https://www.jphart.dev
- **GitHub:** https://janpaul80.github.io/jphart/

All will show your portfolio!

## 🔍 Troubleshooting

### "DNS check unsuccessful" persists:
- Wait longer (up to 48 hours)
- Verify A records are correct
- Check if your domain registrar has propagated changes
- Use https://www.whatsmydns.net to check global DNS status

### Site shows 404:
- Make sure you selected "master" branch in GitHub Pages settings
- Verify index.html is in the root of your repository
- Wait a few minutes after enabling Pages

### HTTPS not working:
- HTTPS can take up to 24 hours to provision after DNS is configured
- GitHub automatically provides free SSL certificate
- Be patient, it will work!

## 📞 Need Help?

If you're stuck:
1. Check which domain registrar you're using
2. Search for "[Your Registrar] DNS settings guide"
3. Or share which registrar you use and I can provide specific instructions

## 🎯 Quick Action

**Right now, do this:**
1. Log into your domain registrar where you bought jphart.dev
2. Find DNS settings
3. Add the 4 A records and 1 CNAME record listed above
4. Save changes
5. Wait 15-30 minutes
6. Come back to GitHub and click "Check again"

Your site will be live at jphart.dev once DNS propagates! 🚀
