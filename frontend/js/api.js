// API Client configuration and request helper
const API_BASE_URL = 'http://localhost:8080/api/v1';

const API = {
  // Helper to make fetch requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Set headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    // Add Authorization header if token exists
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error on ${endpoint}:`, error);
      return {
        success: false,
        message: 'Network error or server is offline. Please try again later.',
      };
    }
  },

  // Auth endpoints
  Auth: {
    async register(username, email, password, phone, address, answer) {
      return API.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, phone, address, answer }),
      });
    },

    async login(email, password) {
      const result = await API.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (result.success && result.token) {
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('auth_user', JSON.stringify(result.user));
      }
      return result;
    },

    logout() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.reload();
    },

    isLoggedIn() {
      return !!localStorage.getItem('auth_token');
    },

    getUser() {
      const userStr = localStorage.getItem('auth_user');
      return userStr ? JSON.parse(userStr) : null;
    }
  },

  // Menu/Food endpoints
  Menu: {
    async getAll(category = '') {
      const response = await API.request('/food/getAll');
      if (response.success && response.foods) {
        // Map backend fields to frontend expected fields
        let mappedFoods = response.foods.map(item => ({
          _id: item._id,
          name: item.title,
          description: item.description,
          price: item.price,
          image: item.imageUrl,
          category: item.catgeory,
          spicyLevel: item.foodTags && item.foodTags.toLowerCase().includes('spicy') ? 2 : 0
        }));

        // Filter by category if specified
        if (category && category !== 'all') {
          mappedFoods = mappedFoods.filter(food => 
            food.category && food.category.toLowerCase() === category.toLowerCase()
          );
        }

        return {
          success: true,
          data: mappedFoods
        };
      }
      return {
        success: false,
        message: response.message || 'Failed to fetch menu items.'
      };
    }
  },

  // Category endpoints
  Category: {
    async getAll() {
      return API.request('/category/getAll');
    }
  },

  // Order endpoints
  Order: {
    async place(cart) {
      // Backend expects cart as a property in the request body
      // and each item should contain _id and price
      const cartData = cart.map(item => ({
        _id: item.id,
        price: item.price
      }));
      
      return API.request('/food/placeorder', {
        method: 'POST',
        body: JSON.stringify({ cart: cartData }),
      });
    }
  },

  // Reservations (mocked since no backend endpoint exists)
  Reservation: {
    async book(reservationDetails) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Store locally to simulate database
          const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
          reservations.push({
            id: Date.now().toString(),
            ...reservationDetails,
            status: 'pending',
            createdAt: new Date().toISOString()
          });
          localStorage.setItem('reservations', JSON.stringify(reservations));
          
          resolve({
            success: true,
            message: 'Reservation booked successfully! We will confirm via email.'
          });
        }, 800);
      });
    }
  },

  // Contact Message (mocked since no backend endpoint exists)
  Contact: {
    async sendMessage(messageDetails) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
          messages.push({
            id: Date.now().toString(),
            ...messageDetails,
            createdAt: new Date().toISOString()
          });
          localStorage.setItem('contact_messages', JSON.stringify(messages));

          resolve({
            success: true,
            message: 'Thank you! Your message has been sent successfully.'
          });
        }, 800);
      });
    }
  }
};
