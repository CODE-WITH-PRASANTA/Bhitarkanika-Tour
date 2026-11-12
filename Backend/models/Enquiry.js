const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    subject: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
    tour: { type: String, trim: true, default: '' },
    start: { type: String, trim: true, default: 'Not set' },
    end: { type: String, trim: true, default: 'Not set' },
    travelers: { type: Number, default: 1, min: 1 },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Replied', 'Closed'],
      default: 'New',
    },
    date: { type: String, default: '' },
    time: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
