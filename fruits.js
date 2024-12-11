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
                <p class="product-price">$${product.price}</p>
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