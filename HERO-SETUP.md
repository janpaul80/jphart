# Hero Section Setup Guide

## 🎯 Current Implementation

Your hero section now features:
- **MASSIVE "PAUL" typography** (8rem to 26rem - scales with viewport)
- **PIXI.js RGB glitch effect** on your photo background
- **Live clock** showing local time
- **2 info badges** (Netherlands, Worldwide)
- **Single Contact CTA** (in navigation only)

---

## 📸 Step 1: Add Your Photo

### Option A: Local File
1. Add your photo to the project directory:
   ```
   jp/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── paul-hartmann.jpg  ← Add your photo here
   ```

2. Update the image path in `script.js` (line ~440):
   ```javascript
   const imgLink = 'paul-hartmann.jpg';
   ```

### Option B: Images Folder (Recommended)
1. Create an `images` folder and add your photo:
   ```
   jp/
   ├── images/
   │   └── paul-portrait.jpg  ← Add your photo here
   ├── index.html
   ├── styles.css
   ├── script.js
   ```

2. Update the image path in `script.js`:
   ```javascript
   const imgLink = 'images/paul-portrait.jpg';
   ```

### Photo Requirements:
- **Format**: JPG or PNG
- **Resolution**: At least 1200px wide
- **Orientation**: Portrait (vertical) works best
- **Lighting**: Dark/moody lighting enhances the glitch effect
- **Background**: Simple backgrounds work better

---

## ⚙️ Step 2: Customize the Glitch Effect

### Current Settings (Subtle & Premium)
Located in `script.js` in the `animate()` method:

```javascript
// RGB Split intensity
gsap.to(this.rgbSplitFilter.red, {
    duration: 0.1,
    x: () => gsap.utils.random(-3, 3),  // ← Adjust these values
    y: () => gsap.utils.random(-3, 3),
    repeat: -1,
    repeatDelay: gsap.utils.random(2, 5),  // ← Time between glitches
    yoyo: true,
});
```

### Intensity Presets:

**Subtle (Current - Premium)**
```javascript
x: () => gsap.utils.random(-3, 3),
y: () => gsap.utils.random(-3, 3),
repeatDelay: gsap.utils.random(2, 5),
```

**Medium**
```javascript
x: () => gsap.utils.random(-8, 8),
y: () => gsap.utils.random(-8, 8),
repeatDelay: gsap.utils.random(1, 3),
```

**Aggressive**
```javascript
x: () => gsap.utils.random(-15, 15),
y: () => gsap.utils.random(-15, 15),
repeatDelay: gsap.utils.random(0.5, 2),
```

---

## 🎨 Step 3: Adjust Photo Opacity

In `styles.css`, find `.pixi-canvas`:

```css
.pixi-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.5;  /* ← Adjust this (0.3 = subtle, 0.7 = prominent) */
}
```

**Recommended values:**
- `0.3` - Very subtle, text-focused
- `0.5` - Balanced (current)
- `0.7` - Photo more visible

---

## 📏 Step 4: Adjust "PAUL" Size (If Needed)

In `styles.css`, find `.hero-name`:

```css
.hero-name {
    font-size: clamp(8rem, 20vw, 26rem);  /* ← Adjust max value */
    font-weight: 900;
    line-height: 0.85;
    letter-spacing: -0.05em;
}
```

**Size guide:**
- `clamp(8rem, 20vw, 26rem)` - Current (HUGE)
- `clamp(10rem, 22vw, 30rem)` - Even bigger
- `clamp(6rem, 18vw, 22rem)` - Slightly smaller

---

## 🔧 Troubleshooting

### Image Not Loading?
1. Check the file path is correct
2. Check the file name matches exactly (case-sensitive)
3. Open browser console (F12) to see error messages
4. Try using a full URL temporarily to test:
   ```javascript
   const imgLink = 'https://your-image-url.com/photo.jpg';
   ```

### Glitch Too Intense?
Reduce the random values:
```javascript
x: () => gsap.utils.random(-1, 1),  // Very subtle
```

### Glitch Too Subtle?
Increase the random values and reduce delay:
```javascript
x: () => gsap.utils.random(-10, 10),
repeatDelay: gsap.utils.random(0.5, 2),
```

### Photo Too Dark/Light?
Add CSS filter to `.pixi-canvas`:
```css
.pixi-canvas {
    opacity: 0.5;
    filter: brightness(1.2);  /* Lighten */
    /* or */
    filter: brightness(0.8);  /* Darken */
}
```

---

## 🎯 Advanced Customizations

### Add Hover Glitch Intensity
In `script.js`, add to the `HeroGlitch` class:

```javascript
setupImage(texture) {
    // ... existing code ...
    
    // Add hover effect
    const heroName = document.querySelector('.hero-name');
    heroName.addEventListener('mouseenter', () => {
        gsap.to(this.rgbSplitFilter.red, {
            x: () => gsap.utils.random(-10, 10),
            duration: 0.05,
        });
    });
}
```

### Change Photo Position
In `script.js`, modify the positioning:

```javascript
// Move photo to the right
this.img.x = this.app.screen.width * 0.7;

// Move photo up
this.img.y = this.app.screen.height * 0.4;
```

### Add Grayscale Effect
In `setupFilters()` method:

```javascript
setupFilters() {
    const rgbSplitFilter = new PIXI.filters.RGBSplitFilter();
    const colorMatrix = new PIXI.filters.ColorMatrixFilter();
    colorMatrix.desaturate();  // Grayscale
    
    this.img.filters = [rgbSplitFilter, colorMatrix];
    this.rgbSplitFilter = rgbSplitFilter;
}
```

---

## ✅ Quick Checklist

- [ ] Add your photo to the project
- [ ] Update image path in `script.js` (line ~440)
- [ ] Test the website in browser
- [ ] Adjust glitch intensity if needed
- [ ] Adjust photo opacity if needed
- [ ] Verify "PAUL" size looks good
- [ ] Test on mobile devices

---

## 🚀 Next Steps

1. **Add your photo** - This is the most important step!
2. **Test locally** - Open `index.html` in your browser
3. **Adjust settings** - Fine-tune glitch intensity and opacity
4. **Deploy** - Follow DEPLOYMENT.md when ready

---

## 💡 Pro Tips

1. **Photo Quality**: Use a high-resolution photo (at least 1200px wide)
2. **Lighting**: Dark, moody photos work best with the glitch effect
3. **Composition**: Portrait orientation with your face/upper body
4. **File Size**: Optimize your photo (use tools like TinyPNG) to keep it under 500KB
5. **Format**: JPG is recommended for photos (smaller file size than PNG)

---

## 📞 Need Help?

If the glitch effect isn't working:
1. Check browser console for errors (F12)
2. Verify GSAP and PIXI.js are loading (check Network tab)
3. Confirm your photo path is correct
4. Try using a test image URL first to verify the effect works

---

**Remember**: The key to this design is the balance between the massive "PAUL" typography and the subtle glitched photo behind it. Keep it minimal and premium!
