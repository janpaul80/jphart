// PAUL'S ASSISTANT - LANGDOCK/HERMES API
// Vercel Serverless Function
// Trigger: Upgraded to GPT-5.2 for better reasoning
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

        const systemPrompt = `You are the AI Assistant for Paul Hartmann (paulhartmann.dev). You are a high-end, premium representative.

CORE DIRECTIVE:
Be fluid, human, and sophisticated. Do NOT use bullet points unless necessary. Do NOT dump pricing unless specifically asked. Focus on the user's project first.

PERSONALITY:
- Premium and professional.
- refer to Paul Hartmann in the third person.
- NO emojis.
- If the user says "Hi", reply with a warm, professional greeting and ask about their goals.

KNOWLEDGE:
Paul builds premium landing pages ($149), web apps ($299), and AI-integrated systems ($499).
He also runs CoderXP, Rev-Pro, and FileNinja.

ACTIONS:
- LEAD GEN: Ask for name/email naturally when interest is shown.
- DIRECT CONTACT: Append "[WHATSAPP_REDIRECT]" if they want to speak with Paul directly.

Important: Maintain the flow of conversation. Reference previous parts of the chat if helpful.`;

        // Build messages array
        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        // Ensure history is correctly formatted and not too long
        const cleanHistory = Array.isArray(history) ? history.slice(-10) : [];
        cleanHistory.forEach(msg => {
            if (msg.role && msg.content) {
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
        
        // Priority models: gpt-5.2 (User requested), gpt-5, gpt-5-mini
        const modelsToTry = ['gpt-5.2', 'gpt-5', 'gpt-5-mini', 'o3'];
        let lastError = "No response from AI service";

        for (const modelId of modelsToTry) {
            try {
                console.log(`Calling Langdock with model: ${modelId}`);
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        model: modelId,
                        messages: messages,
                        temperature: 0.7,
                        max_tokens: 1000,
                    })
                });

                const responseText = await response.text();

                if (response.ok) {
                    try {
                        const data = JSON.parse(responseText);
                        const aiResponse = data.choices?.[0]?.message?.content;
                        if (aiResponse) {
                            return res.status(200).json({
                                response: aiResponse,
                                success: true
                            });
                        }
                    } catch (e) {
                        console.error('JSON Parse Error:', e);
                        lastError = `Malformed JSON: ${responseText.substring(0, 50)}`;
                    }
                } else {
                    console.error(`Langdock Error (${modelId}):`, response.status, responseText);
                    lastError = `Status ${response.status}: ${responseText.substring(0, 100)}`;
                }
            } catch (err) {
                console.error(`Fetch error for ${modelId}:`, err);
                lastError = err.message;
            }
        }

        throw new Error(lastError);

    } catch (error) {
        console.error('Assistant Error:', error.message || error);
        return res.status(500).json({
            error: 'Failed to process your message',
            response: `I'm having a little trouble connecting right now (Error: ${error.message || 'Service Unavailable'}). Please reach out directly via WhatsApp (+43 670 6034585) or email hello@paulhartmann.dev.`,
            success: false
        });
    }
}
