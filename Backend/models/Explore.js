const mongoose = require('mongoose');

const exploreSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: 'Attraction' },
    imageUrl: { type: String, trim: true, default: '' },
    description: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: 'Bhitarkanika National Park' },
    bestTimeToVisit: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Explore', exploreSchema);

