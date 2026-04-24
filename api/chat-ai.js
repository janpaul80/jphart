// ===================================
// HARTMANN AI CHAT API - GEMINI POWERED
// ===================================

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { message, history = [] } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        // Get Gemini API key from environment variable
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        
        if (!GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY not found in environment variables');
            return res.status(500).json({ error: 'API configuration error' });
        }
        
        // System context about Paul Hartmann / Paul Hartmann
        const systemContext = `You are an AI assistant for Paul Hartmann (Paul Hartmann), a full-stack software developer and studio owner.

ABOUT PAUL:
- Full-stack software engineer with 8+ years of experience
- Based in Europe, available worldwide
- Specializes in web apps, mobile development, SaaS platforms, and scalable backend systems
- Works with React, Next.js, Node.js, TypeScript, and modern tech stacks
- Builds products that are meant to last, not just ship

SERVICES OFFERED:
1. Web Applications - Modern, responsive web apps built with React, Next.js, and Vue
2. Mobile Apps - Native iOS/Android and cross-platform solutions with React Native and Flutter
3. Backend & APIs - Robust backend systems, RESTful and GraphQL APIs, microservices
4. UI/UX Engineering - Pixel-perfect implementation, component libraries, design systems
5. Deployment & Scaling - Cloud infrastructure, CI/CD pipelines, monitoring
6. Full-Stack Development - End-to-end development from database to user interface

PRICING PACKAGES:
1. Starter - $149
   - Perfect for founders who want to move fast
   - Landing page or simple website (1-3 pages)
   - Modern UI (responsive, mobile-ready)
   - AI-assisted build for faster delivery
   - Basic SEO setup (meta tags, structure)
   - Deployment included (live link)
   - Best for: Personal brands, Early startups, MVP validation

2. Builder - $299 (POPULAR)
   - For startups that need real functionality
   - Everything in Starter, plus:
   - Small web app or MVP
   - Frontend + backend setup
   - API integration (basic)
   - Authentication or form workflows
   - Performance + structure optimization
   - Best for: SaaS MVPs, Internal tools, AI-powered prototypes

3. Scale - $499
   - Production-ready builds with AI power
   - Everything in Builder, plus:
   - Advanced features & workflows
   - AI integration (agents, automations, or APIs)
   - Database + scalable architecture
   - HeftCoder integration (recommended)
   - Deployment, monitoring & handoff
   - Best for: Serious founders, Growing products, Teams ready to scale

CONTACT:
- Website: https://paulhartmann.dev
- WhatsApp: +593 98 9704265
- Email: contact@paulhartmann.dev
- GitHub: https://github.com/janpaul80

RELATED PRODUCT:
- HeftCoder: https://app.heftcoder.icu - Vibe Coding tool starting at $9/month for those who want to build themselves

Be helpful, professional, and concise. Answer questions about Paul's services, pricing, experience, and portfolio. If someone wants to hire Paul or discuss a project, encourage them to use the contact form, WhatsApp, or email.`;

        // Build conversation for Gemini
        const contents = [
            {
                role: 'user',
                parts: [{ text: systemContext }]
            },
            {
                role: 'model',
                parts: [{ text: 'I understand. I\'m ready to assist visitors with information about Paul Hartmann\'s services, pricing, and experience.' }]
            }
        ];
        
        // Add conversation history
        history.forEach(msg => {
            if (msg.role === 'user' || msg.role === 'assistant') {
                contents.push({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }]
                });
            }
        });
        
        // Add current message
        contents.push({
            role: 'user',
            parts: [{ text: message }]
        });
        
        // Call Gemini API
        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: contents,
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                    safetySettings: [
                        {
                            category: 'HARM_CATEGORY_HARASSMENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_HATE_SPEECH',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        }
                    ]
                })
            }
        );
        
        if (!geminiResponse.ok) {
            const errorData = await geminiResponse.json();
            console.error('Gemini API Error:', errorData);
            throw new Error('Failed to get AI response');
        }
        
        const data = await geminiResponse.json();
        
        // Extract response text
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                          'I apologize, but I couldn\'t generate a response. Please try again or contact us directly.';
        
        return res.status(200).json({
            response: aiResponse,
            success: true
        });
        
    } catch (error) {
        console.error('Chat AI Error:', error);
        return res.status(500).json({
            error: 'Failed to process your message',
            response: 'I apologize for the inconvenience. Please contact us directly via WhatsApp (+593 98 9704265) or email (contact@paulhartmann.dev).',
            success: false
        });
    }
}
