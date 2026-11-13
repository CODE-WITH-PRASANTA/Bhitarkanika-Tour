const TourBooking = require('../models/TourBooking');

/**
 * Get all tour bookings sorted newest first.
 */
const getAll = async (req, res, next) => {
  try {
    const bookings = await TourBooking.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single tour booking by ID.
 */
const getById = async (req, res, next) => {
  try {
    const booking = await TourBooking.findById(req.params.id);
    if (!booking) {
      res.status(404);
      throw new Error('Tour booking not found');
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new tour booking.
 */
const create = async (req, res, next) => {
  try {
    const body = { ...req.body };

    if (!body.bookingId) {
      body.bookingId = `TB-${Date.now().toString().slice(-6)}`;
    }

    if (!body.status) {
      body.status = 'Pending';
    }

    if (!body.date && body.travelDate) {
      body.date = body.travelDate;
    }
    if (!body.travelDate && body.date) {
      body.travelDate = body.date;
    }

    if (!body.time && body.departureSlot) {
      body.time = body.departureSlot;
    }

    if (!body.amount && body.totalAmount) {
      body.amount = body.totalAmount;
    }

    if (!body.aadhaar && body.aadhar) {
      body.aadhaar = body.aadhar;
    }

    if (!body.homeTown && body.address) {
      body.homeTown = body.address;
    }

    const booking = await TourBooking.create(body);
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Update a tour booking.
 */
const update = async (req, res, next) => {
  try {
    const booking = await TourBooking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      res.status(404);
      throw new Error('Tour booking not found');
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Delete a tour booking.
 */
const remove = async (req, res, next) => {
  try {
    const booking = await TourBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      res.status(404);
      throw new Error('Tour booking not found');
    }
    res.status(200).json({ success: true, message: 'Tour booking deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
