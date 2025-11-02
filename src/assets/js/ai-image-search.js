/**
 * AI Image Search
 * Allows customers to search for products using images
 */

class AIImageSearch {
    constructor() {
        this.init();
    }

    init() {
        const searchButton = document.getElementById('image-search-btn');
        const fileInput = document.getElementById('image-search-input');

        if (searchButton && fileInput) {
            searchButton.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.searchByImage(file);
                }
            });
        }
    }

    async searchByImage(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            // Show loading indicator
            this.showLoading();

            // In production, this would call your backend API
            // which uses AI vision models to analyze the image
            const response = await fetch('/api/search-by-image', {
                method: 'POST',
                body: formData
            });

            const results = await response.json();
            this.displayResults(results);
        } catch (error) {
            console.error('Error searching by image:', error);
            this.showError('حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى.');
        } finally {
            this.hideLoading();
        }
    }

    showLoading() {
        const container = document.getElementById('search-results');
        if (container) {
            container.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-4xl"></i><p class="mt-4">جاري البحث...</p></div>';
        }
    }

    hideLoading() {
        // Loading will be replaced by results or error
    }

    displayResults(results) {
        const container = document.getElementById('search-results');
        if (!container) return;

        if (results.length === 0) {
            container.innerHTML = '<p class="text-center py-8">لم نجد منتجات مشابهة. جرب صورة أخرى.</p>';
            return;
        }

        container.innerHTML = '<h3 class="text-2xl font-bold mb-4">منتجات مشابهة</h3>';
        
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-4 gap-4';

        results.forEach(product => {
            const card = this.createProductCard(product);
            grid.appendChild(card);
        });

        container.appendChild(grid);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
            <div class="p-4">
                <h4 class="font-bold text-lg">${product.name}</h4>
                <p class="text-gray-600">${product.price} ريال</p>
                <div class="mt-2">
                    <span class="text-sm text-green-600">تطابق ${product.similarity}%</span>
                </div>
                <button class="mt-2 bg-black text-white px-4 py-2 rounded w-full">عرض المنتج</button>
            </div>
        `;
        return card;
    }

    showError(message) {
        const container = document.getElementById('search-results');
        if (container) {
            container.innerHTML = `<div class="text-center py-8 text-red-600"><i class="fas fa-exclamation-circle text-4xl"></i><p class="mt-4">${message}</p></div>`;
        }
    }
}

// Initialize image search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AIImageSearch();
});
