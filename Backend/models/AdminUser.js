const mongoose = require('mongoose');
const crypto = require('crypto');

const adminUserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'Please provide an admin user ID'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an admin email address'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    name: {
      type: String,
      default: 'Sanctuary Administrator',
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false, // Don't return password hash by default
    },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'moderator'],
      default: 'superadmin',
    },
    avatar: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Method to set password with PBKDF2 hash
adminUserSchema.methods.setPassword = function (password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  this.password = `${salt}:${hash}`;
};

// Method to verify password
adminUserSchema.methods.verifyPassword = function (password) {
  if (!this.password) return false;
  const parts = this.password.split(':');
  if (parts.length !== 2) return false;
  const [salt, storedHash] = parts;
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return hash === storedHash;
};

module.exports = mongoose.model('AdminUser', adminUserSchema);
