// Vegetables data
const products = [
    {
        id: 1,
        name: "Broccoli",
        price: 3.99,
        image: "images/broccoli.jpg"
    },
    {
        id: 2,
        name: "Cucumber",
        price: 2.49,
        image: "images/cucumber.jpg"
    },
    {
        id: 3,
        name: "Radish",
        price: 1.99,
        image: "images/radish.jpg"
    },
    {
        id: 4,
        name: "Red Pepper",
        price: 3.49,
        image: "images/redpepper.jpg"
    },
    {
        id: 5,
        name: "Tomato",
        price: 1.99,
        image: "images/tomato.jpg"
    },
    {
        id: 6,
        name: "Onion",
        price: 1.49,
        image: "images/onion.jpg"
    }
];

// Add display functionality
function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="cta-button" onclick="showProductDetail(${product.id})">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Initialize display when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // Add search functionality
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            if (searchTerm === '') {
                displayProducts();
            } else {
                searchProducts(searchTerm);
            }
        });
    }
});

// Rest of your cart and search functionality...