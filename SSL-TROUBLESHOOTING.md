# SSL Certificate Troubleshooting for jphart.dev

## 🚨 Issue Identified

The SSL certificate is not being provisioned because there's a **conflicting DNS record**.

### Current DNS Problem:
```
nslookup jphart.dev shows:
✅ 185.199.108.153 (GitHub Pages - correct)
✅ 185.199.109.153 (GitHub Pages - correct)
✅ 185.199.110.153 (GitHub Pages - correct)
✅ 185.199.111.153 (GitHub Pages - correct)
❌ 212.125.139.37 (OLD WordPress hosting - REMOVE THIS!)
```

**The extra IP (212.125.139.37) is from your old WordPress hosting and is blocking SSL provisioning.**

---

## ✅ Solution: Clean Up DNS Records

### Step 1: Access Your Domain Registrar
Go to where you registered jphart.dev (e.g., Namecheap, GoDaddy, Google Domains, etc.)

### Step 2: Remove Old A Record
Find and **DELETE** the A record pointing to:
- **212.125.139.37** ← Remove this completely

### Step 3: Verify Only These 4 A Records Exist
Your DNS should have ONLY these 4 A records:

```
Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.108.153
TTL: 3600 (or Auto)

Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.109.153
TTL: 3600 (or Auto)

Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.110.153
TTL: 3600 (or Auto)

Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.111.153
TTL: 3600 (or Auto)
```

### Step 4: Verify CNAME Record
Keep this CNAME record as is:

```
Type: CNAME
Name: www
Value: janpaul80.github.io
TTL: 3600 (or Auto)
```

---

## 🔧 Detailed Instructions by Registrar

### If Using Namecheap:
1. Log in to Namecheap
2. Go to Domain List → Manage
3. Click "Advanced DNS"
4. Find the A Record with value **212.125.139.37**
5. Click the trash icon to delete it
6. Save changes

### If Using GoDaddy:
1. Log in to GoDaddy
2. Go to My Products → DNS
3. Find the A Record with value **212.125.139.37**
4. Click the pencil icon → Delete
5. Save changes

### If Using Google Domains:
1. Log in to Google Domains
2. Click on your domain → DNS
3. Find Custom Records
4. Delete the A Record with **212.125.139.37**
5. Save changes

### If Using Cloudflare:
1. Log in to Cloudflare
2. Select your domain
3. Go to DNS → Records
4. Find the A Record with **212.125.139.37**
5. Click Delete
6. Save changes

---

## ⏰ After Removing the Old Record

### 1. Wait for DNS Propagation (15 minutes - 2 hours)
DNS changes take time to propagate globally.

### 2. Verify DNS is Clean
Run this command to check:
```bash
nslookup jphart.dev
```

Should show ONLY these 4 IPs:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

### 3. Trigger GitHub Pages to Retry SSL
Once DNS is clean, force GitHub to retry:

**Option A: Remove and Re-add Custom Domain**
1. Go to: https://github.com/janpaul80/jphart/settings/pages
2. Under "Custom domain", click the X to remove jphart.dev
3. Click "Save"
4. Wait 2 minutes
5. Re-enter "jphart.dev" in the custom domain field
6. Click "Save"
7. Wait for DNS check to complete

**Option B: Push an Empty Commit**
```bash
cd c:/Users/hartm/jp
git commit --allow-empty -m "Trigger GitHub Pages rebuild"
git push origin master
```

### 4. Monitor SSL Provisioning
- Check: https://github.com/janpaul80/jphart/settings/pages
- Look for "Enforce HTTPS" checkbox to become available
- Should happen within 1-24 hours after DNS is clean

---

## 🔍 Verification Commands

### Check DNS Records:
```bash
nslookup jphart.dev
```

### Check DNS Propagation Globally:
Visit: https://www.whatsmydns.net/#A/jphart.dev

Should show only GitHub Pages IPs (185.199.108.153, etc.) worldwide.

### Test HTTPS (after SSL is ready):
```bash
curl -I https://jphart.dev
```

---

## 📊 Expected Timeline

1. **Now**: Remove old DNS record (212.125.139.37)
2. **15 min - 2 hours**: DNS propagation completes
3. **After DNS clean**: Remove and re-add custom domain in GitHub
4. **1-24 hours**: GitHub provisions SSL certificate
5. **Done**: Enable "Enforce HTTPS"

---

## 🚨 Common Issues

### Issue: "DNS check failed" in GitHub
**Solution**: Wait longer for DNS propagation, then try removing/re-adding domain

### Issue: Still showing old IP after hours
**Solution**: 
- Clear your DNS cache: `ipconfig /flushdns` (Windows)
- Check on different network/device
- Use online DNS checker: https://www.whatsmydns.net/

### Issue: HTTPS still not available after 24 hours
**Solution**:
1. Verify DNS shows ONLY GitHub IPs
2. Check GitHub Status: https://www.githubstatus.com/
3. Try removing and re-adding custom domain again

---

## ✅ Success Checklist

- [ ] Removed old A record (212.125.139.37) from DNS
- [ ] Verified only 4 GitHub Pages A records exist
- [ ] Waited for DNS propagation (check with nslookup)
- [ ] Removed and re-added custom domain in GitHub Pages settings
- [ ] DNS check shows green checkmark in GitHub
- [ ] Waited 1-24 hours for SSL provisioning
- [ ] "Enforce HTTPS" checkbox is available
- [ ] https://jphart.dev loads without SSL error
- [ ] Enabled "Enforce HTTPS" in GitHub settings

---

## 📞 Next Steps

1. **Immediately**: Remove the old DNS record (212.125.139.37)
2. **After 30 minutes**: Verify DNS is clean with `nslookup jphart.dev`
3. **After DNS is clean**: Remove and re-add custom domain in GitHub Pages
4. **Wait 1-24 hours**: SSL certificate will be provisioned automatically
5. **Enable HTTPS**: Check the "Enforce HTTPS" box when available

---

**The old WordPress IP is blocking SSL. Remove it from your DNS settings and GitHub will be able to provision the certificate!**
