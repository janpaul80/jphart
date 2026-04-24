# Watermelon Website Source Setup

## What This Page Does
This allows the AI agent to learn from your website content, so it can answer questions accurately based on what's actually on jphart.dev.

---

## How to Add Your Website

### Option 1: Root Domain (Recommended)

1. **Select:** "Root domain" from the dropdown
2. **Enter URL:** `https://jphart.dev`
3. **Click:** "Fetch URL's"
4. **Wait:** Watermelon will crawl your entire site
5. **Click:** "Synchronize agent" when done

This will automatically index all pages on your site.

---

### Option 2: Sitemap (Alternative)

1. **Select:** "Sitemap" from the dropdown
2. **Enter URL:** `https://jphart.dev/sitemap.xml`
3. **Click:** "Fetch URL's"
4. **Wait:** Watermelon will read your sitemap
5. **Click:** "Synchronize agent" when done

This uses your sitemap.xml file to find all pages.

---

### Option 3: Single URL (Not Recommended)

Only use this if you want to add specific pages one by one. For a full site, use Root domain instead.

---

## Recommended Setup

**Use Root Domain:**
```
Dropdown: Root domain
URL: https://jphart.dev
```

Then click "Fetch URL's"

---

## What Happens Next

1. **Watermelon crawls your site** (takes 1-2 minutes)
2. **Extracts content** from all pages
3. **Indexes information** about:
   - Your services
   - Portfolio projects
   - Pricing packages
   - About section
   - Contact information
4. **Agent learns** from this content
5. **Can answer questions** based on actual site content

---

## After Fetching URLs

Once URLs are fetched:
1. You'll see a list of all pages found
2. Review the list
3. Click "Synchronize agent" button
4. Agent will update with new knowledge
5. Widget will be ready to use!

---

## Expected Pages to Be Indexed

Your site should index these sections:
- ✅ Home / Hero
- ✅ Services section
- ✅ Portfolio / Work
- ✅ About section
- ✅ Testimonials
- ✅ Pricing
- ✅ Contact

---

## Testing After Setup

Once synchronized:
1. Visit https://jphart.dev
2. Open chat widget
3. Ask: "What services do you offer?"
4. Agent should respond with accurate info from your site
5. Ask: "How much does a website cost?"
6. Agent should mention your pricing packages

---

## Troubleshooting

### "Fetch URL's" Not Working?
- Verify site is live at https://jphart.dev
- Check if site is accessible (not password protected)
- Try using Sitemap option instead
- Wait a few minutes and try again

### No Pages Found?
- Verify your site is deployed
- Check sitemap.xml exists at https://jphart.dev/sitemap.xml
- Try Single URL option and add homepage manually

### Agent Not Using Website Content?
- Click "Synchronize agent" after adding URLs
- Wait 5 minutes for indexing to complete
- Test agent again
- May need to recreate agent if still not working

---

## Summary

**What to do right now:**
1. Select "Root domain" from dropdown
2. Enter: `https://jphart.dev`
3. Click "Fetch URL's"
4. Wait for crawling to complete
5. Click "Synchronize agent"
6. Test widget on your site!

This will make your AI agent much smarter and able to answer questions accurately based on your actual website content.
