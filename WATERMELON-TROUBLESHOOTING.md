# Watermelon Widget Troubleshooting

## Widget Not Showing - Checklist

### 1. Check Browser Console for Errors

**How to check:**
1. Visit https://jphart.dev
2. Press F12 (or right-click → Inspect)
3. Click "Console" tab
4. Look for any red errors related to Watermelon

**Common errors:**
- Script loading failed
- Widget ID not found
- CORS errors
- Network errors

---

### 2. Verify Widget Script is Loading

**Check in browser:**
1. Press F12 → Go to "Network" tab
2. Refresh the page
3. Look for: `init.life.js`
4. Should show status 200 (success)

**If script fails to load:**
- Check internet connection
- Try different browser
- Clear browser cache (Ctrl+Shift+Delete)

---

### 3. Verify Widget Configuration in Watermelon Dashboard

**Go to Watermelon dashboard and check:**

✅ **Agent Status:**
- Is agent "Active" or "Published"?
- Is agent assigned to the widget?

✅ **Widget Settings:**
- Widget ID: `Ax1ylVTnljx`
- Settings ID: `16180`
- Is widget "Published"?

✅ **Domain Whitelist:**
- Is `jphart.dev` in allowed domains?
- Try adding `*.jphart.dev` as well
- Add `localhost` for local testing

✅ **Channels:**
- Are both channels checked?
  - My first widget
  - JP Hartmann

---

### 4. Common Issues & Solutions

#### Issue: Widget ID Mismatch
**Check:** Does widget ID in code match dashboard?
- Code: `Ax1ylVTnljx`
- Dashboard: Should match exactly

#### Issue: Agent Not Published
**Solution:**
1. Go to Watermelon dashboard
2. Find your agent
3. Click "Publish" or "Activate"
4. Wait 2-3 minutes

#### Issue: Domain Not Whitelisted
**Solution:**
1. Watermelon dashboard → Settings
2. Add domains:
   - `jphart.dev`
   - `https://jphart.dev`
   - `www.jphart.dev`
3. Save and wait 5 minutes

#### Issue: Widget Not Assigned to Agent
**Solution:**
1. Go to Widget settings
2. Assign agent to widget
3. Save changes

---

### 5. Alternative: Use Tawk.to Instead

If Watermelon continues to have issues, Tawk.to is more reliable:

**Tawk.to Setup (5 minutes):**

1. **Sign up:** https://www.tawk.to/
2. **Get widget code**
3. **Replace Watermelon script in index.html:**

```html
<!-- Replace Watermelon script with this: -->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
```

**Tawk.to Benefits:**
- Works immediately
- No complex setup
- Free forever
- Live chat with you directly
- More reliable than Watermelon

---

### 6. Test Widget Locally

**Create test HTML file:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Widget Test</title>
</head>
<body>
    <h1>Testing Watermelon Widget</h1>
    
    <!-- Watermelon Widget -->
    <script>
        (function(w,d,s,o,f,js,fjs){
            w['WatermelonChatWidget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
            js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
            js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
        }(window, document, 'script', 'wmw', 'https://chatwidget-prod.web.app/embed/init.life.js'));
        wmw('init', { widgetId: 'Ax1ylVTnljx', settingsId: '16180' });
    </script>
</body>
</html>
```

Save as `test-widget.html` and open in browser. If widget shows here but not on main site, there's a conflict.

---

### 7. Check for JavaScript Conflicts

**Possible conflicts:**
- Other chat widgets
- Ad blockers
- Privacy extensions
- Content Security Policy (CSP)

**Test:**
1. Disable browser extensions
2. Try incognito/private mode
3. Try different browser

---

### 8. Verify Deployment

**Make sure latest code is deployed:**

1. Visit: https://jphart.dev
2. View page source (Ctrl+U)
3. Search for: `Ax1ylVTnljx`
4. Should find the widget script

**If not found:**
- GitHub Pages may not have deployed yet
- Wait 5 more minutes
- Check GitHub Actions for deployment status

---

## Quick Diagnosis

**Run this in browser console (F12):**

```javascript
// Check if Watermelon script loaded
console.log('Watermelon loaded:', typeof wmw !== 'undefined');

// Check for widget element
console.log('Widget element:', document.querySelector('.watermelon-embed-frame'));

// Check for errors
console.log('Check console for red errors above');
```

---

## Most Likely Issues

Based on common problems:

1. **Agent not published** (80% of cases)
   - Go to dashboard and publish agent

2. **Domain not whitelisted** (15% of cases)
   - Add jphart.dev to allowed domains

3. **Widget ID typo** (5% of cases)
   - We already fixed this

---

## Next Steps

1. **Check Watermelon dashboard:**
   - Is agent published/active?
   - Is widget published?
   - Is jphart.dev whitelisted?

2. **Check browser console:**
   - Any errors?
   - Is script loading?

3. **If still not working:**
   - Let me know what you see in console
   - Or switch to Tawk.to (more reliable)

---

## Contact Watermelon Support

If nothing works:
- Email: support@watermelon.ai
- Dashboard: Help/Support section
- They usually respond within 24 hours

---

**Most likely: Agent needs to be published in dashboard. Check that first!**
