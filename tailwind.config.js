module.exports = {
    content: [
        './src/**/*.{twig,js,html}',
        './public/**/*.html'
    ],
    theme: {
        extend: {
            colors: {
                'gold': '#D4AF37',
                'beige': '#F5F5DC',
                'luxury-black': '#000000',
                'luxury-gray': '#333333'
            },
            fontFamily: {
                'heading': ['Playfair Display', 'Amiri', 'serif'],
                'body': ['Cairo', 'Tajawal', 'sans-serif']
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-in-out',
                'float': 'float 3s ease-in-out infinite'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                }
            }
        }
    },
    plugins: []
};
