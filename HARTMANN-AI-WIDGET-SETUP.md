# Hartmann AI Widget Setup Guide

## Overview

Custom AI chatbot widget for jphart.dev with:
- Clean, professional design matching the screenshot
- WhatsApp integration (+593 98 9704265)
- Email integration (contact@jphart.dev)
- Powered by Google Gemini API
- 24/7 AI responses about services, pricing, and portfolio

---

## 🚀 Quick Setup

### Step 1: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### Step 2: Configure Environment Variables

1. Create a `.env` file in your project root (if using local development)
2. Add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. For Vercel deployment:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add: `GEMINI_API_KEY` with your API key value
   - Save and redeploy

### Step 3: Update index.html

Remove the Watermelon widget and add the new Hartmann AI widget:

1. **Remove Watermelon script** (in `<head>` section):
   ```html
   <!-- DELETE THIS -->
   <script>
       (function(w,d,s,o,f,js,fjs){
           w['WatermelonChatWidget']=o;...
       }(window, document, 'script', 'wmw', 'https://chatwidget-prod.web.app/embed/init.life.js'));
       wmw('init', { widgetId: 'Ax1ylVTnljx', settingsId: '16180' });
   </script>
   ```

2. **Add new widget files** (before closing `</body>` tag):
   ```html
   <!-- Hartmann AI Widget -->
   <link rel="stylesheet" href="chatbot-new.css">
   <script src="chatbot-new.js"></script>
   ```

3. **Include widget HTML** (before closing `</body>` tag):
   ```html
   <!-- Include the widget -->
   <div id="hartmann-ai-widget-container"></div>
   <script>
       fetch('chatbot-new.html')
           .then(response => response.text())
           .then(html => {
               document.getElementById('hartmann-ai-widget-container').innerHTML = html;
           });
   </script>
   ```

   OR simply copy the contents of `chatbot-new.html` directly into `index.html` before `</body>`.

---

## 📁 Files Created

1. **chatbot-new.html** - Widget HTML structure
2. **chatbot-new.css** - Widget styling (matches screenshot design)
3. **chatbot-new.js** - Frontend JavaScript logic
4. **api/chat-ai.js** - Backend API endpoint (Gemini integration)
5. **.env.example** - Environment variables template

---

## 🎨 Design Features

### Matches Screenshot:
- ✅ "Hartmann Ai" branding header
- ✅ "Your On-Demand AI Engineer" title
- ✅ "How can we help?" help box with 24/7 badge
- ✅ "Send us a message" primary button
- ✅ "CONNECT WITH US" section
- ✅ WhatsApp option with icon and arrow
- ✅ Email option with icon and arrow
- ✅ Clean black and white color scheme
- ✅ Rounded corners and modern UI

### Additional Features:
- Smooth animations and transitions
- Mobile responsive design
- Typing indicator when AI is responding
- Conversation history maintained
- Easy toggle open/close
- Back button to return to main view

---

## 🔧 Configuration

### Contact Information

Update in `chatbot-new.html`:
- **WhatsApp**: Line 67 - `href="https://wa.me/593989704265"`
- **Email**: Line 79 - `href="mailto:contact@jphart.dev"`

### AI Context

The AI has knowledge about:
- Paul's background and experience
- All services offered
- Complete pricing details ($149, $299, $499)
- Portfolio projects
- Contact information
- HeftCoder product

Edit the `systemContext` in `api/chat-ai.js` to update AI knowledge.

---

## 🌐 Deployment

### For Vercel:

1. **Add Environment Variable:**
   ```
   GEMINI_API_KEY=your_api_key
   ```

2. **Deploy:**
   ```bash
   git add .
   git commit -m "Add custom Hartmann AI widget"
   git push
   ```

3. **Verify:**
   - Visit your live site
   - Click the chat widget
   - Test a message
   - Verify WhatsApp and Email links work

---

## 🧪 Testing

### Local Testing:

1. Create `.env` file with your Gemini API key
2. Run local server:
   ```bash
   vercel dev
   ```
3. Open http://localhost:3000
4. Test the widget

### Production Testing:

