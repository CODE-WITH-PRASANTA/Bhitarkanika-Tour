const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the traveller name'],
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: 'Traveller',
    },
    location: {
      type: String,
      trim: true,
      default: 'Odisha, India',
    },
    review: {
      type: String,
      required: [true, 'Please provide the testimonial review / quote'],
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
