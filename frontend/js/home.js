// Load and display popular dishes on the homepage
async function loadPopularDishes() {
  try {
    const popularContainer = document.getElementById('popular-items');
    if (!popularContainer) return;

    popularContainer.innerHTML = '<div class="loading">Loading popular dishes...</div>';

    // Fetch food items
    const response = await API.Menu.getAll();
    
    if (response.success && response.data.length > 0) {
      // Pick first 3 items as "popular"
      const popularItems = response.data.slice(0, 3);
      displayPopularItems(popularItems);
    } else {
      popularContainer.innerHTML = '<p class="no-items">No popular dishes available at the moment.</p>';
    }
  } catch (error) {
    console.error('Error loading popular dishes:', error);
    const popularContainer = document.getElementById('popular-items');
    if (popularContainer) {
      popularContainer.innerHTML = 
        '<p class="error">Failed to load dishes. Please ensure the backend server is running.</p>';
    }
  }
}

// Display popular items in the DOM
function displayPopularItems(items) {
  const popularContainer = document.getElementById('popular-items');
  
  popularContainer.innerHTML = items.map(item => `
    <div class="menu-item" data-id="${item._id}">
      <img src="${item.image}" alt="${item.name}" class="menu-item-image">
      <div class="menu-item-details">
        <h3 class="menu-item-name">${item.name}</h3>
        <p class="menu-item-description">${item.description}</p>
        <div class="menu-item-info">
          <span class="menu-item-category">${item.category}</span>
          ${item.spicyLevel > 0 ? `<span class="spicy-level">${'🌶️'.repeat(item.spicyLevel)}</span>` : ''}
        </div>
        <div class="menu-item-footer">
          <span class="menu-item-price">$${item.price.toFixed(2)}</span>
          <button class="add-to-cart-btn" onclick="addToCart('${item._id}', '${item.name}', ${item.price})">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize popular dishes load
document.addEventListener('DOMContentLoaded', () => {
  loadPopularDishes();
});
