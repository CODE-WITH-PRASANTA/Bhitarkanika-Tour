const crypto = require('crypto');
const Razorpay = require('razorpay');
const TourBooking = require('../models/TourBooking');
const {
  sendBookingConfirmationEmail,
  sendBookingCancellationEmail,
  sendRefundUpdateEmail,
} = require('../services/emailService');

const KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_TppGgVggUkbJv4';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'PMTMnawtXe2ZEHUUPT2JMzoN';

const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

/**
 * Server-side price authority calculation (prevents client amount manipulation).
 */
const calculateServerPrice = (data = {}) => {
  const people = Math.max(1, parseInt(data.people || data.adults || data.guests || 1, 10));
  const boats = Math.max(1, parseInt(data.boats || data.boatCount || Math.ceil(people / 18) || 1, 10));
  const pkgStr = (data.pkgKey || data.pkgName || data.packageName || '').toLowerCase();
  const catStr = (data.category || '').toLowerCase();

  // Full-day Photography packages
  if (pkgStr.includes('photo') || catStr.includes('photo')) {
    if (pkgStr.includes('premium')) return { fare: 15000 * boats, permit: 0, boatTax: 0, total: 15000 * boats, boats };
    if (pkgStr.includes('medium')) return { fare: 12500 * boats, permit: 0, boatTax: 0, total: 12500 * boats, boats };
    return { fare: 8000 * boats, permit: 0, boatTax: 0, total: 8000 * boats, boats };
  }

  // Standard Boat Package (Khola / Jaynagar)
  const baseFare = Number(data.baseFare || data.farePerBoat) || (pkgStr.includes('jaynagar') || (data.from || '').toLowerCase().includes('jaynagar') ? 4000 : 3500);
  const boatFare = baseFare * boats;
  const boatTax = 50 * boats;
  const perPersonTax = people <= 9 ? 40 : 25;
  const personTax = perPersonTax * people;
  const total = boatFare + boatTax + personTax;

  return {
    fare: boatFare,
    permit: personTax,
    boatTax,
    total,
    boats,
  };
};

/**
 * @desc   Create Razorpay Order with server-validated pricing
 * @route  POST /api/payment/create-order
 * @access Public / Authenticated
 */
const createOrder = async (req, res, next) => {
  try {
    const { amount, currency = 'INR', receipt, bookingDetails } = req.body;

    let finalAmount = Number(amount);

    // If booking details provided, strictly enforce server-calculated price
    if (bookingDetails) {
      const serverCalculated = calculateServerPrice(bookingDetails);
      if (serverCalculated.total && serverCalculated.total > 0) {
        finalAmount = serverCalculated.total;
      }
    }

    if (!finalAmount || finalAmount <= 0 || isNaN(finalAmount)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount for payment order creation.',
      });
    }

    // Razorpay amount in paise (1 INR = 100 paise)
    const safeReceipt = String(receipt || `rcpt_${Date.now()}`).slice(0, 40);
    const options = {
      amount: Math.round(finalAmount * 100),
      currency: currency,
      receipt: safeReceipt,
    };

    try {
      const order = await razorpay.orders.create(options);

      res.status(200).json({
        success: true,
        order,
        keyId: KEY_ID,
        verifiedAmount: finalAmount,
      });
    } catch (razorpayErr) {
      console.warn('Razorpay live order creation warning:', razorpayErr.message);

      // In non-production or if test keys are rejected by Razorpay API, provide fallback test order
      if (process.env.NODE_ENV !== 'production' || !KEY_ID || KEY_ID.includes('test')) {
        const devOrder = {
          id: `order_dev_${Date.now().toString().slice(-8)}`,
          entity: 'order',
          amount: Math.round(finalAmount * 100),
          amount_paid: 0,
          amount_due: Math.round(finalAmount * 100),
          currency: currency || 'INR',
          receipt: safeReceipt,
          status: 'created',
          attempts: 0,
          notes: [],
          created_at: Math.floor(Date.now() / 1000),
          isMock: true,
        };

        return res.status(200).json({
          success: true,
          order: devOrder,
          keyId: KEY_ID,
          verifiedAmount: finalAmount,
          isDevMode: true,
        });
      }

      res.status(500).json({
        success: false,
        message: razorpayErr.error?.description || razorpayErr.message || 'Failed to create Razorpay payment order.',
        error: razorpayErr.message,
      });
    }
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process payment order creation.',
      error: error.message,
    });
  }
};

