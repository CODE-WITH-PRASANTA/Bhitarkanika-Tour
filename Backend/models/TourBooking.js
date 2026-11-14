const mongoose = require('mongoose');

const tourBookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, trim: true },
    packageName: { type: String, required: true, trim: true },
    packageType: { type: String, trim: true, default: 'Standard package · 1 DAY' },
    image: { type: String, trim: true, default: '' },
    name: { type: String, required: true, trim: true },
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    guests: { type: Number, default: 1 },
    boats: { type: Number, default: 1, min: 1 },
    boatCount: { type: Number, default: 1, min: 1 },
    date: { type: String, trim: true, default: '' },
    travelDate: { type: String, trim: true, default: '' },
    time: { type: String, trim: true, default: '' },
    departureSlot: { type: String, trim: true, default: '' },
    phone: { type: String, required: true, trim: true },
    aadhaar: { type: String, trim: true, default: '' },
    aadhar: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    homeTown: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
    from: { type: String, trim: true, default: '' },
    to: { type: String, trim: true, default: '' },
    duration: { type: String, trim: true, default: '' },
    amount: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    boatFare: { type: Number, default: 0 },
    forestPermit: { type: Number, default: 0 },
    govtTax: { type: Number, default: 0 },
    status: {
      type: String,
      default: 'Confirmed',
    },
    paymentId: { type: String, trim: true, default: '' },
    orderId: { type: String, trim: true, default: '' },
    signature: { type: String, trim: true, default: '' },
    paymentStatus: {
      type: String,
      default: 'Paid',
    },
    paymentMethod: { type: String, trim: true, default: 'Razorpay / UPI' },
    paymentError: { type: String, trim: true, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    refundStatus: { type: String, default: 'None' }, // 'None' | 'Requested' | 'Processing' | 'Processed'
    refundId: { type: String, trim: true, default: '' },
    refundReason: { type: String, trim: true, default: '' },
    refundUpi: { type: String, trim: true, default: '' },
    refundAmount: { type: Number, default: 0 },
    specialRequests: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TourBooking', tourBookingSchema);
