/**
 * AI-Powered Product Recommendations
 * Analyzes user behavior and suggests relevant products
 */

class AIRecommendations {
    constructor() {
        this.userBehavior = {
            viewedProducts: [],
            clickedCategories: [],
            searchQueries: []
        };
        this.init();
    }

    init() {
        this.trackUserBehavior();
        this.loadRecommendations();
    }

    trackUserBehavior() {
        // Track product views
        const productElements = document.querySelectorAll('[data-product-id]');
        productElements.forEach(element => {
            element.addEventListener('click', () => {
                const productId = element.dataset.productId;
                this.userBehavior.viewedProducts.push(productId);
                this.saveUserBehavior();
            });
        });

        // Track category clicks
        const categoryElements = document.querySelectorAll('[data-category]');
        categoryElements.forEach(element => {
            element.addEventListener('click', () => {
                const category = element.dataset.category;
                this.userBehavior.clickedCategories.push(category);
                this.saveUserBehavior();
            });
        });

        // Track search queries
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            searchInput.addEventListener('change', (e) => {
                this.userBehavior.searchQueries.push(e.target.value);
                this.saveUserBehavior();
            });
        }
    }

    saveUserBehavior() {
        localStorage.setItem('userBehavior', JSON.stringify(this.userBehavior));
    }

    loadUserBehavior() {
        const saved = localStorage.getItem('userBehavior');
        if (saved) {
            this.userBehavior = JSON.parse(saved);
        }
    }

    async loadRecommendations() {
        this.loadUserBehavior();

        // Get recommendations container
        const container = document.getElementById('ai-recommendations');
        if (!container) return;

        try {
            // In a real implementation, this would call your backend API
            // which would use AI to analyze user behavior and return recommendations
            const recommendations = await this.getRecommendationsFromAPI();
            
            this.displayRecommendations(recommendations, container);
        } catch (error) {
            console.error('Error loading recommendations:', error);
        }
    }

    async getRecommendationsFromAPI() {
        // Placeholder for API call
        // In production, this would call your backend which uses AI
        return [
            {id: 1, name: 'عباية يومية أنيقة', price: 299, image: '/images/product1.jpg'},
            {id: 2, name: 'عباية مناسبات فاخرة', price: 599, image: '/images/product2.jpg'},
            {id: 3, name: 'عباية عمل راقية', price: 399, image: '/images/product3.jpg'}
        ];
    }

    displayRecommendations(products, container) {
        container.innerHTML = '<h3 class="text-2xl font-bold mb-4">منتجات قد تعجبك</h3>';
        
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-3 gap-4';

        products.forEach(product => {
            const card = this.createProductCard(product);
            grid.appendChild(card);
        });

        container.appendChild(grid);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
            <div class="p-4">
                <h4 class="font-bold text-lg">${product.name}</h4>
                <p class="text-gray-600">${product.price} ريال</p>
                <button class="mt-2 bg-black text-white px-4 py-2 rounded">أضف للسلة</button>
            </div>
        `;
        return card;
    }
}

// Initialize recommendations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AIRecommendations();
});