1. Open https://jphart.dev
2. Click chat widget button (bottom right)
3. Test "Send us a message" button
4. Send a test message (e.g., "What are your pricing options?")
5. Verify AI responds correctly
6. Test WhatsApp link (should open WhatsApp with +593 98 9704265)
7. Test Email link (should open email client with contact@jphart.dev)

---

## 🔑 API Key Setup

### Get Gemini API Key (FREE):

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Add to Vercel environment variables

### Gemini API Limits (Free Tier):
- 60 requests per minute
- Sufficient for most websites
- No credit card required

### Alternative: Mistral API

If you prefer Mistral instead of Gemini:

1. Get API key from: https://console.mistral.ai/
2. Update `api/chat-ai.js` to use Mistral endpoint
3. Set `MISTRAL_API_KEY` environment variable

---

## 📱 Contact Integration

### WhatsApp:
- Number: +593 98 9704265
- Format: `https://wa.me/593989704265`
- Opens WhatsApp app or web.whatsapp.com
- Pre-filled message optional (add `?text=Hello`)

### Email:
- Address: contact@jphart.dev
- Format: `mailto:contact@jphart.dev`
- Opens default email client
- Subject line optional (add `?subject=Inquiry`)

---

## 🎯 Features

### Main View:
1. Hartmann Ai branding
2. "Your On-Demand AI Engineer" headline
3. Help box with 24/7 availability
4. Primary CTA button
5. WhatsApp and Email quick links

### Chat View:
1. Back button to return to main view
2. Conversation history
3. AI-powered responses
4. Typing indicator
5. Message input with send button

---

## 🔒 Security

- API key stored in environment variables (never in code)
- CORS headers configured
- Input validation on backend
- Rate limiting recommended (add if needed)
- Safe content filtering via Gemini safety settings

---

## 🐛 Troubleshooting

### Widget not appearing:
- Check if files are properly linked in index.html
- Verify CSS and JS files are loaded (check browser console)
- Clear browser cache

### AI not responding:
- Check GEMINI_API_KEY is set in Vercel
- Verify API key is valid
- Check browser console for errors
- Check Vercel function logs

### WhatsApp link not working:
- Verify number format: +593989704265 (no spaces or dashes)
- Test on mobile device
- Check if WhatsApp is installed

### Email link not working:
- Verify email address is correct
- Check if default email client is configured
- Try different browser

---

## 📊 Analytics (Optional)

Track widget usage by adding to `chatbot-new.js`:

```javascript
// Track widget opens
openWidget() {
    this.isOpen = true;
    this.toggle.classList.add('active');
    this.window.classList.add('active');
    
    // Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'widget_open', {
            event_category: 'engagement',
            event_label: 'Hartmann AI Widget'
        });
    }
}

// Track messages sent
handleChatSubmit(e) {
    // ... existing code ...
    
    // Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'chat_message_sent', {
            event_category: 'engagement',
            event_label: 'AI Chat'
        });
    }
}
```

---

## 🔄 Migration from Watermelon

### Steps:
1. ✅ Remove Watermelon script from index.html
2. ✅ Add new widget files (HTML, CSS, JS)
3. ✅ Configure Gemini API key
4. ✅ Test functionality
5. ✅ Deploy to production

### Benefits of Custom Widget:
- Full control over design and functionality
- No third-party dependencies
- Better performance
- Custom AI responses tailored to your business
- Direct WhatsApp and Email integration
- Free (using Gemini free tier)
- Better privacy (data stays with you)

---

## 📞 Support

If you need help:
1. Check browser console for errors (F12)
2. Verify environment variables are set
3. Test API endpoint directly: POST to /api/chat-ai
4. Check Vercel function logs

---

## 🎨 Customization

### Colors:
Edit `chatbot-new.css`:
- Primary color: `#000000` (black)
- Background: `#ffffff` (white)
- Accent: `#f8f9fa` (light gray)

### Branding:
Edit `chatbot-new.html`:
- Line 13: Change "Hartmann Ai" to your preferred name
- Line 19: Update headline text

### Contact Info:
- WhatsApp: Update number in HTML (line 67)
- Email: Update address in HTML (line 79)

---

**Created:** 2025-01-08
**Status:** Ready for deployment
**API:** Google Gemini (free tier)
