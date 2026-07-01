const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  createReservationController,
  getUserReservationsController,
  getAllReservationsController,
  updateReservationStatusController,
} = require("../controllers/reservationController");

const router = express.Router();

// CREATE RESERVATION
router.post("/book", authMiddleware, createReservationController);

// GET USER RESERVATIONS
router.get("/user-reservations", authMiddleware, getUserReservationsController);

// GET ALL RESERVATIONS (ADMIN)
router.get("/all", authMiddleware, adminMiddleware, getAllReservationsController);

// UPDATE RESERVATION STATUS (ADMIN)
router.put("/status/:id", authMiddleware, adminMiddleware, updateReservationStatusController);

module.exports = router;
