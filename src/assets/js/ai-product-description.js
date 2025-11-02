/**
 * AI Product Description Generator
 * Automatically generates professional product descriptions
 */

class AIProductDescriptionGenerator {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
        this.init();
    }

    init() {
        const generateBtn = document.getElementById('generate-description-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateDescription();
            });
        }
    }

    async generateDescription() {
        // Get product details from form
        const productName = document.getElementById('product-name')?.value;
        const productCategory = document.getElementById('product-category')?.value;
        const productColor = document.getElementById('product-color')?.value;
        const productMaterial = document.getElementById('product-material')?.value;

        if (!productName) {
            alert('يرجى إدخال اسم المنتج');
            return;
        }

        try {
            // Show loading
            this.showLoading();

            const prompt = `اكتب وصف منتج احترافي وجذاب لعباية بالمواصفات التالية:
الاسم: ${productName}
الفئة: ${productCategory || 'غير محدد'}
اللون: ${productColor || 'غير محدد'}
القماش: ${productMaterial || 'غير محدد'}

الوصف يجب أن يكون:
- احترافي وجذاب
- يبرز مميزات المنتج
- يستهدف العملاء السعوديين
- بطول 100-150 كلمة
- باللغة العربية الفصحى`;

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4.1-mini',
                    messages: [
                        {role: 'system', content: 'أنت كاتب محتوى محترف متخصص في كتابة أوصاف منتجات العبايات الفاخرة.'},
                        {role: 'user', content: prompt}
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            const description = data.choices[0].message.content;

            // Display generated description
            this.displayDescription(description);
        } catch (error) {
            console.error('Error generating description:', error);
            alert('حدث خطأ أثناء توليد الوصف. يرجى المحاولة مرة أخرى.');
        } finally {
            this.hideLoading();
        }
    }

    showLoading() {
        const descriptionArea = document.getElementById('product-description');
        if (descriptionArea) {
            descriptionArea.value = 'جاري توليد الوصف...';
            descriptionArea.disabled = true;
        }
    }

    hideLoading() {
        const descriptionArea = document.getElementById('product-description');
        if (descriptionArea) {
            descriptionArea.disabled = false;
        }
    }

    displayDescription(description) {
        const descriptionArea = document.getElementById('product-description');
        if (descriptionArea) {
            descriptionArea.value = description;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AIProductDescriptionGenerator();
});
