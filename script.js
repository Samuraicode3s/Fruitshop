// Product data with your new images
const products = [
    {
        id: 1,
        name: "Apple",
        price: 3.99,
        image: "images/apple.jpg"
    },
    {
        id: 2,
        name: "Dragon Fruit",
        price: 8.99,
        image: "images/dragonfruit.jpg"
    },
    {
        id: 3,
        name: "Grapes",
        price: 5.99,
        image: "images/grapes.jpg"
    },
    {
        id: 4,
        name: "Melon",
        price: 6.99,
        image: "images/melon.jpg"
    },
    {
        id: 5,
        name: "Orange",
        price: 4.99,
        image: "images/orange.jpg"
    },
    {
        id: 6,
        name: "Pear",
        price: 4.99,
        image: "images/pear.jpg"
    }
];

// Simple display function
function displayProducts() {
    console.log("Display function running"); // Debug log
    const productGrid = document.querySelector('.product-grid');
    
    if (!productGrid) {
        console.log("Product grid not found!"); // Debug log
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Add image error handling
        const imageUrl = product.image;
        console.log(`Attempting to load image: ${imageUrl}`); // Debug log
        
        productCard.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}" class="product-image" 
                onerror="console.error('Error loading image:', this.src); this.src='images/placeholder.jpg';">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="cta-button">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Remove any existing event listeners and clear duplicates
document.addEventListener('DOMContentLoaded', () => {
    // Clear any existing content first
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.innerHTML = '';
    }
    
    // Display products once
    displayProducts();
    
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
        // Remove old listeners by cloning
        const newSearchInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);
        
        // Add new listener
        newSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            if (searchTerm === '') {
                // Clear and display all products
                productGrid.innerHTML = '';
                displayProducts();
            } else {
                searchProducts(searchTerm);
            }
        });
    }
});

function searchProducts(searchTerm) {
    const productGrid = document.querySelector('.product-grid');
    
    // Safety check
    if (!productGrid) return;
    
    // Clear existing content
    while (productGrid.firstChild) {
        productGrid.removeChild(productGrid.firstChild);
    }
    
    // Instead of filter, we'll loop through original array to maintain order
    products.forEach(product => {
        if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <button class="cta-button">Add to Cart</button>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        }
    });
    
    // Check if no products were added
    if (productGrid.children.length === 0) {
        const noResults = document.createElement('p');
        noResults.textContent = 'No products found';
        productGrid.appendChild(noResults);
    }
}

// Add to existing code
let cart = [];

// Update product card creation
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
            <button class="cta-button" onclick="showProductDetail(${product.id})">View Details</button>
        </div>
    `;
    
    return productCard;
}

// Product detail modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const detailContent = document.getElementById('product-detail');
    
    detailContent.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" style="max-width: 200px;">
        <p>Fresh ${product.name.toLowerCase()} from local farms.</p>
        <p class="product-price">$${product.price}</p>
        <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity('decrease')">-</button>
            <span id="quantity">1</span>
            <button class="quantity-btn" onclick="updateQuantity('increase')">+</button>
        </div>
        <button class="cta-button" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    
    modal.style.display = 'block';
}

// Cart functions
function updateQuantity(action) {
    const quantityElement = document.getElementById('quantity');
    let quantity = parseInt(quantityElement.textContent);
    
    if (action === 'increase') {
        quantity++;
    } else if (action === 'decrease' && quantity > 1) {
        quantity--;
    }
    
    quantityElement.textContent = quantity;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById('quantity').textContent);
    
    const cartItem = {
        ...product,
        quantity: quantity
    };
    
    cart.push(cartItem);
    updateCartCount();
    document.getElementById('productModal').style.display = 'none';
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function showCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 50px;">
            <span>${item.name}</span>
            <span>x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
    `).join('');
    
    cartTotal.textContent = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    modal.style.display = 'block';
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCart();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Add modal close listeners
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.onclick = function() {
            this.closest('.modal').style.display = 'none';
        }
    });

    // Add cart icon listener
    document.querySelector('.cart-icon').onclick = showCart;
    
    // Close modals when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }
});