// ===================================
// HARTMANN AI WIDGET - MAIN SCRIPT
// GitHub Pages Compatible (No Backend Required)
// ===================================

class HartmannAI {
    constructor() {
        this.widget = document.getElementById('hartmannAiWidget');
        this.toggle = document.getElementById('widgetToggle');
        this.window = document.getElementById('widgetWindow');
        this.openChatBtn = document.getElementById('openChatBtn');
        this.chatBackBtn = document.getElementById('chatBackBtn');
        this.widgetContent = this.widget.querySelector('.widget-content');
        this.widgetChat = document.getElementById('widgetChat');
        this.chatForm = document.getElementById('chatForm');
        this.chatInput = document.getElementById('chatInput');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatTyping = document.getElementById('chatTyping');
        
        this.isOpen = false;
        this.isChatMode = false;
        this.conversationHistory = [];
        
        this.init();
    }
    
    init() {
        // Toggle widget
        this.toggle.addEventListener('click', () => this.toggleWidget());
        
        // Open chat interface
        this.openChatBtn.addEventListener('click', () => this.openChat());
        
        // Back to main view
        this.chatBackBtn.addEventListener('click', () => this.closeChat());
        
        // Handle chat form submission
        this.chatForm.addEventListener('submit', (e) => this.handleChatSubmit(e));
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.widget.contains(e.target)) {
                this.closeWidget();
            }
        });
    }
    
    toggleWidget() {
        if (this.isOpen) {
            this.closeWidget();
        } else {
            this.openWidget();
        }
    }
    
    openWidget() {
        this.isOpen = true;
        this.toggle.classList.add('active');
        this.window.classList.add('active');
    }
    
    closeWidget() {
        this.isOpen = false;
        this.toggle.classList.remove('active');
        this.window.classList.remove('active');
        
        // Reset to main view after animation
        setTimeout(() => {
            if (!this.isOpen) {
                this.closeChat();
            }
        }, 300);
    }
    
    openChat() {
        this.isChatMode = true;
        this.widgetContent.style.display = 'none';
        this.widgetChat.style.display = 'flex';
        this.chatInput.focus();
    }
    
    closeChat() {
        this.isChatMode = false;
        this.widgetChat.style.display = 'none';
        this.widgetContent.style.display = 'block';
    }
    
    async handleChatSubmit(e) {
        e.preventDefault();
        
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Get smart response (no backend needed)
        setTimeout(() => {
            this.hideTyping();
            const response = this.getSmartResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }
    
    getSmartResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Pricing questions
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing') || lowerMessage.includes('how much')) {
            return "I offer three packages:\n\n💡 Starter ($149) - Perfect for landing pages and simple websites\n🚀 Builder ($299) - For startups needing real functionality with frontend + backend\n⚡ Scale ($499) - Production-ready builds with AI integration\n\nFor detailed information, please contact me via WhatsApp or Email!";
        }
        
        // Services questions
        if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('what can you') || lowerMessage.includes('help with')) {
            return "I'm a full-stack developer specializing in:\n\n• Web Applications (React, Next.js)\n• Mobile Apps (React Native, Flutter)\n• Backend & APIs\n• AI Integration\n• Deployment & Scaling\n\nLet's discuss your project! Contact me via WhatsApp (+593 98 9704265) or Email.";
        }
        
        // Contact/hire questions
        if (lowerMessage.includes('hire') || lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('talk') || lowerMessage.includes('email') || lowerMessage.includes('whatsapp')) {
            return "I'd love to discuss your project! You can reach me:\n\n📱 WhatsApp: +593 98 9704265\n📧 Email: contact@paulhartmann.dev\n\nClick the buttons below to connect directly!";
        }
        
        // Portfolio questions
        if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('project') || lowerMessage.includes('example') || lowerMessage.includes('built')) {
            return "I've built projects like HeftCoder, NextCoder, Vidhart, and more. Check out my portfolio on the website! For specific project discussions, let's connect via WhatsApp or Email.";
        }
        
        // Timeline questions
        if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || lowerMessage.includes('when') || lowerMessage.includes('delivery') || lowerMessage.includes('time')) {
            return "Project timelines vary based on complexity:\n\n• Starter projects: 1-2 weeks\n• Builder projects: 2-4 weeks\n• Scale projects: 4-8 weeks\n\nLet's discuss your specific needs via WhatsApp or Email for an accurate timeline!";
        }
        
        // Technology questions
        if (lowerMessage.includes('tech') || lowerMessage.includes('stack') || lowerMessage.includes('language') || lowerMessage.includes('framework') || lowerMessage.includes('use')) {
            return "I work with modern technologies:\n\n• Frontend: React, Next.js, TypeScript, Tailwind\n• Backend: Node.js, Python, PostgreSQL\n• Mobile: React Native, Flutter\n• AI: OpenAI, Gemini, custom integrations\n\nWhat's your project about? Let's chat via WhatsApp!";
        }
        
        // Greeting
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good')) {
            return "Hello! 👋 I'm Paul Hartmann, a full-stack developer. I can help you with web apps, mobile apps, and AI-powered solutions. What are you looking to build?";
        }
        
        // Thanks
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! Feel free to reach out via WhatsApp or Email anytime. I'm here to help! 😊";
        }
        
        // Default response
        return "Thanks for your message! For detailed discussions about your project, I'd recommend connecting directly:\n\n📱 WhatsApp: +593 98 9704265\n📧 Email: contact@paulhartmann.dev\n\nI typically respond within a few hours!";
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? 'You' : 'AI';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        const p = document.createElement('p');
        p.textContent = text;
        p.style.whiteSpace = 'pre-line'; // Preserve line breaks
        
        bubble.appendChild(p);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubble);
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        // Store in conversation history
        this.conversationHistory.push({
            role: sender === 'user' ? 'user' : 'assistant',
            content: text
        });
    }
    
    showTyping() {
        this.chatTyping.style.display = 'flex';
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    hideTyping() {
        this.chatTyping.style.display = 'none';
    }
}

// Initialize widget when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HartmannAI();
});
