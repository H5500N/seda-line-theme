/**
 * AI Chatbot for Seda Line Theme
 * Powered by OpenAI API
 */

class AIChatbot {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
        this.messages = [];
        this.init();
    }

    init() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const chatWindow = document.getElementById('chatbot-window');
        const input = document.getElementById('chatbot-input');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                chatWindow.classList.toggle('hidden');
            });
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage(input.value);
                    input.value = '';
                }
            });
        }

        // Initial greeting
        this.addMessage('مرحباً بك في سيدا لاين! كيف يمكنني مساعدتك اليوم؟', 'bot');
    }

    async sendMessage(message) {
        if (!message.trim()) return;

        // Add user message to chat
        this.addMessage(message, 'user');

        // Prepare context for AI
        const context = `أنت مساعد افتراضي ذكي لمتجر سيدا لاين، متجر عبايات فاخرة.
مهمتك مساعدة العملاء في:
1. اختيار العباية المناسبة حسب المناسبة (يومية، عمل، مناسبات)
2. الإجابة على أسئلة حول المقاسات والألوان
3. تقديم توصيات للمنتجات
4. الإجابة على الأسئلة الشائعة

رسالة العميل: ${message}`;

        try {
            // Call OpenAI API
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4.1-mini',
                    messages: [
                        {role: 'system', content: context},
                        {role: 'user', content: message}
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            const botReply = data.choices[0].message.content;

            // Add bot response to chat
            this.addMessage(botReply, 'bot');
        } catch (error) {
            console.error('Error calling AI API:', error);
            this.addMessage('عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.', 'bot');
        }
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender === 'bot' ? 'bot-message' : 'user-message'} mb-2 p-2 rounded`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AIChatbot();
});
