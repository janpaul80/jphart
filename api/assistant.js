// PAUL'S ASSISTANT - BLACKBOX AI API
// Vercel Serverless Function
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

        // Get Blackbox credentials
        const BLACKBOX_API_KEY_RAW = process.env.BLACKBOX_API_KEY;
        const BLACKBOX_ENDPOINT_URL = process.env.BLACKBOX_ENDPOINT_URL || 'https://api.blackbox.ai/chat/completions';
        
        // Take the first key if it's a comma-separated list
        const BLACKBOX_API_KEY = BLACKBOX_API_KEY_RAW ? BLACKBOX_API_KEY_RAW.split(',')[0].trim() : null;

        if (!BLACKBOX_API_KEY) {
            return res.status(500).json({
                error: 'API configuration error',
                response: "I'm currently undergoing a brain transplant. Please reach out to Paul via WhatsApp (+43 670 6034585) or email hello@paulhartmann.dev.",
                success: false
            });
        }

        const systemPrompt = `You are the personal AI representative for Paul Hartmann (paulhartmann.dev). 

WHO YOU ARE:
You are sophisticated, professional, and highly capable. You are NOT a script-following bot. You are a conversational partner here to help users explore Paul's world.

DIRECTIVES:
- NO emojis. NO bullet points in greetings.
- Be concise but warm.
- Ask questions to understand the user's project.
- refer to Paul Hartmann in the third person.
- If the user wants to talk to Paul directly or switch to WhatsApp, you MUST include "[WHATSAPP_REDIRECT]" at the end of your message.

PAUL'S WORK:
Paul builds premium digital products:
- Starter: Landing pages ($149)
- Builder: Web apps/MVPs ($299)
- Scale: Full AI/Scale systems ($499)
- He also runs CoderXP, Rev-Pro, and FileNinja.

Remember: Be human. If they say hi, don't just list services. Say hello and ask what brings them to Paul's site today.`;

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

        // Blackbox AI API call
        const response = await fetch(BLACKBOX_ENDPOINT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BLACKBOX_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-5.2', // User specifically requested this
                messages: messages,
                max_tokens: 1024,
                temperature: 0.7
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
        }

        // Fallback or Error
        console.error('Blackbox API Error:', response.status, responseText);
        throw new Error(`Blackbox Error ${response.status}: ${responseText.substring(0, 100)}`);

    } catch (error) {
        console.error('Assistant Error:', error.message);
        return res.status(500).json({
            error: 'Failed to process',
            response: `I'm having a bit of trouble with my connection. You can reach Paul directly at hello@paulhartmann.dev or via WhatsApp (+43 670 6034585).`,
            success: false
        });
    }
}
