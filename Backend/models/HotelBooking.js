const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema(
  {
    guestName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    hotelName: { type: String, required: true, trim: true },
    roomType: { type: String, trim: true, default: 'Standard' },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1, default: 1 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HotelBooking', hotelBookingSchema);

