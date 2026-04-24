// PAUL'S ASSISTANT - BLACKBOX AI API
// Vercel Serverless Function
// ===================================

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { message, history = [] } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required' });

        const BLACKBOX_API_KEY_RAW = process.env.BLACKBOX_API_KEY;
        const BLACKBOX_ENDPOINT_URL = process.env.BLACKBOX_ENDPOINT_URL || 'https://api.blackbox.ai/chat/completions';
        const BLACKBOX_API_KEY = BLACKBOX_API_KEY_RAW ? BLACKBOX_API_KEY_RAW.split(',')[0].trim() : null;

        if (!BLACKBOX_API_KEY) {
            return res.status(500).json({
                error: 'Missing API Key',
                response: "I'm currently being updated. Please reach out to Paul via WhatsApp (+43 670 6034585).",
                success: false
            });
        }

        const systemPrompt = `You are the personal AI Assistant for Paul Hartmann (paulhartmann.dev).
        
DIRECTIVES:
- Sophisticated, professional, human.
- NO emojis. NO lists at the start.
- refer to Paul Hartmann in third person.
- If they want to talk to Paul directly, append [WHATSAPP_REDIRECT].

PAUL'S PRICING:
- Starter ($149): Landing pages.
- Builder ($299): Web apps.
- Scale ($499): AI & Production.`;

        const messages = [{ role: 'system', content: systemPrompt }];
        if (Array.isArray(history)) {
            history.slice(-10).forEach(msg => {
                if (msg.role && msg.content) messages.push({ role: msg.role, content: msg.content });
            });
        }
        messages.push({ role: 'user', content: message });

        // Try Blackbox AI with multiple model candidates
        const models = ['blackboxai/google/gemini-3.1-pro-preview', 'blackboxai/anthropic/claude-sonnet-4.6', 'blackboxai/blackbox-pro'];
        let lastError = "Connection failed";

        for (const modelId of models) {
            try {
                console.log(`Trying Blackbox model: ${modelId}`);
                const response = await fetch(BLACKBOX_ENDPOINT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${BLACKBOX_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: modelId,
                        messages: messages,
                        max_tokens: 1024
                    })
                });

                const text = await response.text();
                if (response.ok) {
                    const data = JSON.parse(text);
                    const aiResponse = data.choices?.[0]?.message?.content;
                    if (aiResponse) return res.status(200).json({ response: aiResponse, success: true });
                } else {
                    lastError = `Status ${response.status}: ${text.substring(0, 50)}`;
                }
            } catch (e) {
                lastError = e.message;
            }
        }

        throw new Error(lastError);

    } catch (error) {
        console.error('Assistant Error:', error.message);
        return res.status(500).json({
            error: 'Failed to process',
            response: `I'm having a little trouble connecting right now (Error: ${error.message}). Please reach out directly to Paul at hello@paulhartmann.dev or via WhatsApp (+43 670 6034585).`,
            success: false
        });
    }
}
