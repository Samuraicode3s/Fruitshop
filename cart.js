// Cart API endpoints
const API_ENDPOINT = 'https://cwsemhvju4.execute-api.us-east-1.amazonaws.com/prod';  // Updated to include /prod stage

// Cart functionality
class Cart {
    constructor() {
        this.items = [];
    }

    async addToCart(product) {
        try {
            console.log('Attempting to add to cart:', product);
            const response = await fetch(`${API_ENDPOINT}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            });
            
            console.log('Response status:', response.status);
            const responseData = await response.json();
            console.log('API Response:', responseData);
            
            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }
            
            this.updateCartUI();
            return responseData;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    }

    async getCart() {
        try {
            console.log('Fetching cart contents...');
            const response = await fetch(`${API_ENDPOINT}/cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            console.log('Get cart response status:', response.status);
            const cart = await response.json();
            console.log('Current cart contents:', cart);
            
            if (!response.ok) {
                throw new Error('Failed to get cart');
            }
            
            this.items = cart;
            this.updateCartUI();
            return cart;
        } catch (error) {
            console.error('Error getting cart:', error);
            throw error;
        }
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.length;
        }
    }
}

// Initialize cart
const cart = new Cart();

// Export cart instance
window.cart = cart;

// Fetch cart contents when page loads
document.addEventListener('DOMContentLoaded', () => {
    cart.getCart().catch(error => console.error('Failed to load cart:', error));
});