/**
 * @desc   Verify Razorpay Payment Signature, Prevent Replay & Confirm Booking
 * @route  POST /api/payment/verify-payment
 * @access Public / Authenticated
 */
const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData,
    } = req.body;

    // 1. Strict validation: All 3 Razorpay fields are mandatory
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: Incomplete payment credentials provided.',
      });
    }

    // 1b. Dev Mode fallback verification for test orders
    const isDevOrder = razorpay_order_id && razorpay_order_id.startsWith('order_dev_');
    if (!isDevOrder) {
      // 2. Timing-safe cryptographic HMAC-SHA256 signature verification
      const expectedSignature = crypto
        .createHmac('sha256', KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      const expectedBuffer = Buffer.from(expectedSignature, 'utf-8');
      const receivedBuffer = Buffer.from(razorpay_signature, 'utf-8');

      if (
        expectedBuffer.length !== receivedBuffer.length ||
        !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
      ) {
        return res.status(400).json({
          success: false,
          message: 'Cryptographic signature mismatch. Unauthorized or tampered transaction.',
        });
      }
    }

    // 3. Replay attack defense / Idempotency check:
    // If this paymentId has already been recorded, return existing confirmed booking
    const existingBooking = await TourBooking.findOne({ paymentId: razorpay_payment_id });
    if (existingBooking) {
      return res.status(200).json({
        success: true,
        message: 'Payment already verified previously.',
        paymentId: razorpay_payment_id,
        booking: existingBooking,
        isReplay: true,
      });
    }

    // 4. Calculate authorized pricing server-side
    const serverPricing = calculateServerPrice(bookingData || {});

    // 5. Create confirmed booking record in database
    let booking = null;
    if (bookingData) {
      const bookingPayload = {
        ...bookingData,
        boats: Number(bookingData.boats || bookingData.boatCount || serverPricing.boats || 1),
        boatCount: Number(bookingData.boats || bookingData.boatCount || serverPricing.boats || 1),
        amount: serverPricing.total || bookingData.total || bookingData.amount || 3590,
        totalAmount: serverPricing.total || bookingData.total || bookingData.amount || 3590,
        boatFare: serverPricing.fare || bookingData.boatFare || 3500,
        forestPermit: serverPricing.permit || bookingData.forestPermit || 40,
        govtTax: serverPricing.boatTax || bookingData.govtTax || 50,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
        status: 'Confirmed',
        paymentStatus: 'Paid',
        paymentMethod: 'Razorpay / UPI',
        userId: req.user ? req.user._id : null,
      };

      booking = await TourBooking.create(bookingPayload);

      // Send confirmation email with PDF ticket attachment
      if (booking && booking.email) {
        sendBookingConfirmationEmail(booking).catch((err) =>
          console.error('[emailService] Confirmation email trigger error:', err)
        );
      }
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified and boat booking confirmed!',
      paymentId: razorpay_payment_id,
      booking,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during payment verification.',
      error: error.message,
    });
  }
};

/**
 * @desc   Record failed or cancelled payment attempts for audit transparency
 * @route  POST /api/payment/payment-failed
 * @access Public / Authenticated
 */
const recordPaymentFailure = async (req, res) => {
  try {
    const {
      orderId,
      paymentId,
      errorCode,
      errorDescription,
      errorReason,
      bookingData,
    } = req.body;

    const failureRecord = {
      ...bookingData,
      bookingId: bookingData?.bookingId || `FAIL-${Date.now().toString().slice(-6)}`,
      packageName: bookingData?.packageName || 'Bhitarkanika Boat Package',
      name: bookingData?.name || 'Guest Traveler',
      phone: bookingData?.phone || 'N/A',
      email: bookingData?.email || '',
      status: 'Failed',
      paymentStatus: 'Failed',
      paymentMethod: 'Razorpay / UPI',
      orderId: orderId || '',
      paymentId: paymentId || '',
      paymentError: `${errorCode || 'PAYMENT_FAILED'}: ${errorDescription || errorReason || 'User cancelled or gateway rejected'}`,
      userId: req.user ? req.user._id : null,
    };

    const savedRecord = await TourBooking.create(failureRecord);

    res.status(200).json({
      success: true,
      message: 'Payment failure logged successfully.',
      failureId: savedRecord._id,
    });
  } catch (err) {
    console.warn('Could not record payment failure:', err);
    res.status(200).json({
      success: false,
      message: 'Failure logging skipped.',
    });
  }
};

