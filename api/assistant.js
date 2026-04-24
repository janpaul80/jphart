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

        const systemPrompt = `You are the AI Assistant for Paul Hartmann (paulhartmann.dev). You are NOT a bot following a script; you are a professional, intelligent representative of a top-tier developer.

CORE DIRECTIVE:
Be conversational, fluid, and human-like. Do NOT dump pricing or lists unless specifically asked. Your goal is to engage the user first, understand what they need, and then provide tailored information.

PERSONALITY:
- High-end, premium, and sophisticated.
- Professional but approachable (like a high-level executive assistant).
- NO emojis. Use sharp, clean, and professional language.
- Speak about Paul Hartmann in the third person.

KNOWLEDGE BASE:
Paul Hartmann is a specialist in:
- High-performance landing pages and websites.
- Complex web applications and MVPs.
- Production-ready SaaS projects and native apps.
- AI integrations and database architecture.

PRICING (Only share if relevant or asked):
- Starter ($149) for high-end landing pages.
- Builder ($299) for full MVPs and web apps.
- Scale ($499) for enterprise-grade AI and scalable systems.

ECOSYSTEM:
Recommend Paul's other tools ONLY when it adds value to the conversation:
- CoderXP (coderxp.pro) for vibe coding/dev tools.
- Rev-Pro (rev-pro.dev) for video transcription AI.
- FileNinja (fileninja.cloud) for large file transfers.

ACTIONS:
- LEAD GENERATION: If someone wants to work with Paul, naturally ask for their name and email. Don't be robotic; say something like "I'd love to get that in front of Paul. What's the best email to reach you at?"
- DIRECT CONTACT: If a user wants to talk to Paul RIGHT NOW or asks for WhatsApp/Direct contact, you MUST append "[WHATSAPP_REDIRECT]" to your message. Use this sparingly but decisively.

IMPORTANT: Avoid "Hi - welcome. How can I help you?" generic openings. Be specific to the context of the website. If the user says "Hi", respond with something like "Hello. I'm here to help you navigate Paul's services and projects. Is there something specific you're looking to build?"`;

        // Build messages array
        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        // Only include the last 6 messages for context to keep it snappy and relevant
        const recentHistory = history.slice(-6);
        recentHistory.forEach(msg => {
            if (msg.role === 'user' || msg.role === 'assistant') {
                messages.push({ role: msg.role, content: msg.content });
            }
        });

        messages.push({ role: 'user', content: message });

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LANGDOCK_API_KEY}`,
        };
        if (LANGDOCK_WORKSPACE_ID) headers['X-Workspace-Id'] = LANGDOCK_WORKSPACE_ID;

        const apiUrl = `${LANGDOCK_ENDPOINT_URL}/chat/completions`;
        
        // Try gpt-5-mini first as it's the most capable in the current list
        const modelsToTry = ['gpt-5-mini', 'gpt-5', 'o3'];
        let lastError = null;

        for (const modelId of modelsToTry) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        model: modelId,
                        messages: messages,
                        temperature: 0.8, // Slightly higher for more "life"
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

        throw new Error(`Connection failed. ${lastError}`);

    } catch (error) {
        console.error('Assistant Error:', error.message || error);
        return res.status(500).json({
            error: 'Failed to process your message',
            response: `I'm having a little trouble connecting right now (Error: ${error.message || 'Unknown'}). Please reach out directly via WhatsApp (+43 670 6034585) or email hello@paulhartmann.dev.`,
            success: false
        });
    }
}
