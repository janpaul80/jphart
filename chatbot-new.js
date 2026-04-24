// ===================================
// PAUL'S ASSISTANT - CHAT WIDGET
// Powered by Langdock / Hermes
// ===================================

class PaulAssistant {
    constructor() {
        this.toggle = document.getElementById('paToggle');
        this.window = document.getElementById('paWindow');
        this.messages = document.getElementById('paMessages');
        this.form = document.getElementById('paForm');
        this.input = document.getElementById('paInput');
        this.typing = document.getElementById('paTyping');
        this.sendBtn = document.getElementById('paSend');

        this.isOpen = false;
        this.history = [];
        this.isProcessing = false;

        this.init();
    }

    init() {
        this.toggle.addEventListener('click', () => this.toggleWidget());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !document.querySelector('.paul-assistant').contains(e.target)) {
                this.closeWidget();
            }
        });

        // Welcome message
        this.addMessage("Hi there! I'm Paul's Assistant. I can help you learn about our services, pricing, and projects. What can I help you with?", 'bot');
    }

    toggleWidget() {
        this.isOpen ? this.closeWidget() : this.openWidget();
    }

    openWidget() {
        this.isOpen = true;
        this.toggle.classList.add('active');
        this.window.classList.add('active');
        setTimeout(() => this.input.focus(), 350);
    }

    closeWidget() {
        this.isOpen = false;
        this.toggle.classList.remove('active');
        this.window.classList.remove('active');
    }

    async handleSubmit(e) {
        e.preventDefault();
        const message = this.input.value.trim();
        if (!message || this.isProcessing) return;

        this.isProcessing = true;
        this.sendBtn.disabled = true;
        this.addMessage(message, 'user');
        this.input.value = '';
        this.showTyping();

        try {
            const response = await fetch('/api/assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    history: this.history
                })
            });

            const data = await response.json();
            this.hideTyping();

            if (data.success && data.response) {
                let aiMsg = data.response;
                
                // Check for automatic WhatsApp redirect trigger
                if (aiMsg.includes('[WHATSAPP_REDIRECT]')) {
                    aiMsg = aiMsg.replace('[WHATSAPP_REDIRECT]', '').trim();
                    this.addMessage(aiMsg, 'bot');
                    
                    // Show a status update
                    setTimeout(() => {
                        this.addMessage("Redirecting you to WhatsApp...", 'bot');
                        setTimeout(() => {
                            window.open('https://wa.me/436706034585', '_blank');
                        }, 1000);
                    }, 500);
                } else {
                    this.addMessage(aiMsg, 'bot');
                }
            } else {
                this.addMessage(data.response || "Sorry, I'm having trouble right now. Please try again or reach out via WhatsApp at +43 670 6034585.", 'bot');
            }
        } catch (error) {
            this.hideTyping();
            this.addMessage("I'm having connection issues. You can reach Paul directly at hello@paulhartmann.dev or WhatsApp +43 670 6034585.", 'bot');
        }

        this.isProcessing = false;
        this.sendBtn.disabled = false;
        this.input.focus();
    }

    addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = `pa-msg pa-msg-${sender}`;

        const avatar = document.createElement('div');
        avatar.className = 'pa-msg-avatar';
        avatar.textContent = sender === 'user' ? 'You' : 'PA';

        const bubble = document.createElement('div');
        bubble.className = 'pa-msg-bubble';

        const p = document.createElement('p');
        // Convert URLs in text to links
        p.innerHTML = this.linkify(text);

        bubble.appendChild(p);
        msg.appendChild(avatar);
        msg.appendChild(bubble);

        this.messages.appendChild(msg);
        this.messages.scrollTop = this.messages.scrollHeight;

        // Store history (skip the initial welcome)
        if (this.history.length > 0 || sender === 'user') {
            this.history.push({ role: sender === 'user' ? 'user' : 'assistant', content: text });
        }
    }

    linkify(text) {
        // Escape HTML first
        const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        // Convert URLs to clickable links
        return escaped.replace(
            /(https?:\/\/[^\s<]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
    }

    showTyping() {
        this.typing.classList.add('active');
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    hideTyping() {
        this.typing.classList.remove('active');
    }
}

// ===================================
// COOKIE CONSENT
// ===================================

class CookieConsent {
    constructor() {
        this.banner = document.getElementById('cookieConsent');
        if (!this.banner) return;

        this.acceptBtn = document.getElementById('cookieAccept');
        this.declineBtn = document.getElementById('cookieDecline');

        this.init();
    }

    init() {
        // Check if already consented
        if (localStorage.getItem('cookieConsent')) return;

        // Show after 1.5s
        setTimeout(() => {
            this.banner.classList.add('active');
        }, 1500);

        this.acceptBtn.addEventListener('click', () => this.accept());
        this.declineBtn.addEventListener('click', () => this.decline());
    }

    accept() {
        localStorage.setItem('cookieConsent', 'accepted');
        this.hide();
    }

    decline() {
        localStorage.setItem('cookieConsent', 'declined');
        this.hide();
    }

    hide() {
        this.banner.classList.remove('active');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new PaulAssistant();
    new CookieConsent();
});
