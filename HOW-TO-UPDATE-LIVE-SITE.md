# How to Update Your Live Website

Yes! You can make changes to your live website anytime. Here's how:

---

## 🔄 Simple Update Process

### Step 1: Make Your Changes Locally
Edit any files you want:
- `index.html` - Content, text, structure
- `styles.css` - Colors, fonts, layout
- `script.js` - Functionality, animations
- Add new images to `images/` folder
- Any other files

### Step 2: Test Locally (Optional but Recommended)
```bash
# Start local server to preview changes
python -m http.server 8000

# Then visit: http://localhost:8000
```

### Step 3: Push Changes to GitHub
```bash
# Add your changes
git add .

# Commit with a descriptive message
git commit -m "Update hero section text"

# Push to GitHub
git push origin master
```

### Step 4: Wait for Deployment (1-2 minutes)
- GitHub Pages automatically rebuilds your site
- Changes appear live at jphart.dev within 1-2 minutes
- No manual deployment needed!

---

## 📝 Common Changes You Might Want to Make

### Update Text Content
Edit `index.html`:
- Hero headline and subtitle
- Service descriptions
- Portfolio project details
- Testimonials
- Contact information
- Footer links

### Change Colors/Styling
Edit `styles.css`:
- Background colors
- Text colors
- Font sizes
- Spacing
- Animations

### Add New Portfolio Projects
Edit `index.html` in the portfolio section:
```html
<div class="portfolio-card">
    <div class="portfolio-image">
        <div class="portfolio-placeholder">
            <span class="portfolio-logo">XX</span>
        </div>
    </div>
    <div class="portfolio-content">
        <h3 class="portfolio-title">Your Project Name</h3>
        <p class="portfolio-description">Description here...</p>
        <div class="portfolio-tags">
            <span class="tag">React</span>
            <span class="tag">Node.js</span>
        </div>
    </div>
</div>
```

### Update Images
1. Add images to `images/` folder
2. Reference in HTML: `<img src="images/your-image.jpg" alt="Description">`
3. Push to GitHub

---

## 🚀 Quick Update Workflow

```bash
# 1. Make your changes in VSCode

# 2. Save all files (Ctrl+S or Cmd+S)

# 3. Run these commands:
git add .
git commit -m "Describe your changes"
git push origin master

# 4. Wait 1-2 minutes, then refresh jphart.dev
```

---

## ⚡ Pro Tips

### Test Before Pushing
Always test locally first:
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

### Use Descriptive Commit Messages
Good examples:
- ✅ "Update hero headline and add new portfolio project"
- ✅ "Fix mobile responsive layout on services section"
- ✅ "Change primary color to darker shade"

Bad examples:
- ❌ "Update"
- ❌ "Changes"
- ❌ "Fix stuff"

### Check Your Changes Live
After pushing:
1. Wait 1-2 minutes
2. Visit jphart.dev
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. Verify changes appear correctly

---

## 🔧 What Changes Can You Make?

### ✅ Safe to Change Anytime:
- Text content
- Colors and styling
- Images
- Portfolio projects
- Testimonials
- Contact information
- Navigation links
- Fonts
- Animations
- Layout adjustments

### ⚠️ Be Careful With:
- `CNAME` file (don't delete or modify)
- File structure (keep files in same locations)
- Critical CSS that affects layout
- JavaScript that breaks functionality

### ❌ Don't Change:
- `.git/` folder
- `CNAME` file content (must stay as "jphart.dev")

---

## 🐛 If Something Breaks

### Undo Last Change
```bash
# Revert to previous version
git revert HEAD
git push origin master
```

### Go Back to Specific Version
```bash
# See commit history
git log --oneline

# Revert to specific commit
git revert <commit-hash>
git push origin master
```

### Emergency: Restore Everything
```bash
# Reset to last working version
git reset --hard HEAD~1
git push origin master --force
```

---

## 📱 Testing Your Changes

### Desktop Testing
- Chrome
- Firefox
- Safari
- Edge

### Mobile Testing
- Chrome DevTools (F12 → Toggle Device Toolbar)
- Real mobile devices
- Different screen sizes

### Performance Testing
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Test URL: https://jphart.dev

---

## 🎯 Example: Making a Quick Update

Let's say you want to change the hero headline:

1. **Open `index.html`** in VSCode

2. **Find the hero section** (around line 40):
```html
<h1 class="hero-title">Building Software That Scales</h1>
```

3. **Change the text**:
```html
<h1 class="hero-title">Your New Headline Here</h1>
```

4. **Save the file** (Ctrl+S)

5. **Push to GitHub**:
```bash
git add index.html
git commit -m "Update hero headline"
git push origin master
```

6. **Wait 1-2 minutes**, then visit jphart.dev and refresh!

---

## 💡 Need Help Making Changes?

Just tell me what you want to change, and I can:
- Make the changes for you
- Show you exactly where to edit
- Test the changes locally
- Push them live for you

**What changes would you like to make to your website?**
