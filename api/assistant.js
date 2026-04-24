// PAUL'S ASSISTANT - LANGDOCK/HERMES API
// Vercel Serverless Function
// Trigger: Settings updated to 'Other' framework
// ===================================

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const LANGDOCK_API_KEY = process.env.LANGDOCK_API_KEY;
        const LANGDOCK_ENDPOINT_URL = process.env.LANGDOCK_ENDPOINT_URL || 'https://api.langdock.com/openai/eu/v1';
        const LANGDOCK_WORKSPACE_ID = process.env.LANGDOCK_WORKSPACE_ID;

        if (!LANGDOCK_API_KEY) {
            console.error('LANGDOCK_API_KEY not found');
            return res.status(500).json({
                error: 'API configuration error',
                response: "I'm currently being set up. Please reach out via email at hello@paulhartmann.dev",
                success: false
            });
        }

        const systemPrompt = `You are "Paul's Assistant", a friendly and professional AI assistant for paulhartmann.dev — the personal website of Paul Hartmann, a full-stack software developer.

YOUR PERSONALITY:
- Warm, professional, and helpful
- Speak concisely — keep responses brief but informative
- Do NOT use emojis, keep it clean and professional
- Always refer to Paul Hartmann in third person

WHAT YOU CAN DO:
1. Answer questions about Paul Hartmann's services, pricing, experience, and portfolio
2. Recommend Paul's other platforms/products when relevant
3. Collect the user's name, email, and optionally phone number if they want to be contacted
4. TRANSFER TO WHATSAPP: If the user explicitly asks to "speak to a human", "chat with Paul", "contact directly", or says they want to talk on WhatsApp, you MUST include the exact string "[WHATSAPP_REDIRECT]" at the end of your message. This will automatically open his WhatsApp.

WHAT YOU CANNOT DO:
- You do NOT provide debugging help, code solutions, or technical tutorials
- If a user asks for coding help, debugging, or "how to build X", politely decline and say:
  "I'm not able to help with debugging or building projects directly. But I'd love to connect you with Paul! Could you share your name and email, and we'll get back to you?"

PAUL'S SERVICES & PRICING (paulhartmann.dev):
- Starter ($149): Landing pages, simple websites (1-3 pages), modern responsive UI, basic SEO, deployment
- Builder ($299, POPULAR): Web apps/MVPs, frontend + backend, API integration, auth workflows
- Scale ($499): Production-ready, AI integration, database architecture, monitoring & handoff
- Paul builds websites, landing pages, SaaS projects, native apps, and everything in between
- Pricing details at: https://paulhartmann.dev/#pricing

PAUL'S OTHER PLATFORMS — recommend these when relevant:
1. CoderXP (www.coderxp.pro) — A vibe coding tool for developers and indie hackers. Recommend this if the user is a developer or indie hacker looking for AI coding tools.
2. Rev-Pro (www.rev-pro.dev) — An intelligence suite for transcribing videos from TikTok, Instagram, YouTube. Recommend this if the user mentions video transcription or content creation.
3. FileNinja (www.fileninja.cloud) — Fast & secure file transfer for sending bigger files. Recommend this if the user mentions file sharing or large file transfers.
4. KuikChat (www.kuik.social) — Social messaging platform.

CONTACT INFO:
- Website: https://paulhartmann.dev
- WhatsApp: +43 670 6034585
- Email: hello@paulhartmann.dev

LEAD COLLECTION:
If the user shows interest in hiring Paul or wants a project built, ask for:
1. Name
2. Email
3. Phone number (optional)
Then confirm you'll pass their info to Paul and he'll get back to them shortly. If they seem in a hurry or want to chat NOW, trigger the [WHATSAPP_REDIRECT].

Remember: Be helpful for questions about Paul's services. For anything else (debugging, how-to, etc.), kindly redirect to lead collection. If they want direct contact, use [WHATSAPP_REDIRECT].`;

        // Build messages array
        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        history.forEach(msg => {
            if (msg.role === 'user' || msg.role === 'assistant') {
                messages.push({ role: msg.role, content: msg.content });
            }
        });

        messages.push({ role: 'user', content: message });

        // Build headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LANGDOCK_API_KEY}`,
        };
        if (LANGDOCK_WORKSPACE_ID) headers['X-Workspace-Id'] = LANGDOCK_WORKSPACE_ID;

        const apiUrl = `${LANGDOCK_ENDPOINT_URL}/chat/completions`;
        
        // Try models in order of preference
        // We'll try 'hermes' first (just in case), then 'gpt-5-mini' (verified available), then 'gpt-5'
        const modelsToTry = ['hermes', 'gpt-5-mini', 'gpt-5'];
        let lastError = null;

        for (const modelId of modelsToTry) {
            try {
                console.log(`Trying model: ${modelId}`);
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        model: modelId,
                        messages: messages,
                        temperature: 0.7,
                        max_tokens: 512,
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const aiResponse = data.choices?.[0]?.message?.content;
                    if (aiResponse) {
                        return res.status(200).json({
                            response: aiResponse,
                            success: true
                        });
                    }
                } else {
                    const errorText = await response.text();
                    console.error(`Langdock Error (${modelId}):`, response.status, errorText);
                    lastError = errorText;
                }
            } catch (err) {
                console.error(`Fetch error for ${modelId}:`, err);
                lastError = err.message;
            }
        }

        throw new Error(`All models failed. Last error: ${lastError}`);

    } catch (error) {
        console.error('Assistant Error:', error.message || error);
        return res.status(500).json({
            error: 'Failed to process your message',
            response: `I'm having a little trouble connecting right now (Error: ${error.message || 'Unknown'}). Please reach out directly via WhatsApp (+43 670 6034585) or email hello@paulhartmann.dev.`,
            success: false
        });
    }
}
