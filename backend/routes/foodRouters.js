const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
  getUserOrdersController,
  getAllOrdersController,
} = require("../controllers/foodcontrollers");
const adminMiddleware = require("../middleware/adminMiddleware.js");

const router = express.Router();

//routes
//CREATE FOOD
router.post("/create", authMiddleware, createFoodController);

//GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET SINGLE FOOD
router.get("/get/:id", getSingleFoodController);

// GET  FOOD by rest
router.get("/getByResturant/:id", getFoodByResturantController);

// UPDATE FOOD
router.put("/update/:id", authMiddleware, updateFoodController);

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authMiddleware, placeOrderController);

// GET USER ORDERS
router.get("/user-orders", authMiddleware, getUserOrdersController);

// GET ALL ORDERS (ADMIN)
router.get("/all-orders", authMiddleware, adminMiddleware, getAllOrdersController);

// ORDER STATUS
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

module.exports = router;