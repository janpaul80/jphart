# Portfolio Images Setup Guide

## 📁 Directory Structure

Create this folder structure:
```
jp/
├── images/
│   ├── paul-portrait.jpeg (already exists)
│   └── portfolio/
│       ├── nextcoder.jpg
│       ├── vidhart.jpg
│       ├── safebike.jpg
│       ├── kquikapp.jpg
│       ├── finsync.jpg
│       └── teammesh.jpg
```

## 📐 Image Specifications

### Recommended Dimensions
- **Width**: 1200px
- **Height**: 675px (16:9 ratio)
- **Alternative**: 800x600px (4:3 ratio)
- **Format**: JPG or PNG
- **File size**: Keep under 500KB for performance

### Image Style
- Professional screenshots or mockups
- Dark theme preferred (matches site aesthetic)
- Clean, minimal presentation
- High contrast for visibility

## 🎨 What to Include

For each project, capture:
1. **Main interface** - The primary screen/dashboard
2. **Key features** - Highlight unique functionality
3. **Clean composition** - Remove clutter, focus on design

## 📝 Current Projects

1. **NextCoder** (`nextcoder.jpg`)
   - AI code generation platform
   - Show: Code editor, AI suggestions, workflow

2. **Vidhart** (`vidhart.jpg`)
   - Video collaboration platform
   - Show: Video player, annotation tools, timeline

3. **SafeBike App** (`safebike.jpg`)
   - Mobile safety app for cyclists
   - Show: Map interface, tracking, alerts

4. **KquikApp** (`kquikapp.jpg`)
   - Delivery management system
   - Show: Dashboard, courier tracking, orders

5. **FinSync** (`finsync.jpg`)
   - Financial analytics dashboard
   - Show: Charts, metrics, forecasting

6. **TeamMesh** (`teammesh.jpg`)
   - Project management tool
   - Show: Task board, time tracking, team view

## 🚀 How to Add Images

### Step 1: Create Directory
```bash
mkdir images/portfolio
```

### Step 2: Add Your Images
Place your 6 project images in `images/portfolio/` with the exact names above.

### Step 3: Images Will Auto-Load
The HTML is already configured to look for these images. Once you add them, they'll display automatically.

## 💡 Tips

- **Use mockups** if you don't have actual screenshots
- **Tools**: Figma, Sketch, or mockup generators
- **Placeholder option**: Use https://placehold.co/1200x675/0a0a0a/ffffff?text=ProjectName
- **Optimize**: Use TinyPNG or similar to compress images

## ⚠️ Important

- File names must match exactly (lowercase)
- Keep images professional and high-quality
- Ensure images work on dark backgrounds
- Test on mobile devices

## 🔄 Future Updates

To add more projects:
1. Add image to `/images/portfolio/`
2. Add new portfolio card in `index.html`
3. Follow existing card structure
