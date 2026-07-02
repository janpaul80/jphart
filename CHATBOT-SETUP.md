# AI Chatbot Setup Guide

Complete guide to set up the AI-powered chatbot with Gemini Pro API.

## 🤖 Overview

The chatbot provides:
- AI-powered responses about Paul's services, pricing, and background
- Lead capture after 3 messages
- Integration with Gemini Pro API
- Fallback responses if API fails

## 📋 Prerequisites

1. **Gemini Pro API Key**
   - Get your API key from: https://makersuite.google.com/app/apikey
   - Free tier available with generous limits

2. **Email Setup** (already configured)
   - Email: jp@jphart.dev
   - SMTP: hostingsecure.email

## 🚀 Deployment Steps

### Step 1: Install Dependencies

```bash
npm install
```

This installs `nodemailer` for email functionality.

### Step 2: Set Environment Variables

When deploying to **Vercel**:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:

```
EMAIL_USER=jp@jphart.dev
EMAIL_PASSWORD=your-email-password
GEMINI_API_KEY=your-gemini-api-key-here
```

When deploying to **Netlify**:

1. Go to Site settings → Build & deploy → Environment
2. Add the same variables as above

### Step 3: Deploy

**For Vercel:**
```bash
vercel
```

**For Netlify:**
```bash
netlify deploy --prod
```

## 📁 Files Created

### Frontend Files:
- `chatbot.html` - Chatbot widget HTML structure
- `chatbot.css` - Chatbot styling (dark theme)
- `chatbot.js` - Chatbot logic and API integration

### Backend Files:
- `api/chat.js` - Gemini Pro API endpoint
- `api/lead.js` - Lead capture endpoint

## 🎯 How It Works

### 1. User Interaction
- User clicks the chat bubble in bottom-right corner
- Chatbot window opens with welcome message
- User can ask questions about:
  - Paul's background and experience
  - Services offered
  - Pricing packages
  - Portfolio projects

### 2. AI Response Flow
```
User Message
    ↓
chatbot.js sends to /api/chat
    ↓
api/chat.js calls Gemini Pro API
    ↓
AI generates contextual response
    ↓
Response displayed to user
```

### 3. Lead Capture
- After 3 messages, contact form appears
- User provides: Name, Email, Phone
- Submitted to `/api/lead`
- Email sent to jp@jphart.dev

## 🔧 Configuration

### Customizing AI Responses

Edit `api/chat.js` - `getSystemPrompt()` function:

```javascript
function getSystemPrompt() {
    return `You are an AI assistant for Paul Hartmann...
    
    // Customize the prompt here
    // Add more context about services
    // Update pricing information
    // Modify tone and style
    `;
}
```

### Adjusting Lead Capture Timing

Edit `chatbot.js` - line ~60:

```javascript
// Show contact form after X messages
if (this.messageCount >= 3) {  // Change this number
    this.contactPrompt.style.display = 'block';
}
```

### Fallback Responses

If Gemini API fails, the chatbot uses fallback responses defined in `api/chat.js` - `getFallbackResponse()` function.

## 🎨 Styling

The chatbot matches your website's dark theme:
- Background: `#0a0a0a` (dark)
- Text: `#ffffff` (white)
- Borders: `#1a1a1a` (subtle)

To customize colors, edit `chatbot.css`:

```css
.chatbot-window {
    background-color: var(--color-bg-secondary);
    /* Change colors here */
}
```

## 📊 Testing

### Local Testing

1. Start local server:
```bash
python -m http.server 8000
```

2. Open http://localhost:8000
3. Click chatbot icon
4. Test conversations

**Note:** API calls won't work locally without environment variables. The chatbot will use fallback responses.

### Production Testing

After deployment:
1. Visit your live site
2. Open chatbot
3. Ask questions like:
   - "What services do you offer?"
   - "Tell me about pricing"
   - "What's your experience?"
4. Verify AI responses
5. Test lead capture form

## 🔒 Security

### API Key Protection
- ✅ API key stored in environment variables
- ✅ Never committed to Git
- ✅ Only accessible server-side

### Email Security
- ✅ Credentials in environment variables
- ✅ SSL/TLS encryption (port 465)
- ✅ Input validation on all forms

### Rate Limiting
Consider adding rate limiting to prevent abuse:

```javascript
// In api/chat.js
const rateLimit = new Map();

export default async function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Check rate limit
    if (rateLimit.has(ip)) {
        const lastRequest = rateLimit.get(ip);
        if (Date.now() - lastRequest < 2000) { // 2 seconds
            return res.status(429).json({ error: 'Too many requests' });
        }
    }
    
    rateLimit.set(ip, Date.now());
    // ... rest of code
}
```

## 🐛 Troubleshooting

### Chatbot Not Appearing
- Check if `chatbot.css` and `chatbot.js` are loaded
- Verify files are in the correct directory
- Check browser console for errors

### API Errors
- Verify `GEMINI_API_KEY` is set correctly
- Check API key is valid at https://makersuite.google.com
- Review Vercel/Netlify function logs

### Email Not Sending
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct
- Check SMTP settings in `api/lead.js`
- Review email server logs

### Styling Issues
- Clear browser cache
- Check if CSS variables are defined in `styles.css`
- Verify `chatbot.css` is loaded after `styles.css`

## 📈 Analytics

Track chatbot usage by adding analytics to `chatbot.js`:

```javascript
// After successful message
gtag('event', 'chatbot_message', {
    'event_category': 'Chatbot',
    'event_label': 'User Message'
});

// After lead capture
gtag('event', 'chatbot_lead', {
    'event_category': 'Chatbot',
    'event_label': 'Lead Captured'
});
```

## 🔄 Updates

### Updating AI Knowledge
1. Edit `api/chat.js`
2. Update `getSystemPrompt()` with new information
3. Redeploy

### Adding New Features
- Conversation history export
- Multi-language support
- Voice input/output
- File attachments

## 💡 Best Practices

1. **Monitor API Usage**
   - Check Gemini API dashboard regularly
   - Set up usage alerts
   - Optimize prompts to reduce tokens

2. **Test Regularly**
   - Test chatbot weekly
   - Verify AI responses are accurate
   - Check lead capture functionality

3. **Update Content**
   - Keep pricing information current
   - Update portfolio projects
   - Refresh service descriptions

4. **User Experience**
   - Respond to leads within 24 hours
   - Review conversation logs
   - Improve based on user feedback

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review error logs in Vercel/Netlify
3. Test with fallback responses
4. Verify environment variables

## 🎉 Success Checklist

- [ ] Gemini API key obtained
- [ ] Environment variables set
- [ ] Dependencies installed
- [ ] Deployed to production
- [ ] Chatbot appears on site
- [ ] AI responses working
- [ ] Lead capture functional
- [ ] Emails being received
- [ ] Mobile responsive
- [ ] No console errors

---

**Your AI chatbot is now ready to engage visitors and capture leads!**
