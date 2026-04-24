// PAUL'S ASSISTANT - LANGDOCK/HERMES API
// Vercel Serverless Function
// Trigger: Using the exact model list provided by Langdock error
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
            return res.status(500).json({
                error: 'API configuration error',
                response: "I'm currently being set up. Please reach out via email at hello@paulhartmann.dev",
                success: false
            });
        }

        const systemPrompt = `You are "Paul's Assistant". You are an intelligent, high-end AI representative for paulhartmann.dev.

DIRECTIVES:
- Be human, conversational, and sophisticated.
- Do NOT list services or pricing immediately.
- Focus on what the user wants to build.
- Use natural flow, NO emojis, NO bullet points.
- If someone wants to talk to Paul, use [WHATSAPP_REDIRECT].

PAUL'S WORK:
High-end landing pages ($149), full web apps/MVPs ($299), and enterprise AI systems ($499).`;

        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        if (Array.isArray(history)) {
            history.slice(-10).forEach(msg => {
                if (msg.role && msg.content) {
                    messages.push({ role: msg.role, content: msg.content });
                }
            });
        }

        messages.push({ role: 'user', content: message });

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LANGDOCK_API_KEY}`,
        };
        if (LANGDOCK_WORKSPACE_ID) headers['X-Workspace-Id'] = LANGDOCK_WORKSPACE_ID;

        const apiUrl = `${LANGDOCK_ENDPOINT_URL}/chat/completions`;
        
        // Exact list from the Langdock error message
        const modelsToTry = [
            'gpt-5.2', 
            'gpt-5', 
            'gpt-5-mini', 
            'o3', 
            'o4-mini',
            'gpt-5.2-pro'
        ];

        let lastError = "No response";

        for (const modelId of modelsToTry) {
            try {
                console.log(`Trying ${modelId}...`);
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        model: modelId,
                        messages: messages,
                        temperature: 0.7,
                        max_tokens: 800,
                    })
                });

                const responseText = await response.text();

                if (response.ok) {
                    const data = JSON.parse(responseText);
                    const aiResponse = data.choices?.[0]?.message?.content;
                    if (aiResponse) {
                        return res.status(200).json({
                            response: aiResponse,
                            success: true
                        });
                    }
                } else {
                    console.error(`Error with ${modelId}:`, response.status, responseText);
                    lastError = responseText;
                }
            } catch (err) {
                lastError = err.message;
            }
        }

        throw new Error(lastError);

    } catch (error) {
        console.error('Final Assistant Error:', error.message);
        return res.status(500).json({
            error: 'Failed to process',
            response: `Connection failed. Error details: ${error.message.substring(0, 200)}`,
            success: false
        });
    }
}
