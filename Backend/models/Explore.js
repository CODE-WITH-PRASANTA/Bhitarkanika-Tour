const mongoose = require('mongoose');

const exploreSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    shortDesc: { type: String, required: true, trim: true },
    fullDesc: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    category: { type: String, required: true, trim: true, default: 'Nature & Wildlife' },
    image: { type: String, trim: true, default: '' },
    imageUrl: { type: String, trim: true, default: '' },
    published: { type: Boolean, default: true },
    location: { type: String, trim: true, default: 'Bhitarkanika National Park' },
    bestTimeToVisit: { type: String, trim: true, default: 'October to March' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Explore', exploreSchema);
