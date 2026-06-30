// Shopping Cart logic
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

// Show toast notifications
function showNotification(message, type = 'success') {
  let notificationContainer = document.getElementById('notification-container');
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    document.body.appendChild(notificationContainer);
  }

  const notification = document.createElement('div');
  notification.className = `notification ${type === 'error' ? 'error' : ''}`;
  notification.style.color = '#ffffff';
  notification.style.fontWeight = '600';
  
  let displayMsg = 'An error occurred. Please try again.';
  if (typeof message === 'string' && message.trim().length > 0) {
    displayMsg = message;
  } else if (message && typeof message === 'object') {
    displayMsg = message.message || JSON.stringify(message);
  }
  
  notification.innerText = displayMsg;
  notificationContainer.appendChild(notification);
  
  // Trigger animation reflow
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Remove notification after 4 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// Update the cart count badge on navbar
function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalCount;
  }
}

// Add item to cart
function addToCart(id, name, price) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  showNotification(`Added ${name} to cart!`);
}

// Remove item or decrease quantity
function changeQuantity(id, change) {
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += change;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Reload cart details page if we are on cart page
    if (typeof loadCartPage === 'function') {
      loadCartPage();
    }
  }
}

// Remove item entirely
function removeFromCart(id) {
  const item = cart.find(item => item.id === id);
  const name = item ? item.name : 'Item';
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  showNotification(`Removed ${name} from cart.`, 'success');
  
  if (typeof loadCartPage === 'function') {
    loadCartPage();
  }
}

// Clear the cart
function clearCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  showNotification('Cart cleared successfully.', 'success');
  if (typeof loadCartPage === 'function') {
    loadCartPage();
  }
}

// Run updates when page loads
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});
