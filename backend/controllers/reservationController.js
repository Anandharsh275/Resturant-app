const reservationModel = require("../models/reservationModel");

// CREATE RESERVATION
const createReservationController = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, notes } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newReservation = new reservationModel({
      name,
      email,
      phone,
      date,
      time,
      guests,
      notes,
      user: req.body.id, // from authMiddleware
    });

    await newReservation.save();

    res.status(201).send({
      success: true,
      message: "Reservation booked successfully",
      newReservation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create reservation API",
      error,
    });
  }
};

// GET USER RESERVATIONS
const getUserReservationsController = async (req, res) => {
  try {
    const reservations = await reservationModel.find({ user: req.body.id }).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalReservations: reservations.length,
      reservations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user reservations API",
      error,
    });
  }
};

// GET ALL RESERVATIONS (ADMIN)
const getAllReservationsController = async (req, res) => {
  try {
    const reservations = await reservationModel.find({}).populate("user", "username email").sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalReservations: reservations.length,
      reservations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all reservations API",
      error,
    });
  }
};

// UPDATE RESERVATION STATUS (ADMIN)
const updateReservationStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid status: pending, approved, or rejected",
      });
    }

    const updatedReservation = await reservationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).send({
        success: false,
        message: "Reservation not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Reservation status updated successfully",
      updatedReservation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update reservation status API",
      error,
    });
  }
};

module.exports = {
  createReservationController,
  getUserReservationsController,
  getAllReservationsController,
  updateReservationStatusController,
};
