const mongoose = require('mongoose');

const blogCommentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
      index: true,
    },
    blogTitle: {
      type: String,
      trim: true,
      default: '',
    },
    blogSlug: {
      type: String,
      trim: true,
      default: '',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, 'Comment message is required'],
      trim: true,
    },
    initials: {
      type: String,
      trim: true,
      default: '',
    },
    date: {
      type: String,
      default: () =>
        new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
    },
    status: {
      type: String,
      enum: ['Approved', 'Pending', 'Spam'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogComment', blogCommentSchema);

