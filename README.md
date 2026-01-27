# JP Hart Portfolio Website

A modern, professional dark-themed portfolio website for a full-stack software developer and software studio.

## 🎨 Design Features

- **Dark Theme**: Deep black backgrounds with elegant dark gray sections
- **Minimal Aesthetic**: Clean, professional design without neon colors or gradients
- **Smooth Animations**: Subtle fade-ins, slide-ups, and hover transitions
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices

## 📋 Sections

1. **Hero Section**: Strong value proposition with clear CTA
2. **Services**: 5 core offerings (Web Apps, Mobile Apps, Backend & APIs, UI/UX, Deployment)
3. **Portfolio**: Project showcase with tech stack tags
4. **Testimonials**: Real client feedback with avatars
5. **Pricing**: Two-tier package structure (Basic & Pro)
6. **Tech Carousel**: Animated brand/technology showcase
7. **Contact Form**: Professional contact form with validation

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
For the best experience, run a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 File Structure

```
jp/
├── index.html          # Main HTML structure
├── styles.css          # All styling (dark theme)
├── script.js           # Animations, carousel, form handling
└── README.md           # This file
```

## 🎯 Key Features

### Animations
- Intersection Observer for scroll-triggered animations
- Smooth entrance effects for cards and sections
- Subtle hover transitions
- Infinite tech carousel

### Contact Form
- Client-side validation
- Email format verification
- Success/error states
- Ready for backend integration

### Accessibility
- Semantic HTML5
- ARIA labels
- Keyboard navigation support
- Focus states
- Reduced motion support

### Performance
- Optimized animations
- Lazy loading for images
- Debounced scroll events
- Clean, efficient code

## 🛠️ Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-bg-primary: #0a0a0a;
    --color-bg-secondary: #1a1a1a;
    --color-text-primary: #ffffff;
    --color-text-secondary: #a0a0a0;
    /* ... */
}
```

### Content
- Update text in `index.html`
- Replace project details in the Portfolio section
- Modify testimonials with real client feedback
- Update social links in the footer

### Form Integration
Replace the simulated form submission in `script.js` with your backend API:
```javascript
// In contactForm event listener
await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 To-Do / Future Enhancements

- [ ] Add actual project images/screenshots
- [ ] Integrate with backend API for contact form
- [ ] Add Google Analytics or privacy-friendly alternative
- [ ] Implement blog section (optional)
- [ ] Add case studies for projects
- [ ] Set up custom domain DNS
- [ ] Add meta tags for social sharing (Open Graph, Twitter Cards)
- [ ] Implement dark/light mode toggle (optional)

## 🔒 Security Notes

When deploying:
- Implement CSRF protection for forms
- Add rate limiting to prevent spam
- Use environment variables for API keys
- Enable HTTPS
- Add Content Security Policy headers

## 📄 License

© 2024 jphart.dev. All rights reserved.

## 🤝 Contact

For inquiries, use the contact form on the website or reach out through social media links in the footer.

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript.
