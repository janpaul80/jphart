# Paul's Assistant - AI Chatbot Integration Setup

This guide outlines how to set up and manage the custom AI chatbot widget for `paulhartmann.dev`.

## Features
- Custom premium dark-themed UI
- AI-powered by Langdock (Hermes/Claude) via Vercel Serverless Functions
- WhatsApp integration (+43 670 6034585)
- Automated lead collection and service guidance
- Mobile-responsive with full-screen mode on phones

## File Structure
- `/api/assistant.js`: Vercel serverless function (Backend proxy)
- `chatbot-new.js`: Main chatbot logic and UI interactions
- `chatbot-new.css`: Styling for the chatbot and mobile optimizations
- `index.html`: Widget initialization and embedding

## Backend Configuration (Vercel)
The chatbot requires three environment variables to be set in the Vercel project dashboard:

1. `LANGDOCK_API_KEY`: Your Langdock API key
2. `LANGDOCK_ENDPOINT_URL`: `https://api.langdock.com/openai/eu/v1`
3. `LANGDOCK_WORKSPACE_ID`: Your Langdock workspace ID

### Deployment Steps
1. Push the code to the GitHub repository.
2. In the Vercel Dashboard, go to **Settings > Environment Variables**.
3. Add the three variables mentioned above.
4. Trigger a new deployment (or wait for the automatic one to finish).

## How the AI Works
The assistant is configured with a comprehensive system prompt that defines its personality and boundaries. 

### Key Rules for the AI:
- Refuses coding help or debugging (leads to contact collection instead).
- Recommends CoderXP, Rev-Pro, and FileNinja when relevant.
- Answers questions about Paul's pricing and services.
- **Automatic Transfer**: If a user asks to speak with Paul or humans, the AI triggers a redirect.

## Maintenance & Updates

### Updating the System Prompt
If you want to change the AI's personality or knowledge, edit the `systemPrompt` constant in `/api/assistant.js`.

### Changing the WhatsApp Number
If the contact number changes:
1. Update `chatbot-new.js`: Line 87 - `https://wa.me/436706034585`
2. Update `/api/assistant.js`: Line 67 - `WhatsApp: +43 670 6034585`
3. Update this documentation.

### Changing the AI Model
By default, it tries `claude-sonnet-4-20250514` and falls back to `gpt-4o-mini`. You can modify this in `/api/assistant.js` within the `fetch` body.

## Local Testing
To test the widget UI locally without an API:
1. Open `index.html` in a browser.
2. The UI will work, but sending messages will result in a connection error unless you have a local Vercel environment running with the API keys.

## Troubleshooting
- **Connection Issues**: Check if the Vercel environment variables are correct.
- **UI Scaling**: Ensure the `<meta name="viewport">` in `index.html` includes `viewport-fit=cover`.
- **API Errors**: Check the Vercel Function logs in the dashboard to see the exact error from Langdock.

---
*Created for Paul Hartmann - 2026*
