// ===================================
// HARTMANN AI WIDGET - MAIN SCRIPT
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
        
        // Get AI response
        try {
            const response = await this.getAIResponse(message);
            this.hideTyping();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTyping();
            this.addMessage('Sorry, I encountered an error. Please try again or contact us directly via WhatsApp or Email.', 'bot');
            console.error('AI Error:', error);
        }
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
    
    async getAIResponse(userMessage) {
        // Call your API endpoint
        const response = await fetch('/api/chat-ai', {
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
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        return data.response;
    }
}

// Initialize widget when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HartmannAI();
});
