const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    description: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    idealSeason: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    quote: { type: String, trim: true, default: '' },
    tags: { type: [String], default: [] },
    mainImage: { type: String, required: true, trim: true },
    contentImages: { type: [String], default: [] },
    published: { type: Boolean, default: true },
    date: {
      type: String,
      default: () => new Date().toISOString().slice(0, 10),
    },
    comments: { type: Number, default: 0 },
    author: { type: String, trim: true, default: 'Admin' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
