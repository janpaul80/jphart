# Watermelon AI Widget Setup Guide

## Current Issue

The Watermelon widget requires the NPM package `watermelon-widget-injection`, but GitHub Pages is a static hosting service that doesn't support NPM packages directly.

## Solution Options

### Option 1: Use CDN (Recommended for GitHub Pages)

Since you're on GitHub Pages (static hosting), we need to use a browser-compatible version. I'll create a custom implementation that mimics the NPM package behavior.

### Option 2: Build Process (Better Long-term)

Set up a build process that bundles the NPM package into your static files before deploying.

---

## Implementation (Option 1 - Custom Script)

I've added a custom implementation in `script.js` that will:
1. Load the Watermelon widget dynamically
2. Initialize it with your widget ID and settings ID
3. Provide login/logout functions for user tracking

### Your Widget Configuration:
- **Widget ID:** `Ax1yIVTnJx` (Note: You provided `Ax1ylVTnljx` - please verify which is correct)
- **Settings ID:** `16180`
- **Environment:** `prod`

---

## How It Works

The widget will now:
1. Auto-inject on page load
2. Appear as a chat bubble in the bottom-right corner
3. Work on both desktop and mobile

### For User Tracking (Optional):

If you want to track logged-in users, you can call these functions:

```javascript
// After user logs in
window.watermelonLogin({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    user_id: 'unique-user-id-123'
});

// After user logs out
window.watermelonLogout();
```

---

## Option 2: Using NPM with Build Process

If you want to use the official NPM package, you'll need to:

### Step 1: Set Up Build Process

```bash
# Initialize npm project
npm init -y

# Install the package
npm install watermelon-widget-injection --legacy-peer-deps

# Install build tools
npm install --save-dev webpack webpack-cli
```

### Step 2: Create webpack.config.js

```javascript
const path = require('path');

module.exports = {
  entry: './src/widget-init.js',
  output: {
    filename: 'watermelon-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production'
};
```

### Step 3: Create src/widget-init.js

```javascript
import { injectWidget } from 'watermelon-widget-injection';

const widgetId = 'Ax1yIVTnJx';
const settingsId = 16180;

// Initialize widget on page load
document.addEventListener('DOMContentLoaded', () => {
    injectWidget(widgetId, settingsId, 'prod');
});

// Export login function
window.watermelonLogin = (userData) => {
    const { first_name, last_name, email, phone, user_id } = userData;
    
    injectWidget(widgetId, settingsId, 'prod', first_name, last_name, email, phone, user_id);
    
    setTimeout(() => {
        const iframe = document.querySelector('.watermelon-embed-frame');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'login',
                payload: {
                    first_name,
                    last_name,
                    email,
                    phone,
                    user_id,
                }
            }, '*');
        }
    }, 2000);
};

// Export logout function
window.watermelonLogout = () => {
    const iframe = document.querySelector('.watermelon-embed-frame');
    
    window.postMessage({ type: 'logout', payload: {} }, '*');
    
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'logout' }, '*');
    }
};
```

### Step 4: Build and Deploy

```bash
# Build the bundle
npx webpack

# This creates dist/watermelon-bundle.js
# Include it in your HTML instead of script.js
```

### Step 5: Update index.html

```html
<script src="dist/watermelon-bundle.js"></script>
```

---

## Troubleshooting

### Widget Not Appearing?

1. **Check Console:** Open browser DevTools (F12) and look for errors
2. **Verify IDs:** Make sure Widget ID and Settings ID are correct
3. **Check Network:** Look for failed requests to watermelon servers
4. **Clear Cache:** Hard refresh (Ctrl+Shift+R)

### Widget ID Discrepancy

You provided two different IDs:
- In feedback: `Ax1ylVTnljx`
- In current code: `Ax1yIVTnJx`

Please verify which one is correct!

---

## Current Implementation Status

✅ Custom JavaScript implementation added to `script.js`
✅ Widget will auto-load on page load
✅ Login/logout functions available globally
⏳ **ACTION REQUIRED:** Verify your Widget ID is correct
⏳ **OPTIONAL:** Set up NPM build process for official package

---

## Testing

1. Visit jphart.dev
2. Look for chat bubble in bottom-right corner
3. Click to open chat interface
4. Test on mobile and desktop

---

Need help with any of these steps? Let me know!
