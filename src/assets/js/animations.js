/**
 * Seda Line Theme - Animations & Interactions
 * Smooth animations and interactive elements
 */

class ThemeAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupHoverEffects();
        this.setupSmoothScroll();
        this.setupHeaderScroll();
    }

    /**
     * Scroll-triggered animations
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Parallax scrolling effect
     */
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    /**
     * Enhanced hover effects
     */
    setupHoverEffects() {
        // Product cards hover effect
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addGlowEffect(e.currentTarget);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeGlowEffect(e.currentTarget);
            });
        });

        // Button ripple effect
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e);
            });
        });
    }

    /**
     * Add glow effect to element
     */
    addGlowEffect(element) {
        element.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.4)';
        element.style.transition = 'all 0.3s ease';
    }

    /**
     * Remove glow effect from element
     */
    removeGlowEffect(element) {
        element.style.boxShadow = '';
    }

    /**
     * Create ripple effect on click
     */
    createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
        ripple.classList.add('ripple');

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * Smooth scroll to anchor links
     */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Header scroll effect
     */
    setupHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Hide header on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 500) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }
}

/**
 * Product Quick View
 */
class QuickView {
    constructor() {
        this.init();
    }

    init() {
        const quickViewButtons = document.querySelectorAll('[data-quick-view]');
        
        quickViewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.dataset.productId;
                this.showQuickView(productId);
            });
        });
    }

    showQuickView(productId) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'quick-view-overlay';
        overlay.innerHTML = `
            <div class="quick-view-modal">
                <button class="quick-view-close">&times;</button>
                <div class="quick-view-content">
                    <div class="quick-view-image">
                        <img src="/images/product-${productId}.jpg" alt="Product">
                    </div>
                    <div class="quick-view-info">
                        <h3>اسم المنتج</h3>
                        <p class="price">299 ريال</p>
                        <p class="description">وصف المنتج هنا...</p>
                        <button class="btn btn-primary">أضف للسلة</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Add close functionality
        overlay.querySelector('.quick-view-close').addEventListener('click', () => {
            overlay.remove();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }
}

/**
 * Image Zoom on Hover
 */
class ImageZoom {
    constructor() {
        this.init();
    }

    init() {
        const zoomImages = document.querySelectorAll('[data-zoom]');
        
        zoomImages.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.2)';
                img.style.transition = 'transform 0.5s ease';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
    }
}

/**
 * Loading Animation
 */
class LoadingAnimation {
    constructor() {
        this.createLoader();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">سيدا لاين</div>
                <div class="loader-spinner"></div>
            </div>
        `;
        document.body.appendChild(loader);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeAnimations();
    new QuickView();
    new ImageZoom();
    new LoadingAnimation();
});
