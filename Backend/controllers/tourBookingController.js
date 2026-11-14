const TourBooking = require('../models/TourBooking');

/**
 * Get tour bookings (admin gets all, users get their own, query filter supported).
 */
const getAll = async (req, res, next) => {
  try {
    let filter = {};

    if (req.query.email || req.query.phone) {
      filter.$or = [];
      if (req.query.email) filter.$or.push({ email: req.query.email.toLowerCase().trim() });
      if (req.query.phone) filter.$or.push({ phone: req.query.phone.trim() });
    } else if (req.user && req.user.role !== 'admin') {
      filter.$or = [
        { email: (req.user.email || '').toLowerCase().trim() },
        { phone: (req.user.phone || '').trim() },
        { userId: req.user._id },
      ];
    }

    const bookings = await TourBooking.find(filter).sort({ createdAt: -1 });
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

    if (!body.boats && body.boatCount) {
      body.boats = Number(body.boatCount) || 1;
    }
    if (!body.boatCount && body.boats) {
      body.boatCount = Number(body.boats) || 1;
    }
    if (!body.boats && !body.boatCount) {
      body.boats = 1;
      body.boatCount = 1;
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
