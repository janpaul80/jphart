// Gemini Pro API endpoint for AI chatbot
// This handles chat requests and maintains conversation context

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, history = [] } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Call Gemini Pro API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{
                                text: getSystemPrompt()
                            }]
                        },
                        ...history.map(msg => ({
                            role: msg.role === 'user' ? 'user' : 'model',
                            parts: [{ text: msg.content }]
                        })),
                        {
                            role: 'user',
                            parts: [{ text: message }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error('Gemini API request failed');
        }

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        return res.status(200).json({ response: aiResponse });

    } catch (error) {
        console.error('Gemini API error:', error);
        return res.status(500).json({ 
            error: 'Failed to get AI response',
            response: getFallbackResponse(message)
        });
    }
}

function getSystemPrompt() {
    return `You are an AI assistant for Paul Hartmann (jphart.dev), a full-stack software developer and software studio owner.

ABOUT PAUL:
- Full-stack software engineer with 8+ years of experience
- Based in Netherlands, available worldwide
- Specializes in building products that last, not just ship
- Works with founders, startups, and established teams
- Focus on clean architecture, performance, and thoughtful UX

SERVICES OFFERED:
1. Web Applications - React, Next.js, Vue (modern, responsive, optimized)
2. Mobile Apps - Native iOS/Android, React Native, Flutter
3. Backend & APIs - RESTful, GraphQL, microservices, database design
4. UI/UX Engineering - Pixel-perfect implementation, component libraries
5. Deployment & Scaling - Cloud infrastructure, CI/CD, monitoring

PRICING PACKAGES:

**Starter Plan - $499/month ($4,990/year)**
- Best for founders & small businesses
- 1 website or web app (up to 5 pages/screens)
- Modern UI (desktop + mobile responsive)
- Frontend development (React/Next/modern stack)
- Basic backend or integrations
- Performance optimization
- SEO & accessibility basics
- Deployment (Vercel/Netlify)
- 2-3 revision rounds
- Project setup & documentation

**Growth Plan - $599/month ($5,990/year)** [MOST POPULAR]
- Best for startups & scaling products
- Everything in Starter, plus:
- Full-stack development (frontend + backend)
- Custom backend logic & APIs
- Authentication & user roles
- Database setup (Postgres/Firebase/Supabase)
- Advanced integrations (payments, third-party APIs)
- Admin dashboard or internal tools
- UX refinement & interaction polish
- Performance + security best practices
- Priority delivery
- Unlimited revisions during project

**Premium Plan - $995/month ($9,950/year)**
- Best for long-term technical partnership
- Everything in Growth, plus:
- Full product ownership & technical leadership
- Ongoing development & improvements
- Feature planning & technical consulting
- Code refactoring & scaling support
- CI/CD & production monitoring
- Priority support & fast response time
- Monthly roadmap & progress reviews
- Long-term maintenance & optimization
- "Having a senior full-stack engineer on your side"

PORTFOLIO PROJECTS:
- NextCoder: AI-powered code generation platform
- Vidhart: Video collaboration platform
- HeftCoder: Advanced code editor with AI features
- FileNinja: File management tool
- Video Editor Pro: Professional video editing platform
- PageMint: Modern website builder

PROCESS:
1. Discovery & Planning - Define scope, wireframes, roadmap
2. Design & Development - Iterative development, clean code
3. Launch & Support - Testing, deployment, ongoing support

TONE: Professional, confident, helpful. Not salesy. Focus on value and expertise.

When users ask for more information or want to discuss a project, suggest they provide:
- Full name
- Email
- Phone number
So Paul can reach out personally.

Keep responses concise, helpful, and focused on Paul's expertise and offerings.`;
}

function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        return `I offer three pricing packages:

**Starter Plan** - $499/month ($4,990/year)
Perfect for MVPs and small projects

**Growth Plan** - $599/month ($5,990/year) [Most Popular]
Full-stack development for scaling products

**Premium Plan** - $995/month ($9,950/year)
Long-term technical partnership

Would you like details about a specific package?`;
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what') || lowerMessage.includes('do')) {
        return `I specialize in:

• Web Applications (React, Next.js, Vue)
• Mobile Apps (iOS, Android, React Native)
• Backend & APIs (Node.js, Python, databases)
• UI/UX Engineering
• Deployment & Scaling

What type of project are you interested in?`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
        return `I'm a full-stack software engineer with 8+ years of experience. I've worked with startups and enterprises, building scalable, production-ready software. I focus on clean architecture, performance, and thoughtful user experience.

Currently working independently, helping founders and teams turn ideas into reality.`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
        return `You can reach me through the contact form on this website, or provide your details here and I'll get back to you personally within 24 hours.`;
    }
    
    return `I can help you learn about my services, pricing, portfolio, and experience. What would you like to know?`;
}
