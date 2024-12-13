// Fruits data
const fruitsProducts = [
    {
        id: 1,
        name: "Apple",
        price: 2.99,
        image: "Images/Apple.jpg"
    },
    {
        id: 2,
        name: "Melon",
        price: 4.99,
        image: "Images/Melon.jpg"
    },
    {
        id: 3,
        name: "Dragon Fruit",
        price: 8.99,
        image: "Images/Dragonfruit.jpg"
    },
    {
        id: 4,
        name: "Grapes",
        price: 5.99,
        image: "Images/Grapes.jpg"
    },
    {
        id: 5,
        name: "Orange",
        price: 3.99,
        image: "Images/Orange.jpg"
    },
    {
        id: 6,
        name: "Pear",
        price: 2.49,
        image: "Images/Pear.jpg"
    }
];

function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    fruitsProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="cta-button" onclick="addToCartWithFeedback(${JSON.stringify(product).replace(/"/g, '&quot;')})">Add to Cart</button>
                <button class="cta-button" onclick="showProductDetail(${product.id})">VIEW DETAILS</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

function showProductDetail(productId) {
    const product = fruitsProducts.find(p => p.id === productId);
    window.location.href = `product-details.html?id=${productId}&type=fruit`;
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
}); 

async function addToCartWithFeedback(product) {
    try {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Adding...';
        button.disabled = true;
        
        await cart.addToCart(product);
        
        button.textContent = '✓ Added!';
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('Failed to add to cart:', error);
        const button = event.target;
        button.textContent = 'Failed to add';
        button.style.backgroundColor = '#ff4444';
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '';
            button.disabled = false;
        }, 2000);
    }
}