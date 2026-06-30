const data = {
  restaurants: [
    {
      title: "Pizza Hut",
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      time: "9am to 9pm",
      pickup: true,
      delivery: true,
      isOpen: true,
      logoUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100",
      rating: 5,
      ratingCount: "5",
      code: "1234",
      coords: {
        id: "123456",
        latitude: 12.9716,
        latitudeDelta: 0.01,
        longitude: 77.5946,
        longitudeDelta: 0.01,
        address: "Pizza Hut, MG Road, Bangalore",
        title: "Pizza Hut"
      }
    },
    {
      title: "Burger King",
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      time: "9am to 9pm",
      pickup: true,
      delivery: true,
      isOpen: true,
      logoUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100",
      rating: 4.8,
      ratingCount: "12",
      code: "1235",
      coords: {
        id: "123457",
        latitude: 12.9722,
        latitudeDelta: 0.01,
        longitude: 77.5950,
        longitudeDelta: 0.01,
        address: "Burger King, Indiranagar, Bangalore",
        title: "Burger King"
      }
    }
  ],
  categories: [
    { title: "Pizza", imageUrl: "🍕" },
    { title: "Burger", imageUrl: "🍔" },
    { title: "Pasta", imageUrl: "🍝" },
    { title: "Desserts", imageUrl: "🍰" },
    { title: "Drinks", imageUrl: "🥤" }
  ],
  foods: [
    {
      title: "Chicken Pizza",
      description: "Delicious pizza loaded with grilled chicken, cheese, and pizza sauce",
      price: 12.99,
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      foodTags: "chicken,pizza,cheese",
      catgeory: "Pizza",
      rating: 5,
      isAvailabe: true
    },
    {
      title: "Margherita Pizza",
      description: "Classic Italian pizza with tomato sauce, mozzarella cheese, and fresh basil",
      price: 9.99,
      imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500",
      foodTags: "veg,pizza,cheese",
      catgeory: "Pizza",
      rating: 4.8,
      isAvailabe: true
    },
    {
      title: "Chicken Burger",
      description: "Crispy chicken patty with lettuce, tomato, and spicy mayo in a toasted bun",
      price: 5.99,
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      foodTags: "chicken,burger,spicy",
      catgeory: "Burger",
      rating: 4.7,
      isAvailabe: true
    },
    {
      title: "Veggie Supreme Burger",
      description: "Healthy plant-based patty with fresh veggies and cheddar cheese slice",
      price: 4.99,
      imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
      foodTags: "veg,burger,healthy",
      catgeory: "Burger",
      rating: 4.5,
      isAvailabe: true
    },
    {
      title: "Alfredo Pasta",
      description: "Creamy white sauce pasta tossed with garlic, mushrooms, and parmesan cheese",
      price: 8.99,
      imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500",
      foodTags: "pasta,veg,creamy",
      catgeory: "Pasta",
      rating: 4.9,
      isAvailabe: true
    },
    {
      title: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten chocolate center, served with love",
      price: 3.99,
      imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
      foodTags: "dessert,sweet,chocolate",
      catgeory: "Desserts",
      rating: 5,
      isAvailabe: true
    },
    {
      title: "Iced Caramel Macchiato",
      description: "Rich espresso combined with milk, vanilla syrup, and caramel drizzle over ice",
      price: 2.99,
      imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500",
      foodTags: "drink,coffee,cold",
      catgeory: "Drinks",
      rating: 4.8,
      isAvailabe: true
    }
  ]
};

module.exports = data;