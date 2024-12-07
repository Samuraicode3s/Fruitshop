// Fruits data
const products = [
    {
        id: 1,
        name: "Apple",
        price: 2.99,
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
                <button class="cta-button" onclick="showProductDetail(${product.id})">VIEW DETAILS</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

function showProductDetail(productId) {
    window.location.href = `product-details.html?id=${productId}&type=fruit`;
}

// Add search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const productsContainer = document.querySelector('.product-grid');
    if (!searchInput || !productsContainer) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        let hasResults = false;
        
        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Remove existing message if it exists
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Show message if no results and search term isn't empty
        if (!hasResults && searchTerm !== '') {
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.textContent = 'No items found. Please try another search.';
            productsContainer.appendChild(message);
        }
    });
}

// Initialize display when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    setupSearch();
});