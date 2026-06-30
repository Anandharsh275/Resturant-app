// Load and display menu items
async function loadMenu(category = '') {
  try {
    // Show loading state
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;
    
    menuContainer.innerHTML = '<div class="loading">Loading menu...</div>';

    // Fetch menu items from backend
    const response = await API.Menu.getAll(category);
    
    if (response.success && response.data.length > 0) {
      displayMenuItems(response.data);
    } else {
      menuContainer.innerHTML = '<p class="no-items">No menu items available</p>';
    }
  } catch (error) {
    console.error('Error loading menu:', error);
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
      menuContainer.innerHTML = 
        '<p class="error">Failed to load menu. Please try again later.</p>';
    }
  }
}

// Display menu items in the DOM
function displayMenuItems(items) {
  const menuContainer = document.getElementById('menu-container');
  
  menuContainer.innerHTML = items.map(item => `
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

// Filter menu by category
function filterMenu(category) {
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Load filtered menu
  loadMenu(category);
}

// Initialize menu on page load
document.addEventListener('DOMContentLoaded', () => {
  loadMenu();
});