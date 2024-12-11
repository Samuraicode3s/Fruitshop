// Vegetables data
const vegetablesProducts = [
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

function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    vegetablesProducts.forEach(product => {
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
    const product = vegetablesProducts.find(p => p.id === productId);
    window.location.href = `product-details.html?id=${productId}&type=vegetable`;
}

// Add this function to close the modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
        // Remove the modal from DOM completely
        modal.remove();
    }
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // Add click event to close button
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Add click event to modal background
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Add keyboard event to close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});