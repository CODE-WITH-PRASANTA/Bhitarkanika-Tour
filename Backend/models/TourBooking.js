const mongoose = require('mongoose');

const tourBookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    packageName: { type: String, required: true, trim: true },
    travelDate: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1, default: 1 },
    specialRequests: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TourBooking', tourBookingSchema);

