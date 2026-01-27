// ===================================
// AI CHATBOT WITH GEMINI PRO
// ===================================

class AIChatbot {
    constructor() {
        this.widget = document.getElementById('aiChatbot');
        this.toggle = document.getElementById('chatbotToggle');
        this.window = document.getElementById('chatbotWindow');
        this.messages = document.getElementById('chatbotMessages');
        this.form = document.getElementById('chatbotForm');
        this.input = document.getElementById('chatbotInput');
        this.minimize = document.getElementById('chatbotMinimize');
        this.contactPrompt = document.getElementById('contactPrompt');
        this.contactForm = document.getElementById('contactPromptForm');
        
        this.conversationHistory = [];
        this.messageCount = 0;
        
        this.init();
    }
    
    init() {
        // Toggle chatbot
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.minimize.addEventListener('click', () => this.toggleChat());
        
        // Handle message submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Handle contact form
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }
    }
    
    toggleChat() {
        this.widget.classList.toggle('active');
        if (this.widget.classList.contains('active')) {
            this.input.focus();
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const message = this.input.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Get AI response
        try {
            const response = await this.getAIResponse(message);
            this.hideTyping();
            this.addMessage(response, 'bot');
            
            // After 3 messages, show contact prompt
            this.messageCount++;
            if (this.messageCount >= 3 && this.contactPrompt) {
                this.contactPrompt.style.display = 'block';
            }
        } catch (error) {
            this.hideTyping();
            this.addMessage('Sorry, I encountered an error. Please try again or use the contact form below.', 'bot');
            console.error('Chatbot error:', error);
        }
    }
    
    async getAIResponse(userMessage) {
        // Call Gemini Pro API through your backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                history: this.conversationHistory
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to get AI response');
        }
        
        const data = await response.json();
        
        // Update conversation history
        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        });
        this.conversationHistory.push({
            role: 'assistant',
            content: data.response
        });
        
        return data.response;
    }
    
    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${type === 'user' ? 'user-message' : 'bot-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'user' 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = this.formatMessage(text);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    formatMessage(text) {
        // Convert markdown-style formatting to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
    
    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-message';
        typingDiv.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        
        this.messages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) {
            typing.remove();
        }
    }
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    async handleContactSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('promptName').value;
        const email = document.getElementById('promptEmail').value;
        const phone = document.getElementById('promptPhone').value;
        
        // Send to backend
        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, source: 'chatbot' })
            });
            
            if (response.ok) {
                this.addMessage('Thank you! Paul will reach out to you soon.', 'bot');
                this.contactPrompt.style.display = 'none';
                this.contactForm.reset();
            }
        } catch (error) {
            this.addMessage('Failed to submit. Please use the contact form on the page.', 'bot');
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AIChatbot();
});
