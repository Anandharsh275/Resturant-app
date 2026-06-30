const mongoose = require("mongoose");
const categoryModel = require("../models/categoryModel");
const resturantModel = require("../models/resturantModel");
const foodModel = require("../models/foodModel");
const data = require("../data");

const seedDB = async () => {
  try {
    // 1. Seed Categories
    const categoryCount = await categoryModel.countDocuments();
    if (categoryCount === 0) {
      console.log("Seeding categories...".yellow);
      await categoryModel.insertMany(data.categories);
      console.log("Categories seeded successfully!".green);
    } else {
      console.log("Categories already exist, skipping seeding.".cyan);
    }

    // 2. Seed Restaurants
    const resturantCount = await resturantModel.countDocuments();
    let seededRestaurants = [];
    if (resturantCount === 0) {
      console.log("Seeding restaurants...".yellow);
      seededRestaurants = await resturantModel.insertMany(data.restaurants);
      console.log("Restaurants seeded successfully!".green);
    } else {
      console.log("Restaurants already exist, skipping seeding.".cyan);
      seededRestaurants = await resturantModel.find({});
    }

    // 3. Seed Foods
    const foodCount = await foodModel.countDocuments();
    if (foodCount === 0 && seededRestaurants.length > 0) {
      console.log("Seeding food items...".yellow);
      
      const pizzaHut = seededRestaurants.find(r => r.title.toLowerCase().includes("pizza"));
      const burgerKing = seededRestaurants.find(r => r.title.toLowerCase().includes("burger"));
      
      const pizzaHutId = pizzaHut ? pizzaHut._id : seededRestaurants[0]._id;
      const burgerKingId = burgerKing ? burgerKing._id : seededRestaurants[0]._id;

      const foodsToSeed = data.foods.map(food => {
        // Associate food with correct restaurant
        let restId = pizzaHutId;
        if (food.catgeory === "Burger") {
          restId = burgerKingId;
        }
        return {
          ...food,
          resturnat: restId
        };
      });

      await foodModel.insertMany(foodsToSeed);
      console.log("Food items seeded successfully!".green);
    } else if (foodCount > 0) {
      console.log("Food items already exist, skipping seeding.".cyan);
    }
  } catch (error) {
    console.error("Error seeding database:".red, error);
  }
};

module.exports = seedDB;
