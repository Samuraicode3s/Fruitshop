document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const productType = urlParams.get('type');
    
    let product;
    if (productType === 'fruit') {
        product = fruitsProducts.find(p => p.id === productId);
    } else if (productType === 'vegetable') {
        product = vegetablesProducts.find(p => p.id === productId);
    }
    
    if (product) {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    } else {
        console.error('Product not found');
    }
});

// Quantity control function
function updateQuantity(change) {
    const quantityElement = document.getElementById('quantity');
    let quantity = parseInt(quantityElement.textContent) + change;
    if (quantity < 1) quantity = 1;
    quantityElement.textContent = quantity;
}

function addToCart() {
    const quantity = document.getElementById('quantity').textContent;
    alert(`Added ${quantity} items to cart`);
} 