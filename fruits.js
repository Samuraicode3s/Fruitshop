document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const productCards = document.querySelectorAll('.product-card');
            let hasResults = false;
            
            productCards.forEach(card => {
                const titleElement = card.querySelector('h3');
                if (titleElement) {
                    const title = titleElement.textContent.toLowerCase();
                    if (title.includes(searchTerm)) {
                        card.style.display = 'flex';
                        hasResults = true;
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
            
            const noResults = document.getElementById('no-results') || createNoResultsMessage();
            noResults.style.display = hasResults ? 'none' : 'block';
        });
    }
});

function createNoResultsMessage() {
    const noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.style.textAlign = 'center';
    noResults.style.padding = '20px';
    noResults.style.color = '#1e3d59';
    noResults.style.fontSize = '1.4rem';
    noResults.style.width = '100%';
    noResults.style.background = 'rgba(255, 255, 255, 0.9)';
    noResults.style.borderRadius = '8px';
    noResults.style.margin = '20px auto';
    noResults.style.maxWidth = '400px';
    noResults.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    noResults.textContent = 'No products found. Please try another search.';
    
    const productGrid = document.querySelector('.product-grid');
    productGrid.parentNode.insertBefore(noResults, productGrid.nextSibling);
    
    return noResults;
} 