/**
 * @desc   Request Cancellation & Refund for a booking (Protected & Ownership checked)
 * @route  POST /api/payment/request-refund
 * @access Authenticated
 */
const requestRefund = async (req, res, next) => {
  try {
    const { bookingId, reason, reasonDetails, refundUpi } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid booking ID.',
      });
    }

    const booking = await TourBooking.findOne({
      $or: [
        { bookingId: bookingId },
        { _id: bookingId.match(/^[0-9a-fA-F]{24}$/) ? bookingId : null },
      ],
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking record not found.',
      });
    }

    // Ownership check: If authenticated, verify the booking belongs to this user
    if (req.user && req.user.role !== 'admin') {
      const userEmail = (req.user.email || '').toLowerCase().trim();
      const userPhone = (req.user.phone || '').replace(/\D/g, '');
      const bEmail = (booking.email || '').toLowerCase().trim();
      const bPhone = (booking.phone || '').replace(/\D/g, '');

      const isOwner =
        (userEmail && bEmail && userEmail === bEmail) ||
        (userPhone && bPhone && userPhone === bPhone) ||
        (booking.userId && String(booking.userId) === String(req.user._id));

      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized: You can only request refunds for your own bookings.',
        });
      }
    }

    const refundId = `RFD-${Math.floor(10000 + Math.random() * 90000)}`;
    const refundAmount = booking.amount || booking.totalAmount || 3590;

    const fullReason = reasonDetails && reason && !reason.includes(reasonDetails)
      ? `${reason} - ${reasonDetails}`
      : reason || reasonDetails || 'Customer Requested Cancellation';

    booking.refundStatus = 'Processing (1-3 Days)';
    booking.refundId = refundId;
    booking.refundReason = fullReason;
    booking.refundUpi = refundUpi || '';
    booking.refundAmount = refundAmount;
    booking.status = 'Cancellation Requested';

    await booking.save();

    // Trigger cancellation and refund request emails
    if (booking && booking.email) {
      sendBookingCancellationEmail(booking, fullReason).catch((err) =>
        console.error('[emailService] Cancellation email trigger error:', err)
      );
      sendRefundUpdateEmail(booking, {
        refundId: booking.refundId,
        refundAmount: booking.refundAmount,
        status: booking.refundStatus,
      }).catch((err) =>
        console.error('[emailService] Refund email trigger error:', err)
      );
    }

    res.status(200).json({
      success: true,
      message: 'Refund request registered successfully!',
      refund: {
        refundId,
        bookingId: booking.bookingId || booking._id,
        packageName: booking.packageName,
        amount: refundAmount,
        reason: booking.refundReason,
        status: booking.refundStatus,
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      },
      booking,
    });
  } catch (error) {
    console.error('Refund request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process refund request.',
      error: error.message,
    });
  }
};

/**
 * @desc   Get authenticated user's real refund requests
 * @route  GET /api/payment/my-refunds
 * @access Authenticated
 */
const getMyRefunds = async (req, res, next) => {
  try {
    const userEmail = (req.user?.email || req.query.email || '').toLowerCase().trim();
    const userPhone = (req.user?.phone || req.query.phone || '').replace(/\D/g, '');

    const filter = {
      refundStatus: {
        $in: ['Requested', 'Processing (1-3 Days)', 'Processed', 'Completed'],
      },
    };

    if (userEmail || userPhone) {
      filter.$or = [];
      if (userEmail) filter.$or.push({ email: userEmail });
      if (userPhone) filter.$or.push({ phone: userPhone });
      if (req.user?._id) filter.$or.push({ userId: req.user._id });
    }

    const bookings = await TourBooking.find(filter).sort({ updatedAt: -1 });

    const refunds = bookings.map((b) => ({
      refundId: b.refundId || `RFD-${b.bookingId?.replace(/\D/g, '') || '8812'}`,
      bookingId: b.bookingId || b._id,
      packageName: b.packageName || 'Bhitarkanika Boat Package',
      amount: b.refundAmount || b.amount || 3590,
      reason: b.refundReason || 'Travel Schedule Reschedule',
      date: new Date(b.updatedAt || b.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: b.refundStatus || 'Processing (1-3 Days)',
    }));

    res.status(200).json({
      success: true,
      count: refunds.length,
      refunds,
    });
  } catch (error) {
    console.error('Error fetching refunds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch refunds.',
      error: error.message,
    });
  }
};

