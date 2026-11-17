const TourBooking = require('../models/TourBooking');
const {
  sendBookingConfirmationEmail,
  sendBookingCancellationEmail,
  sendRefundUpdateEmail,
} = require('../services/emailService');

/**
 * Get tour bookings (admin gets all, users get their own, query filter supported).
 */
const getAll = async (req, res, next) => {
  try {
    let filter = {};

    if (req.query.email || req.query.phone || req.query.userId) {
      filter.$or = [];
      if (req.query.email) filter.$or.push({ email: req.query.email.toLowerCase().trim() });
      if (req.query.phone) filter.$or.push({ phone: req.query.phone.trim() });
      if (req.query.userId) filter.$or.push({ userId: req.query.userId });
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

    if (req.user && !body.userId) {
      body.userId = req.user._id;
    }

    // Automatic confirmation on booking submission/payment
    if (!body.status) {
      body.status = 'Confirmed';
    }

    if (!body.paymentStatus) {
      body.paymentStatus = 'Paid';
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

    // Send confirmation email with PDF ticket
    if (booking && booking.email) {
      sendBookingConfirmationEmail(booking).catch((err) =>
        console.error('[emailService] Confirmation error:', err)
      );
    }

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
    const oldBooking = await TourBooking.findById(req.params.id);
    const booking = await TourBooking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      res.status(404);
      throw new Error('Tour booking not found');
    }

    // Trigger email if status changed to Cancelled or Refunded
    if (booking && booking.email) {
      if (req.body.status === 'Cancelled' && oldBooking?.status !== 'Cancelled') {
        sendBookingCancellationEmail(booking, req.body.refundReason || 'Booking Cancelled').catch((err) =>
          console.error('[emailService] Cancellation error:', err)
        );
      } else if (
        (req.body.status === 'Refunded' || req.body.paymentStatus === 'Refunded') &&
        oldBooking?.status !== 'Refunded'
      ) {
        sendRefundUpdateEmail(booking, { status: 'Refunded / Completed' }).catch((err) =>
          console.error('[emailService] Refund error:', err)
        );
      }
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
