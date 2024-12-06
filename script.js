// Product data with your new images
const products = [
    {
        id: 1,
        name: "Apple",
        price: 99.99,
        image: "images/apple.png"
    },
    {
        id: 2,
        name: "Grapes",
        price: 79.99,
        image: "images/Grapes.jpg"
    },
    {
        id: 3,
        name: "Dragon Fruit",
        price: 129.99,
        image: "images/Dragonfruit.jpg"
    },
    {
        id: 4,
        name: "Pear",
        price: 89.99,
        image: "images/Pear.jpg"
    },
    {
        id: 5,
        name: "Fruit Bundle",
        price: 159.99,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 6,
        name: "Seasonal Fruits",
        price: 199.99,
        image: "https://via.placeholder.com/300x200"
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
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="cta-button">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Wait for page to load
console.log("Script loaded"); // Debug log
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded"); // Debug log
    displayProducts();
});