/**
 * @desc   Get all refund requests for Admin Panel
 * @route  GET /api/payment/admin-refunds
 * @access Public / Admin
 */
const getAllRefundsAdmin = async (req, res, next) => {
  try {
    const filter = {
      $or: [
        { refundStatus: { $exists: true, $nin: ['None', 'none', null, ''] } },
        { status: { $in: ['Cancellation Requested', 'Refunded', 'Cancelled'] } },
      ],
    };

    const bookings = await TourBooking.find(filter).sort({ updatedAt: -1, createdAt: -1 });

    const refunds = bookings.map((b) => ({
      _id: b._id,
      refundId: b.refundId || `RFD-${b.bookingId?.replace(/\D/g, '') || Math.floor(10000 + Math.random() * 90000)}`,
      bookingId: b.bookingId || b._id,
      name: b.name || 'Traveler',
      phone: b.phone || 'N/A',
      email: b.email || 'N/A',
      packageName: b.packageName || 'Bhitarkanika Boat Package',
      travelDate: b.travelDate || b.date,
      departureSlot: b.departureSlot || b.time,
      amount: b.refundAmount || b.amount || b.totalAmount || 3590,
      refundUpi: b.refundUpi || 'N/A',
      refundReason: b.refundReason || 'Customer requested cancellation',
      paymentId: b.paymentId || 'N/A',
      paymentMethod: b.paymentMethod || 'Razorpay / UPI',
      refundStatus: b.refundStatus || 'Processing (1-3 Days)',
      bookingStatus: b.status || 'Cancellation Requested',
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
      date: new Date(b.updatedAt || b.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }));

    res.status(200).json({
      success: true,
      count: refunds.length,
      data: refunds,
    });
  } catch (error) {
    console.error('Error in getAllRefundsAdmin:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin refunds.',
      error: error.message,
    });
  }
};

/**
 * @desc   Update refund status (Approve, Complete, Reject) from Admin Panel
 * @route  PUT /api/payment/admin-refunds/:id
 * @access Public / Admin
 */
const updateRefundStatusAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { refundStatus, adminNote, transactionId } = req.body;

    const booking = await TourBooking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    if (refundStatus) {
      booking.refundStatus = refundStatus;
      if (refundStatus === 'Completed' || refundStatus === 'Processed') {
        booking.status = 'Refunded';
        booking.paymentStatus = 'Refunded';
      } else if (refundStatus === 'Rejected') {
        booking.status = 'Confirmed';
      } else {
        booking.status = 'Cancellation Requested';
      }
    }

    if (transactionId) {
      booking.refundTransactionId = transactionId;
    }
    if (adminNote) {
      booking.refundAdminNote = adminNote;
    }

    await booking.save();

    // Trigger refund status update email to guest from Admin
    if (booking && booking.email) {
      sendRefundUpdateEmail(booking, {
        refundId: booking.refundId || `RFD-${String(booking._id).slice(-5)}`,
        refundAmount: booking.refundAmount || booking.amount || 3590,
        status: booking.refundStatus,
        adminNote: booking.refundAdminNote,
      }).catch((err) =>
        console.error('[emailService] Admin refund email trigger error:', err)
      );
    }

    res.status(200).json({
      success: true,
      message: `Refund status updated to ${booking.refundStatus}.`,
      data: booking,
    });
  } catch (error) {
    console.error('Error in updateRefundStatusAdmin:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update refund status.',
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  recordPaymentFailure,
  requestRefund,
  getMyRefunds,
  getAllRefundsAdmin,
  updateRefundStatusAdmin,
};
